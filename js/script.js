//!SECTION - 01. 전역 변수 선언

let currentPalette = [];        // 현재 표시 중인 팔레트
let lockedColors = new Set();   // 잠긴 색상들의 인덱스
let currentMode = 'random';     // 현재 색상 조화 모드
let currentTheme = null;        // 현재 선택된 테마
let currentFilter = 'all';      // 현재 필터 (all, 태그명)
let searchQuery = '';           // 검색어

// 인기 태그 프리셋
const popularTags = [
  '웹사이트', '앱', '브랜딩', '로고', '포스터',
  '밝음', '어두움', '모던', '빈티지', '미니멀',
  '여름', '겨울', '가을', '봄',
  '비즈니스', '크리에이티브', '자연', '도시'
];

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

// 테마 정의
const colorThemes = {
  pastel: {
    name: '파스텔',
    icon: '🌸',
    description: '부드럽고 은은한 색감',
    settings: {
      saturation: { min: 20, max: 50 },
      lightness: { min: 50, max: 70 },
      hueRanges: null
    }
  },
  neon: {
    name: '네온',
    icon: '⚡',
    description: '강렬하고 눈부신 색감',
    settings: {
      saturation: { min: 80, max: 100 },
      lightness: { min: 50, max: 70 },
      hueRanges: null
    }
  },
  earth: {
    name: '자연',
    icon: '🌿',
    description: '자연스러운 흙과 나무 색',
    settings: {
      saturation: { min: 25, max: 60 },
      lightness: { min: 30, max: 70 },
      hueRanges: [
        { min: 0, max: 60 },
        { min: 80, max: 160 }
      ]
    }
  },
  ocean: {
    name: '바다',
    icon: '🌊',
    description: '시원한 바다와 하늘 색',
    settings: {
      saturation: { min: 40, max: 80 },
      lightness: { min: 35, max: 75 },
      hueRanges: [
        {min: 170, max: 240 }
      ]
    }
  },
  space: {
    name: '우주',
    icon: '🌌',
    description: '신비로운 우주 색감',
    settings: {
      saturation: { min: 50, max: 90 },
      lightness: { min: 15, max: 50 },
      hueRanges: [
        { min: 230, max: 290 }
      ]
    }
  },
  sunset: {
    name: '석양',
    icon: '🌅',
    description: '따뜻한 노을 색감',
    settings: {
      saturation: { min: 60, max: 95 },
      lightness: { min: 45, max: 75 },
      hueRanges: [
        { min: 0, max: 50 },
        { min: 330, max: 360 }
      ]
    }
  },
  forest: {
    name: '숲',
    icon: '🌲',
    description: '깊은 숲의 초록빛',
    settings: {
      saturation: { min: 30, max: 70 },
      lightness: { min: 25, max: 60 },
      hueRanges: [
        { min: 80, max: 160 }
      ]
    }
  },
  candy: {
    name: '캔디',
    icon: '🍭',
    description: '달콤한 사탕 색감',
    settings: {
      saturation: { min: 70, max: 100 },
      lightness: { min: 60, max: 85 },
      hueRanges: null
    }
  }
};

// 테마에 맞는 HSL 값 생성
function generateThemeColor(theme) {
  const settings = colorThemes[theme].settings;

  // 색조(Hue) 결정
  let hue;
  if (settings.hueRanges) {
    // 특정 범위 중 랜덤 선택
    const range = settings.hueRanges[Math.floor(Math.random() * settings.hueRanges.length)];
    hue = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  } else {
    // 전체 범위에서 랜덤
    hue = Math.floor(Math.random() * 360);
  }

  // 채도(Saturation) 결정
  const saturation = Math.floor(
    Math.random() * (settings.saturation.max - settings.saturation.min + 1)
  ) + settings.saturation.min;

  // 명도(lightness) 결정
  const lightness = Math.floor(
    Math.random() * (settings.lightness.max - settings.lightness.min + 1)
  ) + settings.lightness.min;

  return hslToHex(hue, saturation, lightness);
}

// 테마 팔레트 생성
function generateThemePalette(theme) {
  const newPalette = [];

  for (let i = 0; i < 5; i++) {
    if (lockedColors.has(i) && currentPalette[i]) {
      // 잠긴 색상 유지
      newPalette.push(currentPalette[i]);
    } else {
      // 테마에 맞는 색상 생성
      newPalette.push(generateThemeColor(theme));
    }
  }

  return newPalette;
}

// 테마 설정
function setTheme(theme) {
  if (theme && colorThemes[theme]) {
    currentTheme = theme;
    currentMode = 'random';  // 랜덤 모드로 설정
    
    // 모드 버튼 업데이트
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === 'random');
    });
    
    // 테마 버튼 업데이트
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    
    // 팔레트 생성
    currentPalette = generateThemePalette(theme);
    displayPalette();
    addToHistory(currentPalette);
    
    showToast(`${colorThemes[theme].icon} ${colorThemes[theme].name} 테마 팔레트 생성!`);
  } else {
    // 테마 해제
    currentTheme = null;
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }
}

//!SECTION - 05. 팔레트 생성 및 표시

// 새 팔레트 생성
function generatePalette() {
  const newPalette = [];

  if (currentTheme && currentMode === 'random') {
    currentPalette = generateThemePalette(currentTheme);
    displayPalette();
    addToHistory(currentPalette);
    return;
  }

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
  addToHistory(currentPalette);
}

