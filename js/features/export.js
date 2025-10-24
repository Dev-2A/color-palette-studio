/**
 * Export Functionality
 * 팔레트 내보내기 기능
 * - Export palette to various formats (JSON, CSS, SCSS, Tailwind, JavaScript)
 * - Download files with formatted palette data
 */

// 내보내기 형식별 생성 함수들
const exportFormats = {
  // JSON 형식
  json: function(palette) {
    const data = {
      name: "Color Palette",
      colors: palette.map(hex => {
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return {
          hex: hex,
          rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        };
      }),
      created: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  // CSS 변수 형식
  css: function(palette) {
    let css = ':root {\n';
    css += '  /* Color Palette Studio */\n';
    palette.forEach((color, i) => {
      const rgb = hexToRgb(color);
      css += `  --color-${i + 1}: ${color};\n`;
      css += `  --color-${i + 1}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n`;
    });
    css += '}\n\n';
    css += '/* 사용 예시 */\n';
    css += '.element {\n';
    css += '  background-color: var(--color-1);\n';
    css += '  color: var(--color-2);\n';
    css += '}';
    return css;
  },

  // SCSS 변수 형식
  scss: function(palette) {
    let scss = '// Color Palette Studio\n';
    palette.forEach((color, i) => {
      scss += `$color-${i + 1}: ${color};\n`;
    });
    scss += '\n// 색상 맵\n';
    scss += '$colors: (\n';
    palette.forEach((color, i) => {
      scss += `  "color-${i + 1}": ${color}${i < palette.length - 1 ? ',' : ''}\n`;
    });
    scss += ');\n\n';
    scss += '// 사용 예시\n';
    scss += '// background-color: $color-1;\n';
    scss += '// color: map-get($colors, "color-2");';
    return scss;
  },

  // Tailwind Config 형식
  tailwind: function(palette) {
    let config = '// tailwind.config.js\n';
    config += 'module.exports = {\n';
    config += '  theme: {\n';
    config += '    extend: {\n';
    config += '      colors: {\n';
    config += '        palette: {\n';
    palette.forEach((color, i) => {
      config += `          ${(i + 1) * 100}: "${color}"${i < palette.length - 1 ? ',' : ''}\n`;
    });
    config += '        }\n';
    config += '      }\n';
    config += '    }\n';
    config += '  }\n';
    config += '};\n\n';
    config += '// 사용: bg-palette-100, text-palette-200, etc.';
    return config;
  },

  // JavaScript 배열 형식
  javascript: function(palette) {
    let js = '// Color Palette\n';
    js += `const colors = ${JSON.stringify(palette, null, 2)};\n\n`;
    js += '// RGB 값들\n';
    js += 'const rgbColors = [\n';
    palette.forEach((hex, i) => {
      const rgb = hexToRgb(hex);
      js += `  { r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b} }${i < palette.length - 1 ? ',' : ''}\n`;
    });
    js += '];\n\n';
    js += '// 사용 예시\n';
    js += '// element.style.backgroundColor = colors[0];';
    return js;
  }
};

// 파일 다운로드 함수
function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 내보내기 실행 함수
function exportPalette(format) {
  const timestamp = new Date().toISOString().slice(0, 10);
  const fileExtensions = {
    json: 'json',
    css: 'css',
    scss: 'scss',
    tailwind: 'js',
    javascript: 'js'
  };

  const content = exportFormats[format](currentPalette);
  const filename = `color-palette-${timestamp}.${fileExtensions[format]}`;

  downloadFile(content, filename);
  showToast(`팔레트가 ${format.toUpperCase()} 형식으로 다운로드되었습니다! 📁`);
}

// 내보내기 모달 생성 함수
function createExportModal() {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('exportModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'exportModal';
  modal.className = 'export-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <h3>팔레트 내보내기</h3>
      <p>원하는 형식을 선택하세요:</p>
      <div class="export-options">
        <button class="export-btn" data-format="json">
          <span class="format-icon">{ }</span>
          <span class="format-name">JSON</span>
          <span class="format-desc">데이터 교환용</span>
        </button>
        <button class="export-btn" data-format="css">
          <span class="format-icon">:root</span>
          <span class="format-name">CSS</span>
          <span class="format-desc">웹 프로젝트용</span>
        </button>
        <button class="export-btn" data-format="scss">
          <span class="format-icon">$</span>
          <span class="format-name">SCSS</span>
          <span class="format-desc">Sass 프로젝트용</span>
        </button>
        <button class="export-btn" data-format="tailwind">
          <span class="format-icon">tw</span>
          <span class="format-name">Tailwind</span>
          <span class="format-desc">Tailwind CSS용</span>
        </button>
        <button class="export-btn" data-format="javascript">
          <span class="format-icon">JS</span>
          <span class="format-name">JavaScript</span>
          <span class="format-desc">JS 프로젝트용</span>
        </button>
      </div>
      <button class="modal-close">닫기</button>
    </div>
  `;

  document.body.appendChild(modal);

  // 이벤트 리스너 추가
  modal.querySelector('.modal-backdrop').addEventListener('click', () => {
    modal.remove();
  });

  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.remove();
  });

  modal.querySelectorAll('.export-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      exportPalette(this.dataset.format);
      modal.remove();
    });
  });

  // 모달 표시 애니메이션
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}
