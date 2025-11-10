(function () {
  const fm = FileManager.iCloud(); // 使用 QX 的 iCloud 文件管理
  const PATH = fm.joinPath(fm.documentsDirectory(), "gas_appkey.json");

  function parseForm(body) {
    const out = {};
    (String(body || '')).split('&').forEach(kv => {
      const i = kv.indexOf('=');
      if (i > 0) {
        const k = decodeURIComponent(kv.slice(0, i));
        const v = decodeURIComponent(kv.slice(i + 1));
        out[k] = v;
      }
    });
    return out;
  }

  const reqBody = $request?.body || '';
  const form = parseForm(reqBody);
  const appKey = form.appKey || form.appkey || '';

  if (appKey && appKey.length > 20) {
    const content = {
      appKey: String(appKey),
      updateTime: new Date().toISOString(),
      source: 'QuantumultX/request-body'
    };
    try {
      fm.writeString(PATH, JSON.stringify(content, null, 2)); // 写入到 iCloud 文件
      console.log(`[EcejAppKey] ✅ 捕获成功: ${String(appKey)}`);
    } catch (e) {
      console.log('[EcejAppKey] ❌ 写入失败:', e);
    }
  } else {
    console.log('[EcejAppKey] 未在请求体中找到 appKey，已透传原请求。');
  }

  // —— 不改请求体 —— //
  $done({});
})();
