
function parseForm(body){
  const out = {};
  (String(body||"")).split("&").forEach(kv=>{
    const i = kv.indexOf("=");
    if (i>0){
      const k = decodeURIComponent(kv.slice(0,i));
      const v = decodeURIComponent(kv.slice(i+1));
      out[k] = v;
    }
  });
  return out;
}

let reqBody = $request?.body || "";
const form = parseForm(reqBody);
const appKey = form.appKey || form['appkey'] || "";

if (appKey && appKey.length > 20) {
  const fs = require('fs');
  const path = '/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/gas_appkey.json';
  const content = {
    appKey: String(appKey),
    updateTime: new Date().toISOString(),
    source: "QuantumultX/request-body"
  };
  try {
    fs.writeFileSync(path, JSON.stringify(content, null, 2));
    console.log(`[EcejAppKey] ✅ 捕获成功: ${String(appKey)}`);
  } catch (e) {
    console.log(`[EcejAppKey] ❌ 写入失败: ${e}`);
  }
} else {
  console.log("[EcejAppKey] 未在请求体中找到 appKey。");
}

$done({});
