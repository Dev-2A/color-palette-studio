/**
 * Palette Comparison Mode
 * 팔레트 비교 모드 기능
 * - Compare two palettes side-by-side
 * - Analyze differences and similarities
 * - Live comparison mode
 */

//!SECTION - 팔레트 비교 모드 기능

//NOTE - 비교 모드 전역 변수
const compareMode = {
  isActive: false,
  palette1: null,
  palette2: null,
  palette1Name: '팔레트 1',
  palette2Name: '팔레트 2',
  liveCompareActive: false,
  savedPaletteForLive: null,
  savedPaletteName: ''
};

//NOTE - 비교 모드 열기
function openCompareMode() {
  // 현재 팔레트를 첫 번째 팔레트로 설정
  compareMode.palette1 = [...currentPalette];
  compareMode.palette1Name = '현재 팔레트';
  compareMode.isActive = true;
  
  createCompareModal();
}

//NOTE - 비교 모드 모달 생성
function createCompareModal() {
  const existingModal = document.getElementById('compareModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'compareModal';
  modal.className = 'compare-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content compare-content">
      <div class="modal-header">
        <h3>🔄 팔레트 비교</h3>
        <button class="modal-close-btn" onclick="closeCompareModal()">✕</button>
      </div>
      
      <div class="compare-container">
        <!-- 상단: 두 팔레트 나란히 -->
        <div class="compare-palettes-row">
          <!-- 왼쪽 팔레트 -->
          <div class="compare-palette-section">
            <div class="palette-header">
              <h4 id="palette1Name">${compareMode.palette1Name}</h4>
              <button class="palette-select-btn" onclick="selectPalette(1)">
                📂 다른 팔레트 선택
              </button>
            </div>
            <div id="comparePalette1" class="compare-palette-display"></div>
            <div id="palette1Analysis" class="palette-analysis-summary"></div>
          </div>

          <!-- 오른쪽 팔레트 -->
          <div class="compare-palette-section">
            <div class="palette-header">
              <h4 id="palette2Name">팔레트 선택 필요</h4>
              <button class="palette-select-btn" onclick="selectPalette(2)">
                📂 팔레트 선택
              </button>
            </div>
            <div id="comparePalette2" class="compare-palette-display">
              <div class="empty-palette">팔레트를 선택해주세요</div>
            </div>
            <div id="palette2Analysis" class="palette-analysis-summary"></div>
          </div>
        </div>

        <!-- 하단: 비교 분석 결과 (전체 너비) -->
        <div class="compare-results">
          <div class="comparison-metrics">
            <h4>📊 비교 분석 결과</h4>
            <div id="comparisonDetails"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // 백드롭 클릭 시 닫기
  const backdrop = modal.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeCompareModal);
  }

  // 첫 번째 팔레트 표시
  displayComparePalette(1, compareMode.palette1);

  // 모달 애니메이션
  setTimeout(() => modal.classList.add('show'), 10);
}

