import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ResultScreen } from './components/ResultScreen';
import { Toaster } from './components/ui/sonner';
import { reviseEssay, ReviseResponse } from './API';
import { toast } from 'sonner';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'result'>('home');
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [apiResponse, setApiResponse] = useState<ReviseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (data: { essay_text: string; job_description: string }) => {
    setIsLoading(true);
    setUserPrompt(data.essay_text);

    try {
      const response = await reviseEssay(data.essay_text, data.job_description);
      setGeneratedCoverLetter(response.feedback_rewrite);
      setApiResponse(response);
      setCurrentScreen('result');
    } catch (error) {
      console.error(error);
      toast.error('API 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 width-full">
        {currentScreen === 'home' ? (
          <HomeScreen onGenerate={handleGenerate} isLoading={isLoading} />
        ) : (
          <ResultScreen 
            coverLetter={generatedCoverLetter} 
            userPrompt={userPrompt}
            apiResponse={apiResponse}
            isLoading={isLoading}
            onBack={handleBack} 
          />
        )}
      </div>
      <Toaster />
    </>
  );
}