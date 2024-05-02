import ruleDb from '@db/download/rule'
import moduleDb from '@db/download/module'
import { CONF } from '../config'
import { writeFileSync } from '@/utils'

const { ruleStoragePath, moduleStoragePath } = CONF

function main() {
  // rule
  Object.keys(ruleDb).forEach((key) => {
    const urlItemList = ruleDb[key as keyof typeof ruleDb]
    urlItemList.forEach((urlItem) => {
      downloadFile(urlItem.url).then((data: string) => {
        writeFileSync(`${ruleStoragePath}/${key}/${urlItem.path}`, data)
      }).catch((err) => {
        console.error(err)
      })
    })
  })
  // module
  Object.keys(moduleDb).forEach((key) => {
    const urlItemList = moduleDb[key as keyof typeof moduleDb]
    urlItemList.forEach((urlItem) => {
      downloadFile(urlItem.url).then((data: string) => {
        writeFileSync(`${moduleStoragePath}/${key}/${urlItem.path}`, data)
      }).catch((err) => {
        console.error(err)
      })
    })
  })
}

function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      if (res.ok) {
        resolve(res.text())
      }
      else {
        reject(new Error(`download failed${url}`))
        // console.error(`${url} failed`)
        throw new Error('Network response was not ok.')
      }
    })
  })
}

main()