//NOTE - 비교 모달 닫기
function closeCompareModal() {
  const modal = document.getElementById('compareModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  }
  compareMode.isActive = false;
}

//NOTE - 팔레트 선택 (저장된 팔레트 목록 표시)
function selectPalette(paletteNumber) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  if (saved.length === 0) {
    showToast('저장된 팔레트가 없습니다! 먼저 팔레트를 저장해주세요.');
    return;
  }

  // 팔레트 선택 모달 생성
  const selectModal = document.createElement('div');
  selectModal.className = 'palette-select-modal';
  selectModal.innerHTML = `
    <div class="select-backdrop" onclick="this.parentElement.remove()"></div>
    <div class="select-content">
      <h4>🎨 팔레트 선택 (${paletteNumber === 1 ? '왼쪽' : '오른쪽'})</h4>
      <div class="palette-filter-bar">
        <input type="text" id="paletteSearchInput" placeholder="팔레트 검색..."
               onkeyup="filterPalettes(this.value, ${paletteNumber})">
        <select id="paletteSortSelect" onchange="sortPalettes(this.value, ${paletteNumber})">
          <option value="recent">최신순</option>
          <option value="name">이름순</option>
          <option value="colors">색상 수</option>
        </select>
      </div>
      <div class="saved-palettes-grid" id="paletteGrid${paletteNumber}">
        ${renderPaletteGrid(saved, paletteNumber)}
      </div>
      <div class="palette-select-actions">
        <button class="btn-cancel" onclick="this.parentElement.parentElement.parentElement.remove()">
          취소
        </button>
        <button class="btn-primary" onclick="selectCurrentPalette(${paletteNumber})">
          현재 팔레트 사용
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(selectModal);
}

//NOTE - 팔레트 그리드 렌더링
function renderPaletteGrid(palettes, paletteNumber) {
  if (palettes.length === 0) {
    return '<div class="no-palettes">검색 결과가 없습니다.</div>';
  }

  return palettes.map((item, index) => `
    <div class="saved-palette-item" onclick="choosePalette(${paletteNumber}, ${index})"
         data-name="${item.name || ''}" data-index="${index}">
      <div class="palette-preview">
        ${item.colors.map(color => `
          <div class="preview-color" style="background: ${color};"
               title="${color}"></div>
        `).join('')}
      </div>
      <div class="palette-info">
        <div class="palette-name">${item.name || '이름 없음'}</div>
        <div class="palette-meta">
          <span class="palette-date">${new Date(item.timestamp).toLocaleDateString('ko-KR')}</span>
          <span class="palette-color-count">${item.colors.length} 색상</span>
        </div>
      </div>
      ${item.tags ? `
        <div class="palette-tags">
          ${item.tags.slice(0, 3).map(tag => `
            <span class="palette-tag">${tag}</span>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
}

//NOTE - 팔레트 필터링
function filterPalettes(query, paletteNumber) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  const filtered = saved.filter(item => {
    const name = (item.name || '').toLowerCase();
    const tags = (item.tags || []).join(' ').toLowerCase();
    return name.includes(query.toLowerCase()) || tags.includes(query.toLowerCase());
  });

  const grid = document.getElementById(`paletteGrid${paletteNumber}`);
  if (grid) {
    grid.innerHTML = renderPaletteGrid(filtered, paletteNumber);
  }
}

//NOTE - 팔레트 정렬
function sortPalettes(sortBy, paletteNumber) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  const sorted = [...saved].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'colors':
        return b.colors.length - a.colors.length;
      case 'recent':
      default:
        return b.timestamp - a.timestamp;
    }
  });

  const grid = document.getElementById(`paletteGrid${paletteNumber}`);
  if (grid) {
    grid.innerHTML = renderPaletteGrid(sorted, paletteNumber);
  }
}

//NOTE - 현재 팔레트 선택
function selectCurrentPalette(paletteNumber) {
  if (paletteNumber === 1) {
    compareMode.palette1 = [...currentPalette];
    compareMode.palette1Name = '현재 팔레트';
    displayComparePalette(1, compareMode.palette1);
    document.getElementById('palette1Name').textContent = compareMode.palette1Name;
  } else {
    compareMode.palette2 = [...currentPalette];
    compareMode.palette2Name = '현재 팔레트';
    displayComparePalette(2, compareMode.palette2);
    document.getElementById('palette2Name').textContent = compareMode.palette2Name;
  }

  // 모달 닫기
  document.querySelector('.palette-select-modal').remove();

  // 비교 실행
  if (compareMode.palette1 && compareMode.palette2) {
    performComparison();
  }
}

//NOTE - 선택한 팔레트 적용
function choosePalette(paletteNumber, index) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  const selected = saved[index];

  if (paletteNumber === 1) {
    compareMode.palette1 = selected.colors;
    compareMode.palette1Name = selected.name || '팔레트 1';
    compareMode.palette1Data = selected; // 전체 데이터 저장
    displayComparePalette(1, compareMode.palette1);
    document.getElementById('palette1Name').textContent = compareMode.palette1Name;
  } else {
    compareMode.palette2 = selected.colors;
    compareMode.palette2Name = selected.name || '팔레트 2';
    compareMode.palette2Data = selected; // 전체 데이터 저장
    displayComparePalette(2, compareMode.palette2);
    document.getElementById('palette2Name').textContent = compareMode.palette2Name;
  }

  // 팔레트 선택 모달 닫기
  const modal = document.querySelector('.palette-select-modal');
  if (modal) {
    modal.classList.add('closing');
    setTimeout(() => modal.remove(), 300);
  }

  // 선택 효과
  showToast(`팔레트 선택: ${selected.name || '이름 없음'}`);

  // 두 팔레트가 모두 선택되면 비교 분석 실행
  if (compareMode.palette1 && compareMode.palette2) {
    performComparison();
  }
}