// 팔레트 화면에 표시
function displayPalette() {
  elements.palette.innerHTML = '';

  currentPalette.forEach((color, index) => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const temperature = analyzeColorTemperature(color);

    // 색상 카드 생성
    const card = document.createElement('div');
    card.className = 'color-card';
    card.innerHTML = `
      <div class="color-preview" style="background: ${color};">
        <button class="lock-btn ${lockedColors.has(index) ? 'locked' : ''}" data-index="${index}">
          ${lockedColors.has(index) ? '🔒' : '🔓'}
        </button>

        <div class="color-temperature" title="${temperature.label}">
          <span class="temp-icon">${temperature.icon}</span>
        </div>
      </div>
      <div class="color-info">
        <div class="color-temp-info">
          <span class="temp-badge" style="background: ${temperature.color}20; color: ${temperature.color};">
            ${temperature.icon} ${temperature.label}
          </span>
        </div>

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

  updateScoreBadge();
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

// 팔레트 저장 모달 생성
function showSavePaletteModal() {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('savePaletteModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content save-palette-modal">
      <h3>💾 팔레트 저장</h3>
      <p>팔레트에 이름과 태그를 추가하세요</p>

      <!-- 팔레트 이름 입력 -->
      <div class="input-group">
        <label for="paletteName">팔레트 이름 (선택사항)</label>
        <input
          type="text"
          id="paletteName"
          placeholder="예: 여름 바다 테마"
          maxlength="50"
          class="palette-name-input"
        >
      </div>

      <!-- 태그 입력 -->
      <div class="input-group">
        <label for="paletteTagInput">태그 추가 (선택사항)</label>
        <div class="tag-input-wrapper">
          <input
            type="text"
            id="paletteTagInput"
            placeholder="태그 입력 후 Enter"
            class="tag-input"
          >
          <button class="add-tag-btn" onclick="addTagFromInput()">+</button>
        </div>
        <div class="selected-tags" id="selectedTags"></div>
      </div>

      <!-- 인기 태그 -->
      <div class="input-group">
        <label>인기 태그</label>
        <div class="popular-tags">
          ${popularTags.map(tag => `
            <button class="popular-tag-btn" onclick="addPopularTag('${tag}')">
              ${tag}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- 버튼 -->
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="confirmSavePalette()">
          저장
        </button>
        <button class="modal-close" onclick="closeSavePaletteModal()">
          취소
        </button>
      </div>
    </div>
  `;

  const modalElement = document.createElement('div');
  modalElement.id = 'savePaletteModal';
  modalElement.className = 'export-modal';
  modalElement.innerHTML = modalHTML;

  document.body.appendChild(modalElement);

  // 태그 입력 엔터키 이벤트
  const tagInput = document.getElementById('paletteTagInput');
  tagInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTagFromInput();
    }
  });

  // 모달 표시 애니메이션
  setTimeout(() => {
    modalElement.classList.add('show');
  }, 10);
}

// 선택된 태그 배열
let selectedTags = [];

// 입력란에서 태그 추가
function addTagFromInput() {
  const input = document.getElementById('paletteTagInput');
  const tag = input.value.trim();

  if (tag && !selectedTags.includes(tag)) {
    selectedTags.push(tag);
    updateSelectedTagsDisplay();
    input.value = '';
  }
}

// 인기 태그 추가
function addPopularTag(tag) {
  if (!selectedTags.includes(tag)) {
    selectedTags.push(tag);
    updateSelectedTagsDisplay();
  }
}

// 선택된 태그 표시 업데이트
function updateSelectedTagsDisplay() {
  const container = document.getElementById('selectedTags');
  if (!container) return;

  if (selectedTags.length === 0) {
    container.innerHTML = '<span class="no-tags">선택된 태그가 없습니다</span>';
    return;
  }

  container.innerHTML = selectedTags.map(tag => `
    <span class="selected-tag">
      ${tag}
      <button class="remove-tag-btn" onclick="removeSelectedTag('${tag}')">×</button>
    </span>
  `).join('');
}

// 선택된 태그 제거
function removeSelectedTag(tag) {
  selectedTags = selectedTags.filter(t => t !== tag);
  updateSelectedTagsDisplay();
}

// 저장 확인
function confirmSavePalette() {
  const nameInput = document.getElementById('paletteName');
  const name = nameInput ? nameInput.value.trim() : '';

  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  // 중복 체크
  const isDuplicate = saved.some(palette =>
    JSON.stringify(palette.colors) === JSON.stringify(currentPalette)
  );

  if (isDuplicate) {
    showToast('이미 저장된 팔레트입니다! 🎨');
    closeSavePaletteModal();
    return;
  }

  // 새 팔레트 추가
  saved.unshift({
    colors: currentPalette,
    timestamp: Date.now(),
    name: name || null,
    tags: [...selectedTags],
    mode: currentMode,
    theme: currentTheme
  });

  // 최대 20개까지만 저장
  if (saved.length > 20) {
    saved.pop();
  }

  localStorage.setItem('savedPalettes', JSON.stringify(saved));

  // 초기화
  selectedTags = [];

  loadSavedPalettes();
  closeSavePaletteModal();
  showToast('팔레트가 저장되었습니다! 💾')
}

// 저장 모달 닫기
function closeSavePaletteModal() {
  const modal = document.getElementById('savePaletteModal');
  if (modal) {
    modal.remove();
  }
  selectedTags = [];
}

// 팔레트 저장
function savePalette() {
  showSavePaletteModal();
}

// 저장된 팔레트 불러오기
function loadSavedPalettes() {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  if (saved.length === 0) {
    elements.savedPalettes.innerHTML =
      '<div class="empty-state">저장된 팔레트가 없습니다. 마음에 드는 팔레트를 저장해보세요!</div>'
    return;
  }

  // 필터링 및 검색
  let filtered = saved;

  // 태그 필터
  if (currentFilter !== 'all') {
    filtered = filtered.filter(palette =>
      palette.tags && palette.tags.includes(currentFilter)
    );
  }

  // 검색
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(palette => {
      const name = palette.name ? palette.name.toLowerCase() : '';
      const tags = palette.tags ? palette.tags.join(' ').toLowerCase() : '';
      return name.includes(query) || tags.includes(query);
    });
  }

  // 필터/검색 UI 생성
  const filterHTML = createFilterUI(saved);

  if (filtered.length === 0) {
    elements.savedPalettes.innerHTML =
      filterHTML +
      '<div class="empty-state">조건에 맞는 팔레트가 없습니다.</div>';
    return;
  }

  // 팔레트 카드 생성
  const palettesHTML = filtered.map((palette, index) => {
    const originalIndex = saved.indexOf(palette);

    return `
      <div class="saved-palette" onclick="loadPalette(${originalIndex})">
        <!-- 색상 표시 -->
        <div class="saved-colors">
          ${palette.colors.map(color => `
            <div class="saved-color" style="background: ${color};" title="${color}"></div>
          `).join('')}
        </div>

        <!-- 팔레트 정보 -->
        <div class="palette-info">
          ${palette.name ? `<div class="palette-name">${palette.name}</div>` : ''}

          ${palette.tags && palette.tags.length > 0 ? `
            <div class="palette-tags">
              ${palette.tags.slice(0, 3).map(tag => `
                <span class="palette-tag">${tag}</span>
              `).join('')}
              ${palette.tags.length > 3 ? `<span class="more-tags">+${palette.tags.length - 3}</span>` : ''}
            </div>
          ` : ''}

          <div class="palette-meta">
            <span class="palette-date">${new Date(palette.timestamp).toLocaleDateString('ko-KR')}</span>
            ${palette.mode ? `<span class="palette-mode">${getModeLabel(palette.mode)}</span>` : ''}
            ${palette.theme ? `<span class="palette-theme">${getThemeLabel(palette.theme)}</span>` : ''}
          </div>
        </div>

        <!-- 삭제 버튼 -->
        <button class="delete-saved" onclick="event.stopPropagation(); deletePalette(${originalIndex})">
          ×
        </button>
      </div>
    `;
  }).join('');

  elements.savedPalettes.innerHTML = filterHTML + palettesHTML;
}

// 필터/검색 UI 생성
function createFilterUI(allPalettes) {
  // 모든 태그 수집
  const allTags = new Set();
  allPalettes.forEach(palette => {
    if (palette.tags) {
      palette.tags.forEach(tag => allTags.add(tag));
    }
  });

  const tagButtons = Array.from(allTags)
    .sort()
    .map(tag => {
      const count = allPalettes.filter(p => p.tags && p.tags.includes(tag)).length;
      return `
        <button
          class="filter-tag ${currentFilter === tag ? 'active' : ''}"
          onclick="filterByTag('${tag}')"
        >
          ${tag} (${count})
        </button>
      `;
    }).join('');
  
  return `
    <div class="palette-filters">
      <!-- 검색 -->
      <div class="search-wrapper">
        <input
          type="text"
          class="search-input"
          placeholder="팔레트 검색..."
          value="${searchQuery}"
          oninput="searchPalettes(this.value)"
        >
        <span class="search-icon">🔍</span>
      </div>

      <!-- 태그 필터 -->
      <div class="filter-tags">
        <button
          class="filter-tag ${currentFilter === 'all' ? 'active' : ''}"
          onclick="filterByTag('all')"
        >
          전체 (${allPalettes.length})
        </button>
        ${tagButtons}
      </div>

      <!-- 정렬 옵션 -->
      <div class="sort-options">
        <select class="sort-select" onchange="sortPalettes(this.value)">
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="name">이름순</option>
        </select>
      </div>
    </div>
  `;
}

// 태그로 필터링
function filterByTag(tag) {
  currentFilter = tag;
  loadSavedPalettes();
}

// 검색
function searchPalettes(query) {
  searchQuery = query;
  loadSavedPalettes();
}

// 정렬
function sortPalettes(sortType) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  if (sortType === 'oldest') {
    saved.reverse();
  } else if (sortType === 'name') {
    saved.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB);
    });
  }

  localStorage.setItem('savedPalettes', JSON.stringify(saved));
  loadSavedPalettes();
}

// 모드 라벨 가져오기
function getModeLabel(mode) {
  const labels = {
    random: '랜덤',
    complementary: '보색',
    analogous: '유사색',
    triadic: '삼각색',
    monochromatic: '단색조'
  };
  return labels[mode] || mode;
}

// 테마 라벨 가져오기
function getThemeLabel(theme) {
  if (colorThemes[theme]) {
    return colorThemes[theme].icon + ' ' + colorThemes[theme].name;
  }
  return theme;
}

// 팔레트 불러오기
function loadPalette(index) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  if (saved[index]) {
    currentPalette = saved[index].colors;
    lockedColors.clear();
    displayPalette();
    showToast('팔레트를 불러왔습니다! 🎨');
  }
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

  // 조화 모드 선택 시 테마 해제
  if (mode !== 'random') {
    currentTheme = null;
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }

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

  // 테마 선택 버튼
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.dataset.theme;
      setTheme(theme);
    });
  });

  //키보드 단축키
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      generatePalette();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      savePalette();
    }

    // Ctrl+Z (또는 Cmd+Z on Mac) - 실행 취소
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    }

    // Ctrl+Y 또는 Ctrl+Shift+Z (또는 Cmd+Shift+Z on Mac) - 다시 실행
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault();
      redo();
    }

    // Ctrl+H - 히스토리 보기
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      showHistoryModal();
    }
  });
});

//!SECTION - 팔레트 내보내기 기능

//NOTE - 내보내기 형식별 생성 함수들
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

//NOTE - 파일 다운로드 함수
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

//NOTE - 내보내기 실행 함수
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

//NOTE - 내보내기 모달 생성 함수
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

//NOTE - Eye Dropper API 지원 여부 확인
const isEyeDropperSupported = 'EyeDropper' in window;

//NOTE - 색상 추출 함수
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

//NOTE - 색상 선택 후 처리 모달
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

//NOTE - 추출한 색상 처리
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

//NOTE - 색상 교체 모달
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

//NOTE - Eye Dropper 버튼 표시/숨김 처리
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

//NOTE - DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  initializeEyeDropper();
});

//!SECTION - 그라디언트 생성기

//NOTE - 그라디언트 설정 상태
let gradientSettings = {
  type: 'linear',         // linear, radial, conic
  angle: 90,              // 각도 (linear)
  shape: 'circle',        // circle, ellipse (radial)
  position: 'center',     // 위치 (radial, conic)
  colors: [],             // 사용할 색상들
  colorStops: []          // 색상 정지점들
};

//NOTE - 그라디언트 모달 생성
function createGradientModal() {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('gradientModal');
  if (existingModal) {
    existingModal.remove();
  }

  // 초기 그라디언트 설정
  gradientSettings.colors = [...currentPalette];
  gradientSettings.colorStops = currentPalette.map((_, index) => {
    return Math.round((index / (currentPalette.length - 1)) * 100);
  });

  const modalHTML = `
    <div class="modal-backdrop"></div>
    <div class="gradient-modal-content">
      <h3>🌈 그라디언트 생성기</h3>

      <!-- 그라디언트 프리뷰 -->
      <div class="gradient-preview" id="gradientPreview"></div>

      <!-- 컨트롤 패널 -->
      <div class="gradient-controls">
      
        <!-- 그라디언트 타입 선택 -->
        <div class="control-group">
          <label>그라디언트 타입</label>
          <div class="gradient-type-selector">
            <button class="type-btn active" data-type="linear">
              <span>↗</span> Linear
            </button>
            <button class="type-btn" data-type="radial">
              <span>◉</span> Radial
            </button>
            <button class="type-btn" data-type="conic">
              <span>🎯</span> Conic
            </button>
          </div>
        </div>

        <!-- Linear 그라디언트 옵션 -->
        <div class="control-group" id="linearOptions">
          <label>방향/각도</label>
          <div class="angle-control">
            <input type="range" id="angleSlider" min="0" max="360" value="90" class="angle-slider">
            <span class="angle-value">90°</span>
          </div>
          <div class="angle-presets">
            <button class="preset-btn" data-angle="0">↑</button>
            <button class="preset-btn" data-angle="45">↗</button>
            <button class="preset-btn" data-angle="90">→</button>
            <button class="preset-btn" data-angle="135">↘</button>
            <button class="preset-btn" data-angle="180">↓</button>
            <button class="preset-btn" data-angle="225">↙</button>
            <button class="preset-btn" data-angle="270">←</button>
            <button class="preset-btn" data-angle="315">↖</button>
          </div>
        </div>

        <!-- Radial 그라디언트 옵션 -->
        <div class="control-group hidden" id="radialOptions">
          <label>모양</label>
          <div class="shape-selector">
            <button class="shape-btn active" data-shape="circle">원형</button>
            <button class="shape-btn" data-shape="ellipse">타원형</button>
          </div>
        </div>

        <!-- 색상 선택 -->
        <div class="control-group">
          <label>사용할 색상 (체크해서 선택)</label>
          <div class="color-selector">
            ${currentPalette.map((color, index) => `
              <label class="color-checkbox">
                <input type="checkbox" checked data-index="${index}">
                <span class="color-box" style="background: ${color};"></span>
                <span class="color-hex">${color}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- 프리셋 스타일 -->
        <div class="control-group">
          <label>프리셋 스타일</label>
          <div class="preset-styles">
            <button class="style-preset-btn" data-preset="sunset">🌅 석양</button>
            <button class="style-preset-btn" data-preset="ocean">🌊 바다</button>
            <button class="style-preset-btn" data-preset="aurora">🌌 오로라</button>
            <button class="style-preset-btn" data-preset="fire">🔥 불꽃</button>
          </div>
        </div>

        <!-- CSS 코드 출력 -->
        <div class="control-group">
          <label>CSS 코드</label>
          <div class="css-output">
            <code id="gradientCode"></code>
            <button class="copy-css-btn" onclick="copyGradientCSS()">📋 복사</button>
          </div>
        </div>

      </div>

      <!-- 액션 버튼들 -->
      <div class="gradient-actions">
        <button class="btn btn-primary" onclick="applyGradientToPalette()">
          팔레트에 적용
        </button>
        <button class="btn btn-secondary" onclick="downloadGradient()">
          이미지로 저장
        </button>
        <button class="modal-close">닫기</button>
      </div>
    </div>
  `;

  // 모달 엘리먼트 생성
  const modalElement = document.createElement('div');
  modalElement.id = 'gradientModal';
  modalElement.className = 'gradient-modal';
  modalElement.innerHTML = modalHTML;

  // DOM에 추가
  document.body.appendChild(modalElement);

  // 초기 그라디언트 표시
  updateGradientPreiew();

  // 이벤트 리스너 설정
  setupGradientEventListeners(modalElement);

  // 모달 표시 애니메이션
  requestAnimationFrame(function() {
    modalElement.classList.add('show');
  });
}

//NOTE - 그라디언트 이벤트 리스너 설정
function setupGradientEventListeners(modal) {
  // 배경 클릭 시 닫기
  modal.querySelector('.modal-backdrop').addEventListener('click', function() {
    modal.remove();
  });

  // 닫기 버튼
  modal.querySelector('.modal-close').addEventListener('click', function() {
    modal.remove();
  });

  // 그라디언트 타입 선택
  modal.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      modal.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      gradientSettings.type = this.dataset.type;

      // 옵션 표시/숨김
      const linearOpts = modal.querySelector('#linearOptions');
      const radialOpts = modal.querySelector('#radialOptions');

      if (gradientSettings.type === 'linear') {
        linearOpts.classList.remove('hidden');
        radialOpts.classList.add('hidden');
      } else if (gradientSettings.type === 'radial') {
        linearOpts.classList.add('hidden');
        radialOpts.classList.remove('hidden');
      } else {
        linearOpts.classList.add('hidden');
        radialOpts.classList.add('hidden');
      }

      updateGradientPreiew();
    });
  });

  // 각도 슬라이더
  const angleSlider = modal.querySelector('#angleSlider');
  const angleValue = modal.querySelector('.angle-value');
  angleSlider.addEventListener('input', function() {
    gradientSettings.angle = this.value;
    angleValue.textContent = this.value + '°';
    updateGradientPreiew();
  });

  // 각도 프리셋 버튼들
  modal.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const angle = this.dataset.angle;
      gradientSettings.angle = angle;
      angleSlider.value = angle;
      angleValue.textContent = angle + '°';
      updateGradientPreiew();
    });
  });

  // 모양 선택 (Radial)
  modal.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      modal.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      gradientSettings.shape = this.dataset.shape;
      updateGradientPreiew();
    });
  });

  // 색상 체크박스
  modal.querySelectorAll('.color-checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const checkedColors = [];
      modal.querySelectorAll('.color-checkbox input:checked').forEach(cb => {
        const index = parseInt(cb.dataset.index);
        checkedColors.push(currentPalette[index]);
      });

      if (checkedColors.length < 2) {
        this.checked = true;
        showToast('최소 2개의 색상이 필요합니다!');
        return;
      }

      gradientSettings.colors = checkedColors;
      updateGradientPreiew();
    });
  });

  // 프리셋 스타일
  modal.querySelectorAll('.style-preset-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      applyGradientPreset(this.dataset.preset);
    });
  });
}

