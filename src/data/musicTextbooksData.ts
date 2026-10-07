/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Kho Dữ Liệu Sách Giáo Khoa Âm Nhạc Khối THCS (Lớp 6, 7, 8, 9)
 * BỘ SÁCH DUY NHẤT: "KẾT NỐI TRI THỨC VỚI CUỘC SỐNG" (NXB GIÁO DỤC VIỆT NAM)
 * Đầy đủ 32 Chủ đề (8 Chủ đề / Khối lớp × 4 Khối 6, 7, 8, 9)
 */

import { MusicTextbookBook, MusicTextbookLesson, defaultTeacherProfile, LessonPlan5512 } from '../types/eduharness';
import { resolveOfficialLessonIntegration } from './musicIntegrationData';
import {
  songSheetMusic,
  sightReadingSheet,
  vietnameseInstrumentsShowcase,
  musicComposersGallery,
  musicInstrumentsBanner,
} from '../assets/images';

interface TopicRawMeta {
  topicNumber: number;
  topicTitle: string;
  lessonName: string;
  disciplines: ('Hát' | 'Đọc nhạc' | 'Nhạc cụ' | 'Lí thuyết âm nhạc' | 'Thường thức âm nhạc' | 'Nghe nhạc')[];
  semester: 'Học kỳ I' | 'Học kỳ II';
  songOrRepertoire: string;
  musicalKeyOrMeter: string;
  durationPeriods: number;
  learningOutcomes: string[];
  equipmentRecommended: string[];
  activityDetails: {
    act1Desc: string;
    act2Desc: string;
    act3Desc: string;
    act4Desc: string;
  };
}

function buildKhbd(
  grade: 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9',
  meta: TopicRawMeta
): LessonPlan5512 {
  const integration = resolveOfficialLessonIntegration(grade, meta.topicNumber);

  return {
    schoolName: defaultTeacherProfile.school,
    department: defaultTeacherProfile.department,
    teacherName: defaultTeacherProfile.name,
    subject: 'Âm Nhạc',
    grade,
    lessonTitle: `${meta.topicTitle.toUpperCase()} - ${meta.lessonName.toUpperCase()}`,
    durationPeriods: meta.durationPeriods,
    semester: meta.semester,
    academicYear: defaultTeacherProfile.academicYear,
    nlsAiObjective: integration.nlsAiObjective,
    nlsAiProcessStep: integration.nlsAiProcessStep,
    qpanTopicTitle: integration.qpanTopicTitle,
    qpanObjective: integration.qpanObjective,
    qpanProcessVandun: integration.qpanProcessVandun,
    objectives: {
      knowledge: [
        `Hát đúng giai điệu, lời ca bài hát "${meta.songOrRepertoire}", thể hiện đúng tính chất âm nhạc ${meta.musicalKeyOrMeter}.`,
        ...meta.learningOutcomes.slice(0, 2),
      ],
      competencies: {
        general: [
          'Năng lực tự chủ và tự học: Chủ động luyện thanh, tập xướng âm và đọc lời ca trước gương.',
          'Năng lực giao tiếp và hợp tác: Biết phối hợp hòa thanh, gõ đệm phách và biểu diễn nhóm trước lớp.',
        ],
        subject: [
          'Năng lực thể hiện âm nhạc: Hát đúng cao độ, trường độ; gõ phách chuẩn xác.',
          'Năng lực cảm thụ và hiểu biết âm nhạc: Cảm nhận được nét đẹp nghệ thuật, giá trị văn hóa của tác phẩm.',
        ],
        nlsAi: [
          integration.nlsAiObjective,
        ],
      },
      qualities: [
        'Yêu nước, trân trọng và có ý thức giữ gìn di sản âm nhạc truyền thống quê hương Việt Nam.',
        'Chăm chỉ, tích cực tham gia các hoạt động luyện giọng, đọc nhạc và hòa tấu của lớp.',
      ],
      qpanIntegration: [
        `${integration.qpanObjective} (${integration.qpanTopicTitle})`,
      ],
    },
    equipment: {
      teacher: [
        'Đàn phím điện tử (Organ/Keyboard), máy vi tính, loa âm thanh trung thực.',
        'Bản nhạc phóng to, video clip/audio mẫu chuẩn chất lượng cao.',
        ...meta.equipmentRecommended,
      ],
      students: [
        `Sách giáo khoa Âm nhạc ${grade.replace('Lớp ', '')} (Bộ sách Kết nối tri thức với cuộc sống).`,
        'Thanh phách tre hoặc song loan tự chuẩn bị, vở chép nhạc.',
      ],
    },
    activities: [
      {
        id: `act-${grade}-${meta.topicNumber}-1`,
        code: 'HD1',
        title: `Hoạt động 1: Mở đầu / Khởi động (${meta.topicTitle})`,
        timeMinutes: 6,
        objective: 'Tạo không khí hào hứng, kích hoạt cảm xúc thẩm mỹ và khơi gợi kiến thức nền tảng của học sinh.',
        content: meta.activityDetails.act1Desc,
        product: 'Học sinh nhận biết đúng giai điệu mở đầu, sẵn sàng tâm thế bước vào giờ học âm nhạc.',
        media: {
          type: 'video',
          url: vietnameseInstrumentsShowcase,
          title: `Tư liệu hình ảnh: ${meta.topicTitle}`,
          caption: 'Tư liệu văn hóa nghệ thuật và hình ảnh gợi mở mở đầu tiết dạy âm nhạc.',
        },
        steps: [
          {
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherAction: 'Giáo viên mở trích đoạn âm thanh hoặc hình ảnh gợi mở, đặt câu hỏi gợi ý liên quan đến bài học.',
            studentAction: 'Lắng nghe giai điệu, quan sát tư liệu và suy nghĩ câu trả lời.',
          },
          {
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherAction: 'Khích lệ học sinh trao đổi cặp đôi hoặc nhóm bàn về cảm nhận ban đầu.',
            studentAction: 'Thảo luận nhanh với bạn cùng bàn, chia sẻ cảm xúc về bài hát.',
          },
          {
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherAction: 'Mời đại diện 1-2 học sinh phát biểu miệng trước lớp.',
            studentAction: 'Đứng dậy trình bày câu trả lời rõ ràng, tự tin.',
          },
          {
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherAction: `Giáo viên nhận xét, khen ngợi và dẫn dắt vào bài mới: "${meta.lessonName}".`,
            studentAction: 'Mở SGK Âm nhạc, ghi tên chủ đề và bài học vào vở.',
          },
        ],
      },
      {
        id: `act-${grade}-${meta.topicNumber}-2`,
        code: 'HD2',
        title: `Hoạt động 2: Hình thành kiến thức mới (Khám phá & Học hát / Đọc nhạc)`,
        timeMinutes: 20,
        objective: `Học sinh nắm vững cấu trúc bài hát/bài đọc nhạc, luyện thanh và thể hiện chuẩn xác theo lối móc xích.`,
        content: meta.activityDetails.act2Desc,
        product: 'Học sinh cả lớp, từng tổ và cá nhân hát hoặc đọc nhạc chuẩn cao độ, tiết tấu rõ ràng.',
        nlsAiNote: `${integration.nlsAiProcessStep.stepName} — GV: ${integration.nlsAiProcessStep.teacherAction} / HS: ${integration.nlsAiProcessStep.studentAction}`,
        media: {
          type: 'sheet_music',
          url: songSheetMusic,
          title: `Bản nhạc SGK chính thức: "${meta.songOrRepertoire}"`,
          caption: `Nhịp & Điệu thức: ${meta.musicalKeyOrMeter} — Chuẩn SGK Kết nối tri thức với cuộc sống.`,
        },
        steps: [
          {
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherAction: 'Giáo viên đàn mẫu chuỗi luyện thanh mở khẩu hình. Đàn và hát/đọc nhạc mẫu cả bài.',
            studentAction: 'Tập tư thế đứng ngay ngắn, luyện thanh theo đàn và đọc lời ca theo phách.',
          },
          {
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherAction: 'Dạy từng câu ngắn theo lối móc xích bằng đàn Organ (Câu 1 -> Câu 2 -> Ghép 1+2...).',
            studentAction: 'Lắng nghe tiếng đàn và nhắc lại từng câu với âm lượng vừa phải, chuẩn xác.',
          },
          {
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherAction: 'Gọi từng tổ, nhóm nam, nhóm nữ đứng dậy hát đối đáp hoặc đọc luân phiên.',
            studentAction: 'Các tổ đứng lên thể hiện, các bạn dưới lớp lắng nghe và nhận xét sự đồng đều.',
          },
          {
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherAction: 'Giáo viên nhận xét chi tiết, chỉ ra các chỗ cần chỉnh sửa cao độ hoặc lấy hơi.',
            studentAction: 'Luyện tập lại các câu vừa được cô giáo hướng dẫn chỉnh sửa.',
          },
        ],
      },
      {
        id: `act-${grade}-${meta.topicNumber}-3`,
        code: 'HD3',
        title: `Hoạt động 3: Luyện tập & Củng cố (Gõ đệm phách & Hòa tấu)`,
        timeMinutes: 12,
        objective: 'Khắc sâu kiến thức, rèn luyện kỹ năng gõ đệm phách, vận động cơ thể (Body Percussion) hoặc hòa tấu nhạc cụ.',
        content: meta.activityDetails.act3Desc,
        product: 'Học sinh giữ nhịp ổn định, gõ đệm phách hoặc thực hành nhạc cụ đều đặn theo nhịp đàn.',
        media: {
          type: 'sight_reading',
          url: sightReadingSheet,
          title: 'Bản nhạc Bài đọc nhạc & Sơ đồ gõ đệm',
          caption: 'Kí hiệu nốt nhạc, cao độ, trường độ và tiết tấu chuẩn bị cho phần thực hành.',
        },
        steps: [
          {
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherAction: 'Giáo viên làm mẫu cách gõ đệm theo phách mạnh - nhẹ hoặc tiết tấu lời ca.',
            studentAction: 'Quan sát và chuẩn bị nhạc cụ gõ (thanh phách, song loan) trên bàn.',
          },
          {
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherAction: 'Bật nhạc đệm (tempo chuẩn), bắt nhịp cho cả lớp cùng thực hiện vừa hát vừa gõ đệm.',
            studentAction: 'Cả lớp hòa giọng theo tiếng đàn, tay gõ phách nhịp nhàng, chuẩn xác.',
          },
          {
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherAction: 'Mời một tốp 4 học sinh lên biểu diễn trước lớp.',
            studentAction: 'Tốp ca tự tin thể hiện, cả lớp vỗ tay theo nhịp cổ vũ bạn.',
          },
          {
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherAction: 'Giáo viên tuyên dương nhóm biểu diễn tốt, nhắc nhở giữ đúng nhịp độ không bị nhanh.',
            studentAction: 'Ghi nhớ nguyên tắc gõ đều tay.',
          },
        ],
      },
      {
        id: `act-${grade}-${meta.topicNumber}-4`,
        code: 'HD4',
        title: `Hoạt động 4: Vận dụng & Dặn dò (Sáng tạo & Hướng dẫn tự học)`,
        timeMinutes: 7,
        objective: 'Khuyến khích học sinh vận dụng sáng tạo vào đời sống và dặn dò bài tập về nhà.',
        content: meta.activityDetails.act4Desc,
        product: 'Học sinh làm được động tác phụ họa hoặc trả lời câu hỏi liên hệ thực tế, ghi nhớ dặn dò.',
        qpanNote: `${integration.qpanTopicTitle}: ${integration.qpanProcessVandun}`,
        media: {
          type: 'composer',
          url: musicComposersGallery,
          title: 'Chân dung Danh nhân & Không gian Biểu diễn',
          caption: 'Tác giả, tác phẩm di sản và sân khấu hòa tấu học đường.',
        },
        steps: [
          {
            stepName: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherAction: 'Hướng dẫn động tác múa phụ họa đơn giản hoặc đặt câu hỏi liên hệ đời sống.',
            studentAction: 'Lắng nghe và thực hành theo sự hướng dẫn của cô giáo.',
          },
          {
            stepName: 'Bước 2: Thực hiện nhiệm vụ',
            teacherAction: 'Cho cả lớp vừa hát vừa biểu diễn đồng diễn tạo không khí phấn khởi.',
            studentAction: 'Biểu diễn hào hứng, tươi vui kết thúc tiết học.',
          },
          {
            stepName: 'Bước 3: Báo cáo, thảo luận',
            teacherAction: 'Hỏi cảm nhận của học sinh sau khi hoàn thành bài học.',
            studentAction: 'Học sinh chia sẻ cảm xúc và bài học thẩm mỹ rút ra.',
          },
          {
            stepName: 'Bước 4: Kết luận, nhận định',
            teacherAction: 'Dặn dò: Về nhà thuộc lòng bài hát/bài đọc nhạc, chuẩn bị nội dung tiết tiếp theo.',
            studentAction: 'Ghi chép dặn dò vào vở và đứng nghiêm chào cô giáo.',
          },
        ],
      },
    ],
    visualAids: {
      songSheet: {
        title: `Bản nhạc chính thức bài "${meta.songOrRepertoire}"`,
        url: songSheetMusic,
        meter: meta.musicalKeyOrMeter,
        note: `SGK Âm nhạc ${grade.replace('Lớp ', '')} (Bộ sách Kết nối tri thức với cuộc sống)`,
      },
      sightReadingSheet: {
        title: 'Bản nhạc Bài đọc nhạc số 1 (Tập đọc nhạc)',
        url: sightReadingSheet,
        tonality: 'Thang âm Đô - Rê - Mi - Son - La · Nhịp 2/4',
        note: 'Bài tập đọc nhạc chuẩn hóa theo chương trình GDPT 2018',
      },
      instrumentGuide: {
        title: 'Nhạc cụ học đường & Dân tộc',
        url: vietnameseInstrumentsShowcase,
        list: ['Kèn phím Melodica', 'Sáo Recorder', 'Thanh phách', 'Song loan', 'Đàn Organ'],
      },
      composerPortrait: {
        title: 'Chân dung Nhạc sĩ & Danh nhân tiêu biểu',
        url: musicComposersGallery,
        author: 'Văn Cao, Trịnh Công Sơn, Mozart, Beethoven',
        bio: 'Tác giả tiêu biểu trong chương trình Âm nhạc THCS Kết nối tri thức',
      },
    },
  };
}

