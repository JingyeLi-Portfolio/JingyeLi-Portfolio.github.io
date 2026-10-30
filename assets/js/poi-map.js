/* ==========================================================================
   POI 互动地图渲染器
   读取 window.LL_POI 配置（见 lastlight-poi.js），在页面上生成可点的按钮。
   页面里放一个占位元素即可：
     <div data-poi-map="page"></div>  详情页模式（按钮+详情面板+图例）
     <div data-poi-map="home"></div>  首页模式（只显示 home:true 的按钮）
   编辑模式：网址加 #poi-edit，可拖动按钮取坐标。
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.LL_POI;
  if (!cfg) return;

  var roots = Array.prototype.slice.call(document.querySelectorAll('[data-poi-map]'));
  if (!roots.length) return;

  var isEditing = location.hash.indexOf('poi-edit') !== -1;

  /* ---------- 工具 ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function catLabel(cat) {
    return (cfg.categories[cat] && cfg.categories[cat].label) || cat;
  }

  /* ---------- 详情面板（详情页模式） ---------- */

  function buildDetailPanel(root) {
    var panel = document.createElement('div');
    panel.className = 'poi-detail';
    panel.id = 'poiDetail';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML =
      '<p class="poi-detail-empty mono">点地图上的标记，查看该位置的设计说明。</p>';
    root.appendChild(panel);
    return panel;
  }

  function fillDetail(panel, p) {
    var fig = p.img
      ? '<div class="poi-detail-fig"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" /></div>'
      : '<div class="poi-detail-fig poi-detail-fig-empty mono">POI 实景截图 · 待补充</div>';

    panel.innerHTML =
      '<span class="poi-cat poi-cat-' + esc(p.cat) + '">' + esc(catLabel(p.cat)) + '</span>' +
      '<h3 class="poi-detail-title">' + esc(p.name) + '</h3>' +
      '<p class="poi-detail-desc">' + esc(p.desc) + '</p>' +
      fig;
    panel.classList.add('is-filled');
  }

  /* ---------- 首页信息行 ---------- */

  function fillHomeInfo(p) {
    var info = document.getElementById('homeMapInfo');
    if (!info) return;
    info.innerHTML = '<strong>' + esc(p.name) + '</strong>' + esc(p.desc);
  }

  /* ---------- 编辑模式 ---------- */

  function makeEditable(stage, btn, p) {
    btn.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      btn.classList.add('is-dragging');

      function onMove(ev) {
        var r = stage.getBoundingClientRect();
        var x = Math.min(100, Math.max(0, (ev.clientX - r.left) / r.width * 100));
        var y = Math.min(100, Math.max(0, (ev.clientY - r.top) / r.height * 100));
        p.x = Math.round(x * 10) / 10;
        p.y = Math.round(y * 10) / 10;
        btn.style.left = p.x + '%';
        btn.style.top = p.y + '%';
        var bar = document.getElementById('poiEditBar');
        if (bar) {
          bar.textContent = p.name + '  →  x: ' + p.x + ', y: ' + p.y + '  （松手后把这行数字填进 lastlight-poi.js）';
        }
      }

      function onUp() {
        btn.classList.remove('is-dragging');
        btn.removeEventListener('pointermove', onMove);
        btn.removeEventListener('pointerup', onUp);
      }

      btn.addEventListener('pointermove', onMove);
      btn.addEventListener('pointerup', onUp);
    });
  }

  function buildEditBar(root) {
    var bar = document.createElement('div');
    bar.className = 'poi-edit-bar mono';
    bar.id = 'poiEditBar';
    bar.textContent = '编辑模式：按住任意按钮拖动到想要的位置，坐标会显示在这里';
    root.insertBefore(bar, root.firstChild);
  }

  /* ---------- 主流程 ---------- */

  roots.forEach(function (root) {
    var mode = root.getAttribute('data-poi-map');
    var list = cfg.pois.filter(function (p) {
      return mode === 'home' ? p.home !== false : true;
    });

    root.classList.add('poi-map');

    var stage = document.createElement('div');
    stage.className = 'poi-stage';

    var img = document.createElement('img');
    img.src = cfg.image;
    img.alt = cfg.alt || '';
    img.loading = 'lazy';
    stage.appendChild(img);

    var btns = [];
    var panel = null;

    list.forEach(function (p) {
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

      if (isEditing) makeEditable(stage, btn, p);
      stage.appendChild(btn);
      btns.push(btn);
    });

    root.appendChild(stage);

    if (mode !== 'home') {
      /* 图例：五种颜色 */
      var legend = document.createElement('div');
      legend.className = 'poi-legend';
      var html = '';
      Object.keys(cfg.categories).forEach(function (key) {
        html += '<span><i class="poi-swatch poi-btn-' + esc(key) + '" aria-hidden="true"></i>' +
                esc(cfg.categories[key].label) + '</span>';
      });
      legend.innerHTML = html;
      root.appendChild(legend);

      panel = buildDetailPanel(root);
    }

    if (isEditing) buildEditBar(root);
  });
})();