//NOTE - 그라디언트 프리뷰 업데이트
function updateGradientPreiew() {
  const preview = document.getElementById('gradientPreview');
  const codeOutput = document.getElementById('gradientCode');

  if (!preview || !codeOutput) return;

  const gradient = generateGradientCSS();
  preview.style.background = gradient;
  codeOutput.textContent = `background: ${gradient};`;
}

//NOTE - CSS 그라디언트 생성
function generateGradientCSS() {
  const colors = gradientSettings.colors.join(', ');

  switch(gradientSettings.type) {
    case 'linear':
      return `linear-gradient(${gradientSettings.angle}deg, ${colors})`;
    
    case 'radial':
      return `radial-gradient(${gradientSettings.shape} at ${gradientSettings.position}, ${colors})`;

    case 'conic':
      return `conic-gradient(from ${gradientSettings.angle}deg at ${gradientSettings.position}, ${colors})`;

    default:
      return `linear-gradient(90deg, ${colors})`;
  }
}

//NOTE - 그라디언트 프리셋 적용
function applyGradientPreset(preset) {
  switch(preset) {
    case 'sunset':
      gradientSettings.type = 'linear';
      gradientSettings.angle = 180;
      // 석양 색상으로 변경
      if (currentPalette.length >= 3) {
        gradientSettings.colors = [
          '#ff6b6b',
          '#feca57',
          '#48dbfb',
          '#5f27cd'
        ];
      }
      break;

    case 'ocean':
      gradientSettings.type = 'linear';
      gradientSettings.angle = 135;
      if (currentPalette.length >= 3) {
        gradientSettings.colors = [
          '#0c2461',
          '#4834d4',
          '#3498db',
          '#00d2d3'
        ];
      }
      break;

    case 'aurora':
      gradientSettings.type = 'radial';
      gradientSettings.shape = 'ellipse';
      break;

    case 'fire':
      gradientSettings.type = 'radial';
      gradientSettings.shape = 'circle';
      if (currentPalette.length >= 3) {
        gradientSettings.colors = [
          '#ff9ff3',
          '#ff6b6b',
          '#ff9f43',
          '#feca57'
        ];
      }
      break;
  }

  // UI 업데이트
  const modal = document.getElementById('gradientModal');
  if (modal) {
    // 타입 버튼 업데이트
    modal.querySelectorAll('.type-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === gradientSettings.type);
    });

    // 슬라이더 업데이트
    const angleSlider = modal.querySelector('#angleSlider');
    const angleValue = modal.querySelector('.angle-value');
    if (angleSlider) {
      angleSlider.value = gradientSettings.angle;
      angleValue.textContent = gradientSettings.angle + '°';
    }
  }

  updateGradientPreiew();
}

