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

The site now supports multiple project categories through `projects.json` and a reusable project template page.

1. Create a new project page by copying `project-template.html` and renaming it,
   for example `mini-zip-pouch.html` or `daisy-flower.html`.
2. Update the page content for that project: title, meta description, photo,
   category label, heading, short description, pro tip, and supply cards.
3. Save your project image in `images/` and use a square-cropped thumbnail for
   the gallery card. Keep the file size reasonable for faster loading.
4. Add a new entry to `projects.json` with:
   - `slug`
   - `title`
   - `category`
   - `categoryKey` (`bags`, `accessories`, `plushies`, `flowers`, or `miniatures`)
   - `description`
   - `thumb`
   - `href`
5. Point `href` to the new HTML file you created, and make sure the image path
   in `thumb` matches the file you uploaded.
6. Add a `<url>` entry for the new page in `sitemap.xml`.

### Quick future workflow

When you make a new crochet piece:
- create the page from the template,
- add one new object to `projects.json`,
- upload the image,
- and update `sitemap.xml`.

That keeps bags, accessories, plushies, flowers, and miniatures all in the same gallery system without needing a separate hard-coded card each time.

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
