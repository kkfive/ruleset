import path from 'node:path'
import { writeFileSync } from '@/utils'
import db from '@/db/download'
import moduleDb from '@/db/module'

const basePath = path.join(__dirname, `/../storage`)
const moduleBasePath = path.join(__dirname, `/../storage/module`)

function main() {
  Object.keys(db).forEach((key) => {
    const urlItemList = db[key as keyof typeof db]
    urlItemList.forEach((urlItem) => {
      downloadFile(urlItem.url).then((data: string) => {
        writeFileSync(`${basePath}/${key}/${urlItem.path}`, data)
      }).catch((err) => {
        console.error(err)
      })
    })
  })
  Object.keys(moduleDb).forEach((key) => {
    const urlItemList = moduleDb[key as keyof typeof db]
    urlItemList.forEach((urlItem) => {
      downloadFile(urlItem.url).then((data: string) => {
        writeFileSync(`${moduleBasePath}/${key}/${urlItem.path}`, data)
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
