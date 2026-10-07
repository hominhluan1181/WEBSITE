/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * EduHarness 5512 & 7991 - Studio Chuyển Đổi Số Giáo Dục Phổ Thông
 * BỘ SÁCH CHUẨN DUY NHẤT: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (NXB GIÁO DỤC VIỆT NAM)
 * TRỌN VẸN 32 CHỦ ĐỀ ÂM NHẠC 4 KHỐI THCS (LỚP 6, 7, 8, 9)
 */

import React, { useState } from 'react';
import { 
  ProjectState, 
  TeacherProfile, 
  LessonPlan5512, 
  MusicGrade, 
  MusicTextbookLesson, 
  ActiveModule 
} from './types/eduharness';
import { musicGrade7Template } from './data/musicTemplate';
import { SidebarControls } from './components/SidebarControls';
import { KhbdEditor } from './components/KhbdEditor';
import { SlideViewer } from './components/SlideViewer';
import { ExamMatrixEditor } from './components/ExamMatrixEditor';
import { ExportModal } from './components/ExportModal';
import { JsonStateModal } from './components/JsonStateModal';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import { MusicTextbookLibrary } from './components/MusicTextbookLibrary';
import { 
  FileText, 
  Presentation, 
  GraduationCap, 
  Grid, 
  Download, 
  FileCode, 
  Sparkles, 
  Layers, 
  Music, 
  BookOpen,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { generateStandaloneSingleFileHtml, downloadBlob } from './utils/exportUtils';
import { convertKhbdToSlides } from './utils/slideConverter';
import { 
  allMusicLessons, 
  getMusicLessonsByGrade, 
  getMusicLessonById 
} from './data/musicTextbooksData';

export default function App() {
  const [projectState, setProjectState] = useState<ProjectState>(musicGrade7Template);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const profile = projectState.teacherProfile;

  // Active grade & lessons helper (Kết nối tri thức)
  const activeGrade: MusicGrade = (['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'].includes(projectState.khbd.grade)
    ? projectState.khbd.grade
    : 'Lớp 7') as MusicGrade;
  const currentGradeLessons = getMusicLessonsByGrade(activeGrade);
  const currentLesson = currentGradeLessons.find((l) =>
    projectState.khbd.lessonTitle.toUpperCase().includes(l.topicTitle.toUpperCase()) ||
    projectState.khbd.lessonTitle.toUpperCase().includes(l.lessonName.toUpperCase())
  ) || currentGradeLessons[0];
  const currentTopicId = currentLesson?.id || currentGradeLessons[0]?.id || 'kntt-7-t1';

  // Apply a lesson from the 32 topics of Kết nối tri thức across 4 grades
  const handleApplyMusicLesson = (lesson: MusicTextbookLesson, targetModule?: ActiveModule) => {
    const updatedKhbd: LessonPlan5512 = {
      ...lesson.khbdPreset,
      schoolName: projectState.teacherProfile.school,
      department: projectState.teacherProfile.department,
      teacherName: projectState.teacherProfile.name,
      subject: projectState.teacherProfile.subject,
      academicYear: projectState.teacherProfile.academicYear,
    };
    const generatedSlides = convertKhbdToSlides(updatedKhbd);
    setProjectState((prev) => ({
      ...prev,
      khbd: updatedKhbd,
      slides: generatedSlides,
      exam: {
        ...prev.exam,
        title: `ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KỲ ${lesson.semester === 'Học kỳ I' ? 'I' : 'II'} - MÔN ÂM NHẠC ${lesson.grade.replace('Lớp ', '')}`,
        grade: lesson.grade,
        examCode: `AMNHAC${lesson.grade.replace('Lớp ', '')}-KNTT-7991`,
      },
      activeModule: targetModule || prev.activeModule,
    }));
    setToastMsg(`Đã nạp ${lesson.topicTitle} (${lesson.grade}) - Bộ sách Kết nối tri thức!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleQuickSelectGrade = (newGrade: MusicGrade) => {
    const lessons = getMusicLessonsByGrade(newGrade);
    if (lessons.length > 0) {
      handleApplyMusicLesson(lessons[0]);
    }
  };

  const handleQuickSelectTopic = (lessonId: string) => {
    const lesson = getMusicLessonById(lessonId);
    if (lesson) {
      handleApplyMusicLesson(lesson);
    }
  };

  // Convert KHBD 5512 into 16:9 interactive slides and switch module
  const handleConvertToSlides = () => {
    const generatedSlides = convertKhbdToSlides(projectState.khbd);
    setProjectState((prev) => ({
      ...prev,
      slides: generatedSlides,
      activeModule: 'slide',
    }));
    setToastMsg('Đã chuyển đổi 4 hoạt động KHBD sang Slide Deck 16:9!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Update profile across app
  const handleSaveProfile = (newProfile: TeacherProfile) => {
    setProjectState((prev) => ({
      ...prev,
      teacherProfile: newProfile,
      khbd: {
        ...prev.khbd,
        schoolName: newProfile.school,
        department: newProfile.department,
        teacherName: newProfile.name,
        subject: newProfile.subject,
        academicYear: newProfile.academicYear,
      },
      exam: {
        ...prev.exam,
        schoolName: newProfile.school,
        teacherName: newProfile.showTeacherOnExam ? newProfile.name : '',
        subject: newProfile.subject,
        academicYear: newProfile.academicYear,
      },
    }));
  };

  const handleDownloadStandalone = () => {
    const html = generateStandaloneSingleFileHtml(projectState);
    downloadBlob(
      html,
      `EduHarness_${projectState.khbd.subject}_${projectState.khbd.grade}_SingleFile.html`,
      'text/html;charset=utf-8'
    );
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 right-8 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Bar (Header chính) */}
      <header className="h-14 border-b border-slate-200 bg-white px-4 md:px-6 flex items-center justify-between shrink-0 no-print z-30">
        
        {/* Zone 1: Brand & Teacher Identity + National Textbook Badge */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2.5 text-left group hover:opacity-90 transition-opacity"
            title="Nhấp để tùy chỉnh thông tin Giáo viên & Nhà trường"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              DT
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {profile.name}
                </span>
                <span className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.2 rounded font-semibold">
                  {profile.subject}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 leading-none mt-0.5">
                {profile.school} · {profile.academicYear}
              </div>
            </div>
          </button>

          <span className="hidden lg:inline text-xs text-slate-300">|</span>
          
          {/* National Unified Textbook Badge - No Series Dropdown Needed */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Bộ sách chuẩn duy nhất: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (5 Modules) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setProjectState((prev) => ({ ...prev, activeModule: 'music_library' }))}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              projectState.activeModule === 'music_library'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-indigo-600" />
            <span>📚 Kho SGK Âm Nhạc (32 CĐ)</span>
          </button>
          <button
            onClick={() => setProjectState((prev) => ({ ...prev, activeModule: 'khbd' }))}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
              projectState.activeModule === 'khbd'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. KHBD (CV 5512)
          </button>
          <button
            onClick={() => setProjectState((prev) => ({ ...prev, activeModule: 'slide' }))}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
              projectState.activeModule === 'slide'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Slide Trình Chiếu 16:9
          </button>
          <button
            onClick={() => setProjectState((prev) => ({ ...prev, activeModule: 'exam' }))}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
              projectState.activeModule === 'exam'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Đề Thi 4 Phần (CV 7991)
          </button>
          <button
            onClick={() => setProjectState((prev) => ({ ...prev, activeModule: 'matrix' }))}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${
              projectState.activeModule === 'matrix'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4. Ma Trận & Bản Đặc Tả
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadStandalone}
            title="Tải file HTML đơn nhất (Single-file HTML + Tailwind + Alpine.js) chạy offline trực tiếp không cần cài đặt"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Xuất Tệp Duy Nhất (HTML)</span>
            <span className="sm:hidden">File HTML</span>
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xuất Word / PPT</span>
            <span className="sm:hidden">Xuất File</span>
          </button>
        </div>
      </header>

      {/* Curriculum Quick Bar: Môn Âm Nhạc · Khối 6-9 · Bộ Sách Kết Nối Tri Thức Duy Nhất */}
      <div className="bg-slate-900 text-white px-4 md:px-6 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 text-xs no-print shrink-0">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Grade Selector Toggle */}
          <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <span className="text-[11px] text-slate-400 px-2 font-medium">Khối lớp THCS:</span>
            {(['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'] as const).map((g) => (
              <button
                key={g}
                onClick={() => handleQuickSelectGrade(g)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  projectState.khbd.grade === g
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Topic Selector Dropdown (8 topics per grade) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Chủ đề bài dạy:</span>
            <select
              value={currentTopicId}
              onChange={(e) => handleQuickSelectTopic(e.target.value)}
              className="bg-slate-800 text-white text-xs border border-slate-700 rounded-lg py-1 px-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-hidden max-w-[280px] sm:max-w-md truncate cursor-pointer font-medium"
            >
              {currentGradeLessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  CĐ {lesson.topicNumber}: {lesson.topicTitle.replace(/Chủ đề \d+:\s*/, '')} {lesson.songOrRepertoire ? `— ${lesson.songOrRepertoire.split('(')[0].trim()}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Lesson Badge & Quick Switch to Library */}
        <div className="flex items-center gap-3 text-[11px]">
          <span className="hidden xl:inline text-slate-400">
            Thời lượng: <b className="text-white">{projectState.khbd.durationPeriods} tiết</b> · Học kỳ: <b className="text-white">{projectState.khbd.semester}</b>
          </span>
          <button
            onClick={() => setProjectState((prev) => ({ ...prev, activeModule: 'music_library' }))}
            className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 underline font-medium"
          >
            <span>Xem cả 32 chủ đề KNTT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Split-Pane Workspace (Left: 380px, Right: Flexible Workspace) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane (380px) */}
        <div className="no-print">
          <SidebarControls
            state={projectState}
            setState={setProjectState}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            onOpenJsonModal={() => setIsJsonModalOpen(true)}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
          />
        </div>

        {/* Right Pane (Flexible Workspace) */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden bg-slate-100">
          {projectState.activeModule === 'music_library' && (
            <MusicTextbookLibrary
              profile={projectState.teacherProfile}
              onApplyLessonToKhbd={(lesson) => handleApplyMusicLesson(lesson, 'khbd')}
              onApplyLessonToSlide={(lesson) => handleApplyMusicLesson(lesson, 'slide')}
              onApplyLessonToExam={(lesson) => handleApplyMusicLesson(lesson, 'exam')}
            />
          )}

          {projectState.activeModule === 'khbd' && (
            <KhbdEditor
              khbd={projectState.khbd}
              setKhbd={(newKhbd) =>
                setProjectState((prev) => ({
                  ...prev,
                  khbd: typeof newKhbd === 'function' ? newKhbd(prev.khbd) : newKhbd,
                }))
              }
              profile={projectState.teacherProfile}
              onConvertToSlides={handleConvertToSlides}
            />
          )}

          {projectState.activeModule === 'slide' && (
            <SlideViewer
              slides={projectState.slides}
              khbd={projectState.khbd}
              setSlides={(newSlides) =>
                setProjectState((prev) => ({
                  ...prev,
                  slides: typeof newSlides === 'function' ? newSlides(prev.slides) : newSlides,
                }))
              }
              profile={projectState.teacherProfile}
              onSyncFromKhbd={handleConvertToSlides}
            />
          )}

          {projectState.activeModule === 'exam' && (
            <ExamMatrixEditor
              exam={projectState.exam}
              khbd={projectState.khbd}
              setExam={(newExam) =>
                setProjectState((prev) => ({
                  ...prev,
                  exam: typeof newExam === 'function' ? newExam(prev.exam) : newExam,
                }))
              }
              initialView="exam"
            />
          )}

          {projectState.activeModule === 'matrix' && (
            <ExamMatrixEditor
              exam={projectState.exam}
              khbd={projectState.khbd}
              setExam={(newExam) =>
                setProjectState((prev) => ({
                  ...prev,
                  exam: typeof newExam === 'function' ? newExam(prev.exam) : newExam,
                }))
              }
              initialView="matrix"
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        state={projectState}
      />

      <JsonStateModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        state={projectState}
        setState={setProjectState}
      />

      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={projectState.teacherProfile}
        onSaveProfile={handleSaveProfile}
      />

    </div>
  );
}
