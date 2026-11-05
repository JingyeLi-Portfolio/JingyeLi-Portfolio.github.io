/* ==========================================================================
   Last Light · POI 互动地图配置文件
   --------------------------------------------------------------------------
   地图上按钮的坐标与内容都定义在这里，由 poi-map.js 渲染成可点的标记。

   【数据结构】
   pois 列表里，一个 { ... } 就是一个标记：
     cat  分类，填 categories 里的名字：
          goal   任务目标 / 目标与安全屋（蓝）
          safe   安全屋（红）
          poi    探索资源点 / 资源重点（绿）
          danger 高危区域 / 风险重点（品红）
          node   节奏决策点 / 视线与路径节点（琥珀黄）
     x / y  按钮在图片上的位置（百分比，0–100）
     name / desc  标记名称与设计说明
     imgs  详情面板的截图，可放多张（左右翻页）：
          imgs: [ 'assets/img/poi/图片一.jpg', 'assets/img/poi/图片二.jpg' ]
     home  true 时同时显示在首页精选卡片的小地图上

   【两张地图】
   maps.overview = 关卡总览图（首页精选卡片也用它的按钮，见 home 标志）
   maps.layout   = 主区白盒布局图（详情页第 04 节，只区分四类：
                   资源重点 / 风险重点 / 视线与路径节点 / 目标与安全屋）
   ========================================================================== */

