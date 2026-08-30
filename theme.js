(() => {
  const storageKey = "bynji-site-theme";
  const root = document.documentElement;
  let stored = null;
  try {
    stored = localStorage.getItem(storageKey);
  } catch {
    // Dark remains the deterministic default when browser storage is unavailable.
  }
  const initialTheme =
    stored === "light" || stored === "dark" ? stored : "dark";

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#06111e" : "#fbfaf7");
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    const nextTheme = theme === "dark" ? "light" : "dark";
    toggle.textContent = theme === "dark" ? "☀" : "☾";
    toggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    toggle.setAttribute("title", `Switch to ${nextTheme} mode`);
  };

  applyTheme(initialTheme);

  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    toggle.dataset.themeToggle = "true";
    toggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch {
        // The current page can still change theme when persistence is unavailable.
      }
      applyTheme(nextTheme);
    });
    header.append(toggle);
    applyTheme(root.dataset.theme || initialTheme);
  });
})();
