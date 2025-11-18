import { Button } from './ui/button';
import { ArrowLeft, Copy, Download, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ResultScreenProps {
  coverLetter: string;
  userPrompt: string;
  onBack: () => void;
}

export function ResultScreen({ coverLetter, userPrompt, onBack }: ResultScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      toast.success('클립보드에 복사되었습니다!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('복사에 실패했습니다.');
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = '자기소개서.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('자소서가 다운로드되었습니다!');
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            다시 작성하기
          </Button>
          
          <div className="flex gap-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="bg-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? '복사됨!' : '복사하기'}
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="bg-white"
            >
              <Download className="w-4 h-4 mr-2" />
              다운로드
            </Button>
          </div>
        </div>

        {/* 요청사항 카드 */}
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <RefreshCw className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-indigo-900 mb-2">
                요청사항
              </h3>
              <p className="text-gray-700">
                {userPrompt}
              </p>
            </div>
          </div>
        </div>

        {/* 생성된 자소서 */}
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-gray-900">
              생성된 자기소개서
            </h2>
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              완성
            </div>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {coverLetter}
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-amber-900 mb-2">
                팁
              </h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• 생성된 자소서를 본인의 경험에 맞게 수정하여 사용하세요</li>
                <li>• 구체적인 프로젝트명, 기술 스택, 성과를 추가하면 더욱 좋습니다</li>
                <li>• 회사별 인재상과 직무 설명에 맞게 커스터마이징하세요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
