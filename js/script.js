//!SECTION - 01. 전역 변수 선언

let currentPalette = [];        // 현재 표시 중인 팔레트
let lockedColors = new Set();   // 잠긴 색상들의 인덱스
let currentMode = 'random';     // 현재 색상 조화 모드

//!SECTION - 02. DOM 요소 참조

const elements = {
  palette: document.getElementById('palette'),
  savedPalettes: document.getElementById('savedPalettes'),
  toast: document.getElementById('toast'),
  generateBtn: document.getElementById('generateBtn'),
  saveBtn: document.getElementById('saveBtn'),
  modeBtns: document.querySelectorAll('.mode-btn')
};

//!SECTION - 03. 색상 변환 유틸리티 함수들

// 랜덤 색상 생성
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// HEX를 RGB로 변환
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// RGB를 HSL로 변환
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // 무채색
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// HSL을 HEX로 전환
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

//!SECTION - 04. 색상 조화 생성 함수들

// 보색 팔레트 생성
function generateComplementary(baseColor) {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [baseColor];

  // 보색 (180도 반대)과 그 주변 색상들
  for (let i = 1; i < 5; i++) {
    const newHue = (hsl.h + 180 + (i - 2.5) * 15) % 360;
    const newSat = Math.max(20, Math.min(100, hsl.s + (Math.random() - 0.5) * 20));
    const newLight = Math.max(20, Math.min(80, hsl.l + (Math.random() - 0.5) * 20));
    colors.push(hslToHex(newHue, newSat, newLight));
  }

  return colors;
}

// 유사색 팔레트 생성
function generateAlalogous(baseColor) {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [baseColor];

  // 인접한 색상들 (30도씩)
  for (let i = 1; i < 5; i++) {
    const newHue = (hsl.h + (i * 30) - 60) % 360;
    const newSat = Math.max(20, Math.min(100, hsl.s + (Math.random() - 0.5) * 10));
    const newLight = Math.max(20, Math.min(80, hsl.l + (Math.random() - 0.5) * 15));
    colors.push(hslToHex(Math.abs(newHue), newSat, newLight));
  }

  return colors;
}

// 삼각색 팔레트 생성
function generateTriadic(baseColor) {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [baseColor];

  // 120도씩 떨어진 색상들
  const angles = [120, 240, 60, 180];
  angles.forEach(angle => {
    const newHue = (hsl.h + angle) % 360;
    const newSat = Math.max(20, Math.min(100, hsl.s + (Math.random() - 0.5) * 15));
    const newLight = Math.max(20, Math.min(80, hsl.l + (Math.random() - 0.5) * 20));
    colors.push(hslToHex(newHue, newSat, newLight));
  });

  return colors;
}

// 단색조 팔레트 생성
function generateMonochromatic(baseColor) {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [];

  // 같은 색상, 다른 명도
  for (let i = 0; i < 5; i++) {
    const newLight = 20 + (i * 15);
    const newSat = Math.max(10, Math.min(100, hsl.s - (i * 5)));
    colors.push(hslToHex(hsl.h, newSat, newLight));
  }

  return colors;
}

//!SECTION - 05. 팔레트 생성 및 표시

// 새 팔레트 생성
function generatePalette() {
  const newPalette = [];

  if (currentMode === 'random') {
    // 랜덤 모드
    for (let i = 0; i < 5; i++) {
      if (lockedColors.has(i) && currentPalette[i]) {
        newPalette.push(currentPalette[i]);
      } else {
        newPalette.push(randomColor());
      }
    }
  } else {
    // 조화 모드
    const baseColor = lockedColors.size > 0 && currentPalette[Array.from(lockedColors)[0]]
      ? currentPalette[Array.from(lockedColors)[0]]
      : randomColor();
    
    let generatedColors;
    switch(currentMode) {
      case 'complementary':
        generatedColors = generateComplementary(baseColor);
        break;
      case 'analogous':
        generatedColors = generateAlalogous(baseColor);
        break;
      case 'triadic':
        generatedColors = generateTriadic(baseColor);
        break;
      case 'monochromatic':
        generatedColors = generateMonochromatic(baseColor);
        break;
      default:
        generatedColors = Array(5).fill().map(() => randomColor());
    }

    // 잠긴 색상 유지
    for (let i = 0; i < 5; i++) {
      if (lockedColors.has(i) && currentPalette[i]) {
        newPalette.push(currentPalette[i]);
      } else {
        newPalette.push(generatedColors[i]);
      }
    }
  }

  currentPalette = newPalette;
  displayPalette();
}

