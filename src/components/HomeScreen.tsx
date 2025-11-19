import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles, FileText, Zap, Briefcase } from 'lucide-react';

interface HomeScreenProps {
  onGenerate: (data: { essay_text: string; job_description: string }) => void;
  isLoading: boolean;
}

export function HomeScreen({ onGenerate, isLoading }: HomeScreenProps) {
  const [essayText, setEssayText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = () => {
    if (essayText.trim() && jobDescription.trim()) {
      onGenerate({
        essay_text: essayText,
        job_description: jobDescription
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-3">
            <div className="animate-spin h-8 w-8 rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-indigo-800 font-semibold">AI 분석 중입니다...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl w-full space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-indigo-900">
            IT 자소서 AI 첨삭
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI가 당신의 IT 커리어 스토리를 전문적인 자기소개서로 완성해드립니다.
            <br />
            자소서와 공고 내용을 입력하면 맞춤형 첨삭을 제공합니다.
          </p>
        </div>

        {/* 입력 영역 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* 자소서 입력 */}
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

          {/* 직무 설명 입력 */}
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

          <Button
            onClick={handleSubmit}
            disabled={!essayText.trim() || !jobDescription.trim()}
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
