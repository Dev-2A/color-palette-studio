/**
 * Color Names Feature
 * 색상 이름 표시 기능
 * - Display human-readable color names
 * - Toggle color name visibility
 */

//!SECTION - 색상 이름 표시 기능

//NOTE - 색상 이름 데이터베이스
const colorNames = {
  ko: [
    // 빨강 계열 (10개)
    { hue: [355, 360], sat: [80, 100], light: [45, 65], name: "빨강" },
    { hue: [0, 5], sat: [80, 100], light: [45, 65], name: "새빨강" },
    { hue: [0, 10], sat: [70, 100], light: [65, 80], name: "연한 빨강" },
    { hue: [0, 10], sat: [70, 100], light: [30, 45], name: "진한 빨강" },
    { hue: [0, 10], sat: [70, 100], light: [20, 30], name: "암적색" },
    { hue: [350, 360], sat: [50, 70], light: [35, 55], name: "적갈색" },
    { hue: [0, 8], sat: [50, 70], light: [40, 60], name: "벽돌색" },
    { hue: [350, 360], sat: [70, 100], light: [25, 40], name: "버건디" },
    { hue: [0, 10], sat: [85, 100], light: [50, 65], name: "선홍" },
    { hue: [350, 360], sat: [60, 85], light: [45, 60], name: "와인" },
    
    // 주황 계열 (10개)
    { hue: [10, 20], sat: [80, 100], light: [50, 70], name: "주황" },
    { hue: [15, 25], sat: [90, 100], light: [55, 70], name: "밝은 주황" },
    { hue: [20, 30], sat: [70, 90], light: [55, 70], name: "살구" },
    { hue: [15, 25], sat: [80, 100], light: [65, 80], name: "복숭아" },
    { hue: [25, 35], sat: [70, 90], light: [50, 65], name: "귤색" },
    { hue: [10, 20], sat: [70, 90], light: [40, 55], name: "진한 주황" },
    { hue: [20, 30], sat: [80, 100], light: [70, 85], name: "연한 복숭아" },
    { hue: [15, 25], sat: [50, 70], light: [45, 60], name: "황토" },
    { hue: [25, 35], sat: [80, 100], light: [60, 75], name: "호박" },
    { hue: [10, 18], sat: [70, 95], light: [50, 65], name: "당근" },
    
    // 노랑 계열 (10개)
    { hue: [50, 60], sat: [90, 100], light: [50, 65], name: "노랑" },
    { hue: [45, 55], sat: [80, 100], light: [65, 80], name: "밝은 노랑" },
    { hue: [50, 60], sat: [70, 90], light: [75, 90], name: "크림" },
    { hue: [40, 50], sat: [80, 100], light: [45, 60], name: "황금" },
    { hue: [45, 55], sat: [90, 100], light: [55, 70], name: "레몬" },
    { hue: [40, 50], sat: [60, 80], light: [50, 65], name: "겨자" },
    { hue: [50, 60], sat: [50, 70], light: [70, 85], name: "아이보리" },
    { hue: [35, 45], sat: [70, 90], light: [45, 60], name: "금색" },
    { hue: [50, 60], sat: [100, 100], light: [50, 60], name: "해바라기" },
    { hue: [55, 65], sat: [80, 100], light: [70, 85], name: "바나나" },
    
    // 연두/라임 계열 (8개)
    { hue: [65, 80], sat: [60, 90], light: [50, 70], name: "연두" },
    { hue: [70, 85], sat: [70, 100], light: [55, 75], name: "라임" },
    { hue: [75, 90], sat: [80, 100], light: [65, 80], name: "밝은 연두" },
    { hue: [65, 80], sat: [50, 70], light: [45, 60], name: "올리브그린" },
    { hue: [70, 85], sat: [60, 85], light: [60, 75], name: "연두" },
    { hue: [80, 95], sat: [70, 90], light: [55, 70], name: "샤트르즈" },
    { hue: [65, 75], sat: [40, 60], light: [40, 55], name: "카키" },
    { hue: [75, 90], sat: [85, 100], light: [70, 85], name: "형광 연두" },
    
    // 초록 계열 (12개)
    { hue: [95, 140], sat: [70, 100], light: [35, 50], name: "초록" },
    { hue: [110, 135], sat: [80, 100], light: [30, 45], name: "진한 초록" },
    { hue: [100, 130], sat: [60, 85], light: [50, 70], name: "연한 초록" },
    { hue: [120, 145], sat: [50, 75], light: [25, 40], name: "깊은 초록" },
    { hue: [110, 130], sat: [90, 100], light: [40, 55], name: "에메랄드" },
    { hue: [95, 115], sat: [70, 90], light: [45, 60], name: "잔디" },
    { hue: [125, 145], sat: [40, 65], light: [30, 50], name: "숲" },
    { hue: [100, 120], sat: [85, 100], light: [50, 65], name: "밝은 초록" },
    { hue: [130, 150], sat: [60, 85], light: [35, 50], name: "비취" },
    { hue: [110, 130], sat: [30, 50], light: [35, 50], name: "올리브" },
    { hue: [120, 140], sat: [70, 95], light: [40, 55], name: "청록빛 초록" },
    { hue: [95, 110], sat: [75, 95], light: [55, 70], name: "민트그린" },
    
    // 청록 계열 (10개)
    { hue: [150, 170], sat: [60, 90], light: [45, 65], name: "청록" },
    { hue: [160, 175], sat: [70, 100], light: [50, 70], name: "터키옥" },
    { hue: [165, 180], sat: [60, 85], light: [55, 75], name: "밝은 청록" },
    { hue: [155, 170], sat: [50, 75], light: [40, 60], name: "물빛" },
    { hue: [170, 185], sat: [70, 95], light: [60, 80], name: "아쿠아" },
    { hue: [150, 165], sat: [80, 100], light: [45, 60], name: "진한 청록" },
    { hue: [160, 175], sat: [40, 65], light: [50, 70], name: "연한 청록" },
    { hue: [165, 180], sat: [75, 100], light: [65, 80], name: "민트" },
    { hue: [155, 170], sat: [85, 100], light: [50, 65], name: "에메랄드그린" },
    { hue: [170, 185], sat: [50, 75], light: [55, 70], name: "시안" },
    
    // 파랑 계열 (12개)
    { hue: [185, 220], sat: [70, 100], light: [40, 60], name: "파랑" },
    { hue: [190, 210], sat: [60, 90], light: [55, 75], name: "하늘" },
    { hue: [200, 220], sat: [80, 100], light: [30, 45], name: "남색" },
    { hue: [210, 230], sat: [70, 95], light: [45, 65], name: "청색" },
    { hue: [185, 205], sat: [50, 75], light: [50, 70], name: "연한 파랑" },
    { hue: [205, 225], sat: [85, 100], light: [35, 50], name: "진한 파랑" },
    { hue: [195, 215], sat: [90, 100], light: [50, 65], name: "밝은 파랑" },
    { hue: [220, 240], sat: [60, 85], light: [40, 60], name: "로얄블루" },
    { hue: [200, 220], sat: [50, 75], light: [65, 80], name: "연한 하늘" },
    { hue: [190, 210], sat: [85, 100], light: [45, 60], name: "코발트" },
    { hue: [210, 230], sat: [40, 65], light: [35, 55], name: "짙은 파랑" },
    { hue: [185, 205], sat: [70, 95], light: [55, 70], name: "천청" },
    
    // 남색/군청 계열 (8개)
    { hue: [225, 245], sat: [60, 90], light: [30, 50], name: "군청" },
    { hue: [230, 250], sat: [70, 100], light: [25, 40], name: "짙은 남색" },
    { hue: [220, 240], sat: [50, 75], light: [35, 55], name: "감청" },
    { hue: [235, 255], sat: [80, 100], light: [40, 60], name: "인디고" },
    { hue: [225, 245], sat: [40, 65], light: [30, 50], name: "네이비" },
    { hue: [230, 250], sat: [85, 100], light: [35, 50], name: "진한 군청" },
    { hue: [220, 240], sat: [60, 85], light: [45, 65], name: "청람" },
    { hue: [235, 255], sat: [70, 95], light: [50, 70], name: "밝은 인디고" },
    
    // 보라 계열 (10개)
    { hue: [255, 280], sat: [60, 90], light: [40, 60], name: "보라" },
    { hue: [270, 290], sat: [70, 100], light: [45, 65], name: "자주" },
    { hue: [260, 280], sat: [80, 100], light: [50, 70], name: "밝은 보라" },
    { hue: [255, 275], sat: [50, 75], light: [35, 55], name: "진한 보라" },
    { hue: [280, 300], sat: [65, 95], light: [55, 75], name: "연보라" },
    { hue: [265, 285], sat: [85, 100], light: [40, 55], name: "바이올렛" },
    { hue: [270, 290], sat: [40, 65], light: [30, 50], name: "자주빛" },
    { hue: [255, 275], sat: [90, 100], light: [55, 70], name: "라벤더" },
    { hue: [275, 295], sat: [70, 95], light: [45, 60], name: "아메시스트" },
    { hue: [260, 280], sat: [50, 75], light: [65, 80], name: "연한 라벤더" },
    
    // 자주/마젠타 계열 (8개)
    { hue: [290, 320], sat: [70, 100], light: [45, 65], name: "마젠타" },
    { hue: [300, 330], sat: [80, 100], light: [50, 70], name: "자홍" },
    { hue: [295, 315], sat: [60, 85], light: [55, 75], name: "밝은 자주" },
    { hue: [285, 310], sat: [70, 95], light: [35, 55], name: "진한 자주" },
    { hue: [305, 325], sat: [85, 100], light: [60, 80], name: "연한 자홍" },
    { hue: [290, 310], sat: [50, 75], light: [40, 60], name: "자줏빛" },
    { hue: [300, 320], sat: [90, 100], light: [55, 70], name: "푸크시아" },
    { hue: [295, 315], sat: [65, 90], light: [45, 65], name: "퍼플" },
    
    // 분홍 계열 (12개)
    { hue: [320, 350], sat: [70, 100], light: [60, 80], name: "분홍" },
    { hue: [330, 355], sat: [80, 100], light: [70, 90], name: "연분홍" },
    { hue: [320, 345], sat: [60, 85], light: [50, 70], name: "핑크" },
    { hue: [325, 350], sat: [90, 100], light: [75, 90], name: "밝은 분홍" },
    { hue: [315, 340], sat: [50, 75], light: [55, 75], name: "장미" },
    { hue: [330, 355], sat: [70, 95], light: [80, 95], name: "파스텔 핑크" },
    { hue: [320, 345], sat: [85, 100], light: [65, 80], name: "핫핑크" },
    { hue: [310, 335], sat: [60, 85], light: [45, 65], name: "진한 분홍" },
    { hue: [325, 350], sat: [50, 75], light: [70, 85], name: "볼터치" },
    { hue: [335, 360], sat: [75, 100], light: [70, 85], name: "연어" },
    { hue: [320, 340], sat: [40, 65], light: [60, 80], name: "연한 장미" },
    { hue: [330, 355], sat: [85, 100], light: [60, 75], name: "체리블로썸" },
    
    // 갈색 계열 (10개)
    { hue: [15, 35], sat: [40, 70], light: [25, 45], name: "갈색" },
    { hue: [20, 40], sat: [50, 80], light: [30, 50], name: "밤색" },
    { hue: [25, 45], sat: [30, 60], light: [35, 55], name: "황갈색" },
    { hue: [15, 30], sat: [35, 65], light: [20, 40], name: "초콜릿" },
    { hue: [30, 50], sat: [40, 70], light: [40, 60], name: "모카" },
    { hue: [20, 40], sat: [60, 90], light: [35, 55], name: "구리" },
    { hue: [25, 45], sat: [25, 50], light: [30, 50], name: "세피아" },
    { hue: [15, 35], sat: [50, 80], light: [25, 45], name: "흙" },
    { hue: [30, 50], sat: [35, 65], light: [45, 65], name: "담황" },
    { hue: [20, 40], sat: [45, 75], light: [30, 50], name: "밤" },
    
    // 무채색 (10개)
    { hue: [0, 360], sat: [0, 10], light: [0, 10], name: "검정" },
    { hue: [0, 360], sat: [0, 10], light: [10, 25], name: "진한 회색" },
    { hue: [0, 360], sat: [0, 10], light: [25, 40], name: "어두운 회색" },
    { hue: [0, 360], sat: [0, 10], light: [40, 55], name: "회색" },
    { hue: [0, 360], sat: [0, 10], light: [55, 70], name: "중간 회색" },
    { hue: [0, 360], sat: [0, 10], light: [70, 82], name: "연한 회색" },
    { hue: [0, 360], sat: [0, 10], light: [82, 92], name: "밝은 회색" },
    { hue: [0, 360], sat: [0, 10], light: [92, 100], name: "흰색" },
    { hue: [0, 360], sat: [0, 8], light: [15, 30], name: "숯" },
    { hue: [0, 360], sat: [0, 8], light: [75, 88], name: "은" },
    
    // 베이지/중립 계열 (10개)
    { hue: [30, 50], sat: [10, 30], light: [60, 85], name: "베이지" },
    { hue: [35, 55], sat: [15, 35], light: [70, 90], name: "밝은 베이지" },
    { hue: [25, 45], sat: [10, 30], light: [50, 70], name: "모래" },
    { hue: [30, 50], sat: [8, 25], light: [65, 85], name: "아이보리" },
    { hue: [35, 55], sat: [20, 40], light: [55, 75], name: "밀" },
    { hue: [40, 60], sat: [15, 35], light: [75, 92], name: "크림색" },
    { hue: [25, 45], sat: [12, 30], light: [45, 65], name: "카키" },
    { hue: [30, 50], sat: [18, 38], light: [60, 80], name: "황토색" },
    { hue: [35, 55], sat: [10, 28], light: [70, 88], name: "연한 샌드" },
    { hue: [28, 48], sat: [15, 35], light: [55, 75], name: "타페스트리" }
  ],
  
  en: [
    // Red family (10)
    { hue: [355, 360], sat: [80, 100], light: [45, 65], name: "Red" },
    { hue: [0, 5], sat: [80, 100], light: [45, 65], name: "Red" },
    { hue: [0, 10], sat: [70, 100], light: [65, 80], name: "Light Red" },
    { hue: [0, 10], sat: [70, 100], light: [30, 45], name: "Dark Red" },
    { hue: [0, 10], sat: [70, 100], light: [20, 30], name: "Maroon" },
    { hue: [350, 360], sat: [50, 70], light: [35, 55], name: "Crimson" },
    { hue: [0, 8], sat: [50, 70], light: [40, 60], name: "Brick" },
    { hue: [350, 360], sat: [70, 100], light: [25, 40], name: "Burgundy" },
    { hue: [0, 10], sat: [85, 100], light: [50, 65], name: "Scarlet" },
    { hue: [350, 360], sat: [60, 85], light: [45, 60], name: "Wine" },
    
    // Orange family (10)
    { hue: [10, 20], sat: [80, 100], light: [50, 70], name: "Orange" },
    { hue: [15, 25], sat: [90, 100], light: [55, 70], name: "Bright Orange" },
    { hue: [20, 30], sat: [70, 90], light: [55, 70], name: "Apricot" },
    { hue: [15, 25], sat: [80, 100], light: [65, 80], name: "Peach" },
    { hue: [25, 35], sat: [70, 90], light: [50, 65], name: "Tangerine" },
    { hue: [10, 20], sat: [70, 90], light: [40, 55], name: "Dark Orange" },
    { hue: [20, 30], sat: [80, 100], light: [70, 85], name: "Light Peach" },
    { hue: [15, 25], sat: [50, 70], light: [45, 60], name: "Ochre" },
    { hue: [25, 35], sat: [80, 100], light: [60, 75], name: "Pumpkin" },
    { hue: [10, 18], sat: [70, 95], light: [50, 65], name: "Carrot" },
    
    // Yellow family (10)
    { hue: [50, 60], sat: [90, 100], light: [50, 65], name: "Yellow" },
    { hue: [45, 55], sat: [80, 100], light: [65, 80], name: "Bright Yellow" },
    { hue: [50, 60], sat: [70, 90], light: [75, 90], name: "Cream" },
    { hue: [40, 50], sat: [80, 100], light: [45, 60], name: "Gold" },
    { hue: [45, 55], sat: [90, 100], light: [55, 70], name: "Lemon" },
    { hue: [40, 50], sat: [60, 80], light: [50, 65], name: "Mustard" },
    { hue: [50, 60], sat: [50, 70], light: [70, 85], name: "Ivory" },
    { hue: [35, 45], sat: [70, 90], light: [45, 60], name: "Golden" },
    { hue: [50, 60], sat: [100, 100], light: [50, 60], name: "Sunflower" },
    { hue: [55, 65], sat: [80, 100], light: [70, 85], name: "Banana" },
    
    // Lime family (8)
    { hue: [65, 80], sat: [60, 90], light: [50, 70], name: "Lime Green" },
    { hue: [70, 85], sat: [70, 100], light: [55, 75], name: "Lime" },
    { hue: [75, 90], sat: [80, 100], light: [65, 80], name: "Bright Lime" },
    { hue: [65, 80], sat: [50, 70], light: [45, 60], name: "Olive Green" },
    { hue: [70, 85], sat: [60, 85], light: [60, 75], name: "Yellow Green" },
    { hue: [80, 95], sat: [70, 90], light: [55, 70], name: "Chartreuse" },
    { hue: [65, 75], sat: [40, 60], light: [40, 55], name: "Khaki" },
    { hue: [75, 90], sat: [85, 100], light: [70, 85], name: "Neon Green" },
    
    // Green family (12)
    { hue: [95, 140], sat: [70, 100], light: [35, 50], name: "Green" },
    { hue: [110, 135], sat: [80, 100], light: [30, 45], name: "Dark Green" },
    { hue: [100, 130], sat: [60, 85], light: [50, 70], name: "Light Green" },
    { hue: [120, 145], sat: [50, 75], light: [25, 40], name: "Forest Green" },
    { hue: [110, 130], sat: [90, 100], light: [40, 55], name: "Emerald" },
    { hue: [95, 115], sat: [70, 90], light: [45, 60], name: "Grass" },
    { hue: [125, 145], sat: [40, 65], light: [30, 50], name: "Hunter Green" },
    { hue: [100, 120], sat: [85, 100], light: [50, 65], name: "Bright Green" },
    { hue: [130, 150], sat: [60, 85], light: [35, 50], name: "Jade" },
    { hue: [110, 130], sat: [30, 50], light: [35, 50], name: "Olive" },
    { hue: [120, 140], sat: [70, 95], light: [40, 55], name: "Sea Green" },
    { hue: [95, 110], sat: [75, 95], light: [55, 70], name: "Mint Green" },
    
    // Cyan family (10)
    { hue: [150, 170], sat: [60, 90], light: [45, 65], name: "Teal" },
    { hue: [160, 175], sat: [70, 100], light: [50, 70], name: "Turquoise" },
    { hue: [165, 180], sat: [60, 85], light: [55, 75], name: "Light Cyan" },
    { hue: [155, 170], sat: [50, 75], light: [40, 60], name: "Aquamarine" },
    { hue: [170, 185], sat: [70, 95], light: [60, 80], name: "Aqua" },
    { hue: [150, 165], sat: [80, 100], light: [45, 60], name: "Dark Teal" },
    { hue: [160, 175], sat: [40, 65], light: [50, 70], name: "Light Teal" },
    { hue: [165, 180], sat: [75, 100], light: [65, 80], name: "Mint" },
    { hue: [155, 170], sat: [85, 100], light: [50, 65], name: "Emerald Green" },
    { hue: [170, 185], sat: [50, 75], light: [55, 70], name: "Cyan" },
    
    // Blue family (12)
    { hue: [185, 220], sat: [70, 100], light: [40, 60], name: "Blue" },
    { hue: [190, 210], sat: [60, 90], light: [55, 75], name: "Sky Blue" },
    { hue: [200, 220], sat: [80, 100], light: [30, 45], name: "Navy" },
    { hue: [210, 230], sat: [70, 95], light: [45, 65], name: "Azure" },
    { hue: [185, 205], sat: [50, 75], light: [50, 70], name: "Light Blue" },
    { hue: [205, 225], sat: [85, 100], light: [35, 50], name: "Dark Blue" },
    { hue: [195, 215], sat: [90, 100], light: [50, 65], name: "Bright Blue" },
    { hue: [220, 240], sat: [60, 85], light: [40, 60], name: "Royal Blue" },
    { hue: [200, 220], sat: [50, 75], light: [65, 80], name: "Pale Blue" },
    { hue: [190, 210], sat: [85, 100], light: [45, 60], name: "Cobalt" },
    { hue: [210, 230], sat: [40, 65], light: [35, 55], name: "Deep Blue" },
    { hue: [185, 205], sat: [70, 95], light: [55, 70], name: "Cerulean" },
    
    // Indigo family (8)
    { hue: [225, 245], sat: [60, 90], light: [30, 50], name: "Indigo" },
    { hue: [230, 250], sat: [70, 100], light: [25, 40], name: "Dark Indigo" },
    { hue: [220, 240], sat: [50, 75], light: [35, 55], name: "Midnight Blue" },
    { hue: [235, 255], sat: [80, 100], light: [40, 60], name: "Persian Blue" },
    { hue: [225, 245], sat: [40, 65], light: [30, 50], name: "Navy Blue" },
    { hue: [230, 250], sat: [85, 100], light: [35, 50], name: "Sapphire" },
    { hue: [220, 240], sat: [60, 85], light: [45, 65], name: "Slate Blue" },
    { hue: [235, 255], sat: [70, 95], light: [50, 70], name: "Periwinkle" },
    
    // Purple family (10)
    { hue: [255, 280], sat: [60, 90], light: [40, 60], name: "Purple" },
    { hue: [270, 290], sat: [70, 100], light: [45, 65], name: "Violet" },
    { hue: [260, 280], sat: [80, 100], light: [50, 70], name: "Bright Purple" },
    { hue: [255, 275], sat: [50, 75], light: [35, 55], name: "Dark Purple" },
    { hue: [280, 300], sat: [65, 95], light: [55, 75], name: "Lavender" },
    { hue: [265, 285], sat: [85, 100], light: [40, 55], name: "Deep Violet" },
    { hue: [270, 290], sat: [40, 65], light: [30, 50], name: "Plum" },
    { hue: [255, 275], sat: [90, 100], light: [55, 70], name: "Lilac" },
    { hue: [275, 295], sat: [70, 95], light: [45, 60], name: "Amethyst" },
    { hue: [260, 280], sat: [50, 75], light: [65, 80], name: "Pale Lavender" },
    
    // Magenta family (8)
    { hue: [290, 320], sat: [70, 100], light: [45, 65], name: "Magenta" },
    { hue: [300, 330], sat: [80, 100], light: [50, 70], name: "Fuchsia" },
    { hue: [295, 315], sat: [60, 85], light: [55, 75], name: "Bright Magenta" },
    { hue: [285, 310], sat: [70, 95], light: [35, 55], name: "Dark Magenta" },
    { hue: [305, 325], sat: [85, 100], light: [60, 80], name: "Light Fuchsia" },
    { hue: [290, 310], sat: [50, 75], light: [40, 60], name: "Orchid" },
    { hue: [300, 320], sat: [90, 100], light: [55, 70], name: "Hot Pink" },
    { hue: [295, 315], sat: [65, 90], light: [45, 65], name: "Cerise" },
    
    // Pink family (12)
    { hue: [320, 350], sat: [70, 100], light: [60, 80], name: "Pink" },
    { hue: [330, 355], sat: [80, 100], light: [70, 90], name: "Light Pink" },
    { hue: [320, 345], sat: [60, 85], light: [50, 70], name: "Rose" },
    { hue: [325, 350], sat: [90, 100], light: [75, 90], name: "Pastel Pink" },
    { hue: [315, 340], sat: [50, 75], light: [55, 75], name: "Coral" },
    { hue: [330, 355], sat: [70, 95], light: [80, 95], name: "Baby Pink" },
    { hue: [320, 345], sat: [85, 100], light: [65, 80], name: "Hot Pink" },
    { hue: [310, 335], sat: [60, 85], light: [45, 65], name: "Deep Pink" },
    { hue: [325, 350], sat: [50, 75], light: [70, 85], name: "Blush" },
    { hue: [335, 360], sat: [75, 100], light: [70, 85], name: "Salmon" },
    { hue: [320, 340], sat: [40, 65], light: [60, 80], name: "Tea Rose" },
    { hue: [330, 355], sat: [85, 100], light: [60, 75], name: "Cherry Blossom" },
    
    // Brown family (10)
    { hue: [15, 35], sat: [40, 70], light: [25, 45], name: "Brown" },
    { hue: [20, 40], sat: [50, 80], light: [30, 50], name: "Chestnut" },
    { hue: [25, 45], sat: [30, 60], light: [35, 55], name: "Tan" },
    { hue: [15, 30], sat: [35, 65], light: [20, 40], name: "Chocolate" },
    { hue: [30, 50], sat: [40, 70], light: [40, 60], name: "Mocha" },
    { hue: [20, 40], sat: [60, 90], light: [35, 55], name: "Copper" },
    { hue: [25, 45], sat: [25, 50], light: [30, 50], name: "Sepia" },
    { hue: [15, 35], sat: [50, 80], light: [25, 45], name: "Sienna" },
    { hue: [30, 50], sat: [35, 65], light: [45, 65], name: "Caramel" },
    { hue: [20, 40], sat: [45, 75], light: [30, 50], name: "Mahogany" },
    
    // Grayscale (10)
    { hue: [0, 360], sat: [0, 10], light: [0, 10], name: "Black" },
    { hue: [0, 360], sat: [0, 10], light: [10, 25], name: "Dark Gray" },
    { hue: [0, 360], sat: [0, 10], light: [25, 40], name: "Charcoal" },
    { hue: [0, 360], sat: [0, 10], light: [40, 55], name: "Gray" },
    { hue: [0, 360], sat: [0, 10], light: [55, 70], name: "Medium Gray" },
    { hue: [0, 360], sat: [0, 10], light: [70, 82], name: "Light Gray" },
    { hue: [0, 360], sat: [0, 10], light: [82, 92], name: "Silver" },
    { hue: [0, 360], sat: [0, 10], light: [92, 100], name: "White" },
    { hue: [0, 360], sat: [0, 8], light: [15, 30], name: "Ash" },
    { hue: [0, 360], sat: [0, 8], light: [75, 88], name: "Platinum" },
    
    // Beige/Neutral family (10)
    { hue: [30, 50], sat: [10, 30], light: [60, 85], name: "Beige" },
    { hue: [35, 55], sat: [15, 35], light: [70, 90], name: "Light Beige" },
    { hue: [25, 45], sat: [10, 30], light: [50, 70], name: "Sand" },
    { hue: [30, 50], sat: [8, 25], light: [65, 85], name: "Ivory" },
    { hue: [35, 55], sat: [20, 40], light: [55, 75], name: "Wheat" },
    { hue: [40, 60], sat: [15, 35], light: [75, 92], name: "Cream" },
    { hue: [25, 45], sat: [12, 30], light: [45, 65], name: "Khaki" },
    { hue: [30, 50], sat: [18, 38], light: [60, 80], name: "Buff" },
    { hue: [35, 55], sat: [10, 28], light: [70, 88], name: "Vanilla" },
    { hue: [28, 48], sat: [15, 35], light: [55, 75], name: "Taupe" }
  ]
};

