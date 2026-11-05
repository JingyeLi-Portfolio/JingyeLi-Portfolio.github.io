/* ==========================================================================
   POI 互动地图渲染器
   读取 window.LL_POI 配置（见 lastlight-poi.js），在页面上生成可点的按钮。
   页面里放一个占位元素即可：
     <div data-poi-map="overview"></div>  关卡总览（图+侧栏详情+图例）
     <div data-poi-map="layout"></div>    主区白盒布局（同上）
     <div data-poi-map="home"></div>      首页精选卡片（只显示 home:true 的按钮）
   桌面端：地图在左、详情面板在右侧 sticky，点按钮一屏内即可看到详情。
   移动端：面板在图下方，点击后自动滚动到面板。
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.LL_POI;
  if (!cfg || !cfg.maps) return;

  var roots = Array.prototype.slice.call(document.querySelectorAll('[data-poi-map]'));
  if (!roots.length) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 工具 ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function catLabel(cat) {
    return (cfg.categories[cat] && cfg.categories[cat].label) || cat;
  }

  /* 每张图可以有自己的图例文案（如布局图只区分资源 / 风险 / 节点 / 目标） */
  function catsOf(mapKey) {
    var m = cfg.maps[mapKey];
    return (m && m.categories) || cfg.categories;
  }

  function labelOf(cats, cat) {
    return (cats[cat] && cats[cat].label) || cat;
  }

  /* ---------- 详情面板 ---------- */

  /* 一个 POI 可以有多张截图：优先用 imgs 数组，兼容旧的 img 单图 */
  function poiImages(p) {
    if (p.imgs && p.imgs.length) return p.imgs;
    if (p.img) return [p.img];
    return [];
  }

  var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>';

  /* 多图翻页：左右箭头 + 页码 + 小圆点，支持键盘左右键 */
  function bindGallery(box, imgs, name) {
    if (!box) return;
    var imgEl = box.querySelector('img');
    var view = box.querySelector('.poi-g-view');
    var count = box.querySelector('.poi-g-count');
    var dots = Array.prototype.slice.call(box.querySelectorAll('.poi-g-dot'));

    /* 打开这个 POI 时就把它的全部截图预先下载好，翻页不再现等网络 */
    imgs.forEach(function (src) {
      var pre = new Image();
      pre.decoding = 'async';
      pre.src = src;
    });

    function cur() { return parseInt(box.getAttribute('data-i'), 10) || 0; }

    function show(i) {
      if (i < 0) i = imgs.length - 1;
      if (i >= imgs.length) i = 0;
      box.setAttribute('data-i', String(i));

      var src = imgs[i];
      var applied = false;
      function apply() {
        if (applied) return;
        applied = true;
        imgEl.src = src;
        imgEl.alt = name + ' 实景 ' + (i + 1);
        if (view) view.classList.remove('is-loading');
      }

      if (count) count.textContent = (i + 1) + ' / ' + imgs.length;
      dots.forEach(function (d, k) {
        if (k === i) d.classList.add('is-on');
        else d.classList.remove('is-on');
      });

      /* 图已在缓存里就立刻换；否则先盖一层「加载截图…」，避免看起来像点了没反应 */
      var probe = new Image();
      probe.onload = apply;
      probe.onerror = apply;
      probe.src = src;
      if (probe.complete && probe.naturalWidth) apply();
      else if (view) view.classList.add('is-loading');
    }

    var prev = box.querySelector('.poi-g-prev');
    var next = box.querySelector('.poi-g-next');
    if (prev) prev.addEventListener('click', function (e) { e.stopPropagation(); show(cur() - 1); });
    if (next) next.addEventListener('click', function (e) { e.stopPropagation(); show(cur() + 1); });
    dots.forEach(function (d) {
      d.addEventListener('click', function (e) {
        e.stopPropagation();
        show(parseInt(d.getAttribute('data-i'), 10) || 0);
      });
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur() - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(cur() + 1); }
    });
  }

  function fillDetail(panel, p) {
    var cats = catsOf(p.mapKey);
    var imgs = poiImages(p);
    var multi = imgs.length > 1;
    var fig = '';

    if (imgs.length) {
      var dots = '';
      for (var i = 0; i < imgs.length; i++) {
        dots += '<button type="button" class="poi-g-dot' + (i === 0 ? ' is-on' : '') +
                '" data-i="' + i + '" aria-label="第 ' + (i + 1) + ' 张"></button>';
      }
      fig =
        '<div class="poi-gallery" tabindex="0" data-i="0" role="group" aria-label="' + esc(p.name) + ' 实景截图">' +
          '<div class="poi-g-view">' +
            '<img src="' + esc(imgs[0]) + '" alt="' + esc(p.name) + ' 实景 1" loading="lazy" />' +
            (multi ? '<button type="button" class="poi-g-nav poi-g-prev" aria-label="上一张">' + ARROW_L + '</button>' : '') +
            (multi ? '<button type="button" class="poi-g-nav poi-g-next" aria-label="下一张">' + ARROW_R + '</button>' : '') +
            '<span class="poi-g-count mono">1 / ' + imgs.length + '</span>' +
          '</div>' +
          (multi ? '<div class="poi-g-dots">' + dots + '</div>' : '') +
        '</div>';
    } else {
      fig = '<div class="poi-detail-fig poi-detail-fig-empty mono">POI 实景截图</div>';
    }

    panel.innerHTML =
      '<span class="poi-cat poi-cat-' + esc(p.cat) + '">' + esc(labelOf(cats, p.cat)) + '</span>' +
      '<h3 class="poi-detail-title">' + esc(p.name) + '</h3>' +
      '<p class="poi-detail-desc">' + esc(p.desc) + '</p>' +
      fig;
    panel.classList.add('is-filled');

    if (multi) bindGallery(panel.querySelector('.poi-gallery'), imgs, p.name);

    /* 小屏（面板在图下方）时自动滚过去，保证一屏内看到详情 */
    if (window.innerWidth <= 1000 && !prefersReduced) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function fillHomeInfo(p) {
    var info = document.getElementById('homeMapInfo');
    if (!info) return;
    info.innerHTML = '<strong>' + esc(p.name) + '</strong>' + esc(p.desc);
  }

  /* ---------- 主流程 ---------- */

  roots.forEach(function (root) {
    var mode = root.getAttribute('data-poi-map');           // overview / layout / home
    var mapKey = mode === 'home' ? 'overview' : mode;
    var map = cfg.maps[mapKey];
    if (!map) return;

    var list = map.pois.filter(function (p) {
      return mode === 'home' ? p.home !== false : true;
    });

    root.classList.add('poi-map');

    /* 桌面端左图右栏布局 */
    var layout = document.createElement('div');
    layout.className = mode === 'home' ? 'poi-home' : 'poi-layout';

    var main = document.createElement('div');
    main.className = 'poi-main';

    var stage = document.createElement('div');
    stage.className = 'poi-stage';
    /* 按图片真实宽高比预留空间：图还没加载出来时地图也不会塌成一条缝，
       圆点坐标（百分比）因此始终落在正确位置上 */
    if (map.ratio) stage.style.aspectRatio = map.ratio;

    var img = document.createElement('img');
    img.src = map.image;
    img.alt = map.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    stage.appendChild(img);

    var btns = [];
    var panel = null;

    list.forEach(function (p) {
      p.mapKey = mapKey;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'poi-btn poi-btn-' + esc(p.cat);
      btn.style.left = p.x + '%';
      btn.style.top = p.y + '%';
      btn.setAttribute('data-name', p.name);
      btn.setAttribute('aria-label', p.name);
      btn.innerHTML = '<i aria-hidden="true"></i>';

      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (mode === 'home') {
          fillHomeInfo(p);
        } else if (panel) {
          fillDetail(panel, p);
        }
      });

      stage.appendChild(btn);
      btns.push(btn);
    });

    main.appendChild(stage);

    if (mode !== 'home') {
      /* 图例：五种颜色 */
      /* 图例只显示这张图上真正用到的分类 */
      var cats = catsOf(mapKey);
      var usedCats = [];
      list.forEach(function (p) {
        if (usedCats.indexOf(p.cat) === -1) usedCats.push(p.cat);
      });

      var legend = document.createElement('div');
      legend.className = 'poi-legend';
      var html = '';
      Object.keys(cats).forEach(function (key) {
        if (usedCats.indexOf(key) === -1) return;
        html += '<span><i class="poi-swatch poi-btn-' + esc(key) + '" aria-hidden="true"></i>' +
                esc(labelOf(cats, key)) + '</span>';
      });
      legend.innerHTML = html;
      main.appendChild(legend);
    }

    layout.appendChild(main);

    if (mode !== 'home') {
      panel = document.createElement('div');
      panel.className = 'poi-detail';
      panel.id = 'poiDetail-' + mapKey;
      panel.setAttribute('aria-live', 'polite');
      panel.innerHTML =
        '<p class="poi-detail-empty mono">点地图上的标记，右侧查看该位置的设计说明。</p>';
      layout.appendChild(panel);
    }

    root.appendChild(layout);
  });
})();