// =========================================================================
// 8 CHỦ ĐỀ ÂM NHẠC LỚP 6 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// =========================================================================
const grade6TopicsMeta: TopicRawMeta[] = [
  {
    topicNumber: 1,
    topicTitle: 'Chủ đề 1: Tuổi học trò',
    lessonName: 'Tiết 1: Học hát bài "Mùa khai trường" & Đọc nhạc Bài số 1',
    disciplines: ['Hát', 'Đọc nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Mùa khai trường (Phan Trần Bảng)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát đúng giai điệu và lời ca bài hát Mùa khai trường, thể hiện niềm vui ngày tựu trường.',
      'Đọc đúng cao độ Đô - Rê - Mi - Pha - Son và trường độ nốt đen, nốt trắng trong Bài đọc nhạc số 1.',
      'Gõ đệm thanh phách nhịp 2/4 nhịp nhàng.',
    ],
    equipmentRecommended: ['Thanh phách tre, đàn Organ, bản nhạc phóng to.'],
    activityDetails: {
      act1Desc: 'Nghe tiếng trống trường rộn rã và đoán tên ngày lễ tựu trường thiêng liêng.',
      act2Desc: 'Luyện thanh mẫu âm La-Le-Li; học hát 4 câu bài Mùa khai trường theo lối móc xích.',
      act3Desc: 'Hát kết hợp gõ thanh phách theo nhịp 2/4; đọc nhạc bài số 1 theo thang âm 5 nốt.',
      act4Desc: 'Vận động nhịp nhàng theo tiếng đàn; dặn dò ôn luyện bài hát và chuẩn bị bài mới.',
    },
  },
  {
    topicNumber: 2,
    topicTitle: 'Chủ đề 2: Cuộc sống tươi đẹp',
    lessonName: 'Tiết 5: Học hát bài "Con đường học trò" & LTAN: Thuộc tính âm thanh',
    disciplines: ['Hát', 'Lí thuyết âm nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Con đường học trò (Nguyễn Văn Quỳ)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Pha trưởng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát truyền cảm bài Con đường học trò ngợi ca con đường làng đến trường thân thương.',
      'Nắm vững 4 thuộc tính cơ bản của âm thanh có tính nhạc: Cao độ, Trường độ, Cường độ, Âm sắc.',
    ],
    equipmentRecommended: ['Đàn Organ, bảng biểu thuộc tính âm thanh, recorder/melodica.'],
    activityDetails: {
      act1Desc: 'Lắng nghe âm thanh trong tự nhiên (tiếng chim hót, tiếng suối reo) so sánh với âm nhạc.',
      act2Desc: 'Học hát bài Con đường học trò; phân tích 4 thuộc tính: Cao độ (trầm/bổng), Trường độ (dài/ngắn)...',
      act3Desc: 'Luyện tập hát đối đáp tổ; chơi trò chơi phân biệt âm sắc của các nhạc cụ.',
      act4Desc: 'Hát kết hợp gõ đệm tiết tấu; dặn dò tìm kiếm ví dụ về cường độ to/nhỏ trong âm nhạc.',
    },
  },
  {
    topicNumber: 3,
    topicTitle: 'Chủ đề 3: Nhớ ơn thầy cô',
    lessonName: 'Tiết 9: Học hát bài "Thầy cô là tất cả" & Đọc nhạc Bài số 2',
    disciplines: ['Hát', 'Đọc nhạc', 'Thường thức âm nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Thầy cô là tất cả (Bùi Anh Tú)',
    musicalKeyOrMeter: 'Nhịp 3/4 · Giọng Đô trưởng tha thiết',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát với lòng biết ơn sâu sắc bài hát Thầy cô là tất cả.',
      'Đọc đúng các nốt Đô - Rê - Mi - Son - La trong Bài đọc nhạc số 2 nhịp 3/4.',
      'Cảm thụ nét đẹp truyền thống "Tôn sư trọng đạo" của dân tộc.',
    ],
    equipmentRecommended: ['Đàn Organ, video clip về tình thầy trò, thanh phách.'],
    activityDetails: {
      act1Desc: 'Chia sẻ về kỷ niệm xúc động với thầy cô giáo đã từng dạy dỗ mình.',
      act2Desc: 'Luyện thanh mẫu âm Ma-Me-Mi; học hát từng câu bài Thầy cô là tất cả nhịp 3/4.',
      act3Desc: 'Đọc nhạc Bài số 2 kết hợp gõ phách 1 mạnh 2 nhẹ 3 nhẹ; hát tốp ca.',
      act4Desc: 'Gửi lời tri ân thầy cô giáo; dặn dò tập hát tặng thầy cô nhân ngày 20/11.',
    },
  },
  {
    topicNumber: 4,
    topicTitle: 'Chủ đề 4: Giai điệu quê hương',
    lessonName: 'Tiết 13: Học hát bài "Lí đĩa bánh bò" (Dân ca Nam Bộ) & Nhạc cụ gõ dân tộc',
    disciplines: ['Hát', 'Thường thức âm nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Lí đĩa bánh bò (Dân ca Nam Bộ)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Điệu thức Nam Bộ hóm hỉnh',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát đúng phong cách mộc mạc, dí dỏm, luyến láy của Dân ca Nam Bộ.',
      'Nhận biết một số nhạc cụ gõ dân tộc: Trống cơm, Song loan, Cồng chiêng.',
    ],
    equipmentRecommended: ['Song loan, đàn Organ, hình ảnh nhạc cụ dân tộc Việt Nam.'],
    activityDetails: {
      act1Desc: 'Nghe câu hò, điệu lí sông nước Cửu Long và thưởng thức hình ảnh chợ nổi Nam Bộ.',
      act2Desc: 'Học hát bài Lí đĩa bánh bò, phát âm đúng tiếng lót "í a", "rằng", "hai tay bưng đĩa bánh bò".',
      act3Desc: 'Hát kết hợp gõ song loan đanh giòn theo phách; biểu diễn nhóm.',
      act4Desc: 'Vận động phụ họa dáng điệu mời bánh bò vui vẻ; dặn dò tìm hiểu thêm các điệu lí Nam Bộ.',
    },
  },
  {
    topicNumber: 5,
    topicTitle: 'Chủ đề 5: Khúc ca tình bạn',
    lessonName: 'Tiết 17: Học hát bài "Tia nắng hạt mưa" & LTAN: Kí hiệu âm nhạc',
    disciplines: ['Hát', 'Lí thuyết âm nhạc', 'Đọc nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Tia nắng hạt mưa (Nhạc: Khánh Vinh, Lời: Lệ Bình)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng La thứ (A minor)',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát rộn ràng, hồn nhiên bài Tia nắng hạt mưa ngợi ca tình bạn tuổi học trò.',
      'Nhận biết và phân biệt Dấu nối (cùng cao độ) và Dấu luyến (khác cao độ).',
      'Đọc đúng Bài đọc nhạc số 3 có dấu luyến.',
    ],
    equipmentRecommended: ['Đàn Organ, bảng phụ kí hiệu dấu nối, dấu luyến, thanh phách.'],
    activityDetails: {
      act1Desc: 'Nghe bài hát đố vui về hạt mưa và tia nắng hòa quyện tình bạn thân ái.',
      act2Desc: 'Học hát bài Tia nắng hạt mưa; quan sát và giải thích công dụng của Dấu nối và Dấu luyến.',
      act3Desc: 'Đọc nhạc bài số 3; luyện tập hát hòa quyện giữa các tổ bàn.',
      act4Desc: 'Sáng tạo nhịp vỗ tay theo bài hát; dặn dò ôn tập dấu nối dấu luyến.',
    },
  },
  {
    topicNumber: 6,
    topicTitle: 'Chủ đề 6: Mùa xuân - Mùa ước mơ',
    lessonName: 'Tiết 21: Học hát bài "Mùa xuân ước mơ" & TTAN: Nhạc sĩ Văn Cao',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Mùa xuân ước mơ & Tiến quân ca (Văn Cao)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng trong sáng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát đúng sắc thái rạng rỡ, trong sáng của mùa xuân đất nước.',
      'Hiểu biết sâu sắc về cuộc đời, sự nghiệp và cống hiến vĩ đại của Nhạc sĩ Văn Cao (tác giả Quốc ca).',
    ],
    equipmentRecommended: ['Chân dung Nhạc sĩ Văn Cao, đàn Organ, bản nhạc Quốc ca Việt Nam.'],
    activityDetails: {
      act1Desc: 'Lắng nghe giai điệu Quốc ca hào hùng và giới thiệu chân dung thiên tài âm nhạc Văn Cao.',
      act2Desc: 'Học hát bài Mùa xuân ước mơ; tìm hiểu các kiệt tác của Văn Cao: Tiến quân ca, Làng tôi, Trường ca Sông Lô...',
      act3Desc: 'Hát tập thể trang nghiêm, hào sảng; biểu diễn tốp ca mùa xuân.',
      act4Desc: 'Bày tỏ lòng biết ơn đối với nhạc sĩ Văn Cao; dặn dò nghe thêm tác phẩm của ông.',
    },
  },
  {
    topicNumber: 7,
    topicTitle: 'Chủ đề 7: Gia đình yêu thương',
    lessonName: 'Tiết 25: Học hát bài "Đi học" & LTAN: Nhịp 3/4',
    disciplines: ['Hát', 'Lí thuyết âm nhạc', 'Đọc nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Đi học (Nhạc: Bùi Đình Thảo, Thơ: Minh Chính)',
    musicalKeyOrMeter: 'Nhịp 3/4 · Điệu thức dân gian miền núi êm ả',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát thiết tha, trong trẻo bài hát Đi học - ca khúc bất hủ gắn liền với tuổi thơ.',
      'Hiểu rõ khái niệm nhịp 3/4: mỗi ô nhịp có 3 phách, mỗi phách bằng một nốt đen (phách 1 mạnh, 2 nhẹ, 3 nhẹ).',
    ],
    equipmentRecommended: ['Đàn Organ, sơ đồ đánh nhịp 3/4 hình tam giác, thanh phách.'],
    activityDetails: {
      act1Desc: 'Đọc những câu thơ: "Hôm qua em tới trường, mẹ dắt tay từng bước..." khơi gợi cảm xúc gia đình.',
      act2Desc: 'Học hát bài Đi học; học quy tắc nhịp 3/4 và tập đánh nhịp 3/4 bằng tay phải theo sơ đồ.',
      act3Desc: 'Vừa hát bài Đi học vừa đánh nhịp 3/4 bồng bềnh; đọc nhạc bài số 4.',
      act4Desc: 'Cảm nhận công ơn cha mẹ và thầy cô; dặn dò tập đánh nhịp 3/4 thành thạo.',
    },
  },
  {
    topicNumber: 8,
    topicTitle: 'Chủ đề 8: Mùa hè quê hương',
    lessonName: 'Tiết 29: Học hát bài "Bài ca mùa hè" & Ôn tập biểu diễn báo cáo cuối năm',
    disciplines: ['Hát', 'Đọc nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Bài ca mùa hè (Trần Tất Toại)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng rộn ràng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát rộn ràng bài hát về tiếng ve, hoa phượng và kỳ nghỉ hè bổ ích.',
      'Hệ thống hóa toàn bộ các bài hát, bài đọc nhạc và nhạc cụ đã học trong năm lớp 6.',
      'Tự tin biểu diễn báo cáo sản phẩm âm nhạc trước tập thể lớp.',
    ],
    equipmentRecommended: ['Đàn Organ, micro, sân khấu lớp học, bộ gõ đệm đầy đủ.'],
    activityDetails: {
      act1Desc: 'Nghe tiếng ve râm ran và ngắm chùm hoa phượng đỏ báo hiệu mùa hè đến.',
      act2Desc: 'Học hát bài Bài ca mùa hè; ôn tập lại các bài đọc nhạc từ số 1 đến số 4.',
      act3Desc: 'Tổ chức hội thi biểu diễn văn nghệ giữa các tổ: hát đơn ca, song ca, hòa tấu nhạc cụ.',
      act4Desc: 'Tổng kết đánh giá thành quả học tập môn Âm nhạc lớp 6; dặn dò giữ giọng trong kỳ nghỉ hè.',
    },
  },
];