//NOTE - 그라디언트 CSS 복사
function copyGradientCSS() {
  const gradient = generateGradientCSS();
  const fullCSS = `background: ${gradient};`;

  copyToClipboard(fullCSS);
  showToast('그라디언트 CSS가 복사되었습니다! 🎨');
}

//NOTE - 그라디언트를 팔레트 배경에 적용 (미리보기)
function applyGradientToPalette() {
  const paletteContainer = document.getElementById('palette');
  const gradient = generateGradientCSS();

  // 토글 방식
  if (paletteContainer.style.background && paletteContainer.style.background !== 'none') {
    paletteContainer.style.background = 'none';
    showToast('그라디언트 배경이 제거되었습니다');
  } else {
    paletteContainer.style.background = gradient;
    paletteContainer.style.borderRadius = '20px';
    paletteContainer.style.padding = '2rem';
    showToast('그라디언트가 팔레트 배경에 적용되었습니다! ✨');
  }
}

//NOTE - 그라디언트 이미지로 다운로드
function downloadGradient() {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // 그라디언트 생성
  let gradient;

  if (gradientSettings.type === 'linear') {
    const angle = (gradientSettings.angle - 90) * Math.PI / 180;
    const x1 = canvas.width / 2 + Math.cos(angle) * canvas.width;
    const y1 = canvas.height / 2 + Math.sin(angle) * canvas.height;
    const x2 = canvas.width / 2 - Math.cos(angle) * canvas.width;
    const y2 = canvas.height / 2 - Math.sin(angle) * canvas.height;

    gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  } else {
    gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2
    );
  }

  // 색상 추가
  gradientSettings.colors.forEach((color, index) => {
    gradient.addColorStop(index / (gradientSettings.colors.length - 1), color);
  });

  // 그라디언트 그리기
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 다운로드
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gradient-${Date.now()}.png`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('그라디언트 이미지가 다운로드되었습니다! 🖼');
  });
}

//!SECTION - 실행 취소/다시 실행 기능

//NOTE - 히스토리 관리를 위한 전역 변수
const paletteHistory = {
  undoStack: [],        // 이전 상태들
  redoStack: [],        // 다시 실행할 상태들
  maxHistorySize: 50,  // 최대 히스토리 크기
  isRestoring: false  // 복원 중 플래그
};

//NOTE - 현재 팔레트 상태를 히스토리에 추가
function addToHistory(palette) {
  // 복원 중일 때는 히스토리에 추가하지 않음
  if (paletteHistory.isRestoring) {
    return;
  }

  // 현재 상태를 복사해서 저장
  const state = {
    palette: [...palette],
    lockedColors: new Set(lockedColors),
    mode: currentMode,
    timestamp: Date.now()
  };

  // Undo 스택에 추가
  paletteHistory.undoStack.push(state);

  // 최대 크기 제한
  if (paletteHistory.undoStack.length > paletteHistory.maxHistorySize) {
    paletteHistory.undoStack.shift(); // 가장 오래된 항목 제거
  }

  // 새로운 상태가 추가되면 Redo 스택은 초기화
  paletteHistory.redoStack = [];

  // UI 업데이트
  updateHistoryUI();
}

//NOTE - 실행 취소 (Undo)
function undo() {
  if (paletteHistory.undoStack.length <= 1) {
    showToast('더 이상 되돌릴 수 없습니다! ↩');
    return;
  }

  // 현재 상태를 Redo 스택에 저장
  const currentState = paletteHistory.undoStack.pop();
  paletteHistory.redoStack.push(currentState);

  // 이전 상태 복원
  const previousState = paletteHistory.undoStack[paletteHistory.undoStack.length - 1];
  restoreState(previousState);

  showToast('이전 팔레트로 되돌렸습니다! ↩');
  updateHistoryUI();
}

//NOTE - 다시 실행 (Redo)
function redo() {
  if (paletteHistory.redoStack.length === 0) {
    showToast('다시 실행할 작업이 없습니다! ↪');
    return;
  }

  // Redo 스택에서 상태 가져오기
  const nextState = paletteHistory.redoStack.pop();
  paletteHistory.undoStack.push(nextState);

  // 상태 복원
  restoreState(nextState);

  showToast('다시 실행했습니다! ↪');
  updateHistoryUI();
}

//NOTE - 상태 복원
function restoreState(state) {
  paletteHistory.isRestoring = true;

  currentPalette = [...state.palette];
  lockedColors = new Set(state.lockedColors);
  currentMode = state.mode;

  // 모드 버튼 업데이트
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === currentMode);
  });

  // 팔레트 표시
  displayPalette();

  paletteHistory.isRestoring = false;
}

//NOTE - 히스토리 UI 업데이트
function updateHistoryUI() {
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');
  const historyCount = document.getElementById('historyCount');

  if (undoBtn) {
    undoBtn.disabled = paletteHistory.undoStack.length <= 1;
    undoBtn.style.opacity = paletteHistory.undoStack.length <= 1 ? '0.5' : '1';
  }

  if (redoBtn) {
    redoBtn.disabled = paletteHistory.redoStack.length === 0;
    redoBtn.style.opacity = paletteHistory.redoStack.length === 0 ? '0.5' : '1';
  }

  if (historyCount) {
    historyCount.textContent = `${paletteHistory.undoStack.length}/${paletteHistory.maxHistorySize}`;
  }
}

//NOTE - 히스토리 초기화
function clearHistory() {
  paletteHistory.undoStack = [];
  paletteHistory.redoStack = [];
  updateHistoryUI();
  showToast('히스토리가 초기화되었습니다! 🗑');
}

//NOTE - 히스토리 뷰어 모달
function showHistoryModal() {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('historyModal');
  if (existingModal) {
    existingModal.remove();
  }

  // 히스토리 항목들 생성
  let historyItems = '';
  const allHistory = [...paletteHistory.undoStack].reverse(); // 최신순으로 표시

  allHistory.forEach((state, index) => {
    const date = new Date(state.timestamp);
    const timeStr = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    historyItems += `
      <div class="history-item" data-index="${allHistory.length - 1 - index}">
        <div class="history-preview">
          ${state.palette.map(color => `
            <div class="history-color" style="background: ${color};" title="${color}"></div>
          `).join('')}
        </div>
        <div class="history-info">
          <span class="history-time">${timeStr}</span>
          <span class="history-mode">${state.mode}</span>
          ${index === 0 ? '<span class="current-badge">현재</span>' : ''}
        </div>
      </div>
    `;
  });

  const modalHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content history-modal-content">
      <h3>📜 팔레트 히스토리</h3>
      <p>클릭하여 특정 시점으로 이동할 수 있습니다.</p>

      <div class="history-stats">
        <div class="stat-item">
          <span class="stat-label">총 기록</span>
          <span class="stat-value">${paletteHistory.undoStack.length}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">되돌리기 가능</span>
          <span class="stat-value">${paletteHistory.undoStack.length - 1}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">다시 실행 가능</span>
          <span class="stat-value">${paletteHistory.redoStack.length}</span>
        </div>
      </div>

      <div class="history-list">
        ${historyItems || '<div class="empty-state">히스토리가 비어있습니다.</div>'}
      </div>

      <div class="history-actions">
        <button class="btn btn-secondary" onclick="clearHistory(); document.getElementById('historyModal').remove();">
          🗑 히스토리 초기화
        </button>
        <button class="modal-close">닫기</button>
      </div>
    </div>
  `;

  const modalElement = document.createElement('div');
  modalElement.id = 'historyModal';
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

  // 히스토리 항목 클릭
  modalElement.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      jumpToHistory(index);
      modalElement.remove();
    });
  });

  // 모달 표시 애니메이션
  requestAnimationFrame(function() {
    modalElement.classList.add('show');
  });
}

