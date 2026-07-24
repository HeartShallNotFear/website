(() => {
  const config = window.HSNF_CONFIG || {};

  const makeButton = ({ label, url }) => {
    if (!label || !url) return null;
    const a = document.createElement("a");
    a.className = "button button-secondary";
    a.href = url;
    a.textContent = label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  };

  const makeTextLink = ({ label, url }) => {
    if (!label || !url) return null;
    const a = document.createElement("a");
    a.href = url;
    a.textContent = label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  };

  const appendLinks = (id, links, factory) => {
    const target = document.getElementById(id);
    if (!target) return;
    (links || []).forEach((link) => {
      const element = factory(link);
      if (element) target.appendChild(element);
    });

    if (!target.children.length) {
      const span = document.createElement("span");
      span.className = "small-copy";
      span.textContent = "Links coming soon.";
      target.appendChild(span);
    }
  };

  appendLinks("release-links", config.releaseLinks, makeButton);
  appendLinks("artist-links", config.artistLinks, makeButton);
  appendLinks("artist-socials", config.artistLinks, makeTextLink);
  appendLinks("label-socials", config.labelLinks, makeTextLink);

  const contact = document.getElementById("contact-link");
  if (contact) {
    if (config.contactEmail) {
      const a = document.createElement("a");
      a.href = `mailto:${config.contactEmail}`;
      a.textContent = config.contactEmail;
      contact.appendChild(a);
    } else {
      const span = document.createElement("span");
      span.className = "small-copy";
      span.textContent = "Contact email coming soon.";
      contact.appendChild(span);
    }
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-button");
  const nav = document.getElementById("site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