// =========================================================================
// 8 CHỦ ĐỀ ÂM NHẠC LỚP 7 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// =========================================================================
const grade7TopicsMeta: TopicRawMeta[] = [
  {
    topicNumber: 1,
    topicTitle: 'Chủ đề 1: Giai điệu quê hương',
    lessonName: 'Tiết 1: Học hát bài "Lí cây đa" (Dân ca Quan họ Bắc Ninh) & Đọc nhạc Bài số 1',
    disciplines: ['Hát', 'Đọc nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Lí cây đa (Dân ca Quan họ Bắc Ninh)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Hơi Bắc (vui tươi, dí dỏm)',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát đúng cao độ, trường độ, sắc thái vui tươi dí dỏm của Dân ca Quan họ Bắc Ninh.',
      'Đọc đúng cao độ Đô - Rê - Mi - Son - La và trường độ Bài đọc nhạc số 1.',
      'Gõ thanh phách và song loan nhịp nhàng theo phách 2/4.',
    ],
    equipmentRecommended: ['Đàn Organ, thanh phách tre, song loan, video Quan họ Kinh Bắc.'],
    activityDetails: {
      act1Desc: 'Xem clip liền anh liền chị hát Quan họ bên đình làng Kinh Bắc và nhận diện trang phục truyền thống.',
      act2Desc: 'Luyện thanh mẫu âm Ma-Me-Mi; học hát từng câu bài Lí cây đa, nhả chữ đúng các từ đệm "í a", "rằng".',
      act3Desc: 'Hát kết hợp gõ thanh phách và song loan theo nhịp 2/4; đọc nhạc Bài số 1.',
      act4Desc: 'Thực hiện động tác nhún chân nghiêng đầu dân ca; dặn dò thuộc lòng bài hát.',
    },
  },
  {
    topicNumber: 2,
    topicTitle: 'Chủ đề 2: Bốn mùa tươi đẹp',
    lessonName: 'Tiết 5: Học hát bài "Mùa xuân trên quê hương" & LTAN: Dấu hóa',
    disciplines: ['Hát', 'Lí thuyết âm nhạc', 'Đọc nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Mùa xuân trên quê hương (Huỳnh Phước Liên)',
    musicalKeyOrMeter: 'Nhịp 3/4 · Giọng Đô trưởng tha thiết',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát đúng tính chất nhịp nhàng, tha thiết nhịp 3/4 bài Mùa xuân trên quê hương.',
      'Nắm vững định nghĩa và tác dụng của 3 loại dấu hóa: Dấu thăng (#), Dấu giáng (b), Dấu hoàn (♮).',
    ],
    equipmentRecommended: ['Đàn Organ, bảng phụ kí hiệu dấu hóa, bản nhạc phóng to.'],
    activityDetails: {
      act1Desc: 'Lắng nghe âm thanh mùa xuân tràn trề nhựa sống và tập đếm nhịp 3/4 (1 vỗ tay, 2-3 mở).',
      act2Desc: 'Học hát bài Mùa xuân trên quê hương; phân tích chức năng nâng cao/hạ thấp nửa cung của dấu hóa.',
      act3Desc: 'Luyện tập hát đối đáp tổ; tìm các nốt có dấu hóa trong bài đọc nhạc số 2.',
      act4Desc: 'Vận dụng tìm dấu hóa trên các bản nhạc thực tế; dặn dò ôn bài.',
    },
  },
  {
    topicNumber: 3,
    topicTitle: 'Chủ đề 3: Thầy cô và mái trường',
    lessonName: 'Tiết 9: Học hát bài "Khúc ca người giáo viên nhân dân" & Nhạc cụ Kèn phím Melodica',
    disciplines: ['Hát', 'Nhạc cụ', 'Thường thức âm nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Khúc ca người giáo viên nhân dân (Bùi Anh Tú) & Bụi phấn',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng tự hào',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát với lòng tự hào và kính trọng ca ngợi nghề giáo viên cao quý.',
      'Thổi đúng thế ngón bài Bụi phấn trên kèn phím Melodica hoặc sáo Recorder.',
      'Hiểu thế nào là hình thức Hát bè (bè đồng âm, bè hòa âm).',
    ],
    equipmentRecommended: ['Kèn phím Melodica, sáo Recorder Soprano, đàn Organ.'],
    activityDetails: {
      act1Desc: 'Xem hình ảnh người thầy trên bục giảng và nghe trích đoạn ca khúc xúc động.',
      act2Desc: 'Học hát bài Khúc ca người giáo viên nhân dân; tập ngón tay và thổi kèn Melodica giai điệu Bụi phấn.',
      act3Desc: 'Hòa tấu kèn phím kết hợp đệm đàn Organ; chia nửa lớp hát nửa lớp thổi kèn.',
      act4Desc: 'Vệ sinh cất giữ nhạc cụ cẩn thận; dặn dò luyện ngón 15 phút mỗi ngày.',
    },
  },
  {
    topicNumber: 4,
    topicTitle: 'Chủ đề 4: Giai điệu tình bạn',
    lessonName: 'Tiết 13: Học hát bài "Nụ cười" (Nhạc Nga) & Đọc nhạc Bài số 3',
    disciplines: ['Hát', 'Đọc nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Nụ cười (Nhạc Nga, Lời Việt: Phạm Tuyên)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng tươi sáng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát tươi vui, rộn ràng ca khúc thiếu nhi nổi tiếng nước Nga "Nụ cười".',
      'Đọc đúng cao độ và tiết tấu Bài đọc nhạc số 3 kết hợp gõ đệm.',
    ],
    equipmentRecommended: ['Đàn Organ, thanh phách, tranh hoạt hình Chú cún và nụ cười.'],
    activityDetails: {
      act1Desc: 'Chia sẻ thông điệp: "Một nụ cười bằng mười thang thuốc bổ" tạo tiếng cười sảng khoái đầu giờ.',
      act2Desc: 'Học hát bài Nụ cười với nhịp điệu hành tiến, xua tan nỗi buồn.',
      act3Desc: 'Đọc nhạc bài số 3; tập hát đối đáp nam - nữ câu hỏi và câu đáp.',
      act4Desc: 'Cười tươi và hát vang điệp khúc; dặn dò tập đọc nhạc thành thạo.',
    },
  },
  {
    topicNumber: 5,
    topicTitle: 'Chủ đề 5: Nhịp điệu mùa xuân',
    lessonName: 'Tiết 17: Học hát bài "Mùa xuân ơi" & TTAN: Đàn Violon và Cello',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Mùa xuân ơi (Nguyễn Ngọc Thiện)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng rộn ràng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát rộn ràng không khí Tết cổ truyền qua bài hát quen thuộc Mùa xuân ơi.',
      'Nhận biết hình dáng, âm sắc quý phái của Đàn Violon (Vĩ cầm) và Cello (Trung cầm).',
    ],
    equipmentRecommended: ['Đàn Organ, hình ảnh và audio tiếng đàn Violon, Cello.'],
    activityDetails: {
      act1Desc: 'Lắng nghe tiếng đàn Violon du dương réo rắt và đoán tên loại nhạc cụ dây kéo cung.',
      act2Desc: 'Học hát bài Mùa xuân ơi; tìm hiểu cấu tạo hộp đàn, cần đàn, cây vĩ và dải âm vực của Violon/Cello.',
      act3Desc: 'Hát kết hợp vỗ tay chúc mừng năm mới; xem nghệ sĩ biểu diễn độc tấu Violon.',
      act4Desc: 'Dặn dò chuẩn bị bài học tiếp theo.',
    },
  },
  {
    topicNumber: 6,
    topicTitle: 'Chủ đề 6: Âm vang đất nước',
    lessonName: 'Tiết 21: Học hát bài "Ca ngợi Tổ quốc" & LTAN: Dấu nhắc lại, khung thay đổi',
    disciplines: ['Hát', 'Lí thuyết âm nhạc', 'Đọc nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Ca ngợi Tổ quốc (Hoàng Vân)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Rê thứ hào sảng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát trang nghiêm, hùng tráng thể hiện tình yêu quê hương đất nước.',
      'Nắm vững quy tắc đọc bản nhạc khi gặp Dấu nhắc lại (||: :||) và Khung thay đổi (1.  2. ).',
    ],
    equipmentRecommended: ['Đàn Organ, bảng biểu dấu nhắc lại và khung thay đổi.'],
    activityDetails: {
      act1Desc: 'Xem hình ảnh cờ đỏ sao vàng tung bay trên cột cờ Lũng Cú và các danh lam thắng cảnh.',
      act2Desc: 'Học hát bài Ca ngợi Tổ quốc; hướng dẫn cách đi theo mũi tên khi gặp khung thay đổi 1 và 2.',
      act3Desc: 'Đọc nhạc bài số 4 có áp dụng khung thay đổi; hát tập thể đồng thanh.',
      act4Desc: 'Khắc sâu tình yêu Tổ quốc; dặn dò luyện tập cách đọc nhạc có dấu nhắc lại.',
    },
  },
  {
    topicNumber: 7,
    topicTitle: 'Chủ đề 7: Ước mơ tương lai',
    lessonName: 'Tiết 25: Học hát bài "Bay cao tiếng hát ước mơ" & TTAN: Dàn nhạc giao hưởng',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Bay cao tiếng hát ước mơ (Nguyễn Nam)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng bay bổng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát trong sáng, tràn đầy hy vọng về ước mơ tương lai tươi sáng.',
      'Hiểu cơ cấu 4 bộ nhạc cụ chính trong Dàn nhạc giao hưởng: Bộ Dây, Bộ Gỗ, Bộ Đồng, Bộ Gõ.',
    ],
    equipmentRecommended: ['Sơ đồ vị trí các bộ nhạc cụ trong Dàn nhạc giao hưởng, đàn Organ.'],
    activityDetails: {
      act1Desc: 'Nghe đoạn mở đầu hùng tráng của Dàn nhạc giao hưởng với cây gậy chỉ huy của nhạc trưởng.',
      act2Desc: 'Học hát bài Bay cao tiếng hát ước mơ; khám phá 4 bộ nhạc cụ và vai trò của Nhạc trưởng.',
      act3Desc: 'Hát tốp ca kết hợp mô phỏng động tác chơi đàn; đố vui nhận diện nhạc cụ giao hưởng.',
      act4Desc: 'Khuyến khích nuôi dưỡng ước mơ; dặn dò chuẩn bị dự án âm nhạc cuối năm.',
    },
  },
  {
    topicNumber: 8,
    topicTitle: 'Chủ đề 8: Tiếng ve gọi hè',
    lessonName: 'Tiết 29: Học hát bài "Ve gọi hè về" & Tổng kết dự án báo cáo âm nhạc',
    disciplines: ['Hát', 'Đọc nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Ve gọi hè về & Tổng kết âm nhạc lớp 7',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng rộn ràng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát rộn ràng chia tay năm học lớp 7, đón chào mùa hè bổ ích.',
      'Báo cáo tự tin tiết mục biểu diễn cá nhân hoặc tập thể nhóm trước lớp.',
    ],
    equipmentRecommended: ['Đàn Organ, kèn phím, thanh phách, hoa điểm 10.'],
    activityDetails: {
      act1Desc: 'Chia sẻ cảm xúc khi chuẩn bị hoàn thành năm học lớp 7 tại Trường THCS Long Hồ.',
      act2Desc: 'Học hát bài Ve gọi hè về; các nhóm chuẩn bị tiết mục báo cáo tổng kết.',
      act3Desc: 'Biểu diễn báo cáo sản phẩm âm nhạc: đơn ca, song ca, hòa tấu kèn phím Bụi phấn.',
      act4Desc: 'Giáo viên Duyên Thanh nhận xét, đánh giá và chúc học sinh kỳ nghỉ hè vui khỏe.',
    },
  },
];

