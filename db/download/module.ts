import type { DownloadItem } from './rule'

export default {
  dns: [
    { path: 'VirgilClyne/dns.sgmodule', url: 'https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/sgmodule/DNS.sgmodule' },
    { path: 'skk/dns.sgmodule', url: 'https://ruleset.skk.moe/Modules/sukka_local_dns_mapping.sgmodule' },
  ],
} as Record<string, DownloadItem[]>
