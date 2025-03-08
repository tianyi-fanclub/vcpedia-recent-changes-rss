export interface Environment {
  ACCOUNT_ID: string;
  ENDPOINT: string;
}

interface responseData {
  query: {
    recentchanges: {
      pageid: number;
      revid: number;
      type: string;
      title: string;
      user: string;
      timestamp: string;
      comment: string;
    }[];
  }
}

const API_QUERY = "api.php?action=query&list=recentchanges&rcprop=title%7Cids%7Ctimestamp%7Cuser%7Ccomment&format=json&rctoponly=1&rcnamespace=0&rclimit=20";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = `${env.ENDPOINT.replace(/\/$/, "")}/${API_QUERY}`;
    const response = await fetch(url);
    const data = await response.json() as responseData;

    const rssItems = data.query.recentchanges
      .map(
        (x) => `
          <item>
            <title>【${x.type.toUpperCase()}】${escapeHtml(x.title)}</title>
            <link>https://vcpedia.cn/index.php?curid=${x.pageid}</link>
            <description>作者：${escapeHtml(x.user)}&#x3000;时间：${new Date(x.timestamp).toUTCString()}&#x3000;摘要：${escapeHtml(x.comment)}</description>
            <pubDate>${new Date(x.timestamp).toUTCString()}</pubDate>
            <guid>https://vcpedia.cn/index.php?curid=${x.pageid}#revid-${x.revid}</guid>
          </item>
        `
      )
      .join("\n");

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
          <channel>
            <title>VCpedia 最近更改</title>
            <link>${env.ENDPOINT}</link>
            <description>VCPedia 最近更改的 RSS 订阅</description>
            <language>zh-cn</language>
            <copyright>由 VCPedia 在署名-非商业性使用-相同方式共享 3.0中国大陆 (CC BY-NC-SA 3.0 CN) 许可协议下提供</copyright>
            ${rssItems}
          </channel>
        </rss>`;

    return new Response(rssFeed, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  },
} satisfies ExportedHandler<Environment>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
