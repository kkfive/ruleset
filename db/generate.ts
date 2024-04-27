import path from 'node:path'

export default [
  {
    fileName: 'reject',
    includeFiles: [
      path.join(__dirname, `/../storage/reject/blackmatrix7/Advertising_All_No_Resolve.list`),
      // path.join(__dirname, `/../storage/reject/skk/domainset_reject.list`),
      path.join(__dirname, `/../storage/reject/skk/skk_ip_reject.list`),
    ],
  },
  {
    fileName: 'reject_plus',
    includeFiles: [
      path.join(__dirname, `/../storage/reject/blackmatrix7/Advertising_All_No_Resolve.list`),
      path.join(__dirname, '/', '../storage/reject/blackmatrix7/privacy_All.list'),
      // path.join(__dirname, `/../storage/reject/skk/domainset_reject.list`),
      path.join(__dirname, `/../storage/reject/skk/reject_url_regex_non_ip.list`),
      path.join(__dirname, `/../storage/reject/skk/skk_ip_reject.list`),
      path.join(__dirname, `/../storage/reject/antiAd/anti-ad-surge.list`),
      path.join(__dirname, `/../storage/reject/adrules/adrules.list`),
      path.join(__dirname, `/../storage/reject/RuCu6/MyBlockAds.list`),
    ],
  },
  {
    fileName: 'reject_drop',
    includeFiles: [
      path.join(__dirname, '/', '../storage/rejectDrop/skk/reject-drop_non_ip.list'),
      path.join(__dirname, '/', '../storage/rejectDrop/skk/my_reject_non_ip.list'),
    ],
  },
  {
    fileName: 'reject_tinygif',
    includeFiles: [
      path.join(__dirname, '/', '../storage/rejectTinyGif/skk/reject-tinygif_non_ip.list'),
    ],
  },
  {
    fileName: 'domestic',
    includeFiles: [
      path.join(__dirname, '/', '../storage/domestic/skk/domestic_non_ip.list'),
      path.join(__dirname, '/', '../storage/domestic/skk/domestic_ip.list'),
      path.join(__dirname, '/', '../storage/domestic/skk/china_ip.list'),
    ],
  },
  {
    fileName: 'direct',
    includeFiles: [
      path.join(__dirname, '/', '../storage/direct/skk/direct_non_ip.list'),
      path.join(__dirname, '/', '../storage/direct/skk/my_direct_non_ip.list'),
    ],
  },
  {
    fileName: 'lan',
    includeFiles: [
      path.join(__dirname, '/', '../storage/lan/skk/lan_ip.list'),
    ],
  },
  {
    fileName: 'global',
    includeFiles: [
      path.join(__dirname, '/', '../storage/global/skk/global_non_ip.list'),
      path.join(__dirname, '/', '../storage/global/skk/global_plus_non_ip.list'),
    ],
  },
  {
    fileName: 'stream',
    includeFiles: [
      path.join(__dirname, '/', '../storage/stream/skk/stream_non_ip.list'),
      path.join(__dirname, '/', '../storage/stream/skk/stream_ip.list'),
    ],
  },
  {
    fileName: 'stream_us',
    includeFiles: [
      path.join(__dirname, '/', '../storage/stream/skk/stream_us_non_ip.list'),
      path.join(__dirname, '/', '../storage/stream/skk/stream_us_ip.list'),
    ],
  },
  {
    fileName: 'stream_tw',
    includeFiles: [
      path.join(__dirname, '/', '../storage/stream/skk/stream_tw_non_ip.list'),
      path.join(__dirname, '/', '../storage/stream/skk/stream_tw_ip.list'),
    ],
  },
  {
    fileName: 'stream_jp',
    includeFiles: [
      path.join(__dirname, '/', '../storage/stream/skk/stream_jp_non_ip.list'),
      path.join(__dirname, '/', '../storage/stream/skk/stream_jp_ip.list'),
    ],
  },
  {
    fileName: 'stream_kr',
    includeFiles: [
      path.join(__dirname, '/', '../storage/stream/skk/stream_kr_non_ip.list'),
      path.join(__dirname, '/', '../storage/stream/skk/stream_kr_ip.list'),
    ],
  },
  {
    fileName: 'stream_hk',
    includeFiles: [
      path.join(__dirname, '/', '../storage/stream/skk/stream_hk_non_ip.list'),
      path.join(__dirname, '/', '../storage/stream/skk/stream_hk_ip.list'),
    ],
  },
  {
    fileName: 'stream_eu',
    includeFiles: [
      path.join(__dirname, '/', '../storage/stream/skk/stream_eu_ip.list'),
      path.join(__dirname, '/', '../storage/stream/skk/stream_eu_non_ip.list'),
    ],
  },
  {
    // 国际 CDN
    fileName: 'GCDN',
    includeFiles: [
      path.join(__dirname, '/', '../storage/cdn/skk/cdn_domainset.list'),
      path.join(__dirname, '/', '../storage/cdn/skk/cdn_non_ip.list'),
    ],
  },
  {
    // 国内服务 CDN
    fileName: 'CCDN',
    includeFiles: [
      path.join(__dirname, '/', '../storage/cdn/skk/apple_cdn_domainset.list'),
      path.join(__dirname, '/', '../storage/cdn/skk/apple_cdn_non_ip.list'),
      path.join(__dirname, '/', '../storage/cdn/skk/apple_cn_non_ip.list'),
      path.join(__dirname, '/', '../storage/cdn/skk/microsoft_cdn_non_ip.list'),
    ],
  },
  {
    fileName: 'ai',
    includeFiles: [
      path.join(__dirname, '/', '../storage/ai/blackmatrix7/claude.list'),
      path.join(__dirname, '/', '../storage/ai/blackmatrix7/openAI.list'),
      path.join(__dirname, '/', '../storage/ai/blackmatrix7/gemini.list'),
      path.join(__dirname, '/', '../storage/ai/skk/ai_non_ip.list'),

    ],
  },
  {
    fileName: 'coze',
    includeFiles: [
      path.join(__dirname, '/', '../storage/coze/kkfive/coze.list'),
    ],
  },
  {
    fileName: 'telegram',
    includeFiles: [
      path.join(__dirname, '/', '../storage/telegram/blackmatrix7/telegram.list'),
      path.join(__dirname, '/', '../storage/telegram/skk/telegram_asn_ip.list'),
      path.join(__dirname, '/', '../storage/telegram/skk/telegram_ip.list'),
      path.join(__dirname, '/', '../storage/telegram/skk/telegram_non_ip.list'),

    ],
  },
  {
    fileName: 'download',
    includeFiles: [
      path.join(__dirname, '/', '../storage/download/skk/download_domainset.list'),
      path.join(__dirname, '/', '../storage/download/skk/download_non_ip.list'),
    ],
  },
  {
    fileName: 'developer',
    includeFiles: [
      path.join(__dirname, '/', '../storage/developer/blackmatrix7/developer.list'),
      path.join(__dirname, '/', '../storage/developer/blackmatrix7/github.list'),
      path.join(__dirname, '/', '../storage/developer/blackmatrix7/gitlab.list'),
    ],
  },
  {
    fileName: 'tiktok',
    includeFiles: [
      path.join(__dirname, '/', '../storage/tiktok/blackmatrix7/tiktok.list'),
    ],
  },
  {
    fileName: 'microsoft',
    includeFiles: [
      path.join(__dirname, '/', '../storage/microsoft/blackmatrix7/microsoft.list'),
    ],
  },
  {
    fileName: 'oneDriver',
    includeFiles: [
      path.join(__dirname, '/', '../storage/microsoft/blackmatrix7/oneDrive.list'),
    ],
  },
  {
    fileName: 'teams',
    includeFiles: [
      path.join(__dirname, '/', '../storage/microsoft/blackmatrix7/teams.list'),
    ],
  },
  {
    fileName: 'google',
    includeFiles: [
      path.join(__dirname, '/', '../storage/google/blackmatrix7/google.list'),
    ],
  },
  {
    fileName: 'pikpak',
    includeFiles: [
      path.join(__dirname, '/', '../storage/pikpak/blackmatrix7/pikpak.list'),
    ],
  },
  {
    fileName: 'notion',
    includeFiles: [
      path.join(__dirname, '/', '../storage/notion/blackmatrix7/notion.list'),
    ],
  },
  {
    fileName: 'bilibili',
    includeFiles: [
      path.join(__dirname, '/', '../storage/bilibili/blackmatrix7/bilibili.list'),
    ],
  },
  {
    fileName: 'speedtest',
    includeFiles: [
      path.join(__dirname, '/', '../storage/speedtest/blackmatrix7/speedtest.list'),
    ],
  },
  {
    fileName: 'wechat',
    includeFiles: [
      path.join(__dirname, '/', '../storage/wechat/blackmatrix7/wechat.list'),
    ],
  },
] as Array<{ fileName: string, includeFiles: Array<string> }>
