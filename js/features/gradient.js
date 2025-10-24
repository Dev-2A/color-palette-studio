/**
 * Gradient Generator
 * 그라디언트 생성기
 * - Create linear, radial, and conic gradients
 * - Customize gradient angles and shapes
 * - Export gradients as CSS or images
 * - Apply preset gradient styles
 */

// 그라디언트 설정 상태
let gradientSettings = {
  type: 'linear',         // linear, radial, conic
  angle: 90,              // 각도 (linear)
  shape: 'circle',        // circle, ellipse (radial)
  position: 'center',     // 위치 (radial, conic)
  colors: [],             // 사용할 색상들
  colorStops: []          // 색상 정지점들
};

// 그라디언트 모달 생성
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

// 그라디언트 이벤트 리스너 설정
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

// 그라디언트 프리뷰 업데이트
function updateGradientPreiew() {
  const preview = document.getElementById('gradientPreview');
  const codeOutput = document.getElementById('gradientCode');

  if (!preview || !codeOutput) return;

  const gradient = generateGradientCSS();
  preview.style.background = gradient;
  codeOutput.textContent = `background: ${gradient};`;
}

// CSS 그라디언트 생성
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

// 그라디언트 프리셋 적용
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

// 그라디언트 CSS 복사
function copyGradientCSS() {
  const gradient = generateGradientCSS();
  const fullCSS = `background: ${gradient};`;

  copyToClipboard(fullCSS);
  showToast('그라디언트 CSS가 복사되었습니다! 🎨');
}

// 그라디언트를 팔레트 배경에 적용 (미리보기)
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

// 그라디언트 이미지로 다운로드
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
