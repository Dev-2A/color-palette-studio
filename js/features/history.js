/**
 * History Management
 * 실행 취소/다시 실행 기능
 * - Undo/Redo functionality for palette changes
 * - History viewer modal
 * - Jump to specific history point
 */

// 히스토리 관리를 위한 전역 변수
const paletteHistory = {
  undoStack: [],        // 이전 상태들
  redoStack: [],        // 다시 실행할 상태들
  maxHistorySize: 50,  // 최대 히스토리 크기
  isRestoring: false  // 복원 중 플래그
};

// 현재 팔레트 상태를 히스토리에 추가
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

// 실행 취소 (Undo)
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

// 다시 실행 (Redo)
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

// 상태 복원
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

// 히스토리 UI 업데이트
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

// 히스토리 초기화
function clearHistory() {
  paletteHistory.undoStack = [];
  paletteHistory.redoStack = [];
  updateHistoryUI();
  showToast('히스토리가 초기화되었습니다! 🗑');
}

// 히스토리 뷰어 모달
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

// 특정 히스토리 시점으로 이동
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
