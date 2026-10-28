(() => {
  // On GitHub Pages the username is the subdomain (<user>.github.io), so
  // renaming the account needs no code changes. The fallback is for local previews.
  const FALLBACK_USER = "yummywormy1-stack";
  const MAX_REPOS = 6;

  const host = location.hostname.toLowerCase();
  const user = host.endsWith(".github.io") ? host.slice(0, -".github.io".length) : FALLBACK_USER;
  const profile = `https://github.com/${user}`;

  document.querySelectorAll("[data-gh]").forEach((a) => (a.href = profile));
  document.querySelectorAll("[data-gh-repos]").forEach((a) => (a.href = `${profile}?tab=repositories`));
  document.getElementById("year").textContent = new Date().getFullYear();

  const grid = document.getElementById("repo-grid");

  // Subset of GitHub's linguist colors.
  const LANG_COLORS = {
    "C#": "#178600",
    "C++": "#f34b7d",
    CSS: "#663399",
    Go: "#00add8",
    HTML: "#e34c26",
    Java: "#b07219",
    JavaScript: "#f1e05a",
    Lua: "#000080",
    Luau: "#00a2ff",
    Python: "#3572a5",
    Rust: "#dea584",
    Shell: "#89e051",
    TypeScript: "#3178c6",
  };

  const REPO_ICON =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>';

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const timeAgo = (iso) => {
    const seconds = (Date.now() - new Date(iso)) / 1000;
    const units = [
      ["year", 31536000],
      ["month", 2592000],
      ["week", 604800],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
    ];
    const fmt = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    for (const [unit, size] of units) {
      if (seconds >= size) return fmt.format(-Math.floor(seconds / size), unit);
    }
    return "just now";
  };

  const repoCard = (repo) => {
    const card = el("a", "card");
    card.href = repo.html_url;
    card.target = "_blank";
    card.rel = "noopener";

    const name = el("h3", "repo-name");
    name.innerHTML = REPO_ICON;
    name.append(repo.name);

    const meta = el("div", "repo-meta");
    if (repo.language) {
      const lang = el("span");
      const dot = el("span", "lang-dot");
      dot.style.background = LANG_COLORS[repo.language] || "var(--muted)";
      lang.append(dot, repo.language);
      meta.append(lang);
    }
    if (repo.stargazers_count) meta.append(el("span", null, `★ ${repo.stargazers_count}`));
    meta.append(el("span", null, `updated ${timeAgo(repo.pushed_at)}`));

    card.append(name, el("p", "repo-desc", repo.description || "No description yet."), meta);
    return card;
  };

  const showStatus = (text) => {
    const status = el("p", "status", `${text} `);
    const link = el("a", null, "Browse GitHub →");
    link.href = `${profile}?tab=repositories`;
    status.append(link);
    grid.replaceChildren(status);
  };

  fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=100`, {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      return res.json();
    })
    .then((repos) => {
      const shown = repos
        .filter((r) => !r.fork && r.name.toLowerCase() !== `${user}.github.io`)
        .slice(0, MAX_REPOS);
      if (!shown.length) return showStatus("Nothing public yet. Check back soon.");
      grid.replaceChildren(...shown.map(repoCard));
    })
    .catch(() => showStatus("Couldn't reach GitHub right now."));
})();
