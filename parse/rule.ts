type Target = 'loon-rule-set' | 'shadowrocket-rule-set' | 'stash-rule-set' | 'stash-domain-set' | 'surge-rule-set' | 'surge-domain-set'

/**
 * 参考：https://github.com/Script-Hub-Org/Script-Hub/blob/main/rule-parser.js
 */
export default function parseRule(target: Target, content: string) {
  /**
   * 一些不会改的参数
   */
  // const Rin0 = null
  // const Rout0 = null // 去除source的注释
  // const sni = null
  const ipNoResolve = true

  /**
   * 一些参数配置
   */
  const isLooniOS = target === 'loon-rule-set' // loon-rule-set

  const isShadowrocket = target === 'shadowrocket-rule-set' // shadowrocket-rule-set

  const isStashiOS = target === 'stash-rule-set' // stash-rule-set
  const isStashdomainset = target === 'stash-domain-set' // stash-domain-set
  const isStashdomainset2 = false // stash-domain-set2

  const isSurgeiOS = target === 'surge-rule-set' // surge-rule-set
  const isSurgedomainset = false // surge-domain-set
  const isSurgedomainset2 = false // surge-domain-set2

  let other: any[] = [] // 不支持的规则
  let ruleSet: any[] = [] // 解析过后的规则
  let domainSet = [] // 域名集
  let outRules: any[] = [] // 被排除的规则

  let noResolve // ip规则是否开启不解析域名
  let ruleType // 规则类型
  let ruleValue // 规则

  const body = content.match(/[^\r\n]+/g)
  if (!body)
    return ''

  body.forEach((x) => {
    x = x
      .replace(/^payload:/, '')
      .replace(/^ *(#|;|\/\/)/, '#')
      .replace(/ *- /, '')
      .replace(/(^[^#].+)\x20+\/\/.+/, '$1')
      .replace(/(\{[0-9]+)\,([0-9]*\})/g, '$1t&zd;$2')
      .replace(/(^[^U].*(\[|=|{|\\|\/.*\.js).*)/i, '')
      .replace(/'|"/g, '')
      // .replace(/^(\.|\*|\+)\.?/, 'DOMAIN-SUFFIX,')

    if (!x.match(/^ *#/) && !x.match(/,/) && x !== '') {
      if (x.search(/[0-9]\/[0-9]/) !== -1)
        x = `IP-CIDR,${x}`
      else if (x.search(/([0-9]|[a-z]):([0-9]|[a-z])/) !== -1)
        x = `IP-CIDR6,${x}`
      // else
        // x = `DOMAIN,${x}`
    }
    // // 去掉注释
    // if (Rin0 != null) {
    //   for (let i = 0; i < Rin0.length; i++) {
    //     const elem = Rin0[i]
    //     if (x.includes(elem))
    //       x = x.replace(/^#/, '')
    //   } // 循环结束
    // } // 去掉注释结束

    // // 增加注释
    // if (Rout0 != null) {
    //   for (let i = 0; i < Rout0.length; i++) {
    //     const elem = Rout0[i]
    //     if (x.includes(elem))
    //       x = x.replace(/(.+)/, ';#$1')
    //   } // 循环结束
    // } // 增加注释结束

    // ip规则不解析域名
    if (ipNoResolve === true) {
      if (x.match(/^ip6?-[ca]/i) != null)
        x = `${x},no-resolve`

      // else {
      // }
    }
    // else {
    // } // 增加ip规则不解析域名结束

    // sni嗅探
    // if (sni != null) {
    //   for (let i = 0; i < sni.length; i++) {
    //     const elem = sni[i]
    //     if (x.includes(elem) && x.search(/^ip6?-[ca]/i) == -1)
    //       x = `${x},extended-matching`
    //   } // 循环结束
    // } // 启用sni嗅探结束

    x = x
      .replace(/^#.+/, '')
      .replace(/^host-wildcard/i, 'HO-ST-WILDCARD')
      .replace(/^host/i, 'DOMAIN')
      .replace(/^dest-port/i, 'DST-PORT')
      .replace(/^ip6-cidr/i, 'IP-CIDR6')

    if (isStashiOS || isStashdomainset || isStashdomainset2) {
      if (x.match(/^;#/)) {
        outRules.push(x.replace(/^;#/, '').replace(/^HO-ST/i, 'HOST'))
      }
      else if (x.match(/^(HO-ST|U|PROTOCOL|OR|AND|NOT)/i)) {
        other.push(x.replace(/^HO-ST/i, 'HOST'))
      }
      else if (x !== '') {
        noResolve = x.replace(/\x20/g, '').match(/,no-resolve/i) ? ',no-resolve' : ''
        if (x.match(/^PROCESS/i))
          ruleType = x.split(',')[1].match('/') ? 'PROCESS-PATH' : 'PROCESS-NAME'
        else
          ruleType = x.replace(/\x20/g, '').split(',')[0].toUpperCase()

        ruleValue = x.split(/ *, */)[1]

        if (!ruleValue)
          ruleSet.push(`${ruleType.toLowerCase()}`)
        else
          ruleSet.push(`${ruleType},${ruleValue}${noResolve}`)
      }
    }
    else if (isLooniOS) {
      if (x.match(/^;#/)) {
        outRules.push(x.replace(/^;#/, '').replace(/^HO-ST/i, 'HOST'))
      }
      else if (x.match(/^(HO-ST|DST-PORT|PROTOCOL|PROCESS-NAME|OR|AND|NOT)/i)) {
        other.push(x.replace(/^HO-ST/i, 'HOST'))
      }
      else if (x !== '') {
        noResolve = x.replace(/\x20/g, '').match(/,no-resolve/i) ? ',no-resolve' : ''

        ruleType = x.split(/ *, */)[0].toUpperCase()

        ruleValue = x.split(/ *, */)[1]

        if (!ruleValue)
          ruleSet.push(`${ruleType.toLowerCase()}`)
        else
          ruleSet.push(`${ruleType},${ruleValue}${noResolve}`)
      }
    }
    else if (isSurgeiOS || isShadowrocket || isSurgedomainset || isSurgedomainset2) {
      if (x.match(/^;#/)) {
        outRules.push(x.replace(/^;#/, '').replace(/^HO-ST/i, 'HOST'))
      }
      else if (x.match(/^HO-ST/i)) {
        other.push(x.replace(/^HO-ST/i, 'HOST'))
      }
      else if (x.match(/^(OR|AND|NOT)/i)) {
        ruleSet.push(x)
      }
      else if (x !== '') {
        noResolve = x.replace(/\x20/g, '').match(/,no-resolve/i) ? ',no-resolve' : ''
        const dSni = x.replace(/\x20/g, '').match(/,extended-matching/i) ? ',extended-matching' : ''

        ruleType = x
          .split(/ *, */)[0]
          .toUpperCase()
          .replace(/^PROCESS-PATH/i, 'PROCESS-NAME')

        ruleValue = x.split(/ *, */)[1]
        if (!ruleValue)
          ruleSet.push(`${ruleType.toLowerCase()}`)
        else
          ruleSet.push(`${ruleType},${ruleValue}${noResolve}${dSni}`)
      }
    }
  })
  const ruleNum = ruleSet.length
  const notSupport = other.length
  const outRuleNum = outRules.length
  other = (other[0] || '') && `\n#不支持的规则:\n#${other.join('\n#')}`
  outRules = (outRules[0] || '') && `\n#已排除规则:\n#${outRules.join('\n#')}`

  if (isStashiOS) {
    ruleSet
    = (ruleSet[0] || '')
    && `#规则数量:${ruleNum}\n#不支持的规则数量:${notSupport}\n#已排除的规则数量:${outRuleNum}${other}${outRules}\n\n#-----------------以下为解析后的规则-----------------#\n\n${ruleSet.join(
      '\n',
    )}`
  }
  else if (isSurgeiOS || isShadowrocket || isLooniOS) {
    ruleSet
    = (ruleSet[0] || '')
    && `#规则数量:${ruleNum}\n#不支持的规则数量:${notSupport}\n#已排除的规则数量:${outRuleNum}${other}${outRules}\n\n#-----------------以下为解析后的规则-----------------#\n\n${ruleSet.join(
      '\n',
    )}`
  }
  else if (isSurgedomainset || isSurgedomainset2) {
    domainSet = ruleSet.filter(ruleSet => ruleSet.search(/^DOMAIN(,|-SUFFIX)/) !== -1)

    ruleSet = ruleSet.filter(ruleSet => ruleSet.search(/^DOMAIN(,|-SUFFIX)/) === -1)

    const ruleNum2 = ruleSet.length
    const domainNum = domainSet.length
    if (isSurgedomainset) {
      ruleSet
      = (domainSet[0] || '')
      && `#总规则数量:${ruleNum}\n#域名规则数量:${domainNum}\n#不支持的规则数量:${notSupport}\n#已排除的规则数量:${outRuleNum}${other}${outRules}\n\n#-----------------以下为解析后的规则-----------------#\n\n${
         domainSet
          .join('\n')
          .replace(/^DOMAIN,/gm, '')
          .replace(/^DOMAIN-SUFFIX,/gm, '.')}`
    }
    else if (isSurgedomainset2) {
      ruleSet
      = (ruleSet[0] || '')
      && `#总规则数量:${ruleNum}\n#非域名规则数量:${ruleNum2}\n#不支持的规则数量:${notSupport}\n#已排除的规则数量:${outRuleNum}${other}${outRules}\n\n#-----------------以下为解析后的规则-----------------#\n\n${ruleSet.join(
        '\n',
      )}`
    }
  }
  else if (isStashdomainset || isStashdomainset2) {
    domainSet = ruleSet.filter(ruleSet => ruleSet.search(/DOMAIN(,|-SUFFIX)/) !== -1)

    ruleSet = ruleSet.filter(ruleSet => ruleSet.search(/DOMAIN(,|-SUFFIX)/) === -1)

    const ruleNum2 = ruleSet.length

    if (isStashdomainset) {
      ruleSet
      = (domainSet[0] || '')
      && domainSet
        .join('\n')
        .replace(/DOMAIN,/gm, '')
        .replace(/DOMAIN-SUFFIX,/gm, '.')
        .replace(/^([^,]*),?.*/gim, '$1')
    }
    else if (isStashdomainset2) {
      ruleSet
      = (ruleSet[0] || '')
      && `#总规则数量:${ruleNum}\n#非域名规则数量:${ruleNum2}\n#不支持的规则数量:${notSupport}\n#已排除的规则数量:${outRuleNum}${other}${outRules}\n\n#-----------------以下为解析后的规则-----------------#\n\n${ruleSet.join(
        '\n',
      )}`
    }
  }

  return `${ruleSet}`.replace(/t&zd;/g, ',').replace(/ ;#/g, ' ')
}