//NOTE - 특정 히스토리 시점으로 이동
function jumpToHistory(index) {
  if (index < 0 || index >= paletteHistory.undoStack.length) {
    return;
  }

  const currentIndex = paletteHistory.undoStack.length - 1;

  if (index < currentIndex) {
    // 과거로 이동 (Undo)
    const steps = currentIndex - index;
    for (let i = 0; i < steps; i++) {
      const state = paletteHistory.undoStack.pop();
      paletteHistory.redoStack.push(state);
    }
  } else if (index > currentIndex) {
    // 미래로 이동 (Redo) - 현재는 불가능
    return;
  }

  const targetState = paletteHistory.undoStack[paletteHistory.undoStack.length - 1];
  restoreState(targetState);
  updateHistoryUI();
  showToast(`히스토리 ${index + 1}번째로 이동했습니다! 🕐`);
}

//!SECTION - 색상 조합 점수 및 분석 기능

//NOTE - 색상 분석 결과 저장
let currentPaletteScore = {
  total: 0,
  contrast: 0,
  harmony: 0,
  balance: 0,
  diversity: 0,
  accessibility: 0
};

//NOTE - 색상 조합 점수 계산
function analyzePalette(palette = currentPalette) {
  const scores = {
    contrast: calculateContrastScore(palette),
    harmony: calculateHarmonyScore(palette),
    balance: calculateBalanceScore(palette),
    diversity: calculateDiversityScore(palette),
    accessibility: calculateAccessibilityScore(palette),
    colorBlindness: calculateColorBlindnessScore(palette)
  };

  // 가중 평균으로 총점 계산
  scores.total = Math.round(
    scores.contrast * 0.25 +
    scores.harmony * 0.25 +
    scores.balance * 0.2 +
    scores.diversity * 0.15 +
    scores.accessibility * 0.15 +
    scores.colorBlindness * 0.15
  );

  currentPaletteScore = scores;
  return scores;
}

//NOTE - 1. 대비 점수 계산 (색상 간 대비가 적절한지)
function calculateContrastScore(palette) {
  let totalContrast = 0;
  let pairs = 0;

  for (let i = 0; i < palette.length; i++) {
    for (let j = i + 1; j < palette.length; j++) {
      const contrast = getContrastRatio(palette[i], palette[j]);
      // 이상적인 대비는 3-7 사이
      if (contrast >= 3 && contrast <= 7) {
        totalContrast += 100;
      } else if (contrast >= 2 && contrast <= 10) {
        totalContrast += 70;
      } else if (contrast >= 1.5 && contrast <= 15) {
        totalContrast += 40;
      } else {
        totalContrast += 20;
      }
      pairs++;
    }
  }

  return Math.round(totalContrast / pairs);
}

//NOTE - 2. 조화 점수 계산 (색상환에서의 관계)
function calculateHarmonyScore(palette) {
  const hues = palette.map(color => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return hsl.h;
  });

  // 색상환에서의 각도 차이 분석
  let harmonyScore = 0;
  const idealAngles = [0, 30, 60, 90, 120, 150, 180]; // 조화로운 각도들

  for (let i = 0; i < hues.length; i++) {
    for (let j = i + 1; j < hues.length; j++) {
      let diff = Math.abs(hues[i] - hues[j]);
      if (diff > 180) diff = 360 - diff;

      // 이상적인 각도와 얼마나 가까운지 체크
      const closestIdeal = idealAngles.reduce((prev, curr) =>
        Math.abs(curr - diff) < Math.abs(prev - diff) ? curr : prev
      );

      const deviation = Math.abs(closestIdeal - diff);
      if (deviation <= 5) harmonyScore += 100;
      else if (deviation <= 10) harmonyScore += 80;
      else if (deviation <= 20) harmonyScore += 60;
      else harmonyScore += 30;
    }
  }

  return Math.round(harmonyScore / ((hues.length * (hues.length - 1)) / 2));
}

//NOTE - 3. 균형 점수 계산 (명도와 채도의 균형)
function calculateBalanceScore(palette) {
  const values = palette.map(color => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { s: hsl.s, l: hsl.l};
  });

  // 명도 분포 분석
  const lightnesses = values.map(v => v.l);
  const lightnessStd = standardDeviation(lightnesses);
  const lightnessScore = lightnessStd > 15 && lightnessStd < 35 ? 100 :
                         lightnessStd > 10 && lightnessStd < 40 ? 70 : 40;
  
  // 채도 분포 분석
  const saturations = values.map(v => v.s);
  const saturationAvg = average(saturations);
  const saturationScore = saturationAvg > 30 && saturationAvg < 70 ? 100 :
                          saturationAvg > 20 && saturationAvg < 80 ? 70 : 40;
  
  return Math.round((lightnessScore + saturationScore) / 2);
}

//NOTE - 4. 다양성 점수 계산 (색상의 다양성)
function calculateDiversityScore(palette) {
  const hslColors = palette.map(color => {
    const rgb = hexToRgb(color);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  });

  // 색조 다양성
  const hues = hslColors.map(c => c.h);
  const hueSpread = Math.max(...hues) - Math.min(...hues);

  // 채도 다양성
  const saturations = hslColors.map(c => c.s);
  const satSpread = Math.max(...saturations) - Math.min(...saturations);

  // 명도 다양성
  const lightnesses = hslColors.map(c => c.l);
  const lightSpread = Math.max(...lightnesses) - Math.min(...lightnesses);

  const hueScore = hueSpread > 12 ? 100 : hueSpread > 60 ? 70 : 40;
  const satScore = satSpread > 30 ? 100 : satSpread > 15 ? 70 : 40;
  const lightScore = lightSpread > 30 ? 100 : lightSpread > 15 ? 70 : 40;

  return Math.round((hueScore * 0.5 + satScore * 0.25 + lightScore * 0.25));
}

//NOTE - 5. 접근성 점수 계산 (WCAG 기준)
function calculateAccessibilityScore(palette) {
  let accessiblePairs = 0;
  let totalPairs = 0;

  // 흰색과 검은색 배경에 대한 대비 체크
  const backgrounds = ['#FFFFFF', '#000000'];

  palette.forEach(color => {
    backgrounds.forEach(bg => {
      const contrast = getContrastRatio(color, bg);
      // WCAG AA 기준: 일반 텍스트 4.5:1, 큰 텍스트 3:1
      if (contrast >= 4.5) accessiblePairs += 2;
      else if (contrast >= 3) accessiblePairs += 1;
      totalPairs += 2;
    });
  });

  return Math.round((accessiblePairs / totalPairs) * 100);
}

//NOTE - 6. 색맹 접근성 점수 계산
function calculateColorBlindnessScore(palette) {
  // 3가지 주요 색각 이상 타입에서의 평균 함수
  const types = ['protanopia', 'deuteranopia', 'tritanopia'];
  let totalScore = 0;

  types.forEach(type => {
    let distinctPairs = 0;
    let totalPairs = 0;

    for (let i = 0; i < palette.length; i++) {
      for (let j = i + 1; j < palette.length; j++) {
        totalPairs++;
        const difference = calculateColorBlindDifference(palette[i], palette[j], type);
        if (difference > 15) {
          distinctPairs++;
        }
      }
    }

    totalScore += (distinctPairs / totalPairs) * 100;
  });

  return Math.round(totalScore / types.length);
}

