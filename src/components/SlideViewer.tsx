/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Slide Viewer: Phân hệ 2 - Slide Trình Chiếu Bài Giảng Tương Tác
 * Slide Deck 16:9 với các Thẻ trực quan hóa kiến thức, Chuyển đổi nhanh từ KHBD và Chế độ Toàn Màn Hình
 */

import React, { useState, useEffect } from 'react';
import { SlideItem, LessonPlan5512, TeacherProfile, KnowledgeCard } from '../types/eduharness';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Target, 
  CheckCircle, 
  Award,
  Layers,
  HelpCircle,
  Volume2,
  Presentation,
  Grid,
  List,
  CheckCircle2,
  Calendar,
  User,
  Compass,
  Music,
  Video,
  Square,
  ZoomIn,
  Radio,
  Activity,
  X,
  ExternalLink,
  FolderOpen
} from 'lucide-react';
import { convertKhbdToSlides } from '../utils/slideConverter';
import {
  musicInstrumentsBanner,
  vietnameseInstrumentsShowcase,
  musicComposersGallery,
  songSheetMusic,
  sightReadingSheet,
  composerPortrait,
  vietnamDanTranh,
  musicHeroScene,
  orchestraBand,
  musicSheetScore
} from '../assets/images';
import { musicAudioEngine, SOLFEGE_KEYS, SOLFEGE_EXERCISES, SolfegeKey } from '../utils/audioSynth';
import { MUSIC_VISUAL_CATALOG } from '../data/musicMediaCatalog';