//NOTE - 비교용 팔레트 표시
function displayComparePalette(paletteNumber, colors) {
  const containerId = `comparePalette${paletteNumber}`;
  const container = document.getElementById(containerId);
  
  if (!colors || colors.length === 0) {
    container.innerHTML = '<div class="empty-palette">팔레트를 선택해주세요</div>';
    return;
  }
  
  container.innerHTML = colors.map(color => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    return `
      <div class="compare-color-card">
        <div class="color-display" style="background: ${color};"></div>
        <div class="color-codes">
          <div class="code-item">${color}</div>
          <div class="code-item">RGB(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
          <div class="code-item">HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)</div>
        </div>
      </div>
    `;
  }).join('');
  
  // 팔레트 분석 요약
  const analysisContainer = document.getElementById(`palette${paletteNumber}Analysis`);
  const analysis = analyzePaletteCompact(colors);
  analysisContainer.innerHTML = `
    <div class="analysis-compact">
      <div class="metric-item">
        <span class="metric-label">종합 점수:</span>
        <span class="metric-value">${analysis.totalScore}점 (${analysis.grade})</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">대비:</span>
        <span class="metric-value">${analysis.contrast}점</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">조화:</span>
        <span class="metric-value">${analysis.harmony}점</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">접근성:</span>
        <span class="metric-value">${analysis.accessibility}점</span>
      </div>
    </div>
  `;
}

//NOTE - 상세한 팔레트 분석 (비교용)
function analyzePaletteDetailed(colors) {
  const scores = analyzePalette(colors);
  const gradeInfo = getScoreGrade(scores.total);

  // 추가 분석: 색상 다양성
  const uniqueHues = new Set();
  const saturationValues = [];
  const lightnessValues = [];

  colors.forEach(color => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    uniqueHues.add(Math.floor(hsl.h / 30)); // 30도 단위로 그룹화
    saturationValues.push(hsl.s);
    lightnessValues.push(hsl.l);
  });

  const diversity = Math.round((uniqueHues.size / 12) * 100); // 색상환 다양성
  const avgSaturation = Math.round(saturationValues.reduce((a, b) => a + b, 0) / saturationValues.length);
  const avgLightness = Math.round(lightnessValues.reduce((a, b) => a + b, 0) / lightnessValues.length);

  // 온도 균형 분석
  const warmColors = colors.filter(color => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return (hsl.h >= 0 && hsl.h <= 60) || (hsl.h >= 300 && hsl.h <= 360);
  }).length;

  const coolColors = colors.length - warmColors;
  const temperatureBalance = Math.round((warmColors / colors.length) * 100);

  return {
    totalScore: scores.total,  // total을 totalScore로 매핑
    grade: gradeInfo.grade,    // gradeInfo에서 grade 가져오기
    contrast: scores.contrast,
    harmony: scores.harmony,
    accessibility: scores.accessibility,
    diversity,
    avgSaturation,
    avgLightness,
    temperatureBalance,
    warmColors,
    coolColors
  };
}

//NOTE - 간단한 팔레트 분석 (비교용)
function analyzePaletteCompact(colors) {
  return analyzePaletteDetailed(colors);
}

