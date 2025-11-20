import { Button } from './ui/button';
import { ArrowLeft, Copy, Download, CheckCircle, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FeedbackResult {
  score: number;               // 자소서 품질 점수
  strengths: string[];         // 강점 목록
  weaknesses: string[];        // 약점 목록
  missing_keywords: string[];  // 누락된 필수 키워드
  overall_advice: string;      // 종합 조언
}

interface ResultScreenProps {
  coverLetter: string;         // 생성된 자소서 텍스트
  userPrompt: string;          // 원본 사용자 입력 (현재 사용 X)
  onBack: () => void;          // 뒤로가기 함수
  isLoading: boolean;          // 로딩 상태 (현재 사용 X)

  // API 응답 데이터 구조
  apiResponse: {
    feedback_result: string;   // JSON 형태의 분석 결과 텍스트
    cheer_message: string;     // 응원 메시지
  } | null;

  // 선택적 전달 값 (예: 수정모드에서 주입)
  feedbackResult?: string;     // 강점·약점·점수 JSON
  feedbackRewrite?: string;    // 첨삭된 자소서 내용
}

export function ResultScreen({
  coverLetter,
  apiResponse,
  onBack,
  feedbackResult,
  feedbackRewrite
}: ResultScreenProps) {
  // 복사 애니메이션 및 상태
  const [copied, setCopied] = useState(false);

  // 피드백 분석 내용(점수/강점/약점 등)
  let feedback: FeedbackResult | null = null;

  // 1) 외부에서 주입된 feedbackResult가 있으면 우선 사용
  if (feedbackResult) {
    try {
      feedback = JSON.parse(feedbackResult);   // 문자열 JSON → 객체로 변환
    } catch (err) {
      console.error("Failed to parse feedbackResult:", err);
    }
  }
  // 2) 기본적으로는 API 응답의 feedback_result 사용
  else if (apiResponse) {
    try {
      feedback = JSON.parse(apiResponse.feedback_result);
    } catch (err) {
      console.error("Failed to parse apiResponse.feedback_result:", err);
    }
  }

  // 최종적으로 화면에 표시할 자소서
  const finalCoverLetter = feedbackRewrite || coverLetter;

  // 클립보드 복사 기능
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

  // 결과 텍스트 파일 다운로드
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([finalCoverLetter], { type: 'text/plain' });

    // blob URI 생성하여 링크로 다운로드
    element.href = URL.createObjectURL(file);
    element.download = '자기소개서.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success('자소서가 다운로드되었습니다!');
  };

  // 점수별 색상 스타일 반환
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  // 점수별 라벨 텍스트
  const getScoreLabel = (score: number) => {
    if (score >= 90) return '우수';
    if (score >= 80) return '양호';
    if (score >= 70) return '보통';
    return '개선 필요';
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* -------- 헤더 영역 (뒤로가기 + 복사/다운로드 버튼) -------- */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="text-gray-700 hover:text-gray-900 cursor-pointer">
            <ArrowLeft className="w-5 h-5 mr-2" />
            다시 작성하기
          </Button>

          <div className="flex gap-2">
            {/* 복사 버튼 */}
            <Button onClick={handleCopy} variant="outline" className="bg-white cursor-pointer">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "복사됨!" : "복사하기"}
            </Button>

            {/* 다운로드 버튼 */}
            <Button onClick={handleDownload} variant="outline" className="bg-white cursor-pointer">
              <Download className="w-4 h-4 mr-2" />
              다운로드
            </Button>
          </div>
        </div>

        {/* -------- AI 분석 결과 카드 모음 -------- */}
        {feedback && (
          <div className="flex flex-wrap gap-6">

            {/* ----- 종합 점수 카드 ----- */}
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

            {/* ----- 누락된 키워드 카드 ----- */}
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

            {/* ----- 강점 카드 ----- */}
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

            {/* ----- 약점 카드 ----- */}
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

        {/* -------- 종합 의견 카드 -------- */}
        {feedback?.overall_advice && (
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h4 className="text-indigo-900 mb-2">종합 조언</h4>
            <p className="text-gray-700">{feedback.overall_advice}</p>
          </div>
        )}

        {/* -------- 최종 자소서 출력 영역 -------- */}
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-gray-900">
              {feedbackRewrite ? '첨삭 완료된 자기소개서' : '생성된 자기소개서'}
            </h2>

            {/* 상태 라벨 (완성) */}
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              완성
            </div>
          </div>

          {/* 줄바꿈 유지 & 본문 렌더링 */}
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {finalCoverLetter}
          </div>
        </div>

      </div>
    </div>
  );
}