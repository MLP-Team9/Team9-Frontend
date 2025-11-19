import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL_API,
  headers: { 'Content-Type': 'application/json' },
});

export interface ReviseResponse {
  feedback_result: string;
  cheer_message: string;
  feedback_rewrite: string; 
}

export async function reviseEssay(essayText: string, jobDescription: string): Promise<ReviseResponse> {
  const response = await api.post<ReviseResponse>('/api/revise', {
    job_description: jobDescription,
    essay_text: essayText,
  });
  return response.data;
}