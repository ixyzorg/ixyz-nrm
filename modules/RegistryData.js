import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import execPromise from '../utils/exec.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const obj = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/registryData.json'), 'utf8'))

const currentRegistry = await execPromise('npm config get registry')
const data = Object.keys(obj).map(key => {
  return {
    name: key,
    value: obj[key].registry,
  }
})
data.forEach(item => {
  if (item.value.trim() == currentRegistry.trim()) {
    item.disabled = '(当前镜像源)'
  }
})

export default data
