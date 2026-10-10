# 个人作品集主页

一个零依赖的静态单页作品集站点，直接托管在 GitHub Pages 上。

- **技术栈**：原生 HTML + CSS + JavaScript，无构建步骤、无第三方库
- **特性**：深浅色主题、响应式布局、滚动进度条、入场动效、导航高亮、打印样式
- **部署**：推送到 GitHub 后在仓库设置里开启 Pages 即可

---

## 一、本地预览

直接双击 `index.html` 就能看。若想更接近线上环境（相对路径、缓存行为一致），起一个本地服务：

```bash
# Python（系统自带）
python -m http.server 8000

# 或 Node
npx serve .
```

然后浏览器打开 `http://localhost:8000`。

---

## 二、要替换的占位内容

全站占位内容都做了标记，用编辑器全局搜索关键词即可定位。**建议按下面顺序替换：**

| 搜索关键词 | 位置 | 改成什么 |
| --- | --- | --- |
| `你的名字` | `index.html` 全文 | 你的真实姓名 |
| `Y` | `<title>` 附近、`.brand-mark`、favicon | 你名字的首字母 |
| `you@example.com` | Hero 社交区、联系区 | 你的邮箱 |
| `username.github.io` | `<head>` 的 `og:url` | 你的实际站点地址 |
| `#github` / `#linkedin` | 社交图标、联系区按钮 | 你的 GitHub / LinkedIn 主页 |
| `assets/resume.pdf` | Hero 的"下载简历"按钮 | 把简历 PDF 放进 `assets/` 目录；不需要就删掉这个按钮 |
| `中国 · 杭州` 等 | `.facts` 列表 | 你的真实信息 |

### 各区块内容位置

- **Hero 自我介绍** → `<section class="hero">`
- **01 关于我** → `<section id="about">`，正文在 `.about-text` 里，三段 `<p>`
- **02 技术栈** → `<section id="skills">`，三个分组，每组是一个 `.tags` 列表
- **03 精选项目** → `<section id="projects">`，每个项目是 `<article class="project">`，复制整块即可新增；卡片封面右上角的圆形装饰由 CSS 自动生成，不用管
- **04 工作经历** → `<section id="experience">`，每条是 `<li class="tl-item">`，`<time>` 部分写在 `.tl-meta` 里
- **05 联系** → `<section id="contact">`

### 换配色

所有颜色集中在 `assets/css/style.css` 顶部的 `html[data-theme="light"]` 和 `html[data-theme="dark"]` 两个变量块里。改 `--accent` 一行就能换掉全站主色。

---

## 三、部署到 GitHub Pages

### 前置：配置 git 身份（本机尚未配置过）

```bash
git config --user.name  "你的名字"
git config --user.email "你的邮箱"
```

> 仓库里已经用占位身份做过一次初始提交。改完身份后执行
> `git commit --amend --reset-author --no-edit` 可以把这次提交的作者改成你自己。

### 方式 A：用户主页（推荐，地址最短）

仓库名必须严格是 `<你的用户名>.github.io`。站点地址即 `https://<你的用户名>.github.io`。

```bash
git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
git branch -M main
git push -u origin main
```

推送后进入仓库 **Settings → Pages**，Source 选 `Deploy from a branch`，分支选 `main`、目录选 `/ (root)`，保存。约 1 分钟后生效。

### 方式 B：项目页

仓库名随意（例如 `portfolio`）。仓库 **Settings → Pages** 里同样开启后，地址是
`https://<你的用户名>.github.io/portfolio/`。

### 方式 C：绑定自定义域名

1. 在仓库根目录新建 `CNAME` 文件，内容写你的域名（例如 `me.example.com`，不带 `https://`）。
2. 到域名服务商处添加 DNS 记录：
   - 子域名 → `CNAME` 记录，指向 `<你的用户名>.github.io`
   - 根域名 → 4 条 `A` 记录，指向 GitHub 官方 IP
3. 回到 **Settings → Pages**，填入域名并勾选 `Enforce HTTPS`。

---

## 四、后续更新

改完内容后：

```bash
git add .
git commit -m "更新项目经历"
git push
```

Pages 会在约 1 分钟内自动重建。

---

## 文件结构

```
portfolio/
├── index.html            # 页面结构与全部文案
├── assets/
│   ├── css/style.css     # 全部样式与配色变量
│   └── js/main.js        # 主题切换、动效、导航等交互
├── .nojekyll             # 告诉 GitHub Pages 跳过 Jekyll 处理
├── .gitignore
└── README.md
```
