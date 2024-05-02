/**
 * 一些域名不可被 MitM 代理，这里可以添加一些域名
 */

import { CONF } from '@/config'
import { writeFileSync } from '@/utils'

const list = [
  // apple
  'gateway.icloud.com',
  'gateway.icloud.com.cn',
  'weather-data.apple.com',
  'buy.itunes.apple.com',
  // mac 端 百度云盘客户端
  'pan.baidu.com',
  'update.pan.baidu.com',
  // tg 客户端
  '95.161.76.101',
  // 京东
  'www.jd.com',
];

(() => {
  writeFileSync(`${CONF.outputDir}/surge/surgio/disable-host-name.snippet`, list.join(','))
})()
