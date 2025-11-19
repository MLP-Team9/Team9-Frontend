// axios 라이브러리 임포트
import axios from 'axios';

// axios 기본 설정을 가진 인스턴스 생성
export const api = axios.create({
  // .env 파일에 정의된 서버 주소를 baseURL로 사용
  baseURL: import.meta.env.VITE_SERVER_URL_API,
  // 모든 요청에서 JSON 형식을 기본으로 사용
  headers: { 'Content-Type': 'application/json' },
});

// 서버로부터 받을 응답 타입 정의 (타입스크립트 인터페이스)
export interface ReviseResponse {
  feedback_result: string;     // 피드백 결과 요약
  cheer_message: string;       // 응원 메시지
  feedback_rewrite: string;    // 수정된 문장 또는 전체 글
}

// 에세이 분석 API 호출 함수
// essayText(사용자 입력 에세이), jobDescription(직무 설명)을 전달하여
// 서버에서 AI 피드백을 받아오는 비동기 함수
export async function reviseEssay(essayText: string, jobDescription: string): Promise<ReviseResponse> {
  // axios.post로 서버의 /api/revise 엔드포인트 호출
  // 제네릭 <ReviseResponse> 를 사용하여 응답 타입을 보장
  const response = await api.post<ReviseResponse>('/api/revise', {
    job_description: jobDescription, // 직무 설명
    essay_text: essayText,           // 에세이 본문
  });

  // 서버에서 받은 data 필드만 반환 (axios 응답 객체 중 data만 사용)
  return response.data;
}