/**
 * Application Entry Point
 * 이벤트 리스너 설정
 * - Initialize palette on page load
 * - Set up button event listeners
 * - Configure keyboard shortcuts
 */

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

  // 미세 조정 리스너 초기화
  initFineTuneListeners();

  // 색상 이름 설정 초기화
  initColorNameSettings();
});
