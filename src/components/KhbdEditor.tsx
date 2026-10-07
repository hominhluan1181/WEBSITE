/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KHBD Editor: Phân hệ 1 - Kế hoạch bài dạy chuẩn Công văn 5512/BGDĐT-GDTrH
 * Hỗ trợ Chỉnh sửa trực tiếp (Inline Editable) & Chuyển đổi nhanh sang Slide Deck 16:9
 */

import React, { useState } from 'react';
import { LessonPlan5512, LessonActivity, ActivityStep, TeacherProfile } from '../types/eduharness';
import { 
  FileText, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Target, 
  Users,
  Presentation,
  Check,
  Eye,
  Sliders,
  Music,
  Image as ImageIcon,
  Volume2,
  Play,
  Square,
  Maximize2,
  ZoomIn,
  Video,
  X,
  Compass,
  FolderOpen,
  Shield,
  Cpu,
  Bot,
  BookMarked,
  CheckCircle2
} from 'lucide-react';
import { exportKhbdToWord } from '../utils/exportUtils';
import { 
  vietnameseInstrumentsShowcase, 
  musicComposersGallery,
  songSheetMusic,
  sightReadingSheet,
  musicHeroScene,
  vietnamDanTranh,
  composerPortrait,
  musicSheetScore,
  orchestraBand
} from '../assets/images';
import { MUSIC_VISUAL_CATALOG, VisualMediaItem } from '../data/musicMediaCatalog';
import { musicAudioEngine, SOLFEGE_EXERCISES } from '../utils/audioSynth';
import { 
  resolveOfficialLessonIntegration, 
  getIntegrationGuidesForGrade, 
  MUSIC_INTEGRATION_MAP, 
  IntegrationTopicGuide 
} from '../data/musicIntegrationData';

interface KhbdEditorProps {
  khbd: LessonPlan5512;
  setKhbd: React.Dispatch<React.SetStateAction<LessonPlan5512>>;
  profile?: TeacherProfile;
  onConvertToSlides?: () => void;
}

