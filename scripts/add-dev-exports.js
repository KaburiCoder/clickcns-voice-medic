import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add "development" field to all exports
const devMappings = {
  '.': './src/index.ts',
  './api': './src/api/index.ts',
  './types': './src/types/index.ts',
  './ui': './src/ui/index.ts',
  './shadcn-ui': './src/shadcn-ui/index.ts',
  './hooks': './src/hooks/index.ts',
  './hooks.user-notifications': './src/hooks/user-notifications/index.ts',
  './hooks.feedbacks': './src/hooks/feedbacks/index.ts'
};

Object.keys(devMappings).forEach(key => {
  if (packageJson.exports[key]) {
    packageJson.exports[key].development = devMappings[key];
  }
});

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log('✓ Added development exports to package.json');
