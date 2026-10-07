/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Exam & Matrix Editor: Phân hệ 3 - Đề kiểm tra & Ma trận chuẩn Công văn 7991/BGDĐT-GDTrH (17/12/2024)
 */

import React, { useState } from 'react';
import { 
  Exam7991, 
  LessonPlan5512, 
  ExamPart1Question, 
  ExamPart2Question, 
  ExamPart3Question, 
  ExamPart4Question,
  TeacherProfile
} from '../types/eduharness';
import { 
  GraduationCap, 
  Grid, 
  Download, 
  Printer, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  Award,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserX
} from 'lucide-react';
import { exportExamToWord } from '../utils/exportUtils';

interface ExamMatrixEditorProps {
  exam: Exam7991;
  khbd: LessonPlan5512;
  setExam: React.Dispatch<React.SetStateAction<Exam7991>>;
  initialView?: 'exam' | 'matrix';
  profile?: TeacherProfile;
  onToggleTeacherOnExam?: () => void;
}

export const ExamMatrixEditor: React.FC<ExamMatrixEditorProps> = ({
  exam,
  khbd,
  setExam,
  initialView = 'exam',
  profile,
  onToggleTeacherOnExam,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'exam' | 'matrix' | 'specs' | 'key'>(
    initialView === 'matrix' ? 'matrix' : 'exam'
  );
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(true);
  const [expandedSection, setExpandedSection] = useState<string>('all');

  const schoolName = profile?.school || khbd.schoolName;
  const department = profile?.department || khbd.department;
  const teacherName = profile?.name || khbd.teacherName;
  const subject = profile?.subject || exam.subject;
  const academicYear = profile?.academicYear || khbd.academicYear;
  const showTeacher = profile?.showTeacherOnExam !== false;

  // Audit Calculations
  const part1Total = exam.part1_mcq.reduce((sum, q) => sum + q.point, 0);
  const part2Total = exam.part2_trueFalse.reduce((sum, q) => sum + q.point, 0);
  const part3Total = exam.part3_shortAns.reduce((sum, q) => sum + q.point, 0);
  const part4Total = exam.part4_essay.reduce((sum, q) => sum + q.maxScore, 0);
  const grandTotal = part1Total + part2Total + part3Total + part4Total;

  // Student test simulation state
  const [studentAnswersP1, setStudentAnswersP1] = useState<Record<string, string>>({});
  const [studentAnswersP2, setStudentAnswersP2] = useState<Record<string, Record<string, boolean>>>({});
  const [studentAnswersP3, setStudentAnswersP3] = useState<Record<string, string>>({});

  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm no-print">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Phân hệ Đề Kiểm Tra & Ma Trận (Công văn 7991)
                </h2>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Barem chuẩn: 10.0 điểm
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Tuyệt đối tuân thủ Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024: 4 phần độc lập & ma trận 40-30-30
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleTeacherOnExam && (
              <button
                onClick={onToggleTeacherOnExam}
                title="Bật/Tắt hiển thị tên giáo viên trên đề kiểm tra"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  showTeacher 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {showTeacher ? <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> : <UserX className="w-3.5 h-3.5 text-slate-400" />}
                <span>{showTeacher ? 'Tên GV: BẬT' : 'Tên GV: TẮT'}</span>
              </button>
            )}

            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                showAnswerKey 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {showAnswerKey ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showAnswerKey ? 'Ẩn đáp án & barem' : 'Hiện đáp án & barem'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In A4</span>
            </button>

            <button
              onClick={() => exportExamToWord(exam, khbd, profile)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Word (.doc)</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs: Đề thi 4 phần / Ma trận / Bản đặc tả / Barem chấm */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1 no-print">
          <button
            onClick={() => setActiveSubTab('exam')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'exam'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Đề kiểm tra 4 phần chính thức</span>
          </button>

          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'matrix'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Ma trận đề thi (Phụ lục 1)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('specs')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'specs'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bản đặc tả yêu cầu (Phụ lục 2)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('key')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'key'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Bảng đáp án & Hướng dẫn chấm</span>
          </button>
        </div>

        {/* VIEW 1: ĐỀ THI 4 PHẦN CHÍNH THỨC */}
        {activeSubTab === 'exam' && (
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-8 md:p-12 text-slate-900 text-sm leading-relaxed">
            
            {/* Header Đề thi chuẩn Quốc gia */}
            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-200">
              <div className="text-center space-y-1">
                <div className="font-bold text-xs uppercase text-slate-700">
                  {schoolName}
                </div>
                <div className="font-semibold text-xs text-slate-600">
                  TỔ CHUYÊN MÔN: {department}
                </div>
                <div className="text-xs font-mono font-bold text-blue-700 pt-1">
                  MÃ ĐỀ THI: {exam.examCode}
                </div>
                {showTeacher && (
                  <div className="text-xs text-slate-600 font-medium pt-0.5">
                    Giáo viên ra đề: <b>{teacherName}</b>
                  </div>
                )}
              </div>

              <div className="text-center space-y-1">
                <div className="font-bold text-xs uppercase text-slate-800">
                  {exam.title}
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  Môn: <b>{subject}</b> - Khối <b>{exam.grade}</b>
                </div>
                <div className="text-xs text-slate-500">
                  Năm học: <b>{academicYear}</b>
                </div>
                <div className="text-xs text-slate-500 italic">
                  Thời gian làm bài: <b>{exam.timeAllowedMinutes} phút</b> (Không kể thời gian phát đề)
                </div>
              </div>
            </div>


            {/* Student Info Box */}
            <div className="my-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex justify-between items-center text-slate-600">
              <div>
                Họ và tên thí sinh: ........................................................................................
              </div>
              <div>Số báo danh: ..................... Lớp: .............</div>
            </div>

            {/* BAREM COMPLIANCE NOTIFICATION */}
            <div className="mb-6 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <b>Cấu trúc đề kiểm tra Công văn 7991:</b> Phần I (3.0đ) · Phần II (2.0đ) · Phần III (2.0đ) · Phần IV (3.0đ) = <b>10.0 điểm</b>.
                </span>
              </div>
              <span className="font-mono font-bold text-emerald-800">ĐẠT CHUẨN</span>
            </div>

            {/* ===================== PHẦN I ===================== */}
            <div className="mb-10 space-y-4">
              <div className="bg-blue-50/80 border-l-4 border-blue-600 px-4 py-2.5 rounded-r-lg flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-blue-900 uppercase">
                    PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 điểm)
                  </h3>
                  <p className="text-[11px] text-blue-700">
                    Thí sinh trả lời từ câu 1 đến câu {exam.part1_mcq.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án. (Mỗi câu trả lời đúng được 0,25 điểm)
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded">
                  {part1Total.toFixed(2)}đ / 3.0đ
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-4 pt-1">
                {exam.part1_mcq.map((q) => {
                  const selected = studentAnswersP1[q.id];
                  const isCorrect = selected === q.correctAnswer;

                  return (
                    <div 
                      key={q.id} 
                      className="p-3.5 border border-slate-200 rounded-lg text-xs space-y-2 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-slate-900 leading-snug">
                          <span className="text-blue-700 font-bold">Câu {q.number}. </span>
                          {q.question}
                        </p>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {q.cognitiveLevel === 'know' ? 'Nhận biết' : q.cognitiveLevel === 'understand' ? 'Thông hiểu' : 'Vận dụng'} · 0.25đ
                        </span>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-slate-700">
                        {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                          const isKey = q.correctAnswer === optKey && showAnswerKey;
                          return (
                            <button
                              key={optKey}
                              onClick={() => setStudentAnswersP1((prev) => ({ ...prev, [q.id]: optKey }))}
                              className={`p-2 rounded-md border text-left flex items-start gap-1.5 transition-colors ${
                                isKey
                                  ? 'border-emerald-500 bg-emerald-50/70 font-semibold text-emerald-900'
                                  : selected === optKey
                                  ? 'border-blue-500 bg-blue-50/50 font-medium'
                                  : 'border-slate-200 bg-white hover:bg-slate-50'
                              }`}
                            >
                              <span className={`font-bold shrink-0 ${isKey ? 'text-emerald-700' : 'text-slate-500'}`}>
                                {optKey}.
                              </span>
                              <span className="truncate">{q.options[optKey]}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {showAnswerKey && (
                        <div className="mt-2 p-2 bg-emerald-50/40 rounded border border-emerald-100 text-[11px] text-emerald-900">
                          <span className="font-bold text-emerald-800">Đáp án đúng: {q.correctAnswer}</span>
                          <span className="mx-1.5">·</span>
                          <span className="italic">{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===================== PHẦN II ===================== */}
            <div className="mb-10 space-y-4">
              <div className="bg-emerald-50/80 border-l-4 border-emerald-600 px-4 py-2.5 rounded-r-lg flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-emerald-900 uppercase">
                    PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI (2,0 điểm)
                  </h3>
                  <p className="text-[11px] text-emerald-700">
                    Thí sinh trả lời từ câu 1 đến câu {exam.part2_trueFalse.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.
                  </p>
                  <p className="text-[10px] text-slate-500 italic mt-0.5">
                    * Quy định barem CV 7991: Đúng 1 ý: 0,1đ · Đúng 2 ý: 0,25đ · Đúng 3 ý: 0,5đ · Đúng 4 ý: 1,0đ.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                  {part2Total.toFixed(2)}đ / 2.0đ
                </span>
              </div>

              {/* Questions List with 4 sub-commands a, b, c, d */}
              <div className="space-y-6 pt-1">
                {exam.part2_trueFalse.map((q) => (
                  <div 
                    key={q.id} 
                    className="p-4 border border-slate-200 rounded-xl bg-slate-50/30 text-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-slate-900 text-xs leading-relaxed">
                        <span className="text-emerald-700">Câu {q.number}. </span>
                        {q.contextPrompt}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {q.cognitiveLevel === 'know' ? 'Nhận biết' : q.cognitiveLevel === 'understand' ? 'Thông hiểu' : 'Vận dụng'} · 1.0đ
                      </span>
                    </div>

                    {/* The 4 sub-statements a), b), c), d) */}
                    <div className="space-y-2">
                      {q.statements.map((stmt) => (
                        <div
                          key={stmt.subId}
                          className="flex items-start justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                        >
                          <div className="flex-1 pr-4">
                            <span className="font-bold text-emerald-950 uppercase mr-1">
                              {stmt.subId})
                            </span>
                            <span className="text-slate-800">{stmt.text}</span>

                            {showAnswerKey && (
                              <div className="text-[11px] text-slate-500 italic mt-1 pl-2 border-l border-emerald-300">
                                {stmt.explanation}
                              </div>
                            )}
                          </div>

                          {/* Correct Answer Badge */}
                          {showAnswerKey ? (
                            <span
                              className={`px-2.5 py-1 rounded text-[11px] font-bold shrink-0 ${
                                stmt.isCorrect
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}
                            >
                              {stmt.isCorrect ? 'ĐÚNG' : 'SAI'}
                            </span>
                          ) : (
                            <div className="flex items-center gap-1 shrink-0">
                              <button className="px-2 py-1 text-[11px] border rounded hover:bg-slate-50">
                                Đúng
                              </button>
                              <button className="px-2 py-1 text-[11px] border rounded hover:bg-slate-50">
                                Sai
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===================== PHẦN III ===================== */}
            <div className="mb-10 space-y-4">
              <div className="bg-amber-50/80 border-l-4 border-amber-600 px-4 py-2.5 rounded-r-lg flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-amber-900 uppercase">
                    PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 điểm)
                  </h3>
                  <p className="text-[11px] text-amber-700">
                    Thí sinh trả lời từ câu 1 đến câu {exam.part3_shortAns.length}. Viết đáp án số hoặc từ ngắn gọn vào ô tương ứng. (Mỗi câu trả lời đúng được 0,5 điểm)
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
                  {part3Total.toFixed(2)}đ / 2.0đ
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-4 pt-1">
                {exam.part3_shortAns.map((q) => (
                  <div 
                    key={q.id} 
                    className="p-3.5 border border-slate-200 rounded-lg text-xs space-y-2 bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-slate-900">
                        <span className="text-amber-800 font-bold">Câu {q.number}. </span>
                        {q.question}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {q.cognitiveLevel === 'know' ? 'Nhận biết' : q.cognitiveLevel === 'understand' ? 'Thông hiểu' : 'Vận dụng'} · 0.5đ
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-[11px]">Đáp số làm bài:</span>
                        <input
                          type="text"
                          placeholder="Điền kết quả..."
                          className="px-2.5 py-1 border border-slate-300 rounded text-xs font-mono w-36 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      {showAnswerKey && (
                        <div className="text-right">
                          <span className="text-[11px] text-slate-500 mr-2">Đáp án chuẩn:</span>
                          <span className="font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">
                            {q.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>

                    {showAnswerKey && (
                      <div className="text-[11px] text-slate-500 italic mt-1 pt-1 border-t border-slate-100">
                        Hướng dẫn giải: {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ===================== PHẦN IV ===================== */}
            <div className="mb-8 space-y-4">
              <div className="bg-purple-50/80 border-l-4 border-purple-600 px-4 py-2.5 rounded-r-lg flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-purple-900 uppercase">
                    PHẦN IV. CÂU HỎI TỰ LUẬN (3,0 điểm)
                  </h3>
                  <p className="text-[11px] text-purple-700">
                    Thí sinh trình bày chi tiết các bước giải và lập luận vào tờ giấy thi.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded">
                  {part4Total.toFixed(2)}đ / 3.0đ
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-6 pt-1">
                {exam.part4_essay.map((q) => (
                  <div 
                    key={q.id} 
                    className="p-4 border border-slate-200 rounded-xl bg-white text-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-slate-900">
                        <span className="text-purple-700">Câu {q.number} ({q.maxScore.toFixed(1)} điểm). </span>
                      </p>
                      <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold">
                        Vận dụng thực tiễn
                      </span>
                    </div>

                    <p className="text-slate-800 whitespace-pre-line leading-relaxed pl-2">
                      {q.question}
                    </p>

                    {showAnswerKey && (
                      <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                        <div>
                          <span className="font-bold text-slate-800 block mb-1">
                            Lời giải mẫu & Hướng dẫn chấm:
                          </span>
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed italic bg-white p-2.5 rounded border border-slate-100">
                            {q.sampleAnswer}
                          </p>
                        </div>

                        {/* Rubrics table */}
                        <div>
                          <span className="font-bold text-slate-800 text-[11px] block mb-1">
                            Biểu điểm chi tiết từng tiêu chí:
                          </span>
                          <table className="w-full border-collapse border border-slate-300 text-[11px] bg-white">
                            <thead>
                              <tr className="bg-slate-100 text-slate-800">
                                <th className="border border-slate-300 p-1.5 text-left">Tiêu chí chấm điểm</th>
                                <th className="border border-slate-300 p-1.5 text-center w-24">Điểm</th>
                              </tr>
                            </thead>
                            <tbody>
                              {q.rubrics.map((r, rIdx) => (
                                <tr key={rIdx}>
                                  <td className="border border-slate-300 p-1.5 text-slate-700">{r.criterion}</td>
                                  <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-purple-700">
                                    {r.maxScore.toFixed(2)}đ
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* End of test footer */}
            <div className="text-center pt-8 border-t border-slate-200 text-xs text-slate-500 font-semibold">
              ----------------- HẾT -----------------
              <div className="text-[11px] text-slate-400 font-normal mt-1">
                Cán bộ coi thi không giải thích gì thêm · Thí sinh không được sử dụng tài liệu
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: BẢNG MA TRẬN ĐỀ THI (PHỤ LỤC 1 CV 7991) */}
        {activeSubTab === 'matrix' && (
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-8 text-slate-900 text-xs leading-relaxed space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-base font-bold uppercase text-slate-900">
                1. MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ
              </h2>
              <div className="text-slate-500 italic text-[11px]">
                (Kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17 tháng 12 năm 2024 của Bộ GDĐT)
              </div>
              <div className="font-medium text-slate-700">
                Đơn vị: <b>{schoolName}</b> — Môn: <b>{subject}</b> — Khối lớp: <b>{exam.grade}</b> — Năm học: <b>{academicYear}</b>
              </div>
              {showTeacher && (
                <div className="text-[11px] text-slate-500">
                  Người xây dựng ma trận: <b>{teacherName}</b>
                </div>
              )}

            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-300">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold">
                    <th className="border border-slate-300 p-2" rowSpan={3} style={{ width: '4%' }}>TT</th>
                    <th className="border border-slate-300 p-2" rowSpan={3} style={{ width: '18%' }}>Chủ đề/Chương</th>
                    <th className="border border-slate-300 p-2" rowSpan={3} style={{ width: '22%' }}>Nội dung/đơn vị kiến thức</th>
                    <th className="border border-slate-300 p-2" colSpan={12}>Mức độ đánh giá</th>
                    <th className="border border-slate-300 p-2" rowSpan={3} style={{ width: '8%' }}>Tổng điểm</th>
                    <th className="border border-slate-300 p-2" rowSpan={3} style={{ width: '6%' }}>Tỉ lệ %</th>
                  </tr>
                  <tr className="bg-slate-100 text-slate-700 font-semibold text-[11px]">
                    <th className="border border-slate-300 p-1" colSpan={3}>Nhiều lựa chọn (Phần I)</th>
                    <th className="border border-slate-300 p-1" colSpan={3}>"Đúng - Sai" (Phần II)</th>
                    <th className="border border-slate-300 p-1" colSpan={3}>Trả lời ngắn (Phần III)</th>
                    <th className="border border-slate-300 p-1" colSpan={3}>Tự luận (Phần IV)</th>
                  </tr>
                  <tr className="bg-slate-50 text-[10px] text-slate-600">
                    <th className="border border-slate-300 p-1">Biết</th>
                    <th className="border border-slate-300 p-1">Hiểu</th>
                    <th className="border border-slate-300 p-1">VD</th>
                    <th className="border border-slate-300 p-1">Biết</th>
                    <th className="border border-slate-300 p-1">Hiểu</th>
                    <th className="border border-slate-300 p-1">VD</th>
                    <th className="border border-slate-300 p-1">Biết</th>
                    <th className="border border-slate-300 p-1">Hiểu</th>
                    <th className="border border-slate-300 p-1">VD</th>
                    <th className="border border-slate-300 p-1">Biết</th>
                    <th className="border border-slate-300 p-1">Hiểu</th>
                    <th className="border border-slate-300 p-1">VD</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.matrix.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-50/50">
                      <td className="border border-slate-300 p-2 font-bold">{idx + 1}</td>
                      <td className="border border-slate-300 p-2 text-left font-semibold text-slate-800">{row.topic}</td>
                      <td className="border border-slate-300 p-2 text-left text-slate-700">{row.subTopic}</td>
                      
                      {/* Part 1 */}
                      <td className="border border-slate-300 p-1 font-mono">{row.part1_mcq.know || ''}</td>
                      <td className="border border-slate-300 p-1 font-mono">{row.part1_mcq.understand || ''}</td>
                      <td className="border border-slate-300 p-1 font-mono">{row.part1_mcq.apply || ''}</td>

                      {/* Part 2 */}
                      <td className="border border-slate-300 p-1 font-mono">{row.part2_trueFalse.know || ''}</td>
                      <td className="border border-slate-300 p-1 font-mono">{row.part2_trueFalse.understand || ''}</td>
                      <td className="border border-slate-300 p-1 font-mono">{row.part2_trueFalse.apply || ''}</td>

                      {/* Part 3 */}
                      <td className="border border-slate-300 p-1 font-mono">{row.part3_shortAns.know || ''}</td>
                      <td className="border border-slate-300 p-1 font-mono">{row.part3_shortAns.understand || ''}</td>
                      <td className="border border-slate-300 p-1 font-mono">{row.part3_shortAns.apply || ''}</td>

                      {/* Part 4 */}
                      <td className="border border-slate-300 p-1 font-mono">{row.part4_essay.know || ''}</td>
                      <td className="border border-slate-300 p-1 font-mono">{row.part4_essay.understand || ''}</td>
                      <td className="border border-slate-300 p-1 font-mono">{row.part4_essay.apply || ''}</td>

                      <td className="border border-slate-300 p-2 font-mono font-bold text-blue-700">
                        {row.scoreAllocation.toFixed(1)}
                      </td>
                      <td className="border border-slate-300 p-2 font-mono text-slate-600">
                        {Math.round(row.scoreAllocation * 10)}%
                      </td>
                    </tr>
                  ))}

                  {/* Summary Rows matching CV 7991 */}
                  <tr className="bg-slate-100 font-bold text-slate-900">
                    <td colSpan={3} className="border border-slate-300 p-2 text-center">
                      Tổng số điểm từng phần
                    </td>
                    <td colSpan={3} className="border border-slate-300 p-1 text-center font-mono">
                      3,0 điểm
                    </td>
                    <td colSpan={3} className="border border-slate-300 p-1 text-center font-mono">
                      2,0 điểm
                    </td>
                    <td colSpan={3} className="border border-slate-300 p-1 text-center font-mono">
                      2,0 điểm
                    </td>
                    <td colSpan={3} className="border border-slate-300 p-1 text-center font-mono">
                      3,0 điểm
                    </td>
                    <td className="border border-slate-300 p-1 text-center font-mono text-emerald-700 text-sm">
                      10,0
                    </td>
                    <td className="border border-slate-300 p-1 text-center font-mono">
                      100%
                    </td>
                  </tr>

                  <tr className="bg-emerald-50/70 font-bold text-emerald-950">
                    <td colSpan={3} className="border border-slate-300 p-2 text-center">
                      Tỉ lệ % theo mức độ tư duy
                    </td>
                    <td colSpan={4} className="border border-slate-300 p-2 text-center">
                      Nhận biết: <b>40% (4,0 điểm)</b>
                    </td>
                    <td colSpan={4} className="border border-slate-300 p-2 text-center">
                      Thông hiểu: <b>30% (3,0 điểm)</b>
                    </td>
                    <td colSpan={4} className="border border-slate-300 p-2 text-center">
                      Vận dụng: <b>30% (3,0 điểm)</b>
                    </td>
                    <td colSpan={2} className="border border-slate-300 p-2 text-center text-emerald-700">
                      ✓ Chuẩn 100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p>• <i>Ghi chú 2 (CV 7991):</i> Mỗi câu hỏi Phần II gồm 4 ý nhỏ (a, b, c, d), mỗi ý học sinh phải chọn đúng hoặc sai.</p>
              <p>• <i>Ghi chú 3:</i> Thang điểm tổng thể luôn đạt chính xác 10.0 điểm theo barem cố định.</p>
            </div>
          </div>
        )}

        {/* VIEW 3: BẢN ĐẶC TẢ ĐỀ KIỂM TRA (PHỤ LỤC 2 CV 7991) */}
        {activeSubTab === 'specs' && (
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-8 text-slate-900 text-xs leading-relaxed space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-base font-bold uppercase text-slate-900">
                2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ
              </h2>
              <div className="text-slate-500 italic text-[11px]">
                (Kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17 tháng 12 năm 2024 của Bộ GDĐT)
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-300">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold text-center">
                    <th className="border border-slate-300 p-2 w-10" rowSpan={2}>TT</th>
                    <th className="border border-slate-300 p-2 w-36" rowSpan={2}>Chủ đề/Chương</th>
                    <th className="border border-slate-300 p-2 w-44" rowSpan={2}>Nội dung/đơn vị kiến thức</th>
                    <th className="border border-slate-300 p-2" rowSpan={2}>Yêu cầu cần đạt</th>
                    <th className="border border-slate-300 p-2" colSpan={4}>Số câu hỏi theo 4 phần</th>
                    <th className="border border-slate-300 p-2 w-36" rowSpan={2}>Năng lực đánh giá</th>
                  </tr>
                  <tr className="bg-slate-50 text-[11px] text-slate-700 text-center font-semibold">
                    <th className="border border-slate-300 p-1">Phần I (Nhiều LC)</th>
                    <th className="border border-slate-300 p-1">Phần II (Đúng/Sai)</th>
                    <th className="border border-slate-300 p-1">Phần III (Ngắn)</th>
                    <th className="border border-slate-300 p-1">Phần IV (Tự luận)</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.specifications.map((spec, sIdx) => (
                    <tr key={spec.id} className="hover:bg-slate-50/50 align-top">
                      <td className="border border-slate-300 p-2 text-center font-bold">{sIdx + 1}</td>
                      <td className="border border-slate-300 p-2 font-semibold text-slate-800">{spec.topic}</td>
                      <td className="border border-slate-300 p-2 text-slate-700">{spec.subTopic}</td>
                      
                      <td className="border border-slate-300 p-2 space-y-2">
                        <div>
                          <b className="text-slate-800 text-[11px]">- Nhận biết:</b>
                          <ul className="list-disc list-inside text-slate-600 pl-1 mt-0.5 space-y-0.5">
                            {spec.learningOutcomes.know.map((k, i) => (
                              <li key={i}>{k}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <b className="text-slate-800 text-[11px]">- Thông hiểu:</b>
                          <ul className="list-disc list-inside text-slate-600 pl-1 mt-0.5 space-y-0.5">
                            {spec.learningOutcomes.understand.map((u, i) => (
                              <li key={i}>{u}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <b className="text-slate-800 text-[11px]">- Vận dụng:</b>
                          <ul className="list-disc list-inside text-slate-600 pl-1 mt-0.5 space-y-0.5">
                            {spec.learningOutcomes.apply.map((a, i) => (
                              <li key={i}>{a}</li>
                            ))}
                          </ul>
                        </div>
                      </td>

                      <td className="border border-slate-300 p-2 text-center font-mono font-semibold">
                        {spec.part1Count.know + spec.part1Count.understand + spec.part1Count.apply} câu
                      </td>
                      <td className="border border-slate-300 p-2 text-center font-mono font-semibold">
                        {spec.part2Count.know + spec.part2Count.understand + spec.part2Count.apply} câu
                      </td>
                      <td className="border border-slate-300 p-2 text-center font-mono font-semibold">
                        {spec.part3Count.know + spec.part3Count.understand + spec.part3Count.apply} câu
                      </td>
                      <td className="border border-slate-300 p-2 text-center font-mono font-semibold">
                        {spec.part4Count.know + spec.part4Count.understand + spec.part4Count.apply} câu
                      </td>

                      <td className="border border-slate-300 p-2 text-center font-medium text-blue-800">
                        {spec.competencyCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 4: BẢNG ĐÁP ÁN & HƯỚNG DẪN CHẤM */}
        {activeSubTab === 'key' && (
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-8 text-slate-900 text-xs leading-relaxed space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-base font-bold uppercase text-slate-900">
                HƯỚNG DẪN CHẤM VÀ THANG ĐIỂM CHUẨN (10.0 ĐIỂM)
              </h2>
              <div className="text-slate-500 italic text-[11px]">
                Áp dụng quy chế kiểm tra, đánh giá định kỳ theo Công văn số 7991/BGDĐT-GDTrH
              </div>
            </div>

            {/* Part I Table */}
            <div>
              <h3 className="font-bold text-xs text-blue-900 uppercase mb-2">
                1. Đáp án Phần I: Câu hỏi trắc nghiệm nhiều phương án lựa chọn (3,0 điểm)
              </h3>
              <div className="overflow-x-auto rounded border border-slate-300">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      {exam.part1_mcq.map((q) => (
                        <th key={q.id} className="border border-slate-300 p-1.5 font-mono">
                          C.{q.number}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {exam.part1_mcq.map((q) => (
                        <td key={q.id} className="border border-slate-300 p-1.5 font-bold font-mono text-blue-700 bg-blue-50/30">
                          {q.correctAnswer}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 italic mt-1">Mỗi câu chọn đúng được 0,25 điểm.</p>
            </div>

            {/* Part II Table */}
            <div>
              <h3 className="font-bold text-xs text-emerald-900 uppercase mb-2">
                2. Đáp án Phần II: Câu hỏi trắc nghiệm Đúng / Sai (2,0 điểm)
              </h3>
              <div className="overflow-x-auto rounded border border-slate-300">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th className="border border-slate-300 p-2">Câu</th>
                      <th className="border border-slate-300 p-2">Lệnh a</th>
                      <th className="border border-slate-300 p-2">Lệnh b</th>
                      <th className="border border-slate-300 p-2">Lệnh c</th>
                      <th className="border border-slate-300 p-2">Lệnh d</th>
                      <th className="border border-slate-300 p-2 text-left">Quy định tính điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.part2_trueFalse.map((q) => (
                      <tr key={q.id}>
                        <td className="border border-slate-300 p-2 font-bold">Câu {q.number}</td>
                        <td className="border border-slate-300 p-2 font-bold font-mono text-emerald-700">
                          {q.statements[0]?.isCorrect ? 'ĐÚNG' : 'SAI'}
                        </td>
                        <td className="border border-slate-300 p-2 font-bold font-mono text-emerald-700">
                          {q.statements[1]?.isCorrect ? 'ĐÚNG' : 'SAI'}
                        </td>
                        <td className="border border-slate-300 p-2 font-bold font-mono text-emerald-700">
                          {q.statements[2]?.isCorrect ? 'ĐÚNG' : 'SAI'}
                        </td>
                        <td className="border border-slate-300 p-2 font-bold font-mono text-emerald-700">
                          {q.statements[3]?.isCorrect ? 'ĐÚNG' : 'SAI'}
                        </td>
                        <td className="border border-slate-300 p-2 text-left text-slate-600 text-[11px]">
                          - Đúng 1 ý: 0,1đ<br />
                          - Đúng 2 ý: 0,25đ<br />
                          - Đúng 3 ý: 0,5đ<br />
                          - Đúng 4 ý: 1,0đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Part III Table */}
            <div>
              <h3 className="font-bold text-xs text-amber-900 uppercase mb-2">
                3. Đáp án Phần III: Câu trắc nghiệm trả lời ngắn (2,0 điểm)
              </h3>
              <div className="overflow-x-auto rounded border border-slate-300">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th className="border border-slate-300 p-2 text-center w-20">Câu</th>
                      <th className="border border-slate-300 p-2 text-center w-36">Đáp số</th>
                      <th className="border border-slate-300 p-2 text-left">Hướng dẫn chấm</th>
                      <th className="border border-slate-300 p-2 text-center w-24">Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.part3_shortAns.map((q) => (
                      <tr key={q.id}>
                        <td className="border border-slate-300 p-2 text-center font-bold">Câu {q.number}</td>
                        <td className="border border-slate-300 p-2 text-center font-mono font-bold text-blue-700 bg-blue-50/40">
                          {q.correctAnswer}
                        </td>
                        <td className="border border-slate-300 p-2 text-slate-600">{q.explanation}</td>
                        <td className="border border-slate-300 p-2 text-center font-mono font-bold">0,5đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Part IV Rubrics */}
            <div>
              <h3 className="font-bold text-xs text-purple-900 uppercase mb-2">
                4. Đáp án & Barem Phần IV: Tự luận (3,0 điểm)
              </h3>
              <div className="space-y-4">
                {exam.part4_essay.map((q) => (
                  <div key={q.id} className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 space-y-2">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Câu {q.number} ({q.maxScore.toFixed(1)} điểm)</span>
                    </div>
                    <p className="text-slate-700 italic">{q.sampleAnswer}</p>
                    <table className="w-full border-collapse border border-slate-300 bg-white">
                      <thead>
                        <tr className="bg-slate-100 font-semibold text-slate-800">
                          <th className="border border-slate-300 p-1.5 text-left">Tiêu chí cho điểm</th>
                          <th className="border border-slate-300 p-1.5 text-center w-24">Điểm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {q.rubrics.map((r, rIdx) => (
                          <tr key={rIdx}>
                            <td className="border border-slate-300 p-1.5 text-slate-700">{r.criterion}</td>
                            <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-purple-700">
                              {r.maxScore.toFixed(2)}đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
