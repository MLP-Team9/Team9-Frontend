import { Button } from './ui/button';
import { ArrowLeft, Copy, Download, CheckCircle, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FeedbackResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missing_keywords: string[];
  overall_advice: string;
}

interface ResultScreenProps {
  coverLetter: string;
  userPrompt: string;
  onBack: () => void;
  isLoading: boolean;

  // API 응답 전체
  apiResponse: {
    feedback_result: string;
    cheer_message: string;
  } | null;

  // 선택적 기존 값
  feedbackResult?: string;      // JSON string
  feedbackRewrite?: string;     // 첨삭된 자소서
}

export function ResultScreen({
  coverLetter,
  apiResponse,
  onBack,
  feedbackResult,
  feedbackRewrite
}: ResultScreenProps) {
  const [copied, setCopied] = useState(false);

 // feedback 선택 소스
  let feedback: FeedbackResult | null = null;

  if (feedbackResult) {
    try {
      feedback = JSON.parse(feedbackResult);
    } catch (err) {
      console.error("Failed to parse feedbackResult:", err);
    }
  } else if (apiResponse) {
    try {
      feedback = JSON.parse(apiResponse.feedback_result);
    } catch (err) {
      console.error("Failed to parse apiResponse.feedback_result:", err);
    }
  }

  const finalCoverLetter = feedbackRewrite || coverLetter;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalCoverLetter);
      setCopied(true);
      toast.success('클립보드에 복사되었습니다!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('복사에 실패했습니다.');
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([finalCoverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = '자기소개서.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('자소서가 다운로드되었습니다!');
  };

  // 색상 라벨 함수
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return '우수';
    if (score >= 80) return '양호';
    if (score >= 70) return '보통';
    return '개선 필요';
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="text-gray-700 hover:text-gray-900 cursor-pointer">
            <ArrowLeft className="w-5 h-5 mr-2" />
            다시 작성하기
          </Button>

          <div className="flex gap-2">
            <Button onClick={handleCopy} variant="outline" className="bg-white">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "복사됨!" : "복사하기"}
            </Button>

            <Button onClick={handleDownload} variant="outline" className="bg-white">
              <Download className="w-4 h-4 mr-2" />
              다운로드
            </Button>
          </div>
        </div>

        {/* 분석 결과 */}
        {feedback && (
          <div className="flex flex-wrap gap-6">
            {/* 점수 */}
            <div className="flex-1 min-w-[280px] bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h3 className="text-gray-900">종합 점수</h3>
              </div>

              <div className={`flex items-center justify-center py-8 rounded-lg border-2 ${getScoreColor(feedback.score)}`}>
                <div className="text-center">
                  <div className="text-5xl mb-2">{feedback.score}</div>
                  <div className="text-sm">{getScoreLabel(feedback.score)}</div>
                </div>
              </div>
            </div>

            {/* 키워드 */}
            <div className="flex-1 min-w-[280px] bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <h3 className="text-gray-900">누락된 키워드</h3>
              </div>

              {feedback.missing_keywords.length ? (
                feedback.missing_keywords.map((k, i) => (
                  <div key={i} className="bg-amber-50 px-3 py-2 rounded-lg flex items-center gap-2 text-gray-700">
                    <span className="text-amber-600">•</span>
                    {k}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">모든 키워드가 포함되어 있습니다! 👍</p>
              )}
            </div>

            {/* 강점 */}
            <div className="flex-1 min-w-[280px] bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-gray-900">강점</h3>
              </div>

              <div className='flex flex-col gap-1'>
              {feedback.strengths.map((s, i) => (
                <div key={i} className="flex gap-3 ">
                  <span className="text-green-600">✓</span>
                  <p className="flex items-center text-gray-700 text-sm">{s}</p>
                </div>
              ))}
              </div>
            </div>

            {/* 약점 */}
            <div className="flex-1 min-w-[280px] bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h3 className="text-gray-900">약점</h3>
              </div>

              <div className='flex flex-col gap-1'>
              {feedback.weaknesses.length ? (
                feedback.weaknesses.map((w, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-orange-600">!</span>
                    <p className="flex items-center text-gray-700 text-sm">{w}</p>
                  </div>
                ))
                
              ) : (
                <p className="text-gray-500 text-sm">특별한 약점이 없습니다!</p>
              )}
              </div>
            </div>
          </div>
        )}

        {/* 종합 의견 */}
        {feedback?.overall_advice && (
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h4 className="text-indigo-900 mb-2">종합 조언</h4>
            <p className="text-gray-700">{feedback.overall_advice}</p>
          </div>
        )}

        {/* 첨삭된 자소서 */}
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-gray-900">
              {feedbackRewrite ? '첨삭 완료된 자기소개서' : '생성된 자기소개서'}
            </h2>

            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              완성
            </div>
          </div>

          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {finalCoverLetter}
          </div>
        </div>

      </div>
    </div>
  );
}