// 팔레트 화면에 표시
function displayPalette() {
  elements.palette.innerHTML = '';

  currentPalette.forEach((color, index) => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // 색상 카드 생성
    const card = document.createElement('div');
    card.className = 'color-card';
    card.innerHTML = `
      <div class="color-preview" style="background: ${color};">
        <button class="lock-btn ${lockedColors.has(index) ? 'locked' : ''}" data-index="${index}">
          ${lockedColors.has(index) ? '🔒' : '🔓'}
        </button>
      </div>
      <div class="color-info">
        <div class="color-code" data-value="${color}">
          <span class="color-label">HEX</span>
          <span class="color-value">${color.toUpperCase()}</span>
        </div>
        <div class="color-code" data-value="rgb(${rgb.r}, ${rgb.g}, ${rgb.b})">
          <span class="color-label">RGB</span>
          <span class="color-value">${rgb.r}, ${rgb.g}, ${rgb.b}</span>
        </div>
        <div class="color-code" data-value="hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)">
          <span class="color-label">HSL</span>
          <span class="color-value">${hsl.h}°, ${hsl.s}%, ${hsl.l}%</span>
        </div>
      </div>
    `;

    elements.palette.appendChild(card);
  });

  // 이벤트 리스너 추가
  addColorCardListeners();
}

// 색상 카드 이벤트 리스너
function addColorCardListeners() {
  // 잠금 버튼
  document.querySelectorAll('.lock-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const index = parseInt(this.dataset.index);
      toggleLock(index);
    });
  });

  // 색상 코드 복사
  document.querySelectorAll('.color-code').forEach(code => {
    code.addEventListener('click', function() {
      copyToClipboard(this.dataset.value);
    });
  });

  // 색상 프리뷰 클릭 시 HEX 복사
  document.querySelectorAll('.color-preview').forEach((preview, index) => {
    preview.addEventListener('click', function(e) {
      if (!e.target.classList.contains('lock-btn')) {
        copyToClipboard(currentPalette[index]);
      }
    });
  });
}

// 색상 잠금 토글
function toggleLock(index) {
  if (lockedColors.has(index)) {
    lockedColors.delete(index);
  } else {
    lockedColors.add(index);
  }
  displayPalette();
}

//!SECTION - 06. 팔레트 저장 및 불러오기

// 팔레트 저장
function savePalette() {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  // 중복 체크
  const isDuplicate = saved.some(palette =>
    JSON.stringify(palette.colors) === JSON.stringify(currentPalette)
  );

  if (isDuplicate) {
    showToast('이미 저장된 팔레트입니다! 🎨');
    return;
  }

  // 새 팔레트 추가
  saved.unshift({
    colors: currentPalette,
    timestamp: Date.now()
  });

  // 최대 20개까지만 저장
  if (saved.length > 20) {
    saved.pop();
  }

  localStorage.setItem('savedPalettes', JSON.stringify(saved));
  loadSavedPalettes();
  showToast('팔레트가 저장되었습니다! 💾');
}