//NOTE - 두 팔레트 비교 분석
function performComparison() {
  const analysis1 = analyzePaletteDetailed(compareMode.palette1);
  const analysis2 = analyzePaletteDetailed(compareMode.palette2);

  const detailsContainer = document.getElementById('comparisonDetails');

  // 점수 차이 계산
  const scoreDiff = analysis1.totalScore - analysis2.totalScore;
  const winner = scoreDiff > 0 ? compareMode.palette1Name :
                 scoreDiff < 0 ? compareMode.palette2Name : '동점';

  // 상세 비교 메트릭
  const metrics = {
    contrast: {
      diff: analysis1.contrast - analysis2.contrast,
      winner: analysis1.contrast > analysis2.contrast ? 1 : 2
    },
    harmony: {
      diff: analysis1.harmony - analysis2.harmony,
      winner: analysis1.harmony > analysis2.harmony ? 1 : 2
    },
    accessibility: {
      diff: analysis1.accessibility - analysis2.accessibility,
      winner: analysis1.accessibility > analysis2.accessibility ? 1 : 2
    },
    diversity: {
      diff: analysis1.diversity - analysis2.diversity,
      winner: analysis1.diversity > analysis2.diversity ? 1 : 2
    },
    temperature: {
      balance1: analysis1.temperatureBalance,
      balance2: analysis2.temperatureBalance
    }
  };

  detailsContainer.innerHTML = `
    <div class="comparison-summary">
      <div class="winner-badge">
        ${scoreDiff === 0 ? '🤝' : scoreDiff > 0 ? '🏆' : '🏆'}
        <strong>${winner}</strong>
        ${scoreDiff !== 0 ? '우승!' : '비김'}
      </div>
      <div class="score-difference">
        점수 차이: <strong>${Math.abs(scoreDiff)}점</strong>
      </div>
      <div class="quick-stats">
        <span class="stat-item">
          <span class="stat-icon">🎨</span> ${compareMode.palette1.length} vs ${compareMode.palette2.length} 색상
        </span>
      </div>
    </div>
    
    <div class="comparison-metrics-detail">
      <h5>📊 상세 비교 분석</h5>

      <div class="metric-comparison">
        <div class="metric-row ${metrics.contrast.diff !== 0 ? 'has-winner' : ''}">
          <span class="metric-name">종합 점수</span>
          <div class="metric-bars">
            <div class="bar-container">
              <div class="bar" style="width: ${analysis1.totalScore}%; background: linear-gradient(135deg, #4CAF50, #45a049);">
                ${analysis1.totalScore}
              </div>
            </div>
            <div class="bar-container">
              <div class="bar" style="width: ${analysis2.totalScore}%; background: linear-gradient(135deg, #2196F3, #1976D2);">
                ${analysis2.totalScore}
              </div>
            </div>
          </div>
        </div>
        
        <div class="metric-row ${metrics.contrast.diff !== 0 ? 'has-winner' : ''}">
          <span class="metric-name">
            대비 ${Math.abs(metrics.contrast.diff) >= 10 ? metrics.contrast.winner === 1 ? '✅' : '❌' : ''}
          </span>
          <div class="metric-bars">
            <div class="bar-container">
              <div class="bar" style="width: ${analysis1.contrast}%; background: linear-gradient(135deg, #4CAF50, #45a049);">
                ${analysis1.contrast}
              </div>
            </div>
            <div class="bar-container">
              <div class="bar" style="width: ${analysis2.contrast}%; background: linear-gradient(135deg, #2196F3, #1976D2);">
                ${analysis2.contrast}
              </div>
            </div>
          </div>
        </div>
        
        <div class="metric-row ${metrics.harmony.diff !== 0 ? 'has-winner' : ''}">
          <span class="metric-name">
            조화 ${Math.abs(metrics.harmony.diff) >= 10 ? metrics.harmony.winner === 1 ? '✅' : '❌' : ''}
          </span>
          <div class="metric-bars">
            <div class="bar-container">
              <div class="bar" style="width: ${analysis1.harmony}%; background: linear-gradient(135deg, #4CAF50, #45a049);">
                ${analysis1.harmony}
              </div>
            </div>
            <div class="bar-container">
              <div class="bar" style="width: ${analysis2.harmony}%; background: linear-gradient(135deg, #2196F3, #1976D2);">
                ${analysis2.harmony}
              </div>
            </div>
          </div>
        </div>
        
        <div class="metric-row ${metrics.accessibility.diff !== 0 ? 'has-winner' : ''}">
          <span class="metric-name">
            접근성 ${Math.abs(metrics.accessibility.diff) >= 10 ? metrics.accessibility.winner === 1 ? '✅' : '❌' : ''}
          </span>
          <div class="metric-bars">
            <div class="bar-container">
              <div class="bar" style="width: ${analysis1.accessibility}%; background: linear-gradient(135deg, #4CAF50, #45a049);">
                ${analysis1.accessibility}
              </div>
            </div>
            <div class="bar-container">
              <div class="bar" style="width: ${analysis2.accessibility}%; background: linear-gradient(135deg, #2196F3, #1976D2);">
                ${analysis2.accessibility}
              </div>
            </div>
          </div>
        </div>

        <div class="metric-row ${metrics.diversity.diff !== 0 ? 'has-winner' : ''}">
          <span class="metric-name">
            다양성 ${Math.abs(metrics.diversity.diff) >= 10 ? metrics.diversity.winner === 1 ? '✅' : '❌' : ''}
          </span>
          <div class="metric-bars">
            <div class="bar-container">
              <div class="bar" style="width: ${analysis1.diversity}%; background: linear-gradient(135deg, #9C27B0, #7B1FA2);">
                ${analysis1.diversity}
              </div>
            </div>
            <div class="bar-container">
              <div class="bar" style="width: ${analysis2.diversity}%; background: linear-gradient(135deg, #FF9800, #F57C00);">
                ${analysis2.diversity}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="additional-metrics">
        <h5>🌡️ 색온 분석</h5>
        <div class="temperature-comparison">
          <div class="temp-palette">
            <div class="temp-label">${compareMode.palette1Name}</div>
            <div class="temp-bar">
              <div class="warm-section" style="width: ${analysis1.temperatureBalance}%" title="따뜻한 색: ${analysis1.warmColors}개">
                <span>🔥 ${analysis1.temperatureBalance}%</span>
              </div>
              <div class="cool-section" style="width: ${100 - analysis1.temperatureBalance}%" title="차가운 색: ${analysis1.coolColors}개">
                <span>❄️ ${100 - analysis1.temperatureBalance}%</span>
              </div>
            </div>
          </div>
          <div class="temp-palette">
            <div class="temp-label">${compareMode.palette2Name}</div>
            <div class="temp-bar">
              <div class="warm-section" style="width: ${analysis2.temperatureBalance}%" title="따뜻한 색: ${analysis2.warmColors}개">
                <span>🔥 ${analysis2.temperatureBalance}%</span>
              </div>
              <div class="cool-section" style="width: ${100 - analysis2.temperatureBalance}%" title="차가운 색: ${analysis2.coolColors}개">
                <span>❄️ ${100 - analysis2.temperatureBalance}%</span>
              </div>
            </div>
          </div>
        </div>

        <h5>🌈 색상 특성</h5>
        <div class="color-characteristics">
          <div class="char-item">
            <span class="char-label">평균 채도:</span>
            <div class="char-values">
              <span class="char-value ${analysis1.avgSaturation > analysis2.avgSaturation ? 'higher' : ''}">
                ${compareMode.palette1Name}: ${analysis1.avgSaturation}%
              </span>
              <span class="char-value ${analysis2.avgSaturation > analysis1.avgSaturation ? 'higher' : ''}">
                ${compareMode.palette2Name}: ${analysis2.avgSaturation}%
              </span>
            </div>
          </div>
          <div class="char-item">
            <span class="char-label">평균 명도:</span>
            <div class="char-values">
              <span class="char-value ${analysis1.avgLightness > analysis2.avgLightness ? 'higher' : ''}">
                ${compareMode.palette1Name}: ${analysis1.avgLightness}%
              </span>
              <span class="char-value ${analysis2.avgLightness > analysis1.avgLightness ? 'higher' : ''}">
                ${compareMode.palette2Name}: ${analysis2.avgLightness}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="comparison-legend">
        <span style="color: #4CAF50;">■</span> ${compareMode.palette1Name}
        <span style="color: #2196F3;">■</span> ${compareMode.palette2Name}
      </div>
      
      <div class="comparison-insights">
        <h5>💡 인사이트</h5>
        ${generateComparisonInsights(analysis1, analysis2)}
      </div>
    </div>
  `;
}

