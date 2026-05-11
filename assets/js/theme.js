(function() {
  'use strict';

  var THEME_KEY = 'theme';
  var html = document.documentElement;
  var toggleBtn = document.getElementById('theme-toggle');
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.querySelector('.site-nav');

  // Theme toggle
  function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Sync giscus theme
    var giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
      var giscusTheme = theme === 'dark' ? 'dark_dimmed' : 'light';
      giscusFrame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: giscusTheme } } },
        'https://giscus.app'
      );
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      var current = html.getAttribute('data-theme') || getPreferredTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });

    // Close nav when clicking a link
    nav.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
      });
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