// 저장된 팔레트 불러오기
function loadSavedPalettes() {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  if (saved.length === 0) {
    elements.savedPalettes.innerHTML =
      '<div class="empty-state">저장된 팔레트가 없습니다. 마음에 드는 팔레트를 저장해보세요!</div>';
    return;
  }

  elements.savedPalettes.innerHTML = '';

  saved.forEach((palette, index) => {
    const div = document.createElement('div');
    div.className = 'saved-palette';

    // 색상 표시
    const colorsDiv = document.createElement('div');
    colorsDiv.className = 'saved-colors';
    palette.colors.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'saved-color';
      colorDiv.style.background = color;
      colorsDiv.appendChild(colorDiv);
    });

    div.appendChild(colorsDiv);

    // 삭제 버튼
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-saved';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deletePalette(index);
    });
    div.appendChild(deleteBtn);

    // 날짜 표시
    const date = new Date(palette.timestamp);
    const dateDiv = document.createElement('div');
    dateDiv.style.fontSize = '0.8rem';
    dateDiv.style.color = 'var(--text-secondary)';
    dateDiv.textContent = date.toLocaleDateString('ko-KR');
    div.appendChild(dateDiv);

    // 클릭 시 팔레트 불러오기
    div.addEventListener('click', () => loadSavedPalettes(palette.colors));

    elements.savedPalettes.appendChild(div);
  });
}

// 팔레트 불러오기
function loadPalette(colors) {
  currentPalette = colors;
  lockedColors.clear();
  displayPalette();
  showToast('팔레트를 불러왔습니다! 🎨');
}

// 팔레트 삭제
function deletePalette(index) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  saved.splice(index, 1);
  localStorage.setItem('savedPalettes', JSON.stringify(saved));
  loadSavedPalettes();
  showToast('팔레트가 삭제되었습니다.');
}

//!SECTION - 유틸리티 함수들

// 클립보드에 복사
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`복사됨: ${text}`);
  }).catch(err => {
    // 폴백: textarea 사용
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(`복사됨: ${text}`);
  });
}

// 토스트 메시지 표시
function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add('show');

  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 2000);
}

// 모드 변경
function setMode(mode) {
  currentMode = mode;

  // 활성 버튼 스타일 업데이트
  elements.modeBtns.forEach(btn => {
    if (btn.dataset.mode === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  generatePalette();
}

//!SECTION - 08. 이벤트 리스너 설정

// DOM 로드 완료 시
document.addEventListener('DOMContentLoaded', () => {
  // 초기 팔레트 생성
  generatePalette();
  loadSavedPalettes();

  // 버튼 이벤트
  elements.generateBtn.addEventListener('click', generatePalette);
  elements.saveBtn.addEventListener('click', savePalette);

  // 모드 선택 버튼
  elements.modeBtns.forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  // 키보드 단축키
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      generatePalette();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      savePalette();
    }
  });
});

//!SECTION - 팔레트 내보내기 기능

