/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Music Textbook Library: Thư Viện Sách Giáo Khoa & Học Liệu Âm Nhạc THCS (Lớp 6, 7, 8, 9)
 * Tích hợp Soạn KHBD 5512 tức thì, Máy đếm nhịp phách (Metronome) & Bàn phím phát âm thanh luyện thanh
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MusicTextbookBook, 
  MusicTextbookLesson, 
  MusicGrade, 
  MusicBookSeries, 
  MusicDiscipline, 
  TeacherProfile,
  LessonPlan5512
} from '../types/eduharness';
import { musicTextbookLibraryData } from '../data/musicTextbooksData';
import { 
  Music, 
  BookOpen, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  Sliders, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Upload, 
  Disc, 
  Award,
  Layers,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { exportKhbdToWord } from '../utils/exportUtils';
import {
  musicInstrumentsBanner,
  vietnameseInstrumentsShowcase,
  musicComposersGallery,
} from '../assets/images';

interface MusicTextbookLibraryProps {
  profile: TeacherProfile;
  onApplyLessonToKhbd: (lesson: MusicTextbookLesson) => void;
  onApplyLessonToSlide?: (lesson: MusicTextbookLesson) => void;
  onApplyLessonToExam?: (lesson: MusicTextbookLesson) => void;
}

export const MusicTextbookLibrary: React.FC<MusicTextbookLibraryProps> = ({
  profile,
  onApplyLessonToKhbd,
  onApplyLessonToSlide,
  onApplyLessonToExam,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('Tất cả');
  const [selectedSemester, setSelectedSemester] = useState<string>('Tất cả');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewLesson, setPreviewLesson] = useState<MusicTextbookLesson | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Metronome State (Web Audio API)
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);
  const [tempoBpm, setTempoBpm] = useState<number>(90);
  const [timeSignature, setTimeSignature] = useState<'2/4' | '3/4' | '4/4'>('2/4');
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Play audio frequency beep via Web Audio API
  const playBeep = (freq: number, duration: number = 0.08) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or running without user gesture
    }
  };

  // Metronome tick logic
  useEffect(() => {
    if (isMetronomeActive) {
      const beatsPerBar = timeSignature === '2/4' ? 2 : timeSignature === '3/4' ? 3 : 4;
      const intervalMs = (60 / tempoBpm) * 1000;

      let beatCount = 0;
      metronomeIntervalRef.current = setInterval(() => {
        const beatInBar = beatCount % beatsPerBar;
        setCurrentBeat(beatInBar);
        if (beatInBar === 0) {
          playBeep(880, 0.1);
        } else {
          playBeep(440, 0.06);
        }
        beatCount++;
      }, intervalMs);
    } else {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
      setCurrentBeat(0);
    }

    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, [isMetronomeActive, tempoBpm, timeSignature]);

  const pitchNotes = [
    { name: 'Đô (C)', freq: 261.63 },
    { name: 'Rê (D)', freq: 293.66 },
    { name: 'Mi (E)', freq: 329.63 },
    { name: 'Fa (F)', freq: 349.23 },
    { name: 'Son (G)', freq: 392.00 },
    { name: 'La (A)', freq: 440.00 },
    { name: 'Si (B)', freq: 493.88 },
    { name: 'Đô (C5)', freq: 523.25 },
  ];

  // Flatten and filter all lessons across all books
  const allLessons: MusicTextbookLesson[] = musicTextbookLibraryData.flatMap((b) => b.lessons);

  const filteredLessons = allLessons.filter((l) => {
    const matchGrade = selectedGrade === 'Tất cả' || l.grade === selectedGrade;
    const matchSemester = selectedSemester === 'Tất cả' || l.semester === selectedSemester;
    const matchDiscipline =
      selectedDiscipline === 'Tất cả' || l.disciplines.includes(selectedDiscipline as MusicDiscipline);
    const matchSearch =
      searchQuery === '' ||
      l.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.lessonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.songOrRepertoire && l.songOrRepertoire.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchGrade && matchSemester && matchDiscipline && matchSearch;
  });

  const handleApply = (lesson: MusicTextbookLesson) => {
    onApplyLessonToKhbd(lesson);
    showToast(`Đã áp dụng ${lesson.topicTitle} vào Kế hoạch bài dạy (KHBD 5512)!`);
  };

  const handleApplySlide = (lesson: MusicTextbookLesson) => {
    if (onApplyLessonToSlide) {
      onApplyLessonToSlide(lesson);
    } else {
      onApplyLessonToKhbd(lesson);
    }
    showToast(`Đã nạp ${lesson.topicTitle} và chuyển sang Slide Trình Chiếu 16:9!`);
  };

  const handleApplyExam = (lesson: MusicTextbookLesson) => {
    if (onApplyLessonToExam) {
      onApplyLessonToExam(lesson);
    } else {
      onApplyLessonToKhbd(lesson);
    }
    showToast(`Đã nạp ${lesson.topicTitle} và mở Đề Kiểm Tra & Ma Trận 7991!`);
  };

  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto bg-slate-100 p-6 space-y-6 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Banner: Thư Viện SGK Âm Nhạc THCS - Bộ Sách Duy Nhất: Kết Nối Tri Thức */}
        <div className="rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden text-white border border-slate-700/50">
          {/* Background Instrument Artwork with Cinematic Gradient Overlay */}
          <img 
            src={musicInstrumentsBanner} 
            alt="Nhạc cụ âm nhạc" 
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-indigo-950/80 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-20 text-8xl text-white/5 font-serif select-none pointer-events-none">
            𝄞
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  <Music className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-amber-300">
                  Bộ sách chuẩn duy nhất: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG · NXB GIÁO DỤC VIỆT NAM
                </span>
              </div>
              <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Kho Sách Giáo Khoa Âm Nhạc THCS (32 Chủ Đề Khối 6, 7, 8, 9)
              </h1>
              <p className="text-xs md:text-sm text-slate-200 max-w-2xl leading-relaxed">
                Chuẩn hóa dành riêng cho giáo viên môn Âm Nhạc — Cô <b>{profile.name}</b> (<b>{profile.school}</b>). Tích hợp đầy đủ hình ảnh học liệu trực quan, nhạc cụ truyền thống & hiện đại, chân dung danh nhân âm nhạc phục vụ soạn giảng KHBD 5512 và Slide 16:9.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 text-center shadow-sm">
                <span className="block text-2xl font-bold font-mono text-amber-300">32</span>
                <span className="text-[11px] text-slate-200">Chủ đề chuẩn hóa</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 text-center shadow-sm">
                <span className="block text-2xl font-bold font-mono text-emerald-300">4 Khối</span>
                <span className="text-[11px] text-slate-200">Lớp 6, 7, 8, 9</span>
              </div>
            </div>
          </div>
        </div>

        {/* Music Teacher Interactive Studio Tools (Máy Đếm Nhịp Phách & Lấy Giọng) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Tool 1: Metronome / Máy gõ phách tương tác */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  ⏱
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    Máy Gõ Phách & Giữ Nhịp Âm Nhạc (Metronome)
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Hỗ trợ giáo viên dạy hát, đọc nhạc và gõ đệm chuẩn phách
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsMetronomeActive(!isMetronomeActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                  isMetronomeActive 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isMetronomeActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isMetronomeActive ? 'Dừng Nhịp' : 'Bật Gõ Nhịp'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 text-xs">
              {/* Meter selector */}
              <div>
                <span className="text-slate-500 text-[11px] block mb-1">Loại nhịp:</span>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                  {(['2/4', '3/4', '4/4'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setTimeSignature(m)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                        timeSignature === m
                          ? 'bg-white text-indigo-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tempo Slider */}
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="text-slate-500">Tốc độ (Tempo):</span>
                  <span className="font-mono font-bold text-indigo-700">{tempoBpm} BPM</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  step="2"
                  value={tempoBpm}
                  onChange={(e) => setTempoBpm(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Visual Beat Indicator Dots */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {Array.from({ length: timeSignature === '2/4' ? 2 : timeSignature === '3/4' ? 3 : 4 }).map((_, idx) => {
                const isCurrent = isMetronomeActive && currentBeat === idx;
                const isStrongBeat = idx === 0;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      isCurrent ? 'scale-115' : 'opacity-70'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                        isCurrent
                          ? isStrongBeat
                            ? 'bg-rose-500 text-white shadow-md ring-4 ring-rose-200'
                            : 'bg-indigo-500 text-white shadow-md ring-4 ring-indigo-200'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {isStrongBeat ? 'Mạnh' : 'Nhẹ'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tool 2: Âm chuẩn lấy giọng luyện thanh (Pitch Pipe) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  🎹
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    Phím Âm Chuẩn Lấy Giọng & Luyện Thanh
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Phát âm thanh cao độ chuẩn (Đô - Rê - Mi - Fa - Son - La - Si)
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                A4 = 440 Hz
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Nhấp vào phím nốt bên dưới để phát âm thanh chuẩn giúp học sinh lấy giọng trước khi hát hoặc đọc nhạc:
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
              {pitchNotes.map((note) => (
                <button
                  key={note.name}
                  onClick={() => playBeep(note.freq, 0.4)}
                  className="p-2 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-center transition-all active:scale-95 group"
                  title={`Phát âm thanh nốt ${note.name} (${note.freq} Hz)`}
                >
                  <span className="text-[11px] font-bold text-slate-800 group-hover:text-emerald-700 block leading-tight">
                    {note.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 group-hover:text-emerald-600">
                    {note.name.split(' ')[1] || ''}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>
                Mẹo sư phạm: Dùng nốt <b>Đô (C)</b> và <b>Son (G)</b> để làm mẫu âm Ma - Me - Mi khi khởi động giọng cho học sinh.
              </span>
            </div>
          </div>

        </div>

        {/* Visual Pedagogical Gallery: Nhạc Cụ & Chân Dung Nhạc Sĩ SGK Kết Nối Tri Thức */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Nhạc cụ Dân tộc & Học đường */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group hover:border-indigo-300 transition-all">
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img 
                src={vietnameseInstrumentsShowcase} 
                alt="Nhạc cụ dân tộc và học đường" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-emerald-500/90 text-white uppercase tracking-wider shadow-xs">
                  Học liệu trực quan
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-sm font-bold flex items-center gap-1.5 text-white">
                  <span>🎻 Nhạc Cụ Dân Tộc & Nhạc Cụ Học Đường</span>
                </h3>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  Đàn tranh, Sáo trúc, Đàn bầu, Kèn phím Melodica, Recorder Soprano & Thanh phách
                </p>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
              <p className="text-slate-600 leading-relaxed">
                Tư liệu trực quan phục vụ các phân môn <b>Nhạc cụ gõ</b>, <b>Kèn phím Melodica</b> và <b>Sáo Recorder</b> xuyên suốt 4 khối lớp 6–9. Giúp học sinh nhận biết hình dáng, âm sắc đặc trưng và thực hành hòa tấu chính xác.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Đàn tranh 16 dây</span>
                  <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Melodica 32 phím</span>
                  <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Recorder Hệ C</span>
                </div>
                <button
                  onClick={() => setSelectedDiscipline('Nhạc cụ')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Lọc bài học nhạc cụ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Chân dung Danh nhân & Nhạc sĩ */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group hover:border-indigo-300 transition-all">
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img 
                src={musicComposersGallery} 
                alt="Chân dung nhạc sĩ trong SGK" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-amber-500/90 text-white uppercase tracking-wider shadow-xs">
                  Thường thức âm nhạc
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-sm font-bold flex items-center gap-1.5 text-white">
                  <span>🎼 Chân Dung Nhạc Sĩ & Danh Nhân Tiêu Biểu</span>
                </h3>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  Nhạc sĩ Văn Cao, Trịnh Công Sơn, W.A. Mozart & L.V. Beethoven
                </p>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
              <p className="text-slate-600 leading-relaxed">
                Tư liệu hình ảnh thẩm mỹ dành cho các tiết <b>Thường thức âm nhạc</b> và <b>Nghe nhạc</b>. Giúp học sinh khám phá cuộc đời, phong cách nghệ thuật và các kiệt tác của các tác giả kinh điển trong SGK.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Văn Cao (Lớp 7)</span>
                  <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Mozart (Lớp 8)</span>
                  <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Beethoven (Lớp 9)</span>
                </div>
                <button
                  onClick={() => setSelectedDiscipline('Thường thức âm nhạc')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Lọc bài học thường thức</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài hát, tên bài học (vd: Lí cây đa, Mùa khai trường, Mozart...)..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-hidden bg-slate-50 focus:bg-white transition-all"
              />
            </div>

            {/* Quick Stats */}
            <div className="text-xs text-slate-500 font-mono flex items-center gap-3">
              <span>Đang hiển thị: <b className="text-indigo-700">{filteredLessons.length}</b> bài học SGK</span>
              <span>·</span>
              <button
                onClick={() => {
                  setSelectedGrade('Tất cả');
                  setSelectedSemester('Tất cả');
                  setSelectedDiscipline('Tất cả');
                  setSearchQuery('');
                }}
                className="text-indigo-600 hover:text-indigo-800 underline text-xs"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>

          {/* Filters pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100 text-xs">
            {/* Grade Filter */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Khối lớp (SGK Kết nối tri thức):</span>
              <div className="flex items-center gap-1 flex-wrap">
                {['Tất cả', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                      selectedGrade === g
                        ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {g === 'Tất cả' ? 'Tất cả (32 CĐ)' : `${g} (8 CĐ)`}
                  </button>
                ))}
              </div>
            </div>

            {/* Semester Filter */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Học kỳ:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {['Tất cả', 'Học kỳ I', 'Học kỳ II'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSemester(s)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                      selectedSemester === s
                        ? 'bg-blue-600 text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s === 'Học kỳ I' ? 'Học kỳ I (CĐ 1-4)' : s === 'Học kỳ II' ? 'Học kỳ II (CĐ 5-8)' : 'Cả năm'}
                  </button>
                ))}
              </div>
            </div>

            {/* Discipline Filter */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Phân môn đặc thù:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {['Tất cả', 'Hát', 'Đọc nhạc', 'Nhạc cụ', 'Lí thuyết âm nhạc', 'Thường thức âm nhạc'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDiscipline(d)}
                    className={`px-2 py-1 rounded-lg text-[11px] transition-colors ${
                      selectedDiscipline === d
                        ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid (Danh mục 32 Chủ Đề SGK Âm Nhạc Kết Nối Tri Thức) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map((lesson) => {
            return (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Header Card with Book Styling */}
                <div className="p-5 pb-4 border-b border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200">
                      {lesson.grade} · {lesson.semester}
                    </span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                      Chủ đề {lesson.topicNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                      {lesson.topicTitle}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug group-hover:text-indigo-700 transition-colors">
                      {lesson.lessonName}
                    </h3>
                  </div>

                  {/* Repertoire / Song / Meter info */}
                  {lesson.songOrRepertoire && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <Music className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{lesson.songOrRepertoire}</span>
                      </div>
                      {lesson.musicalKeyOrMeter && (
                        <div className="text-[11px] text-slate-500 font-mono">
                          {lesson.musicalKeyOrMeter}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Disciplines Badges */}
                  <div className="flex items-center gap-1 flex-wrap pt-1">
                    {lesson.disciplines.map((d) => (
                      <span
                        key={d}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100"
                      >
                        {d}
                      </span>
                    ))}
                    <span className="text-[10px] text-slate-400 font-mono ml-auto">
                      {lesson.durationPeriods} tiết
                    </span>
                  </div>
                </div>

                {/* Key Learning Outcomes Preview */}
                <div className="p-5 pt-3 flex-1 space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Yêu cầu cần đạt chuẩn CTGDPT 2018:
                    </span>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {lesson.learningOutcomes.slice(0, 2).map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                          <Check className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Thiết bị & Học liệu âm nhạc:
                    </span>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {lesson.equipmentRecommended.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-1.5">
                  <button
                    onClick={() => setPreviewLesson(lesson)}
                    className="w-full sm:w-auto py-1.5 px-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center shadow-2xs"
                  >
                    Chi Tiết
                  </button>

                  <button
                    onClick={() => handleApply(lesson)}
                    className="flex-1 w-full py-1.5 px-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors text-center shadow-xs flex items-center justify-center gap-1 group/btn"
                    title="Nạp ngay giáo án chuẩn 5512 của bài học này vào bộ soạn"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover/btn:scale-110 transition-transform" />
                    <span>Soạn KHBD</span>
                  </button>

                  <button
                    onClick={() => handleApplySlide(lesson)}
                    className="w-full sm:w-auto py-1.5 px-2.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors text-center shadow-2xs flex items-center justify-center gap-1"
                    title="Chuyển đổi bài học sang Slide trình chiếu 16:9"
                  >
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Slide 16:9</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal: Xem chi tiết bài học SGK & Kế hoạch bài dạy 5512 */}
      {previewLesson && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-300">
                  <span>{previewLesson.grade}</span>
                  <span>·</span>
                  <span>{previewLesson.bookSeries}</span>
                </div>
                <h2 className="text-base font-bold text-white mt-1">
                  {previewLesson.lessonName}
                </h2>
              </div>

              <button
                onClick={() => setPreviewLesson(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
              
              {/* Song details */}
              {previewLesson.songOrRepertoire && (
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-blue-900 uppercase">Tác phẩm / Bài hát:</span>
                    <h4 className="text-sm font-bold text-blue-950 mt-0.5">{previewLesson.songOrRepertoire}</h4>
                  </div>
                  {previewLesson.musicalKeyOrMeter && (
                    <span className="font-mono text-xs text-blue-800 bg-white px-3 py-1 rounded-lg border border-blue-200 font-semibold">
                      {previewLesson.musicalKeyOrMeter}
                    </span>
                  )}
                </div>
              )}

              {/* Yêu cầu cần đạt */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">1. Mục tiêu & Yêu cầu cần đạt (Công văn 5512)</h4>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  {previewLesson.learningOutcomes.map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>

              {/* Thiết bị dạy học */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">2. Thiết bị dạy học và học liệu âm nhạc</h4>
                <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                  {previewLesson.equipmentRecommended.map((eq, idx) => (
                    <li key={idx}>{eq}</li>
                  ))}
                </ul>
              </div>

              {/* Tiến trình 4 hoạt động */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">3. Tiến trình 4 hoạt động dạy học chuẩn 5512</h4>
                <div className="space-y-3">
                  {previewLesson.khbdPreset.activities.map((act, aIdx) => (
                    <div key={act.id} className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                      <div className="font-bold text-blue-900 mb-1">
                        {act.title} (~{act.timeMinutes} phút)
                      </div>
                      <div className="space-y-1 text-slate-600 pl-2">
                        <p><b>Mục tiêu:</b> {act.objective}</p>
                        <p><b>Nội dung:</b> {act.content}</p>
                        <p><b>Sản phẩm:</b> {act.product}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2.5">
              <button
                onClick={() => exportKhbdToWord(previewLesson.khbdPreset, profile)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Word (.doc)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleApplySlide(previewLesson);
                    setPreviewLesson(null);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors shadow-2xs"
                >
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Trình Chiếu Slide 16:9</span>
                </button>

                <button
                  onClick={() => {
                    handleApply(previewLesson);
                    setPreviewLesson(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Nạp Vào Soạn KHBD 5512</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
