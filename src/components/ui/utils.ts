import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn(): Tailwind + 조건부 class 병합을 위한 유틸 함수
// - clsx() : 조건부 클래스를 문자열로 변환해주는 라이브러리
// - twMerge() : Tailwind 클래스 충돌을 자동으로 해결해주는 라이브러리
//
// 두 함수를 조합해서 React 프로젝트에서 가장 깔끔한 className 병합을 구현함.
//    사용 예: cn("p-4", condition && "bg-red-500", "p-2") → "bg-red-500 p-2"
//    (p-4 과 p-2 충돌 시 tailwind-merge가 p-2를 최종 적용)
//
export function cn(...inputs: ClassValue[]) {
  // ① clsx(inputs): Boolean/undefined/null 등을 제거하고 정리된 문자열로 변환
  // ② twMerge(): Tailwind 유틸리티 클래스 충돌(p-4 vs p-2 등) 자동 해결
  return twMerge(clsx(inputs));
}