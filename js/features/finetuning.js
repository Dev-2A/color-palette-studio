/**
 * Color Fine-Tuning
 * 색상 미세 조정 슬라이더 기능
 * - Adjust hue, saturation, and lightness individually
 * - Real-time preview of adjustments
 */

//!SECTION - 색상 미세 조정 슬라이더 기능

//NOTE - 미세 조정 모드 전역 변수
const fineTuneMode = {
  isActive: false,
  currentColorIndex: null,
  originalColor: null
};

//NOTE - 색상 카드 클릭 시 미세 조정 패널 열기 (더블 클릭으로 변경)
function initFineTuneListeners() {
  // 페이지 로드 시 한 번만 호출
  document.addEventListener('dblclick', function(e) {
    const colorCard = e.target.closest('.color-card');
    if (colorCard && !e.target.closest('.lock-btn')) {
      const index = parseInt(colorCard.dataset.index);
      openFineTunePanel(index);
    }
  });
}

//NOTE - 미세 조정 패널 열기
function openFineTunePanel(colorIndex) {
  // 유효성 검사
  if (colorIndex === null || colorIndex === undefined || colorIndex < 0 || colorIndex >= currentPalette.length) {
    console.error('유효하지 않은 색상 인덱스:', colorIndex);
    return;
  }

  if (!currentPalette[colorIndex]) {
    console.error('색상이 존재하지 않습니다:', colorIndex);
    return;
  }

  fineTuneMode.isActive = true;
  fineTuneMode.currentColorIndex = colorIndex;
  fineTuneMode.originalColor = currentPalette[colorIndex];

  // 기존 패널 제거
  const existingPanel = document.getElementById('fineTunePanel');
  if (existingPanel) {
    existingPanel.remove();
  }

  createFineTunePanel();
}

