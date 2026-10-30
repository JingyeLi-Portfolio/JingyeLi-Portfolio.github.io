/* ==========================================================================
   物资图鉴 · Loot Gallery（Last Light 详情页）
   数据来源：loot_system/README.md（6 大分类 · 36 种物资 · 3 档稀有度）
   页面占位：<div data-loot-gallery></div>
   稀有度：common 常见 / uncommon 少见 / rare 稀有
   ========================================================================== */
(function () {
  'use strict';

  var root = document.querySelector('[data-loot-gallery]');
  if (!root) return;

  var CATS = [
    { key: 'all',   label: '全部' },
    { key: 'food',  label: '食物' },
    { key: 'water', label: '饮水' },
    { key: 'med',   label: '医疗' },
    { key: 'mat',   label: '材料' },
    { key: 'tool',  label: '工具' },
    { key: 'val',   label: '贵重' }
  ];

  var RARITY = {
    common:   { label: '常见', cls: 'r-common' },
    uncommon: { label: '少见', cls: 'r-uncommon' },
    rare:     { label: '稀有', cls: 'r-rare' }
  };

  /* [分类, 物品名, 稀有度, 效果说明, 捡取数量, 图标文件名] */
  var ITEMS = [
    /* ---- 食物（6） ---- */
    ['food', '午餐肉罐头', 'common',   '饱食 +34', '×1', 'LOOT_Food_Can_01.png'],
    ['food', '罐头堆',     'common',   '饱食 +34', '×3', 'LOOT_Food_CanStack_01.png'],
    ['food', '三连罐头',   'uncommon', '饱食 +34', '×3', 'LOOT_Food_CanPack_01.png'],
    ['food', '泡面桶',     'common',   '饱食 +30', '×1', 'LOOT_Food_NoodleCup_01.png'],
    ['food', '军粮袋',     'uncommon', '饱食 +48', '×1', 'LOOT_Food_MRE_01.png'],
    ['food', '吐司面包',   'common',   '饱食 +22', '×1', 'LOOT_Food_Bread_01.png'],
    /* ---- 饮水（3） ---- */
    ['water', '矿泉水瓶',  'common',   '水分 +36', '×1', 'LOOT_Water_Bottle_01.png'],
    ['water', '便携水桶',  'uncommon', '水分 +60', '×1', 'LOOT_Water_Jug_01.png'],
    ['water', '易拉罐',    'common',   '水分 +20', '×1', 'LOOT_Drink_SodaCan_01.png'],
    /* ---- 医疗（7） ---- */
    ['med', '急救箱',      'uncommon', '生命 +55', '×1', 'LOOT_Med_FirstAidKit_01.png'],
    ['med', '绷带卷',      'common',   '生命 +18', '×1', 'LOOT_Med_Bandage_01.png'],
    ['med', '药瓶',        'common',   '生命 +25', '×1', 'LOOT_Med_PillBottle_01.png'],
    ['med', '泡罩药板',    'common',   '生命 +20', '×1', 'LOOT_Med_Blister_01.png'],
    ['med', '注射器',      'uncommon', '生命 +35', '×1', 'LOOT_Med_Syringe_01.png'],
    ['med', '急救腰包',    'uncommon', '生命 +30', '×1', 'LOOT_Med_Pouch_01.png'],
    ['med', '便携氧气瓶',  'uncommon', '生命 +40', '×1', 'LOOT_Med_Oxygen_01.png'],
    /* ---- 材料（8） ---- */
    ['mat', '木材捆',      'common',   '建造 / 修复', '×6', 'LOOT_Mat_WoodBundle_01.png'],
    ['mat', '木板堆',      'common',   '建造 / 修复', '×8', 'LOOT_Mat_PlankStack_01.png'],
    ['mat', '废金属堆',    'common',   '建造 / 修复', '×5', 'LOOT_Mat_Scrap_01.png'],
    ['mat', '钢管束',      'common',   '建造 / 修复', '×6', 'LOOT_Mat_Pipe_01.png'],
    ['mat', '布料卷',      'common',   '建造 / 修复', '×5', 'LOOT_Mat_ClothRoll_01.png'],
    ['mat', '绳索盘',      'common',   '建造 / 修复', '×3', 'LOOT_Mat_Rope_01.png'],
    ['mat', '燃料罐',      'uncommon', '发电机燃料', '×4', 'LOOT_Mat_FuelCan_01.png'],
    ['mat', '砖堆',        'common',   '建造 / 修复', '×8', 'LOOT_Mat_BrickStack_01.png'],
    /* ---- 工具（7） ---- */
    ['tool', '工具箱',     'uncommon', '工具集合',       '×1', 'LOOT_Tool_Toolbox_01.png'],
    ['tool', '撬棍',       'common',   '近战 / 破坏结构', '×1', 'LOOT_Tool_Crowbar_01.png'],
    ['tool', '活动扳手',   'common',   '近战 / 修复结构', '×1', 'LOOT_Tool_Wrench_01.png'],
    ['tool', '手电筒',     'uncommon', '照明',           '×1', 'LOOT_Tool_Flashlight_01.png'],
    ['tool', '电池组',     'common',   '供电耗材',       '×2', 'LOOT_Tool_Battery_01.png'],
    ['tool', '收音机',     'rare',     '剧情 / 引导道具', '×1', 'LOOT_Tool_Radio_01.png'],
    ['tool', '防毒面具',   'rare',     '高危区域探索',    '×1', 'LOOT_Tool_GasMask_01.png'],
    /* ---- 贵重（5） ---- */
    ['val', '弹药盒',      'rare',     '高价值目标',     '×1', 'LOOT_Val_AmmoBox_01.png'],
    ['val', '背包',        'uncommon', '容量升级',       '×1', 'LOOT_Val_Backpack_01.png'],
    ['val', '门禁卡',      'rare',     '关卡流程钥匙',    '×1', 'LOOT_Val_Keycard_01.png'],
    ['val', '现金捆',      'uncommon', '高价值目标',     '×1', 'LOOT_Val_Cash_01.png'],
    ['val', '手表',        'uncommon', '高价值目标',     '×1', 'LOOT_Val_Watch_01.png']
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* 稀有度图例 */
  var rarHtml = '<div class="loot-rarities">';
  Object.keys(RARITY).forEach(function (k) {
    var w = { common: '权重 1.00', uncommon: '权重 0.45', rare: '权重 0.16' }[k];
    rarHtml += '<span><i class="' + RARITY[k].cls + '"></i>' + RARITY[k].label + ' · ' + w + '</span>';
  });
  rarHtml += '</div>';

  /* 分类筛选 */
  var filterHtml = '<div class="loot-filters" role="group" aria-label="物资分类筛选">';
  CATS.forEach(function (c) {
    filterHtml += '<button class="chip' + (c.key === 'all' ? ' is-on' : '') +
                  '" type="button" data-cat="' + c.key + '">' + esc(c.label) + '</button>';
  });
  filterHtml += '</div>';

  /* 物品网格 */
  var gridHtml = '<div class="loot-grid">';
  ITEMS.forEach(function (it) {
    var r = RARITY[it[2]];
    gridHtml +=
      '<div class="loot-item ' + r.cls + '" data-cat="' + it[0] + '">' +
        '<img src="assets/img/loot/' + esc(it[5]) + '" alt="' + esc(it[1]) + '" loading="lazy" />' +
        '<span class="loot-name"><i class="loot-rarity ' + r.cls + '" title="' + r.label + '"></i>' + esc(it[1]) + '</span>' +
        '<span class="loot-meta">' + esc(it[3]) + ' · ' + esc(it[4]) + '</span>' +
      '</div>';
  });
  gridHtml += '</div>';

  root.innerHTML = rarHtml + filterHtml + gridHtml;

  /* 筛选交互 */
  var chips = root.querySelectorAll('.loot-filters .chip');
  var items = root.querySelectorAll('.loot-item');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-on'); });
      chip.classList.add('is-on');
      var cat = chip.dataset.cat;
      items.forEach(function (el) {
        el.style.display = (cat === 'all' || el.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
})();
