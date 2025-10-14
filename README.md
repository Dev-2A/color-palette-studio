# 🎨 Color Palette Studio

> 디자이너와 개발자를 위한 올인원 색상 팔레트 생성 및 관리 도구

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
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

### 💉 색상 추출 (Eye Dropper API) `NEW`
- 화면의 모든 곳에서 색상 추출 가능
- 추출한 색상으로 즉시 새 팔레트 생성
- 기존 팔레트의 특정 색상 교체
- **지원 브라우저**: Chrome 95+, Edge 95+, Opera 81+

### 📥 팔레트 내보내기 `NEW`
다양한 형식으로 팔레트 내보내기 지원:
- **JSON**: 데이터 교환 및 API 연동용
- **CSS Variables**: 웹 프로젝트 바로 적용
- **SCSS**: Sass 프로젝트용 변수 및 맵
- **Tailwind Config**: Tailwind CSS 설정 파일
- **JavaScript**: JS 배열 및 객체 형식

### 🔗 팔레트 공유 `NEW`
- URL로 팔레트 즉시 공유
- 자동 클립보드 복사
- 공유받은 링크로 팔레트 자동 로드

### 💾 기본 기능
- 🔒 **색상 잠금**: 마음에 드는 색상 고정
- 📋 **원클릭 복사**: HEX, RGB, HSL 코드 지원
- 💾 **팔레트 저장**: 최대 20개 로컬 저장
- ⌨️ **키보드 단축키**
  - `Space`: 새 팔레트 생성
  - `Ctrl+S`: 현재 팔레트 저장
- 📱 **반응형 디자인**: 모든 디바이스 지원

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
| 색상 복사 | 색상 카드 또는 코드 클릭 |
| 색상 잠금/해제 | 자물쇠 아이콘 클릭 |
| 팔레트 저장 | `💾 팔레트 저장` 버튼 또는 `Ctrl+S` |
| 색상 추출 | `💉 색상 추출` 버튼 (Chrome/Edge) |
| 팔레트 내보내기 | `📥 내보내기` 버튼 |
| 팔레트 공유 | `🔗 공유` 버튼 |

### 고급 기능 활용

#### 🎯 색상 추출 (Eye Dropper)
1. `💉 색상 추출` 버튼 클릭
2. 마우스 커서가 스포이드로 변경됨
3. 화면의 원하는 색상 클릭
4. 옵션 선택:
   - 새 팔레트 생성
   - 특정 색상 교체
   - 색상 코드만 복사

#### 📤 내보내기 & 공유
- **내보내기**: 5가지 형식 중 선택하여 파일 다운로드
- **공유**: URL 생성 후 자동 클립보드 복사

## 🎨 색상 이론 가이드

### 색상 조화 모드 설명

| 모드 | 설명 | 활용 |
|------|------|------|
| **보색** | 색환 반대편 색상 | 강렬한 대비, 주목도 높은 디자인 |
| **유사색** | 인접한 색상들 | 자연스럽고 편안한 느낌 |
| **삼각색** | 120도 간격 색상 | 균형잡힌 다채로운 디자인 |
| **단색조** | 하나의 색조 변화 | 미니멀하고 세련된 디자인 |

## 💻 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 커스텀 프로퍼티, Grid, Flexbox, 애니메이션
- **Vanilla JavaScript**: 프레임워크 없는 순수 구현
- **Web APIs**:
  - LocalStorage API (팔레트 저장)
  - Clipboard API (복사 기능)
  - EyeDropper API (색상 추출)
  - Canvas API (이미지 생성)
  - URL API (공유 링크)

## 🌐 브라우저 호환성

| 기능 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| 기본 기능 | ✅ | ✅ | ✅ | ✅ |
| 색상 추출 | ✅ 95+ | ❌ | ❌ | ✅ 95+ |
| 클립보드 복사 | ✅ | ✅ | ✅ 13.1+ | ✅ |
| 그라디언트 | ✅ | ✅ | ✅ | ✅ |

## 🚧 업데이트 내역

### v2.0.0 (2025.10.14.)
- ✅ Eye Dropper API를 통한 화면 색상 추출
- ✅ 5가지 형식 팔레트 내보내기
- ✅ URL 공유 기능

### v1.0.0 (2025.10.08.)
- ✅ 5가지 색상 조화 모드
- ✅ 색상 잠금 기능
- ✅ 로컬 저장소 활용
- ✅ HEX/RGB/HSL 변환
- ✅ 반응형 디자인

## 🔮 향후 개발 계획

- [ ] 그라디언트 생성
- [ ] 실행 취소/다시 실행 (Ctrl+Z/Y)
- [ ] 색상 조합 점수 & AI 추천
- [ ] 이미지에서 팔레트 추출
- [ ] 색각 이상 시뮬레이션
- [ ] 팔레트 히스토리 (모든 생성 기록)
- [ ] PWA 지원 (오프라인 사용)
- [ ] 팀 협업 기능 (실시간 동기화)
- [ ] Figma/Sketch 플러그인

## 🤝 기여하기

프로젝트 개선에 참여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 기여 가이드라인
- 코드 스타일: 2 spaces 들여쓰기
- 주석: 한글 주석 권장
- 커밋 메시지: 명확한 변경사항 설명

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
- 아이콘: Emoji

## 💬 문의 및 지원

- **버그 리포트**: [Issues](https://github.com/Dev-2A/color-palette-studio/issues)
- **기능 제안**: [Discussions](https://github.com/Dev-2A/color-palette-studio/discussions)

## 📊 프로젝트 통계

- ⭐ 총 코드 라인: ~1,500 lines
- 📦 프로젝트 크기: ~50KB
- ⚡ 로딩 속도: <1초
- 🎨 지원 색상: 16,777,216개

---

<p align="center">
  <strong>Made with ❤️ and ☕ by Dev-2A</strong>
</p>

<p align="center">
  <a href="https://github.com/Dev-2A/color-palette-studio">GitHub</a>