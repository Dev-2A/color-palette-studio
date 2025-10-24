/**
 * Color Blindness Simulation
 * 색각 이상 시뮬레이션 기능
 * - Simulate various types of color blindness
 * - Calculate color distinction scores
 * - Provide accessibility suggestions
 * - Compare all filters side-by-side
 */

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
    }
    result[i] = sum;
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
          <p class="card-description">${type.description}</p>
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

