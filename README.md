# Heart Shall Not Fear — Current Website Source

This repository is the deployed source for `heartshallnotfear.com`, hosted on GitHub Pages.

## Current operating facts

- Repository: `https://github.com/HeartShallNotFear/website`
- Branch: `main`
- Domain: `heartshallnotfear.com`
- Operator: Chris
- iCloud operational mirror: `01 - Business/Website/Current Website Source`

Always begin with the latest `main` branch. After a deployed update is verified, synchronize the current source into the iCloud operational mirror. Older website packages are historical and must not be used as the next editing source.

## Editing

1. Pull or clone the latest `main` branch.
2. Make the smallest approved change.
3. Verify links, responsive layout, keyboard use, and page behavior.
4. Commit and push.
5. Confirm the public site updated.
6. Synchronize the iCloud current-source mirror and record the deployed commit.

Do not store passwords, API keys, registrar data, or private email destinations in this repository.

## Identity assets

- `assets/hsnf-social-logo-2026-09-28.png` is the founder-approved social logo, shown in the homepage opening and used for social previews. The deployed file preserves the approved source PNG unchanged.
- `assets/hsnf-wordmark.svg` — standalone derivative of the approved live header wordmark
- `assets/hsnf-favicon.svg` — small-format derivative
- `assets/hsnf-social-card.svg` — prior social-preview derivative, retained as history and no longer referenced by the page

Files with `placeholder` in their name are retained historical assets and are not current authority.

## Main files

- `index.html` — website content
- `mr-now/remastered-reinvented/index.html` — dedicated Mr Now album and streaming page
- `crimineyjay/love-remains/index.html` — dedicated Love Remains album and streaming page
- `styles.css` — appearance and mobile layout
- `config.js` — social, release, ministry, and interim-contact links
- `script.js` — menu and link rendering
- `CNAME` — custom domain for GitHub Pages
- `PUBLISHING_GUIDE.md` — current deployment and synchronization reference

## Current artist honors

CrimineyJay’s profile identifies “Then Is Loud” as a finalist for Best AI Jazz Song and “You Have the Final Word” as a finalist for Best AI Gospel Song at the 2026 SIQA AI Music Awards. The voting period is over. The site has no active ballot link or voting deadline.

## Website analytics

Implementation date: October 3, 2026. Provider: https://heartshallnotfear.goatcounter.com. Public site code: `heartshallnotfear`. Production acceptance and the deployed commit are recorded separately in the private Website operational records.

GoatCounter hosted analytics is selected for this static GitHub Pages site. It is free for reasonable public small-business use and has no DNS or hosting dependency. `analytics.js` loads its integrity-checked v5 client only when the public site code in `config.js` is enabled. The site code is not a secret. API tokens and account credentials must never appear here.

Collection uses aggregate records. Provider settings were verified with individual pageviews disabled, sessions enabled and dashboard access limited to logged-in users. Data retention is `0`, which the provider defines as no automatic deletion. The reviewed public terms do not promise perpetual service availability, so retain dated aggregate JSON exports after campaigns and during routine website maintenance. CSV export requires individual pageview storage and is not the selected archival route.

The integration measures visits to page paths plus outbound release-service, artist-social, label-social, ministry and contact events. The album pages are separately counted routes: `/mr-now/remastered-reinvented/` and `/crimineyjay/love-remains/`. Homepage sections and fragment links remain one homepage route. Events count clicks and are separate from visits. GoatCounter visits are deduplicated within its approximately eight-hour session window; these are not exact counts of different people or every page reload. Each current streaming button has its own event: `mr-now-stream-spotify`, `mr-now-stream-apple-music`, `mr-now-stream-youtube-music`, `listen-love-remains-spotify`, `listen-love-remains-apple-music`, `listen-love-remains-amazon-music` and `listen-love-remains-youtube-music`. Elizabeth’s TikTok devotional button is `elizabeth-devotional`. A music-service click does not demonstrate a stream and a devotional link click does not demonstrate a view.

Privacy: no advertising pixel, cookies or custom persistent browser identifiers are added. DNT and GPC exclude collection. Referrers are reduced to origins. Only validated `utm_campaign` and `utm_source` values are sent; arbitrary query parameters, ad click IDs and fragments are discarded. The provider may derive aggregate country/region, browser, operating system and screen-width statistics. JavaScript blockers and privacy exclusions cause undercounting. Provider processing is described at https://www.goatcounter.com/help/privacy.

Campaign convention for future approved links:

`https://heartshallnotfear.com/mr-now/remastered-reinvented/?utm_campaign=mr-now-release&utm_source=tiktok-paid`

For Love Remains, use `https://heartshallnotfear.com/crimineyjay/love-remains/` as the campaign destination. The homepage remains the general HSNF overview.

Use lowercase hyphenated public labels. Sources include `instagram-paid`, `instagram-organic`, `facebook-paid`, `facebook-organic`, `tiktok-paid`, `tiktok-organic` and `youtube-organic`. Future campaigns can use `fire-video-2026` or an approved release slug. Never put names, email addresses or account IDs in labels. `utm_medium` and `utm_content` are not separately collected by this implementation. Existing live advertisements and post links are not changed by adding analytics; untagged visits rely on available referrers and cannot be attributed retroactively.

To exclude a controlled maintenance visit without browser storage, use `?hsnf_analytics=off`. Do not use GoatCounter's persistent opt-out fragment for this workflow. A blocked analytics request must not prevent navigation.

View statistics in the signed-in provider dashboard. Download aggregate JSON ZIP exports from its settings into the private Website operational records, not this public repository. Preserve export version, collection time, covered dates and provider timezone. Treat overlapping export days as replacements, not additional visits. A read-only provider API token can support future local queries if Chris authorizes creating one; store it only in an approved private credential store. No export automation or new monitoring system is created by this change.

Documentation: https://www.goatcounter.com/help/campaigns, https://www.goatcounter.com/help/events, https://www.goatcounter.com/help/sessions, https://www.goatcounter.com/help/export-json and https://www.goatcounter.com/help/api.
