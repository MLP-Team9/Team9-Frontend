import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ResultScreen } from './components/ResultScreen';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'result'>('home');
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');

  const handleGenerate = (prompt: string) => {
    setUserPrompt(prompt);
    
    // 모킹된 자소서 생성 로직
    const mockCoverLetter = generateMockCoverLetter(prompt);
    setGeneratedCoverLetter(mockCoverLetter);
    setCurrentScreen('result');
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {currentScreen === 'home' ? (
          <HomeScreen onGenerate={handleGenerate} />
        ) : (
          <ResultScreen 
            coverLetter={generatedCoverLetter} 
            userPrompt={userPrompt}
            onBack={handleBack} 
          />
        )}
      </div>
      <Toaster />
    </>
  );
}

// 모킹된 자소서 생성 함수
function generateMockCoverLetter(prompt: string): string {
  const templates = [
    `저는 IT 분야에서 ${extractKeywords(prompt)}을(를) 통해 성장하고자 하는 열정적인 지원자입니다.

대학 재학 중 다양한 프로젝트와 팀 활동을 통해 기술적 역량과 협업 능력을 키워왔습니다. 특히 ${extractKeywords(prompt)}에 깊은 관심을 가지고 관련 기술 스택을 학습하며 실무 경험을 쌓아왔습니다.

최근에는 팀 프로젝트에서 ${extractKeywords(prompt)} 관련 기능을 구현하며, 문제 해결 능력과 코드 품질 개선에 대한 중요성을 깊이 체감했습니다. 이 과정에서 단순히 기능을 구현하는 것을 넘어, 사용자 경험을 고려한 설계와 유지보수 가능한 코드 작성의 중요성을 배웠습니다.

귀사에 입사하게 된다면, 지속적인 학습과 성장을 통해 팀에 기여하는 개발자가 되겠습니다. 새로운 기술을 빠르게 습득하고 적용하는 능력을 바탕으로, 귀사의 서비스 발전에 이바지하고 싶습니다.

감사합니다.`,
    
    `안녕하십니까. ${extractKeywords(prompt)} 분야에서 전문성을 갖춘 개발자로 성장하고자 지원하게 되었습니다.

저는 문제를 분석하고 해결하는 과정에서 큰 성취감을 느낍니다. 학부 과정에서 배운 이론을 실제 프로젝트에 적용하며, ${extractKeywords(prompt)}에 대한 이해도를 높여왔습니다. 특히 개인 프로젝트를 통해 기획부터 배포까지 전 과정을 경험하며, 개발자로서의 책임감과 완성도에 대한 중요성을 깨달았습니다.

또한 온라인 커뮤니티와 스터디 그룹 활동을 통해 최신 기술 트렌드를 꾸준히 학습하고 있습니다. ${extractKeywords(prompt)}와 관련된 새로운 기술과 방법론을 적극적으로 습득하며, 실무에 적용할 수 있는 역량을 갖추기 위해 노력하고 있습니다.

귀사의 일원이 되어 제가 쌓아온 기술과 열정을 바탕으로 의미 있는 가치를 창출하고 싶습니다. 끊임없이 배우고 성장하는 개발자가 되겠습니다.

감사합니다.`
  ];

  // 랜덤하게 템플릿 선택
  return templates[Math.floor(Math.random() * templates.length)];
}

function extractKeywords(prompt: string): string {
  const keywords = ['웹 개발', '백엔드', '프론트엔드', '풀스택', '데이터 분석', 'AI/ML'];
  
  for (const keyword of keywords) {
    if (prompt.indexOf(keyword) !== -1) {
      return keyword;
    }
  }
  
  // 일반적인 키워드 추출
  if (prompt.indexOf('개발') !== -1) return '소프트웨어 개발';
  if (prompt.indexOf('데이터') !== -1) return '데이터 처리';
  if (prompt.indexOf('AI') !== -1 || prompt.indexOf('인공지능') !== -1) return 'AI 기술';
  
  return 'IT 기술';
}