//NOTE - 비교 인사이트 생성
function generateComparisonInsights(analysis1, analysis2) {
  const insights = [];

  // 종합 평가
  const scoreDiff = analysis1.totalScore - analysis2.totalScore;
  if (Math.abs(scoreDiff) >= 20) {
    insights.push(`
      <div class="insight-item insight-major">
        <strong>${scoreDiff > 0 ? compareMode.palette1Name : compareMode.palette2Name}</strong>이(가)
        전반적으로 <strong>훨씬 우수한</strong> 팔레트입니다.
      </div>
    `);
  }

  // 대비 비교
  const contrastDiff = analysis1.contrast - analysis2.contrast;
  if (Math.abs(contrastDiff) >= 15) {
    insights.push(`
      <div class="insight-item">
        <strong>${contrastDiff > 0 ? compareMode.palette1Name : compareMode.palette2Name}</strong>가
        색상 대비가 <strong>${Math.abs(contrastDiff)}점</strong> 더 높아
        가독성이 우수합니다.
      </div>
    `);
  }
  
  // 조화 비교
  const harmonyDiff = analysis1.harmony - analysis2.harmony;
  if (Math.abs(harmonyDiff) >= 15) {
    insights.push(`
      <div class="insight-item">
        <strong>${harmonyDiff > 0 ? compareMode.palette1Name : compareMode.palette2Name}</strong>가 
        색상 조화가 <strong>${Math.abs(harmonyDiff)}점</strong> 더 높아 
        시각적으로 더 안정적입니다.
      </div>
    `);
  }
  
  // 접근성 비교
  const accessDiff = analysis1.accessibility - analysis2.accessibility;
  if (Math.abs(accessDiff) >= 15) {
    insights.push(`
      <div class="insight-item">
        <strong>${accessDiff > 0 ? compareMode.palette1Name : compareMode.palette2Name}</strong>가 
        접근성 점수가 <strong>${Math.abs(accessDiff)}점</strong> 더 높아 
        WCAG 기준을 더 잘 충족합니다.
      </div>
    `);
  }
  
  // 다양성 비교
  const diversityDiff = analysis1.diversity - analysis2.diversity;
  if (Math.abs(diversityDiff) >= 20) {
    insights.push(`
      <div class="insight-item">
        <strong>${diversityDiff > 0 ? compareMode.palette1Name : compareMode.palette2Name}</strong>가
        색상 다양성이 <strong>${Math.abs(diversityDiff)}점</strong> 더 높아
        더 풍부한 색감을 제공합니다.
      </div>
    `);
  }

  // 온도 균형 비교
  const tempDiff = Math.abs(50 - analysis1.temperatureBalance) - Math.abs(50 - analysis2.temperatureBalance);
  if (Math.abs(tempDiff) >= 20) {
    insights.push(`
      <div class="insight-item">
        <strong>${tempDiff < 0 ? compareMode.palette1Name : compareMode.palette2Name}</strong>가
        따뜻한 색과 차가운 색의 균형이 더 잘 잡혀 있습니다.
      </div>
    `);
  }

  // 채도 비교
  const satDiff = analysis1.avgSaturation - analysis2.avgSaturation;
  if (Math.abs(satDiff) >= 20) {
    insights.push(`
      <div class="insight-item">
        <strong>${satDiff > 0 ? compareMode.palette1Name : compareMode.palette2Name}</strong>가
        더 선명하고 강렬한 색상을 포함합니다.
      </div>
    `);
  }

  // 명도 비교
  const lightDiff = analysis1.avgLightness - analysis2.avgLightness;
  if (Math.abs(lightDiff) >= 20) {
    insights.push(`
      <div class="insight-item">
        <strong>${lightDiff > 0 ? compareMode.palette1Name : compareMode.palette2Name}</strong>가
        전반적으로 더 밝은 톤을 가지고 있습니다.
      </div>
    `);
  }

  // 등급 비교
  if (analysis1.grade !== analysis2.grade) {
    const gradeEmoji = {
      'S': '🏆',
      'A': '🥇',
      'B': '🥈',
      'C': '🥉',
      'D': '😐'
    };

    insights.push(`
      <div class="insight-item insight-grade">
        <div class="grade-comparison">
          <span class="grade-item">
            ${gradeEmoji[analysis1.grade] || ''} <strong>${compareMode.palette1Name}</strong>: ${analysis1.grade}등급
          </span>
          <span class="grade-item">
            ${gradeEmoji[analysis2.grade] || ''} <strong>${compareMode.palette2Name}</strong>: ${analysis2.grade}등급
          </span>
        </div>
      </div>
    `);
  }

  if (insights.length === 0) {
    return '<div class="insight-item">두 팔레트가 전반적으로 비슷한 수준입니다.</div>';
  }

  // 추천 사항 추가
  const recommendation = getRecommendation(analysis1, analysis2);
  if (recommendation) {
    insights.push(recommendation);
  }

  return insights.join('');
}

