import path from 'node:path'
import { CONF } from '@/config'

export default [
  {
    fileName: 'reject',
    includeFiles: [
      path.join(CONF.ruleStoragePath, `/reject/blackmatrix7/Advertising_All_No_Resolve.list`),
      // path.join(CONF.ruleStoragePath, `/reject/skk/domainset_reject.list`),
      path.join(CONF.ruleStoragePath, `/reject/skk/skk_ip_reject.list`),
      path.join(CONF.ruleStoragePath, `/reject/my/reject.list`),
    ],
  },
  {
    fileName: 'reject_plus',
    includeFiles: [
      // path.join(CONF.ruleStoragePath, `/reject/blackmatrix7/Advertising_All_No_Resolve.list`),
      path.join(CONF.ruleStoragePath, '/reject/blackmatrix7/privacy_All.list'),
      // path.join(CONF.ruleStoragePath, `/reject/skk/domainset_reject.list`),
      path.join(CONF.ruleStoragePath, `/reject/skk/reject_url_regex_non_ip.list`),
      path.join(CONF.ruleStoragePath, `/reject/skk/skk_ip_reject.list`),
      path.join(CONF.ruleStoragePath, `/reject/antiAd/anti-ad-surge.list`),
      path.join(CONF.ruleStoragePath, `/reject/adrules/adrules.list`),
      path.join(CONF.ruleStoragePath, `/reject/RuCu6/MyBlockAds.list`),
      path.join(CONF.ruleStoragePath, `/reject/my/reject.list`),
    ],
  },
  {
    fileName: 'reject_drop',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/rejectDrop/skk/reject-drop_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/rejectDrop/skk/my_reject_non_ip.list'),
    ],
  },
  {
    fileName: 'reject_tinygif',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/rejectTinyGif/skk/reject-tinygif_non_ip.list'),
    ],
  },
  {
    fileName: 'domestic',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/domestic/skk/domestic_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/domestic/skk/domestic_ip.list'),
      path.join(CONF.ruleStoragePath, '/domestic/skk/china_ip.list'),
    ],
  },
  {
    fileName: 'direct',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/direct/skk/direct_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/direct/skk/my_direct_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/direct/my/direct.list'),
    ],
  },
  {
    fileName: 'lan',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/lan/skk/lan_ip.list'),
    ],
  },
  {
    fileName: 'global',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/global/skk/global_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/global/skk/global_plus_non_ip.list'),
    ],
  },
  {
    fileName: 'stream',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_ip.list'),
    ],
  },
  {
    fileName: 'stream_us',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_us_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_us_ip.list'),
    ],
  },
  {
    fileName: 'stream_tw',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_tw_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_tw_ip.list'),
    ],
  },
  {
    fileName: 'stream_jp',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_jp_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_jp_ip.list'),
    ],
  },
  {
    fileName: 'stream_kr',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_kr_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_kr_ip.list'),
    ],
  },
  {
    fileName: 'stream_hk',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_hk_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_hk_ip.list'),
    ],
  },
  {
    fileName: 'stream_eu',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_eu_ip.list'),
      path.join(CONF.ruleStoragePath, '/stream/skk/stream_eu_non_ip.list'),
    ],
  },
  {
    // 国际 CDN
    fileName: 'GCDN',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/cdn/skk/cdn_domainset.list'),
      path.join(CONF.ruleStoragePath, '/cdn/skk/cdn_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/cdn/my/gcdn_no_ip.list'),
    ],
  },
  {
    // 国内服务 CDN
    fileName: 'CCDN',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/cdn/skk/apple_cdn_domainset.list'),
      path.join(CONF.ruleStoragePath, '/cdn/skk/apple_cdn_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/cdn/skk/apple_cn_non_ip.list'),
      path.join(CONF.ruleStoragePath, '/cdn/skk/microsoft_cdn_non_ip.list'),
    ],
  },
  {
    fileName: 'ai',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/ai/blackmatrix7/claude.list'),
      path.join(CONF.ruleStoragePath, '/ai/blackmatrix7/openAI.list'),
      path.join(CONF.ruleStoragePath, '/ai/blackmatrix7/gemini.list'),
      path.join(CONF.ruleStoragePath, '/ai/skk/ai_non_ip.list'),

    ],
  },
  {
    fileName: 'coze',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/coze/kkfive/coze.list'),
    ],
  },
  {
    fileName: 'telegram',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/telegram/blackmatrix7/telegram.list'),
      path.join(CONF.ruleStoragePath, '/telegram/skk/telegram_asn_ip.list'),
      path.join(CONF.ruleStoragePath, '/telegram/skk/telegram_ip.list'),
      path.join(CONF.ruleStoragePath, '/telegram/skk/telegram_non_ip.list'),

    ],
  },
  {
    fileName: 'download',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/download/skk/download_domainset.list'),
      path.join(CONF.ruleStoragePath, '/download/skk/download_non_ip.list'),
    ],
  },
  {
    fileName: 'github',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/developer/blackmatrix7/github.list'),
      path.join(CONF.ruleStoragePath, '/developer/my/github.list'),
    ],
  },
  {
    fileName: 'developer',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/developer/blackmatrix7/developer.list'),
      path.join(CONF.ruleStoragePath, '/developer/blackmatrix7/gitlab.list'),
    ],
  },
  {
    fileName: 'tiktok',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/tiktok/blackmatrix7/tiktok.list'),
    ],
  },
  {
    fileName: 'microsoft',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/microsoft/blackmatrix7/microsoft.list'),
    ],
  },
  {
    fileName: 'oneDriver',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/microsoft/blackmatrix7/oneDrive.list'),
    ],
  },
  {
    fileName: 'teams',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/microsoft/blackmatrix7/teams.list'),
    ],
  },
  {
    fileName: 'google',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/google/blackmatrix7/google.list'),
    ],
  },
  {
    fileName: 'pikpak',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/pikpak/blackmatrix7/pikpak.list'),
      path.join(CONF.ruleStoragePath, '/pikpak/kkfive/pikpak.list'),
    ],
  },
  {
    fileName: 'notion',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/notion/blackmatrix7/notion.list'),
    ],
  },
  {
    fileName: 'bilibili',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/bilibili/blackmatrix7/bilibili.list'),
    ],
  },
  {
    fileName: 'speedtest',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/speedtest/blackmatrix7/speedtest.list'),
    ],
  },
  {
    fileName: 'wechat',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/wechat/blackmatrix7/wechat.list'),
    ],
  },
  {
    fileName: '1passwordUS',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/1password/vpn_tool/1PasswordUS.list'),
    ],
  },
  {
    fileName: 'spotify',
    includeFiles: [
      path.join(CONF.ruleStoragePath, '/spotify/blackmatrix7/spotify.list'),
    ],
  },
] as Array<{ fileName: string, includeFiles: Array<string> }>
