import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ResultScreen } from './components/ResultScreen';
import { Toaster } from './components/ui/sonner';
import { reviseEssay, ReviseResponse } from './API';
import { toast } from 'sonner';

export default function App() {
  // 현재 화면 상태: home 화면인지 result 화면인지 관리
  const [currentScreen, setCurrentScreen] = useState<'home' | 'result'>('home');

  // 사용자가 입력한 에세이(프롬프트) 저장
  const [userPrompt, setUserPrompt] = useState('');

  // 서버에서 생성된 자기소개서(피드백 기반 rewrite) 저장
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');

  // 서버에서 받은 전체 응답 객체 저장
  const [apiResponse, setApiResponse] = useState<ReviseResponse | null>(null);

  // API 요청 로딩 상태 관리 (스피너/버튼 비활성화에 사용)
  const [isLoading, setIsLoading] = useState(false);

  // HomeScreen에서 "생성하기" 버튼 눌렀을 때 실행되는 함수
  const handleGenerate = async (data: { essay_text: string; job_description: string }) => {
    setIsLoading(true);                // 요청 시작 → 로딩 true
    setUserPrompt(data.essay_text);    // 화면에 표시할 사용자 입력 저장

    try {
      // reviseEssay API 호출 → AI 피드백 및 rewrite 결과 받아옴
      const response = await reviseEssay(data.essay_text, data.job_description);

      // 응답에서 필요한 데이터 상태 업데이트
      setGeneratedCoverLetter(response.feedback_rewrite);  
      setApiResponse(response);

      // 화면을 result 화면으로 전환
      setCurrentScreen('result');
    } catch (error) {
      // 오류 발생 시 콘솔 출력 + UI 토스트 메시지 표시
      console.error(error);
      toast.error('API 요청 중 오류가 발생했습니다.');
    } finally {
      // 성공/실패 관계 없이 로딩 종료
      setIsLoading(false);
    }
  };

  // 결과 화면에서 "뒤로가기" 눌렀을 때 home 화면으로 이동
  const handleBack = () => {
    setCurrentScreen('home');
  };

  return (
    <>
      {/* 전체 배경 그라데이션 */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 width-full">
        {/* 현재 화면 상태에 따라 다른 컴포넌트 렌더링 */}
        {currentScreen === 'home' ? (
          // 홈 화면
          <HomeScreen onGenerate={handleGenerate} isLoading={isLoading} />
        ) : (
          // 결과 화면
          <ResultScreen 
            coverLetter={generatedCoverLetter}  // 생성된 자기소개서
            userPrompt={userPrompt}             // 사용자 입력
            apiResponse={apiResponse}           // 전체 AI 응답 데이터
            isLoading={isLoading}               // 로딩 상태
            onBack={handleBack}                 // 뒤로가기 핸들러
          />
        )}
      </div>

      {/* Sonner 알림 시스템 */}
      <Toaster />
    </>
  );
}