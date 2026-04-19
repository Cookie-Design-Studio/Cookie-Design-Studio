# Cookie-Design-Studio 操作说明

🟩 **绿色标记（流程）**：表示你要执行的操作步骤  
🟦 **蓝色标记（注释）**：表示解释说明和注意事项

## 目录清理（保持项目干净）

以下命令用于日常维护，避免目录臃肿：

🟩 **步骤 A：开发前（安装依赖）**

```bash
npm install
```

🟦 注释：安装 `package.json` 里声明的依赖，首次拉取项目后必须执行。

🟩 **步骤 B：打包后可删（删除构建产物）**

```bash
rm -rf dist
```

🟦 注释：`dist` 是构建产物目录，可随时删除；需要发布时再执行 `npm run build` 重新生成。

🟩 **步骤 C：依赖重装可删（清空依赖后重装）**

```bash
rm -rf node_modules && npm install
```

🟦 注释：当依赖异常、版本冲突或安装损坏时使用该命令可快速恢复。

## Git 提交并推送（pull 到 git）流程

🟦 说明：这里按“本地改完代码后，提交并推送到远端仓库”来写。

🟩 **1) 查看当前改动**

```bash
git status
```

🟦 注释：确认哪些文件被修改、哪些是新增文件。

🟩 **2) 查看具体差异（可选但推荐）**

```bash
git diff
```

🟦 注释：提交前检查代码差异，避免误提交无关内容。

🟩 **3) 暂存要提交的文件**

```bash
git add .
```

🟦 注释：将当前目录下所有改动加入暂存区。  
🟦 如只提交指定文件可用：`git add 路径/文件名`

🟩 **4) 创建提交记录**

```bash
git commit -m "你的提交说明"
```

🟦 注释：提交说明建议写清楚“做了什么 + 为什么做”。

🟩 **5) 推送到远端分支**

```bash
git push origin main
```

🟦 注释：将本地提交推送到远端 `main` 分支；若是其他分支请替换分支名。

🟩 **6) 同步远端最新代码（提交前后都可执行）**

```bash
git pull origin main
```

🟦 注释：拉取远端最新提交，减少冲突风险；推荐开发前先 `pull`。

## 部署到阿里云 ECS（静态站点）

本项目为 **Vite + React** 前端，构建后产出 `dist/` 静态文件，在 ECS 上通常用 **Nginx** 托管。以下为一种常见、可复现的做法。

🟦 **前置条件**

- 已购买并开通一台 **阿里云 ECS**（常见镜像：**Ubuntu** 用 `apt`；**Alibaba Cloud Linux 3 / CentOS 系** 用 `dnf` / `yum`）。
- 已在 **ECS 控制台 → 网络与安全 → 安全组** 中放行入方向：**22**（SSH）、**80**（HTTP），若上 HTTPS 再放行 **443**。
- 本地已能 `ssh root@你的ECS公网IP`（或普通用户 + sudo）登录。

🟦 **系统对照**：下文 **「Ubuntu / Debian」** 与 **「Alibaba Cloud Linux 3」** 二选一即可，不要混用同一节的包管理命令。

---

### 方式一：本地构建后上传（推荐）

适合：本机已能成功执行 `npm run build`，不想在服务器上装 Node。

🟩 **1) 本地打包**

```bash
npm install
npm run build
```

🟦 注释：成功后当前目录会出现 `dist/`，里面即要部署的静态资源。

🟩 **2) 将 `dist` 同步到 ECS**

在**本机**执行（把 `用户`、`ECS_IP`、`目标路径` 换成你的）：

```bash
rsync -avz --delete dist/ 用户@ECS_IP:/var/www/cookie-design-studio/
```

若无 `rsync`，可用 `scp`：

```bash
scp -r dist/* 用户@ECS_IP:/var/www/cookie-design-studio/
```

🟦 注释：首次部署前需在 ECS 上创建目录并设权限，例如：`sudo mkdir -p /var/www/cookie-design-studio && sudo chown -R $USER:$USER /var/www/cookie-design-studio`。

---

### 方式二：在 ECS 上克隆仓库并构建

适合：希望服务器一键拉代码、统一环境构建。

🟩 **1) SSH 登录 ECS，安装 Git 与 Node（建议用 nvm 装 LTS）**

**Ubuntu / Debian：**

```bash
sudo apt update
sudo apt install -y git
# 安装 nvm 后：nvm install --lts && nvm use --lts
```

**Alibaba Cloud Linux 3：**

```bash
sudo dnf install -y git
# 安装 nvm 后：nvm install --lts && nvm use --lts
```

🟩 **2) 克隆项目、安装依赖、构建**

```bash
git clone <你的仓库地址> cookie-design-studio
cd cookie-design-studio
npm install
npm run build
```

🟦 注释：构建产物仍在项目内 `dist/`；可将 Nginx 的 `root` 指到该路径，或把 `dist` 拷到 `/var/www/cookie-design-studio`（与方式一一致）。

---

### 安装并配置 Nginx（两种方式共用）

以下 **`server { ... }` 块内容相同**，仅配置文件路径与安装命令因系统而异。

