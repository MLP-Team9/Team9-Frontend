import { Toaster as Sonner, type ToasterProps } from "sonner";

// 커스텀 Toaster 컴포넌트
// 👉 외부에서 ToasterProps를 그대로 받아 sonner의 Toaster로 전달
const Toaster = ({ theme = "light", ...props }: ToasterProps) => {
  return (
    <Sonner
      // 기본 테마(light/dark) 지정
      theme={theme}

      // 커스텀 CSS 클래스를 적용 (프로젝트 전용 스타일링 가능)
      className="toaster group"

      // CSS 변수 기반 색상 커스터마이징
      // Sonner는 CSS Variables로 배경/텍스트/보더를 제어할 수 있음
      style={
        {
          "--normal-bg": "var(--popover)",                 // 알림 배경 색
          "--normal-text": "var(--popover-foreground)",    // 알림 텍스트 색
          "--normal-border": "var(--border)",              // 알림 테두리 색
        } as React.CSSProperties
      }

      // 나머지 props를 Sonner에 모두 전달
      {...props}
    />
  );
};

export { Toaster };