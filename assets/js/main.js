/* ==========================================================================
   作品集主页 · 交互脚本
   无任何第三方依赖，全部原生实现
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. 深色 / 浅色主题切换
     --------------------------------------------------------------- */
  var themeToggle = doc.getElementById('themeToggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* 隐私模式下忽略 */ }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // 用户没有手动选过时，跟随系统设置变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
    if (!saved) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });

  /* ---------------------------------------------------------------
     2. 滚动进度条 + 顶栏状态
     --------------------------------------------------------------- */
  var progress = doc.getElementById('progress');
  var header = doc.getElementById('siteHeader');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || doc.documentElement.scrollTop;
    var max = doc.documentElement.scrollHeight - window.innerHeight;

    if (progress) {
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------
     3. 移动端菜单
     --------------------------------------------------------------- */
  var menuToggle = doc.getElementById('menuToggle');
  var nav = doc.getElementById('nav');

  function closeMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开菜单');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    // 点击菜单外部收起
    doc.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
    });

    // 视口变宽后重置菜单状态
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (e) {
      if (e.matches) closeMenu();
    });
  }

  /* ---------------------------------------------------------------
     4. 滚动入场动画
     --------------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // 同组元素依次错开，形成轻微节奏感
        var siblings = Array.prototype.slice.call(
          entry.target.parentElement ? entry.target.parentElement.children : []
        ).filter(function (n) { return n.classList && n.classList.contains('reveal'); });
        var idx = Math.max(0, siblings.indexOf(entry.target));
        entry.target.style.transitionDelay = Math.min(idx * 70, 280) + 'ms';
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------
     5. 导航高亮（Scrollspy）
     --------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return doc.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function syncActive() {
    var probe = (window.scrollY || 0) + window.innerHeight * 0.32;
    var current = null;

    sections.forEach(function (sec) {
      if (sec.offsetTop <= probe) current = sec;
    });

    // 滚到底部时，强制高亮最后一个区块
    if (window.innerHeight + window.scrollY >= doc.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1] || current;
    }

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', !!current && link.getAttribute('href') === '#' + current.id);
    });
  }

  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(syncActive);
  }, { passive: true });
  window.addEventListener('resize', syncActive, { passive: true });
  syncActive();

  /* ---------------------------------------------------------------
     6. 页脚年份
     --------------------------------------------------------------- */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------------
     7. 外链安全处理：自动为站外链接补上 rel
     --------------------------------------------------------------- */
  Array.prototype.slice.call(doc.querySelectorAll('a[href^="http"]')).forEach(function (a) {
    if (a.hostname && a.hostname !== window.location.hostname) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();
