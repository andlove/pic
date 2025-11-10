
let body = {};
try { body = JSON.parse($response.body || "{}"); } catch(_) {}

const token = body?.data?.token || body?.token || "";
if (token && token.length > 10) {
  const fs = require('fs');
  const path = '/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/gas_token.json';
  const content = {
    token: String(token),
    updateTime: new Date().toISOString(),
    source: "QuantumultX/code2Session"
  };
  try {
    fs.writeFileSync(path, JSON.stringify(content, null, 2));
    console.log(`[EcejToken] ✅ 捕获成功: ${String(token).slice(0, 12)}...`);
  } catch (e) {
    console.log(`[EcejToken] ❌ 写入失败: ${e}`);
  }
} else {
  console.log("[EcejToken] 未找到 token 字段或长度不合法。");
}

$done($response.body);
