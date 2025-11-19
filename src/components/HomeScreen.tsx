import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles, FileText, Zap, Briefcase } from 'lucide-react';

interface HomeScreenProps {
  // 부모(App)에서 전달되는 API 호출 함수
  onGenerate: (data: { essay_text: string; job_description: string }) => void;

  // 로딩 상태 (API 호출 중 true)
  isLoading: boolean;
}

export function HomeScreen({ onGenerate, isLoading }: HomeScreenProps) {
  // 사용자 자소서 텍스트
  const [essayText, setEssayText] = useState('');

  // 직무 공고 텍스트
  const [jobDescription, setJobDescription] = useState('');

  // 버튼 클릭 or 단축키(CTRL/CMD + Enter) 시 실행
  const handleSubmit = () => {
    // 두 입력이 모두 채워졌을 때만 API 호출
    if (essayText.trim() && jobDescription.trim()) {
      onGenerate({
        essay_text: essayText,
        job_description: jobDescription
      });
    }
  };

  // 텍스트 입력 중 CTRL/CMD + Enter → 바로 제출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* API 요청 중일 때 화면 전체를 덮는 로딩 오버레이 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-3">
            {/* 로딩 스피너 */}
            <div className="animate-spin h-8 w-8 rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-indigo-800 font-semibold">AI 분석 중입니다...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl w-full space-y-8">
        {/* 상단 헤더 영역 */}
        <div className="text-center space-y-4">
          {/* 아이콘 배경 박스 */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>

          {/* 제목 */}
          <h1 className="text-indigo-900">
            IT 자소서 AI 첨삭
          </h1>

          {/* 설명 문구 */}
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI가 당신의 IT 커리어 스토리를 전문적인 자기소개서로 완성해드립니다.
            <br />
            자소서와 공고 내용을 입력하면 맞춤형 첨삭을 제공합니다.
          </p>
        </div>

        {/* 본문 입력 영역 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">

          {/* 자기소개서 입력 영역 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <label className="text-gray-700">
                자기소개서 내용
              </label>
            </div>

            <Textarea
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="첨삭받을 자소서 내용을 입력해주세요..."
              className="min-h-[200px] resize-none text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {/* 직무 설명 입력 영역 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <label className="text-gray-700">
                지원 직무 공고
              </label>
            </div>

            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="지원하려는 직무의 공고 내용을 입력해주세요 (회사명, 직무, 자격요건, 우대사항 등)..."
              className="min-h-[150px] resize-none text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {/* AI 첨삭 시작하기 버튼 */}
          <Button
            onClick={handleSubmit}
            disabled={!essayText.trim() || !jobDescription.trim()} // 필수 입력 검증
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 cursor-pointer"
          >
            <Zap className="w-5 h-5 mr-2" />
            AI 첨삭 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}