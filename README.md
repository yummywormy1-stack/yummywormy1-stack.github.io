# yummywormy

My personal dev site, live at **https://yummywormy1-stack.github.io**.

It's plain HTML, CSS and JS hosted on GitHub Pages. There's no build step: whatever is on `main` is what gets served.

## What's on it

- **Projects**: loaded live from my public GitHub repos, most recently updated first. Make a repo public or push to one and it shows up on its own. Forks are hidden.
- **The stack**: my rig and desk setup.
- A matching 404 page, dark and light themes, and a preview image for when the link gets pasted into Discord, X and similar apps.

## Files

```
index.html        main page (hero, projects, stack)
404.html          not-found page
assets/
  style.css       all styles; colors are CSS variables at the top
  main.js         GitHub links + the live project list
  favicon.svg     gummy-worm icon
  og.png          1200x630 link preview image
.nojekyll         tells GitHub Pages to serve files as-is (no Jekyll build)
```

## Editing

| Change | Where |
| --- | --- |
| Tagline | `index.html`, the `.lede` paragraph in the hero |
| Setup / gear | `index.html`, `#stack` section. Each item is one `<li>`: copy one and change the label and value |
| How many projects show | `MAX_REPOS` in `assets/main.js` |
| Colors | Variables at the top of `assets/style.css` (dark first, then light) |

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Renaming the account

The site is already branded **yummywormy**. To get the URL to match (`yummywormy.github.io`):

1. On GitHub, go to **Settings → Account → Change username** and pick the new name.
2. Rename this repo to `<new-username>.github.io` (**repo Settings → General → Repository name**). A user site only works when the repo has exactly that name.
3. In `index.html`, update the `og:url` and `og:image` URLs to the new domain.

That's it. The GitHub links and the project list read the username from the site's URL, so they follow the rename automatically.

> Heads up: GitHub redirects old repo links after a username change, but **not** the old `*.github.io` address. The old username also becomes available for anyone to claim.
