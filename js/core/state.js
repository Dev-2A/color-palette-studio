//!SECTION - 전역 변수 선언

let currentPalette = [];        // 현재 표시 중인 팔레트
let lockedColors = new Set();   // 잠긴 색상들의 인덱스
let currentMode = 'random';     // 현재 색상 조화 모드
let currentTheme = null;        // 현재 선택된 테마
let currentFilter = 'all';      // 현재 필터 (all, 태그명)
let searchQuery = '';           // 검색어

// 인기 태그 프리셋
const popularTags = [
  '웹사이트', '앱', '브랜딩', '로고', '포스터',
  '밝음', '어두움', '모던', '빈티지', '미니멀',
  '여름', '겨울', '가을', '봄',
  '비즈니스', '크리에이티브', '자연', '도시'
];
