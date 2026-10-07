/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Converter: Chuyển đổi nhanh KHBD (Công văn 5512) thành Slide Deck 16:9
 */

import { LessonPlan5512, SlideItem, KnowledgeCard } from '../types/eduharness';
import {
  songSheetMusic,
  sightReadingSheet,
  vietnameseInstrumentsShowcase,
  musicComposersGallery,
  composerPortrait,
  vietnamDanTranh,
  orchestraBand,
  musicHeroScene,
} from '../assets/images';

export function convertKhbdToSlides(khbd: LessonPlan5512): SlideItem[] {
  const acts = khbd.activities || [];
  const act1 = acts[0] || {
    title: 'Hoạt động 1: Mở đầu / Khởi động',
    timeMinutes: 5,
    objective: 'Tạo hứng thú, tâm thế học tập và kích hoạt kiến thức nền tảng.',
    content: 'Học sinh tham gia trò chơi hoặc trả lời câu hỏi tình huống đầu bài.',
    product: 'Câu trả lời hoặc sản phẩm cá nhân ban đầu của học sinh.',
    steps: []
  };

  const act2 = acts[1] || {
    title: 'Hoạt động 2: Hình thành kiến thức mới',
    timeMinutes: 20,
    objective: 'Học sinh lĩnh hội và chiếm lĩnh tri thức trọng tâm của bài học.',
    content: 'Đọc hiểu tài liệu, thảo luận nhóm và giải quyết nhiệm vụ học tập.',
    product: 'Bản ghi kết quả thảo luận nhóm, sơ đồ tư duy hoặc kết luận khoa học.',
    steps: []
  };

  const act3 = acts[2] || {
    title: 'Hoạt động 3: Luyện tập & Củng cố',
    timeMinutes: 12,
    objective: 'Củng cố, khắc sâu kiến thức và rèn luyện kỹ năng thực hành.',
    content: 'Hệ thống câu hỏi, bài tập thực hành theo các mức độ nhận thức.',
    product: 'Lời giải chi tiết hoặc phần trình bày bài làm của học sinh.',
    steps: []
  };

  const act4 = acts[3] || {
    title: 'Hoạt động 4: Vận dụng & Hướng dẫn về nhà',
    timeMinutes: 8,
    objective: 'Vận dụng kiến thức vào thực tiễn cuộc sống, phát triển năng lực tự học.',
    content: 'Nhiệm vụ giải quyết tình huống thực tế hoặc dự án học tập mở rộng.',
    product: 'Báo cáo trải nghiệm thực tế hoặc bài tập giải quyết vấn đề.',
    steps: []
  };

  const slides: SlideItem[] = [
    // SLIDE 1: GIỚI THIỆU & MỤC TIÊU BÀI HỌC
    {
      id: 'slide-converted-1',
      slideNumber: 1,
      title: khbd.lessonTitle || 'KẾ HOẠCH BÀI DẠY',
      subtitle: `${khbd.subject || 'Môn học'} ${khbd.grade || 'Lớp'} · Thời lượng: ${khbd.durationPeriods || 1} tiết (Chuẩn CV 5512)`,
      category: 'intro',
      bullets: [
        `Kiến thức cốt lõi: ${khbd.objectives?.knowledge?.slice(0, 2).join('; ') || 'Nắm vững kiến thức trọng tâm'}`,
        `Năng lực phát triển: ${khbd.objectives?.competencies?.subject?.slice(0, 2).join('; ') || 'Năng lực tư duy & thực hành'}`,
        khbd.nlsAiObjective ? `★ Lồng ghép NLS-AI: ${khbd.nlsAiObjective}` : `Phẩm chất: ${khbd.objectives?.qualities?.slice(0, 2).join(', ') || 'Chăm chỉ, trách nhiệm'}`,
      ],
      cards: [
        {
          title: 'Mục Tiêu Trọng Tâm',
          desc: khbd.objectives?.knowledge?.[0] || 'Lĩnh hội hệ thống kiến thức nền tảng và phương pháp thực hành.',
          badge: 'Kiến thức',
          type: 'objective',
        },
        {
          title: 'Năng Lực & Phẩm Chất',
          desc: khbd.objectives?.competencies?.subject?.[0] || 'Phát triển năng lực tự học, hợp tác nhóm và tư duy giải quyết vấn đề.',
          badge: 'Năng lực',
          type: 'concept',
        },
        {
          title: 'Chuẩn Bị Học Liệu',
          desc: `GV: ${khbd.equipment?.teacher?.slice(0, 2).join(', ') || 'Giáo án, máy chiếu'}. HS: SGK, vở ghi.`,
          badge: 'Học liệu',
          type: 'note',
        },
      ],
      highlightQuote: 'Tri thức là hành trang - Tự chủ và sáng tạo là chìa khóa mở cánh cửa tương lai.',
      teacherNotes: `Ổn định lớp, kiểm tra sĩ số. Giới thiệu tổng quan bài học "${khbd.lessonTitle}", thời lượng ${khbd.durationPeriods} tiết và quy định tiêu chí đánh giá nhóm.`,
      estimatedMinutes: 3,
      keyVisualIcon: 'Sparkles',
      media: {
        type: 'sheet_music',
        url: khbd.visualAids?.songSheet?.url || songSheetMusic,
        title: khbd.visualAids?.songSheet?.title || `Bản nhạc bài hát: "${khbd.lessonTitle}"`,
        caption: khbd.visualAids?.songSheet?.meter || 'Bộ sách chuẩn: Kết nối tri thức với cuộc sống (Bộ GD&ĐT)',
      },
    },

    // SLIDE 2: HOẠT ĐỘNG 1 - KHỞI ĐỘNG
    {
      id: 'slide-converted-2',
      slideNumber: 2,
      title: act1.title,
      subtitle: `Hoạt động 1 · Khởi động & Tạo tâm thế (~${act1.timeMinutes} phút)`,
      category: 'activity1',
      bullets: [
        `Mục tiêu hoạt động: ${act1.objective}`,
        `Nội dung thực hiện: ${act1.content}`,
        `Sản phẩm yêu cầu: ${act1.product}`,
      ],
      cards: [
        {
          title: 'Tình Huống Khởi Động',
          desc: act1.content,
          badge: 'Nhiệm vụ',
          type: 'task',
        },
        {
          title: 'Sản Phẩm Mong Đợi',
          desc: act1.product,
          badge: 'Sản phẩm',
          type: 'product',
        },
        {
          title: 'Mục Tiêu Đạt Được',
          desc: act1.objective,
          badge: 'Mục tiêu',
          type: 'objective',
        },
      ],
      highlightQuote: 'Khởi động hứng khởi - Đặt vấn đề tự nhiên - Khơi gợi tư duy khám phá.',
      teacherNotes: `Tổ chức hoạt động tạo tình huống có vấn đề. Hướng dẫn học sinh tương tác sôi nổi, khéo léo kết nối câu trả lời vào nội dung bài học mới.`,
      estimatedMinutes: act1.timeMinutes || 5,
      keyVisualIcon: 'Play',
      media: {
        type: 'video',
        url: act1.media?.url || vietnamDanTranh,
        title: act1.media?.title || 'Khởi động & Cảm thụ âm nhạc',
        caption: act1.media?.caption || 'Quan sát tư liệu hình ảnh, lắng nghe giai điệu mở đầu bài học',
        videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
      },
    },

    // SLIDE 3: HOẠT ĐỘNG 2 - HÌNH THÀNH KIẾN THỨC MỚI (TRỌNG TÂM)
    {
      id: 'slide-converted-3',
      slideNumber: 3,
      title: act2.title,
      subtitle: `Hoạt động 2 · Khám phá & Chiếm lĩnh tri thức (~${act2.timeMinutes} phút)`,
      category: 'activity2',
      bullets: [
        `Nội dung kiến thức mới: ${act2.content}`,
        `Yêu cầu cần đạt: ${act2.objective}`,
        `Sản phẩm học tập cốt lõi: ${act2.product}`,
      ],
      cards: [
        {
          title: 'Trọng Tâm Tri Thức',
          desc: act2.content,
          badge: 'Nội dung cốt lõi',
          type: 'concept',
        },
        {
          title: 'Sản Phẩm Cần Đạt',
          desc: act2.product,
          badge: 'Sản phẩm nhóm',
          type: 'product',
        },
        {
          title: 'Yêu Cầu Sư Phạm',
          desc: act2.objective,
          badge: 'Yêu cầu',
          type: 'objective',
        },
      ],
      highlightQuote: 'Dạy học theo định hướng phát triển năng lực: Học sinh tự học, tự khám phá và kiến tạo tri thức.',
      teacherNotes: `Chia lớp thành các nhóm học tập. Giao phiếu học tập và phân công nhiệm vụ cụ thể cho từng thành viên. Nhắc nhở thời gian làm việc nhóm.`,
      estimatedMinutes: Math.round((act2.timeMinutes || 20) / 2),
      keyVisualIcon: 'Layers',
      media: {
        type: 'sheet_music',
        url: act2.media?.url || (khbd.visualAids?.songSheet?.url || songSheetMusic),
        title: act2.media?.title || `Bản nhạc chính thức bài "${khbd.lessonTitle}"`,
        caption: act2.media?.caption || 'Luyện thanh mở khẩu hình, tập hát từng câu theo lối móc xích',
      },
    },

    // SLIDE 4: HOẠT ĐỘNG 2 - TIẾN TRÌNH 4 BƯỚC THỰC HIỆN CHUẨN 5512
    {
      id: 'slide-converted-4',
      slideNumber: 4,
      title: 'Tổ Chức Thực Hiện Hoạt Động 2 (Tiến Trình 4 Bước)',
      subtitle: 'Quy trình chuẩn sư phạm Công văn 5512/BGDĐT-GDTrH',
      category: 'activity2',
      bullets: [
        `Bước 1 (Chuyển giao): ${act2.steps?.[0]?.teacherAction || 'Giáo viên giao nhiệm vụ cụ thể qua câu hỏi / phiếu học tập'}`,
        `Bước 2 (Thực hiện): ${act2.steps?.[1]?.studentAction || 'Học sinh hợp tác nhóm, nghiên cứu tư liệu và thảo luận'}`,
        `Bước 3 (Báo cáo): ${act2.steps?.[2]?.studentAction || 'Đại diện nhóm báo cáo, các nhóm khác phản biện nhận xét'}`,
        `Bước 4 (Kết luận): ${act2.steps?.[3]?.teacherAction || 'Giáo viên nhận xét, chuẩn hóa kiến thức và ghi bảng'}`,
      ],
      cards: [
        {
          title: '1. Chuyển Giao Nhiệm Vụ',
          desc: act2.steps?.[0]?.teacherAction || 'GV giao nhiệm vụ cụ thể, rõ ràng cho cá nhân hoặc nhóm học sinh.',
          badge: 'Bước 1 (GV)',
          type: 'step',
        },
        {
          title: '2. Thực Hiện Nhiệm Vụ',
          desc: act2.steps?.[1]?.studentAction || 'HS chủ động tìm tòi, thảo luận, ghi chép và giải quyết vấn đề.',
          badge: 'Bước 2 (HS)',
          type: 'step',
        },
        {
          title: '3. Báo Cáo & Thảo Luận',
          desc: act2.steps?.[2]?.studentAction || 'Các nhóm trình bày sản phẩm, lắng nghe nhận xét và phản biện tích cực.',
          badge: 'Bước 3 (Lớp)',
          type: 'step',
        },
        {
          title: '4. Kết Luận & Chuẩn Hóa',
          desc: act2.steps?.[3]?.teacherAction || 'GV nhận xét thái độ, đánh giá chất lượng sản phẩm và chốt kiến thức ghi vở.',
          badge: 'Bước 4 (Chốt)',
          type: 'step',
        },
      ],
      highlightQuote: 'Đảm bảo sự tương tác 2 chiều liên tục: GV định hướng, hỗ trợ - HS chủ động, sáng tạo.',
      teacherNotes: `Bao quát lớp trong bước 2, hỗ trợ kịp thời học sinh gặp vướng mắc. Tại bước 4, nhấn mạnh các điểm then chốt để học sinh ghi vào vở.`,
      estimatedMinutes: Math.round((act2.timeMinutes || 20) / 2),
      keyVisualIcon: 'BookOpen',
      media: {
        type: 'instrument',
        url: khbd.visualAids?.instrumentGuide?.url || orchestraBand,
        title: 'Học cụ & Dàn nhạc cụ học đường',
        caption: 'Đàn phím điện tử Organ, Kèn Melodica, Recorder, Song loan & Thanh phách giữ nhịp',
      },
    },

    // SLIDE 5: HOẠT ĐỘNG 3 - LUYỆN TẬP & CỦNG CỐ
    {
      id: 'slide-converted-5',
      slideNumber: 5,
      title: act3.title,
      subtitle: `Hoạt động 3 · Thực hành & Luyện tập khắc sâu (~${act3.timeMinutes} phút)`,
      category: 'activity3',
      bullets: [
        `Nhiệm vụ luyện tập: ${act3.content}`,
        `Yêu cầu kỹ năng: ${act3.objective}`,
        `Sản phẩm hoàn thành: ${act3.product}`,
      ],
      cards: [
        {
          title: 'Nhiệm Vụ Thực Hành',
          desc: act3.content,
          badge: 'Bài tập',
          type: 'task',
        },
        {
          title: 'Sản Phẩm Luyện Tập',
          desc: act3.product,
          badge: 'Kết quả',
          type: 'product',
        },
        {
          title: 'Kỹ Năng Cần Đạt',
          desc: act3.objective,
          badge: 'Kỹ năng',
          type: 'objective',
        },
      ],
      highlightQuote: 'Luyện tập thường xuyên - Khắc sâu phương pháp - Hình thành kỹ năng vững chắc.',
      teacherNotes: `Tổ chức cho học sinh làm bài tập cá nhân hoặc cặp đôi. Gọi đại diện lên bảng chữa bài, phân tích các lỗi sai điển hình để toàn lớp rút kinh nghiệm.`,
      estimatedMinutes: act3.timeMinutes || 12,
      keyVisualIcon: 'Target',
      media: {
        type: 'sight_reading',
        url: act3.media?.url || (khbd.visualAids?.sightReadingSheet?.url || sightReadingSheet),
        title: act3.media?.title || 'Bản phổ Bài tập đọc nhạc (Solfège)',
        caption: act3.media?.caption || 'Thang âm Đô - Rê - Mi - Son - La · Nhịp 2/4 · Gõ đệm phách mạnh - nhẹ',
      },
    },

    // SLIDE 6: HOẠT ĐỘNG 4 - VẬN DỤNG & DẶN DÒ VỀ NHÀ
    {
      id: 'slide-converted-6',
      slideNumber: 6,
      title: act4.title,
      subtitle: `Hoạt động 4 · Vận dụng thực tiễn & Mở rộng (~${act4.timeMinutes} phút)`,
      category: 'activity4',
      bullets: [
        `Tình huống thực tế: ${act4.content}`,
        `Sản phẩm vận dụng: ${act4.product}`,
        khbd.qpanTopicTitle ? `★ Tích hợp ANQP: ${khbd.qpanTopicTitle}` : `Yêu cầu mở rộng: ${act4.objective}`,
        'Dặn dò: Hoàn thiện sản phẩm học tập và đọc trước nội dung bài học kế tiếp.',
      ],
      cards: [
        {
          title: 'Vận Dụng Đời Sống',
          desc: act4.content,
          badge: 'Thực tiễn',
          type: 'concept',
        },
        {
          title: 'Sản Phẩm Trải Nghiệm',
          desc: act4.product,
          badge: 'Dự án',
          type: 'product',
        },
        {
          title: 'Nhiệm Vụ Về Nhà',
          desc: 'Nộp sản phẩm theo hạn định, xem trước câu hỏi bài mới trong SGK.',
          badge: 'Tự học',
          type: 'note',
        },
      ],
      highlightQuote: 'Học để biết, học để làm, học để cùng chung sống và khẳng định bản thân.',
      teacherNotes: `Giao nhiệm vụ mở rộng về nhà. Hướng dẫn học sinh nguồn tài liệu tham khảo và cách thức nộp sản phẩm ở buổi học tiếp theo. Khen ngợi tinh thần học tập của lớp.`,
      estimatedMinutes: act4.timeMinutes || 8,
      keyVisualIcon: 'Award',
      media: {
        type: 'composer',
        url: act4.media?.url || (khbd.visualAids?.composerPortrait?.url || composerPortrait),
        title: act4.media?.title || (khbd.visualAids?.composerPortrait?.title || 'Chân dung Danh nhân Âm nhạc & Biểu diễn'),
        caption: act4.media?.caption || (khbd.visualAids?.composerPortrait?.bio || 'Tác giả, tác phẩm di sản và sân khấu hòa tấu học đường SGK KNTT'),
      },
    },
  ];

  return slides;
}
