# yummywormy

My personal dev site, live at **https://yummywormy1-stack.github.io**.

It's plain HTML, CSS and JS hosted on GitHub Pages. There's no build step: whatever is on `main` is what gets served.

The page is just a list of my public GitHub repos, most recently updated first. It's loaded live, so making a repo public or pushing to one updates the site on its own. Forks are hidden.

## Files

```
index.html        the page
404.html          not-found page
assets/
  style.css       styles (grayscale, follows the system light/dark setting)
  main.js         loads the project list from GitHub
  favicon.svg     squiggle icon
.nojekyll         tells GitHub Pages to serve files as-is (no Jekyll build)
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Renaming the account

To get the URL to say `yummywormy.github.io`:

1. On GitHub, go to **Settings → Account → Change username** and pick the new name.
2. Rename this repo to `<new-username>.github.io` (**repo Settings → General → Repository name**). A user site only works when the repo has exactly that name.

No code changes needed: the page reads the username from its own URL.

> Heads up: GitHub redirects old repo links after a username change, but **not** the old `*.github.io` address. The old username also becomes available for anyone to claim.