//NOTE - 미세 조정 패널 생성
function createFineTunePanel() {
  const color = currentPalette[fineTuneMode.currentColorIndex];

  // 색상 유효성 검사
  if (!color) {
    console.error('유효하지 않은 색상 인덱스:', fineTuneMode.currentColorIndex);
    return;
  }

  const rgb = hexToRgb(color);
  if (!rgb) {
    console.error('유효하지 않은 HEX 색상:', color);
    return;
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const panel = document.createElement('div');
  panel.id = 'fineTunePanel';
  panel.className = 'fine-tune-panel';

  panel.innerHTML = `
    <div class="panel-backdrop" onclick="closeFineTunePanel()"></div>
    <div class="panel-content">
      <div class="panel-header">
        <h3>🎨 색상 미세 조정</h3>
        <button class="panel-close" onclick="closeFineTunePanel()">✕</button>
      </div>

      <div class="color-preview-section">
        <div class="preview-large" id="fineTunePreview" style="background: ${color};"></div>
        <div class="color-info">
          <div class="info-row">
            <span class="info-label">HEX:</span>
            <span class="info-value" id="fineTuneHex">${color}</span>
            <button class="copy-small" onclick="copyToClipboard('${color}')">📋</button>
          </div>
          <div class="info-row">
            <span class="info-label">RGB:</span>
            <span class="info-value" id="fineTuneRgb">RGB(${rgb.r}, ${rgb.g}, ${rgb.b})</span>
          </div>
          <div class="info-row">
            <span class="info-label">HSL:</span>
            <span class="info-value" id="fineTuneHsl">HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)</span>
          </div>
        </div>
      </div>

      <div class="sliders-section">
        <div class="slider-group">
          <div class="slider-label">
            <span>색조 (Hue)</span>
            <span class="slider-value" id="hueValue">${hsl.h}°</span>
          </div>
          <input
            type="range"
            id="hueSlider"
            class="color-slider hue-slider"
            min="0"
            max="360"
            value="${hsl.h}"
            oninput="updateColorFromSliders()"
          >
          <div class="slider-gradient hue-gradient"></div>
        </div>

        <div class="slider-group">
          <div class="slider-label">
            <span>채도 (Saturation)</span>
            <span class="slider-value" id="satValue">${hsl.s}%</span>
          </div>
          <input
            type="range"
            id="satSlider"
            class="color-slider"
            min="0"
            max="100"
            value="${hsl.s}"
            oninput="updateColorFromSliders()"
          >
          <div class="slider-gradient" id="satGradient"></div>
        </div>

        <div class="slider-group">
          <div class="slider-label">
            <span>명도 (Lightness)</span>
            <span class="slider-value" id="lightValue">${hsl.l}%</span>
          </div>
          <input
            type="range"
            id="lightSlider"
            class="color-slider"
            min="0"
            max="100"
            value="${hsl.l}"
            oninput="updateColorFromSliders()"
          >
          <div class="slider-gradient" id="lightGradient"></div>
        </div>
      </div>

      <div class="quick-adjust-section">
        <h4>빠른 조정</h4>
        <div class="quick-btns">
          <button class="quick-btn" onclick="quickAdjust('lighten')">
            ☀ 밝게
          </button>
          <button class="quick-btn" onclick="quickAdjust('darken')">
            🌙 어둡게
          </button>
          <button class="quick-btn" onclick="quickAdjust('saturate')">
            🎨 채도 증가
          </button>
          <button class="quick-btn" onclick="quickAdjust('desaturate')">
            ⚪ 채도 감소
          </button>
          <button class="quick-btn" onclick="quickAdjust('complement')">
            🔄 보색
          </button>
          <button class="quick-btn" onclick="quickAdjust('reset')">
            ↺ 원래대로
          </button>
        </div>
      </div>

      <div class="panel-actions">
        <button class="btn-apply" onclick="applyFineTune()">
          ✅ 적용
        </button>
        <button class="btn-cancel" onclick="cancelFineTune()">
          ❌ 취소
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(panel);

  // 그라디언트 업데이트
  updateSliderGradients();

  // 애니메이션
  setTimeout(() => panel.classList.add('show'), 10);
}

//NOTE - 슬라이더 값 변경 시 색상 업데이트
function updateColorFromSliders() {
  try {
    const hueSlider = document.getElementById('hueSlider');
    const satSlider = document.getElementById('satSlider');
    const lightSlider = document.getElementById('lightSlider');

    if (!hueSlider || !satSlider || !lightSlider) {
      console.error('슬라이더 요소를 찾을 수 없습니다');
      return;
    }

    const h = Math.max(0, Math.min(360, Number.parseInt(hueSlider.value, 10) || 0));
    const s = Math.max(0, Math.min(100, Number.parseInt(satSlider.value, 10) || 0));
    const l = Math.max(0, Math.min(100, Number.parseInt(lightSlider.value, 10) || 0));

    // HSL을 HEX로 변환
    const newColor = hslToHex(h, s, l);

    // 미리보기 업데이트
    const previewEl = document.getElementById('fineTunePreview');
    if (previewEl) previewEl.style.background = newColor;

    // 값 표시 업데이트
    const hueValueEl = document.getElementById('hueValue');
    const satValueEl = document.getElementById('satValue');
    const lightValueEl = document.getElementById('lightValue');

    if (hueValueEl) hueValueEl.textContent = h + '°';
    if (satValueEl) satValueEl.textContent = s + '%';
    if (lightValueEl) lightValueEl.textContent = l + '%';

    // 색상 정보 업데이트
    const rgb = hexToRgb(newColor);
    if (rgb) {
      const hexEl = document.getElementById('fineTuneHex');
      const rgbEl = document.getElementById('fineTuneRgb');
      const hslEl = document.getElementById('fineTuneHsl');

      if (hexEl) hexEl.textContent = newColor;
      if (rgbEl) rgbEl.textContent = `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      if (hslEl) hslEl.textContent = `HSL(${h}°, ${s}%, ${l}%)`;
    }

    // 복사 버튼 업데이트
    const copyBtn = document.querySelector('.copy-small');
    if (copyBtn) {
      copyBtn.setAttribute('data-color', newColor);
      copyBtn.setAttribute('onclick', `copyToClipboard('${newColor}')`);
    }

    // 그라디언트 업데이트
    updateSliderGradients();
  } catch (error) {
    console.error('색상 업데이트 중 오류:', error);
  }
}