interface SlideViewerProps {
  slides: SlideItem[];
  khbd: LessonPlan5512;
  setSlides: React.Dispatch<React.SetStateAction<SlideItem[]>>;
  profile?: TeacherProfile;
  onSyncFromKhbd?: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({ 
  slides, 
  khbd, 
  setSlides, 
  profile,
  onSyncFromKhbd 
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [theme, setTheme] = useState<'slate' | 'navy' | 'emerald' | 'chalkboard'>('slate');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cards' | 'bullets' | 'sheet_music' | 'studio'>('cards');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Multimedia Studio States
  const [activeStudioTab, setActiveStudioTab] = useState<'piano' | 'solfege' | 'metronome' | 'video'>('piano');
  const [activeSlideLightbox, setActiveSlideLightbox] = useState<{
    url: string;
    title: string;
    caption?: string;
    badge?: string;
  } | null>(null);

  // Piano state
  const [activePianoNote, setActivePianoNote] = useState<string | null>(null);

  // Solfege Player state
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [activePlayingNoteIndex, setActivePlayingNoteIndex] = useState<number>(-1);
  const [isPlayingExercise, setIsPlayingExercise] = useState<boolean>(false);

  // Metronome state
  const [metronomeBpm, setMetronomeBpm] = useState<number>(80);
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);
  const [metronomeBeat, setMetronomeBeat] = useState<number>(1);

  // Video state
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0');
  const [videoInputText, setVideoInputText] = useState<string>('');

  const schoolName = profile?.school || khbd.schoolName;
  const teacherName = profile?.name || khbd.teacherName;
  const subject = profile?.subject || khbd.subject;
  const academicYear = profile?.academicYear || khbd.academicYear;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metronome Runner
  useEffect(() => {
    let metronomeInterval: NodeJS.Timeout | null = null;
    let beatCounter = 0;
    if (isMetronomeActive) {
      const intervalMs = (60 / metronomeBpm) * 1000;
      metronomeInterval = setInterval(() => {
        beatCounter = (beatCounter % 4) + 1;
        setMetronomeBeat(beatCounter);
        musicAudioEngine.playClick(beatCounter === 1);
      }, intervalMs);
    } else {
      setMetronomeBeat(1);
    }
    return () => {
      if (metronomeInterval) clearInterval(metronomeInterval);
    };
  }, [isMetronomeActive, metronomeBpm]);

  // Classroom Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(180); // Default 3 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'f' || e.key === 'F') {
        // Toggle fullscreen shortcut if not typing in input
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          handleToggleFullscreen();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const currentSlide = slides[currentSlideIndex] || slides[0] || {
    id: 'empty',
    slideNumber: 1,
    title: khbd.lessonTitle || 'Slide bài giảng',
    subtitle: `${subject} ${khbd.grade}`,
    category: 'intro',
    bullets: ['Mục tiêu bài học', 'Nội dung cốt lõi'],
    teacherNotes: 'Ghi chú bài dạy',
    estimatedMinutes: 5,
  };

  // Quick convert action
  const handleQuickConvert = () => {
    if (onSyncFromKhbd) {
      onSyncFromKhbd();
    } else {
      const generated = convertKhbdToSlides(khbd);
      setSlides(generated);
      setCurrentSlideIndex(0);
      showToast('Đã chuyển đổi thành công 4 hoạt động của KHBD thành Slide Deck 16:9!');
    }
  };

  // Format timer
  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Theme styling classes
  const themeStyles = {
    slate: {
      bg: 'bg-slate-900',
      text: 'text-white',
      accent: 'text-blue-400',
      bulletIcon: 'text-blue-500',
      border: 'border-slate-800',
      card: 'bg-slate-800/80 border-slate-700 hover:border-blue-500/50',
      cardBadge: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
    },
    navy: {
      bg: 'bg-sky-950',
      text: 'text-white',
      accent: 'text-amber-300',
      bulletIcon: 'text-amber-400',
      border: 'border-sky-900',
      card: 'bg-sky-900/80 border-sky-800 hover:border-amber-400/50',
      cardBadge: 'bg-amber-900/60 text-amber-200 border-amber-700/50',
    },
    emerald: {
      bg: 'bg-emerald-950',
      text: 'text-white',
      accent: 'text-emerald-300',
      bulletIcon: 'text-emerald-400',
      border: 'border-emerald-900',
      card: 'bg-emerald-900/80 border-emerald-800 hover:border-emerald-400/50',
      cardBadge: 'bg-emerald-800/60 text-emerald-200 border-emerald-600/50',
    },
    chalkboard: {
      bg: 'bg-[#152a22]',
      text: 'text-[#e9f5ee]',
      accent: 'text-amber-200',
      bulletIcon: 'text-lime-300',
      border: 'border-[#234438]',
      card: 'bg-[#1b362c]/90 border-[#295243] hover:border-lime-400/50',
      cardBadge: 'bg-[#295243] text-lime-200 border-lime-600/40',
    },
  }[theme];

  // Piano Play Handler
  const handlePlayPianoKey = (key: SolfegeKey) => {
    setActivePianoNote(key.note);
    musicAudioEngine.playNote(key.freq, 0.7, 'piano');
    setTimeout(() => {
      setActivePianoNote((prev) => (prev === key.note ? null : prev));
    }, 280);
  };

  // Solfege Exercise Play Handler
  const handlePlayExercise = (exIndex: number) => {
    if (isPlayingExercise) {
      musicAudioEngine.stopMelody();
      setIsPlayingExercise(false);
      setActivePlayingNoteIndex(-1);
      return;
    }

    const ex = SOLFEGE_EXERCISES[exIndex];
    if (!ex) return;

    setActiveExerciseIndex(exIndex);
    setIsPlayingExercise(true);
    showToast(`Đang xướng âm: ${ex.title}`);

    musicAudioEngine.playMelody(
      ex.notes,
      (noteIdx) => {
        setActivePlayingNoteIndex(noteIdx);
      },
      () => {
        setIsPlayingExercise(false);
        setActivePlayingNoteIndex(-1);
      }
    );
  };

  const handleStopExercise = () => {
    musicAudioEngine.stopMelody();
    setIsPlayingExercise(false);
    setActivePlayingNoteIndex(-1);
  };

  const handleApplyCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInputText.trim()) return;
    let url = videoInputText.trim();
    if (url.includes('youtube.com/watch?v=')) {
      const vidId = url.split('v=')[1]?.split('&')[0];
      url = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
    } else if (url.includes('youtu.be/')) {
      const vidId = url.split('youtu.be/')[1]?.split('?')[0];
      url = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
    }
    setCustomVideoUrl(url);
    setVideoInputText('');
    showToast('Đã cập nhật video bài giảng!');
  };

  const handleToggleFullscreen = () => {
    const elem = document.getElementById('slide-presentation-container');
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Derive cards from slide data if not explicitly present
  const displayCards: KnowledgeCard[] = currentSlide.cards && currentSlide.cards.length > 0
    ? currentSlide.cards
    : currentSlide.bullets.map((b, idx) => {
        const parts = b.split(':');
        const title = parts.length > 1 ? parts[0].trim() : `Điểm cốt lõi ${idx + 1}`;
        const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : b;
        return {
          title,
          desc,
          badge: `Thẻ ${idx + 1}`,
          type: 'concept'
        };
      });

  // Check if current slide should display musical illustration (instruments or composers or sheet music)
  const getSlideIllustration = () => {
    // 1. If slide explicitly has media attached, use it
    if (currentSlide.media?.url) {
      return {
        src: currentSlide.media.url,
        alt: currentSlide.media.title || 'Học liệu slide',
        title: currentSlide.media.title || 'Học liệu trực quan bài dạy',
        desc: currentSlide.media.caption || 'Bộ sách Kết nối tri thức với cuộc sống'
      };
    }

    // 2. Otherwise detect text keywords
    const textToCheck = `${currentSlide.title} ${currentSlide.subtitle || ''} ${currentSlide.bullets.join(' ')}`.toLowerCase();
    if (textToCheck.includes('mozart') || textToCheck.includes('beethoven') || textToCheck.includes('văn cao') || textToCheck.includes('trịnh công sơn') || textToCheck.includes('nhạc sĩ') || textToCheck.includes('thường thức')) {
      return {
        src: composerPortrait || musicComposersGallery,
        alt: 'Chân dung nhạc sĩ trong SGK',
        title: 'Chân dung Nhạc sĩ & Danh nhân Âm nhạc',
        desc: 'Văn Cao, Trịnh Công Sơn, Mozart, Beethoven (SGK Kết nối tri thức)'
      };
    }
    if (textToCheck.includes('đọc nhạc') || textToCheck.includes('solfège') || textToCheck.includes('tập đọc')) {
      return {
        src: sightReadingSheet,
        alt: 'Bản phổ tập đọc nhạc',
        title: 'Bản phổ Bài tập đọc nhạc (Solfège)',
        desc: 'Khuông nhạc, cao độ, trường độ và gõ phách chuẩn SGK'
      };
    }
    if (textToCheck.includes('hát') || textToCheck.includes('bài hát') || textToCheck.includes('giai điệu')) {
      return {
        src: songSheetMusic,
        alt: 'Bản nhạc bài hát SGK',
        title: `Bản nhạc chính thức bài "${khbd.lessonTitle}"`,
        desc: 'Nốt nhạc, lời ca và nhịp điệu chính thức trong SGK Âm nhạc KNTT'
      };
    }
    if (textToCheck.includes('nhạc cụ') || textToCheck.includes('melodica') || textToCheck.includes('recorder') || textToCheck.includes('đàn') || textToCheck.includes('sáo') || textToCheck.includes('phách') || textToCheck.includes('gõ đệm')) {
      return {
        src: vietnamDanTranh || vietnameseInstrumentsShowcase,
        alt: 'Nhạc cụ học đường & dân tộc',
        title: 'Học liệu Trực quan: Nhạc cụ SGK',
        desc: 'Đàn tranh, Sáo trúc, Đàn bầu, Melodica, Recorder & Thanh phách'
      };
    }
    if (currentSlideIndex === 0 || currentSlide.category === 'intro') {
      return {
        src: musicHeroScene || musicInstrumentsBanner,
        alt: 'Không gian sư phạm âm nhạc',
        title: 'Bộ sách chuẩn: Kết nối tri thức với cuộc sống',
        desc: `Môn Âm Nhạc ${khbd.grade} — ${khbd.lessonTitle}`
      };
    }
    return null;
  };

  const slideIllustration = getSlideIllustration();

  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto bg-slate-100 p-6 flex flex-col relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-4 h-4 text-indigo-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto w-full space-y-5 flex-1 flex flex-col">
        
        {/* Top Controller Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm no-print">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Presentation className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Phân hệ Slide Trình Chiếu Bài Giảng 16:9
                </h2>
                <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                  Thẻ trực quan hóa
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Đồng bộ hóa trực tiếp từ 4 hoạt động KHBD 5512 · Chế độ trình chiếu Toàn Màn Hình
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Quick Convert Button */}
            <button
              onClick={handleQuickConvert}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm whitespace-nowrap group"
              title="Chuyển đổi hoặc đồng bộ lại toàn bộ slide từ KHBD hiện tại"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Chuyển Đổi Nhanh KHBD Thành Slide</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'cards' 
                    ? 'bg-white text-indigo-700 font-semibold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Hiển thị thẻ trực quan hóa kiến thức"
              >
                <Grid className="w-3 h-3" />
                <span className="hidden sm:inline">Thẻ bài học</span>
              </button>
              <button
                onClick={() => setViewMode('bullets')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'bullets' 
                    ? 'bg-white text-indigo-700 font-semibold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Hiển thị danh sách tiêu điểm"
              >
                <List className="w-3 h-3" />
                <span className="hidden sm:inline">Tiêu điểm</span>
              </button>
              <button
                onClick={() => setViewMode('sheet_music')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'sheet_music' 
                    ? 'bg-white text-indigo-700 font-semibold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Hiển thị bản nhạc và bài đọc nhạc trực quan"
              >
                <Music className="w-3 h-3 text-indigo-600" />
                <span>Bản nhạc</span>
              </button>
              <button
                onClick={() => setViewMode('studio')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'studio' 
                    ? 'bg-white text-indigo-700 font-semibold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Phòng thực hành Âm thanh, Phím đàn ảo, Metronome & Video"
              >
                <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                <span>Âm thanh & Video</span>
              </button>
            </div>

            {/* Theme selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setTheme('slate')}
                className={`px-2 py-1 rounded-md font-medium transition-colors ${
                  theme === 'slate' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hiện đại
              </button>
              <button
                onClick={() => setTheme('navy')}
                className={`px-2 py-1 rounded-md font-medium transition-colors ${
                  theme === 'navy' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đại dương
              </button>
              <button
                onClick={() => setTheme('chalkboard')}
                className={`px-2 py-1 rounded-md font-medium transition-colors ${
                  theme === 'chalkboard' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bảng xanh
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={handleToggleFullscreen}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors shadow-2xs"
              title="Phóng to toàn màn hình để chiếu giảng (Nhấn phím F hoặc nút này)"
            >
              <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Toàn màn hình</span>
            </button>
          </div>
        </div>

        {/* 16:9 Presentation Stage (With Fullscreen Handler) */}
        <div
          id="slide-presentation-container"
          className={`aspect-video w-full rounded-2xl ${themeStyles.bg} ${themeStyles.text} p-6 sm:p-10 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none border ${themeStyles.border} ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : ''
          }`}
        >
          {/* Subtle Ambient Decorative Gradient Mesh */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Fullscreen Escape Overlay Hint */}
          {isFullscreen && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-slate-300 border border-white/10 flex items-center gap-2">
              <span>Chế độ Toàn Màn Hình</span>
              <span>·</span>
              <span>Nhấn <b>ESC</b> để thoát</span>
              <button 
                onClick={handleToggleFullscreen} 
                className="ml-2 hover:text-white p-0.5"
                title="Thoát toàn màn hình"
              >
                <Minimize2 className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Slide Header */}
          <div className="flex items-center justify-between text-xs font-mono opacity-80 z-10 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider uppercase text-blue-400">
                {subject} {khbd.grade}
              </span>
              <span>·</span>
              <span className="truncate max-w-xs">{schoolName}</span>
              <span>·</span>
              <span className="text-slate-400">GV: {teacherName}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">Thời gian ước tính: ~{currentSlide.estimatedMinutes}p</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 font-bold font-mono text-[11px]">
                SLIDE {currentSlideIndex + 1} / {slides.length}
              </span>
            </div>
          </div>

          {/* Main Slide Body */}
          <div className="my-auto z-10 max-w-5xl w-full py-4 space-y-4">
            
            {/* Slide Category & Subtitle */}
            {currentSlide.subtitle && (
              <div className="flex items-center gap-2">
                <span className={`text-xs md:text-sm font-bold tracking-wider uppercase ${themeStyles.accent}`}>
                  {currentSlide.subtitle}
                </span>
              </div>
            )}

            {/* Slide Main Heading */}
            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
              {currentSlide.title}
            </h1>

            {/* Slide Visual Illustration (Instruments or Composers) */}
            {slideIllustration && viewMode !== 'sheet_music' && viewMode !== 'studio' && (
              <div className="mt-3 p-3 rounded-xl border border-white/20 bg-black/30 backdrop-blur-xs flex items-center justify-between gap-4 shadow-sm">
                <div 
                  className="flex items-center gap-3 min-w-0 cursor-pointer group"
                  onClick={() => setActiveSlideLightbox({
                    url: slideIllustration.src,
                    title: slideIllustration.title,
                    caption: slideIllustration.desc,
                    badge: 'Học liệu slide'
                  })}
                >
                  <div className="w-20 h-14 sm:w-28 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-white/25 shadow-xs relative">
                    <img 
                      src={slideIllustration.src} 
                      alt={slideIllustration.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider font-bold">
                        Tư liệu học liệu trực quan
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-white font-mono">
                        KNTT
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                      {slideIllustration.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                      {slideIllustration.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 no-print">
                  <button
                    onClick={() => setActiveSlideLightbox({
                      url: slideIllustration.src,
                      title: slideIllustration.title,
                      caption: slideIllustration.desc,
                      badge: 'Học liệu slide'
                    })}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span className="hidden sm:inline">Phóng to</span>
                  </button>
                  <button
                    onClick={() => setViewMode('studio')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Phát âm thanh</span>
                  </button>
                </div>
              </div>
            )}

            {/* CONTENT MODE 1: KNOWLEDGE VISUALIZATION CARDS (THẺ TRỰC QUAN HÓA KIẾN THỨC) */}
            {viewMode === 'cards' && (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayCards.map((card, cIdx) => (
                  <div 
                    key={cIdx}
                    className={`p-3.5 rounded-xl border ${themeStyles.card} transition-all duration-200 flex flex-col justify-between shadow-xs`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${themeStyles.cardBadge}`}>
                          {card.badge || `Mục ${cIdx + 1}`}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          #{cIdx + 1}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed opacity-90 line-clamp-3">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CONTENT MODE 2: CLASSIC BULLET POINTS */}
            {viewMode === 'bullets' && (
              <div className="mt-5 space-y-3">
                {currentSlide.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-slate-100">
                    <span className={`${themeStyles.bulletIcon} font-bold text-lg leading-none mt-0.5 shrink-0`}>
                      ▸
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CONTENT MODE 3: SHEET MUSIC & SIGHT READING (BẢN NHẠC & XƯỚNG ÂM TRỰC QUAN) */}
            {viewMode === 'sheet_music' && (
              <div className="mt-4 p-4 rounded-xl border border-white/20 bg-slate-950/70 backdrop-blur-md space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-indigo-600 text-white">
                      <Music className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-sm">
                        {currentSlide.media?.title || `Bản nhạc chính thức: "${khbd.lessonTitle}"`}
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        {currentSlide.media?.caption || 'Khuông nhạc, cao độ, trường độ và lời ca chuẩn SGK Kết nối tri thức'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayExercise(0)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isPlayingExercise
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {isPlayingExercise ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingExercise ? 'Dừng xướng âm' : 'Nghe mẫu Solfège'}</span>
                    </button>
                    <button
                      onClick={() => setActiveSlideLightbox({
                        url: currentSlide.media?.url || (slideIllustration?.src || songSheetMusic),
                        title: currentSlide.media?.title || khbd.lessonTitle,
                        caption: 'Bản phổ phóng to toàn màn hình phục vụ chiếu giảng',
                        badge: 'Bản nhạc SGK'
                      })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-white text-xs font-semibold"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Phóng to</span>
                    </button>
                  </div>
                </div>

                {/* Score image viewport */}
                <div 
                  className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden bg-slate-900 border border-white/15 flex items-center justify-center cursor-pointer group"
                  onClick={() => setActiveSlideLightbox({
                    url: currentSlide.media?.url || (slideIllustration?.src || songSheetMusic),
                    title: currentSlide.media?.title || khbd.lessonTitle,
                    caption: 'Bản phổ phóng to toàn màn hình',
                    badge: 'Bản nhạc SGK'
                  })}
                >
                  <img
                    src={currentSlide.media?.url || (slideIllustration?.src || songSheetMusic)}
                    alt="Bản nhạc trình chiếu"
                    className="max-h-full w-auto object-contain group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1.5">
                    <ZoomIn className="w-4 h-4" />
                    <span>Nhấp để phóng to toàn màn hình</span>
                  </div>
                </div>

                {/* Quick Pitch Testing Keys under sheet */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] font-mono text-slate-400">
                    Thử cao độ thang âm:
                  </span>
                  <div className="flex items-center gap-1">
                    {SOLFEGE_KEYS.map((key) => (
                      <button
                        key={key.note}
                        onClick={() => handlePlayPianoKey(key)}
                        className={`px-2 py-1 rounded text-[11px] font-bold text-white transition-all transform active:scale-95 ${key.color} ${
                          activePianoNote === key.note ? 'ring-2 ring-white scale-105' : 'opacity-90 hover:opacity-100'
                        }`}
                        title={`Phát nốt ${key.vietnamese} (${key.note} - ${key.freq}Hz)`}
                      >
                        {key.vietnamese}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CONTENT MODE 4: INTERACTIVE MULTIMEDIA STUDIO (PHÒNG THỰC HÀNH ÂM THANH & VIDEO) */}
            {viewMode === 'studio' && (
              <div className="mt-4 p-4 rounded-xl border border-white/20 bg-slate-950/80 backdrop-blur-md space-y-4">
                {/* Studio Sub-tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    {[
                      { id: 'piano', label: 'Bàn phím đàn 8 nốt (Piano)', icon: Music },
                      { id: 'solfege', label: 'Xướng âm Solfège mẫu', icon: Volume2 },
                      { id: 'metronome', label: 'Máy đập nhịp Metronome', icon: Activity },
                      { id: 'video', label: 'Video bài giảng minh họa', icon: Video },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveStudioTab(tab.id as any)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                            activeStudioTab === tab.id
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-white/10 text-slate-300 hover:bg-white/20'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <span className="text-[11px] font-mono text-amber-300 hidden md:inline">
                    Web Audio Synthesis Engine · Không cần mạng
                  </span>
                </div>

                {/* Sub-tab 1: Virtual Piano Keyboard */}
                {activeStudioTab === 'piano' && (
                  <div className="space-y-3 py-1">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Bàn phím xướng âm chuẩn độ cao (C4 - C5): Bấm chuột hoặc phím 1-8</span>
                      <span className="font-mono text-[11px] text-indigo-300">
                        {activePianoNote ? `Đang phát nốt: ${activePianoNote}` : 'Sẵn sàng'}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {SOLFEGE_KEYS.map((k, idx) => (
                        <button
                          key={k.note}
                          onClick={() => handlePlayPianoKey(k)}
                          className={`p-3 rounded-xl flex flex-col items-center justify-between transition-all transform active:scale-90 border shadow-md ${k.color} ${
                            activePianoNote === k.note
                              ? 'ring-4 ring-white brightness-125 scale-105'
                              : 'border-white/20 hover:brightness-110'
                          }`}
                        >
                          <span className="text-white font-extrabold text-sm sm:text-base">
                            {k.vietnamese}
                          </span>
                          <span className="text-[10px] text-white/80 font-mono mt-1">
                            {k.note}
                          </span>
                          <span className="text-[10px] font-mono text-white/90 bg-black/30 px-1.5 py-0.2 rounded-full mt-1.5">
                            {idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-tab 2: Solfege Exercise Melody Player */}
                {activeStudioTab === 'solfege' && (
                  <div className="space-y-3 py-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {SOLFEGE_EXERCISES.map((ex, exIdx) => (
                          <button
                            key={ex.id}
                            onClick={() => {
                              if (isPlayingExercise) handleStopExercise();
                              setActiveExerciseIndex(exIdx);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                              activeExerciseIndex === exIdx
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white/10 text-slate-300 hover:bg-white/20'
                            }`}
                          >
                            {ex.title.split('(')[0].trim()}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePlayExercise(activeExerciseIndex)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            isPlayingExercise
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                          }`}
                        >
                          {isPlayingExercise ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{isPlayingExercise ? 'Dừng xướng âm' : 'Bắt đầu phát giai điệu'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-amber-300">
                          {SOLFEGE_EXERCISES[activeExerciseIndex].title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {SOLFEGE_EXERCISES[activeExerciseIndex].meter}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mb-3">
                        {SOLFEGE_EXERCISES[activeExerciseIndex].description}
                      </p>

                      {/* Visual Note Tracker */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {SOLFEGE_EXERCISES[activeExerciseIndex].notes.map((n, nIdx) => (
                          <span
                            key={nIdx}
                            className={`px-2.5 py-1 rounded-md font-bold text-xs font-mono transition-all ${
                              activePlayingNoteIndex === nIdx
                                ? 'bg-amber-400 text-slate-950 scale-110 shadow-lg ring-2 ring-white'
                                : 'bg-white/10 text-slate-200'
                            }`}
                          >
                            {n.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 3: Classroom Metronome */}
                {activeStudioTab === 'metronome' && (
                  <div className="space-y-4 py-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/40 p-4 rounded-xl border border-white/10">
                      <div>
                        <div className="text-xs text-slate-400 font-mono">Tốc độ nhịp độ (Tempo):</div>
                        <div className="text-3xl font-extrabold font-mono text-amber-300 mt-0.5">
                          {metronomeBpm} <span className="text-xs font-normal text-slate-300">BPM</span>
                        </div>
                      </div>

                      {/* Beat Visualizer Indicators */}
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map((b) => (
                          <div
                            key={b}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs font-mono transition-all ${
                              isMetronomeActive && metronomeBeat === b
                                ? b === 1
                                  ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/50'
                                  : 'bg-amber-400 text-slate-950 scale-105 shadow-md shadow-amber-400/50'
                                : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            {b}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setIsMetronomeActive(!isMetronomeActive)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm ${
                          isMetronomeActive
                            ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isMetronomeActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{isMetronomeActive ? 'Dừng Metronome' : 'Bắt đầu đập nhịp'}</span>
                      </button>
                    </div>

                    {/* Quick BPM Presets */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-400 text-[11px]">Mức nhịp độ chuẩn SGK:</span>
                      <div className="flex items-center gap-1.5">
                        {[
                          { bpm: 60, label: '60 (Lento - Chậm)' },
                          { bpm: 72, label: '72 (Andante)' },
                          { bpm: 80, label: '80 (Moderato - Vừa)' },
                          { bpm: 96, label: '96 (Nhịp 2/4)' },
                          { bpm: 120, label: '120 (Allegro - Nhanh)' },
                        ].map((p) => (
                          <button
                            key={p.bpm}
                            onClick={() => setMetronomeBpm(p.bpm)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                              metronomeBpm === p.bpm
                                ? 'bg-amber-400 text-slate-950 font-bold'
                                : 'bg-white/10 text-slate-300 hover:bg-white/20'
                            }`}
                          >
                            {p.bpm}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 4: Educational Video Player */}
                {activeStudioTab === 'video' && (
                  <div className="space-y-3 py-1">
                    <form onSubmit={handleApplyCustomVideo} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={videoInputText}
                        onChange={(e) => setVideoInputText(e.target.value)}
                        placeholder="Dán đường dẫn video YouTube bài hát / bài đọc nhạc (ví dụ: https://youtube.com/...)"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/20 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-indigo-400"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shrink-0"
                      >
                        Tải Video
                      </button>
                    </form>

                    <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-black border border-white/20 shadow-lg">
                      <iframe
                        src={customVideoUrl}
                        title="Video bài giảng âm nhạc"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Key Highlight Quote */}
            {currentSlide.highlightQuote && (
              <div className={`mt-5 p-3.5 rounded-xl border ${themeStyles.card} text-xs md:text-sm italic opacity-95 flex items-center gap-3`}>
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>"{currentSlide.highlightQuote}"</span>
              </div>
            )}
          </div>

          {/* Slide Footer Navigation & Classroom Timer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 z-10 text-xs">
            
            {/* Interactive Classroom Timer */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono font-bold text-sm tracking-wider text-amber-300">
                {formatTimer(timerSeconds)}
              </span>
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 hover:bg-white/20 rounded transition-colors text-white"
                  title={isTimerRunning ? 'Tạm dừng đếm ngược' : 'Bắt đầu đếm ngược thảo luận'}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(180);
                  }}
                  className="p-1 hover:bg-white/20 rounded transition-colors text-white"
                  title="Đặt lại (3 phút)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTimerSeconds(120)}
                  className="px-1.5 py-0.5 text-[10px] bg-white/10 hover:bg-white/20 rounded transition-colors text-slate-200"
                >
                  2p
                </button>
                <button
                  onClick={() => setTimerSeconds(300)}
                  className="px-1.5 py-0.5 text-[10px] bg-white/10 hover:bg-white/20 rounded transition-colors text-slate-200"
                >
                  5p
                </button>
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none rounded-lg text-white font-medium transition-colors"
                title="Slide trước (Phím ←)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Trước</span>
              </button>

              <div className="px-2 py-1 font-mono text-[11px] text-slate-300">
                {currentSlideIndex + 1} / {slides.length}
              </div>

              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                disabled={currentSlideIndex === slides.length - 1}
                className="flex items-center gap-1 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:pointer-events-none rounded-lg text-white font-semibold transition-colors shadow-sm"
                title="Slide tiếp theo (Phím → hoặc Phím Cách)"
              >
                <span className="hidden sm:inline">Tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 no-print">
          {slides.map((slide, idx) => (
            <button
              key={slide.id || idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                currentSlideIndex === idx
                  ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-2 ring-indigo-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                <span className={`font-bold ${currentSlideIndex === idx ? 'text-indigo-700' : ''}`}>
                  SLIDE {idx + 1}
                </span>
                <span>~{slide.estimatedMinutes}p</span>
              </div>
              <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                {slide.title}
              </div>
            </button>
          ))}
        </div>

        {/* Speaker Notes / Pedagogical Guidelines */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm no-print space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Ghi chú sư phạm giáo viên khi đứng lớp (Speaker Notes):
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Đồng bộ theo tiến trình CV 5512
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
            {currentSlide.teacherNotes || 'Quan sát học sinh, điều phối hoạt động theo đúng thời gian dự kiến.'}
          </p>
        </div>

      </div>

      {/* Slide Lightbox Modal (Phóng to học liệu trên Slide) */}
      {activeSlideLightbox && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 no-print">
          <div className="bg-slate-900 rounded-2xl max-w-5xl w-full border border-slate-700 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold">
                  {activeSlideLightbox.badge || 'Tư liệu Slide'}
                </span>
                <h3 className="font-bold text-sm sm:text-base truncate max-w-lg">
                  {activeSlideLightbox.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveSlideLightbox(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                title="Đóng xem chi tiết"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img
                src={activeSlideLightbox.url}
                alt={activeSlideLightbox.title}
                className="max-h-[68vh] w-auto object-contain rounded-lg border border-slate-800 shadow-2xl"
              />
            </div>

            <div className="p-4 bg-slate-800/90 border-t border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-300 text-xs">
              <p className="line-clamp-2 text-slate-300">
                {activeSlideLightbox.caption || 'Học liệu trực quan chiếu giảng môn Âm nhạc THCS (SGK Kết nối tri thức với cuộc sống).'}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setActiveSlideLightbox(null);
                    setViewMode('studio');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Mở phòng thực hành âm thanh</span>
                </button>
                <button
                  onClick={() => setActiveSlideLightbox(null)}
                  className="px-3.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
