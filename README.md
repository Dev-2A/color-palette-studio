# 🎨 Color Palette Studio

> 디자이너와 개발자를 위한 올인원 색상 팔레트 생성 및 관리 도구

![Version](https://img.shields.io/badge/version-2.5.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/Chrome-95%2B-green.svg)
![Edge](https://img.shields.io/badge/Edge-95%2B-green.svg)

## ✨ 소개

Color Palette Studio는 웹 디자인과 개발에 필요한 조화로운 색상 팔레트를 쉽고 빠르게 생성할 수 있는 강력한 도구입니다. 색상 이론에 기반한 다양한 조화 모드와 함께, 색상 추출, 그라디언트 생성, 다양한 포맷 내보내기 등 프로페셔널한 기능을 제공합니다.

## 🚀 주요 기능

### 🎲 색상 팔레트 생성
- **5가지 색상 조화 모드**
  - 랜덤: 완전히 무작위로 5개의 색상 생성
  - 보색 (Complementary): 색환의 반대편 색상들로 강한 대비
  - 유사색 (Analogous): 인접한 색상들로 조화로운 구성
  - 삼각색 (Triadic): 색환에서 정삼각형을 이루는 색상
  - 단색조 (Monochromatic): 같은 색조의 명도 변화

### 🔄 팔레트 비교 모드 `v2.5 NEW`
- **두 팔레트 동시 비교**
  - 나란히 배치된 색상 카드
  - HEX, RGB, HSL 코드 표시
  - 각 팔레트의 분석 요약
- **상세 비교 분석**
  - 종합 점수 승패 판정
  - 대비/조화/접근성 점수 비교
  - 시각적 막대 그래프
  - 맞춤형 인사이트 제공
- **저장된 팔레트 선택**
  - 팔레트 미리보기 그리드
  - 이름, 태그, 날짜 정보
  - 즉시 선택 및 비교
- **활용 사례**
  - A/B 테스트
  - 버전 비교
  - 경쟁사 분석
  - 시즌별 비교

### 🎨 색상 미세 조정 슬라이더 `v2.5 NEW`
- **실시간 HSL 조정**
  - 색조 (Hue): 0°-360°
  - 채도 (Saturation): 0%-100%
  - 명도 (Lightness): 0%-100%
- **시각적 피드백**
  - 실시간 미리보기 (150px)
  - 그라디언트 슬라이더 배경
  - HEX, RGB, HSL 값 표시
- **빠른 조정 가능**
  - ☀ 밝게 (+10%)
  - 🌙 어둡게 (-10%)
  - 🎨 채도 증가 (+15%)
  - ⚪ 채도 감소 (-15%)
  - 🔄 보색 (+180°)
  - ↺ 원래대로 (초기화)
- **사용 방법**
  - 색상 카드 더블 클릭
  - 슬라이더 드래그 또는 버튼 클릭
  - 적용 또는 취소

### 🏷 색상 이름 표시 `v2.5 NEW`
- **다국어 색상 이름**
  - 🇰🇷 한국어: 140개 색상 이름
  - 🇺🇸 English: 140개 색상 이름
- **지능형 매칭**
  - HSL 기반 자동 판별
  - 색조/채도/명도 범위 분석
  - 점수 기반 최적 매칭
- **포함된 색상군**
  - 빨강/주황/노랑 계열
  - 초록/파랑/보라 계열
  - 갈색/무채색 계열
  - 베이지/중립 계열
- **사용자 설정**
  - 토글 버튼으로 표시/숨김
  - 언어 전환 버튼
  - 설정 자동 저장

### 🌡 색상 온도 분석 `v2.3`
- **3가지 색상 분류**: 따뜻한 색(🔥) / 차가운 색(❄) / 중립 색(⚪)
- 실시간 온도 아이콘 표시 (색상 카드 좌측 상단)
- 색상 이론 기반 자동 분류 (HSL 색조 값 분석)
- 디자인 분위기 파악에 유용
- 호버 시 확대 효과로 직관적 인터페이스
- **온도 분류 기준:**
  - 🔥 따뜻한 색: 0-60°, 300-360° (빨강-노랑 계열)
  - ❄ 차가운 색: 61-299° (초록-파랑-보라 계열)
  - ⚪ 중립 색상: 채도 < 15% (회색, 베이지 계열)

### 🎨 랜덤 테마 프리셋 `v2.4`
- **8가지 테마로 즉시 팔레트 생성**
   - 🌸 파스텔: 부드럽고 은은한 색감 (S: 20-50%, L: 70-90%)
   - ⚡ 네온: 강렬하고 눈부신 색감 (S: 80-100%, L: 50-70%)
   - 🌿 자연: 자연스러운 흙과 나무 색 (갈색/초록 계열)
   - 🌊 바다: 시원한 바다와 하늘 색 (청록-파랑 계열)
   - 🌌 우주: 신비로운 우주 색감 (어두운 파랑-보라)
   - 🌅 석양: 따뜻한 노을 색감 (주황-분홍 계열)
   - 🌲 숲: 깊은 숲의 초록빛 (짙은 초록 계열)
   - 🍭 캔디: 달콤한 사탕 색감 (밝고 채도 높음)
- 테마별 HSL 값 자동 조정
- 색상 잠금과 함께 사용 가능
- 조화 모드와 독립적으로 작동

### 🏷 팔레트 태그/카테고리 시스템 `v2.4`
- **팔레트 저장 시 메타데이터 추가**
   - 팔레트 이름 설정 (최대 50자)
   - 태그 무제한 추가 (Enter로 입력)
   - 18개 인기 태그 프리셋
- **강력한 필터링 및 검색**
   - 태그별 필터링 (개수 표시)
   - 실시간 검색 (이름/태그)
   - 정렬 옵션 (최신순/오래된순/이름순)
- **향상된 팔레트 카드**
   - 이름, 태그, 날짜 표시
   - 조화 모드 및 테마 정보
   - 최대 3개 태그 표시, 이후 "+N" 표시
- **인기 태그 목록**: 웹사이트, 앱, 브랜딩, 로고, 포스터, 밝음, 어두움, 모던, 빈티지, 미니멀, 계절별 등

### 👁 색각 이상 시뮬레이션 `v2.4`
- **5가지 색각 이상 타입 지원**
   - 👁 보편 시력: 보편적인 색상 인식
   - 🔴 적색약 (Protanopia): 빨강 구분 어려움 (남성 1%)
   - 🟢 녹색약 (Deuteranopia): 초록 구분 어려움 (남성 1%)
   - 🔵 청색약 (Tritanopia): 파랑 구분 어려움 (0.001%)
   - ⚫ 전색맹 (Achromatopsia): 모든 색 구분 어려움 (0.003%)
- **과학적으로 검증된 알고리즘**
   - Brettel, Viénot and Mollon (1997) 알고리즘 적용
   - LMS 색공간 기반 정확한 시뮬레이션
   - LAB 색공간의 Delta E로 지각적 차이 계산
- **색상 구분 가능성 점수 (0-100%)**
   - Delta E 기준: >2.3 (구분 가능), 1.0-2.3 (주의), <1.0 (불가능)
   - 실시간 점수 계산 및 시각화
   - 점수별 색상 변화 (초록/주황/빨강)
- **맞춤형 개선 제안**
   - 타입별 최적화 팁
   - 문제 있는 색상 쌍 식별
   - WCAG 접근성 가이드라인 기반
- **모든 필터 비교 모드**
   - 5가지 타입을 한 화면에 표시
   - 각 타입별 실시간 필터 적용
   - 한 눈에 접근성 확인

### 🎯 팔레트 분석 & 점수 시스템 `v2.2`
- **5가지 평가 기준으로 과학적 분석**
  - 대비(Contrast): 색상 간 적절한 대비 비율
  - 조화(Harmony): 색상환에서의 조화로운 관계
  - 균형(Balance): 명도와 채도의 균등한 분포
  - 다양성(Diversity): 색조, 채도, 명도의 다양성
  - 접근성(Accessibility): WCAG 2.1 가독성 기준
- **실시간 점수 배지**: 우측 하단에 항상 표시
- **등급 시스템**: S(완벽) > A(훌륭) > B(좋음) > C(보통) > D(개선필요)
- **맞춤형 개선 제안**: AI가 제공하는 구체적인 개선 방향
- **시각적 분석 리포트**: 원형 차트와 막대 그래프로 직관적 표현

### 💉 색상 추출 (Eye Dropper API) `v2.0`
- 화면의 모든 곳에서 색상 추출 가능
- 추출한 색상으로 즉시 새 팔레트 생성
- 기존 팔레트의 특정 색상 교체
- **지원 브라우저**: Chrome 95+, Edge 95+, Opera 81+

### 🌈 그라디언트 생성기 `v2.1`
- **3가지 그라디언트 타입**: Linear, Radial,Conic
- 실시간 미리보기 및 각도 조절 (0-360°)
- 8방향 빠른 프리셋 버튼
- 프리셋 스타일 (석양, 바다, 오로라, 불꽃)
- CSS 코드 자동 생성 및 원클릭 복사
- PNG 이미지로 다운로드 (1920x1080)
- 팔레트 배경에 그라디언트 적용 미리보기

### ↩ 실행 취소/다시 실행 `v2.1`
- **최대 50개 팔레트 히스토리 저장**
- 실시간 히스토리 카운트 표시
- 시각적 타임라인 인터페이스
- 특정 시점으로 즉시 이동 (타임 트래블)
- 색상 잠금 상태와 조화 모드도 함께 저장/복원
- 히스토리 통계 대시보드
- 히스토리 초기화 기능

### 📥 팔레트 내보내기 `v2.0`
다양한 형식으로 팔레트 내보내기 지원:
- **JSON**: 데이터 교환 및 API 연동용
- **CSS Variables**: 웹 프로젝트 바로 적용
- **SCSS**: Sass 프로젝트용 변수 및 맵
- **Tailwind Config**: Tailwind CSS 설정 파일
- **JavaScript**: JS 배열 및 객체 형식

### 🔗 팔레트 공유 `v2.0`
- URL로 팔레트 즉시 공유
- 자동 클립보드 복사
- 공유받은 링크로 팔레트 자동 로드

### 💾 기본 기능
- 🔒 **색상 잠금**: 마음에 드는 색상 고정
- 📋 **원클릭 복사**: HEX, RGB, HSL 코드 지원
- 💾 **팔레트 저장**: 최대 20개 로컬 저장
- 📱 **반응형 디자인**: 모든 디바이스 지원

## ⌨️ 키보드 단축키

| 단축키 | 기능 | 설명 |
|--------|------|------|
| `Space` | 새 팔레트 생성 | 현재 모드로 새로운 색상 조합 생성 |
| `Ctrl+S` | 팔레트 저장 | 현재 팔레트를 로컬 저장소에 저장 |
| `Ctrl+Z` | 실행 취소 | 이전 팔레트로 되돌리기 |
| `Ctrl+Y` | 다시 실행 | 취소한 작업 다시 실행 |
| `Ctrl+Shift+Z` | 다시 실행 (Mac) | Mac에서 다시 실행 |
| `Ctrl+H` | 히스토리 보기 | 팔레트 히스토리 모달 열기 |
| `더블 클릭` | 색상 미세 조정 | 색상 카드 더블 클릭으로 HSL 조정 패널 열기 |

## 📁 프로젝트 구조

### 🎯 모듈화된 파일 구조 (v2.5.1)

프로젝트는 **기능별로 분리된 모듈 구조**로 설계되어 유지보수와 확장이 용이합니다.

```
color-palette-studio/
│
├── index.html                          # HTML 메인 파일
│
├── css/                                # 스타일시트 (총 16개 파일)
│   ├── base/                          # 기본 설정 (2개)
│   │   ├── variables.css              # CSS 변수 및 테마 설정
│   │   └── reset.css                  # 기본 레이아웃 및 리셋
│   │
│   ├── layout/                        # 레이아웃 (1개)
│   │   └── header.css                 # 헤더 스타일
│   │
│   ├── components/                    # UI 컴포넌트 (4개)
│   │   ├── buttons.css                # 모든 버튼 스타일
│   │   ├── palette.css                # 팔레트 & 색상 카드
│   │   ├── saved-palettes.css         # 저장된 팔레트
│   │   └── toast.css                  # 토스트 메시지
│   │
│   ├── features/                      # 기능별 스타일 (7개)
│   │   ├── export.css                 # 내보내기 모달
│   │   ├── eyedropper.css             # Eye Dropper
│   │   ├── gradient.css               # 그라디언트 생성기
│   │   ├── history.css                # 히스토리
│   │   ├── scoring.css                # 점수 분석
│   │   ├── comparison.css             # 팔레트 비교
│   │   └── colorblindness.css         # 색각 이상 시뮬레이션
│   │
│   └── utils/                         # 유틸리티 (2개)
│       ├── responsive.css             # 반응형 디자인
│       └── utilities.css              # 공통 유틸리티 클래스
│
├── js/                                # JavaScript (총 19개 파일)
│   ├── core/                          # 핵심 상태 관리 (1개)
│   │   └── state.js                   # 전역 변수 및 상태
│   │
│   ├── utils/                         # 유틸리티 함수 (3개)
│   │   ├── domUtils.js                # DOM 요소 참조
│   │   ├── colorUtils.js              # 색상 변환 (HEX↔RGB↔HSL)
│   │   └── generalUtils.js            # 클립보드, 토스트 등
│   │
│   ├── generators/                    # 색상 생성기 (2개)
│   │   ├── harmonyGenerators.js       # 색상 조화 알고리즘
│   │   └── paletteGenerator.js        # 팔레트 생성 및 표시
│   │
│   ├── storage/                       # 데이터 저장 (1개)
│   │   └── paletteStorage.js          # 로컬 저장/불러오기
│   │
│   ├── features/                      # 주요 기능 (8개)
│   │   ├── export.js                  # 5가지 포맷 내보내기
│   │   ├── share.js                   # URL 공유
│   │   ├── eyeDropper.js              # 색상 추출 (Eye Dropper API)
│   │   ├── gradient.js                # 그라디언트 생성기
│   │   ├── history.js                 # 실행 취소/다시 실행
│   │   ├── comparison.js              # 팔레트 비교 모드
│   │   ├── finetuning.js              # 색상 미세 조정 슬라이더
│   │   └── colorNames.js              # 색상 이름 표시
│   │
│   ├── analysis/                      # 분석 기능 (3개)
│   │   ├── temperature.js             # 색상 온도 분석
│   │   ├── scoring.js                 # 팔레트 점수 시스템
│   │   └── colorBlindness.js          # 색각 이상 시뮬레이션
│   │
│   └── app.js                         # 앱 초기화 및 이벤트 리스너
│
├── backup/                            # 백업 파일
│   ├── script.js.backup               # 원본 script.js (171KB)
│   └── styles.css.backup              # 원본 styles.css (71KB)
│
└── README.md                          # 프로젝트 문서
```

### 🔧 파일 구조 개선 이점

**1. 모듈화 (Modularity)**
- 각 파일이 단일 책임만 담당
- 기능별로 명확하게 분리
- 새 기능 추가 시 해당 폴더에만 파일 추가

**2. 유지보수성 (Maintainability)**
- 버그 수정 시 관련 파일만 확인
- 코드 충돌 최소화
- 명확한 파일 이름으로 빠른 탐색

**3. 성능 (Performance)**
- 필요한 모듈만 선택적 로드 가능 (향후)
- 병렬 다운로드로 로딩 속도 향상
- 브라우저 캐싱 최적화

**4. 협업 (Collaboration)**
- 여러 개발자가 동시에 작업 가능
- Git 머지 충돌 감소
- 명확한 파일 구조로 온보딩 용이

**5. 확장성 (Scalability)**
- 새로운 기능 추가 시 기존 코드 영향 최소화
- 플러그인 형태로 기능 추가 가능
- 테스트 및 디버깅 용이

### 📦 파일 크기 최적화

| 구분 | 기존 (v2.5.0) | 현재 (v2.5.1) | 개선 |
|------|---------------|---------------|------|
| **JavaScript** | 1개 파일 (171KB) | 19개 파일 (171KB) | ✅ 모듈화 |
| **CSS** | 1개 파일 (71KB) | 16개 파일 (71KB) | ✅ 모듈화 |
| **총 파일 수** | 2개 | 35개 | ✅ 관리 용이 |
| **평균 파일 크기** | 121KB | 6.9KB | ✅ 90% 감소 |

### 🗂️ 파일별 역할 상세 설명

#### JavaScript 모듈

**Core & Utils (4개)**
- `state.js` (688B): 전역 변수, 팔레트 상태, 테마/모드 관리
- `domUtils.js` (366B): DOM 요소 캐싱 및 참조
- `colorUtils.js` (1.7KB): HEX↔RGB↔HSL 변환 알고리즘
- `generalUtils.js` (1.4KB): 클립보드, 토스트, 모드 전환

**Generators (2개)**
- `harmonyGenerators.js` (7.0KB): 보색/유사색/삼각색/단색조/테마 생성
- `paletteGenerator.js` (5.2KB): UI 렌더링, 색상 카드 생성

**Storage (1개)**
- `paletteStorage.js` (12KB): 로컬 저장소, 태그/필터/검색 시스템

**Features (8개)**
- `export.js` (6.4KB): JSON/CSS/SCSS/Tailwind/JS 내보내기
- `share.js` (1.6KB): URL 공유 링크 생성
- `eyeDropper.js` (7.3KB): Eye Dropper API, 색상 교체
- `gradient.js` (14KB): Linear/Radial/Conic 그라디언트
- `history.js` (7.7KB): 실행 취소/다시 실행, 타임라인
- `comparison.js` (35KB): 팔레트 비교, 실시간 비교
- `finetuning.js` (13KB): HSL 슬라이더 미세 조정
- `colorNames.js` (26KB): 한/영 색상 이름 매칭

**Analysis (3개)**
- `temperature.js` (1.4KB): 따뜻함/차가움/중립 온도 분석
- `scoring.js` (15KB): 5가지 평가 기준, 등급 시스템
- `colorBlindness.js` (18KB): Brettel 알고리즘, Delta E 계산

**App (1개)**
- `app.js` (1.9KB): 이벤트 리스너, 키보드 단축키, 초기화

#### CSS 모듈

**Base (2개)**
- `variables.css`: CSS 변수 (색상, 간격, 폰트)
- `reset.css`: 브라우저 기본 스타일 초기화

**Layout (1개)**
- `header.css`: 헤더, 타이틀, 그라디언트 효과

**Components (4개)**
- `buttons.css`: 모든 버튼, 모드 선택자, 테마 버튼
- `palette.css`: 팔레트 컨테이너, 색상 카드, 잠금 버튼
- `saved-palettes.css`: 저장 모달, 필터, 검색, 팔레트 그리드
- `toast.css`: 토스트 메시지 애니메이션

**Features (7개)**
- `export.css`: 내보내기 모달, 포맷 선택
- `eyedropper.css`: Eye Dropper 모달, 색상 교체
- `gradient.css`: 그라디언트 생성기, 프리셋
- `history.css`: 히스토리 타임라인, 통계
- `scoring.css`: 점수 배지, 분석 모달, 차트
- `comparison.css`: 비교 모달, 실시간 패널
- `colorblindness.css`: 색각 이상 시뮬레이션, 필터

**Utils (2개)**
- `responsive.css`: 미디어 쿼리, 모바일 대응
- `utilities.css`: 공통 클래스, 스크롤바, 닫기 버튼

## 🛠️ 설치 및 실행

### 방법 1: 직접 실행
1. 프로젝트 파일을 다운로드합니다.
2. `index.html` 파일을 웹 브라우저에서 엽니다.

### 방법 2: 로컬 서버 사용 (권장)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# VS Code
# Live Server 확장 프로그램 설치 후
# 우클릭 → Open with Live Server
```

## 🎮 사용법

### 기본 조작
| 동작 | 방법 |
|------|------|
| 새 팔레트 생성 | `🎲 새 팔레트 생성` 버튼 또는 `Space` |
| 팔레트 분석 | `🎯 팔레트 분석` 버튼 또는 점수 배지 클릭 |
| 색맹 모드 | `👁 색맹 모드` 버튼 클릭 |
| 색상 온도 확인 | 색상 카드 좌측 상단 아이콘 (🔥/❄/⚪) 호버 |
| 색상 복사 | 색상 카드 또는 코드 클릭 |
| 색상 잠금/해제 | 자물쇠 아이콘 클릭 |
| 팔레트 저장 | `💾 팔레트 저장` 버튼 또는 `Ctrl+S` |
| 팔레트 검색 | 저장된 팔레트 섹션의 검색창 사용 |
| 태그 필터링 | 태그 버튼 클릭 |
| 실행 취소 | `↩ 취소` 버튼 또는 `Ctrl+Z` |
| 다시 실행 | `↪ 다시` 버튼 또는 `Ctrl+Y` |
| 히스토리 보기 | `📜 히스토리` 버튼 또는 `Ctrl+H` |
| 색상 추출 | `💉 색상 추출` 버튼 (Chrome/Edge) |
| 그라디언트 생성 | `🌈 그라디언트` 버튼 |
| 팔레트 내보내기 | `📥 내보내기` 버튼 |
| 팔레트 공유 | `🔗 공유` 버튼 |

### 고급 기능 활용

#### 🎨 랜덤 테마 프리셋
1. **테마 선택**: 8가지 테마 버튼 중 클릭
2. **테마 별 특징:**
   - 🌸 **파스텔**: 웨딩, 베이비샤워, 여성 브랜드
   - ⚡ **네온**: 클럽, 게임, 청소년 타겟
   - 🌿 **자연**: 친환경 브랜드, 농산물, 아웃도어
   - 🌊 **바다**: 여행사, 수영장, 해양 스포츠
   - 🌌 **우주**: SF, 기술, 미래지향적 브랜드
   - 🌅 **석양**: 카페, 레스토랑, 로맨틱
   - 🌲 **숲**: 자연, 힐링, 명상 앱
   - 🍭 **캔디**: 어린이 브랜드, 파티, 축제
3. **테마 + 색상 잠금**: 기준 색상 잠금 후 테마 선택 가능
4. **테마 해제**: 조화 모드(보색/유사색 등) 선택 시 자동 해제
5. `Space` 키로 같은 테마의 다른 조합 생성

#### 🏷 팔레트 태그/카테고리
1. **팔레트 저장 시:**
   - 이름 입력 (예: "여름 바다 테마")
   - 태그 입력 후 Enter (예: "웹사이트", "밝음")
   - 인기 태그 클릭으로 빠른 추가
   - 선택된 태그는 X 버튼으로 제거
2. **저장된 팔레트 관리:**
   - **검색**: 이름이나 태그로 실시간 검색
   - **필터**: 태그 버튼 클릭으로 필터링
   - **정렬**: 최신순/오래된순/이름순
3. **팔레트 카드 정보:**
   - 이름, 태그, 날짜
   - 조화 모드 (랜덤/보색/유사색 등)
   - 테마 정보 (파스텔/네온 등)
4. **활용 시나리오:**
   - 프로젝트별 정리: "프로젝트A", "클라이언트B"
   - 용도별 분류: "웹사이트", "앱", "로고"
   - 분위기별: "밝음", "어두움", "모던", "빈티지"
   - 계절별: "봄", "여름", "가을", "겨울"

#### 👁 색각 이상 시뮬레이션
1. **기본 사용:**
   - `👁 색맹 모드` 버튼 클릭
   - 5가지 타입 중 선택
   - 원본 vs 시뮬레이션 비교
2. **점수 해석:**
   - **90-100%**: 완벽 - 모든 색상 구분 가능 ✨
   - **70-89%**: 좋음 - 일부 주의 필요
   - **50-69%**: 보통 - 여러 색상 유사 ⚠
   - **0-49%**: 개선 필요 - 많은 색상 구분 어려움 🚨
3. **개선 제안 활용:**
   - 명도 차이 증가
   - 문제 색상 조합 피하기 (빨강-초록 등)
   - 패턴/텍스처 추가 고려
4. **모든 필터 비교:**
   - "모든 필터 비교" 버튼 클릭
   - 5가지 타입 동시 확인
   - 포괄적 접근성 검증
5. **실무 활용:**
   - 웹사이트 버튼 색상 검증
   - 차트/그래프 색상 선택
   - 브랜드 아이덴티티 접근성 확인
   - WCAG 2.11 AA/AAA 기준 준수

#### 🔄 팔레트 비교 모드 (NEW!)
1. **준비 단계:**
  - 비교할 팔레트 2개 이상 저장
2. **비교 시작:**
  - `🔄 비교` 버튼 클릭
  - 현재 팔레트가 자동으로 1번 팔레트로 설정
3. **두 번째 팔레트 선택:**
  - "📁 팔레트 선택" 버튼 클릭
  - 저장된 팔레트 목록에서 선택
4. ** 비교 분석 확인:**
  - 승패 판정 및 점수 차이
  - 대비/조화/접근성 막대 그래프
  - 맞춤형 인사이트
5. **활용 팁:**
  - 디자인 최종 결정 시
  - 리브랜딩 전후 비교
  - 계절별 팔레트 성능 비교

#### 🎨 색상 미세 조정 (NEW!)
1. **조정 패널 열기:**
  - 조정할 색상 카드를 **더블 클릭**
  - 미세 조정 패널이 나타남
2. **슬라이더 조정:**
  - **색조**: 드래그하여 색상환에서 원하는 색 선택
  - **채도**: 회색 ↔ 선명한 색으로 조정
  - **명도**: 어둡게 ↔ 밝게 조정
3. **빠른 조정 버튼 활용:**
  - 조금만 조정하고 싶을 때 버튼 클릭
  - 여러 번 클릭 가능 (누적 효과)
4. **실시간 미리보기:**
  - 변경 즉시 반영
  - HEX/RGB/HSL 값 실시간 표시
5. **적용 또는 취소:**
  - ✅ 적용: 히스토리에 저장되어 Ctrl+Z 가능
  - ❌ 취소: 변경사항 버리고 닫기
6. **활용 팁:**
  - 브랜드 가이드 색상에 맞추기
  - 접근성 개선 (명도 조정)
  - 보색 실험

#### 🏷️ 색상 이름 표시 (NEW!)
1. **이름 표시 켜기:**
   - `🏷️ 이름 표시` 버튼 클릭
   - 각 색상 카드에 이름이 나타남
2. **언어 전환:**
   - `🇰🇷 한국어` 버튼 클릭
   - `🇺🇸 English`로 전환
3. **색상 이름 예시:**
   - #FF0000 → 빨강 (Red)
   - #87CEEB → 하늘 (Sky Blue)
   - #FFB6C1 → 분홍 (Pink)
   - #808080 → 회색 (Gray)
4. **활용 팁:**
   - 팀 커뮤니케이션 개선
   - 초보자 학습 도구
   - 다국어 프로젝트
   - 접근성 향상

#### 🎯 팔레트 분석 (AI 점수 시스템)
1. 팔레트 생성 후 우측 하단의 점수 배지 확인
2. 배지를 클릭하거나 `🎯 팔레트 분석` 버튼 클릭
3. 5가지 기준의 상세 분석 확인:
   - **대비**: 가독성과 시각적 구분
   - **조화**: 색상환 기반 조화도
   - **균형**: 명도/채도 분포
   - **다양성**: 색상 스펙트럼 활용도
   - **접근성**: WCAG 기준 충족도
4. 개선 제안에 따라 팔레트 수정

#### 💉 색상 추출 (Eye Dropper)
1. `💉 색상 추출` 버튼 클릭
2. 마우스 커서가 스포이드로 변경됨
3. 화면의 원하는 색상 클릭
4. 옵션 선택:
   - 새 팔레트 생성
   - 특정 색상 교체
   - 색상 코드만 복사

#### 🌈 그라디언트 생성
1. 팔레트 생성 후 `🌈 그라디언트` 버튼 클릭
2. 그라디언트 타입 선택 (Linear/Radial/Conic)
3. 각도 조절 (슬라이더 또는 방향 버튼)
4. 사용할 색상 체크박스로 선택
5. 프리셋 스타일 적용 (선택사항)
6. CSS 복사 또는 PNG 이미지 다운로드

#### ↩ 히스토리 관리
1. 팔레트 생성할 때마다 자동 저장 (최대 50개)
2. `Ctrl+Z`/`Ctrl+Y`로 빠른 탐색
3. `📜 히스토리` 버튼으로 전체 타임라인 보기
4. 원하는 시점 클릭으로 즉시 이동
5. 히스토리 초기화로 모든 기록 삭제

#### 📤 내보내기 & 공유
- **내보내기**: 5가지 형식 중 선택하여 파일 다운로드
- **공유**: URL 생성 후 자동 클립보드 복사

## 🎨 색상 이론 가이드

### 색상 조화 모드와 점수의 관계

| 모드 | 예상 점수 | 특징 | 온도 분포 |
|------|------|-------|----------|
| **보색** | 높은 대비, 중간 조화 | 강렬한 대비로 주목도 높음 | 🔥❄ 혼합 |
| **유사색** | 높은 조화, 낮은 대비 | 자연스럽고 편안한 느낌 | 같은 온도 |
| **삼각색** | 균형잡힌 전체 점수 | 다채롭고 활기찬 디자인 | 다양한 온도 |
| **단색조** | 높은 조화, 낮은 다양성 | 세련되고 일관된 디자인 | 동일 온도 |
| **랜덤** | 변동 폭 큼 | 실험적, 창의적 결과 | 무작위 |

### 테마별 활용 가이드

| 테마 | HSL 범위 | 주요 색조 | 추천 용도 | 온도 특성 |
|------|---------|---------|---------|---------|
| 🌸 **파스텔** | S:20-50%, L:70-90% | 전체 | 웨딩, 베이비, 패션 | 중립/따뜻 |
| ⚡ **네온** | S:80-100%, L:50-70% | 전체 | 클럽, 게임, 이벤트 | 혼합 |
| 🌿 **자연** | H:0-60,80-160 | 갈색, 초록 | 친환경, 식품, 아웃도어 | 따뜻/차가움 |
| 🌊 **바다** | H:170-240 | 청록, 파랑 | 여행, 해양, 건강 | 차가움 |
| 🌌 **우주** | H:230-290, L:15-50 | 파랑, 보라 | SF, 기술, 미래 | 차가움 |
| 🌅 **석양** | H:0-50,330-360 | 주황, 분홍 | 카페, 레스토랑, 로맨스 | 따뜻 |
| 🌲 **숲** | H:80-160, L:25-60 | 짙은 초록 | 자연, 힐링, 명상 | 차가움 |
| 🍭 **캔디** | S:70-100%, L:60-85% | 전체 | 어린이, 파티, 축제 | 혼합 |

### 점수별 활용 가이드

| 점수 | 등급 | 추천 용도 |
|-----|-----|---------|
| 90-100 | S | 브랜드 아이덴티티, 메인 디자인 |
| 80-89 | A | 웹사이트, 앱 UI |
| 70-79 | B | 프레젠테이션, 인포그래픽 |
| 60-69 | C | 실험적 프로젝트 |
| 0-59 | D | 개선 후 사용 권장 |

### 색상 온도 활용 가이드

|온도 조합 | 분위기 | 추천 용도 |
|--------|-------|---------|
| 🔥🔥🔥🔥🔥 | 열정적, 활기찬 | 음식, 스포츠, 엔터테인먼트 |
| ❄❄❄❄❄ | 차분한, 전문적인 | 의료, 금융, 기술 |
| 🔥🔥❄❄⚪ | 균형잡힌 | 비즈니스, 교육, 일반 웹사이트 |
| 🔥❄🔥❄⚪ | 역동적인 | 크리에이티브, 패션, 예술 |
| ⚪⚪⚪⚪⚪ | 미니멀, 세련된 | 포트폴리오, 럭셔리 브랜드 |

### 색각 이상 접근성 가이드

| 색각 이상 타입 | 유병률 | 피해야 할 조합 | 권장 조합 |
|-------------|-------|-------------|---------|
| 🔴 적색약 | 남성 1% | 빨강-초록, 빨강-갈색 | 파랑-노랑, 검정-흰색 |
| 🟢 녹색약 | 남성 1% | 빨강-초록, 초록-갈색 | 파랑-노랑, 보라-주황 |
| 🔵 청색약 | 0.001% | 파랑-노랑, 파랑-회색 | 빨강-초록, 검정-흰색 |
| ⚫ 전색맹 | 0.003% | 모든 색상만 의존 | 명도 차이, 패턴 |

**일반 원칙:**
- 명도 대비 최소 4.5:1 (WCAG AA)
- 색상만으로 정보 전달 금지
- 패턴, 아이콘, 텍스트 레이블 병행
- 여러 색각 이상 타입에서 테스트

## 💻 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 커스텀 프로퍼티, Grid, Flexbox, 애니메이션
- **Vanilla JavaScript**: 프레임워크 없는 순수 구현
- **색상 과학 알고리즘**:
   - HSL/RGB/LAB 색공간 변환
   - Brettel 색각 이상 시뮬레이션 (1997)
   - Delta E 지각적 색상 차이 계산
   - WCAG 2.1 대비 비율 계산
   - HSL 기반 색상 이름 매칭
- **Web APIs**:
  - LocalStorage API (팔레트 저장)
  - Clipboard API (복사 기능)
  - EyeDropper API (색상 추출)
  - Canvas API (이미지 생성)
  - URL API (공유 링크)
  - History API (실행 취소/다시 실행)

## 🌐 브라우저 호환성

| 기능 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| 기본 기능 | ✅ | ✅ | ✅ | ✅ |
| 팔레트 분석 | ✅ | ✅ | ✅ | ✅ |
| 색상 온도 분석 | ✅ | ✅ | ✅ | ✅ |
| 테마 프리셋 | ✅ | ✅ | ✅ | ✅ |
| 태그/카테고리 | ✅ | ✅ | ✅ | ✅ |
| 색맹 시뮬레이션 | ✅ | ✅ | ✅ | ✅ |
| 색상 추출 | ✅ 95+ | ❌ | ❌ | ✅ 95+ |
| 클립보드 복사 | ✅ | ✅ | ✅ 13.1+ | ✅ |
| 그라디언트 | ✅ | ✅ | ✅ | ✅ |
| 히스토리 | ✅ | ✅ | ✅ | ✅ |

## 🚧 업데이트 내역

### v2.5.1 (2025.10.24.) `LATEST`
- ✅ **파일 구조 대규모 리팩토링**
  - 단일 파일에서 모듈화 구조로 전환
  - JavaScript: 1개 → 19개 파일
  - CSS: 1개 → 16개 파일
  - 기능별 디렉토리 구조 (core, utils, generators, features, analysis 등)
- ✅ **UI/UX 개선**
  - 팔레트 비교 모달 레이아웃 개선
  - 닫기 버튼 크기 및 디자인 일관성 향상
  - 텍스트 세로 표시 문제 수정
- ✅ **코드 품질 향상**
  - 파일별 단일 책임 원칙 적용
  - 중복 스타일 제거 및 공통 클래스 추가
  - 모듈 간 의존성 명확화
- ✅ **유지보수성 개선**
  - 평균 파일 크기 90% 감소 (121KB → 6.9KB)
  - 원본 파일 백업 (backup 폴더)
  - 명확한 파일 이름 및 주석

### v2.5.0 (2025.10.23.)
- ✅ **팔레트 비교 모드**
  - 두 팔레트 나란히 비교
  - 종합 점수, 대비, 조화, 접근성 비교
  - 승패 판정 및 상세 인사이트
  - 저장된 팔레트 선택 기능
  - 시각적 막대 그래프 비교
  - 반응형 레이아웃
- ✅ **색상 미세 조정 슬라이더**
  - 더블 클릭으로 조정 패널 열기
  - HSL 슬라이더 (색조/채도/명도)
  - 실시간 미리보기 및 코드 표시
  - 6가지 빠른 조정 버튼
  - 시각적 그라디언트 표시
  - 히스토리 자동 저장
- ✅ **색상 이름 표시 기능**
  - 한국어/영어 색상 이름 (각 140개)
  - HSL 기반 자동 매칭 알고리즘
  - 토글 버튼으로 표시/숨김
  - 언어 전환 버튼
  - localStorage 설정 저장
  - 애니메이션 효과

### v2.4.0 (2025.10.17.)
- ✅ **랜덤 테마 프리셋 시스템**
  - 8가지 테마 (파스텔, 네온, 자연, 바다, 우주, 석양, 숲, 캔디)
  - 테마별 HSL 값 자동 조정
  - 색상 잠금과 함께 사용 가능
  - 테마 + 조화 모드 독립 작동
  - 테마별 호버 효과 및 애니메이션
- ✅ **팔레트 태그/카테고리 시스템**
  - 팔레트 이름 설정 (최대 50자)
  - 태그 무제한 추가
  - 18개 인기 태그 프리셋
  - 실시간 검색 및 필터링
  - 3가지 정렬 옵션
  - 향상된 팔레트 카드 UI
- ✅ **색각 이상 시뮬레이션 (과학적 개선)**
  - Brettel 알고리즘 (LMS 색공간 기반)
  - LAB 색공간 Delta E 지각적 차이 계산
  - 5가지 색각 이상 타입 지원
  - 색상 구분 가능성 점수 (0-100%)
  - 타입별 맞춤형 개선 제안
  - 모든 필터 비교 모드
  - SVG 필터 기반 실시간 시뮬레이션

### v2.3.0 (2025.10.15.)
- ✅ 색상 온도 분석 시스템 (따뜻함/차가움/중립)
- ✅ 색상 카드에 온도 아이콘 실시간 표시
- ✅ 온도별 색상 분류 배지
- ✅ 호버 애니메이션 효과
- ✅ HSL 색조 기반 자동 온도 판단 알고리즘
- ✅ 채도 기반 중립 색상 감지
- ✅ 온도별 활용 가이드 문서화

### v2.2.0 (2025.10.15.)
- ✅ AI 수준의 팔레트 분석 시스템
- ✅ 5가지 평가 기준 (대비, 조화, 균형, 다양성, 접근성)
- ✅ 실시간 점수 배지 표시
- ✅ S~D등급 시스템
- ✅ 맞춤형 개선 제안
- ✅ WCAG 2.1 접근성 기준 적용
- ✅ 시각적 분석 리포트 (차트, 그래프)

### v2.1.0 (2025.10.15.)
- ✅ 그라디언트 생성기 (3가지 타입, 프리셋, 이미지 다운로드)
- ✅ 실행 취소/다시 실행 기능 (최대 50개 히스토리)
- ✅ 히스토리 타임라인 뷰어
- ✅ 키보드 단축키 확장 (Ctrl+Z, Ctrl+Y, Ctrl+H)
- ✅ 그라디언트 CSS 코드 생성 및 복사

### v2.0.0 (2025.10.14.)
- ✅ Eye Dropper API를 통한 화면 색상 추출
- ✅ 5가지 형식 팔레트 내보내기
- ✅ URL 공유 기능
- ✅ 색상 교체 모드

### v1.0.0 (2025.10.08.)
- ✅ 5가지 색상 조화 모드
- ✅ 색상 잠금 기능
- ✅ 로컬 저장소 활용
- ✅ HEX/RGB/HSL 변환
- ✅ 반응형 디자인

## 🔮 향후 개발 계획

### v.2.6.0 (계획)
- [ ] 이미지에서 팔레트 추출 (AI 기반)
- [ ] 색상 조합 추천 AI
- [ ] CSV/JSON 팔레트 가져오기
- [ ] 커스텀 테마 생성 및 저장

### v3.0.0 (장기 계획)
- [ ] AI 기반 색상 추천 (OpenAI API)
- [ ] PWA 지원 (오프라인 사용)
- [ ] 클라우드 동기화 (Firebase)
- [ ] 팀 협업 가능
- [ ] Figma/Sketch 플러그인
- [ ] 실시간 색상 필터 적용 (메인 화면)
- [ ] 패턴 라이브러리 (색맹 접근성 향상)

## 📊 프로젝트 통계

### 코드 및 파일
- ⭐ **총 코드 라인**: ~5,000 lines
- 📦 **프로젝트 크기**: ~242KB (JS: 171KB, CSS: 71KB)
- 📁 **총 파일 수**: 37개 (HTML: 1, JS: 19, CSS: 16, Backup: 2)
- 📊 **평균 파일 크기**: 6.9KB (모듈화 전: 121KB)
- ⚡ **로딩 속도**: <1초

### 기능 통계
- 🎨 **지원 색상**: 16,777,216개 (24-bit RGB)
- 📜 **최대 히스토리**: 50개
- 💾 **최대 저장 팔레트**: 20개
- 🌈 **그라디언트 타입**: 3종 (Linear, Radial, Conic)
- 📥 **내보내기 형식**: 5종 (JSON, CSS, SCSS, Tailwind, JS)
- 🎯 **분석 기준**: 5가지 (대비, 조화, 균형, 다양성, 접근성)
- 🌡 **온도 분류**: 3가지 (따뜻/차가움/중립)
- 🎨 **테마 프리셋**: 8종
- 🏷 **인기 태그**: 18개
- 👁 **색각 이상 타입**: 5종
- 📈 **점수 범위**: 0-100점
- 🏷 **색상 이름**: 280개 (한국어 140개, English 140개)
- ⌨️ **키보드 단축키**: 6개

### 모듈 통계
- 🧩 **JavaScript 모듈**: 19개
  - Core: 1개
  - Utils: 3개
  - Generators: 2개
  - Storage: 1개
  - Features: 8개
  - Analysis: 3개
  - App: 1개
- 🎨 **CSS 모듈**: 16개
  - Base: 2개
  - Layout: 1개
  - Components: 4개
  - Features: 7개
  - Utils: 2개

## 🏆 주요 특징

- ✨ **제로 디펜던시**: 외부 라이브러리 없이 순수 구현
- 🚀 **빠른 성능**: 모든 작업 즉시 처리
- 🎯 **직관적 UX**: 클릭 한 번으로 모든 기능 접근
- 🌙 **다크 모드**: 눈이 편안한 기본 다크 테마
- ♿ **접근성**: WCAG 가이드라인 준수 + 색각 이상 고려
- 🌡 **과학적 분석**: 색상 온도 + 조화 점수 + 색맹 시뮬레이션
- 🔬 **정확한 시뮬레이션**: Brettel 알고리즘 + LAB 색공간

## 🤝 기여하기

프로젝트 개선에 참여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 기여 가이드라인

**코드 작성**
- **코드 스타일**: 2 spaces 들여쓰기
- **주석**: 한글 주석 권장, 각 파일 상단에 기능 설명 추가
- **파일 구조**: 기능별로 적절한 디렉토리에 배치
  - 새 기능 → `js/features/` 또는 `css/features/`
  - 유틸리티 → `js/utils/` 또는 `css/utils/`
  - 분석 기능 → `js/analysis/` 또는 `css/features/`
- **모듈화**: 각 파일은 단일 책임만 담당
- **의존성**: 필요한 모듈을 HTML에서 올바른 순서로 로드

**품질 관리**
- **커밋 메시지**: 명확한 변경사항 설명 (예: "✨ 색상 필터 기능 추가")
- **테스트**: Chrome, Firefox, Edge에서 테스트
- **알고리즘**: 색상 이론 근거 제시
- **문서화**: 새 기능 추가 시 README 업데이트
- **접근성**: WCAG 가이드라인 준수

**파일 추가 시 체크리스트**
- [ ] 적절한 디렉토리에 파일 생성
- [ ] 파일 상단에 설명 주석 추가
- [ ] index.html에 스크립트/스타일시트 링크 추가
- [ ] 다른 모듈과의 의존성 확인
- [ ] README의 프로젝트 구조 섹션 업데이트

## 📝 라이선스

MIT License - 자유롭게 사용하실 수 있습니다.

```
MIT License

Copyright (c) 2024 Color Palette Studio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 감사의 말

- 색상 이론 참고: [Adobe Color](https://color.adobe.com)
- 디자인 영감: [Coolors.co](https://coolors.co)
- 웹 API 문서: [MDN Web Docs](https://developer.mozilla.org)
- 그라디언트 영감: [WebGradients](https://webgradients.com)
- WCAG 가이드라인: [W3C](https://www.w3.org/WAI/WCAG21/quickref/)
- 색상 온도 이론: [Color Theory](https://www.colormatters.com)
- 색각 이상 연구: [Brettel, Viénot and Mollon (1997)](https://www.color.org/papers.xalter)
- Delta E 계산: [CIE Color Difference](http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE76.html)
- 아이콘: Emoji

## 💬 문의 및 지원

- **버그 리포트**: [Issues](https://github.com/Dev-2A/color-palette-studio/issues)
- **기능 제안**: [Discussions](https://github.com/Dev-2A/color-palette-studio/discussions)

## 🔧 문제 해결

### 팔레트 비교가 작동하지 않는 경우
- 팔레트가 2개 이상 저장되어 있는지 확인
- localStorage가 활성화되어 있는지 확인
- 브라우저 콘솔(F12)에서 에러 확인
- 페이지 새로고침 후 재시도

### 색상 미세 조정이 열리지 않는 경우
- 더블 클릭으로 열기 (싱글 클릭 아님)
- 자물쇠 아이콘이 아닌 색상 카드 영역 클릭
- JavaScript가 정상적으로 로드되었는지 확인
- 브라우저가 최신 버전인지 확인

### 색상 이름이 표시되지 않는 경우
- `🏷️ 이름 표시` 버튼이 활성화되어 있는지 확인
- 브라우저 캐시 삭제 (Ctrl+F5)
- localStorage 설정 확인
- displayPalette() 함수 수정 여부 확인

### 색상 이름이 부정확한 경우
- HSL 기반 알고리즘으로 가장 가까운 이름을 표시
- 완벽한 매칭은 불가능 (16,777,216가지 색상 vs 100개 이름)
- 경계 영역의 색상은 판정이 달라질 수 있음

### 색상 온도가 표시되지 않는 경우
- 브라우저 캐시 삭제 후 새로고침 (Ctrl+F5)
- 브라우저 콘솔에서 에러 확인 (F12)
- JavaScript가 정상적으로 로드되었는지 확인

### 테마가 적용되지 않는 경우
- 조화 모드를 "랜덤"으로 설정했는지 확인
- 페이지 새로고침 후 재시도

### 태그 검색/필터가 작동하지 않는 경우
- 팔레트가 1개 이상 저장되어 있는지 확인
- localStorage가 활성화되어 있는지 확인
- 시크릿 모드가 아닌지 확인

### 색맹 시뮬레이션이 작동하지 않는 경우
- SVG 필터가 HTML에 포함되어 있는지 확인
- 브라우저가 SVG 필터를 지원하는지 확인 (최신 버전 사용)
- 콘솔에서 JavaScript 에러 확인

### 팔레트 분석이 작동하지 않는 경우
- 브라우저 콘솔에서 에러 확인 (F12)
- 팔레트가 생성되었는지 확인
- 페이지 새로고침 후 재시도

### 색상 추출이 작동하지 않는 경우
- Chrome 또는 Edge 브라우저 95+ 버전 사용 확인
- HTTPS 환경에서 실행 중인지 확인
- 브라우저 권한 설정 확인

### 히스토리가 저장되지 않는 경우
- 브라우저 쿠키 및 저장소 권한 확인
- 시크릿/프라이빗 모드가 아닌지 확인
- localStorage 용량 확인

### 그라디언트 다운로드가 안 되는 경우
- 브라우저 다운로드 권한 확인
- 팝업 차단 해제
- Canvas API 지원 브라우저 확인

## 📚 추가 학습 자료

### 색상 이론
- [Color Theory Basics](https://www.interaction-design.org/literature/topics/color-theory)
- [Understanding Color](https://www.canva.com/colors/color-wheel/)
- [Psychology of Color](https://www.verywellmind.com/color-psychology-2795824)
- [HSL Color System](https://www.w3schools.com/colors/colors_hsl.asp)
- [Color Naming Conventions](https://www.colorhexa.com/)

### 접근성
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [Color Universal Design (CUD)](https://jfly.uni-koeln.de/color/)

### 색각 이상
- [Types of Color Blindness](https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness)
- [Designing for Color Blindness](https://www.smashingmagazine.com/2016/06/improving-color-accessibility-for-color-blind-users/)
- [Brettel Algorithm Paper](https://www.color.org/papers.xalter)

### 웹 디자인
- [Material Design Color System](https://material.io/design/color)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [CSS Gradient Generator](https://cssgradient.io/)

---

<p align="center">
  <strong>Made with 💙 and 🥤 by Dev-2A</strong>
</p>

<p align="center">
  <a href="https://github.com/Dev-2A/color-palette-studio">⭐ GitHub</a>

<p align="center">
  <img src="https://img.shields.io/github/stars/Dev-2A/color-palette-studio?style=social" alt="GitHub stars">
  <img src="https://img.shields.io/github/forks/Dev-2A/color-palette-studio?style=social" alt="GitHub forks">
  <img src="https://img.shields.io/github/watchers/Dev-2A/color-palette-studio?style=social" alt="GitHub watchers">
</p>