//NOTE - 슬라이더 그라디언트 업데이트
function updateSliderGradients() {
  try {
    const hueSlider = document.getElementById('hueSlider');
    const satSlider = document.getElementById('satSlider');
    const lightSlider = document.getElementById('lightSlider');

    if (!hueSlider || !satSlider || !lightSlider) {
      return;
    }

    const h = Number.parseInt(hueSlider.value, 10) || 0;
    const s = Number.parseInt(satSlider.value, 10) || 0;
    const l = Number.parseInt(lightSlider.value, 10) || 0;

    // 채도 그라디언트
    const satGradient = document.getElementById('satGradient');
    if (satGradient) {
      satGradient.style.background = `linear-gradient(to right,
        hsl(${h}, 0%, ${l}%),
        hsl(${h}, 100%, ${l}%)
      )`;
    }

    // 명도 그라디언트
    const lightGradient = document.getElementById('lightGradient');
    if (lightGradient) {
      lightGradient.style.background = `linear-gradient(to right,
        hsl(${h}, ${s}%, 0%),
        hsl(${h}, ${s}%, 50%),
        hsl(${h}, ${s}%, 100%)
      )`;
    }
  } catch (error) {
    console.error('그라디언트 업데이트 중 오류:', error);
  }
}

//NOTE - 빠른 조정 기능
function quickAdjust(type) {
  const hueSlider = document.getElementById('hueSlider');
  const satSlider = document.getElementById('satSlider');
  const lightSlider = document.getElementById('lightSlider');

  let h = Number.parseInt(hueSlider.value);
  let s = Number.parseInt(satSlider.value);
  let l = Number.parseInt(lightSlider.value);

  switch (type) {
    case 'lighten':
      l = Math.min(100, l + 10);
      lightSlider.value = l;
      break;
    
    case 'darken':
      l = Math.max(0, l - 10);
      lightSlider.value = l;
      break;
    
    case 'saturate':
      s = Math.min(100, s + 15);
      satSlider.value = s;
      break;
    
    case 'desaturate':
      s = Math.max(0, s - 15);
      satSlider.value = s;
      break;
    
    case 'complement':
      h = (h + 180) % 360;
      hueSlider.value = h;
      break;
    
    case 'reset':
      const rgb = hexToRgb(fineTuneMode.originalColor);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hueSlider.value = hsl.h;
        satSlider.value = hsl.s;
        lightSlider.value = hsl.l;
      } else {
        console.error('유효하지 않은 원본 색상:', fineTuneMode.originalColor);
      }
      break;
  }

  updateColorFromSliders();
}

//NOTE - 미세 조정 적용
function applyFineTune() {
  const h = Number.parseInt(document.getElementById('hueSlider').value);
  const s = Number.parseInt(document.getElementById('satSlider').value);
  const l = Number.parseInt(document.getElementById('lightSlider').value);

  const newColor = hslToHex(h, s, l);
  currentPalette[fineTuneMode.currentColorIndex] = newColor;

  // 히스토리에 추가
  addToHistory(currentPalette);

  // 팔레트 표시 업데이트
  displayPalette();

  closeFineTunePanel();
  showToast('색상이 조정되었습니다! 🎨');
}

//NOTE - 미세 조정 취소
function cancelFineTune() {
  closeFineTunePanel();
}

//NOTE - 미세 조정 패널 닫기
function closeFineTunePanel() {
  const panel = document.getElementById('fineTunePanel');
  if (panel) {
    panel.classList.remove('show');
    setTimeout(() => panel.remove(), 300);
  }

  fineTuneMode.isActive = false;
  fineTuneMode.currentColorIndex = null;
  fineTuneMode.originalColor = null;
}

//NOTE - HSL을 HEX로 변환
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return rgbToHex({r, g, b});
}