//NOTE - 추천 사항 생성
function getRecommendation(analysis1, analysis2) {
  const score1 = analysis1.totalScore;
  const score2 = analysis2.totalScore;

  if (score1 > 80 && score2 > 80) {
    return `
      <div class="insight-item insight-recommendation">
        <strong>🌟 추천:</strong> 두 팔레트 모두 뛰어난 품질입니다.
        프로젝트의 특성에 따라 선택하세요.
      </div>
    `;
  } else if (score1 > 70 || score2 > 70) {
    const better = score1 > score2 ? compareMode.palette1Name : compareMode.palette2Name;
    return `
      <div class="insight-item insight-recommendation">
        <strong>💡 추천:</strong> <strong>${better}</strong>을(를) 사용하되,
        필요에 따라 미세 조정을 고려해보세요.
      </div>
    `;
  } else {
    return `
      <div class="insight-item insight-recommendation">
        <strong>⚠️ 제안:</strong> 두 팔레트 모두 개선이 필요할 수 있습니다.
        대비와 접근성을 높이는 방향으로 수정해보세요.
      </div>
    `;
  }
}

//!SECTION - 실시간 비교 기능

//NOTE - 실시간 비교 토글
function toggleLiveCompare() {
  if (compareMode.liveCompareActive) {
    closeLiveCompare();
  } else {
    openLiveCompare();
  }
}

