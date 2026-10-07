/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * EduHarness 5512 & 7991 Domain Types
 */

export interface TeacherProfile {
  name: string;
  subject: string;
  department: string;
  school: string;
  academicYear: string;
  showTeacherOnExam?: boolean;
}

export const defaultTeacherProfile: TeacherProfile = {
  name: "Nguyễn Thị Duyên Thanh",
  subject: "Âm Nhạc",
  department: "Thể dục - Nghệ thuật",
  school: "Trường THCS Long Hồ",
  academicYear: "2026–2027",
  showTeacherOnExam: true,
};

export interface LessonObjective {
  knowledge: string[];
  competencies: {
    general: string[];   // Tự chủ & tự học, Giao tiếp & hợp tác, Giải quyết vấn đề & sáng tạo
    subject: string[];   // Năng lực đặc thù môn học
    nlsAi?: string[];    // Lồng ghép Năng lực số (NLS) & Trí tuệ nhân tạo (AI) theo hướng dẫn đính kèm
  };
  qualities: string[];   // Yêu nước, Nhân ái, Chăm chỉ, Trung thực, Trách nhiệm
  qpanIntegration?: string[]; // Tích hợp Giáo dục Quốc phòng và An ninh (ANQP) theo Phụ lục hướng dẫn
}

export interface TeachingEquipment {
  teacher: string[];
  students: string[];
}

export interface ActivityStep {
  stepName: string;      // 1. Chuyển giao nhiệm vụ / 2. Thực hiện nhiệm vụ / 3. Báo cáo, thảo luận / 4. Kết luận, nhận định
  teacherAction: string;
  studentAction: string;
}

export interface ActivityMedia {
  type: 'sheet_music' | 'sight_reading' | 'instrument' | 'composer' | 'video' | 'audio' | 'custom';
  url: string;
  title: string;
  caption?: string;
  alt?: string;
}

export interface LessonActivity {
  id: string;
  code: 'HD1' | 'HD2' | 'HD3' | 'HD4';
  title: string;         // Hoạt động 1: Mở đầu / Hoạt động 2: Hình thành kiến thức / ...
  timeMinutes: number;
  objective: string;     // a) Mục tiêu
  content: string;       // b) Nội dung
  product: string;       // c) Sản phẩm
  steps: ActivityStep[]; // d) Tổ chức thực hiện (4 bước)
  media?: ActivityMedia; // Học liệu trực quan minh họa
  nlsAiNote?: string;    // Lồng ghép NLS - AI theo hướng dẫn đính kèm
  qpanNote?: string;     // Tích hợp GDQP&AN theo Phụ lục hướng dẫn đính kèm
}

export interface LessonVisualAids {
  songSheet?: { title: string; url: string; meter: string; note: string };
  sightReadingSheet?: { title: string; url: string; tonality: string; note: string };
  instrumentGuide?: { title: string; url: string; list: string[] };
  composerPortrait?: { title: string; url: string; author: string; bio: string };
  videoDoc?: { title: string; url: string; source: string; duration: string };
}

export interface LessonPlan5512 {
  schoolName: string;
  department: string;
  teacherName: string;
  subject: string;
  grade: string;
  lessonTitle: string;
  durationPeriods: number; // Số tiết
  semester: 'Học kỳ I' | 'Học kỳ II';
  academicYear: string;
  objectives: LessonObjective;
  equipment: TeachingEquipment;
  activities: LessonActivity[];
  visualAids?: LessonVisualAids;
  // Bổ sung Lồng ghép NLS-AI và Tích hợp ANQP dựa theo tài liệu hướng dẫn đính kèm
  nlsAiObjective?: string;
  nlsAiProcessStep?: {
    activityCode: 'HD1' | 'HD2' | 'HD3' | 'HD4';
    activityTitle: string;
    stepName: string;
    teacherAction: string;
    studentAction: string;
  };
  qpanTopicTitle?: string;
  qpanObjective?: string;
  qpanProcessVandun?: string;
}

export interface KnowledgeCard {
  title: string;
  desc: string;
  badge?: string;
  type?: 'objective' | 'task' | 'product' | 'step' | 'note' | 'concept';
}

// Slide presentation model
export interface SlideItem {
  id: string;
  slideNumber: number;
  title: string;
  subtitle?: string;
  category: 'intro' | 'objective' | 'activity1' | 'activity2' | 'activity3' | 'activity4' | 'summary';
  bullets: string[];
  cards?: KnowledgeCard[];
  highlightQuote?: string;
  teacherNotes: string;
  estimatedMinutes: number;
  keyVisualIcon?: string;
  media?: {
    type: 'audio' | 'video' | 'sheet_music' | 'sight_reading' | 'composer' | 'instrument' | 'interactive_melody';
    url?: string;
    title?: string;
    caption?: string;
    audioNotes?: { note: string; freq: number; duration: number }[];
    videoEmbedUrl?: string;
  };
}