// =========================================================================
// 8 CHỦ ĐỀ ÂM NHẠC LỚP 8 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// =========================================================================
const grade8TopicsMeta: TopicRawMeta[] = [
  {
    topicNumber: 1,
    topicTitle: 'Chủ đề 1: Chào năm học mới',
    lessonName: 'Tiết 1: Học hát bài "Khát vọng mùa xuân" (Nhạc W.A.Mozart) & TTAN: Nhạc sĩ Mozart',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Khát vọng mùa xuân (W.A.Mozart, Lời Việt: Tô Hải)',
    musicalKeyOrMeter: 'Nhịp 6/8 · Giọng Fa trưởng (F major)',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát uyển chuyển nhịp 6/8, giai điệu trong sáng của âm nhạc Cổ điển thế giới.',
      'Hiểu về thần đồng âm nhạc người Áo W.A.Mozart và di sản âm nhạc đồ sộ của ông.',
    ],
    equipmentRecommended: ['Đàn Piano/Organ, chân dung Mozart, loa âm thanh.'],
    activityDetails: {
      act1Desc: 'Nghe trích đoạn Hành khúc Thổ Nhĩ Kỳ của Mozart và giải đố về thần đồng âm nhạc.',
      act2Desc: 'Học hát bài Khát vọng mùa xuân; tìm hiểu tiểu sử và tài năng sáng tác từ năm 5 tuổi của Mozart.',
      act3Desc: 'Luyện tập hát bè hòa âm câu điệp khúc; biểu diễn nhóm thanh lịch.',
      act4Desc: 'Khắc sâu tình yêu âm nhạc thế giới; dặn dò nghe thêm tác phẩm của Mozart.',
    },
  },
  {
    topicNumber: 2,
    topicTitle: 'Chủ đề 2: Tôi yêu quê hương',
    lessonName: 'Tiết 5: Học hát bài "Qua miền Tây Bắc" & TTAN: Đờn ca tài tử Nam Bộ',
    disciplines: ['Hát', 'Thường thức âm nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Qua miền Tây Bắc (Nguyễn Thành)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng hào hùng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát hào hùng, tái hiện khí thế chiến thắng Điện Biên Phủ lịch sử.',
      'Tìm hiểu về Nghệ thuật Đờn ca tài tử Nam Bộ - Di sản văn hóa phi vật thể đại diện của nhân loại.',
    ],
    equipmentRecommended: ['Đàn Organ, hình ảnh đờn kìm, đờn tranh, đờn cò trong dàn tài tử.'],
    activityDetails: {
      act1Desc: 'Xem video clip hoa ban nở trắng rừng Tây Bắc và đoàn quân giải phóng Điện Biên.',
      act2Desc: 'Học hát bài Qua miền Tây Bắc; tìm hiểu nguồn gốc và nét độc đáo của Đờn ca tài tử phương Nam.',
      act3Desc: 'Hát tập thể hùng tráng kết hợp gõ đệm nhịp 2/4; nghe bản Dạ cổ hoài lang.',
      act4Desc: 'Tự hào về truyền thống đánh giặc giữ nước và di sản văn hóa dân tộc.',
    },
  },
  {
    topicNumber: 3,
    topicTitle: 'Chủ đề 3: Tôn sư trọng đạo',
    lessonName: 'Tiết 9: Học hát bài "Lời thầy cô" & LTAN: Đảo phách và nghịch phách',
    disciplines: ['Hát', 'Lí thuyết âm nhạc', 'Đọc nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Lời thầy cô & Đọc nhạc số 2',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Son trưởng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát với cảm xúc biết ơn sâu sắc về công lao dạy dỗ của người thầy.',
      'Hiểu rõ hiện tượng Đảo phách (âm thanh bắt đầu từ phách nhẹ ngân sang phách mạnh) và Nghịch phách.',
    ],
    equipmentRecommended: ['Đàn Organ, sơ đồ minh họa đảo phách và nghịch phách.'],
    activityDetails: {
      act1Desc: 'Đàm thoại về những lời răn dạy quý giá của thầy cô nâng bước học sinh trưởng thành.',
      act2Desc: 'Học hát bài Lời thầy cô; phân tích hiện tượng đảo phách tạo điểm nhấn cảm xúc.',
      act3Desc: 'Đọc nhạc bài số 2 có nốt đảo phách; luyện tập gõ phách chuẩn xác.',
      act4Desc: 'Dặn dò rèn luyện xướng âm đúng nhịp đảo phách.',
    },
  },
  {
    topicNumber: 4,
    topicTitle: 'Chủ đề 4: Tình bạn tuổi thơ',
    lessonName: 'Tiết 13: Học hát bài "Tuổi hồng" & TTAN: Nhạc sĩ Trịnh Công Sơn',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Tuổi hồng (Trịnh Công Sơn)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng La thứ man mác',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát đúng chất trữ tình, triết lý nhân văn sâu sắc của âm nhạc Trịnh Công Sơn.',
      'Hiểu biết về Nhạc sĩ Trịnh Công Sơn và những ca khúc viết cho thiếu nhi/học sinh.',
    ],
    equipmentRecommended: ['Chân dung Trịnh Công Sơn, đàn Organ, bản nhạc Tuổi hồng.'],
    activityDetails: {
      act1Desc: 'Nghe ca khúc Em là hoa hồng nhỏ và giới thiệu nhạc sĩ tài hoa Trịnh Công Sơn.',
      act2Desc: 'Học hát bài Tuổi hồng; tìm hiểu thông điệp yêu thương cuộc sống trong âm nhạc Trịnh.',
      act3Desc: 'Hát tốp ca nhẹ nhàng, lắng đọng cảm xúc; hát đuổi câu điệp khúc.',
      act4Desc: 'Trân trọng tình bạn tuổi học trò; dặn dò nghe thêm ca khúc Trịnh Công Sơn.',
    },
  },
  {
    topicNumber: 5,
    topicTitle: 'Chủ đề 5: Khúc ca mùa xuân',
    lessonName: 'Tiết 17: Học hát bài "Mùa xuân nho nhỏ" & LTAN: Nhịp 6/8',
    disciplines: ['Hát', 'Lí thuyết âm nhạc', 'Đọc nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Mùa xuân nho nhỏ (Nhạc: Trần Hoàn, Thơ: Thanh Hải)',
    musicalKeyOrMeter: 'Nhịp 6/8 · Giọng Mi thứ (E minor)',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát thiết tha giai điệu bài thơ bất hủ Mùa xuân nho nhỏ của nhà thơ Thanh Hải.',
      'Nắm vững cấu trúc nhịp 6/8: mỗi ô nhịp có 6 phách, mỗi phách bằng một nốt móc đơn (trọng âm ở phách 1 và 4).',
    ],
    equipmentRecommended: ['Đàn Organ, bản đồ nhịp 6/8 hai phách kép, thanh phách.'],
    activityDetails: {
      act1Desc: 'Đọc câu thơ: "Mọc giữa dòng sông xanh, một bông hoa tím biếc..." gợi cảm xúc xuân xứ Huế.',
      act2Desc: 'Học hát bài Mùa xuân nho nhỏ; phân tích nhịp 6/8 đung đưa như sóng nước Hương Giang.',
      act3Desc: 'Đọc nhạc bài số 3 nhịp 6/8; luyện tập đánh nhịp 6/8 hai phách kép.',
      act4Desc: 'Ý thức cống hiến mùa xuân nho nhỏ của mình cho đời; dặn dò ôn bài.',
    },
  },
  {
    topicNumber: 6,
    topicTitle: 'Chủ đề 6: Tình ca quê hương',
    lessonName: 'Tiết 21: Học hát bài "Bài ca đất Phương Nam" & TTAN: Dân ca miền Trung',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Bài ca đất Phương Nam (Nhạc: Lư Nhất Vũ, Lời: Lê Giang)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Rê thứ đậm chất Nam Bộ',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát hào sảng, da diết ca khúc gắn liền với lịch sử khai hoang mở cõi đất phương Nam.',
      'Cảm thụ nét đẹp mộc mạc của Dân ca miền Trung (hò giã gạo, hò khoan Lệ Thủy).',
    ],
    equipmentRecommended: ['Đàn Organ, clip phim Đất phương Nam, đàn kìm.'],
    activityDetails: {
      act1Desc: 'Xem cảnh rừng tràm U Minh và nghe tiếng hú gọi đò đặc trưng vùng đất Nam Bộ.',
      act2Desc: 'Học hát bài Bài ca đất Phương Nam; chú ý các nốt ngân dài và luyến láy vọng cổ.',
      act3Desc: 'Hát tập thể hòa quyện hào khí phương Nam; so sánh với điệu hò miền Trung.',
      act4Desc: 'Tự hào về quê hương Nam Bộ thân yêu; dặn dò hát tặng người thân.',
    },
  },
  {
    topicNumber: 7,
    topicTitle: 'Chủ đề 7: Âm nhạc nước ngoài',
    lessonName: 'Tiết 25: Học hát bài "Chiếc thuyền nan" & TTAN: L.V.Beethoven',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Chiếc thuyền nan (Dân ca Pháp, Lời Việt) & Giao hưởng Số 5',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng hóm hỉnh',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát vui tươi, hài hước bài hát Chiếc thuyền nan.',
      'Hiểu về cuộc đời nghị lực phi thường chống chọi bệnh điếc của nhạc sĩ thiên tài L.V.Beethoven.',
    ],
    equipmentRecommended: ['Chân dung Beethoven, đàn Organ, audio Bản giao hưởng Định mệnh số 5.'],
    activityDetails: {
      act1Desc: 'Nghe 4 nốt nhạc "Định mệnh gõ cửa" (Son-Son-Son-Mì) kinh điển của Beethoven.',
      act2Desc: 'Học hát bài Chiếc thuyền nan; tìm hiểu tấm gương kiên cường của Beethoven khi bị điếc hoàn toàn.',
      act3Desc: 'Hát đối đáp các khổ thơ hài hước; thi đua giữa các nhóm bàn.',
      act4Desc: 'Noi gương ý chí vượt khó vươn lên của Beethoven; dặn dò chuẩn bị tiết ôn tập.',
    },
  },
  {
    topicNumber: 8,
    topicTitle: 'Chủ đề 8: Khúc ca tạm biệt',
    lessonName: 'Tiết 29: Học hát bài "Tạm biệt mái trường" & Tổng kết đánh giá cuối năm',
    disciplines: ['Hát', 'Đọc nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Tạm biệt mái trường & Tổng kết âm nhạc lớp 8',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng lắng đọng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát dạt dào cảm xúc bùi ngùi chuẩn bị bước vào năm học cuối cấp lớp 9.',
      'Hệ thống hóa toàn bộ kiến thức lí thuyết và kỹ năng hát, đọc nhạc lớp 8.',
    ],
    equipmentRecommended: ['Đàn Organ, micro, bảng tổng hợp kiến thức âm nhạc lớp 8.'],
    activityDetails: {
      act1Desc: 'Nhìn lại hành trình một năm học lớp 8 gắn bó yêu thương tại Trường THCS Long Hồ.',
      act2Desc: 'Học hát bài Tạm biệt mái trường; hệ thống hóa đảo phách, nhịp 6/8, Mozart, Beethoven.',
      act3Desc: 'Biểu diễn văn nghệ tổng kết năm học của các tổ; bình bầu tiết mục xuất sắc.',
      act4Desc: 'Giáo viên dặn dò kế hoạch hè và chuẩn bị hành trang bước vào lớp 9.',
    },
  },
];

