/**
 * Harmony Generators
 * 색상 조화 생성 함수들
 * - Complementary color palette generation
 * - Analogous color palette generation
 * - Triadic color palette generation
 * - Monochromatic color palette generation
 * - Theme-based palette generation
 */

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
function generateAnalogous(baseColor) {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [baseColor];

  // 인접한 색상들 (30도씩)
  for (let i = 1; i < 5; i++) {
    let newHue = (hsl.h + (i * 30) - 60) % 360;
    if (newHue < 0) newHue += 360;
    const newSat = Math.max(20, Math.min(100, hsl.s + (Math.random() - 0.5) * 10));
    const newLight = Math.max(20, Math.min(80, hsl.l + (Math.random() - 0.5) * 15));
    colors.push(hslToHex(newHue, newSat, newLight));
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

    // 실시간 비교 모드일 때 업데이트
    if (typeof compareMode !== 'undefined' && compareMode.liveCompareActive) {
      setTimeout(() => updateLiveComparison(), 100);
    }

    showToast(`${colorThemes[theme].icon} ${colorThemes[theme].name} 테마 팔레트 생성!`);
  } else {
    // 테마 해제
    currentTheme = null;
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }
}