// CV 7991/BGDĐT-GDTrH Data Models
export type CognitiveLevel = 'know' | 'understand' | 'apply'; // Nhận biết (40%), Thông hiểu (30%), Vận dụng (30%)

export interface MatrixRow {
  id: string;
  topic: string;             // Chủ đề / Chương
  subTopic: string;          // Nội dung / đơn vị kiến thức
  part1_mcq: { know: number; understand: number; apply: number };       // TN nhiều lựa chọn (số câu)
  part2_trueFalse: { know: number; understand: number; apply: number }; // TN Đúng - Sai (số câu 4 lệnh)
  part3_shortAns: { know: number; understand: number; apply: number };  // TN Trả lời ngắn (số câu)
  part4_essay: { know: number; understand: number; apply: number };     // Tự luận (số câu)
  scoreAllocation: number;   // Điểm số phân bổ
}

export interface SpecificationRow {
  id: string;
  topic: string;
  subTopic: string;
  learningOutcomes: {
    know: string[];
    understand: string[];
    apply: string[];
  };
  part1Count: { know: number; understand: number; apply: number };
  part2Count: { know: number; understand: number; apply: number };
  part3Count: { know: number; understand: number; apply: number };
  part4Count: { know: number; understand: number; apply: number };
  competencyCode: string; // ví dụ: NL1, NL2, GQVĐ...
}

// Part I: MCQ 4 choices
export interface ExamPart1Question {
  id: string;
  number: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  cognitiveLevel: CognitiveLevel;
  explanation: string;
  point: number; // thường 0.25đ
}

// Part II: True/False with 4 commands a-b-c-d (Mỗi câu gồm 4 ý)
export interface TrueFalseStatement {
  subId: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ExamPart2Question {
  id: string;
  number: number;
  contextPrompt: string; // Tình huống / Đề dẫn
  statements: TrueFalseStatement[];
  cognitiveLevel: CognitiveLevel;
  point: number; // 1.0đ per question (Quy chế BGD: đúng 1 ý 0.1đ, 2 ý 0.25đ, 3 ý 0.5đ, 4 ý 1.0đ)
}

// Part III: Short Answer
export interface ExamPart3Question {
  id: string;
  number: number;
  question: string;
  correctAnswer: string;
  cognitiveLevel: CognitiveLevel;
  explanation: string;
  point: number; // ví dụ 0.5đ / câu
}

// Part IV: Essay
export interface EssayRubricItem {
  criterion: string;
  maxScore: number;
}

export interface ExamPart4Question {
  id: string;
  number: number;
  question: string;
  cognitiveLevel: CognitiveLevel;
  maxScore: number;
  sampleAnswer: string;
  rubrics: EssayRubricItem[];
}

export interface Exam7991 {
  title: string;
  examType: 'Kiểm tra giữa học kỳ' | 'Kiểm tra cuối học kỳ' | 'Đánh giá định kỳ';
  subject: string;
  grade: string;
  timeAllowedMinutes: number; // Thường 45 phút, 60 phút hoặc 90 phút
  examCode: string;
  matrix: MatrixRow[];
  specifications: SpecificationRow[];
  part1_mcq: ExamPart1Question[];         // 3.0 điểm (30%)
  part2_trueFalse: ExamPart2Question[];   // 2.0 điểm (20%)
  part3_shortAns: ExamPart3Question[];    // 2.0 điểm (20%)
  part4_essay: ExamPart4Question[];       // 3.0 điểm (30%)
  totalScore: number;                     // Luôn luôn 10.0 điểm
}

export type MusicGrade = 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9';
export type MusicBookSeries = 'Kết nối tri thức với cuộc sống';
export type MusicDiscipline = 'Hát' | 'Đọc nhạc' | 'Nhạc cụ' | 'Lí thuyết âm nhạc' | 'Thường thức âm nhạc' | 'Nghe nhạc';

export interface MusicTextbookLesson {
  id: string;
  topicNumber: number;
  topicTitle: string;
  lessonName: string;
  disciplines: MusicDiscipline[];
  grade: MusicGrade;
  bookSeries: MusicBookSeries;
  semester: 'Học kỳ I' | 'Học kỳ II';
  songOrRepertoire?: string;
  musicalKeyOrMeter?: string;
  durationPeriods: number;
  learningOutcomes: string[];
  equipmentRecommended: string[];
  khbdPreset: LessonPlan5512;
}

export interface MusicTextbookBook {
  id: string;
  grade: MusicGrade;
  bookSeries: MusicBookSeries;
  title: string;
  authors: string;
  publisher: string;
  coverGradient: string;
  topicsCount: number;
  lessons: MusicTextbookLesson[];
}

export type ActiveModule = 'music_library' | 'khbd' | 'slide' | 'exam' | 'matrix' | 'export' | 'json';

export interface ProjectState {
  version: string;
  updatedAt: string;
  teacherProfile: TeacherProfile;
  khbd: LessonPlan5512;
  slides: SlideItem[];
  exam: Exam7991;
  activeModule: ActiveModule;
}

