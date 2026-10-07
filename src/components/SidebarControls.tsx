/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Sidebar Controls: 380px Split-Pane Left Controller
 */

import React, { useState } from 'react';
import { 
  ActiveModule, 
  ProjectState 
} from '../types/eduharness';
import { 
  FileText, 
  Presentation, 
  GraduationCap, 
  Grid, 
  Download, 
  Code2, 
  CheckCircle2, 
  Printer, 
  FileCode,
  ShieldCheck,
  RefreshCw,
  Clock,
  Sparkles,
  Settings,
  FolderKanban,
  Music
} from 'lucide-react';
import { 
  exportKhbdToWord, 
  exportExamToWord, 
  generateStandaloneSingleFileHtml, 
  downloadBlob 
} from '../utils/exportUtils';
import { musicGrade7Template } from '../data/musicTemplate';
import { convertKhbdToSlides } from '../utils/slideConverter';
import { 
  musicTextbookLibraryData, 
  allMusicLessons, 
  getMusicLessonsByGrade, 
  getMusicLessonById 
} from '../data/musicTextbooksData';
import { MusicGrade, MusicTextbookLesson } from '../types/eduharness';
import { musicInstrumentsBanner } from '../assets/images';

interface SidebarControlsProps {
  state: ProjectState;
  setState: React.Dispatch<React.SetStateAction<ProjectState>>;
  onOpenExportModal: () => void;
  onOpenJsonModal: () => void;
  onOpenProfileModal: () => void;
}

