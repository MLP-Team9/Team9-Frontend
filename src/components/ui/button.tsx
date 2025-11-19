import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// buttonVariants: 버튼 스타일을 variant/size 조합으로 관리하는 함수
// cva() = "class-variance-authority" 라이브러리 → 조건부 Tailwind 스타일을 깔끔하게 관리
const buttonVariants = cva(
  // 버튼의 공통 기본 스타일
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      // variant 종류별 클래스 조합 (디자인 시스템 역할)
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },

      // 버튼 크기 옵션
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md", // 정사각형 아이콘 버튼
      },
    },

    // variant/size 기본값
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Button 컴포넌트 정의
function Button({
  className,
  variant,
  size,
  asChild = false,       // Slot 사용 여부: 버튼이 아닌 다른 요소에 button 스타일 적용 가능
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {

  // asChild가 true면 Button의 HTML 요소를 Slot으로 대체
  // 예: <Button asChild><a href="/">링크</a></Button>
  // → a 태그가 button 스타일을 그대로 가져감
  const Comp = asChild ? Slot : "button";

  // variant + size 조합의 클래스 + 사용자 className 병합
  const classes = cn(buttonVariants({ variant, size }), className);

  return (
    // data-slot="button" → UI theme 시스템에서 필요한 hook 역할
    <Comp data-slot="button" className={classes} {...props} />
  );
}

export { Button };