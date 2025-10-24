/**
 * Palette Storage
 * 팔레트 저장 및 불러오기
 * - Save palettes with names and tags
 * - Load saved palettes from localStorage
 * - Filter and search palettes
 * - Delete saved palettes
 */

// 팔레트 저장 모달 생성
function showSavePaletteModal() {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('savePaletteModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content save-palette-modal">
      <h3>💾 팔레트 저장</h3>
      <p>팔레트에 이름과 태그를 추가하세요</p>

      <!-- 팔레트 이름 입력 -->
      <div class="input-group">
        <label for="paletteName">팔레트 이름 (선택사항)</label>
        <input
          type="text"
          id="paletteName"
          placeholder="예: 여름 바다 테마"
          maxlength="50"
          class="palette-name-input"
        >
      </div>

      <!-- 태그 입력 -->
      <div class="input-group">
        <label for="paletteTagInput">태그 추가 (선택사항)</label>
        <div class="tag-input-wrapper">
          <input
            type="text"
            id="paletteTagInput"
            placeholder="태그 입력 후 Enter"
            class="tag-input"
          >
          <button class="add-tag-btn" onclick="addTagFromInput()">+</button>
        </div>
        <div class="selected-tags" id="selectedTags"></div>
      </div>

      <!-- 인기 태그 -->
      <div class="input-group">
        <label>인기 태그</label>
        <div class="popular-tags">
          ${popularTags.map(tag => `
            <button class="popular-tag-btn" onclick="addPopularTag('${tag}')">
              ${tag}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- 버튼 -->
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="confirmSavePalette()">
          저장
        </button>
        <button class="modal-close" onclick="closeSavePaletteModal()">
          취소
        </button>
      </div>
    </div>
  `;

  const modalElement = document.createElement('div');
  modalElement.id = 'savePaletteModal';
  modalElement.className = 'export-modal';
  modalElement.innerHTML = modalHTML;

  document.body.appendChild(modalElement);

  // 태그 입력 엔터키 이벤트
  const tagInput = document.getElementById('paletteTagInput');
  tagInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTagFromInput();
    }
  });

  // 모달 표시 애니메이션
  setTimeout(() => {
    modalElement.classList.add('show');
  }, 10);
}

// 선택된 태그 배열
let selectedTags = [];

// 입력란에서 태그 추가
function addTagFromInput() {
  const input = document.getElementById('paletteTagInput');
  const tag = input.value.trim();

  if (tag && !selectedTags.includes(tag)) {
    selectedTags.push(tag);
    updateSelectedTagsDisplay();
    input.value = '';
  }
}

// 인기 태그 추가
function addPopularTag(tag) {
  if (!selectedTags.includes(tag)) {
    selectedTags.push(tag);
    updateSelectedTagsDisplay();
  }
}

// 선택된 태그 표시 업데이트
function updateSelectedTagsDisplay() {
  const container = document.getElementById('selectedTags');
  if (!container) return;

  if (selectedTags.length === 0) {
    container.innerHTML = '<span class="no-tags">선택된 태그가 없습니다</span>';
    return;
  }

  container.innerHTML = selectedTags.map(tag => `
    <span class="selected-tag">
      ${tag}
      <button class="remove-tag-btn" onclick="removeSelectedTag('${tag}')">×</button>
    </span>
  `).join('');
}

// 선택된 태그 제거
function removeSelectedTag(tag) {
  selectedTags = selectedTags.filter(t => t !== tag);
  updateSelectedTagsDisplay();
}

// 저장 확인
function confirmSavePalette() {
  const nameInput = document.getElementById('paletteName');
  const name = nameInput ? nameInput.value.trim() : '';

  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  // 중복 체크
  const isDuplicate = saved.some(palette =>
    JSON.stringify(palette.colors) === JSON.stringify(currentPalette)
  );

  if (isDuplicate) {
    showToast('이미 저장된 팔레트입니다! 🎨');
    closeSavePaletteModal();
    return;
  }

  // 새 팔레트 추가
  saved.unshift({
    colors: currentPalette,
    timestamp: Date.now(),
    name: name || null,
    tags: [...selectedTags],
    mode: currentMode,
    theme: currentTheme
  });

  // 최대 20개까지만 저장
  if (saved.length > 20) {
    saved.pop();
  }

  localStorage.setItem('savedPalettes', JSON.stringify(saved));

  // 초기화
  selectedTags = [];

  loadSavedPalettes();
  closeSavePaletteModal();
  showToast('팔레트가 저장되었습니다! 💾')
}

// 저장 모달 닫기
function closeSavePaletteModal() {
  const modal = document.getElementById('savePaletteModal');
  if (modal) {
    modal.remove();
  }
  selectedTags = [];
}

// 팔레트 저장
function savePalette() {
  showSavePaletteModal();
}

