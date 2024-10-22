export interface DownloadItem {
  path: string
  url: string
}

export default {
  'reject': [
    {
      path: 'blackmatrix7/privacy_All.list',
      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Privacy/Privacy_All.list',
    },
    {
      path: 'blackmatrix7/Advertising_All_No_Resolve.list',
      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Advertising/Advertising_All_No_Resolve.list',
    },
    {
      path: 'skk/skk_non_ip_reject.list',
      url: 'https://ruleset.skk.moe/List/non_ip/reject.conf',
    },
    {
      path: 'skk/skk_ip_reject.list',
      url: 'https://ruleset.skk.moe/List/ip/reject.conf',
    },
    {
      path: 'antiAd/anti-ad-surge.list',
      url: 'https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt',
    },
    {
      path: 'adrules/adrules.list',
      url: 'https://adrules.top/adrules.list',
    },
    // {
    //   path: 'RuCu6/MyBlockAds.list',
    //   url: 'https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/MyBlockAds.list',
    // },
    {
      path: 'skk/reject_url_regex_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/reject-url-regex.conf',
    },

  ],
  'rejectDrop': [
    {
      path: 'skk/reject-drop_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/reject-drop.conf',
    },
    {
      path: 'skk/my_reject_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/my_reject.conf',
    },
  ],
  'rejectTinyGif': [
    {
      path: 'skk/reject-tinygif_non_ip.list',
      url: 'https://ruleset.skk.moe/List/domainset/reject.conf',
    },
  ],
  // 国内的规则
  'domestic': [
    {
      path: 'skk/domestic_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/domestic.conf',
    },
    {
      path: 'skk/domestic_ip.list',
      url: 'https://ruleset.skk.moe/List/ip/domestic.conf',
    },
    {
      path: 'skk/china_ip.list',
      url: 'https://ruleset.skk.moe/List/ip/china_ip.conf',
    },
  ],
  // 不应该被代理的规则
  'direct': [
    {
      path: 'skk/direct_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/direct.conf',
    },
    {
      path: 'skk/my_direct_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/my_direct.conf',
    },
  ],
  'lan': [
    {
      path: 'skk/lan_ip.list',
      url: 'https://ruleset.skk.moe/List/ip/lan.conf',
    },
  ],
  // 国外的规则
  'global': [
    {
      path: 'skk/global_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/global.conf',
    },
    {
      path: 'skk/global_plus_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/global_plus.conf',
    },
  ],
  'proxy': [
    {
      path: 'skk/my_proxy_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/my_proxy.conf',
    },
  ],
  'spotify': [
    { path: 'blackmatrix7/spotify.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Spotify/Spotify.list' },
  ],
  'stream': [
    { path: 'skk/stream_non_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/stream.conf' },
    { path: 'skk/stream_us_non_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/stream_us.conf' },
    { path: 'skk/stream_tw_non_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/stream_tw.conf' },
    { path: 'skk/stream_kr_non_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/stream_kr.conf' },
    { path: 'skk/stream_jp_non_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/stream_jp.conf' },
    { path: 'skk/stream_hk_non_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/stream_hk.conf' },
    { path: 'skk/stream_eu_non_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/stream_eu.conf' },
    { path: 'skk/stream_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/stream.conf' },
    { path: 'skk/stream_us_ip.list', url: 'https://ruleset.skk.moe/List/ip/stream_us.conf' },
    { path: 'skk/stream_tw_ip.list', url: 'https://ruleset.skk.moe/List/ip/stream_tw.conf' },
    { path: 'skk/stream_kr_ip.list', url: 'https://ruleset.skk.moe/List/ip/stream_kr.conf' },
    { path: 'skk/stream_jp_ip.list', url: 'https://ruleset.skk.moe/List/ip/stream_jp.conf' },
    { path: 'skk/stream_hk_ip.list', url: 'https://ruleset.skk.moe/List/ip/stream_hk.conf' },
    { path: 'skk/stream_eu_ip.list', url: 'https://ruleset.skk.moe/List/ip/stream_eu.conf' },
  ],
  'cdn': [
    { url: 'https://ruleset.skk.moe/List/domainset/cdn.conf', path: 'skk/cdn_domainset.list' },
    { url: 'https://ruleset.skk.moe/List/non_ip/cdn.conf', path: 'skk/cdn_non_ip.list' },
    { url: 'https://ruleset.skk.moe/List/domainset/apple_cdn.conf', path: 'skk/apple_cdn_domainset.list' },
    { url: 'https://ruleset.skk.moe/List/non_ip/apple_cdn.conf', path: 'skk/apple_cdn_non_ip.list' },
    { url: 'https://ruleset.skk.moe/List/non_ip/apple_cn.conf', path: 'skk/apple_cn_non_ip.list' },
    { url: 'https://ruleset.skk.moe/List/non_ip/microsoft_cdn.conf', path: 'skk/microsoft_cdn_non_ip.list' },
  ],
  'ai': [
    {
      path: 'skk/ai_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/ai.conf',
    },
    {
      path: 'blackmatrix7/openAI.list',
      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/OpenAI/OpenAI_Resolve.list',
    },
    {
      path: 'blackmatrix7/claude.list',
      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Claude/Claude.list',
    },
    {
      path: 'blackmatrix7/gemini.list',
      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Gemini/Gemini.list',
    },
  ],
  'telegram': [
    {
      path: 'blackmatrix7/telegram.list',
      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Telegram/Telegram.list',
    },
    {
      path: 'skk/telegram_asn_ip.list',
      url: 'https://ruleset.skk.moe/List/ip/telegram_asn.conf',
    },
    {
      path: 'skk/telegram_ip.list',
      url: 'https://ruleset.skk.moe/List/ip/telegram.conf',
    },
    {
      path: 'skk/telegram_non_ip.list',
      url: 'https://ruleset.skk.moe/List/non_ip/telegram.conf',
    },
  ],
  'download': [
    { path: 'skk/download_domainset.list', url: 'https://ruleset.skk.moe/List/domainset/download.conf' },
    { path: 'skk/download_non_ip.list', url: 'https://ruleset.skk.moe/List/non_ip/download.conf' },
  ],
  'developer': [
    { path: 'blackmatrix7/github.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/GitHub/GitHub.list' },
    { path: 'blackmatrix7/gitlab.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/GitLab/GitLab.list' },
    { path: 'blackmatrix7/developer.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Developer/Developer.list' },
  ],
  'tiktok': [
    { path: 'blackmatrix7/tiktok.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TikTok/TikTok.list' },
  ],
  'microsoft': [
    { path: 'blackmatrix7/microsoft.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Microsoft/Microsoft.list' },
    { path: 'blackmatrix7/oneDrive.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/OneDrive/OneDrive.list' },
    { path: 'blackmatrix7/teams.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Teams/Teams.list' },
  ],
  'google': [
    { path: 'blackmatrix7/google.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Google/Google.list' },
    { path: 'blackmatrix7/googleDrive.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/GoogleDrive/GoogleDrive.list' },
  ],
  'pikpak': [
    { path: 'blackmatrix7/pikpak.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PikPak/PikPak.list' },
  ],
  'notion': [
    { path: 'blackmatrix7/notion.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Notion/Notion.list' },
  ],
  'bilibili': [
    { path: 'blackmatrix7/bilibili.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/BiliBili/BiliBili.list' },
  ],
  'wechat': [
    { path: 'blackmatrix7/wechat.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/WeChat/WeChat.list' },
  ],
  'speedtest': [
    { path: 'blackmatrix7/speedtest.list', url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Speedtest/Speedtest.list' },
  ],
  '1password': [
    {
      path: 'vpn_tool/1PasswordUS.list',
      url: 'https://kelee.one/Tool/Loon/Rule/1PasswordUS.list',
    },
  ],
} as Record<string, DownloadItem[]>
