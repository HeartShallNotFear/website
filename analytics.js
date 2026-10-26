(() => {
  "use strict";

  const config = window.HSNF_CONFIG || {};
  const settings = config.analytics || {};
  const location = window.location;
  const query = new URLSearchParams(location.search);
  if (!settings.enabled || !/^[a-z0-9][a-z0-9_-]{1,59}$/.test(settings.siteCode || "")) return;
  if (!["heartshallnotfear.com", "www.heartshallnotfear.com"].includes(location.hostname)) return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === "1" || window.doNotTrack === "1") return;
  if (query.get("hsnf_analytics") === "off") return;
  if (window.HSNF_ANALYTICS_LOADED || document.querySelector("script[data-goatcounter]")) return;
  window.HSNF_ANALYTICS_LOADED = true;

  // Only public campaign labels are sent. Discard click IDs and arbitrary URL data.
  const campaignQuery = new URLSearchParams();
  ["utm_campaign", "utm_source"].forEach((key) => {
    const value = query.get(key);
    if (value && /^[a-z0-9_-]{1,80}$/i.test(value)) campaignQuery.set(key, value);
  });

  const safeReferrer = (value) => {
    try {
      const url = new URL(value);
      if (!["http:", "https:"].includes(url.protocol)) return "";
      if (["heartshallnotfear.com", "www.heartshallnotfear.com"].includes(url.hostname)) return "";
      return url.origin;
    } catch (_) {
      return "";
    }
  };

  const destinations = new Map();
  const addDestination = (url, event, title, details = {}) => {
    try {
      destinations.set(new URL(url, location.href).href, { path: event, title, event: true, ...details });
    } catch (_) {
      // A malformed optional link must not interrupt the page.
    }
  };
  const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  (config.releaseLinks || []).forEach(({ label, url }) => {
    if (label && url) addDestination(url, `love-remains-stream-${slug(label)}`, `Love Remains: ${label}`, {
      streamGroup: "love-remains",
      service: slug(label)
    });
  });
  (config.artistLinks || []).forEach(({ label, url }) => {
    if (label && url) addDestination(url, `artist-${slug(label)}`, `CrimineyJay: ${label}`);
  });
  (config.labelLinks || []).forEach(({ label, url }) => {
    if (label && url) addDestination(url, `label-${slug(label)}`, `HSNF: ${label}`);
  });
  if (config.devotional && config.devotional.url) {
    addDestination(config.devotional.url, "elizabeth-devotional", "Elizabeth devotional ministry");
  }
  if (config.mrNow) {
    (config.mrNow.streamingLinks || []).forEach(({ label, url }) => {
      if (label && url) addDestination(url, `mr-now-stream-${slug(label)}`, `Mr Now: ${label}`, {
        streamGroup: "mr-now",
        service: slug(label)
      });
    });
    if (config.mrNow.recklessVideo) addDestination(config.mrNow.recklessVideo, "mr-now-reckless-youtube", "Mr Now: Reckless on YouTube");
    if (config.mrNow.siqaProfile) addDestination(config.mrNow.siqaProfile, "mr-now-siqa-profile", "Mr Now: SIQA profile");
  }

  const contactDestination = config.contactLink && config.contactLink.url;
  const counter = window.goatcounter = {
    no_onload: true,
    no_events: true,
    path: () => location.pathname,
    referrer: safeReferrer
  };

  let counterReady = false;
  const pendingCounts = [];
  const send = (vars) => {
    if (!counterReady) {
      pendingCounts.push(vars || {});
      return;
    }
    try { counter.count(vars); } catch (_) { /* Analytics must never block navigation. */ }
  };

  const route = location.pathname.replace(/\/+$/, "") || "/";
  const streamRoutes = {
    "mr-now": "/mr-now/remastered-reinvented",
    "love-remains": "/crimineyjay/love-remains"
  };
  const clickHandler = (event) => {
    if (event.defaultPrevented) return;
    const link = event.target.closest && event.target.closest("a[href]");
    if (!link) return;

    const declaredPath = link.dataset && link.dataset.hsnfEvent;
    let measurement;
    if (declaredPath && /^[a-z0-9][a-z0-9_-]{1,79}$/i.test(declaredPath)) {
      measurement = {
        path: declaredPath,
        title: (link.dataset.hsnfTitle || link.textContent || "").trim(),
        event: true
      };
    } else {
      measurement = destinations.get(link.href);
    }

    if (measurement && measurement.streamGroup) {
      const surface = route === streamRoutes[measurement.streamGroup]
        ? "album"
        : (route === "/" || route === "/index.html" ? "home" : "other");
      measurement = {
        path: `${measurement.streamGroup}-${surface}-stream-${measurement.service}`,
        title: `${measurement.streamGroup === "mr-now" ? "Mr Now" : "Love Remains"} ${surface} streaming click: ${measurement.service}`,
        event: true
      };
    }

    if (link.closest("#contact-link") && (link.href === contactDestination || link.href.startsWith("mailto:"))) {
      measurement = { path: "contact", title: "Contact HSNF", event: true };
    }

    if (!measurement) return;

    // Carry only the already-validated public campaign labels into an internal
    // landing page so its visit and later service click keep the same attribution.
    if (measurement.path.startsWith("home-open-") && campaignQuery.toString()) {
      try {
        const target = new URL(link.href, location.href);
        if (target.origin === location.origin && target.pathname !== location.pathname) {
          campaignQuery.forEach((value, key) => {
            if (!target.searchParams.has(key)) target.searchParams.set(key, value);
          });
          link.href = target.href;
        }
      } catch (_) {
        // Leave the original destination unchanged if it cannot be parsed.
      }
    }

    send(measurement);
  };
  document.addEventListener("click", clickHandler);

  const provider = document.createElement("script");
  provider.async = true;
  provider.src = "https://gc.zgo.at/count.v5.js";
  provider.crossOrigin = "anonymous";
  provider.referrerPolicy = "origin";
  provider.integrity = "sha384-atnOLvQb9t+jTSipvd75X2yginT4PjVbqDdlJAmxMm+wYElFmeR6EmLP5bYeoRVQ";
  provider.dataset.goatcounter = `https://${settings.siteCode}.goatcounter.com/count`;

  provider.addEventListener("load", () => {
    // v5 exposes get_data. Scrub its separate query field before any request.
    // Add the documented no-session event flag, supported by the current server.
    const originalData = counter.get_data;
    if (typeof originalData !== "function" || typeof counter.count !== "function") return;
    counter.get_data = (vars = {}) => {
      const data = originalData(vars);
      data.q = campaignQuery.toString() ? `?${campaignQuery}` : "";
      if (vars.event) data.ns = true;
      return data;
    };
    counterReady = true;
    pendingCounts.splice(0).forEach((vars) => {
      try { counter.count(vars); } catch (_) { /* Analytics must never block navigation. */ }
    });
    let pageCounted = false;
    const countVisiblePage = () => {
      if (pageCounted || (document.visibilityState && document.visibilityState !== "visible")) return;
      pageCounted = true;
      document.removeEventListener("visibilitychange", countVisiblePage);
      send();
    };
    document.addEventListener("visibilitychange", countVisiblePage);
    countVisiblePage();
  });
  document.head.appendChild(provider);
})();
