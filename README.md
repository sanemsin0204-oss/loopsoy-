# Made with Loops — website

A small, fast static site: a home page listing your crochet projects, and one
detail page per project with your pro tip + shoppable tools. No build tools,
no code editor required beyond basic text editing.

## Files

```
index.html                        → home page
granny-stitch-crossbody-bag.html  → the first project page
style.css                         → all styling (shared by every page)
robots.txt, sitemap.xml           → SEO basics for search engines
images/                           → logo, favicons, project photos
```

## Before you go live — fill these in

Search the files for `#` links and `TODO` comments and replace them:

1. **Amazon affiliate links** — in `granny-stitch-crossbody-bag.html`, each
   "Shop on Amazon" button has `href="#"`. Replace `#` with your real
   Amazon affiliate link for that product.
2. **Instagram link** — in `index.html`, `granny-stitch-crossbody-bag.html`,
   and the footer of both, replace the Instagram `href="#"` with your
   profile URL, e.g. `https://instagram.com/yourhandle`.
3. **Domain** — the `<link rel="canonical">`, Open Graph `og:url`/`og:image`,
   `sitemap.xml`, and `robots.txt` all use `https://www.madewithloops.com/`
   as a placeholder. Once you pick your real domain, find-and-replace that
   URL everywhere.

## GitHub Pages deployment notes

- If you deploy to `https://<username>.github.io/<repo>/` the canonical
   URLs and `sitemap.xml` should use that address (or just use relative
   links like `./` which the site already supports). You don't need to
   include your GitHub username in `robots.txt` — `robots.txt` should point
   to `/sitemap.xml` if you want search engines to find it.
- If you deploy to a custom domain, update the `og:url`, `og:image`, and
   `<link rel="canonical">` values to the final domain so social previews
   and search engines use the correct URLs.
- For GitHub Pages specifically: no code changes are required to the site to
   host it there, but update the placeholder links in `supplies.json`, the
   Instagram URL in `scripts.js`, and your contact email in `scripts.js`
   before posting.

Recommended quick checklist before your first Instagram post:
- Replace all `#REPLACE_WITH_AMAZON_AFFILIATE_LINK` entries in `supplies.json`.
- Set `instagram`, `pinterest`, and `email` values in `scripts.js` to your account.
- Update any placeholder `href="#"` values used for social links.
- Push the repository to GitHub and enable Pages in the repository settings.


## Adding a new project

1. Duplicate `granny-stitch-crossbody-bag.html` and rename it, e.g.
   `chunky-market-tote.html`.
2. In the new file: update the `<title>`, meta description, the JSON-LD
   block, the photo, heading, pro tip, and tool cards.
3. Drop your project photo in `images/` (a square-cropped thumbnail version
   works best for the home page card — keep it under ~300KB for fast
   loading).
4. In `index.html`, copy the `<article class="project-card">` block inside
   `#projects` and point it at your new file.
5. Add a `<url>` entry for the new page in `sitemap.xml`.

## Hosting it

Any of these work well for a simple static site like this one:

- **Netlify** — drag the whole folder onto app.netlify.com/drop for an
  instant live URL, then connect your own domain in site settings.
- **GitHub Pages** — push this folder to a GitHub repo and turn on Pages
  in the repo settings (Settings → Pages → deploy from branch).
- **Cloudflare Pages** — similar drag-and-drop or Git-connected deploy,
  with a fast global CDN by default.

All three offer free HTTPS, which matters for both SEO and reader trust.

## SEO notes already built in

- Unique title + meta description per page, sized for Google's snippet.
- Open Graph tags so Instagram-bio link previews and Pinterest pins look
  good when shared.
- `HowTo` structured data on the project page (tools + supplies), which is
  the schema Google favors for craft/DIY tutorials.
- `sitemap.xml` + `robots.txt` so search engines can find every page.
- Descriptive `alt` text on every image (also helps accessibility).
- One `<h1>` per page, semantic `<header>/<main>/<footer>`.

Once it's live, submit `sitemap.xml` in Google Search Console to speed up
indexing.