//NOTE - 대비 비율 계산 (WCAG 공식)
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

//NOTE - 상대 휘도 계산
function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

//NOTE - 유틸리티 함수들
function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function standardDeviation(arr) {
  const avg = average(arr);
  const squaredDiffs = arr.map(value => Math.pow(value - avg, 2));
  return Math.sqrt(average(squaredDiffs));
}

//NOTE - 점수에 따른 등급 계산
function getScoreGrade(score) {
  if (score >= 90) return { grade: 'S', label: '완벽함', color: '#FFD700'};
  if (score >= 80) return { grade: 'A', label: '훌륭함', color: '#00D9FF'};
  if (score >= 70) return { grade: 'B', label: '좋음', color: '#00FF88'};
  if (score >= 60) return { grade: 'C', label: '보통', color: '#FFA500'};
  return { grade: 'D', label: '개선 필요', color: '#FF6B6B'};
}

//NOTE - 개선 제안 생성
function generateSuggestions(scores) {
  const suggestions = [];

  if (scores.contrast < 60) {
    suggestions.push('💡 색상 간 대비를 더 높여보세요');
  }
  if (scores.harmony < 60) {
    suggestions.push('🎨 보색이나 유사색 모드를 사용해보세요');
  }
  if (scores.balance < 60) {
    suggestions.push('⚖ 명도와 채도를 더 균등하게 분배해보세요');
  }
  if (scores.diversity < 60) {
    suggestions.push('🌈 더 다양한 색조를 사용해보세요');
  }
  if (scores.accessibility < 60) {
    suggestions.push('♿ 텍스트 가독성을 위해 대비를 높여보세요')
  }

  if (suggestions.length === 0) {
    suggestions.push('🎉 완벽한 조합입니다!');
  }

  return suggestions;
}

