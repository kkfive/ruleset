import path from 'node:path'

export default [
  {
    fileName: 'dnsmap',
    includeFiles: [
      path.join(__dirname, '/', `../storage/module/dns/VirgilClyne/dns.sgmodule`),
      path.join(__dirname, '/', `../storage/module/dns/skk/dns.sgmodule`),
    ],
  },
] as Array<{ fileName: string, includeFiles: Array<string> }>
