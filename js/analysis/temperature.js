/**
 * Color Temperature Analysis
 * 색상 온도 분석 함수
 * - Classify colors as warm, cool, or neutral
 * - Calculate color temperature based on hue
 */

// 색상 온도 계산 (따뜻한 색 vs 차가운 색)
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

// 색상이 중립인지 판단 (회색 계열)
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

// 통합 온도 분석
function analyzeColorTemperature(hex) {
  // 먼저 중립 색상인지 체크
  const neutral = isNeutralColor(hex);
  if (neutral) return neutral;

  return getColorTemperature(hex);
}