//NOTE - 점수 표시 모달
function showScoreModal() {
  const scores = analyzePalette();
  const grade = getScoreGrade(scores.total);
  const suggestions = generateSuggestions(scores);

  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('scoreModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content score-modal-content">
      <h3>🎯 팔레트 분석 결과</h3>

      <!-- 총점 표시 -->
      <div class="total-score-display">
        <div class="score-circle" style="--score-color: ${grade.color};">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#333" stroke-width="10" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="${grade.color}"
                    stroke-width="10" stroke-dasharray="${scores.total * 5.65} 565"
                    transform="rotate(-90 100 100)"/>
          </svg>
          <div class="score-text">
            <span class="score-number">${scores.total}</span>
            <span class="score-grade">${grade.grade}</span>
          </div>
        </div>
        <div class="score-label">${grade.label}</div>
      </div>

      <!-- 세부 점수 -->
      <div class="score-details">
        <div class="score-item">
          <span class="score-item-label">대비</span>
          <div class="score-bar">
            <div class="score-fill" style="width: ${scores.contrast}%; background: var(--accent);"></div>
          </div>
          <span class="score-value">${scores.contrast}</span>
        </div>

        <div class="score-item>
          <span class="score-item-label">조화</span>
          <div class="score-bar">
            <div class="score-fill" style="width: ${scores.harmony}%; background: var(--accent);"></div>
          </div>
          <span class="score-value">${scores.harmony}</span>
        </div>

        <div class="score-item">
          <span class="score-item-label">균형</span>
          <div class="score-bar">
            <div class="score-fill" style="width: ${scores.balance}%; background: var(--accent);"></div>
          </div>
          <span class="score-value">${scores.balance}</span>
        </div>
        
        <div class="score-item">
          <span class="score-item-label">다양성</span>
          <div class="score-bar">
            <div class="score-fill" style="width: ${scores.diversity}%; background: var(--accent);"></div>
          </div>
          <span class="score-value">${scores.diversity}</span>
        </div>
        
        <div class="score-item">
          <span class="score-item-label">접근성</span>
          <div class="score-bar">
            <div class="score-fill" style="width: ${scores.accessibility}%; background: var(--accent);"></div>
          </div>
          <span class="score-value">${scores.accessibility}</span>
        </div>

        <div class="score-item">
          <span class="score-item-label">색맹 접근성</span>
          <div class="score-bar">
            <div class="score-fill" style="width: ${scores.colorBlindness}%; background: var(--accent);"></div>
          </div>
          <span class="score-value">${scores.colorBlindness}</span>
        </div>
      </div>

      <!-- 개선 제안 -->
      <div class="suggestions">
        <h4>개선 제안</h4>
        ${suggestions.map(s => `<p class="suggestion-item">${s}</p>`).join('')}
      </div>

      <!-- 점수 기준 설명 -->
      <details class="score-explanation">
        <summary>점수 기준 보기</summary>
        <ul>
          <li><strong>대비</strong>: 색상 간 적절한 대비 비율</li>
          <li><strong>조화</strong>: 색상환에서의 조화로운 관계</li>
          <li><strong>균형</strong>: 명도와 채도의 균등한 분포</li>
          <li><strong>다양성</strong>: 색조, 채도, 명도의 다양성</li>
          <li><strong>접근성</strong>: WCAG 가독성 기준 충족도</li>
          <li><strong>색맹 접근성</strong>: 색각 이상자의 색상 구분 가능성</li>
        </ul>
      </details>

      <button class="modal-close">닫기</button>
    </div>
  `;

  // 모달 엘리먼트 생성
  const modalElement = document.createElement('div');
  modalElement.id = 'scoreModal';
  modalElement.className = 'score-modal'; // 'export-modal' 대신 'score-modal' 사용
  modalElement.innerHTML = modalHTML;
  
  // DOM에 추가
  document.body.appendChild(modalElement);
  
  // 이벤트 리스너 설정
  const backdrop = modalElement.querySelector('.modal-backdrop');
  const closeBtn = modalElement.querySelector('.modal-close');
  
  if (backdrop) {
    backdrop.addEventListener('click', function() {
      modalElement.remove();
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modalElement.remove();
    });
  }
  
  // 모달 표시 애니메이션 (약간의 지연 후 실행)
  setTimeout(function() {
    modalElement.classList.add('show');
  }, 10);
}

//NOTE - 실시간 점수 표시 (미니 버전)
function updateScoreBadge() {
  const scores = analyzePalette();
  const grade = getScoreGrade(scores.total);

  let scoreBadge = document.getElementById('scoreBadge');
  if (!scoreBadge) {
    // 점수 배지가 없으면 생성
    scoreBadge = document.createElement('div');
    scoreBadge.id = 'scoreBadge';
    scoreBadge.className = 'score-badge';
    scoreBadge.onclick = showScoreModal;
    document.body.appendChild(scoreBadge);
  }

  scoreBadge.innerHTML = `
    <span class="badge-score">${scores.total}</span>
    <span class="badge-grade" style="color: ${grade.color};">${grade.grade}</span>
  `;

  // 애니메이션 효과
  scoreBadge.classList.add('pulse');
  setTimeout(() => scoreBadge.classList.remove('pulse'), 600);
}

//!SECTION - 색상 온도 분석 함수

//NOTE - 색상 온도 계산 (따뜻한 색 vs 차가운 색)
function getColorTemperature(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // 색조(Hue) 기준으로 온도 판단
  // 0-60 : 따뜻함
  // 300-360 : 따뜻함
  // 61-299 : 차가움

  if ((hsl.h >= 0 && hsl.h <= 60) || (hsl.h >= 300 && hsl.h <= 360)) {
    return {
      type: 'warm',
      icon: '🔥',
      label: '따뜻한 색',
      color: '#FF6B6B'
    };
  } else {
    return {
      type: 'cool',
      icon: '❄',
      label: '차가운 색',
      color: '#4ECDC4'
    };
  }
}

//NOTE - 색상이 중립인지 판단 (회색 계열)
function isNeutralColor(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // 채도가 낮으면 중립 색상
  if (hsl.s < 15) {
    return {
      type: 'neutral',
      icon: '⚪',
      label: '중립 색상',
      color: '#95A5A6'
    };
  }

  return null;
}

//NOTE - 통합 온도 분석
function analyzeColorTemperature(hex) {
  // 먼저 중립 색상인지 체크
  const neutral = isNeutralColor(hex);
  if (neutral) return neutral;

  return getColorTemperature(hex);
}

//!SECTION - 색각 이상 시뮬레이션 기능

//NOTE - 색각 이상 타입 정의
const colorBlindTypes = {
  normal: {
    name: '보편 시력',
    icon: '👁',
    description: '보편적인 색상 인식',
    filter: 'none',
    prevalence: '보편적 사람들'
  },
  protanopia: {
    name: '적색약',
    icon: '🔴',
    description: '빨강을 구분하기 어려움',
    filter: 'url(#protanopia)',
    prevalence: '남성 1%, 여성 0.01%'
  },
  deuteranopia: {
    name: '녹색약',
    icon: '🟢',
    description: '초록을 구분하기 어려움',
    filter: 'url(#deuteranopia)',
    prevalence: '남성 1%, 여성 0.01%'
  },
  tritanopia: {
    name: '청색약',
    icon: '🔵',
    description: '파랑을 구분하기 어려움',
    filter: 'url(#tritanopia)',
    prevalence: '남성/여성 0.001%'
  },
  achromatopsia: {
    name: '전색맹',
    icon: '⚫',
    description: '모든 색을 구분하기 어려움',
    filter: 'url(#achromatopsia)',
    prevalence: '매우 드묾 (0.003%)'
  }
};

//NOTE - 색맹 모드 모달 표시
function showColorBlindModal() {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('colorBlindModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content colorblind-modal-content">
      <h3>👁 색각 이상 시뮬레이션</h3>
      <p>현재 팔레트가 다양한 색각 이상자에게 어떻게 보이는지 확인하세요</p>

      <!-- 색각 이상 타입 선택 -->
      <div class="colorblind-type-selector">
        ${Object.entries(colorBlindTypes).map(([key, type]) => `
          <button class="colorblind-type-btn ${key === 'normal' ? 'active' : ''}"
                  data-type="${key}"
                  onclick="selectColorBlindType('${key}')">
            <span class="type-icon">${type.icon}</span>
            <span class="type-name">${type.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- 현재 선택된 타입 정보 -->
      <div class="colorblind-info" id="colorblindInfo">
        <div class="info-icon">${colorBlindTypes.normal.icon}</div>
        <div class="info-content">
          <h4>${colorBlindTypes.normal.name}</h4>
          <p>${colorBlindTypes.normal.description}</p>
          <span class="prevalence">영향: ${colorBlindTypes.normal.prevalence}</span>
        </div>
      </div>

      <!-- 팔레트 비교 -->
      <div class="palette-comparison">
        <div class="comparison-section">
          <h4>원본 팔레트</h4>
          <div class="preview-palette" id="originalPalette">
            ${currentPalette.map(color => `
              <div class="preview-color" style="background: ${color};">
                <span class="color-label">${color}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="comparison-arrow">↓</div>

        <div class="comparison-section">
          <h4 id="filteredTitle">필터 적용 후</h4>
          <div class="preview-palette" id="filteredPalette" style="filter: none;">
            ${currentPalette.map(color => `
              <div class="preview-color" style="background: ${color};">
                <span class="color-label">${color}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- 접근성 점수 -->
      <div class="colorblind-score" id="colorblindScore">
        <div class="score-header">
          <span class="score-label">색상 구분 가능성</span>
          <span class="score-value" id="distinctScore">100%</span>
        </div>
        <div class="score-bar">
          <div class="score-fill" id="distinctFill" style="width: 100%;"></div>
        </div>
        <p class="score-description" id="scoreDescription">
          모든 색상이 명확하게 구분됩니다.
        </p>
      </div>

      <!-- 개선 제안 -->
      <div class="colorblind-suggestions" id="colorblindSuggestions" style="display: none;">
        <h4>💡 개선 제안</h4>
        <ul id="suggestionsList"></ul>
      </div>

      <!-- 액션 버튼 -->
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="toggleAllFilters()">
          <span id="toggleFilterText">모든 필터 비교</span>
        </button>
        <button class="modal-close">닫기</button>
      </div>
    </div>
  `;

  const modalElement = document.createElement('div');
  modalElement.id = 'colorBlindModal';
  modalElement.className = 'score-modal';
  modalElement.innerHTML = modalHTML;

  document.body.appendChild(modalElement);

  // 이벤트 리스너
  modalElement.querySelector('.modal-backdrop').addEventListener('click', function() {
    modalElement.remove();
  });

  modalElement.querySelector('.modal-close').addEventListener('click', function() {
    modalElement.remove();
  });

  // 초기 점수 계산
  calculateColorDistinction('normal');

  // 모달 표시 애니메이션
  setTimeout(() => {
    modalElement.classList.add('show');
  }, 10);
}

//NOTE - 색각 이상 타입 선택
function selectColorBlindType(type) {
  // 버튼 활성화 상태 업데이트
  document.querySelectorAll('.colorblind-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });

  // 정보 업데이트
  const typeInfo = colorBlindTypes[type];
  const infoDiv = document.getElementById('colorblindInfo');
  infoDiv.innerHTML = `
    <div class="info-icon">${typeInfo.icon}</div>
    <div class="info-content">
      <h4>${typeInfo.name}</h4>
      <p>${typeInfo.description}</p>
      <span class="prevalence">영향: ${typeInfo.prevalence}</span>
    </div>
  `;

  // 필터 적용
  const filteredPalette = document.getElementById('filteredPalette');
  filteredPalette.style.filter = typeInfo.filter;

  // 타이틀 업데이트
  document.getElementById('filteredTitle').textContent =
    type === 'normal' ? '필터 적용 후' : `${typeInfo.name} 시뮬레이션`;

  // 접근성 점수 계산
  calculateColorDistinction(type);
}

//NOTE - 색상 구분 가능성 계산
function calculateColorDistinction(type) {
  if (type === 'normal') {
    updateDistinctionScore(100, '모든 색상이 명확하게 구분됩니다.', []);
    return;
  }

  let totalPairs = 0;
  let distinctPairs = 0;
  const problematicPairs = [];

  for (let i = 0; i < currentPalette.length; i++) {
    for (let j = i + 1; j < currentPalette.length; j++) {
      totalPairs++;
      
      const color1 = currentPalette[i];
      const color2 = currentPalette[j];
      
      // 색각 이상에서의 색상 차이 계산
      const difference = calculateColorBlindDifference(color1, color2, type);
      
      // Delta E 기준:
      // > 2.3: 명확히 구분 가능
      // 1.0 ~ 2.3: 주의 깊게 보면 구분 가능
      // < 1.0: 거의 구분 불가능
      
      if (difference > 2.3) {
        distinctPairs++;
      } else if (difference > 1.0) {
        distinctPairs += 0.5;  // 부분 점수
      } else {
        problematicPairs.push({ 
          color1, 
          color2, 
          difference: difference.toFixed(2),
          simColor1: simulateColorBlindness(color1, type),
          simColor2: simulateColorBlindness(color2, type)
        });
      }
    }
  }

  const score = Math.round((distinctPairs / totalPairs) * 100);
  
  // 점수에 따른 설명
  let description;
  if (score >= 90) {
    description = '대부분의 색상이 명확하게 구분됩니다. 훌륭합니다! ✨';
  } else if (score >= 70) {
    description = '일부 색상 쌍이 유사하게 보일 수 있습니다. 주의가 필요합니다.';
  } else if (score >= 50) {
    description = '여러 색상이 비슷하게 보여 구분이 어려울 수 있습니다. ⚠️';
  } else {
    description = '많은 색상이 구분하기 어렵습니다. 개선이 필요합니다. 🚨';
  }

  // 개선 제안 생성
  const suggestions = generateColorBlindSuggestions(score, type, problematicPairs);

  updateDistinctionScore(score, description, suggestions);
}

//NOTE - 정확한 색각 이상 색상 변환 (Brettel 알고리즘)

// RGB를 LMS 색 공간으로 변환하는 행렬
const RGB_TO_LMS = [
  [17.8824,  43.5161,   4.1193],
  [ 3.4557,  27.1554,   3.8671],
  [ 0.0300,   0.1843,   1.4671]
];

// LMS를 RGB로 역변환하는 행렬
const LMS_TO_RGB = [
  [ 0.0809, -0.1305,  0.1167],
  [-0.0102,  0.0540, -0.1136],
  [-0.0004, -0.0041,  0.6935]
];

// 색각 이상 시뮬레이션 행렬들
const COLORBLIND_MATRICES = {
  // 적색약 (Protanopia) - L 원뿔 세포 기능 상실
  protanopia: [
    [0.0, 2.02344, -2.52581],
    [0.0, 1.0,      0.0],
    [0.0, 0.0,      1.0]
  ],

  // 녹색약 (Deuteranopia) - M 원뿔 세포 기능 상실
  deuteranopia: [
    [1.0,      0.0, 0.0],
    [0.494207, 0.0, 1.24827],
    [0.0,      0.0, 1.0]
  ],

  // 청색약 (Tritanopia) - S 원뿔 세포 기능 상실
  tritanopia: [
    [1.0,       0.0,      0.0],
    [0.0,       1.0,      0.0],
    [-0.395913, 0.801109, 0.0]
  ]
};

// 행렬 곱셈 유틸리티
function multiplyMatrices(a, b) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

// 벡터와 행렬 곱셈
function multiplyMatrixVector(matrix, vector) {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;
    for (let j = 0; j < vector.length; j++) {
      sum += matrix[i][j] * vector[j];
    }result[i] = sum
  }
  return result;
}

// RGB 값 정규화 (0-1 범위)
function normalizeRGB(rgb) {
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
}

// RGB 값 역정규화 (0-255 범위)
function denormalizeRGB(rgb) {
  return {
    r: Math.max(0, Math.min(255, Math.round(rgb[0] * 255))),
    g: Math.max(0, Math.min(255, Math.round(rgb[1] * 255))),
    b: Math.max(0, Math.min(255, Math.round(rgb[2] * 255)))
  };
}

// RGB를 HEX로 변환 (헬퍼 함수)
function rgbToHex(rgb) {
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
}

// 색각 이상 시뮬레이션 적용
function simulateColorBlindness(hex, type) {
  if (type === 'normal') {
    return hex;
  }

  if (type === 'achromatopsia') {
    // 전색맹: 그레이스케일 변환
    const rgb = hexToRgb(hex);
    const gray = Math.round(0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
    return rgbToHex({ r: gray, g: gray, b: gray });
  }

  // RGB 값 가져오기 및 정규화
  const rgb = hexToRgb(hex);
  const normalizedRGB = normalizeRGB(rgb);

  // 1. RGB → LMS 변환
  const lms = multiplyMatrixVector(RGB_TO_LMS, normalizedRGB);

  // 2. 색각 이상 시뮬레이션 적용
  const matrix = COLORBLIND_MATRICES[type];
  if (!matrix) return hex;

  const simulatedLMS = multiplyMatrixVector(matrix, lms);

  // 3. LMS → RGB 역변환
  const simulatedRGB = multiplyMatrixVector(LMS_TO_RGB, simulatedLMS);

  // 4. RGB 값 정규화 및 HEX 변환
  const finalRGB = denormalizeRGB(simulatedRGB);

  return rgbToHex(finalRGB);
}

// RGB를 LAB 색공간으로 변환
function rgbToLab(rgb) {
  // 1. RGB → XYZ 변환
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;
  
  // 감마 보정
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  
  // XYZ 변환 (D65 illuminant)
  let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  let y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  let z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;
  
  // 2. XYZ → LAB 변환
  // D65 표준 조명 기준값
  x = x / 0.95047;
  y = y / 1.00000;
  z = z / 1.08883;
  
  // LAB 변환 함수
  const labFunc = (t) => t > 0.008856 ? Math.pow(t, 1/3) : (7.787 * t + 16/116);
  
  x = labFunc(x);
  y = labFunc(y);
  z = labFunc(z);
  
  return {
    l: (116 * y) - 16,
    a: 500 * (x - y),
    b: 200 * (y - z)
  };
}

//NOTE - 색각 이상에서의 색상 차이 계산
function calculateColorBlindDifference(color1, color2, type) {
  // 색각 이상 시뮬레이션 적용
  const simColor1 = simulateColorBlindness(color1, type);
  const simColor2 = simulateColorBlindness(color2, type);

  // 시뮬레이션된 색상 간의 유클리드 거리 계산 (CIE76)
  const rgb1 = hexToRgb(simColor1);
  const rgb2 = hexToRgb(simColor2);

  // RGB를 LAB 색공간으로 변환하여 더 정확한 지각적 차이 계산
  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2);

  // Delta E (색상 차이) 계산
  const deltaL = lab1.l - lab2.l;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  const deltaE = Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);

  // Delta E 값 반환
  return deltaE;
}

//NOTE - 구분 점수 업데이트
function updateDistinctionScore(score, description, suggestions) {
  const scoreValue = document.getElementById('distinctScore');
  const scoreFill = document.getElementById('distinctFill');
  const scoreDesc = document.getElementById('scoreDescription');
  const suggestionsDiv = document.getElementById('colorblindSuggestions');
  const suggestionsList = document.getElementById('suggestionsList');

  if (scoreValue) scoreValue.textContent = score + '%';
  if (scoreFill) {
    scoreFill.style.width = score + '%';

    // 점수에 따른 색상
    if (score >= 80) {
      scoreFill.style.background = '#00FF88';
    } else if (score >= 60) {
      scoreFill.style.background = '#FFA500';
    } else {
      scoreFill.style.background = '#FF6B6B';
    }
  }
  if (scoreDesc) scoreDesc.textContent = description;

  // 개선 제안 표시
  if (suggestions.length > 0 && suggestionsDiv && suggestionsList) {
    suggestionsDiv.style.display = 'block';
    suggestionsList.innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');
  }else if (suggestionsDiv) {
    suggestionsDiv.style.display = 'none';
  }
}

//NOTE - 개선 제안 생성
function generateColorBlindSuggestions(score, type, problematicPairs) {
  const suggestions = [];

  if (score < 80) {
    suggestions.push('명도(밝기) 차이를 더 크게 하면 구분이 쉬워집니다.')
  }

  if (score < 60) {
    suggestions.push('텍스트와 배경은 충분한 대비를 유지하세요.');
  }

  if (type === 'protanopia' || type === 'deuteranopia') {
    if (score < 70) {
      suggestions.push('빨강-초록 조합 대신 파랑-노랑 조합을 사용하세요.');
    }
  }

  if (type === 'tritanopia') {
    if (score < 70) {
      suggestions.push('파랑-노랑 조합 대신 빨강-초록 조합을 사용하세요.');
    }
  }

  if (type === 'achromatopsia') {
    suggestions.push('명도 차이만으로 정보를 전달할 수 있도록 디자인하세요.');
  }

  if (problematicPairs.length > 0) {
    suggestions.push(`${problematicPairs.length}개의 색상 쌍이 유사하게 보입니다. 색상 변경을 고려하세요.`);
  }

  return suggestions;
}

//NOTE - 모든 필터 비교 토글
let showingAllFilters = false;

function toggleAllFilters() {
  const modal = document.getElementById('colorBlindModal');
  if (!modal) return;

  showingAllFilters = !showingAllFilters;
  const toggleText = document.getElementById('toggleFilterText');

  if (showingAllFilters) {
    // 모든 필터 표시
    showAllFiltersComparison();
    if (toggleText) toggleText.textContent = '단일 필터로 돌아가기';
  } else {
    // 원래 모달로 복원
    modal.remove();
    showColorBlindModal();
  }
}

//NOTE - 모든 필터 비교 표시
function showAllFiltersComparison() {
  const modal = document.getElementById('colorBlindModal');
  if (!modal) return;

  const content = modal.querySelector('.colorblind-modal-content');

  const comparisonHTML = `
    <h3>👁 모든 색각 이상 타입 비교</h3>
    <p>현재 팔레트가 각 색각 이상 타입에서 어떻게 보이는지 한눈에 확인하세요</p>

    <div class="all-filters-grid">
      ${Object.entries(colorBlindTypes).map(([key, type]) => `
        <div class="filter-comparison-card">
          <div class="card-header">
            <span class="type-icon">${type.icon}</span>
            <h4>${type.name}</h4>
          </div>
          <div class="preview-palette-small" style="filter: ${type.filter}">
            ${currentPalette.map(color => `
              <div class="preview-color-small" style="background: ${color};"></div>
            `).join('')}
          </div>
          <p class="card-description}>${type.description}</p>
        </div>
      `).join('')}
    </div>

    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="toggleAllFilters()">
        <span id="toggleFilterText">단일 필터로 돌아가기</span>
      </button>
      <button class="modal-close">닫기</button>
    </div>
  `;

  content.innerHTML = comparisonHTML;

  // 이벤트 리스너 재설정
  modal.querySelector('.modal-close').addEventListener('click', function() {
    modal.remove();
  });
}