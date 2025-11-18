import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sparkles, FileText, Zap } from 'lucide-react';

interface HomeScreenProps {
  onGenerate: (prompt: string) => void;
}

export function HomeScreen({ onGenerate }: HomeScreenProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const examplePrompts = [
    '프론트엔드 개발자 포지션에 지원하려고 합니다. React와 TypeScript 경험을 강조해주세요.',
    '백엔드 개발 경험과 문제 해결 능력을 중심으로 자소서를 작성해주세요.',
    '신입 개발자로서의 열정과 학습 능력을 어필하는 자소서를 써주세요.',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8">
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
            원하는 내용을 입력하면 맞춤형 자소서를 생성해드립니다.
          </p>
        </div>

        {/* 입력 영역 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <label className="text-gray-700">
                자소서 작성 요청사항을 입력해주세요
              </label>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="예: 웹 개발 경험과 팀 프로젝트에서의 협업 능력을 강조하는 자소서를 작성해주세요."
              className="min-h-[200px] resize-none text-gray-800 placeholder:text-gray-400"
            />
            <p className="text-sm text-gray-500">
              Cmd/Ctrl + Enter로 빠르게 생성할 수 있습니다
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12"
          >
            <Zap className="w-5 h-5 mr-2" />
            자소서 생성하기
          </Button>
        </div>

        {/* 예시 프롬프트 */}
        <div className="space-y-4">
          <p className="text-center text-sm text-gray-600">💡 이런 식으로 요청해보세요</p>
          <div className="grid gap-3">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="text-left p-4 bg-white/60 hover:bg-white rounded-xl transition-colors border border-indigo-100"
              >
                <p className="text-sm text-gray-700">{example}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