//NOTE - 색상 이름 설정 (전역 변수)
let colorNameLanguage = 'ko'; // 'ko' 또는 'en'
let showColorNames = true; // 이름 표시 여부

//NOTE - 색상 이름 찾기
function getColorName(hex, language = colorNameLanguage) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const database = colorNames[language];

  // 가장 일치하는 색상 찾기
  let bestMatch = null;
  let bestScore = -1;

  for (const colorDef of database) {
    let score = 0;

    // 색조 확인
    let hueMatch = false;
    if (colorDef.hue[0] <= colorDef.hue[1]) {
      // 일반적인 범위
      if (hsl.h >= colorDef.hue[0] && hsl.h <= colorDef.hue[1]) {
        hueMatch = true;
      }
    } else {
      // 0도를 넘어가는 경우 (예: 345-360, 0-15)
      if (hsl.h >= colorDef.hue[0] || hsl.h <= colorDef.hue[1]) {
        hueMatch = true;
      }
    }

    // 채도 확인
    const satMatch = hsl.s >= colorDef.sat[0] && hsl.s <= colorDef.sat[1];

    // 명도 확인
    const lightMatch = hsl.l >= colorDef.light[0] && hsl.l <= colorDef.light[1];

    // 점수 계산
    if (hueMatch) score += 50;
    if (satMatch) score += 25;
    if (lightMatch) score += 25;

    // 부분 일치 보너스
    if (!satMatch) {
      const satDiff = Math.min(
        Math.abs(hsl.s - colorDef.sat[0]),
        Math.abs(hsl.s - colorDef.sat[1])
      );
      score += Math.max(0, 25 - satDiff / 4);
    }

    if (!lightMatch) {
      const lightDiff = Math.min(
        Math.abs(hsl.l - colorDef.light[0]),
        Math.abs(hsl.l - colorDef.light[1])
      );
      score += Math.max(0, 25 - lightDiff / 4);
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = colorDef.name;
    }
  }

  return bestMatch || (language === 'ko' ? '알 수 없음' : 'Unknown');
}

