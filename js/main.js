document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const progress = document.getElementById('scrollProgress');
  const header = document.getElementById('siteHeader');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const githubUser = document.body.getAttribute('data-github-user') || 'CharithKalhara';
  const githubProjectsGrid = document.getElementById('githubProjectsGrid');
  const githubProjectsStatus = document.getElementById('githubProjectsStatus');
  const githubRepoCards = document.getElementById('githubRepoCards');
  const githubStats = document.getElementById('githubStats');
  const githubLanguages = document.getElementById('githubLanguages');
  const githubRecentProjects = document.getElementById('githubRecentProjects');

  // Hide loading screen
  window.setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.pointerEvents = 'none';
    window.setTimeout(() => loadingScreen.remove(), 400);
  }, 1000);

  // Mobile menu
  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click
  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Sticky nav style + progress + back button
  const updateScrollUI = () => {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = h > 0 ? (y / h) * 100 : 0;

    progress.style.width = `${ratio}%`;
    backToTop.classList.toggle('show', y > 500);
    header.style.borderBottomColor = y > 8 ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.14)';
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Contact form
  
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        formStatus.textContent = 'Please complete all required fields.';
        return;
      }

      const token = grecaptcha.getResponse();

      if (!token) {
        formStatus.textContent = 'Please complete the reCAPTCHA.';
        return;
      }

      formStatus.textContent = 'Sending...';

      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      try {
        const response = await fetch(
          'https://yvlpywwzn4zxrokmgklaiclowe0kxhyt.lambda-url.ap-southeast-1.on.aws/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token,
              name: form.name.value,
              email: form.email.value,
              subject: form.subject ? form.subject.value : '',
              message: form.message.value
            })
          }
        );

        const result = await response.json();

        if (result.success) {
          formStatus.textContent = 'Sent successfully!';

          form.reset();
          grecaptcha.reset();
        } else {
          formStatus.textContent =
            result.message || 'Failed to send message.';
          formStatus.style.color = '#ef4444';

          grecaptcha.reset();
        }
      } catch (error) {
        console.error(error);

        formStatus.textContent =
          'Server error. Please try again later.';
        formStatus.style.color = '#ef4444';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    });
  // Typewriter subtitle
  const typing = document.querySelector('.typing');
  if (typing) {
    const fullText = typing.getAttribute('data-text') || '';
    let i = 0;
    const tick = () => {
      typing.textContent = fullText.slice(0, i);
      i += 1;
      if (i <= fullText.length) window.setTimeout(tick, 35);
    };
    tick();
  }

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);

  const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

  const formatDate = (value) => new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));

  const safeExternalUrl = (value) => {
    if (!value) return '';

    try {
      const url = new URL(value, window.location.href);
      return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
    } catch {
      return '';
    }
  };

  const renderEmptyState = (element, message) => {
    if (element) {
      element.innerHTML = `<div class="empty-state">${escapeHtml(message)}</div>`;
    }
  };

  const fetchJson = async (url) => {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}`);
    }

    return response.json();
  };

  const renderRepoCard = (repo) => `
    <article class="repo-card">
      <h4>${escapeHtml(repo.name)}</h4>
      <p>${escapeHtml(repo.description || 'Public GitHub repository')}</p>
      <div class="repo-meta">
        <span class="pill">${escapeHtml(repo.language || 'Code')}</span>
        <span class="pill">★ ${formatNumber(repo.stargazers_count)}</span>
        <span class="pill">Updated ${formatDate(repo.updated_at)}</span>
      </div>
      <div class="repo-links">
        <a href="${repo.html_url}" target="_blank" rel="noopener">GitHub</a>
        ${safeExternalUrl(repo.homepage) ? `<a href="${safeExternalUrl(repo.homepage)}" target="_blank" rel="noopener">Live demo</a>` : ''}
      </div>
    </article>
  `;

  const renderMiniProject = (repo) => `
    <article class="mini-item">
      <h4><a href="${repo.html_url}" target="_blank" rel="noopener">${escapeHtml(repo.name)}</a></h4>
      <p>${escapeHtml(repo.description || 'Public repository')}</p>
      <div class="mini-meta">
        <span class="mini-tag">${escapeHtml(repo.language || 'Code')}</span>
        <span class="mini-tag">★ ${formatNumber(repo.stargazers_count)}</span>
      </div>
    </article>
  `;

  const renderGitHubData = (user, repos) => {
    const publicRepos = repos.filter((repo) => !repo.fork && !repo.archived);
    const recentRepos = [...publicRepos]
      .sort((left, right) => new Date(right.updated_at) - new Date(left.updated_at))
      .slice(0, 4);
    const featuredRepos = [...publicRepos]
      .sort((left, right) => right.stargazers_count - left.stargazers_count || new Date(right.updated_at) - new Date(left.updated_at))
      .slice(0, 3);

    if (githubProjectsGrid) {
      githubProjectsGrid.innerHTML = recentRepos.length
        ? recentRepos.map(renderRepoCard).join('')
        : '<div class="empty-state">No public repositories were found.</div>';
    }

    if (githubRepoCards) {
      githubRepoCards.innerHTML = featuredRepos.length
        ? featuredRepos.map(renderMiniProject).join('')
        : '<div class="empty-state">No repositories available to highlight.</div>';
    }

    if (githubStats) {
      const starTotal = publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const forkTotal = publicRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
      const latestUpdate = recentRepos[0]?.updated_at;
      githubStats.innerHTML = `
        <div class="stat-item"><h4>${formatNumber(user.public_repos || 0)}</h4><p>Public repositories</p></div>
        <div class="stat-item"><h4>${formatNumber(user.followers || 0)}</h4><p>Followers</p></div>
        <div class="stat-item"><h4>${formatNumber(starTotal)}</h4><p>Total stars</p></div>
        <div class="stat-item"><h4>${formatNumber(forkTotal)}</h4><p>Total forks</p></div>
        <div class="stat-item"><h4>${latestUpdate ? formatDate(latestUpdate) : 'N/A'}</h4><p>Latest update</p></div>
      `;
    }

    if (githubLanguages) {
      const languageCounts = publicRepos.reduce((counts, repo) => {
        if (repo.language) {
          counts[repo.language] = (counts[repo.language] || 0) + 1;
        }
        return counts;
      }, {});

      const totalLanguageRepos = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);
      const topLanguages = Object.entries(languageCounts)
        .sort((left, right) => right[1] - left[1])
        .slice(0, 5);

      githubLanguages.innerHTML = topLanguages.length
        ? topLanguages.map(([language, count]) => `
            <div class="language-row">
              <div class="repo-meta" style="margin: 0;">
                <span class="pill">${escapeHtml(language)}</span>
                <span class="pill">${formatNumber(count)} repo${count === 1 ? '' : 's'}</span>
              </div>
              <div class="bar"><span style="width: ${Math.max(12, (count / totalLanguageRepos) * 100)}%"></span></div>
            </div>
          `).join('')
        : '<div class="empty-state">Language data is not available yet.</div>';
    }

    if (githubRecentProjects) {
      githubRecentProjects.innerHTML = recentRepos.length
        ? recentRepos.slice(0, 3).map(renderMiniProject).join('')
        : '<div class="empty-state">No recent projects to show.</div>';
    }

    if (githubProjectsStatus) {
      githubProjectsStatus.textContent = `Showing ${recentRepos.length} recent repositories from @${githubUser}.`;
    }
  };

  const loadGitHubPortfolio = async () => {
    try {
      const [user, repos] = await Promise.all([
        fetchJson(`https://api.github.com/users/${encodeURIComponent(githubUser)}`),
        fetchJson(`https://api.github.com/users/${encodeURIComponent(githubUser)}/repos?per_page=100&sort=updated&direction=desc`)
      ]);

      renderGitHubData(user, repos);
    } catch (error) {
      console.error(error);
      const message = 'GitHub data could not be loaded right now.';
      renderEmptyState(githubProjectsGrid, message);
      renderEmptyState(githubRepoCards, message);
      renderEmptyState(githubStats, message);
      renderEmptyState(githubLanguages, message);
      renderEmptyState(githubRecentProjects, message);
      if (githubProjectsStatus) {
        githubProjectsStatus.textContent = message;
      }
    }
  };

  void loadGitHubPortfolio();
});
