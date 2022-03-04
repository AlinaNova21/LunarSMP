import ZIP from 'adm-zip'
import fs from 'fs/promises'
import { basename, join } from 'path'

const pkg = JSON.parse(await fs.readFile('./package.json'))
const modfilename = `mods-${pkg.version}.zip`

const clientZip = new ZIP()
const serverZip = new ZIP()

const [common, client, server] = await Promise.all([
  'mods/common',
  'mods/client',
  'mods/server'
].map(async d => {
  const files = await fs.readdir(d)
  return files.map(f => join(d, f))
}))

const clientList = [...common, ...client]
const serverList = [...common, ...server]

clientList.forEach(f => clientZip.addLocalFile(f))
serverList.forEach(f => serverZip.addLocalFile(f))

await fs.mkdir('output', { recursive: true }).catch(() => { })

await fs.writeFile(`output/mods-client.txt`, clientList.map(f => basename(f)).join('\n'))
await fs.writeFile(`output/mods-server.txt`, serverList.map(f => basename(f)).join('\n'))

clientZip.writeZip(`output/mods-client.zip`)
serverZip.writeZip(`output/mods-server.zip`)