// =========================================================================
// 8 CHỦ ĐỀ ÂM NHẠC LỚP 9 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// =========================================================================
const grade9TopicsMeta: TopicRawMeta[] = [
  {
    topicNumber: 1,
    topicTitle: 'Chủ đề 1: Khúc ca mùa thu',
    lessonName: 'Tiết 1: Học hát bài "Khát vọng tuổi trẻ" & LTAN: Cặp giọng song song',
    disciplines: ['Hát', 'Lí thuyết âm nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Khát vọng tuổi trẻ (Vũ Hoàng)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Son trưởng (G major)',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát đúng khí thế hào hùng, sục sôi ngọn lửa thanh niên thế hệ trẻ cuối cấp THCS.',
      'Hiểu rõ bản chất Cặp giọng song song (cùng chung hóa biểu, chủ âm cách nhau một quãng 3 thứ).',
    ],
    equipmentRecommended: ['Đàn Organ, sơ đồ vòng hòa âm cặp giọng song song, máy chiếu.'],
    activityDetails: {
      act1Desc: 'Nhắc lại câu khẩu hiệu: "Đừng hỏi Tổ quốc đã làm gì cho ta..." khơi dậy ngọn lửa cống hiến.',
      act2Desc: 'Học hát bài Khát vọng tuổi trẻ; phân tích cặp giọng Đô trưởng - La thứ, Son trưởng - Mi thứ.',
      act3Desc: 'Đứng nghiêm hát hành khúc hùng tráng; giải các bài tập tìm giọng song song tương ứng.',
      act4Desc: 'Khắc sâu lý tưởng sống đẹp của tuổi trẻ học trò; dặn dò ôn bài.',
    },
  },
  {
    topicNumber: 2,
    topicTitle: 'Chủ đề 2: Âm vang cội nguồn',
    lessonName: 'Tiết 5: Học hát bài "Hồn thiêng đất mẹ" & TTAN: Hát Xoan Phú Thọ & Ca Trù',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Hồn thiêng đất mẹ & Hát Xoan Phú Thọ',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng La thứ trang nghiêm',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát trang nghiêm, thành kính hướng về cội nguồn Đền Hùng dân tộc.',
      'Tìm hiểu về 2 di sản văn hóa phi vật thể của nhân loại: Hát Xoan Phú Thọ và Ca Trù miền Bắc.',
    ],
    equipmentRecommended: ['Đàn Organ, video nghệ nhân hát Xoan cửa đình và đào nương hát Ca trù.'],
    activityDetails: {
      act1Desc: 'Xem hình ảnh Giỗ Tổ Hùng Vương trên đỉnh núi Nghĩa Lĩnh khơi gợi lòng tự hào dòng giống Tiên Rồng.',
      act2Desc: 'Học hát bài Hồn thiêng đất mẹ; tìm hiểu đặc trưng lề lối hát Xoan và tiếng phách, đàn đáy Ca trù.',
      act3Desc: 'Hát tập thể hào hùng kết hợp gõ đệm phách trang nghiêm; thi hỏi đáp về di sản.',
      act4Desc: 'Ý thức trách nhiệm gìn giữ và bảo tồn di sản âm nhạc cha ông truyền lại.',
    },
  },
  {
    topicNumber: 3,
    topicTitle: 'Chủ đề 3: Tri ân người thầy',
    lessonName: 'Tiết 9: Học hát bài "Nhớ ơn thầy cô" & Hòa tấu Nhạc cụ Kèn phím Melodica',
    disciplines: ['Hát', 'Nhạc cụ'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Nhớ ơn thầy cô (Nguyễn Ngọc Thiện)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng tươi sáng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát dạt dào cảm xúc tri ân thầy cô giáo trong năm học lớp 9 quan trọng.',
      'Hòa tấu chuẩn xác giai điệu trên kèn phím Melodica và sáo Recorder.',
    ],
    equipmentRecommended: ['Kèn phím Melodica, sáo Recorder, đàn Organ.'],
    activityDetails: {
      act1Desc: 'Nhớ lại những kỷ niệm 4 năm gắn bó dưới mái trường THCS Long Hồ.',
      act2Desc: 'Học hát bài Nhớ ơn thầy cô; luyện ngón bấm phím kèn Melodica theo tổng phổ 2 bè.',
      act3Desc: 'Hòa tấu kèn phím kết hợp đệm đàn Organ; nhóm hát hòa quyện cùng nhóm nhạc cụ.',
      act4Desc: 'Gửi tấm lòng biết ơn tới cô giáo chủ nhiệm và các thầy cô bộ môn.',
    },
  },
  {
    topicNumber: 4,
    topicTitle: 'Chủ đề 4: Vươn tới tương lai',
    lessonName: 'Tiết 13: Học hát bài "Nụ cười tuổi thơ" & LTAN: Giọng cùng tên',
    disciplines: ['Hát', 'Lí thuyết âm nhạc', 'Đọc nhạc'],
    semester: 'Học kỳ I',
    songOrRepertoire: 'Nụ cười tuổi thơ & Đọc nhạc số 3',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Pha trưởng',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát trong sáng, hướng về tương lai với niềm tin và nghị lực.',
      'Phân biệt rõ Cặp giọng cùng tên (cùng chung nốt chủ âm nhưng khác hóa biểu: C major và C minor).',
    ],
    equipmentRecommended: ['Đàn Organ, bảng so sánh giọng cùng tên và giọng song song.'],
    activityDetails: {
      act1Desc: 'Chia sẻ về mục tiêu thi đỗ vào trường THPT mơ ước của mỗi học sinh lớp 9.',
      act2Desc: 'Học hát bài Nụ cười tuổi thơ; phân tích sự tương phản sắc thái giữa trưởng và thứ cùng tên.',
      act3Desc: 'Đọc nhạc bài số 3; luyện tập giải các bài tập nhận diện giọng cùng tên.',
      act4Desc: 'Tự tin vững bước vào kỳ thi học kỳ I; dặn dò ôn bài.',
    },
  },
  {
    topicNumber: 5,
    topicTitle: 'Chủ đề 5: Mùa xuân hy vọng',
    lessonName: 'Tiết 17: Học hát bài "Đất nước trọn niềm vui" & TTAN: Hát Chèo truyền thống',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Đất nước trọn niềm vui (Hoàng Hà)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Rê trưởng hân hoan náo nức',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát hân hoan, rộn rã ca khúc mừng ngày non sông liền một dải 30/4 lịch sử.',
      'Tìm hiểu nét độc đáo của Sân khấu Hát Chèo truyền thống đồng bằng Bắc Bộ.',
    ],
    equipmentRecommended: ['Đàn Organ, video trích đoạn Chèo cổ Quan Âm Thị Kính, trống Chèo.'],
    activityDetails: {
      act1Desc: 'Xem hình ảnh xe tăng tiến vào Dinh Độc Lập ngày 30/4/1975 rực rỡ cờ hoa.',
      act2Desc: 'Học hát bài Đất nước trọn niềm vui; tìm hiểu các nhân vật điển hình trong Chèo (Hề, Đào, Kép...).',
      act3Desc: 'Hát tập thể với niềm vui chiến thắng vĩ đại; xem trích đoạn hề Chèo hóm hỉnh.',
      act4Desc: 'Tự hào về non sông gấm vóc độc lập tự do; dặn dò ôn bài.',
    },
  },
  {
    topicNumber: 6,
    topicTitle: 'Chủ đề 6: Giai điệu tự hào',
    lessonName: 'Tiết 21: Học hát bài "Mùa xuân trên Thành phố Hồ Chí Minh" & TTAN: Dân ca Ví Giặm',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Mùa xuân trên Thành phố Hồ Chí Minh (Xuân Hồng)',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng rạo rực',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát rộn ràng niềm tự hào về thành phố mang tên Bác kính yêu.',
      'Khám phá Dân ca Ví, Giặm Nghệ Tĩnh - Di sản văn hóa phi vật thể của nhân loại.',
    ],
    equipmentRecommended: ['Đàn Organ, video các liền anh liền chị hát đối đáp Ví Giặm bên bờ sông Lam.'],
    activityDetails: {
      act1Desc: 'Nghe giai điệu mùa xuân rực rỡ cờ bay trên bến Nhà Rồng lịch sử.',
      act2Desc: 'Học hát bài Mùa xuân trên Thành phố Hồ Chí Minh; tìm hiểu các làn điệu Ví đò đưa, Giặm xay lúa.',
      act3Desc: 'Hát vang ca khúc theo nhạc beat hào sảng; đố vui về các câu hát Ví Giặm xứ Nghệ.',
      act4Desc: 'Nhớ ơn Bác Hồ vĩ đại; dặn dò nghe thêm dân ca các miền.',
    },
  },
  {
    topicNumber: 7,
    topicTitle: 'Chủ đề 7: Âm vang thế giới',
    lessonName: 'Tiết 25: Học hát bài "Triệu đóa hoa hồng" & TTAN: P.I.Tchaikovsky & Hồ Thiên Nga',
    disciplines: ['Hát', 'Thường thức âm nhạc'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Triệu đóa hoa hồng (Nhạc Nga, Lời Việt) & Vở ballet Hồ Thiên Nga',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng La thứ nồng nàn',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát đúng chất tự sự, sâu lắng của ca khúc nổi tiếng thế giới Triệu đóa hoa hồng.',
      'Tìm hiểu thiên tài âm nhạc Nga P.I.Tchaikovsky và kiệt tác ballet Hồ Thiên Nga.',
    ],
    equipmentRecommended: ['Chân dung Tchaikovsky, đàn Organ, video vũ kịch ballet Hồ Thiên Nga.'],
    activityDetails: {
      act1Desc: 'Xem điệu múa uyển chuyển của vũ công ballet trên nền nhạc du dương Hồ Thiên Nga.',
      act2Desc: 'Học hát bài Triệu đóa hoa hồng; tìm hiểu cuộc đời và nghệ thuật giao hưởng của Tchaikovsky.',
      act3Desc: 'Hát tốp ca nồng nàn, sâu lắng; biểu diễn cảm xúc trước lớp.',
      act4Desc: 'Mở rộng chân trời hiểu biết nghệ thuật thế giới; dặn dò chuẩn bị dự án tốt nghiệp.',
    },
  },
  {
    topicNumber: 8,
    topicTitle: 'Chủ đề 8: Khúc hoan ca tốt nghiệp',
    lessonName: 'Tiết 29: Học hát bài "Tạm biệt mái trường THCS" & Báo cáo dự án âm nhạc tốt nghiệp',
    disciplines: ['Hát', 'Đọc nhạc', 'Nhạc cụ'],
    semester: 'Học kỳ II',
    songOrRepertoire: 'Tạm biệt mái trường THCS & Tổng kết 4 năm học',
    musicalKeyOrMeter: 'Nhịp 2/4 · Giọng Đô trưởng bồi hồi xúc động',
    durationPeriods: 2,
    learningOutcomes: [
      'Hát chan chứa tình thầy trò, bè bạn trước giờ chia tay 4 năm THCS bước sang cấp 3.',
      'Hoàn thành xuất sắc dự án báo cáo tổng kết 4 năm học âm nhạc cấp THCS.',
    ],
    equipmentRecommended: ['Sân khấu lớp học, đàn Organ, kỷ yếu ảnh 4 năm THCS Long Hồ.'],
    activityDetails: {
      act1Desc: 'Chiếu video clip kỷ niệm 4 năm từ ngày bỡ ngỡ vào lớp 6 đến khi trưởng thành lớp 9.',
      act2Desc: 'Học hát bài Tạm biệt mái trường THCS; các tổ chuẩn bị tiết mục tri ân thầy cô.',
      act3Desc: 'Báo cáo tổng kết dự án âm nhạc tốt nghiệp THCS: biểu diễn hát múa, hòa tấu kèn phím.',
      act4Desc: 'Cô giáo Duyên Thanh trao lời chúc thi đỗ nguyện vọng 1 vào lớp 10 THPT cho cả lớp.',
    },
  },
];

