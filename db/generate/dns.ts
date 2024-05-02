import path from 'node:path'
import { CONF } from '@/config'

export default {
  fileName: 'dnsmap',
  includeFiles: [
    path.join(CONF.moduleStoragePath, `/dns/VirgilClyne/dns.sgmodule`),
    path.join(CONF.moduleStoragePath, `/dns/skk/dns.sgmodule`),
  ],
}