🟩 **1) 安装 Nginx**

**Ubuntu / Debian：**

```bash
sudo apt install -y nginx
```

**Alibaba Cloud Linux 3：**

```bash
sudo dnf install -y nginx
sudo systemctl enable --now nginx
```

🟩 **2) 写入站点配置**

将下面整段保存为配置文件（**不要**重复粘贴多个 `server` 到同一文件外层的错误层级；一个文件里一个 `server` 即可）。

```nginx
server {
    listen 80;
    server_name _;   # 有域名时改成你的域名，如 cookie-design.top

    root /var/www/cookie-design-studio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

**Ubuntu / Debian（sites-available / sites-enabled）：**

- 文件路径：`/etc/nginx/sites-available/cookie-design-studio`
- 启用：

```bash
sudo ln -sf /etc/nginx/sites-available/cookie-design-studio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

🟦 注释：若与默认站点冲突，可禁用 `default`：`sudo rm /etc/nginx/sites-enabled/default` 后再执行 `nginx -t` 与 `reload`。

**Alibaba Cloud Linux 3（conf.d）：**

- 文件路径：`/etc/nginx/conf.d/cookie-design-studio.conf`
- 若存在 `/etc/nginx/conf.d/default.conf` 且占用 80 端口，可先备份再删除或改名，例如：

```bash
sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
```

- 重载：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

🟦 注释：`try_files` 可在将来启用前端路由时避免刷新 404；当前项目即使无路由，写上也无害。

---

### 安全组与系统防火墙

🟩 **阿里云安全组**：确保入方向已放行 **TCP 80**（及 **443** 若用 HTTPS）。

🟩 **若 ECS 内启用了 ufw（常见于 Ubuntu）**：

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

🟩 **若 ECS 使用 firewalld（Alibaba Cloud Linux / CentOS 系常见）**：

```bash
sudo systemctl enable --now firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

🟦 注释：云安全组与主机防火墙需**同时**放行，网页才能从公网访问。

---

### 使用自有域名（替代公网 IP 访问）

🟦 **说明**：本项目静态资源均为根路径（如 `/aigc/...`、`/digital/...`），**无需改代码或重新构建**，只要在 DNS 与 Nginx 上把域名指到同一台 ECS 即可。公网 IP 访问与域名访问可同时存在，直到你不再使用 IP。

🟩 **1) 在阿里云解析域名**

- 进入 **云解析 DNS**（或域名控制台）→ 选择域名 **cookie-design.top** → **添加记录**。
- **主机记录**：`@`（表示主域名 `cookie-design.top`）→ 类型 **A** → 值填 **ECS 公网 IP**。
- 若需要 `www.cookie-design.top`：再添加一条，主机记录 **`www`** → 类型 **A** → 同一公网 IP。
- 保存后等待生效（通常数分钟，最长可能数十分钟）。

🟩 **2) 修改 Nginx 的 `server_name`**

SSH 登录 ECS，编辑你之前创建的站点配置（Alibaba Cloud Linux 多为）：

`/etc/nginx/conf.d/cookie-design-studio.conf`

把其中的：

```nginx
server_name _;
```

改成（多个域名用空格分隔）：

```nginx
server_name cookie-design.top www.cookie-design.top;
```

然后检查并重载：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

🟩 **3) 浏览器验证**

先访问 `http://cookie-design.top`（或 `http://www.cookie-design.top`），应能看到与 IP 访问相同的站点。若打不开：确认解析已生效（本机可 `ping cookie-design.top` 看是否指向 ECS IP）、安全组仍放行 80。

---

### （推荐）HTTPS：Let’s Encrypt + Certbot

🟦 在域名已能用 **HTTP** 打开的前提下，为同一域名申请免费证书；需安全组放行 **443**。

**Ubuntu / Debian：**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cookie-design.top -d www.cookie-design.top
```

**Alibaba Cloud Linux 3：**

```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cookie-design.top -d www.cookie-design.top
```

🟦 若只解析了主域名、没有 `www`，可去掉 `-d www.cookie-design.top` 只保留一个 `-d`。`certbot` 会改写 Nginx 并配置续期。

---

### 后续更新站点

🟩 **若用方式一**：本地 `npm run build` 后再次执行 `rsync`/`scp` 覆盖 `dist` 内容，无需重启 Nginx（静态文件替换即可；浏览器强刷缓存可看最新效果）。

🟩 **若用方式二**：在服务器项目目录 `git pull` 后执行 `npm install`（如有依赖变化）与 `npm run build`，再重载 Nginx（一般仍不必，除非改了配置）。

---

### 常见问题

🟦 **打不开页面**：检查安全组是否放行 80、Nginx 是否运行（`systemctl status nginx`）、`root` 路径是否与实际上传目录一致。

🟦 **资源 404**：确认部署的是 **`dist` 里的内容**（含 `index.html` 与 `assets/`），而不是整个项目根目录。

🟦 **将来若使用子路径部署**（例如 `https://域名/app/`）：需在 `vite.config.ts` 中设置 `base: '/app/'` 后重新构建，并同步调整 Nginx。

---