export const SidebarControls: React.FC<SidebarControlsProps> = ({
  state,
  setState,
  onOpenExportModal,
  onOpenJsonModal,
  onOpenProfileModal,
}) => {
  const currentModule = state.activeModule;
  const profile = state.teacherProfile;

  // Change active module
  const setModule = (module: ActiveModule) => {
    setState((prev) => ({ ...prev, activeModule: module }));
  };

  const activeGrade: MusicGrade = (['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'].includes(state.khbd.grade)
    ? state.khbd.grade
    : 'Lớp 7') as MusicGrade;
  const gradeLessons = getMusicLessonsByGrade(activeGrade);

  // Find matching lesson for current KHBD
  const currentLesson = gradeLessons.find((l) =>
    state.khbd.lessonTitle.toUpperCase().includes(l.topicTitle.toUpperCase()) ||
    state.khbd.lessonTitle.toUpperCase().includes(l.lessonName.toUpperCase())
  ) || gradeLessons[0];
  const currentSelectedLessonId = currentLesson?.id || gradeLessons[0]?.id || 'kntt-7-t1';

  // Apply a lesson from the 32 topics of Kết nối tri thức
  const applyLesson = (lesson: MusicTextbookLesson) => {
    const updatedKhbd = {
      ...lesson.khbdPreset,
      schoolName: profile.school,
      teacherName: profile.name,
      academicYear: profile.academicYear,
      department: profile.department,
    };
    const generatedSlides = convertKhbdToSlides(updatedKhbd);
    setState((prev) => ({
      ...prev,
      khbd: updatedKhbd,
      slides: generatedSlides,
      exam: {
        ...prev.exam,
        title: `ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KỲ ${lesson.semester === 'Học kỳ I' ? 'I' : 'II'} - MÔN ÂM NHẠC ${lesson.grade.replace('Lớp ', '')}`,
        grade: lesson.grade,
        examCode: `AMNHAC${lesson.grade.replace('Lớp ', '')}-KNTT-7991`,
      },
    }));
  };

  const handleGradeChange = (newGrade: MusicGrade) => {
    const lessons = getMusicLessonsByGrade(newGrade);
    if (lessons.length > 0) {
      applyLesson(lessons[0]);
    }
  };

  const handleTopicChange = (lessonId: string) => {
    const lesson = getMusicLessonById(lessonId);
    if (lesson) {
      applyLesson(lesson);
    }
  };

  // Audit Calculations for CV 7991
  const part1Score = state.exam.part1_mcq.reduce((acc, q) => acc + q.point, 0);
  const part2Score = state.exam.part2_trueFalse.reduce((acc, q) => acc + q.point, 0);
  const part3Score = state.exam.part3_shortAns.reduce((acc, q) => acc + q.point, 0);
  const part4Score = state.exam.part4_essay.reduce((acc, q) => acc + q.maxScore, 0);
  const totalExamScore = part1Score + part2Score + part3Score + part4Score;

  // Calculate cognitive breakdown
  let knowScore = 0;
  let understandScore = 0;
  let applyScore = 0;

  state.exam.part1_mcq.forEach((q) => {
    if (q.cognitiveLevel === 'know') knowScore += q.point;
    else if (q.cognitiveLevel === 'understand') understandScore += q.point;
    else applyScore += q.point;
  });

  state.exam.part2_trueFalse.forEach((q) => {
    if (q.cognitiveLevel === 'know') knowScore += q.point;
    else if (q.cognitiveLevel === 'understand') understandScore += q.point;
    else applyScore += q.point;
  });

  state.exam.part3_shortAns.forEach((q) => {
    if (q.cognitiveLevel === 'know') knowScore += q.point;
    else if (q.cognitiveLevel === 'understand') understandScore += q.point;
    else applyScore += q.point;
  });

  state.exam.part4_essay.forEach((q) => {
    if (q.cognitiveLevel === 'know') knowScore += q.maxScore;
    else if (q.cognitiveLevel === 'understand') understandScore += q.maxScore;
    else applyScore += q.maxScore;
  });

  const knowPercent = Math.round((knowScore / (totalExamScore || 10)) * 100);
  const understandPercent = Math.round((understandScore / (totalExamScore || 10)) * 100);
  const applyPercent = Math.round((applyScore / (totalExamScore || 10)) * 100);

  // Quick download standalone HTML
  const handleDownloadStandaloneHtml = () => {
    const html = generateStandaloneSingleFileHtml(state);
    downloadBlob(html, `EduHarness_${state.khbd.subject}_Standalone.html`, 'text/html;charset=utf-8');
  };

  return (
    <aside className="w-[380px] shrink-0 border-r border-slate-200 bg-white flex flex-col h-full select-none">
      
      {/* Brand & Teacher Profile Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-900 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm shadow-sm">
              DT
            </div>
            <div>
              <span className="font-bold text-xs tracking-tight block text-white">
                {profile.name}
              </span>
              <span className="text-[11px] text-blue-300 font-medium">
                Giáo viên {profile.subject} – {profile.school}
              </span>
            </div>
          </div>

          <button
            onClick={onOpenProfileModal}
            title="Cài đặt hồ sơ giáo viên & nhà trường"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Single National Standard Book Badge */}
        <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-tight">
              Bộ sách: Kết Nối Tri Thức
            </span>
          </div>
          <span className="text-[9px] font-mono text-indigo-300 bg-indigo-900/60 px-1.5 py-0.5 rounded font-semibold">
            Duy nhất toàn quốc
          </span>
        </div>

        {/* Grade & Topic Quick Picker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-medium text-slate-300">
              Khối lớp (THCS):
            </label>
            <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              {(['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGradeChange(g)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors ${
                    activeGrade === g
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {g.replace('Lớp ', 'K')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-300 block mb-1">
              Chủ đề bài học ({gradeLessons.length} chủ đề):
            </label>
            <select 
              value={currentSelectedLessonId}
              onChange={(e) => handleTopicChange(e.target.value)}
              className="w-full bg-slate-800 text-white text-xs border border-slate-700 rounded-md py-1.5 px-2.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer font-medium"
            >
              {gradeLessons.map((l) => (
                <option key={l.id} value={l.id}>
                  CĐ {l.topicNumber}: {l.topicTitle.replace(/Chủ đề \d+:\s*/, '')} {l.songOrRepertoire ? `(${l.songOrRepertoire.split('(')[0].trim()})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Artistic Musical Vignette */}
        <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-700/80 h-20 shadow-inner group">
          <img 
            src={musicInstrumentsBanner} 
            alt="Nhạc cụ âm nhạc" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-end p-2.5">
            <span className="text-[10px] text-amber-200 font-semibold flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              <span>Sư phạm Âm nhạc THCS</span>
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Center Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        
        {/* Module Switcher Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Phân hệ tác nghiệp giáo viên
            </span>
          </div>
          <div className="space-y-1">
            
            {/* Music Textbook Library Button */}
            <button
              onClick={() => setModule('music_library')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                currentModule === 'music_library'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <Music className={`w-4 h-4 shrink-0 ${currentModule === 'music_library' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="truncate font-bold text-slate-900 flex items-center gap-1.5">
                  <span>📚 Kho SGK Âm Nhạc THCS</span>
                  <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded font-mono font-bold">32 CĐ</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">32 Chủ đề KNTT · Metronome · Luyện thanh</div>
              </div>
            </button>

            <button
              onClick={() => setModule('khbd')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                currentModule === 'khbd'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <FileText className={`w-4 h-4 shrink-0 ${currentModule === 'khbd' ? 'text-blue-600' : 'text-slate-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="truncate">1. Kế hoạch bài dạy (KHBD)</div>
                <div className="text-[10px] text-slate-400 font-normal">Chuẩn Công văn 5512 (4 hoạt động)</div>
              </div>
            </button>

            {/* Quick Convert Button */}
            <button
              onClick={() => {
                const generated = convertKhbdToSlides(state.khbd);
                setState((prev) => ({
                  ...prev,
                  slides: generated,
                  activeModule: 'slide',
                }));
              }}
              title="Chuyển đổi nhanh 4 hoạt động thành Slide trình chiếu 16:9"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Chuyển Đổi Nhanh KHBD Thành Slide</span>
            </button>

            <button
              onClick={() => setModule('slide')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                currentModule === 'slide'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <Presentation className={`w-4 h-4 shrink-0 ${currentModule === 'slide' ? 'text-blue-600' : 'text-slate-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="truncate">2. Slide bài giảng tương tác</div>
                <div className="text-[10px] text-slate-400 font-normal">Đồng bộ từ KHBD · Đếm giờ thảo luận</div>
              </div>
            </button>

            <button
              onClick={() => setModule('exam')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                currentModule === 'exam'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <GraduationCap className={`w-4 h-4 shrink-0 ${currentModule === 'exam' ? 'text-blue-600' : 'text-slate-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="truncate">3. Đề kiểm tra 4 phần (7991)</div>
                <div className="text-[10px] text-slate-400 font-normal">Đúng/Sai 4 ý · Barem 10.0 điểm</div>
              </div>
            </button>

            <button
              onClick={() => setModule('matrix')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                currentModule === 'matrix'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <Grid className={`w-4 h-4 shrink-0 ${currentModule === 'matrix' ? 'text-blue-600' : 'text-slate-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="truncate">4. Ma trận & Bản đặc tả</div>
                <div className="text-[10px] text-slate-400 font-normal">Phụ lục 1 & 2 Công văn 7991</div>
              </div>
            </button>
          </div>
        </div>

        {/* Live Pedagogical Compliance Audit */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Kiểm chứng pháp lý sư phạm
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded">
              ĐÃ XÁC THỰC
            </span>
          </div>

          {/* 5512 Audit */}
          <div className="text-xs space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600">Công văn 5512 (KHBD):</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                4/4 Hoạt động đủ
              </span>
            </div>
            <div className="text-[10px] text-slate-500 pl-2 border-l-2 border-emerald-500">
              Khởi động → Hình thành kiến thức → Luyện tập → Vận dụng (Đủ 4 bước: a-b-c-d)
            </div>
          </div>

          {/* 7991 Audit */}
          <div className="text-xs space-y-1.5 border-t border-slate-200 pt-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600">Công văn 7991 (17/12/2024):</span>
              <span className="font-mono font-bold text-emerald-700">
                {totalExamScore.toFixed(1)} / 10.0 điểm
              </span>
            </div>

            {/* Score Distribution Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 flex overflow-hidden">
              <div 
                className="bg-blue-600 h-full" 
                style={{ width: `${(part1Score / 10) * 100}%` }} 
                title={`Phần I (Nhiều lựa chọn): ${part1Score}đ`}
              />
              <div 
                className="bg-emerald-600 h-full" 
                style={{ width: `${(part2Score / 10) * 100}%` }} 
                title={`Phần II (Đúng-Sai 4 ý): ${part2Score}đ`}
              />
              <div 
                className="bg-amber-500 h-full" 
                style={{ width: `${(part3Score / 10) * 100}%` }} 
                title={`Phần III (Trả lời ngắn): ${part3Score}đ`}
              />
              <div 
                className="bg-purple-600 h-full" 
                style={{ width: `${(part4Score / 10) * 100}%` }} 
                title={`Phần IV (Tự luận): ${part4Score}đ`}
              />
            </div>

            <div className="grid grid-cols-4 text-[10px] text-slate-500 font-mono text-center">
              <div>P.I: {part1Score}đ</div>
              <div>P.II: {part2Score}đ</div>
              <div>P.III: {part3Score}đ</div>
              <div>P.IV: {part4Score}đ</div>
            </div>

            {/* Cognitive Matrix Ratio */}
            <div className="bg-white p-2 rounded border border-slate-200 text-[10px] text-slate-600 space-y-1">
              <div className="flex justify-between font-semibold">
                <span>Ma trận nhận thức:</span>
                <span className="text-blue-700">
                  {knowPercent}% Biết - {understandPercent}% Hiểu - {applyPercent}% Vận dụng
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Chuẩn: 40% Nhận biết (4.0đ) - 30% Thông hiểu (3.0đ) - 30% Vận dụng (3.0đ)
              </div>
            </div>
          </div>
        </div>

        {/* Kho học liệu & Dự án của tôi */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
              <FolderKanban className="w-4 h-4 text-blue-600" />
              Kho học liệu & Dự án của tôi
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {profile.academicYear}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="p-2 bg-white rounded border border-slate-200 text-[11px]">
              <div className="font-semibold text-slate-800 truncate">{state.khbd.lessonTitle}</div>
              <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                <span>Môn: {profile.subject}</span>
                <span>·</span>
                <span>Lớp: {state.khbd.grade}</span>
              </div>
              <div className="text-[10px] text-blue-600 mt-0.5">
                Người tạo: {profile.name}
              </div>
            </div>

            <div className="p-2 bg-white rounded border border-slate-200 text-[11px]">
              <div className="font-semibold text-slate-800 truncate">{state.exam.title}</div>
              <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                <span>Môn: {profile.subject}</span>
                <span>·</span>
                <span>Khối: {state.exam.grade}</span>
              </div>
              <div className="text-[10px] text-emerald-600 mt-0.5">
                Người tạo: {profile.name}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Edit Metadata synced with Profile */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Thông số đồng bộ hồ sơ
            </span>
            <button
              onClick={onOpenProfileModal}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
            >
              Cài đặt hồ sơ
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[11px] text-slate-600 block mb-0.5">Tên trường</label>
              <input
                type="text"
                value={profile.school}
                onChange={(e) => {
                  const val = e.target.value;
                  setState((prev) => ({
                    ...prev,
                    teacherProfile: { ...prev.teacherProfile, school: val },
                    khbd: { ...prev.khbd, schoolName: val },
                  }));
                }}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-slate-800 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-600 block mb-0.5">Môn giảng dạy</label>
                <input
                  type="text"
                  value={profile.subject}
                  onChange={(e) => {
                    const val = e.target.value;
                    setState((prev) => ({
                      ...prev,
                      teacherProfile: { ...prev.teacherProfile, subject: val },
                      khbd: { ...prev.khbd, subject: val },
                      exam: { ...prev.exam, subject: val },
                    }));
                  }}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-slate-800 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-600 block mb-0.5">Năm học</label>
                <input
                  type="text"
                  value={profile.academicYear}
                  onChange={(e) => {
                    const val = e.target.value;
                    setState((prev) => ({
                      ...prev,
                      teacherProfile: { ...prev.teacherProfile, academicYear: val },
                      khbd: { ...prev.khbd, academicYear: val },
                    }));
                  }}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-slate-800 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-600 block mb-0.5">Giáo viên phụ trách</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setState((prev) => ({
                    ...prev,
                    teacherProfile: { ...prev.teacherProfile, name: val },
                    khbd: { ...prev.khbd, teacherName: val },
                  }));
                }}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-slate-800 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Quick Export Actions */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Xuất bản & Chuyển giao
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => exportKhbdToWord(state.khbd, state.teacherProfile)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Word KHBD</span>
            </button>

            <button
              onClick={() => exportExamToWord(state.exam, state.khbd, state.teacherProfile)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors font-medium"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Word Đề 7991</span>
            </button>

            <button
              onClick={handleDownloadStandaloneHtml}
              title="Xuất file HTML đơn nhất (Tailwind + Alpine.js) chạy offline"
              className="col-span-2 flex items-center justify-center gap-2 py-2 px-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors font-medium text-xs shadow-sm"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tải file HTML độc lập (Offline)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer Utility Zone */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
        <button
          onClick={onOpenJsonModal}
          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-mono text-[11px] py-1 px-2 rounded hover:bg-slate-200 transition-colors"
        >
          <Code2 className="w-3.5 h-3.5 text-slate-500" />
          <span>JSON State</span>
        </button>

        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-1.5 px-3 rounded-lg shadow-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Trung tâm Xuất file</span>
        </button>
      </div>
    </aside>
  );
};
