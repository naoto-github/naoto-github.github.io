// js/expressions.js
// 既存コードは一切変更しないで，VRMの表情を操作＆UIを「ポーズ」の右側に差し込む
(function () {
  // ========== ユーティリティ ==========
  const $ = (id) => document.getElementById(id);
  const getVRM = () => (window.Mikke && Mikke.VRM && Mikke.VRM.currentVRM) ? Mikke.VRM.currentVRM : null;

  // VRM0: blendShapeProxy 用のプリセット名（大文字先頭）
  const PROXY_MAP = {
    neutral: 'Neutral',
    happy: 'Joy',
    angry: 'Angry',
    sad: 'Sorrow',
    relaxed: 'Relaxed',
    surprised: 'Surprised',
  };

  // VRM0.0（three-vrm 0.6）: expressionManager は小文字プリセットキーでOK
  const PRESETS = ['neutral','happy','angry','sad','relaxed','surprised'];

  function setAllExpressions(vrm, value) {
    // expressionManager 優先
    if (vrm?.expressionManager?.setValue) {
      PRESETS.forEach(k => { try { vrm.expressionManager.setValue(k, value); } catch(_){} });
    }
    // VRM0 の古い proxy 互換
    if (vrm?.blendShapeProxy?.setValue) {
      Object.values(PROXY_MAP).forEach(name => { try { vrm.blendShapeProxy.setValue(name, value); } catch(_){} });
    }
  }

  function applyExpression(key) {
    const vrm = getVRM();
    if (!vrm) return;

    // 1) まず全プリセットを 0 に
    setAllExpressions(vrm, 0.0);

    // 2) ニュートラル以外を 1 に
    if (key && key !== 'neutral') {
      // expressionManager（新）
      if (vrm.expressionManager?.setValue) {
        try { vrm.expressionManager.setValue(key, 1.0); } catch(_) {}
      }
      // blendShapeProxy（旧）
      if (vrm.blendShapeProxy?.setValue) {
        const name = PROXY_MAP[key] || 'Neutral';
        try { vrm.blendShapeProxy.setValue(name, 1.0); } catch(_) {}
      }
    }

    // 一部モデルは update が必要．ここで軽く叩く（既存ループは update を呼んでいない）
    try { vrm.update?.(0); } catch(_) {}
  }

  // ========== UI を「ポーズ」の右隣に差し込む ==========
  function buildUI() {
    const poseSelect = $('poseSelect');
    if (!poseSelect) return null;

    // <label>ポーズ：<select id="poseSelect">…</select></label>
    // ↑このラベル要素の“直後”に挿入する
    const poseLabel = poseSelect.parentElement;

    const wrap = document.createElement('label');
    wrap.style.whiteSpace = 'nowrap';
    wrap.style.display = 'inline-flex';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '4px';
    wrap.style.marginLeft = '4px';

    const text = document.createTextNode('表情：');

    const select = document.createElement('select');
    select.id = 'expressionSelect';
    [
      { jp: 'ニュートラル', key: 'neutral'   },
      { jp: '喜び',         key: 'happy'     },
      { jp: '怒り',         key: 'angry'     },
      { jp: '悲しみ',       key: 'sad'       },
      { jp: '安らぎ',       key: 'relaxed'   },
      { jp: '驚き',         key: 'surprised' },
    ].forEach(o => {
      const op = document.createElement('option');
      op.value = o.key; op.textContent = o.jp;
      select.appendChild(op);
    });

    wrap.appendChild(text);
    wrap.appendChild(select);

    // ポーズ <label> の直後に挿入（＝右側に並ぶ）
    poseLabel.insertAdjacentElement('afterend', wrap);

    // 変更イベントで即反映
    select.addEventListener('change', (e) => applyExpression(e.target.value));

    // ロード直後はニュートラルを明示
    applyExpression('neutral');
    return select;
  }

  const selectEl = buildUI();
  if (!selectEl) return;

  // ========== VRM 切替を検知して再適用（既存コードに手を入れないための軽量監視） ==========
  let lastVRM = null;
  setInterval(() => {
    const cur = getVRM();
    if (!cur) return;
    if (cur !== lastVRM) {
      lastVRM = cur;
      // VRM が切り替わったら，現在の選択を再適用
      applyExpression(selectEl.value || 'neutral');
    }
    // 一部デバイスで反映遅延があるため，低頻度で update を呼ぶ
    try { cur.update?.(0); } catch(_) {}
  }, 300);
})();