//NOTE - 색상 이름 토글 버튼
function toggleColorNames() {
  showColorNames = !showColorNames;
  displayPalette();

  const btn = document.getElementById('colorNameBtn');
  if (btn) {
    btn.classList.toggle('active', showColorNames);
    btn.innerHTML = showColorNames ? '🏷 이름 표시 중' : '🏷 이름 표시';
  }

  showToast(showColorNames ? '색상 이름이 표시됩니다 🏷' : '색상 이름이 숨겨집니다');
  saveColorNameSettings();
}

//NOTE - 언어 전환
function toggleColorNameLanguage() {
  colorNameLanguage = colorNameLanguage === 'ko' ? 'en' : 'ko';

  if (showColorNames) {
    displayPalette();
  }

  const btn = document.getElementById('langToggleBtn');
  if (btn) {
    btn.innerHTML = colorNameLanguage === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English';
  }

  showToast(colorNameLanguage === 'ko' ? '한국어로 표시됩니다 🇰🇷' : 'Displaying in English 🇺🇸');
  saveColorNameSettings();
}

//NOTE - 색상 이름 설정 초기화
function initColorNameSettings() {
  // localStorage에서 설정 불러오기
  const savedShowNames = localStorage.getItem('showColorNames');
  const savedLanguage = localStorage.getItem('colorNameLanguage');

  if (savedShowNames !== null) {
    showColorNames = savedShowNames === 'true';
  }

  if (savedLanguage) {
    colorNameLanguage = savedLanguage;
  }

  // 버튼 상태 업데이트
  const nameBtn = document.getElementById('colorNameBtn');
  const langBtn = document.getElementById('langToggleBtn');

  if (nameBtn) {
    nameBtn.classList.toggle('active', showColorNames);
    nameBtn.innerHTML = showColorNames ? '🏷 이름 표시 중' : '🏷 이름 표시';
  }

  if (langBtn) {
    langBtn.innerHTML = colorNameLanguage === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English';
  }
}

//NOTE - 설정 저장
function saveColorNameSettings() {
  localStorage.setItem('showColorNames', showColorNames);
  localStorage.setItem('colorNameLanguage', colorNameLanguage);
}