// Helper to convert topics list to lessons array
function createLessonsForGrade(
  grade: 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9',
  metas: TopicRawMeta[]
): MusicTextbookLesson[] {
  return metas.map((m) => ({
    id: `kntt-${grade.replace('Lớp ', '')}-t${m.topicNumber}`,
    topicNumber: m.topicNumber,
    topicTitle: m.topicTitle,
    lessonName: m.lessonName,
    disciplines: m.disciplines,
    grade,
    bookSeries: 'Kết nối tri thức với cuộc sống',
    semester: m.semester,
    songOrRepertoire: m.songOrRepertoire,
    musicalKeyOrMeter: m.musicalKeyOrMeter,
    durationPeriods: m.durationPeriods,
    learningOutcomes: m.learningOutcomes,
    equipmentRecommended: m.equipmentRecommended,
    khbdPreset: buildKhbd(grade, m),
  }));
}

export const musicTextbookLibraryData: MusicTextbookBook[] = [
  {
    id: 'kntt-music-6',
    grade: 'Lớp 6',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    title: 'Sách giáo khoa Âm nhạc 6 – Kết nối tri thức với cuộc sống',
    authors: 'Hoàng Long, Đỗ Thị Minh Chính (Tổng Chủ biên), Đặng Châu Anh...',
    publisher: 'Nhà xuất bản Giáo dục Việt Nam',
    coverGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    topicsCount: 8,
    lessons: createLessonsForGrade('Lớp 6', grade6TopicsMeta),
  },
  {
    id: 'kntt-music-7',
    grade: 'Lớp 7',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    title: 'Sách giáo khoa Âm nhạc 7 – Kết nối tri thức với cuộc sống',
    authors: 'Hoàng Long, Đỗ Thị Minh Chính (Tổng Chủ biên), Nguyễn Thị Nga, Phạm Đình Thắng...',
    publisher: 'Nhà xuất bản Giáo dục Việt Nam',
    coverGradient: 'from-blue-600 via-indigo-600 to-sky-700',
    topicsCount: 8,
    lessons: createLessonsForGrade('Lớp 7', grade7TopicsMeta),
  },
  {
    id: 'kntt-music-8',
    grade: 'Lớp 8',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    title: 'Sách giáo khoa Âm nhạc 8 – Kết nối tri thức với cuộc sống',
    authors: 'Hoàng Long, Đỗ Thị Minh Chính (Tổng Chủ biên), Phạm Đình Thắng...',
    publisher: 'Nhà xuất bản Giáo dục Việt Nam',
    coverGradient: 'from-purple-600 via-violet-600 to-indigo-800',
    topicsCount: 8,
    lessons: createLessonsForGrade('Lớp 8', grade8TopicsMeta),
  },
  {
    id: 'kntt-music-9',
    grade: 'Lớp 9',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    title: 'Sách giáo khoa Âm nhạc 9 – Kết nối tri thức với cuộc sống',
    authors: 'Hoàng Long, Đỗ Thị Minh Chính (Tổng Chủ biên), Nguyễn Thị Nga...',
    publisher: 'Nhà xuất bản Giáo dục Việt Nam',
    coverGradient: 'from-amber-600 via-orange-600 to-red-700',
    topicsCount: 8,
    lessons: createLessonsForGrade('Lớp 9', grade9TopicsMeta),
  },
];

export const allMusicLessons: MusicTextbookLesson[] = musicTextbookLibraryData.flatMap((b) => b.lessons);

export function getMusicLessonById(id: string): MusicTextbookLesson | undefined {
  return allMusicLessons.find((l) => l.id === id);
}

export function getMusicLessonsByGrade(grade: 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9'): MusicTextbookLesson[] {
  const book = musicTextbookLibraryData.find((b) => b.grade === grade);
  return book ? book.lessons : [];
}
