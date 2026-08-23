# Publishing Guide: GitHub Pages + Namecheap

## What this setup costs

- GitHub Pages hosting: $0 for a public repository
- Custom-domain SSL/HTTPS: $0
- Existing Namecheap domain: already owned
- Website-builder subscription: none

## Current deployment

- Account: `HeartShallNotFear`
- Repository: `website`
- Branch: `main`
- Public site: `https://heartshallnotfear.com`
- Hosting: GitHub Pages
- DNS: Namecheap BasicDNS

The initial setup below is retained as a recovery reference. Do not create a second repository for routine updates.

## Part 1 — Repository recovery

1. From GitHub, click the **+** menu in the upper-right.
2. Choose **New repository**.
3. Repository name: `website`
4. Set visibility to **Public**.
5. Do not add a README, `.gitignore`, or license because this package already includes files.
6. Click **Create repository**.

## Part 3 — Upload this website

1. Open the new repository.
2. Choose **uploading an existing file**.
3. Unzip the website package on your device first.
4. Upload the CONTENTS of the folder, not the outer folder itself.

The repository root must visibly contain:

- `index.html`
- `styles.css`
- `config.js`
- `script.js`
- `CNAME`
- `assets` folder
- `README.md`

5. In the commit box, enter: `Publish website version 1`
6. Click **Commit changes**.

## Part 4 — Turn on GitHub Pages

1. In the repository, open **Settings**.
2. In the left sidebar, open **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**.
5. Wait a few minutes.
6. GitHub will display a temporary address similar to:
   `https://heartshallnotfear.github.io/website/`

## Part 5 — Add the custom domain in GitHub first

Do this before adding DNS records at Namecheap.

1. Stay in **Settings → Pages**.
2. Under **Custom domain**, enter:
   `heartshallnotfear.com`
3. Click **Save**.

The included `CNAME` file already contains the same domain.

## Part 6 — Configure Namecheap DNS

1. Sign in to Namecheap.
2. Open **Domain List**.
3. Find `heartshallnotfear.com` and click **Manage**.
4. Open **Advanced DNS**.
5. Under **Host Records**, remove conflicting records for `@` or `www`, including:
   - Parking records
   - URL Redirect records
   - Existing A records
   - Existing CNAME records
6. Add these four A records:

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |

7. Add this CNAME record:

| Type | Host | Value | TTL |
|---|---|---|---|
| CNAME Record | www | heartshallnotfear.github.io | Automatic |

Do not include `https://`.
Do not include `/website`.
Do not add a trailing slash.

8. Save all changes.

## Part 7 — Finish HTTPS

1. Return to GitHub: **Repository → Settings → Pages**.
2. Wait for the DNS check to succeed.
3. Enable **Enforce HTTPS** when the checkbox becomes available.

DNS may begin working quickly, but full propagation and HTTPS availability can take up to 24 hours.

## Part 8 — Verify the site

Test both:

- `https://heartshallnotfear.com`
- `https://www.heartshallnotfear.com`

Also test the site on a phone.

## Updating and synchronizing the website

For a simple text or link update:

1. Open the file in GitHub.
2. Click the pencil icon.
3. Make the change.
4. Click **Commit changes**.

For image replacement:

1. Open the `assets` folder.
2. Delete the old image.
3. Upload the replacement using the same filename.

GitHub Pages normally republishes automatically after a commit. After verifying the deployed site, synchronize the exact current source into iCloud at `01 - Business/Website/Current Website Source`, excluding `.git` and secrets. Do not update from Version 1, loose root files, or the safe-merged version 2 package.

## Important security step

After the website is working, GitHub recommends verifying your domain in your GitHub account's Pages settings. This protects the domain from being claimed by another GitHub Pages repository. GitHub will provide a TXT record that you add in Namecheap.
