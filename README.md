# 🎨 Color Palette Studio

> 디자이너와 개발자를 위한 올인원 색상 팔레트 생성 및 관리 도구

![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)
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

### 🎯 팔레트 분석 & 점수 시스템 `v2.2 NEW`
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

## 📁 프로젝트 구조

```
color-palette-studio/
│
├── index.html          # HTML 메인 파일
├── css/
│   └── styles.css     # 스타일시트 (다크 테마)
├── js/
│   └── script.js      # JavaScript 로직
└── README.md          # 프로젝트 문서
```

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
| 색상 복사 | 색상 카드 또는 코드 클릭 |
| 색상 잠금/해제 | 자물쇠 아이콘 클릭 |
| 팔레트 저장 | `💾 팔레트 저장` 버튼 또는 `Ctrl+S` |
| 실행 취소 | `↩ 취소` 버튼 또는 `Ctrl+Z` |
| 다시 실행 | `↪ 다시` 버튼 또는 `Ctrl+Y` |
| 히스토리 보기 | `📜 히스토리` 버튼 또는 `Ctrl+H` |
| 색상 추출 | `💉 색상 추출` 버튼 (Chrome/Edge) |
| 그라디언트 생성 | `🌈 그라디언트` 버튼 |
| 팔레트 내보내기 | `📥 내보내기` 버튼 |
| 팔레트 공유 | `🔗 공유` 버튼 |

### 고급 기능 활용

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

| 모드 | 예상 점수 | 특징 |
|------|------|------|
| **보색** | 높은 대비, 중간 조화 | 강렬한 대비로 주목도 높음 |
| **유사색** | 높은 조화, 낮은 대비 | 자연스럽고 편안한 느낌 |
| **삼각색** | 균형잡힌 전체 점수 | 다채롭고 활기찬 디자인 |
| **단색조** | 높은 조화, 낮은 다양성 | 세련되고 일관된 디자인 |
| **랜덤** | 변동 폭 큼 | 실험적, 창의적 결과 |

### 점수별 활용 가이드

| 점수 | 등급 | 추천 용도 |
|-----|-----|---------|
| 90-100 | S | 브랜드 아이덴티티, 메인 디자인 |
| 80-89 | A | 웹사이트, 앱 UI |
| 70-79 | B | 프레젠테이션, 인포그래픽 |
| 60-69 | C | 실험적 프로젝트 |
| 0-59 | D | 개선 후 사용 권장 |

## 💻 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 커스텀 프로퍼티, Grid, Flexbox, 애니메이션
- **Vanilla JavaScript**: 프레임워크 없는 순수 구현
- **분석 알고리즘**: 색상 이론 + WCAG 기준
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
| 색상 추출 | ✅ 95+ | ❌ | ❌ | ✅ 95+ |
| 클립보드 복사 | ✅ | ✅ | ✅ 13.1+ | ✅ |
| 그라디언트 | ✅ | ✅ | ✅ | ✅ |
| 히스토리 | ✅ | ✅ | ✅ | ✅ |

## 🚧 업데이트 내역

### v2.2.0 (2025.10.15.) `NEW`
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

### v2.3.0 (예정)
- [ ] 색상 미세 조정 슬라이더
- [ ] 커스텀 색상 조화 규칙
- [ ] 팔레트 비교 기능
- [ ] CSV/JSON 가져오기

### v3.0.0 (계획)
- [ ] 이미지에서 팔레트 추출
- [ ] 색각 이상 시뮬레이션
- [ ] AI 기반 색상 추천 (OpenAI API)
- [ ] PWA 지원 (오프라인 사용)
- [ ] 클라우드 동기화
- [ ] 팀 협업 기능
- [ ] Figma/Sketch 플러그인

## 📊 프로젝트 통계

- ⭐ **총 코드 라인**: ~3,500 lines
- 📦 **프로젝트 크기**: ~120KB
- ⚡ **로딩 속도**: <1초
- 🎨 **지원 색상**: 16,777,216개
- 📜 **최대 히스토리**: 50개
- 💾 **최대 저장 팔레트**: 20개
- 🌈 **그라디언트 타입**: 3종
- 📥 **내보내기 형식**: 5종
- 🎯 **분석 기준**: 5가지
- 📈 **점수 범위**: 0-100점

## 🏆 주요 특징

- ✨ **제로 디펜던시**: 외부 라이브러리 없이 순수 구현
- 🚀 **빠른 성능**: 모든 작업 즉시 처리
- 🎯 **직관적 UX**: 클릭 한 번으로 모든 기능 접근
- 🌙 **다크 모드**: 눈이 편안한 기본 다크 테마
- ♿ **접근성**: WCAG 가이드라인 준수

## 🤝 기여하기

프로젝트 개선에 참여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 기여 가이드라인
- **코드 스타일**: 2 spaces 들여쓰기
- **주석**: 한글 주석 권장
- **커밋 메시지**: 명확한 변경사항 설명
- **테스트**: Chrome, Firefox, Edge에서 테스트
- **알고리즘**: 색상 이론 근거 제시

## 📝 라이선스

MIT License - 자유롭게 사용하실 수 있습니다.

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 🙏 감사의 말

- 색상 이론 참고: [Adobe Color](https://color.adobe.com)
- 디자인 영감: [Coolors.co](https://coolors.co)
- 웹 API 문서: [MDN Web Docs](https://developer.mozilla.org)
- 그라디언트 영감: [WebGradients](https://webgradients.com)
- WCAG 가이드라인: [W3C](https://www.w3.org/WAI/WCAG21/quickref/)
- 아이콘: Emoji

## 💬 문의 및 지원

- **버그 리포트**: [Issues](https://github.com/Dev-2A/color-palette-studio/issues)
- **기능 제안**: [Discussions](https://github.com/Dev-2A/color-palette-studio/discussions)

## 🔧 문제 해결

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

---

<p align="center">
  <strong>Made with ❤️ and ☕ by Dev-2A</strong>
</p>

<p align="center">
  <a href="https://github.com/Dev-2A/color-palette-studio">GitHub</a>

<p align="center">
  <img src="https://img.shields.io/github/stars/Dev-2A/color-palette-studio?style=social" alt="GitHub stars">
  <img src="https://img.shields.io/github/forks/Dev-2A/color-palette-studio?style=social" alt="GitHub forks">
</p>