// 내보내기 형식별 생성 함수들
const exportFormats = {
  // JSON 형식
  json: function(palette) {
    const data = {
      name: "Color Palette",
      colors: palette.map(hex => {
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return {
          hex: hex,
          rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        };
      }),
      created: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  // CSS 변수 형식
  css: function(palette) {
    let css = ':root {\n';
    css += '  /* Color Palette Studio */\n';
    palette.forEach((color, i) => {
      const rgb = hexToRgb(color);
      css += `  --color-${i + 1}: ${color};\n`;
      css += `  --color-${i + 1}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n`;
    });
    css += '}\n\n';
    css += '/* 사용 예시 */\n';
    css += '.element {\n';
    css += '  background-color: var(--color-1);\n';
    css += '  color: var(--color-2);\n';
    css += '}';
    return css;
  },

  // SCSS 변수 형식
  scss: function(palette) {
    let scss = '// Color Palette Studio\n';
    palette.forEach((color, i) => {
      scss += `$color-${i + 1}: ${color};\n`;
    });
    scss += '\n// 색상 맵\n';
    scss += '$colors: (\n';
    palette.forEach((color, i) => {
      scss += `  "color-${i + 1}": ${color}${i < palette.length - 1 ? ',' : ''}\n`;
    });
    scss += ');\n\n';
    scss += '// 사용 예시\n';
    scss += '// background-color: $color-1;\n';
    scss += '// color: map-get($colors, "color-2");';
    return scss;
  },

  // Tailwind Config 형식
  tailwind: function(palette) {
    let config = '// tailwind.config.js\n';
    config += 'module.exports = {\n';
    config += '  theme: {\n';
    config += '    extend: {\n';
    config += '      colors: {\n';
    config += '        palette: {\n';
    palette.forEach((color, i) => {
      config += `          ${(i + 1) * 100}: "${color}"${i < palette.length - 1 ? ',' : ''}\n`;
    });
    config += '        }\n';
    config += '      }\n';
    config += '    }\n';
    config += '  }\n';
    config += '};\n\n';
    config += '// 사용: bg-palette-100, text-palette-200, etc.';
    return config;
  },

  // JavaScript 배열 형식
  javascript: function(palette) {
    let js = '// Color Palette\n';
    js += `const colors = ${JSON.stringify(palette, null, 2)};\n\n`;
    js += '// RGB 값들\n';
    js += 'const rgbColors = [\n';
    palette.forEach((hex, i) => {
      const rgb = hexToRgb(hex);
      js += `  { r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b} }${i < palette.length - 1 ? ',' : ''}\n`;
    });
    js += '];\n\n';
    js += '// 사용 예시\n';
    js += '// element.style.backgroundColor = colors[0];';
    return js;
  }
};

// 파일 다운로드 함수
function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 내보내기 실행 함수
function exportPalette(format) {
  const timestamp = new Date().toISOString().slice(0, 10);
  const fileExtensions = {
    json: 'json',
    css: 'css',
    scss: 'scss',
    tailwind: 'js',
    javascript: 'js'
  };
  
  const content = exportFormats[format](currentPalette);
  const filename = `color-palette-${timestamp}.${fileExtensions[format]}`;
  
  downloadFile(content, filename);
  showToast(`팔레트가 ${format.toUpperCase()} 형식으로 다운로드되었습니다! 📁`);
}

// 내보내기 모달 생성 함수
function createExportModal() {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('exportModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'exportModal';
  modal.className = 'export-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <h3>팔레트 내보내기</h3>
      <p>원하는 형식을 선택하세요:</p>
      <div class="export-options">
        <button class="export-btn" data-format="json">
          <span class="format-icon">{ }</span>
          <span class="format-name">JSON</span>
          <span class="format-desc">데이터 교환용</span>
        </button>
        <button class="export-btn" data-format="css">
          <span class="format-icon">:root</span>
          <span class="format-name">CSS</span>
          <span class="format-desc">웹 프로젝트용</span>
        </button>
        <button class="export-btn" data-format="scss">
          <span class="format-icon">$</span>
          <span class="format-name">SCSS</span>
          <span class="format-desc">Sass 프로젝트용</span>
        </button>
        <button class="export-btn" data-format="tailwind">
          <span class="format-icon">tw</span>
          <span class="format-name">Tailwind</span>
          <span class="format-desc">Tailwind CSS용</span>
        </button>
        <button class="export-btn" data-format="javascript">
          <span class="format-icon">JS</span>
          <span class="format-name">JavaScript</span>
          <span class="format-desc">JS 프로젝트용</span>
        </button>
      </div>
      <button class="modal-close">닫기</button>
    </div>
  `;

  document.body.appendChild(modal);

  // 이벤트 리스너 추가
  modal.querySelector('.modal-backdrop').addEventListener('click', () => {
    modal.remove();
  });

  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.remove();
  });

  modal.querySelectorAll('.export-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      exportPalette(this.dataset.format);
      modal.remove();
    });
  });

  // 모달 표시 애니메이션
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

//!SECTION - 공유 링크 기능

// 공유 버튼 클릭 함수
function sharePalette() {
  const baseUrl = window.location.origin + window.location.pathname;
  const colors = currentPalette.join(',').replace(/#/g, '');
  const shareUrl = `${baseUrl}?colors=${colors}`;
  
  // 클립보드에 복사
  navigator.clipboard.writeText(shareUrl).then(() => {
    showToast('팔레트 링크가 복사되었습니다! 🔗');
  }).catch(() => {
    // 폴백: 프롬프트로 표시
    prompt('팔레트 공유 링크:', shareUrl);
  });
}

// URL에서 팔레트 불러오기 (개선된 버전)
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const colors = params.get('colors');
  
  if (colors) {
    // 쉼표로 구분하고 # 추가
    const colorArray = colors.split(',').map(c => {
      c = c.trim();
      return c.startsWith('#') ? c : '#' + c;
    });
    
    // 유효성 검증
    const validColors = colorArray.filter(c => /^#[0-9A-Fa-f]{6}$/.test(c));
    
    if (validColors.length === 5) {
      currentPalette = validColors;
      displayPalette();
      showToast('공유된 팔레트를 불러왔습니다! 🎨');
      
      // URL 파라미터 제거 (깔끔한 URL 유지)
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

// 페이지 로드 시 URL 확인
document.addEventListener('DOMContentLoaded', () => {
  loadFromURL();
});

//!SECTION - Eye Dropper API

// Eye Dropper API 지원 여부 확인
const isEyeDropperSupported = 'EyeDropper' in window;

// 색상 추출 함수
async function pickColor() {
  if (!isEyeDropperSupported) {
    showToast('이 브라우저는 색상 추출을 지원하지 않습니다 😢');
    return;
  }

  try {
    // EyeDropper 인스턴스 생성
    const eyeDropper = new EyeDropper();
    
    // 색상 선택 (사용자가 화면을 클릭할 때까지 대기)
    const result = await eyeDropper.open();
    
    // 선택된 색상 (sRGBHex 형식으로 반환됨)
    const selectedColor = result.sRGBHex;
    
    // 색상 선택 모달 표시
    showColorPickerModal(selectedColor);
    
  } catch (err) {
    // 사용자가 취소했거나 에러 발생
    if (err.name !== 'AbortError') {
      console.error('색상 추출 에러:', err);
      showToast('색상 추출에 실패했습니다');
    }
  }
}

// 색상 선택 후 처리 모달
function showColorPickerModal(color) {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('colorPickerModal');
  if (existingModal) {
    existingModal.remove();
  }

  // 모달 HTML
  const modalHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content color-picker-modal">
      <h3>색상을 추출했습니다!</h3>
      <div class="picked-color-preview" style="background: ${color};">
        <span class="picked-color-value">${color}</span>
      </div>
      <p>이 색상으로 무엇을 하시겠습니까?</p>
      <div class="picker-options">
        <button class="picker-btn" data-action="new">
          <span>🎨</span>
          <span>이 색상으로 새 팔레트 생성</span>
        </button>
        <button class="picker-btn" data-action="replace">
          <span>🔄</span>
          <span>현재 팔레트에서 색상 교체</span>
        </button>
        <button class="picker-btn" data-action="copy">
          <span>📋</span>
          <span>색상 코드만 복사</span>
        </button>
      </div>
      <button class="modal-close">닫기</button>
    </div>
  `;

  // 모달 엘리먼트 생성
  const modalElement = document.createElement('div');
  modalElement.id = 'colorPickerModal';
  modalElement.className = 'export-modal';
  modalElement.innerHTML = modalHTML;

  // DOM에 추가
  document.body.appendChild(modalElement);

  // 이벤트 리스너들
  const backdrop = modalElement.querySelector('.modal-backdrop');
  backdrop.addEventListener('click', function() {
    modalElement.remove();
  });

  const closeBtn = modalElement.querySelector('.modal-close');
  closeBtn.addEventListener('click', function() {
    modalElement.remove();
  });

  // 각 옵션 버튼들
  const pickerBtns = modalElement.querySelectorAll('.picker-btn');
  pickerBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      handlePickedColor(color, action);
      modalElement.remove();
    });
  });

  // 모달 표시 애니메이션
  requestAnimationFrame(function() {
    modalElement.classList.add('show');
  });
}