export const KhbdEditor: React.FC<KhbdEditorProps> = ({ 
  khbd, 
  setKhbd, 
  profile,
  onConvertToSlides 
}) => {
  const [isInlineEditing, setIsInlineEditing] = useState<boolean>(true);
  const [isLivePreview, setIsLivePreview] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lightbox Modal state
  const [activeLightbox, setActiveLightbox] = useState<{
    url: string;
    title: string;
    caption?: string;
    badge?: string;
  } | null>(null);

  // Media Picker Modal state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState<boolean>(false);
  const [targetActivityId, setTargetActivityId] = useState<string | null>(null);
  const [mediaPickerFilter, setMediaPickerFilter] = useState<'all' | 'song_sheet' | 'sight_reading' | 'composer' | 'instrument' | 'video'>('all');

  // Integration Modal state (NLS-AI & ANQP Official Guidance)
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState<boolean>(false);
  const [selectedIntegrationGrade, setSelectedIntegrationGrade] = useState<'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9'>('Lớp 7');

  // Audio Playback state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const schoolName = profile?.school || khbd.schoolName;
  const department = profile?.department || khbd.department;
  const teacherName = profile?.name || khbd.teacherName;
  const academicYear = profile?.academicYear || khbd.academicYear;
  const subject = profile?.subject || khbd.subject;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Update activity field directly
  const handleUpdateActivity = (actId: string, field: keyof LessonActivity, value: any) => {
    setKhbd((prev) => ({
      ...prev,
      activities: prev.activities.map((act) =>
        act.id === actId ? { ...act, [field]: value } : act
      ),
    }));
  };

  // Update step field in activity table
  const handleUpdateStep = (
    actId: string,
    stepIndex: number,
    field: keyof ActivityStep,
    value: string
  ) => {
    setKhbd((prev) => ({
      ...prev,
      activities: prev.activities.map((act) => {
        if (act.id !== actId) return act;
        const newSteps = [...act.steps];
        newSteps[stepIndex] = { ...newSteps[stepIndex], [field]: value };
        return { ...act, steps: newSteps };
      }),
    }));
  };

  // Update lesson metadata inline
  const handleUpdateMeta = (field: keyof LessonPlan5512, value: any) => {
    setKhbd((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlayExerciseAudio = (exerciseId: string) => {
    if (playingAudioId === exerciseId) {
      musicAudioEngine.stopMelody();
      setPlayingAudioId(null);
      return;
    }
    const exercise = SOLFEGE_EXERCISES.find(e => e.id === exerciseId) || SOLFEGE_EXERCISES[0];
    setPlayingAudioId(exerciseId);
    showToast(`Đang phát âm thanh xướng âm mẫu: ${exercise.title}`);
    musicAudioEngine.playMelody(
      exercise.notes,
      undefined,
      () => setPlayingAudioId(null)
    );
  };

  const handleSelectMediaForTarget = (item: VisualMediaItem) => {
    if (targetActivityId) {
      handleUpdateActivity(targetActivityId, 'media', {
        type: item.category === 'song_sheet' ? 'sheet_music' :
              item.category === 'sight_reading' ? 'sight_reading' :
              item.category === 'composer' ? 'composer' :
              item.category === 'instrument' ? 'instrument' : 'video',
        url: item.imageUrl,
        title: item.title,
        caption: item.subtitle,
      });
      showToast(`Đã cập nhật học liệu trực quan cho hoạt động!`);
    } else {
      if (item.category === 'song_sheet') {
        setKhbd(prev => ({
          ...prev,
          visualAids: {
            ...prev.visualAids,
            songSheet: { title: item.title, url: item.imageUrl, meter: item.subtitle, note: item.description }
          }
        }));
      } else if (item.category === 'sight_reading') {
        setKhbd(prev => ({
          ...prev,
          visualAids: {
            ...prev.visualAids,
            sightReadingSheet: { title: item.title, url: item.imageUrl, tonality: item.subtitle, note: item.description }
          }
        }));
      } else if (item.category === 'composer') {
        setKhbd(prev => ({
          ...prev,
          visualAids: {
            ...prev.visualAids,
            composerPortrait: { title: item.title, url: item.imageUrl, author: item.subtitle, bio: item.description }
          }
        }));
      } else if (item.category === 'instrument') {
        setKhbd(prev => ({
          ...prev,
          visualAids: {
            ...prev.visualAids,
            instrumentGuide: { title: item.title, url: item.imageUrl, list: item.tags }
          }
        }));
      }
      showToast(`Đã gán học liệu "${item.title}" vào Kế hoạch bài dạy!`);
    }
    setIsMediaPickerOpen(false);
    setTargetActivityId(null);
  };

  const handleApplyOfficialIntegration = (customGuide?: IntegrationTopicGuide) => {
    const grade = (['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'].includes(khbd.grade) ? khbd.grade : 'Lớp 7') as any;
    const match = khbd.lessonTitle.match(/CHỦ ĐỀ\s*(\d+)/i);
    const topicNum = match ? parseInt(match[1]) : 1;
    const resolved = customGuide ? {
      nlsAiObjective: customGuide.nlsAiObjective || 'Lồng ghép Năng lực số (NLS): Học sinh biết tìm kiếm, khai thác học liệu số, tra cứu giai điệu bài hát trên môi trường mạng an toàn; sử dụng thiết bị nghe nhìn hỗ trợ học hát.',
      nlsAiProcessStep: customGuide.nlsAiProcessStep || {
        activityCode: 'HD2' as const,
        activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
        stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép NLS)',
        teacherAction: 'Giáo viên hướng dẫn học sinh quét mã QR / truy cập học liệu số để nghe bài hát mẫu, quan sát bản phổ điện tử trên màn hình chiếu.',
        studentAction: 'Học sinh sử dụng thiết bị số (máy tính/máy chiếu bảng tương tác), chủ động nghe giai điệu mẫu và tập hát theo bản phổ số hóa.',
      },
      qpanTopicTitle: customGuide.qpanTopicTitle || 'Chủ đề: Giáo dục lòng yêu nước, giữ gìn bản sắc văn hóa dân tộc và bảo vệ chủ quyền biên giới, biển đảo Việt Nam.',
      qpanObjective: customGuide.qpanObjective || 'Tích hợp Quốc phòng và An ninh (QPAN): Hiểu vai trò của ngư dân và nhân dân trong phát triển kinh tế biển gắn với bảo vệ chủ quyền biển, đảo Tổ quốc.',
      qpanProcessVandun: customGuide.qpanProcessVandun || 'Giáo viên tổ chức thảo luận ngắn về ý thức bảo tồn di sản văn hóa dân tộc và trách nhiệm bảo vệ chủ quyền lãnh thổ, củng cố khối đại đoàn kết toàn dân tộc.',
      sourceNote: customGuide.topicTitle
    } : resolveOfficialLessonIntegration(grade, topicNum);

    setKhbd((prev) => {
      const updatedCompetencies = { ...prev.objectives.competencies };
      updatedCompetencies.nlsAi = [resolved.nlsAiObjective];
      const updatedQpan = [`${resolved.qpanObjective} (${resolved.qpanTopicTitle})`];

      const updatedActivities = prev.activities.map((act) => {
        if (act.code === (resolved.nlsAiProcessStep?.activityCode || 'HD2')) {
          return {
            ...act,
            nlsAiNote: `${resolved.nlsAiProcessStep.stepName} — GV: ${resolved.nlsAiProcessStep.teacherAction} / HS: ${resolved.nlsAiProcessStep.studentAction}`
          };
        }
        if (act.code === 'HD4') {
          return {
            ...act,
            qpanNote: `${resolved.qpanTopicTitle}: ${resolved.qpanProcessVandun}`
          };
        }
        return act;
      });

      return {
        ...prev,
        nlsAiObjective: resolved.nlsAiObjective,
        nlsAiProcessStep: resolved.nlsAiProcessStep,
        qpanTopicTitle: resolved.qpanTopicTitle,
        qpanObjective: resolved.qpanObjective,
        qpanProcessVandun: resolved.qpanProcessVandun,
        objectives: {
          ...prev.objectives,
          competencies: updatedCompetencies,
          qpanIntegration: updatedQpan,
        },
        activities: updatedActivities,
      };
    });

    showToast('Đã nạp chính xác nội dung Lồng ghép NLS-AI & Tích hợp ANQP từ tài liệu hướng dẫn đính kèm!');
    setIsIntegrationModalOpen(false);
  };

  const handleConvertClick = () => {
    if (onConvertToSlides) {
      onConvertToSlides();
    } else {
      showToast('Đã kích hoạt chuyển đổi nhanh KHBD sang Slide Deck 16:9!');
    }
  };

  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto bg-slate-100 p-6 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Action Bar Above Document */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm no-print">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Phân hệ Soạn KHBD (Công văn 5512/BGDĐT-GDTrH)
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Bảng tiến trình 4 hoạt động
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Chỉnh sửa trực tiếp (Inline Editable) từng hoạt động, bước thực hiện & xuất bản Word chuẩn Bộ GD&ĐT
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* Guidance Integration Modal Trigger Button */}
            <button
              onClick={() => setIsIntegrationModalOpen(true)}
              title="Tra cứu địa chỉ lồng ghép NLS-AI và GDQP&AN theo tài liệu hướng dẫn đính kèm"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-300 shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-700" />
              <span>Hướng Dẫn Lồng Ghép (NLS-AI & ANQP)</span>
            </button>

            {/* Quick Convert Button */}
            <button
              onClick={handleConvertClick}
              title="Chuyển đổi nhanh 4 hoạt động thành Slide trình chiếu 16:9"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm whitespace-nowrap group"
            >
              <Presentation className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Chuyển Đổi Nhanh KHBD Thành Slide</span>
            </button>

            {/* Toggle Inline Edit Mode */}
            <button
              onClick={() => setIsInlineEditing(!isInlineEditing)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                isInlineEditing 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isInlineEditing ? 'Inline Edit: Bật' : 'Inline Edit: Tắt'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In A4</span>
            </button>

            <button
              onClick={() => {
                exportKhbdToWord(khbd, profile);
                showToast('Đang tải file Word (.doc) chuẩn Công văn 5512...');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file Word</span>
            </button>
          </div>
        </div>

        {/* Inline Editing Notice Banner */}
        {isInlineEditing && (
          <div className="bg-blue-50/70 border border-blue-200 text-blue-900 px-4 py-2 rounded-xl text-xs flex items-center justify-between no-print">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>
                <b>Chế độ Inline Editable đang hoạt động:</b> Bạn có thể chỉnh sửa trực tiếp nội dung Mục tiêu, Nội dung, Sản phẩm và các ô trong Bảng 3 cột Tổ chức thực hiện bên dưới. Mọi thay đổi được lưu tức thì!
              </span>
            </div>
            <span className="text-[11px] font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
              Tự động đồng bộ
            </span>
          </div>
        )}

        {/* Paper Document Canvas (Standard A4 Feel) */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-8 md:p-14 text-slate-900 text-sm leading-relaxed">
          
          {/* Lesson Title & Metadata (CV 5512 - Đã lược bỏ tiêu đề Trường, Tổ, Quốc hiệu theo yêu cầu người dùng) */}
          <div className="text-center pb-6 border-b border-slate-200 space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
              KẾ HOẠCH BÀI DẠY
            </h1>
            <div className="text-xs text-slate-500 italic">
              (Theo Công văn số 5512/BGDĐT-GDTrH ngày 18 tháng 12 năm 2020 của Bộ GDĐT)
            </div>
            
            {isInlineEditing ? (
              <div className="pt-2 max-w-xl mx-auto">
                <input
                  type="text"
                  value={khbd.lessonTitle}
                  onChange={(e) => handleUpdateMeta('lessonTitle', e.target.value)}
                  className="w-full text-center text-lg font-bold text-blue-700 uppercase p-1.5 border border-dashed border-blue-300 rounded focus:border-blue-600 focus:outline-hidden bg-blue-50/20"
                  title="Nhấp để sửa tên bài dạy"
                />
              </div>
            ) : (
              <div className="text-lg font-bold text-blue-700 uppercase pt-2">
                {khbd.lessonTitle}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 pt-1 font-medium">
              <span>Môn: <b>{subject}</b></span>
              <span>·</span>
              <span>Khối lớp: <b>{khbd.grade}</b></span>
              <span>·</span>
              <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                Bộ sách chuẩn: Kết nối tri thức với cuộc sống
              </span>
              <span>·</span>
              <span>Thời lượng: <b>{khbd.durationPeriods} tiết</b></span>
              <span>·</span>
              <span>Học kỳ: <b>{khbd.semester}</b></span>
            </div>
            <div className="text-xs text-slate-500">
              Giáo viên thực hiện: <b>{teacherName}</b> — Năm học: <b>{academicYear}</b>
            </div>
          </div>

          {/* I. MỤC TIÊU BÀI HỌC */}
          <section className="mb-8 space-y-3">
            <div className="border-b border-slate-200 pb-1 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                I. MỤC TIÊU BÀI HỌC
              </h3>
              <button
                onClick={() => setIsIntegrationModalOpen(true)}
                className="no-print flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
                title="Đồng bộ chính xác nội dung NLS-AI và ANQP từ tài liệu hướng dẫn đính kèm"
              >
                <BookMarked className="w-3 h-3" />
                <span>Đồng bộ từ Hướng Dẫn</span>
              </button>
            </div>

            {/* 1. Kiến thức */}
            <div className="space-y-1.5">
              <h4 className="font-semibold text-xs text-slate-800">1. Về kiến thức:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 pl-2">
                {khbd.objectives.knowledge.map((k, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {isInlineEditing ? (
                      <input
                        type="text"
                        value={k}
                        onChange={(e) => {
                          const updated = [...khbd.objectives.knowledge];
                          updated[idx] = e.target.value;
                          setKhbd((prev) => ({
                            ...prev,
                            objectives: { ...prev.objectives, knowledge: updated },
                          }));
                        }}
                        className="w-[95%] p-1 border border-dashed border-slate-300 rounded text-xs focus:border-blue-500 focus:bg-white"
                      />
                    ) : (
                      <span>{k}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Năng lực */}
            <div className="space-y-1.5 pt-1">
              <h4 className="font-semibold text-xs text-slate-800">2. Về năng lực:</h4>
              <div className="pl-2 space-y-2 text-xs">
                <div>
                  <span className="font-medium text-slate-700 italic block mb-1">- Năng lực chung:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                    {khbd.objectives.competencies.general.map((g, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={g}
                            onChange={(e) => {
                              const updated = [...khbd.objectives.competencies.general];
                              updated[idx] = e.target.value;
                              setKhbd((prev) => ({
                                ...prev,
                                objectives: {
                                  ...prev.objectives,
                                  competencies: { ...prev.objectives.competencies, general: updated },
                                },
                              }));
                            }}
                            className="w-[95%] p-1 border border-dashed border-slate-300 rounded text-xs focus:border-blue-500 focus:bg-white"
                          />
                        ) : (
                          <span>{g}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-medium text-slate-700 italic block mb-1">- Năng lực đặc thù môn học:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                    {khbd.objectives.competencies.subject.map((s, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {isInlineEditing ? (
                          <input
                            type="text"
                            value={s}
                            onChange={(e) => {
                              const updated = [...khbd.objectives.competencies.subject];
                              updated[idx] = e.target.value;
                              setKhbd((prev) => ({
                                ...prev,
                                objectives: {
                                  ...prev.objectives,
                                  competencies: { ...prev.objectives.competencies, subject: updated },
                                },
                              }));
                            }}
                            className="w-[95%] p-1 border border-dashed border-slate-300 rounded text-xs focus:border-blue-500 focus:bg-white"
                          />
                        ) : (
                          <span>{s}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Phẩm chất */}
            <div className="space-y-1.5 pt-1">
              <h4 className="font-semibold text-xs text-slate-800">3. Về phẩm chất:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 pl-2">
                {khbd.objectives.qualities.map((q, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {isInlineEditing ? (
                      <input
                        type="text"
                        value={q}
                        onChange={(e) => {
                          const updated = [...khbd.objectives.qualities];
                          updated[idx] = e.target.value;
                          setKhbd((prev) => ({
                            ...prev,
                            objectives: { ...prev.objectives, qualities: updated },
                          }));
                        }}
                        className="w-[95%] p-1 border border-dashed border-slate-300 rounded text-xs focus:border-blue-500 focus:bg-white"
                      />
                    ) : (
                      <span>{q}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Lồng ghép Năng lực số (NLS) - AI (Chuẩn tài liệu hướng dẫn đính kèm) */}
            <div className="space-y-1.5 pt-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-xs text-sky-900 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-sky-700" />
                  4. Lồng ghép Năng lực số (NLS) và Trí tuệ nhân tạo (AI):
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300">
                  Biên bản thống nhất PPCT 2026-2027
                </span>
              </div>
              <div className="pl-2">
                {isInlineEditing ? (
                  <textarea
                    rows={2}
                    value={khbd.nlsAiObjective || khbd.objectives.competencies.nlsAi?.[0] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setKhbd((prev) => ({
                        ...prev,
                        nlsAiObjective: val,
                        objectives: {
                          ...prev.objectives,
                          competencies: {
                            ...prev.objectives.competencies,
                            nlsAi: [val],
                          },
                        },
                      }));
                    }}
                    placeholder="Nội dung lồng ghép NLS - AI theo Biên bản thống nhất PPCT môn Âm nhạc 2026-2027..."
                    className="w-[95%] p-2 border border-dashed border-sky-300 bg-sky-50/30 rounded text-xs text-sky-950 focus:border-sky-500 focus:bg-white"
                  />
                ) : (
                  <p className="text-xs text-slate-700 bg-sky-50/60 p-2 rounded border border-sky-200 leading-relaxed">
                    {khbd.nlsAiObjective || khbd.objectives.competencies.nlsAi?.[0] || 'Chưa lồng ghép NLS-AI.'}
                  </p>
                )}
              </div>
            </div>

            {/* 5. Tích hợp Giáo dục Quốc phòng và An ninh (ANQP) (Chuẩn Phụ lục hướng dẫn đính kèm) */}
            <div className="space-y-1.5 pt-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-xs text-amber-900 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  5. Tích hợp Giáo dục Quốc phòng và An ninh (ANQP):
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  Phụ lục GDQP&AN THCS 2026-2027
                </span>
              </div>
              <div className="pl-2 space-y-1">
                {khbd.qpanTopicTitle && (
                  <p className="text-[11px] font-semibold text-amber-950 italic">
                    {khbd.qpanTopicTitle}
                  </p>
                )}
                {isInlineEditing ? (
                  <textarea
                    rows={2}
                    value={khbd.qpanObjective || khbd.objectives.qpanIntegration?.[0] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setKhbd((prev) => ({
                        ...prev,
                        qpanObjective: val,
                        objectives: {
                          ...prev.objectives,
                          qpanIntegration: [val],
                        },
                      }));
                    }}
                    placeholder="Mục tiêu tích hợp ANQP theo Phụ lục hướng dẫn môn Âm nhạc 2026-2027..."
                    className="w-[95%] p-2 border border-dashed border-amber-300 bg-amber-50/30 rounded text-xs text-amber-950 focus:border-amber-500 focus:bg-white"
                  />
                ) : (
                  <p className="text-xs text-slate-700 bg-amber-50/60 p-2 rounded border border-amber-200 leading-relaxed">
                    {khbd.qpanObjective || khbd.objectives.qpanIntegration?.[0] || 'Chưa tích hợp ANQP.'}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU */}
          <section className="mb-8 space-y-4">
            <div className="border-b border-slate-200 pb-1.5 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
              </h3>
              
              <div className="flex items-center gap-2 no-print">
                <button
                  onClick={() => {
                    setTargetActivityId(null);
                    setIsMediaPickerOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Kho Tư Liệu SGK KNTT</span>
                </button>
              </div>
            </div>

            <div className="text-xs space-y-1.5 pl-2">
              <p>
                <b className="text-slate-800">1. Thiết bị của giáo viên: </b>
                <span className="text-slate-700">{khbd.equipment.teacher.join('; ')}</span>
              </p>
              <p>
                <b className="text-slate-800">2. Học liệu của học sinh: </b>
                <span className="text-slate-700">{khbd.equipment.students.join('; ')}</span>
              </p>
            </div>

            {/* BỘ SƯU TẬP HỌC LIỆU HÌNH ẢNH TRỰC QUAN MÔN ÂM NHẠC (SGK KẾT NỐI TRI THỨC) */}
            <div className="mt-3 bg-gradient-to-br from-slate-50 to-indigo-50/40 p-4 rounded-xl border border-indigo-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-600 text-white rounded-lg">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                      3. Học liệu hình ảnh trực quan & âm thanh sư phạm bộ môn
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Bản nhạc bài hát chính thức · Bản phổ đọc nhạc (Solfège) · Chân dung danh nhân · Nhạc cụ học đường
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200">
                  SGK Kết nối tri thức với cuộc sống
                </span>
              </div>

              {/* 4 Rich Visual Media Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                
                {/* 1. Bản nhạc bài hát SGK */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between group hover:border-indigo-400 transition-all">
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setActiveLightbox({
                      url: khbd.visualAids?.songSheet?.url || songSheetMusic,
                      title: khbd.visualAids?.songSheet?.title || `Bản nhạc chính thức bài "${khbd.lessonTitle}"`,
                      caption: khbd.visualAids?.songSheet?.meter || 'Khuông nhạc, cao độ, trường độ và lời ca chuẩn SGK',
                      badge: 'Bản nhạc bài hát SGK'
                    })}
                  >
                    <img
                      src={khbd.visualAids?.songSheet?.url || songSheetMusic}
                      alt="Bản nhạc bài hát"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                      <ZoomIn className="w-4 h-4" />
                      <span>Xem bản to</span>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-100 font-bold text-[10px] backdrop-blur-xs">
                      Bản nhạc bài hát
                    </span>
                  </div>
                  
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs line-clamp-1">
                        {khbd.visualAids?.songSheet?.title || `Bản nhạc: ${khbd.lessonTitle}`}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {khbd.visualAids?.songSheet?.meter || 'Nhịp 2/4 vừa phải · Lối hát móc xích'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handlePlayExerciseAudio('tdn-1')}
                        className={`flex-1 flex items-center justify-center gap-1 py-1 rounded text-[11px] font-semibold transition-colors ${
                          playingAudioId === 'tdn-1'
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {playingAudioId === 'tdn-1' ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        <span>{playingAudioId === 'tdn-1' ? 'Dừng phát' : 'Nghe mẫu'}</span>
                      </button>
                      <button
                        onClick={() => setActiveLightbox({
                          url: khbd.visualAids?.songSheet?.url || songSheetMusic,
                          title: khbd.visualAids?.songSheet?.title || `Bản nhạc: ${khbd.lessonTitle}`,
                          caption: 'Bản phổ phóng to phục vụ giảng dạy và in ấn KHBD',
                          badge: 'Bản nhạc SGK'
                        })}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                        title="Phóng to xem chi tiết nốt nhạc"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Bài tập đọc nhạc (Solfège) */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between group hover:border-emerald-400 transition-all">
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setActiveLightbox({
                      url: khbd.visualAids?.sightReadingSheet?.url || sightReadingSheet,
                      title: khbd.visualAids?.sightReadingSheet?.title || 'Bài tập đọc nhạc (Tập đọc nhạc THCS)',
                      caption: khbd.visualAids?.sightReadingSheet?.tonality || 'Thang âm Đô - Rê - Mi - Son - La · Nhịp 2/4',
                      badge: 'Bài tập đọc nhạc'
                    })}
                  >
                    <img
                      src={khbd.visualAids?.sightReadingSheet?.url || sightReadingSheet}
                      alt="Bài tập đọc nhạc"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                      <ZoomIn className="w-4 h-4" />
                      <span>Xem bản to</span>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-100 font-bold text-[10px] backdrop-blur-xs">
                      Tập đọc nhạc
                    </span>
                  </div>

                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs line-clamp-1">
                        {khbd.visualAids?.sightReadingSheet?.title || 'Bản phổ Bài đọc nhạc số 1'}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {khbd.visualAids?.sightReadingSheet?.tonality || 'Đô - Rê - Mi - Son - La · Nhịp 2/4'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handlePlayExerciseAudio('tdn-1')}
                        className={`flex-1 flex items-center justify-center gap-1 py-1 rounded text-[11px] font-semibold transition-colors ${
                          playingAudioId === 'tdn-1'
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {playingAudioId === 'tdn-1' ? <Square className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        <span>{playingAudioId === 'tdn-1' ? 'Dừng xướng' : 'Xướng âm'}</span>
                      </button>
                      <button
                        onClick={() => setActiveLightbox({
                          url: khbd.visualAids?.sightReadingSheet?.url || sightReadingSheet,
                          title: khbd.visualAids?.sightReadingSheet?.title || 'Bài tập đọc nhạc',
                          caption: 'Bản phổ khuông nhạc có ký hiệu Solfège và gõ phách',
                          badge: 'Tập đọc nhạc'
                        })}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                        title="Phóng to"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Chân dung Nhạc sĩ & Danh nhân */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between group hover:border-amber-400 transition-all">
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setActiveLightbox({
                      url: khbd.visualAids?.composerPortrait?.url || composerPortrait,
                      title: khbd.visualAids?.composerPortrait?.title || 'Chân dung Nhạc sĩ & Danh nhân',
                      caption: khbd.visualAids?.composerPortrait?.author || 'Nhạc sĩ Văn Cao, Trịnh Công Sơn, Mozart, Beethoven',
                      badge: 'Danh nhân âm nhạc'
                    })}
                  >
                    <img
                      src={khbd.visualAids?.composerPortrait?.url || composerPortrait}
                      alt="Chân dung nhạc sĩ"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                      <ZoomIn className="w-4 h-4" />
                      <span>Xem chân dung</span>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-900/80 text-amber-100 font-bold text-[10px] backdrop-blur-xs">
                      Chân dung Nhạc sĩ
                    </span>
                  </div>

                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs line-clamp-1">
                        {khbd.visualAids?.composerPortrait?.title || 'Chân dung Danh nhân Âm nhạc'}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {khbd.visualAids?.composerPortrait?.author || 'Văn Cao, Trịnh Công Sơn, Mozart'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setActiveLightbox({
                          url: khbd.visualAids?.composerPortrait?.url || composerPortrait,
                          title: khbd.visualAids?.composerPortrait?.title || 'Chân dung Nhạc sĩ',
                          caption: khbd.visualAids?.composerPortrait?.bio || 'Tác giả tiêu biểu trong chương trình Âm nhạc THCS Kết nối tri thức',
                          badge: 'Nhạc sĩ danh nhân'
                        })}
                        className="w-full flex items-center justify-center gap-1 py-1 rounded text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors"
                      >
                        <ZoomIn className="w-3 h-3" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Nhạc cụ Dạy học & Dân tộc */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between group hover:border-purple-400 transition-all">
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setActiveLightbox({
                      url: khbd.visualAids?.instrumentGuide?.url || vietnamDanTranh,
                      title: khbd.visualAids?.instrumentGuide?.title || 'Nhạc cụ Dân tộc & Học đường',
                      caption: 'Đàn tranh, Sáo trúc, Đàn bầu, Melodica, Recorder & Thanh phách',
                      badge: 'Nhạc cụ thực hành'
                    })}
                  >
                    <img
                      src={khbd.visualAids?.instrumentGuide?.url || vietnamDanTranh}
                      alt="Nhạc cụ thực hành"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                      <ZoomIn className="w-4 h-4" />
                      <span>Xem nhạc cụ</span>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-100 font-bold text-[10px] backdrop-blur-xs">
                      Nhạc cụ học đường
                    </span>
                  </div>

                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs line-clamp-1">
                        {khbd.visualAids?.instrumentGuide?.title || 'Nhạc cụ Dân tộc & Phương Tây'}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {khbd.visualAids?.instrumentGuide?.list?.join(', ') || 'Đàn tranh, Sáo trúc, Melodica'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setActiveLightbox({
                          url: khbd.visualAids?.instrumentGuide?.url || vietnamDanTranh,
                          title: khbd.visualAids?.instrumentGuide?.title || 'Nhạc cụ môn Âm nhạc',
                          caption: 'Học cụ thực hành gõ đệm và hòa tấu giai điệu trong tiết học',
                          badge: 'Nhạc cụ'
                        })}
                        className="w-full flex items-center justify-center gap-1 py-1 rounded text-[11px] font-semibold bg-purple-50 hover:bg-purple-100 text-purple-800 transition-colors"
                      >
                        <ZoomIn className="w-3 h-3" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* III. TIẾN TRÌNH DẠY HỌC (CHUẨN 4 HOẠT ĐỘNG 5512 - INLINE EDITABLE) */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  III. TIẾN TRÌNH DẠY HỌC (CHUẨN 4 HOẠT ĐỘNG CÔNG VĂN 5512)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cấu trúc chuẩn sư phạm gồm 4 hoạt động: Khởi động · Hình thành kiến thức · Luyện tập · Vận dụng
                </p>
              </div>

              <button
                onClick={handleConvertClick}
                className="hidden md:flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Chuyển sang Slide 16:9</span>
              </button>
            </div>

            {/* List of 4 Activities */}
            <div className="space-y-8">
              {khbd.activities.map((act, index) => {
                const badgeLabel = [
                  'Hoạt động 1: Mở đầu / Khởi động',
                  'Hoạt động 2: Hình thành kiến thức mới',
                  'Hoạt động 3: Luyện tập & Củng cố',
                  'Hoạt động 4: Vận dụng thực tiễn'
                ][index] || act.title;

                return (
                  <div 
                    key={act.id} 
                    className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40 shadow-xs"
                  >
                    {/* Activity Title Banner */}
                    <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 flex-1">
                        <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <div className="flex-1 mr-4">
                          {isInlineEditing ? (
                            <input
                              type="text"
                              value={act.title}
                              onChange={(e) => handleUpdateActivity(act.id, 'title', e.target.value)}
                              className="font-bold text-sm text-blue-950 bg-white border border-slate-200 rounded px-2 py-0.5 w-full focus:ring-1 focus:ring-blue-500"
                              title="Nhấp để sửa tiêu đề hoạt động"
                            />
                          ) : (
                            <h4 className="font-bold text-sm text-blue-950">
                              {act.title}
                            </h4>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-slate-500 font-mono">
                              Thời lượng dự kiến:
                            </span>
                            {isInlineEditing ? (
                              <input
                                type="number"
                                value={act.timeMinutes}
                                onChange={(e) => handleUpdateActivity(act.id, 'timeMinutes', parseInt(e.target.value) || 0)}
                                className="w-16 px-1.5 py-0.5 text-[11px] font-mono border border-slate-200 rounded bg-white"
                              />
                            ) : (
                              <span className="text-[11px] font-semibold text-slate-700">~{act.timeMinutes} phút</span>
                            )}
                            <span className="text-[11px] text-slate-400">·</span>
                            <span className="text-[11px] text-blue-600 font-medium">{badgeLabel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 font-mono">
                        Mã: {act.code}
                      </div>
                    </div>

                    {/* Activity Body: a) Mục tiêu, b) Nội dung, c) Sản phẩm, d) Tổ chức thực hiện */}
                    <div className="p-5 space-y-4 text-xs">
                      
                      {/* a) Mục tiêu */}
                      <div>
                        <div className="font-bold text-slate-800 mb-1 flex items-center justify-between">
                          <span>a) Mục tiêu:</span>
                          {isInlineEditing && (
                            <span className="text-[10px] text-blue-500 font-normal italic">
                              (Chỉnh sửa trực tiếp)
                            </span>
                          )}
                        </div>
                        {isInlineEditing ? (
                          <textarea
                            value={act.objective}
                            onChange={(e) => handleUpdateActivity(act.id, 'objective', e.target.value)}
                            rows={2}
                            className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white leading-relaxed"
                            placeholder="Nhập mục tiêu hoạt động..."
                          />
                        ) : (
                          <p className="text-slate-700 pl-3 border-l-2 border-blue-400 bg-white p-2.5 rounded-r leading-relaxed">
                            {act.objective}
                          </p>
                        )}
                      </div>

                      {/* b) Nội dung */}
                      <div>
                        <div className="font-bold text-slate-800 mb-1 flex items-center justify-between">
                          <span>b) Nội dung:</span>
                          {isInlineEditing && (
                            <span className="text-[10px] text-emerald-600 font-normal italic">
                              (Chỉnh sửa trực tiếp)
                            </span>
                          )}
                        </div>
                        {isInlineEditing ? (
                          <textarea
                            value={act.content}
                            onChange={(e) => handleUpdateActivity(act.id, 'content', e.target.value)}
                            rows={2}
                            className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white leading-relaxed"
                            placeholder="Nhập nội dung học tập / câu hỏi..."
                          />
                        ) : (
                          <p className="text-slate-700 pl-3 border-l-2 border-emerald-400 bg-white p-2.5 rounded-r leading-relaxed">
                            {act.content}
                          </p>
                        )}
                      </div>

                      {/* c) Sản phẩm */}
                      <div>
                        <div className="font-bold text-slate-800 mb-1 flex items-center justify-between">
                          <span>c) Sản phẩm học tập:</span>
                          {isInlineEditing && (
                            <span className="text-[10px] text-amber-600 font-normal italic">
                              (Chỉnh sửa trực tiếp)
                            </span>
                          )}
                        </div>
                        {isInlineEditing ? (
                          <textarea
                            value={act.product}
                            onChange={(e) => handleUpdateActivity(act.id, 'product', e.target.value)}
                            rows={2}
                            className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white leading-relaxed"
                            placeholder="Nhập sản phẩm học sinh cần hoàn thành..."
                          />
                        ) : (
                          <p className="text-slate-700 pl-3 border-l-2 border-amber-400 bg-white p-2.5 rounded-r leading-relaxed">
                            {act.product}
                          </p>
                        )}
                      </div>

                      {/* Học liệu trực quan minh họa hoạt động (Hình ảnh / Bản nhạc / Nhạc sĩ / Nhạc cụ) */}
                      {act.media && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3 min-w-0">
                            <div 
                              className="w-20 h-14 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300 relative cursor-pointer group"
                              onClick={() => setActiveLightbox({
                                url: act.media?.url || songSheetMusic,
                                title: act.media?.title || 'Học liệu trực quan hoạt động',
                                caption: act.media?.caption,
                                badge: act.title
                              })}
                            >
                              <img
                                src={act.media.url}
                                alt={act.media.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                                <ZoomIn className="w-3.5 h-3.5" />
                              </div>
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                                  Học liệu trực quan
                                </span>
                                <span className="text-[10px] text-slate-400">·</span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {act.media.type === 'sheet_music' ? 'Bản nhạc SGK' :
                                   act.media.type === 'sight_reading' ? 'Bài tập đọc nhạc' :
                                   act.media.type === 'composer' ? 'Chân dung nhạc sĩ' :
                                   act.media.type === 'instrument' ? 'Nhạc cụ môn học' : 'Tư liệu giáo khoa'}
                                </span>
                              </div>
                              <h5 className="font-bold text-slate-800 text-xs truncate">
                                {act.media.title}
                              </h5>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {act.media.caption || 'Hình ảnh tư liệu minh họa cho hoạt động học tập.'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 no-print w-full sm:w-auto justify-end">
                            <button
                              onClick={() => {
                                setTargetActivityId(act.id);
                                setIsMediaPickerOpen(true);
                              }}
                              className="px-2.5 py-1 rounded text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors"
                            >
                              Đổi học liệu
                            </button>
                            <button
                              onClick={() => setActiveLightbox({
                                url: act.media?.url || songSheetMusic,
                                title: act.media?.title || 'Học liệu trực quan',
                                caption: act.media?.caption,
                                badge: act.title
                              })}
                              className="px-2.5 py-1 rounded text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1"
                            >
                              <Maximize2 className="w-3 h-3" />
                              <span>Bản to</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Lồng ghép NLS - AI theo Biên bản thống nhất PPCT 2026-2027 */}
                      {(act.nlsAiNote || (khbd.nlsAiProcessStep && khbd.nlsAiProcessStep.activityCode === act.code)) && (
                        <div className="bg-sky-50/80 border border-sky-300 rounded-lg p-3 text-xs space-y-1.5 shadow-2xs">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 font-bold text-sky-950">
                              <Bot className="w-4 h-4 text-sky-700" />
                              <span>Lồng ghép Năng lực số (NLS) & Trí tuệ nhân tạo (AI):</span>
                              <span className="font-semibold text-sky-800">
                                {khbd.nlsAiProcessStep?.stepName || 'Nội dung thực hiện lồng ghép'}
                              </span>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300">
                              Biên bản thống nhất PPCT 2026-2027
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700 bg-white/80 p-2.5 rounded border border-sky-200">
                            <div>
                              <strong className="text-sky-900 block mb-0.5">• Hoạt động của Giáo viên:</strong>
                              <span>{khbd.nlsAiProcessStep?.teacherAction || act.nlsAiNote}</span>
                            </div>
                            <div>
                              <strong className="text-sky-900 block mb-0.5">• Hoạt động của Học sinh:</strong>
                              <span>{khbd.nlsAiProcessStep?.studentAction || 'Học sinh thao tác thiết bị số / AI dưới sự hướng dẫn của giáo viên.'}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tích hợp Giáo dục Quốc phòng và An ninh (ANQP) theo Phụ lục hướng dẫn */}
                      {(act.qpanNote || (act.code === 'HD4' && (khbd.qpanProcessVandun || khbd.qpanTopicTitle))) && (
                        <div className="bg-amber-50/90 border border-amber-300 rounded-lg p-3 text-xs space-y-1.5 shadow-2xs">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 font-bold text-amber-950">
                              <Shield className="w-4 h-4 text-amber-700" />
                              <span>Tích hợp Giáo dục Quốc phòng và An ninh (ANQP):</span>
                              <span className="font-semibold text-amber-900">
                                {khbd.qpanTopicTitle || 'Chủ đề tích hợp ANQP môn Âm nhạc'}
                              </span>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                              Phụ lục GDQP&AN THCS 2026-2027
                            </span>
                          </div>
                          <div className="text-slate-700 bg-white/80 p-2.5 rounded border border-amber-200 space-y-1">
                            {khbd.qpanObjective && (
                              <p>
                                <strong className="text-amber-900">• Mục tiêu tích hợp: </strong>
                                <span>{khbd.qpanObjective}</span>
                              </p>
                            )}
                            <p>
                              <strong className="text-amber-900">• Hướng dẫn tổ chức / Vận dụng liên hệ: </strong>
                              <span>{khbd.qpanProcessVandun || act.qpanNote}</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* d) Tổ chức thực hiện: BẢNG TIẾN TRÌNH 4 BƯỚC CHUẨN 5512 (INLINE EDITABLE) */}
                      <div>
                        <div className="font-bold text-slate-800 mb-2 flex items-center justify-between">
                          <span>d) Tổ chức thực hiện (Bảng tiến trình 4 bước chuẩn Công văn 5512):</span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            Bước 1: Chuyển giao · Bước 2: Thực hiện · Bước 3: Báo cáo · Bước 4: Kết luận
                          </span>
                        </div>
                        
                        <div className="overflow-x-auto rounded-lg border border-slate-300 shadow-2xs">
                          <table className="w-full border-collapse bg-white text-xs">
                            <thead>
                              <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
                                <th className="p-3 text-left font-bold w-1/4 border-r border-slate-300">
                                  Các bước tổ chức thực hiện
                                </th>
                                <th className="p-3 text-left font-bold w-3/8 border-r border-slate-300 text-blue-900">
                                  Hoạt động của Giáo viên
                                </th>
                                <th className="p-3 text-left font-bold w-3/8 text-emerald-900">
                                  Hoạt động của Học sinh
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {act.steps.map((step, sIdx) => (
                                <tr key={step.stepName || sIdx} className="hover:bg-slate-50/70 transition-colors">
                                  {/* Cột 1: Bước */}
                                  <td className="p-3 font-semibold text-slate-900 border-r border-slate-200 align-top bg-slate-50/50">
                                    <div className="flex items-center gap-1.5 text-blue-900 font-bold mb-1">
                                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">
                                        {sIdx + 1}
                                      </span>
                                      {isInlineEditing ? (
                                        <input
                                          type="text"
                                          value={step.stepName}
                                          onChange={(e) =>
                                            handleUpdateStep(act.id, sIdx, 'stepName', e.target.value)
                                          }
                                          className="font-bold text-blue-900 text-xs bg-transparent border-b border-dashed border-blue-300 w-full focus:outline-hidden"
                                        />
                                      ) : (
                                        <span>{step.stepName}</span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-mono">
                                      {sIdx === 0 && 'Chuyển giao nhiệm vụ'}
                                      {sIdx === 1 && 'Thực hiện nhiệm vụ'}
                                      {sIdx === 2 && 'Báo cáo & thảo luận'}
                                      {sIdx === 3 && 'Kết luận & nhận định'}
                                    </div>
                                  </td>
                                  
                                  {/* Cột 2: Hoạt động của Giáo viên */}
                                  <td className="p-3 text-slate-700 border-r border-slate-200 align-top">
                                    {isInlineEditing ? (
                                      <textarea
                                        value={step.teacherAction}
                                        onChange={(e) =>
                                          handleUpdateStep(act.id, sIdx, 'teacherAction', e.target.value)
                                        }
                                        rows={3}
                                        className="w-full p-2 border border-slate-200 hover:border-slate-300 focus:border-blue-500 rounded text-xs leading-relaxed focus:ring-1 focus:ring-blue-500/20 bg-white"
                                        placeholder="Nhập hoạt động của giáo viên..."
                                      />
                                    ) : (
                                      <div className="leading-relaxed whitespace-pre-line">{step.teacherAction}</div>
                                    )}
                                  </td>

                                  {/* Cột 3: Hoạt động của Học sinh */}
                                  <td className="p-3 text-slate-700 align-top">
                                    {isInlineEditing ? (
                                      <textarea
                                        value={step.studentAction}
                                        onChange={(e) =>
                                          handleUpdateStep(act.id, sIdx, 'studentAction', e.target.value)
                                        }
                                        rows={3}
                                        className="w-full p-2 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 rounded text-xs leading-relaxed focus:ring-1 focus:ring-emerald-500/20 bg-white"
                                        placeholder="Nhập hoạt động của học sinh..."
                                      />
                                    ) : (
                                      <div className="leading-relaxed whitespace-pre-line">{step.studentAction}</div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Convert Bottom Call-to-action */}
          <div className="mt-10 p-5 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-sm">
                <Presentation className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Sẵn sàng giảng dạy trên lớp?
                </h4>
                <p className="text-xs text-slate-600">
                  Tự động chuyển đổi toàn bộ 4 hoạt động thành Slide Deck 16:9 với các thẻ trực quan hóa kiến thức và chế độ Toàn Màn Hình.
                </p>
              </div>
            </div>

            <button
              onClick={handleConvertClick}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chuyển Đổi Nhanh KHBD Thành Slide</span>
            </button>
          </div>

          {/* Footer Approval Signature Block */}
          <div className="grid grid-cols-2 gap-8 pt-12 mt-12 border-t border-slate-200 text-center text-xs">
            <div className="space-y-16">
              <div className="font-bold uppercase text-slate-800">
                DUYỆT CỦA TỔ CHUYÊN MÔN
              </div>
              <div className="text-slate-400 italic">
                (Ký và ghi rõ họ tên)
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <div className="italic text-slate-500 mb-1">
                  Ngày ..... tháng ..... năm 20...
                </div>
                <div className="font-bold uppercase text-slate-800">
                  GIÁO VIÊN SOẠN BÀI
                </div>
              </div>
              <div className="font-bold text-slate-900">
                {teacherName}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal (Phóng to học liệu trực quan) */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 no-print">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full border border-slate-700 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold">
                  {activeLightbox.badge || 'Học liệu trực quan'}
                </span>
                <h3 className="font-bold text-sm truncate max-w-md">
                  {activeLightbox.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightbox(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                title="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img
                src={activeLightbox.url}
                alt={activeLightbox.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg border border-slate-800 shadow-lg"
              />
            </div>

            <div className="p-4 bg-slate-800/90 border-t border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-300 text-xs">
              <p className="line-clamp-2 text-slate-300">
                {activeLightbox.caption || 'Học liệu chuẩn hóa môn Âm nhạc THCS theo chương trình GDPT 2018 (Bộ sách Kết nối tri thức).'}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handlePlayExerciseAudio('tdn-1')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Nghe thử âm thanh mẫu</span>
                </button>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Catalog Picker Modal (Kho tư liệu SGK) */}
      {isMediaPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 no-print">
          <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
            {/* Modal Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-indigo-600 text-white">
                  <FolderOpen className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Kho Tư Liệu Học Liệu Trực Quan Môn Âm Nhạc THCS
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {targetActivityId ? 'Chọn học liệu gán vào hoạt động đang chọn' : 'Chọn học liệu cập nhật vào Kế hoạch bài dạy'} · SGK Kết nối tri thức
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMediaPickerOpen(false);
                  setTargetActivityId(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: 'all', label: 'Tất cả học liệu' },
                { id: 'song_sheet', label: 'Bản nhạc bài hát SGK' },
                { id: 'sight_reading', label: 'Bài tập đọc nhạc (Solfège)' },
                { id: 'composer', label: 'Chân dung Nhạc sĩ' },
                { id: 'instrument', label: 'Nhạc cụ môn học' },
                { id: 'video', label: 'Video bài giảng' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMediaPickerFilter(tab.id as any)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    mediaPickerFilter === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Catalog Grid */}
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 bg-slate-50">
              {MUSIC_VISUAL_CATALOG.filter(
                (item) => mediaPickerFilter === 'all' || item.category === mediaPickerFilter
              ).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-16/10 overflow-hidden bg-slate-100 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 text-white font-mono text-[10px] font-bold backdrop-blur-xs">
                        {item.gradeBadge}
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => handleSelectMediaForTarget(item)}
                      className="flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                    >
                      Chọn học liệu này
                    </button>
                    <button
                      onClick={() => setActiveLightbox({
                        url: item.imageUrl,
                        title: item.title,
                        caption: item.description,
                        badge: item.gradeBadge
                      })}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200"
                      title="Xem phóng to"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Được đồng bộ với phân hệ Slide 16:9 & Giáo án Word 5512</span>
              <button
                onClick={() => {
                  setIsMediaPickerOpen(false);
                  setTargetActivityId(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Guidance Integration Modal (NLS-AI & GDQP&AN) */}
      {isIntegrationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 no-print">
          <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                  <Shield className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm md:text-base text-white">
                      Địa Chỉ Lồng Ghép NLS-AI & Tích Hợp GDQP&AN Môn Âm Nhạc
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Tài liệu đính kèm chính thức
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Căn cứ: Biên bản thống nhất PPCT 2026-2027 (THCS Long Hồ) & Phụ lục Hướng dẫn địa chỉ lồng ghép GDQP&AN 2026-2027
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsIntegrationModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Apply Banner for Current Lesson */}
            <div className="p-4 bg-emerald-50 border-b border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-900 uppercase">
                  Bài học đang soạn: {khbd.lessonTitle} ({khbd.grade})
                </span>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Hệ thống tự động tra cứu địa chỉ phù hợp theo hướng dẫn đính kèm và điền chuẩn xác vào Mục tiêu & Tiến trình hoạt động.
                </p>
              </div>

              <button
                onClick={() => handleApplyOfficialIntegration()}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Tự Động Nạp Chuẩn Cho Bài Này</span>
              </button>
            </div>

            {/* Grade Switcher Tabs */}
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600 mr-2">Chọn Khối Lớp:</span>
              {(['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedIntegrationGrade(grade)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedIntegrationGrade === grade
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>

            {/* Guides List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {getIntegrationGuidesForGrade(selectedIntegrationGrade).map(({ id, guide }) => (
                <div
                  key={id}
                  className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  {/* Topic Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs md:text-sm text-slate-900">
                        {guide.topicTitle}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        {guide.hasNls && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                            NLS
                          </span>
                        )}
                        {guide.hasAi && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                            AI
                          </span>
                        )}
                        {guide.hasQpan && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            GDQP&AN
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyOfficialIntegration(guide)}
                      className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors self-start sm:self-auto"
                    >
                      Áp dụng vào KHBD hiện tại
                    </button>
                  </div>

                  {/* NLS / AI Content */}
                  {(guide.hasNls || guide.hasAi) && guide.nlsAiObjective && (
                    <div className="bg-sky-50/60 border border-sky-200 rounded-lg p-3 text-xs space-y-1.5">
                      <div className="font-bold text-sky-950 flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-sky-700" />
                        <span>Mục tiêu Lồng ghép NLS - AI:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-1">
                        {guide.nlsAiObjective}
                      </p>
                      {guide.nlsAiProcessStep && (
                        <div className="pt-1 text-[11px] text-slate-600 pl-1 border-t border-sky-200/60 mt-1">
                          <b>{guide.nlsAiProcessStep.activityTitle} ({guide.nlsAiProcessStep.stepName}):</b>
                          <p className="mt-0.5">· GV: {guide.nlsAiProcessStep.teacherAction}</p>
                          <p>· HS: {guide.nlsAiProcessStep.studentAction}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* QPAN Content */}
                  {guide.hasQpan && guide.qpanObjective && (
                    <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs space-y-1.5">
                      <div className="font-bold text-amber-950 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-amber-700" />
                        <span>Tích hợp Giáo dục Quốc phòng và An ninh (ANQP):</span>
                      </div>
                      {guide.qpanTopicTitle && (
                        <p className="text-xs font-semibold text-amber-900 italic">
                          {guide.qpanTopicTitle}
                        </p>
                      )}
                      <p className="text-slate-700 leading-relaxed pl-1">
                        <b>• Mục tiêu:</b> {guide.qpanObjective}
                      </p>
                      {guide.qpanProcessVandun && (
                        <p className="text-slate-700 leading-relaxed pl-1 pt-1 border-t border-amber-200/60 mt-1">
                          <b>• Hướng dẫn vận dụng thực tiễn:</b> {guide.qpanProcessVandun}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="italic">
                Nội dung lồng ghép dựa vào tài liệu hướng dẫn đính kèm, không tự đưa vào.
              </span>
              <button
                onClick={() => setIsIntegrationModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
