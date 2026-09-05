/**
 * Bynji Interactive Product Simulator
 * 100% private, client-side only. Zero telemetry, zero external requests.
 */
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    initHeroCard();
    initShowcaseSimulator();
  });

  /* ── 1. Hero Resume Card Interactive Demo ───────────────────────────────── */
  function initHeroCard() {
    const card = document.querySelector("[data-hero-card]");
    if (!card) return;

    const resumeBtn = card.querySelector("[data-hero-resume]");
    const dismissBtn = card.querySelector("[data-hero-dismiss]");
    const resetBtn = card.querySelector("[data-hero-reset]");
    const progressFill = card.querySelector("[data-hero-progress]");
    const statusText = card.querySelector("[data-hero-status]");
    const toast = document.querySelector("[data-hero-toast]");

    let toastTimer = null;

    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 3200);
    }

    if (resumeBtn) {
      resumeBtn.addEventListener("click", () => {
        card.dataset.state = "resumed";
        if (progressFill) progressFill.style.width = "72%";
        if (statusText) statusText.textContent = "Playing from 41:46";
        showToast("✓ Resumed to 41:46 • Saved privately on device");
      });
    }

    if (dismissBtn) {
      dismissBtn.addEventListener("click", () => {
        card.dataset.state = "dismissed";
        if (statusText) statusText.textContent = "Prompt dismissed (history preserved)";
        showToast("Prompt dismissed • Progress kept in Library");
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        card.dataset.state = "initial";
        if (progressFill) progressFill.style.width = "72%";
        if (statusText) statusText.textContent = "Saved privately in your browser";
        if (toast) toast.classList.remove("is-visible");
      });
    }
  }

  /* ── 2. Showcase Window Simulator ───────────────────────────────────────── */
  function initShowcaseSimulator() {
    const sim = document.querySelector("[data-bynji-simulator]");
    if (!sim) return;

    const tabs = sim.querySelectorAll("[data-sim-tab]");
    const panels = sim.querySelectorAll("[data-sim-panel]");

    // Tab switching
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.simTab;

        tabs.forEach((t) => {
          const isCurrent = t === tab;
          t.classList.toggle("is-active", isCurrent);
          t.setAttribute("aria-selected", isCurrent ? "true" : "false");
        });

        panels.forEach((p) => {
          const isTarget = p.dataset.simPanel === target;
          p.classList.toggle("is-active", isTarget);
          p.hidden = !isTarget;
        });
      });
    });

    // Shelf item selection demo
    const shelfItems = sim.querySelectorAll("[data-shelf-card]");
    const shelfTitle = sim.querySelector("[data-shelf-preview-title]");
    const shelfMeta = sim.querySelector("[data-shelf-preview-meta]");
    const shelfProgress = sim.querySelector("[data-shelf-preview-progress]");
    const shelfTime = sim.querySelector("[data-shelf-preview-time]");

    shelfItems.forEach((card) => {
      card.addEventListener("click", () => {
        shelfItems.forEach((c) => c.classList.remove("is-selected"));
        card.classList.add("is-selected");

        if (shelfTitle) shelfTitle.textContent = card.dataset.title || "";
        if (shelfMeta) shelfMeta.textContent = card.dataset.meta || "";
        if (shelfTime) shelfTime.textContent = card.dataset.time || "";
        if (shelfProgress) {
          shelfProgress.style.width = card.dataset.pct || "50%";
        }
      });
    });

    // Insights time range switch
    const insightsBtns = sim.querySelectorAll("[data-insights-range]");
    const totalTimeEl = sim.querySelector("[data-stat-total-time]");
    const totalVideosEl = sim.querySelector("[data-stat-total-videos]");
    const completionEl = sim.querySelector("[data-stat-completion]");

    insightsBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        insightsBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        const range = btn.dataset.insightsRange;
        if (range === "week") {
          if (totalTimeEl) totalTimeEl.textContent = "14.8 hrs";
          if (totalVideosEl) totalVideosEl.textContent = "23 videos";
          if (completionEl) completionEl.textContent = "84%";
        } else if (range === "month") {
          if (totalTimeEl) totalTimeEl.textContent = "58.2 hrs";
          if (totalVideosEl) totalVideosEl.textContent = "89 videos";
          if (completionEl) completionEl.textContent = "87%";
        } else {
          if (totalTimeEl) totalTimeEl.textContent = "182.4 hrs";
          if (totalVideosEl) totalVideosEl.textContent = "312 videos";
          if (completionEl) completionEl.textContent = "91%";
        }
      });
    });

    // Interactive sync simulation
    const syncNowBtn = sim.querySelector("[data-sim-sync-trigger]");
    const syncStatusEl = sim.querySelector("[data-sim-sync-status]");
    const syncTimeEl = sim.querySelector("[data-sim-sync-time]");

    if (syncNowBtn) {
      syncNowBtn.addEventListener("click", () => {
        syncNowBtn.disabled = true;
        if (syncStatusEl) {
          syncStatusEl.innerHTML = '<span class="status-dot status-dot--syncing"></span> Syncing devices...';
        }
        setTimeout(() => {
          syncNowBtn.disabled = false;
          if (syncStatusEl) {
            syncStatusEl.innerHTML = '<span class="status-dot status-dot--success"></span> Synced (2 devices)';
          }
          if (syncTimeEl) {
            syncTimeEl.textContent = "Just now";
          }
        }, 800);
      });
    }
  }
})();