// 추출한 색상 처리
function handlePickedColor(color, action) {
  switch(action) {
    case 'new':
      // 이 색상을 기반으로 새 팔레트 생성
      currentPalette[0] = color;
      lockedColors.clear();
      lockedColors.add(0);  // 첫 번째 색상 잠금
      
      // 현재 모드에 따라 팔레트 생성
      if (currentMode === 'random') {
        for (let i = 1; i < 5; i++) {
          currentPalette[i] = randomColor();
        }
      } else {
        let generatedColors;
        switch(currentMode) {
          case 'complementary':
            generatedColors = generateComplementary(color);
            break;
          case 'analogous':
            generatedColors = generateAnalogous(color);
            break;
          case 'triadic':
            generatedColors = generateTriadic(color);
            break;
          case 'monochromatic':
            generatedColors = generateMonochromatic(color);
            break;
        }
        for (let i = 1; i < 5; i++) {
          currentPalette[i] = generatedColors[i];
        }
      }
      
      displayPalette();
      showToast('추출한 색상으로 새 팔레트를 생성했습니다! 🎨');
      break;
      
    case 'replace':
      // 색상 교체 모드
      showReplaceColorModal(color);
      break;
      
    case 'copy':
      // 색상 코드 복사
      copyToClipboard(color);
      break;
  }
}

