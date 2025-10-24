/**
 * Color Palette Scoring
 * 색상 조합 점수 및 분석 기능
 * - Calculate palette quality scores
 * - Analyze contrast, harmony, balance, diversity, and accessibility
 * - Generate improvement suggestions
 * - Display score modal and badge
 */

// 색상 분석 결과 저장
let currentPaletteScore = {
  total: 0,
  contrast: 0,
  harmony: 0,
  balance: 0,
  diversity: 0,
  accessibility: 0
};

// 색상 조합 점수 계산
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

// 1. 대비 점수 계산 (색상 간 대비가 적절한지)
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

// 2. 조화 점수 계산 (색상환에서의 관계)
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

// 3. 균형 점수 계산 (명도와 채도의 균형)
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

// 4. 다양성 점수 계산 (색상의 다양성)
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

  const hueScore = hueSpread > 60 ? 100 : hueSpread > 12 ? 70 : 40;
  const satScore = satSpread > 30 ? 100 : satSpread > 15 ? 70 : 40;
  const lightScore = lightSpread > 30 ? 100 : lightSpread > 15 ? 70 : 40;

  return Math.round((hueScore * 0.5 + satScore * 0.25 + lightScore * 0.25));
}

// 5. 접근성 점수 계산 (WCAG 기준)
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

// 6. 색맹 접근성 점수 계산
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

// 대비 비율 계산 (WCAG 공식)
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// 상대 휘도 계산
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

// 유틸리티 함수들
function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function standardDeviation(arr) {
  const avg = average(arr);
  const squaredDiffs = arr.map(value => Math.pow(value - avg, 2));
  return Math.sqrt(average(squaredDiffs));
}

// 점수에 따른 등급 계산
function getScoreGrade(score) {
  if (score >= 90) return { grade: 'S', label: '완벽함', color: '#FFD700'};
  if (score >= 80) return { grade: 'A', label: '훌륭함', color: '#00D9FF'};
  if (score >= 70) return { grade: 'B', label: '좋음', color: '#00FF88'};
  if (score >= 60) return { grade: 'C', label: '보통', color: '#FFA500'};
  return { grade: 'D', label: '개선 필요', color: '#FF6B6B'};
}

// 개선 제안 생성
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

// 점수 표시 모달
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

        <div class="score-item">
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

// 실시간 점수 표시 (미니 버전)
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

  // 실시간 비교 모드일 때 업데이트
  if (typeof compareMode !== 'undefined' && compareMode.liveCompareActive) {
    updateLiveComparison();
  }
}
