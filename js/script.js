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