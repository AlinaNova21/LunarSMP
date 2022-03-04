import ZIP from 'adm-zip'
import fs from 'fs/promises'
import { basename, join } from 'path'

const pkg = JSON.parse(await fs.readFile('./package.json'))

await generateMods()
await generateWeb()

async function generateWeb() {
  const files = await fs.readdir('www')
  await Promise.all(files.map(file => fs.copyFile(`www/${file}`, `docs/${file}`)))
  const list = (await fs.readFile('output/mods-client.txt', 'utf8')).replace(/\n/g, '<br />\n')
  let index = await fs.readFile('docs/index.html', 'utf8')
  index = index.replace(/%VERSION%/g, pkg.version)
  index = index.replace(/%MODS_LIST%/g, list)
  index = index.replace(/%MODS%/g, `https://github.com/AlinaNova21/LunarSMP/releases/download/${pkg.version}/mods-client.zip`)
  await fs.writeFile('docs/index.html', index)
}

async function generateMods() {
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
}