window.LL_POI = {

  // 五种按钮颜色，label 是图例里显示的名字（可改文字）
  categories: {
    goal:   { label: '任务目标' },
    safe:   { label: '安全屋' },
    poi:    { label: '探索资源点' },
    danger: { label: '瓶颈与高危' },
    node:   { label: '节奏决策点' }
  },

  maps: {

    /* ============ 图一：关卡总览（标注版） ============ */
    overview: {
      image: 'assets/img/lastlight-overview.jpg',
      ratio: '1800 / 1375',
      alt: 'Last Light 小镇关卡总览俯视图：标注了住宅巷、学校、教堂、加油站等 POI 与主线行进路线',

      pois: [

        {
          cat: 'safe',
          x: 78, y: 60,
          name: '安全屋 Haven House',
          desc: '任务的出发点与返程终点。玩家在这里接受「恢复供电」目标，拿到燃油后也要把它带回来。作为整个探索循环的锚点，它的位置让玩家出门时就能对主街方向建立初步认知。',
          imgs: [
            'assets/img/poi/poi-haven-indoor.jpg',
            'assets/img/poi/poi-haven-2.jpg',
            'assets/img/poi/poi-haven-parking.jpg'
          ],
          home: true
        },

        {
          cat: 'goal',
          x: 12.9, y: 63.7,
          name: '加油站 Miller\'s Fuel',
          desc: '第一章的任务目标（PICK & BACK）。前往开阔的加油站取燃油、再原路返回安全屋——去程与回程走的是同一片空间，但玩家的资源状态和警觉性完全不同，这是这段任务节奏设计的基本盘。',
          imgs: [
            'assets/img/poi/poi-fuel-exterior.jpg',
            'assets/img/poi/poi-fuel-2.jpg',
            'assets/img/poi/poi-fuel-3.jpg',
            'assets/img/poi/poi-fuel-store.jpg',
            'assets/img/poi/poi-fuel-garage.jpg',
            'assets/img/poi/poi-fuel-road.jpg'
          ],
          home: true
        },

        {
          cat: 'danger',
          x: 47, y: 58.7,
          name: '住宅巷 · 西片区',
          desc: '住宅巷 POI 之一：房屋密集、资源价值高，同时感染者威胁也最高。玩家在「深入多搜一栋」和「为回程保留弹药与体力」之间做取舍，是风险与收益设计的核心区域。',
          imgs: [
            'assets/img/poi/poi-res-west-1.jpg',
            'assets/img/poi/poi-res-west-2.jpg',
            'assets/img/poi/poi-res-west-3.jpg',
            'assets/img/poi/poi-res-west-4.jpg',
            'assets/img/poi/poi-res-interior.jpg'
          ],
          home: true
        },

        {
          cat: 'danger',
          x: 62.8, y: 58.8,
          name: '住宅巷 · 东片区',
          desc: '住宅巷 POI 之二，与西片区隔着镇中心形成两段独立的深入选择。靠近回程路线，适合「见好就收」的玩家顺路补搜，也承担着回程压力的设计意图。',
          imgs: [
            'assets/img/poi/poi-res-east-1.jpg',
            'assets/img/poi/poi-res-east-2.jpg',
            'assets/img/poi/poi-res-east-3.jpg',
            'assets/img/poi/poi-res-interior-2.jpg',
            'assets/img/poi/poi-res-interior-3.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 36.4, y: 32.3,
          name: '学校',
          desc: '镇中心的体量锚点，占位大、辨识度高，帮助玩家在住宅巷的细碎空间里保持方向感。作为探索资源点，它的房间尺度比住宅更大，对应不同的搜索节奏。',
          imgs: [
            'assets/img/poi/poi-school.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 70, y: 88,
          name: '教堂',
          desc: '位于回程路线南侧的资源点，塔楼轮廓在多个方向可见，同时承担地标职能。设计意图是给绕行玩家一个可辨认的目标，让「不走主街」也有方向可依。',
          imgs: [
            'assets/img/poi/poi-church.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 31.2, y: 60,
          name: '主线瓶颈 · 决策点',
          desc: '靠近加油站的主路瓶颈与决策位置。玩家经过时脚步与视线被引向预设方向，同时这里是「直接进加油站」还是「先在周边搜刮」的分岔点。',
          imgs: [
            'assets/img/poi/poi-decision-near-fuel.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 73.2, y: 60,
          name: '开始决策点（决定探索路线）',
          desc: '离开安全屋后的第一个分岔：直行上主街，或先绕向支线。把第一次路线选择放在视野开阔、无威胁的位置，让玩家在低压状态下建立「路是自己选的」的预期。',
          imgs: [
            'assets/img/poi/poi-decision-start.jpg',
            'assets/img/poi/poi-routes-overview.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 50.5, y: 51.9,
          name: '转路线决策点（中间）',
          desc: '行程中段的换线口：主街与住宅巷之间的转换位置。玩家可以根据当前弹药、体力与收获量临时改变计划，是「自由度由路线切换产生」的具体落点。',
          imgs: [
            'assets/img/poi/poi-decision-mid.jpg'
          ],
          home: false
        },

        {
          cat: 'danger',
          x: 72.9, y: 42.6,
          name: '瓶颈与资源分布点 ①',
          desc: '主路去程段的通行收窄点与资源分布标记（对应《空间决策和战斗节奏》图中的粉色点位）。收窄处收束通行宽度，把脚步与视线引向预设方向。',
          imgs: [
            'assets/img/poi/poi-mainstreet-1.jpg'
          ],
          home: false
        },

        {
          cat: 'danger',
          x: 52.4, y: 43.3,
          name: '瓶颈与资源分布点 ②',
          desc: '主路中段的瓶颈与资源分布标记。瓶颈前后各安排了一处可短暂停留的资源点，让玩家在「快速通过」和「冒险多拿一点」之间产生即时取舍。',
          imgs: [
            'assets/img/poi/poi-mainstreet-2.jpg'
          ],
          home: false
        },

        {
          cat: 'danger',
          x: 43, y: 46.2,
          name: '瓶颈与资源分布点 ③',
          desc: '回程方向的瓶颈与资源分布标记。与去程瓶颈错位布置，让返程不是简单的原路倒放，而是重新阅读一遍熟悉的空间。',
          imgs: [
            'assets/img/poi/poi-mainstreet-3.jpg'
          ],
          home: false
        }

        // ↑ 在这里继续添加新按钮，记住上一段结尾要有逗号
      ]
    },

    /* ============ 图二：主区白盒布局（干净俯视） ============ */
    layout: {
      image: 'assets/img/lastlight-layout.jpg',
      ratio: '1800 / 1400',
      alt: 'Last Light 主区白盒布局俯视图：住宅组团、镇中心、环岛、仓库、农场与水塔构成小镇骨架',

      // 这张图只区分四类，图例自动只显示用到的：资源 / 风险 / 节点 / 目标
      categories: {
        poi:    { label: '资源重点' },
        danger: { label: '风险重点' },
        node:   { label: '视线与路径节点' },
        goal:   { label: '目标与安全屋' }
      },

      pois: [

        {
          cat: 'goal',
          x: 54.4, y: 49.4,
          name: '安全屋',
          desc: '玩家的基地与任务起终点。出门前即可完成第一次空间定向：主街方向、教堂尖顶与水塔轮廓都在视野内。停车场可作为车内资源的探索点。',
          imgs: [
            'assets/img/poi/poi-haven-parking.jpg',
            'assets/img/poi/poi-haven-indoor.jpg',
            'assets/img/poi/poi-haven-2.jpg'
          ],
          home: false
        },

        {
          cat: 'goal',
          x: 27, y: 57.5,
          name: '加油站',
          desc: '任务目标（燃油）所在地。外部开阔、暴露度高；便利店与车库构成「外部—内部—关键资源」的递进空间，车库内存放主线关键资源燃油。',
          imgs: [
            'assets/img/poi/poi-fuel-garage.jpg',
            'assets/img/poi/poi-fuel-exterior.jpg',
            'assets/img/poi/poi-fuel-store.jpg',
            'assets/img/poi/poi-fuel-2.jpg',
            'assets/img/poi/poi-fuel-3.jpg',
            'assets/img/poi/poi-fuel-road.jpg'
          ],
          home: false
        },

        {
          cat: 'danger',
          x: 24.1, y: 19.9,
          name: '住宅西区',
          desc: '风险重点：房屋密集、室内外空间交替频繁。物资价值最高，感染者威胁也最高，玩家要逐栋权衡「再进一栋」的代价。',
          imgs: [
            'assets/img/poi/poi-res-west-2.jpg',
            'assets/img/poi/poi-res-west-1.jpg',
            'assets/img/poi/poi-res-west-3.jpg',
            'assets/img/poi/poi-res-west-4.jpg',
            'assets/img/poi/poi-res-interior.jpg'
          ],
          home: false
        },

        {
          cat: 'danger',
          x: 48.2, y: 49,
          name: '住宅东巷',
          desc: '风险重点：巷道更窄、转弯更多，撤离空间有限。靠近回程路线，适合返程顺路补搜，但被发现后的代价更大。',
          imgs: [
            'assets/img/poi/poi-res-east-2.jpg',
            'assets/img/poi/poi-res-east-1.jpg',
            'assets/img/poi/poi-res-east-3.jpg',
            'assets/img/poi/poi-res-interior-2.jpg',
            'assets/img/poi/poi-res-interior-3.jpg'
          ],
          home: false
        },

        {
          cat: 'danger',
          x: 64.2, y: 23.5,
          name: '汽车旅馆',
          desc: '风险重点：房间成排、动线重复，行进中被夹击的概率高。收益侧是稳定的物资刷新，属于「高风险—稳定回报」的典型结构。',
          imgs: [
            'assets/img/poi/poi-motel.jpg'
          ],
          home: false
        },

        {
          cat: 'danger',
          x: 78.6, y: 36.2,
          name: '仓库（东）',
          desc: '风险重点：位于镇子东侧、远离安全屋的大型仓库。存储价值高但暴露时间长，深入之后没有近路可退，是风险与收益拉满的一处资源点。',
          imgs: [
            'assets/img/poi/poi-warehouse-east.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 42.9, y: 33.8,
          name: '仓库（住宅区）',
          desc: '资源重点：住宅区侧的大型仓储体量，可作为资源存储与远距离传输的补给节点。结构简单、占地大，也是远景轮廓的组成部分。',
          imgs: [
            'assets/img/poi/poi-warehouse-res.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 34.8, y: 41.7,
          name: '学校',
          desc: '资源重点：镇中心的体量锚点，正门旁设有医疗资源点供探索中途补充状态。把补给放在必经之路上，降低长线探索的挫败感。',
          imgs: [
            'assets/img/poi/poi-school.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 39.5, y: 72.9,
          name: '森林小屋',
          desc: '资源重点：南部森林腹地中的小屋，藏有材料类资源。远离主路的独立目标，回报愿意偏离主线的玩家。',
          imgs: [
            'assets/img/poi/poi-cabin.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 74.3, y: 40.2,
          name: '公园',
          desc: '资源重点：镇南的开敞绿地，空间从「密」转「疏」的过渡带。视野拉远、威胁下降，同时提供低风险的零星物资。',
          imgs: [
            'assets/img/poi/poi-park.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 55, y: 70,
          name: '农场',
          desc: '资源重点：镇子南面的开敞农田与农舍。空间从「密」转「疏」，视野拉远、威胁感下降，也标记了探索的边界。',
          imgs: [
            'assets/img/poi/poi-farm.jpg',
            'assets/img/poi/poi-farm-2.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 60, y: 79,
          name: '温室大棚（重要资源点）',
          desc: '资源重点：农场区的重要资源点。半透明体量在白盒阶段就承担辨识功能，稳定补给的位置，给绕行南侧的玩家一个落脚点。',
          imgs: [
            'assets/img/poi/poi-greenhouse.jpg'
          ],
          home: false
        },

        {
          cat: 'poi',
          x: 47.1, y: 42.2,
          name: '主街 · 镇中心建筑群',
          desc: '资源重点：自然弯曲的密集街巷与商铺体量，空间密度最高的一段。学校等资源点位于其中，也是主线与绕行路线的分岔带。',
          imgs: [
            'assets/img/poi/poi-downtown.jpg',
            'assets/img/poi/poi-aerial-1.jpg',
            'assets/img/poi/poi-aerial-2.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 41.3, y: 44.2,
          name: '主街十字路口',
          desc: '视线与路径节点：小镇路网的核心交汇点，几条主路在这里交汇。玩家从安全屋出发后大概率先经过这里完成空间定向——它是整个探索动线的「坐标原点」。',
          imgs: [
            'assets/img/poi/poi-crossroad.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 58.8, y: 36.6,
          name: '环岛中心',
          desc: '视线与路径节点：连接多条道路的环岛。开阔、可环视，玩家在这里能同时看到多个目的地的轮廓，承担方向再定向的地标职能。',
          imgs: [
            'assets/img/poi/poi-roundabout.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 34, y: 66,
          name: '下水道入口',
          desc: '视线与路径节点：连接地上空间的隐蔽通道入口。为熟悉地图的玩家提供一条低暴露的转移路径，是「捷径」类空间设计。',
          imgs: [
            'assets/img/poi/poi-sewer.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 53.3, y: 59.1,
          name: '教堂',
          desc: '视线与路径节点：尖顶在多个方向可见的地标。玩家在镇中心、温室大棚等位置都能借它的轮廓定位方向。',
          imgs: [
            'assets/img/poi/poi-church.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 52.6, y: 81.7,
          name: '水塔（南）',
          desc: '视线与路径节点：南侧水塔地标，远距离可见。玩家在低视点的街巷里也能借它判断方位，是「不靠 UI 的方向引导」之一。',
          imgs: [
            'assets/img/poi/poi-tower-south.jpg'
          ],
          home: false
        },

        {
          cat: 'node',
          x: 17.4, y: 52.8,
          name: '水塔（西）',
          desc: '视线与路径节点：西侧水塔地标。从住宅区街巷的视角可以看到它的位置，为玩家探索带来指引，也暗示附近存在兴趣点。',
          imgs: [
            'assets/img/poi/poi-tower-west.jpg'
          ],
          home: false
        }

        // ↑ 在这里继续添加新按钮，记住上一段结尾要有逗号
      ]
    }
  }
};
