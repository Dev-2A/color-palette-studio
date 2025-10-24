/**
 * Share Functionality
 * 공유 링크 기능
 * - Generate shareable URLs with palette colors
 * - Load palettes from URL parameters
 */

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
