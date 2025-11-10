
(function () {
  const fs = require('fs');
  const PATH = '/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/gas_token.json';

  const raw = $response && $response.body ? $response.body : '';
  let token = '';
  try {
    const body = JSON.parse(raw || '{}');
    token = body?.data?.token || body?.token || '';
  } catch (e) {
    console.log('[EcejToken] JSON parse error:', e);
  }

  if (token && String(token).length > 10) {
    const content = {
      token: String(token),
      updateTime: new Date().toISOString(),
      source: 'QuantumultX/code2Session'
    };
    try {
      fs.writeFileSync(PATH, JSON.stringify(content, null, 2));
      console.log(`[EcejToken] ✅ 捕获成功: ${String(token).slice(0, 12)}...`);
    } catch (e) {
      console.log('[EcejToken] ❌ 写入失败:', e);
    }
  } else {
    console.log('[EcejToken] 未找到 token（或长度不合法），已透传原响应。');
  }

  // —— 永远透传原响应 —— //
  $done({ body: raw });
})();
