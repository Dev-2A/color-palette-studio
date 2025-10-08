# 🎨 Color Palette Studio

> 디자이너와 개발자를 위한 스마트 색상 팔레트 생성기

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ 소개

Color Palette Studio는 웹 디자인과 개발에 필요한 조화로운 색상 팔레트를 쉽고 빠르게 생성할 수 있는 도구입니다. 색상 이론에 기반한 다양한 조화 모드를 제공하며, 직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.

## 🚀 주요 기능

### 🎲 다양한 색상 생성 모드
- **랜덤**: 완전히 무작위로 5개의 색상 생성
- **보색 (Complementary)**: 색환의 반대편 색상들로 강한 대비 효과
- **유사색 (Analogous)**: 인접한 색상들로 조화로운 구성
- **삼각색 (Triadic)**: 색환에서 정삼각형을 이루는 색상들
- **단색조 (Monochromatic)**: 같은 색조의 명도 변화

### 💡 편리한 기능들
- 🔒 **색상 잠금**: 마음에 드는 색상을 고정하고 나머지만 재생성
- 📋 **원클릭 복사**: HEX, RGB, HSL 코드를 클릭 한 번으로 복사
- 💾 **팔레트 저장**: 최대 20개의 팔레트를 브라우저에 저장
- ⌨️ **키보드 단축키**: 스페이스바(생성), Ctrl+S(저장)
- 🌈 **부드러운 애니메이션**: 시각적 피드백과 전환 효과
- 📱 **반응형 디자인**: 모든 디바이스에서 완벽 작동

## 📁 프로젝트 구조

```
color-palette-studio/
│
├── index.html          # HTML 메인 파일
├── css/
│   └── styles.css     # 스타일시트
├── js/
│   └── script.js      # JavaScript 로직
└── README.md          # 프로젝트 문서
```

## 🛠️ 설치 및 실행

### 방법 1: 직접 실행
1. 모든 파일을 다운로드합니다.
2. `index.html` 파일을 웹 브라우저에서 엽니다.

### 방법 2: 로컬 서버 사용
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 패키지 필요)
npx http-server

# VS Code 사용 시
# Live Server 확장 프로그램 설치 후 우클릭 → Open with Live Server
```

## 🎮 사용법

### 기본 조작
- **새 팔레트 생성**: "🎲 새 팔레트 생성" 버튼 클릭 또는 스페이스바
- **색상 복사**: 원하는 색상 카드나 코드를 클릭
- **색상 잠금**: 색상 프리뷰의 자물쇠 아이콘 클릭
- **팔레트 저장**: "💾 팔레트 저장" 버튼 클릭 또는 Ctrl+S
- **저장된 팔레트 불러오기**: 하단의 저장된 팔레트 클릭

### 색상 조화 모드 활용
1. 상단의 모드 버튼 중 하나를 선택합니다.
2. 기본 색상이 생성되면, 원하는 색상을 잠급니다.
3. 잠긴 색상을 기준으로 조화로운 색상이 생성됩니다.

## 🎨 색상 이론

### 보색 (Complementary)
- 색환에서 180도 반대편에 위치한 색상들
- 강한 대비와 생동감 있는 조합
- 예: 파랑 ↔ 주황, 빨강 ↔ 초록

### 유사색 (Analogous)
- 색환에서 서로 인접한 색상들 (30-60도)
- 조화롭고 편안한 느낌
- 자연에서 흔히 볼 수 있는 조합

### 삼각색 (Triadic)
- 색환에서 120도씩 떨어진 세 색상
- 균형잡힌 다채로운 팔레트
- 생동감 있으면서도 조화로운 구성

### 단색조 (Monochromatic)
- 하나의 색상에서 명도와 채도만 변화
- 통일감 있고 세련된 느낌
- 미니멀한 디자인에 적합

## 💻 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 커스텀 프로퍼티, Grid, Flexbox, 애니메이션
- **Vanilla JavaScript**: 프레임워크 없는 순수 JavaScript
- **LocalStorage API**: 브라우저 저장소 활용
- **Clipboard API**: 클립보드 복사 기능

## 🌟 향후 개발 계획

- [ ] 색상 팔레트 내보내기 (JSON, CSS, SCSS)
- [ ] 이미지에서 색상 추출
- [ ] 색각 이상 시뮬레이션
- [ ] 팔레트 공유 링크 생성
- [ ] 다크/라이트 모드 전환
- [ ] PWA 지원 (오프라인 사용)
- [ ] 색상 히스토리 기능
- [ ] AI 기반 팔레트 추천

## 🤝 기여하기

프로젝트 개선에 참여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

MIT License - 자유롭게 사용하실 수 있습니다.

## 🙏 감사의 말

- 색상 이론 참고: [Adobe Color](https://color.adobe.com)
- 디자인 영감: [Coolors.co](https://coolors.co)
- 아이콘: Emoji

## 📧 문의

프로젝트에 대한 문의사항이나 제안이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ by Dev-2A**