## 使用阿里云 OSS + CDN 部署（推荐：大视频/大图、省 ECS 公网带宽）

🟦 **适用场景**：整站静态资源体积大（本项目 `dist` 约 **300MB** 级）、ECS **按固定带宽**较贵时，把站点放到 **OSS**，前面套 **CDN**，访问走边缘节点，**不必**把 ECS 公网带宽升到很高。  
🟦 **域名**：下文以 **cookie-design.top** 为例；代码里资源均为根路径（`/videos/`、`/aigc/` 等），站点挂在 **域名根路径** 时 **无需改 `vite.config.ts` 的 `base`**。

---

### 1) 创建 OSS Bucket

🟩 控制台 **对象存储 OSS** → **Bucket 列表** → **创建 Bucket**。

🟦 建议：

- **地域**：与 ECS 同区（如 **华东 1 杭州**）便于以后混合方案；纯 OSS+CDN 也可选离用户近的区域。
- **读写权限**：**公共读**（或私有 + CDN 回源鉴权，配置更复杂）。
- **记录** Bucket 名称与 Endpoint（如 `oss-cn-hangzhou.aliyuncs.com`）。

---

### 2) 开启静态网站托管（SPA 必做）

🟩 进入该 Bucket → **基础设置** → **静态页面** / **静态网站托管**：

- **默认首页**：`index.html`
- **404 页**：同样填 **`index.html`**（单页应用刷新子路径时才能回到页面）

🟦 控制台会显示 **访问端点**（含 **Website / 静态网站** 类域名），**CDN 回源**时以控制台说明为准（常见为带 `oss-website-` 的源站域名；若 CDN 向导里可直接选 **OSS Bucket**，按向导选即可）。

---

### 3) 安装并配置 ossutil（本机 Mac）

🟩 按官方文档安装 [ossutil](https://help.aliyun.com/document_detail/120075.html)，本机执行 `ossutil config`，填入 **AccessKey**（建议用 **RAM 子账号**，仅授权该 Bucket 的 OSS 权限，勿用主账号密钥）。

---

### 4) 构建并上传 `dist`

🟩 在项目目录：

```bash
cd /Users/cookie/Documents/Cookie-Design-Studio
npm install
npm run build
```

🟩 将 `dist` **同步到 Bucket 根目录**（把 `your-bucket` 换成你的 Bucket 名）：

```bash
ossutil sync dist/ oss://your-bucket/ -f --exclude ".DS_Store"
```

🟦 `-f` 表示强制覆盖；大文件较多时上传需一些时间。更新站点时重复 **`npm run build` + `ossutil sync`** 即可。

---

### 5) 配置 CDN（HTTPS + 加速域名）

🟩 **CDN 控制台** → **域名管理** → **添加域名**：

- **加速域名**：`cookie-design.top`（及如需 `www.cookie-design.top` 再添加一条加速）。
- **源站**：选择 **OSS 域名**，选中上一步的 Bucket（或按向导填写 **Website 源**；务必与「静态网站托管」方式一致，否则 404 回退可能异常）。
- **端口**：HTTPS **443**、HTTP **80**。
- **HTTPS**：申请/上传证书（阿里云可申请免费证书）。

🟦 **缓存**：HTML 可设较短缓存或更新后 **刷新预热**；JS/CSS/图片/视频可较长缓存。更新发布后若页面仍是旧的，在 CDN 控制台对对应 URL 做 **刷新 / 预热**。

---

### 6) 把域名解析到 CDN（不再指向 ECS IP）

🟩 **云解析 DNS** 中：

- 删除或暂停将 **cookie-design.top** 指到 ECS 公网 IP 的 **A 记录**（若仍存在）。
- 添加 **CNAME**，记录值填 **CDN 控制台为该加速域名分配的 CNAME**（形如 `xxx.w.kunlun*.com`，以控制台为准）。

🟦 生效后，访问 **https://cookie-design.top** 即走 CDN → OSS，大资源由边缘节点分担，**体感速度通常明显好于小带宽 ECS 直连**。

---

### 7) ECS 与费用

🟦 站点完全走 OSS+CDN 后，ECS 若不再托管该站，可将 **公网带宽调至更低** 或仅作跳板机；**OSS 存储 + CDN 流出** 按量计费，大流量时请在控制台查看 **账单与单价**，一般仍比长期高价固定带宽更灵活。

---

### 8) 与「仅 ECS」部署的差异

| 项目 | ECS + Nginx | OSS + CDN |
|------|-------------|-----------|
| 更新命令 | `rsync`/`scp` 到 `/var/www/...` | `npm run build` + `ossutil sync` |
| 证书 | Certbot 或手动 | 多在 **CDN** 上配置 HTTPS |
| 首屏视频 preload | `index.html` 里仍为 `/videos/showreel.mp4` | 域名不变则 **无需改代码** |

## 一套常用顺序（推荐）

🟩 **日常工作流**

```bash
git pull origin main
npm install
# 开发...
git status
git add .
git commit -m "feat: 描述本次改动"
git push origin main
```

🟩 **清理工作流**

```bash
rm -rf dist
rm -rf node_modules && npm install
```
