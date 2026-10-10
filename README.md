# 关卡策划求职作品集

一个零依赖的静态作品集站点，托管在 GitHub Pages 上。

- **技术栈**：原生 HTML + CSS + JavaScript，无构建步骤、无第三方库
- **特性**：深浅色主题、响应式布局、滚动进度条、入场动效、导航高亮、打印样式
- **适用**：游戏关卡策划 / Level Designer 岗位求职

---

## 一、站点结构

```
portfolio/
├── index.html              首页：定位、能力迁移、作品索引、技能、求职信息
├── work-blockout-01.html   作品详情页 · 关卡一《废弃设施》
├── work-blockout-02.html   作品详情页 · 关卡二《垂直中庭》
├── assets/
│   ├── css/style.css       全部样式与配色变量
│   ├── js/main.js          主题切换、动效、导航等交互
│   └── img/                放你的图片（需自己新建目录）
├── .nojekyll               告诉 GitHub Pages 跳过 Jekyll 处理
├── .gitattributes
├── .gitignore
└── README.md
```

页面之间的导航已经接好：首页两张作品卡片分别进入对应的详情页，详情页底部可以互相跳转，顶栏有返回按钮。

---

## 二、本地预览

直接双击 `index.html` 就能看。若想更接近线上环境：

```bash
python -m http.server 8000     # 然后打开 http://localhost:8000
```

---

## 三、要替换的内容

### 1. 文字

全局搜索这些关键词即可定位：

| 搜什么 | 改成什么 |
| --- | --- |
| `你的名字` | 你的真实姓名 |
| `Y` | 你名字的首字母（出现在标题、顶栏图标、favicon） |
| `you@example.com` | 你的邮箱 |
| `space.bilibili.com/xxx` | 你的 B 站主页 |
| `username.github.io` | 你的站点地址（在 `<head>` 的 `og:url`） |
| `城市占位` | 你的期望工作城市 |
| `assets/resume.pdf` | 把简历 PDF 放进 `assets/` 目录；不需要就删掉按钮 |

首页的三个关键数字（`2` / `5` / `30+`）在 `<ul class="stats">` 里，改成你的真实数据。

### 2. 图片

站点里所有图片位置现在都是虚线占位框。替换方式：

```html
<!-- 替换前 -->
<div class="fig-placeholder mono">此处放：关卡俯视平面图</div>

<!-- 替换后 -->
<img src="assets/img/plan.jpg" alt="关卡俯视平面图" />
```

图片建议放在 `assets/img/` 下。**命名用英文和数字**，避免中文文件名在任何环节出问题。

需要准备的图片（详情页每处都有注释标出）：

- **关卡俯视平面图** —— 从引擎导出 top view，或手绘后扫描
- **剖面／分析图** —— 如果会 CAD 或 Illustrator，画成建筑分析图的样子
- **关键节点截图** —— 每个节点一张，最好带视线或动线标注
- **首页作品封面** —— 建议用平面图而不是截图，更有辨识度

> 小技巧：图片上传前压缩一下（推荐 [squoosh.app](https://squoosh.app)），宽度 1600px 以内、质量 80 左右就够，能显著加快加载。

### 3. 视频

两个详情页的「实机演示」区块现在是占位框。把注释里的 B 站 iframe 代码取消注释，填上你的 BV 号：

```html
<iframe src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&page=1"
        scrolling="no" border="0" frameborder="no" framespacing="0"
        allowfullscreen="true" class="video-frame"></iframe>
```

> 视频建议控制在 2—3 分钟内，并且**加字幕说明每一步在演示什么**。面试官不会完整看完 15 分钟的流程录像。

### 4. 换配色

颜色集中在 `assets/css/style.css` 顶部的两个变量块（`light` / `dark`）。改 `--accent` 一行就能换掉全站主色。

---

## 四、部署到 GitHub Pages

### 前置：配置 git 身份

本机还没配置过 git 身份，先执行：

```bash
git config --global user.name  "你的名字"
git config --global user.email "你的邮箱"
```

> 仓库里已用占位身份做过初始提交。改完身份后执行
> `git commit --amend --reset-author --no-edit` 可把这次提交的作者改成你自己。

### 方式 A：用户主页（推荐，地址最短）

仓库名必须严格是 `<你的用户名>.github.io`：

```bash
git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
git branch -M main
git push -u origin main
```

推送后进入仓库 **Settings → Pages**，Source 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`，保存。约 1 分钟后生效。

### 方式 B：项目页

仓库名随意（如 `portfolio`），同样在 **Settings → Pages** 开启，地址为
`https://<你的用户名>.github.io/portfolio/`。

### 方式 C：自定义域名

1. 仓库根目录新建 `CNAME` 文件，内容写域名（如 `me.example.com`，不带 `https://`）
2. 域名服务商处添加 DNS：子域名用 `CNAME` 指向 `<你的用户名>.github.io`；根域名用 4 条 `A` 记录指向 GitHub 官方 IP
3. **Settings → Pages** 填入域名并勾选 `Enforce HTTPS`

---

## 五、新增作品

复制 `work-blockout-01.html` 为 `work-blockout-03.html`，改掉标题、元数据与各章节文案，然后回首页在 `<div class="works">` 里复制一整块 `<article class="work-card">`，把链接指向新文件。

作品不多时，宁可每个做得深，也不要堆数量。**两个拆解透彻的关卡，好过六个只有录屏的。**

---

## 六、内容写作建议

这部分不是代码，但比代码重要。

### 每个关卡必须回答的四个问题

1. **设计目标是什么** —— 你想让玩家体验什么？一句话说清，不要写「提升游戏性」这种空话
2. **用什么手段实现** —— 净宽、高差、掩体密度、光照……具体的空间手段
3. **怎么验证的** —— 找了几个测试者、反馈是什么、哪些数据支撑
4. **改了什么、为什么改** —— 迭代记录。这一节最能体现你是否真的在做设计，而不是在做搭积木

### 关于「建筑学出身」的叙事

**不要写成「我建筑做不下去所以转游戏」**，要写成「建筑学的空间训练让我更适合做关卡」。

首页的「能力迁移」区块就是干这个的。你可以按自己的实际情况调整那六条，但核心逻辑是：**先建立对方对你空间能力的认可，再用白盒 Demo 证明你能把它落地到引擎里。**

### 关于年龄

作品集里不需要出现年龄。用作品说话。

### 面试前再准备一份「没放进网站的东西」

网站放精选，但面试时对方可能会问细节。建议另存一份完整的过程文件（草图、CAD、迭代版本截图），随时可以发过去。
