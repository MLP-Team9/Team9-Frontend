# 전체 프로젝트 실행 가이드  
(프론트엔드 + 코랩 GPU 백엔드 + ngrok)

---

# 1. 실행에 필요한 라이브러리

### **프론트엔드 주요 Dependencies**
| 라이브러리 | 역할 |
|-----------|------|
| react / react-dom | React UI |
| vite | 개발 서버 / 번들러 |
| typescript | 타입 시스템 |
| axios | API 요청 |
| tailwindcss | CSS 유틸리티 |
| postcss / autoprefixer | Tailwind 빌드 |
| sonner | 알림 Toast |
| clsx + tailwind-merge | className 병합 유틸 |
| lucide-react | 아이콘 |
| shadcn/ui 구조 | 버튼/텍스트필드 등 UI |

---

# 2. 실행 환경(Environment)

### **필요 조건**
- Node.js v24.11.0
- npm
- Vite 기반 React
- TailwindCSS
- 백엔드: Google Colab GPU

### **프론트 환경 변수**
`.env`
VITE_SERVER_URL_API=[ngrok에서 받은 url]

---

# 3. 프론트엔드 실행 명령어

### 1. 의존성 설치
npm install

### 2. 개발 서버 실행
npm run dev

# 4. 백엔드 로컬 구동 (Google Colab GPU + ngrok)

### 1. 구글 드라이브에 백엔드 파일 패키지 업로드

### 2. Google Colab GPU 실행 환경 설정
Colab 메뉴에서: 런타임 → 런타임 유형 변경 → 하드웨어 가속기: GPU

### 3. 필요한 패키지 설치
!pip install flask-cors (cors 방지)
!pip install pyngrok (ngrok)

### 4. 코랩에서 구글 드라이브와 연결 후 업로드한 패키 경로로 이동
from google.colab import drive
drive.mount('/content/drive')
cd /content/drive/MyDrive/[패키지명]/

### 5. ngrok auth 토큰으로 인증
인증 토큰 발급 방법: ngrok 홈페이지에서 로그인 후 대시보드에서 auth token 복사
!ngrok config add-authtoken [인증토큰]

### 6. 백그라운드에서 백엔드 서버 실행
!nohup python /content/drive/MyDrive/[패키지명]/[실행 파일] &

### 7. ngrok 실행 후 baseurl 발급
from pyngrok import ngrok
public_url = ngrok.connect([포트주소])
print("External URL:", public_url)
ngrok.connect([포트주소)

### 프론트에서 연동 테스트
baseurl을 ngrok에서 받은 url로 설정 후 테스트
