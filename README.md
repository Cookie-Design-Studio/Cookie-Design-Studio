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
