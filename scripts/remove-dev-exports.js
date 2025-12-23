import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Remove "development" field from all exports
Object.keys(packageJson.exports).forEach(key => {
  if (packageJson.exports[key].development) {
    delete packageJson.exports[key].development;
  }
});

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log('✓ Removed development exports from package.json');
