import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//添加源
export function addRegistry(name, value) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/registryData.json')))
  data[name] = {
    "registry": value
  },
    fs.writeFileSync(path.join(__dirname, '../data/registryData.json'), JSON.stringify(data))
}

export function delRegistry(answer) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/registryData.json')))
  answer.forEach(item => {
    for (let k in data) {
      data[k].registry.trim() === item.trim() && delete data[k]
    }
  })
  fs.writeFileSync(path.join(__dirname, '../data/registryData.json'), JSON.stringify(data))
}
