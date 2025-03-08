# VCPedia Recent Changes RSS

此项目基于 [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page)，设计为在 [Cloudflare Workers](https://workers.cloudflare.com/) 上运行，旨在从 MediaWiki 的 JSON API 获取最近更改的数据，并将其转换为 RSS 2.0 格式。

## 使用方法

此项目依赖以下运行环境：
 - [Node.js](https://nodejs.org/) 20.x 或更高版本，或其他兼容的运行时

克隆此仓库后，运行以下命令安装依赖：

```bash
npm install
```

要启动本地开发服务器，请运行：

```bash
npm run dev
```

此项目已经基于 GitHub Actions 配置了自动部署，只需将代码推送到 GitHub 仓库 `main` 分支，即可自动部署到 Cloudflare Workers。

若需要手动部署，请运行：

```bash
npm run deploy
```

## 许可
此项目基于 MIT 许可发布。有关更多信息，请参阅 [LICENSE](LICENSE)。