// 저장된 팔레트 불러오기
function loadSavedPalettes() {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  if (saved.length === 0) {
    elements.savedPalettes.innerHTML =
      '<div class="empty-state">저장된 팔레트가 없습니다. 마음에 드는 팔레트를 저장해보세요!</div>'
    return;
  }

  // 필터링 및 검색
  let filtered = saved;

  // 태그 필터
  if (currentFilter !== 'all') {
    filtered = filtered.filter(palette =>
      palette.tags && palette.tags.includes(currentFilter)
    );
  }

  // 검색
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(palette => {
      const name = palette.name ? palette.name.toLowerCase() : '';
      const tags = palette.tags ? palette.tags.join(' ').toLowerCase() : '';
      return name.includes(query) || tags.includes(query);
    });
  }

  // 필터/검색 UI 생성
  const filterHTML = createFilterUI(saved);

  if (filtered.length === 0) {
    elements.savedPalettes.innerHTML =
      filterHTML +
      '<div class="empty-state">조건에 맞는 팔레트가 없습니다.</div>';
    return;
  }

  // 팔레트 카드 생성
  const palettesHTML = filtered.map((palette, index) => {
    const originalIndex = saved.indexOf(palette);

    return `
      <div class="saved-palette" onclick="loadPalette(${originalIndex})">
        <!-- 색상 표시 -->
        <div class="saved-colors">
          ${palette.colors.map(color => `
            <div class="saved-color" style="background: ${color};" title="${color}"></div>
          `).join('')}
        </div>

        <!-- 팔레트 정보 -->
        <div class="palette-info">
          ${palette.name ? `<div class="palette-name">${palette.name}</div>` : ''}

          ${palette.tags && palette.tags.length > 0 ? `
            <div class="palette-tags">
              ${palette.tags.slice(0, 3).map(tag => `
                <span class="palette-tag">${tag}</span>
              `).join('')}
              ${palette.tags.length > 3 ? `<span class="more-tags">+${palette.tags.length - 3}</span>` : ''}
            </div>
          ` : ''}

          <div class="palette-meta">
            <span class="palette-date">${new Date(palette.timestamp).toLocaleDateString('ko-KR')}</span>
            ${palette.mode ? `<span class="palette-mode">${getModeLabel(palette.mode)}</span>` : ''}
            ${palette.theme ? `<span class="palette-theme">${getThemeLabel(palette.theme)}</span>` : ''}
          </div>
        </div>

        <!-- 삭제 버튼 -->
        <button class="delete-saved" onclick="event.stopPropagation(); deletePalette(${originalIndex})">
          ×
        </button>
      </div>
    `;
  }).join('');

  elements.savedPalettes.innerHTML = filterHTML + palettesHTML;
}

// 필터/검색 UI 생성
function createFilterUI(allPalettes) {
  // 모든 태그 수집
  const allTags = new Set();
  allPalettes.forEach(palette => {
    if (palette.tags) {
      palette.tags.forEach(tag => allTags.add(tag));
    }
  });

  const tagButtons = Array.from(allTags)
    .sort()
    .map(tag => {
      const count = allPalettes.filter(p => p.tags && p.tags.includes(tag)).length;
      return `
        <button
          class="filter-tag ${currentFilter === tag ? 'active' : ''}"
          onclick="filterByTag('${tag}')"
        >
          ${tag} (${count})
        </button>
      `;
    }).join('');

  return `
    <div class="palette-filters">
      <!-- 검색 -->
      <div class="search-wrapper">
        <input
          type="text"
          class="search-input"
          placeholder="팔레트 검색..."
          value="${searchQuery}"
          oninput="searchPalettes(this.value)"
        >
        <span class="search-icon">🔍</span>
      </div>

      <!-- 태그 필터 -->
      <div class="filter-tags">
        <button
          class="filter-tag ${currentFilter === 'all' ? 'active' : ''}"
          onclick="filterByTag('all')"
        >
          전체 (${allPalettes.length})
        </button>
        ${tagButtons}
      </div>

      <!-- 정렬 옵션 -->
      <div class="sort-options">
        <select class="sort-select" onchange="sortPalettes(this.value)">
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="name">이름순</option>
        </select>
      </div>
    </div>
  `;
}

// 태그로 필터링
function filterByTag(tag) {
  currentFilter = tag;
  loadSavedPalettes();
}

// 검색
function searchPalettes(query) {
  searchQuery = query;
  loadSavedPalettes();
}

// 정렬
function sortPalettes(sortType) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');

  if (sortType === 'oldest') {
    saved.reverse();
  } else if (sortType === 'name') {
    saved.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB);
    });
  }

  localStorage.setItem('savedPalettes', JSON.stringify(saved));
  loadSavedPalettes();
}

// 모드 라벨 가져오기
function getModeLabel(mode) {
  const labels = {
    random: '랜덤',
    complementary: '보색',
    analogous: '유사색',
    triadic: '삼각색',
    monochromatic: '단색조'
  };
  return labels[mode] || mode;
}

// 테마 라벨 가져오기
function getThemeLabel(theme) {
  if (colorThemes[theme]) {
    return colorThemes[theme].icon + ' ' + colorThemes[theme].name;
  }
  return theme;
}

// 팔레트 불러오기
function loadPalette(index) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  if (saved[index]) {
    currentPalette = saved[index].colors;
    lockedColors.clear();
    displayPalette();
    showToast('팔레트를 불러왔습니다! 🎨');
  }
}

// 팔레트 삭제
function deletePalette(index) {
  const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
  saved.splice(index, 1);
  localStorage.setItem('savedPalettes', JSON.stringify(saved));
  loadSavedPalettes();
  showToast('팔레트가 삭제되었습니다.');
}
