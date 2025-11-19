import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./App.css";
import './index.css';

// React 18 방식의 루트 생성
// document.getElementById('root')! → index.html의 #root 요소를 가져옴
createRoot(document.getElementById('root')!).render(
  // StrictMode 활성화
  // - 개발 환경에서만 동작
  // - 일부 React 라이프사이클을 두 번 실행하여 잠재적 버그를 잡아줌
  <StrictMode>
    {/* 애플리케이션의 최상위 컴포넌트 */}
    <App />
  </StrictMode>,
)