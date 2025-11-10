/**
 * Quantumult X — 自动捕获 ecej 燃气token
 */

const body = JSON.parse($response.body || "{}");
const token = body?.data?.token;

if (token) {
  const fs = require('fs');
  const path = '/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/gas_token.json';
  const data = { token, time: new Date().toISOString() };

  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`[EcejToken] ✅ 已捕获新 token：${token}`);
}

$done($response.body);