//NOTE - 실시간 비교 모드 시작
function openLiveCompare() {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  if (saved.length === 0) {
    showToast('저장된 팔레트가 없습니다! 먼저 팔레트를 저장해주세요.');
    return;
  }

  // 팔레트 선택 모달 생성
  const modal = document.createElement('div');
  modal.className = 'palette-select-modal';
  modal.innerHTML = `
    <div class="select-backdrop" onclick="this.parentElement.remove()"></div>
    <div class="select-content">
      <h4>⚡ 실시간 비교할 팔레트 선택</h4>
      <p style="color: #8892b0; margin-bottom: 20px; text-align: center;">
        선택한 팔레트와 현재 생성되는 팔레트를 실시간으로 비교합니다.
      </p>
      <div class="saved-palettes-grid">
        ${saved.map((item, index) => `
          <div class="saved-palette-item" onclick="selectLivePalette(${index})">
            <div class="palette-preview">
              ${item.colors.map(color => `
                <div class="preview-color" style="background: ${color};" title="${color}"></div>
              `).join('')}
            </div>
            <div class="palette-info">
              <div class="palette-name">${item.name || '이름 없음'}</div>
              <div class="palette-meta">
                <span class="palette-date">${new Date(item.timestamp).toLocaleDateString('ko-KR')}</span>
                <span class="palette-color-count">${item.colors.length} 색상</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="btn-secondary" onclick="this.parentElement.parentElement.remove()" style="width: 100%; margin-top: 20px;">
        취소
      </button>
    </div>
  `;

  document.body.appendChild(modal);
}

//NOTE - 실시간 비교용 팔레트 선택
function selectLivePalette(index) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  const selected = saved[index];

  compareMode.savedPaletteForLive = selected.colors;
  compareMode.savedPaletteName = selected.name || '저장된 팔레트';
  compareMode.liveCompareActive = true;

  // 모달 닫기
  const modal = document.querySelector('.palette-select-modal');
  if (modal) {
    modal.remove();
  }

  // 버튼 스타일 업데이트
  const btn = document.getElementById('liveCompareBtn');
  if (btn) {
    btn.classList.add('active');
    btn.innerHTML = '<span>⚡ 실시간 비교 중</span>';
  }

  // 실시간 비교 패널 생성
  createLiveComparePanel();

  showToast(`실시간 비교 시작: ${compareMode.savedPaletteName}`);

  // 현재 팔레트로 즉시 비교 실행
  updateLiveComparison();
}

//NOTE - 실시간 비교 패널 생성
function createLiveComparePanel() {
  // 기존 패널 제거
  const existing = document.getElementById('liveComparePanel');
  if (existing) {
    existing.remove();
  }

  const panel = document.createElement('div');
  panel.id = 'liveComparePanel';
  panel.className = 'live-compare-panel';
  panel.innerHTML = `
    <div class="live-compare-header">
      <h4>⚡ 실시간 비교</h4>
      <button class="modal-close-btn" onclick="closeLiveCompare()">✕</button>
    </div>
    <div class="live-compare-content">
      <div class="live-palette-info">
        <div class="palette-label">비교 기준: <strong>${compareMode.savedPaletteName}</strong></div>
      </div>
      <div id="liveComparisonResult" class="live-comparison-result">
        <div class="loading">비교 중...</div>
      </div>
    </div>
  `;

  document.body.appendChild(panel);

  // 애니메이션
  setTimeout(() => panel.classList.add('show'), 10);
}

//NOTE - 실시간 비교 업데이트
function updateLiveComparison() {
  if (!compareMode.liveCompareActive) return;

  const resultDiv = document.getElementById('liveComparisonResult');
  if (!resultDiv) return;

  const savedAnalysis = analyzePaletteDetailed(compareMode.savedPaletteForLive);
  const currentAnalysis = analyzePaletteDetailed(currentPalette);

  const scoreDiff = currentAnalysis.totalScore - savedAnalysis.totalScore;
  const winner = scoreDiff > 0 ? '현재 팔레트' : scoreDiff < 0 ? compareMode.savedPaletteName : '동점';

  resultDiv.innerHTML = `
    <div class="live-score-summary">
      <div class="live-score-item">
        <span class="score-label">현재 팔레트</span>
        <span class="score-value ${scoreDiff > 0 ? 'winning' : ''}">${currentAnalysis.totalScore}점</span>
        <span class="score-grade">(${currentAnalysis.grade})</span>
      </div>
      <div class="score-vs">VS</div>
      <div class="live-score-item">
        <span class="score-label">${compareMode.savedPaletteName}</span>
        <span class="score-value ${scoreDiff < 0 ? 'winning' : ''}">${savedAnalysis.totalScore}점</span>
        <span class="score-grade">(${savedAnalysis.grade})</span>
      </div>
    </div>

    <div class="live-metrics">
      <div class="metric-bar-mini">
        <span class="metric-name-mini">대비</span>
        <div class="bars-mini">
          <div class="bar-mini current" style="width: ${currentAnalysis.contrast}%"></div>
          <div class="bar-mini saved" style="width: ${savedAnalysis.contrast}%"></div>
        </div>
      </div>
      <div class="metric-bar-mini">
        <span class="metric-name-mini">조화</span>
        <div class="bars-mini">
          <div class="bar-mini current" style="width: ${currentAnalysis.harmony}%"></div>
          <div class="bar-mini saved" style="width: ${savedAnalysis.harmony}%"></div>
        </div>
      </div>
      <div class="metric-bar-mini">
        <span class="metric-name-mini">접근성</span>
        <div class="bars-mini">
          <div class="bar-mini current" style="width: ${currentAnalysis.accessibility}%"></div>
          <div class="bar-mini saved" style="width: ${savedAnalysis.accessibility}%"></div>
        </div>
      </div>
    </div>

    <div class="live-winner">
      ${scoreDiff !== 0 ? `
        <span class="winner-text">
          ${scoreDiff > 0 ? '✨' : '📌'} <strong>${winner}</strong>가 ${Math.abs(scoreDiff)}점 우세
        </span>
      ` : '<span class="winner-text">🤝 동점</span>'}
    </div>
  `;
}

//NOTE - 실시간 비교 종료
function closeLiveCompare() {
  compareMode.liveCompareActive = false;
  compareMode.savedPaletteForLive = null;
  compareMode.savedPaletteName = '';

  // 패널 제거
  const panel = document.getElementById('liveComparePanel');
  if (panel) {
    panel.classList.remove('show');
    setTimeout(() => panel.remove(), 300);
  }

  // 버튼 스타일 복원
  const btn = document.getElementById('liveCompareBtn');
  if (btn) {
    btn.classList.remove('active');
    btn.innerHTML = '<span>⚡ 실시간 비교</span>';
  }

  showToast('실시간 비교 종료');
}