// 색상 교체 모달
function showReplaceColorModal(newColor) {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('replaceModal');
  if (existingModal) {
    existingModal.remove();
  }

  // 현재 팔레트 색상들을 버튼으로 표시
  let colorButtons = '';
  currentPalette.forEach((color, index) => {
    colorButtons += `
      <button class="replace-color-btn" data-index="${index}" 
              style="background: ${color};">
        <span class="replace-index">${index + 1}</span>
      </button>
    `;
  });

  const modalHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <h3>교체할 색상을 선택하세요</h3>
      <p>새 색상: <span style="color: ${newColor}; font-weight: bold;">${newColor}</span></p>
      <div class="replace-colors">
        ${colorButtons}
      </div>
      <button class="modal-close">취소</button>
    </div>
  `;

  const modalElement = document.createElement('div');
  modalElement.id = 'replaceModal';
  modalElement.className = 'export-modal';
  modalElement.innerHTML = modalHTML;

  document.body.appendChild(modalElement);

  // 이벤트 리스너
  modalElement.querySelector('.modal-backdrop').addEventListener('click', function() {
    modalElement.remove();
  });

  modalElement.querySelector('.modal-close').addEventListener('click', function() {
    modalElement.remove();
  });

  // 색상 버튼 클릭
  modalElement.querySelectorAll('.replace-color-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      currentPalette[index] = newColor;
      displayPalette();
      modalElement.remove();
      showToast(`${index + 1}번 색상이 교체되었습니다! 🔄`);
    });
  });

  // 애니메이션
  requestAnimationFrame(function() {
    modalElement.classList.add('show');
  });
}

// Eye Dropper 버튼 표시/숨김 처리
function initializeEyeDropper() {
  const eyeDropperBtn = document.getElementById('eyeDropperBtn');
  if (eyeDropperBtn) {
    if (isEyeDropperSupported) {
      eyeDropperBtn.style.display = 'inline-flex';
      eyeDropperBtn.addEventListener('click', pickColor);
    } else {
      eyeDropperBtn.style.display = 'none';
    }
  }
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  initializeEyeDropper();
});