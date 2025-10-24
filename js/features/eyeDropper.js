/**
 * Eye Dropper API
 * Eye Dropper API를 사용한 색상 추출 기능
 * - Pick colors from screen
 * - Generate new palettes from picked colors
 * - Replace colors in existing palette
 */

// Eye Dropper API 지원 여부 확인
const isEyeDropperSupported = 'EyeDropper' in window;

// 색상 추출 함수
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

// 색상 선택 후 처리 모달
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

// 추출한 색상 처리
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

// 색상 교체 모달
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

// Eye Dropper 버튼 표시/숨김 처리
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

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  initializeEyeDropper();
});
