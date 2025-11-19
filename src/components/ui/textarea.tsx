import * as React from "react";

import { cn } from "./utils";

// 공용 Textarea 컴포넌트
// ➜ React의 textarea 기본 속성(ComponentProps<"textarea">)을 그대로 받음
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"  // UI 라이브러리에서 사용할 수도 있는 data 속성
      className={cn(
        // 기본 스타일 정의
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        // 상위에서 전달된 className을 병합
        // cn(): 조건부 클래스 병합 유틸리티
        className,
      )}
      // textarea가 가질 수 있는 모든 props를 그대로 전달
      // onChange, value, disabled 등 React textarea 속성 모두 적용 가능
      {...props}
    />
  );
}

export { Textarea };