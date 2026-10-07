/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Additional Subject Templates: Physics 10, Chemistry 10
 */

import { ProjectState, defaultTeacherProfile } from '../types/eduharness';

export const physicsGrade10Template: ProjectState = {
  version: "1.0-CV7991-CV5512",
  updatedAt: new Date().toISOString(),
  activeModule: "khbd",
  teacherProfile: {
    ...defaultTeacherProfile,
    subject: "Vật lí",
    department: "TỔ VẬT LÍ - CÔNG NGHỆ"
  },
  khbd: {
    schoolName: "TRƯỜNG THPT CHUYÊN NGUYỄN HUỆ",
    department: "TỔ VẬT LÍ - CÔNG NGHỆ",
    teacherName: "TRẦN THỊ HƯƠNG",
    subject: "Vật lí",
    grade: "Lớp 10",
    lessonTitle: "BÀI 10: BA ĐỊNH LUẬT NEWTON VỀ CHUYỂN ĐỘNG",
    durationPeriods: 2,
    semester: "Học kỳ I",
    academicYear: "2024 - 2025",
    objectives: {
      knowledge: [
        "Phát biểu được định luật I, định luật II và định luật III Newton.",
        "Viết được hệ thức vectơ F→ = m.a→ và F12→ = -F21→.",
        "Nêu được quán tính là gì và lấy ví dụ về quán tính trong đời sống và an toàn giao thông."
      ],
      competencies: {
        general: [
          "Tự chủ và tự học: Tự đọc tài liệu và phân tích video thí nghiệm đệm khí.",
          "Giao tiếp và hợp tác: Làm việc nhóm thực hành đo gia tốc khi lực tác dụng thay đổi."
        ],
        subject: [
          "Năng lực tìm hiểu thế giới tự nhiên dưới góc độ vật lí: Thiết kế phương án thực nghiệm kiểm chứng định luật II Newton.",
          "Năng lực vận dụng kiến thức vật lí: Giải thích hiện tượng thắt dây an toàn khi xe phanh gấp."
        ]
      },
      qualities: [
        "Trách nhiệm: Nâng cao ý thức chấp hành an toàn giao thông đường bộ."
      ]
    },
    equipment: {
      teacher: ["Bộ thí nghiệm máng đệm khí, cảm biến quang điện, đồng hồ đo thời gian hiện số, slide mô phỏng."],
      students: ["SGK Vật lí 10 Kết nối tri thức, phiếu học tập số 1, thước dây."]
    },
    activities: [
      {
        id: "p-act-1",
        code: "HD1",
        title: "Hoạt động 1: Mở đầu / Khởi động (Tình huống phanh xe đột ngột)",
        timeMinutes: 6,
        objective: "Kích thích tư duy: Tại sao khi xe buýt phanh gấp hành khách lại bị ngã dúi về phía trước?",
        content: "Học sinh xem đoạn clip 30 giây mô phỏng va chạm giao thông của xe ô tô khi không cài dây an toàn.",
        product: "Câu trả lời của học sinh: Do hành khách có xu hướng bảo toàn vận tốc chuyển động ban đầu.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Chiếu video clip tình huống phanh xe, đặt câu hỏi khởi động cho cả lớp.",
            studentAction: "Quan sát clip, thảo luận nhanh với bạn cùng bàn."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Gợi ý: 'Lực nào tác dụng lên xe? Có lực nào đẩy người về phía trước không?'.",
            studentAction: "Suy ngẫm và phát hiện: Không có lực đẩy người tới trước mà do người đang chạy theo vận tốc cũ."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Mời 1 học sinh giải thích hiện tượng theo ngôn ngữ đời thường.",
            studentAction: "Học sinh phát biểu: 'Do người giữ nguyên quán tính chạy tiếp'."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Dẫn dắt vào bài: 'Hiện tượng này được nhà bác học Isaac Newton khái quát thành Định luật I Newton'.",
            studentAction: "Ghi bài mới vào vở."
          }
        ]
      },
      {
        id: "p-act-2",
        code: "HD2",
        title: "Hoạt động 2: Hình thành kiến thức mới (Nghiên cứu 3 định luật Newton)",
        timeMinutes: 22,
        objective: "Hình thành nội dung 3 định luật, khái niệm quán tính, khối lượng và lực tương hỗ.",
        content: "Nghiên cứu SGK theo 3 trạm: Trạm 1 (Định luật I & Quán tính), Trạm 2 (Định luật II: F = m.a), Trạm 3 (Định luật III: Tác dụng và phản tác dụng).",
        product: "Sơ đồ tư duy tổng hợp 3 định luật Newton của 3 nhóm chuyên gia.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Giao nhiệm vụ theo kĩ thuật mảnh ghép (Jigsaw), phát phiếu học tập cho 6 nhóm.",
            studentAction: "Các thành viên nhóm chuyên gia tập trung hoàn thành trạm nội dung của mình."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Theo dõi, hướng dẫn cách phân tích các đại lượng vectơ trong công thức F→ = m.a→.",
            studentAction: "Tranh luận về việc cặp lực trực đối trong định luật III có triệt tiêu nhau không."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Đổi nhóm mảnh ghép, từng thành viên thuyết minh cho nhóm mới.",
            studentAction: "Lần lượt báo cáo và đặt câu hỏi cho bạn cùng nhóm."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Chốt lại 3 định luật và lưu ý then chốt: Lực và phản lực cùng phương, ngược chiều, cùng độ lớn nhưng đặt vào HAI VẬT KHÁC NHAU.",
            studentAction: "Ghi nhớ và đóng khung kiến thức cốt lõi."
          }
        ]
      },
      {
        id: "p-act-3",
        code: "HD3",
        title: "Hoạt động 3: Luyện tập (Giải bài tập động lực học chất điểm)",
        timeMinutes: 12,
        objective: "Vận dụng công thức a = F / m để tính gia tốc, quãng đường, thời gian chuyển động biến đổi đều.",
        content: "Giải bài toán: Một ô tô khối lượng 1.2 tấn đang chạy với vận tốc 72 km/h thì hãm phanh với lực hãm 3600 N. Tính gia tốc và quãng đường xe đi thêm trước khi dừng hẳn.",
        product: "Bài giải: v0 = 20 m/s, m = 1200 kg; a = -3 m/s²; s = 66.67 m.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Giao bài tập lên bảng, yêu cầu đổi đơn vị chuẩn SI trước khi tính.",
            studentAction: "Tóm tắt đề bài, đổi 72 km/h = 20 m/s, 1.2 tấn = 1200 kg."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Nhắc nhở lực hãm ngược chiều chuyển động nên F = -3600 N.",
            studentAction: "Tính a = F/m = -3600 / 1200 = -3 m/s²; s = (v² - v0²) / (2a) = (0 - 400)/(-6) = 66.67 m."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Gọi 1 học sinh lên bảng trình bày, cả lớp đối chiếu kết quả.",
            studentAction: "Học sinh nhận xét và ghi lời giải hoàn chỉnh."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Đánh giá kĩ năng giải bài tập của học sinh, nhấn mạnh dấu của các đại lượng vectơ.",
            studentAction: "Khắc sâu kĩ năng chọn hệ quy chiếu và chiều dương."
          }
        ]
      },
      {
        id: "p-act-4",
        code: "HD4",
        title: "Hoạt động 4: Vận dụng (Thiết kế đệm giảm chấn và an toàn xe hơi)",
        timeMinutes: 5,
        objective: "Hiểu tác dụng của túi khí (airbag) và vùng biến dạng mềm đầu xe dựa trên định luật II và xung lượng của lực.",
        content: "Học sinh giải thích: Vì sao các dòng xe ô tô hiện đại lại thiết kế phần đầu xe dễ móp méo khi va chạm mà không làm bằng thép siêu cứng?",
        product: "Bản phân tích: Kéo dài thời gian va chạm Δt giúp giảm độ lớn lực va đập F = m.Δv / Δt tác dụng lên người lái.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Nêu câu hỏi kĩ thuật chế tạo ô tô.",
            studentAction: "Tiếp nhận câu hỏi, suy nghĩ mối liên hệ giữa thời gian va chạm và lực cản."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Gợi mở công thức liên hệ F.Δt = Δp.",
            studentAction: "Phân tích công thức và đưa ra câu trả lời logic."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Mời học sinh phát biểu, cả lớp lắng nghe.",
            studentAction: "Học sinh giải thích rõ cơ chế giảm chấn an toàn."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Tổng kết bài học, khen ngợi tinh thần sáng tạo, giao bài tập về nhà.",
            studentAction: "Lắng nghe dặn dò."
          }
        ]
      }
    ]
  },
  slides: [
    {
      id: "p-slide-1",
      slideNumber: 1,
      title: "BA ĐỊNH LUẬT NEWTON VỀ CHUYỂN ĐỘNG",
      subtitle: "Vật lí 10 - Chương trình GDPT 2018 (CV 5512)",
      category: "intro",
      bullets: [
        "Trường THPT Chuyên Nguyễn Huệ - Tổ Vật lí",
        "Giáo viên giảng dạy: Cô Trần Thị Hương",
        "Chủ đề trọng tâm: Động lực học chất điểm",
        "Thời lượng: 2 tiết học tích cực"
      ],
      highlightQuote: "Nếu tôi nhìn xa hơn những người khác, đó là vì tôi đứng trên vai những người khổng lồ. — Isaac Newton",
      teacherNotes: "Khởi động với slide mở đầu trang trọng, kiểm tra đồ dùng học tập của các nhóm.",
      estimatedMinutes: 2,
      keyVisualIcon: "Zap"
    },
    {
      id: "p-slide-2",
      slideNumber: 2,
      title: "MỤC TIÊU BÀI HỌC VẬT LÍ CẦN ĐẠT",
      subtitle: "Phát triển năng lực nghiên cứu khoa học thực nghiệm",
      category: "objective",
      bullets: [
        "1. Nắm vững định luật I: Xu hướng bảo toàn trạng thái chuyển động (Quán tính).",
        "2. Nắm vững định luật II: Gia tốc tỉ lệ thuận với lực và tỉ lệ nghịch với khối lượng (F = m.a).",
        "3. Nắm vững định luật III: Bản chất tương hỗ của các cặp lực trực đối (F12 = -F21).",
        "4. Ứng dụng: Giải thích cơ chế an toàn dây đai và túi khí trên xe hơi."
      ],
      highlightQuote: "Lực không phải là nguyên nhân duy trì chuyển động, mà là nguyên nhân làm thay đổi chuyển động.",
      teacherNotes: "Chiếu mục tiêu rõ ràng giúp học sinh định hình các mốc kiến thức cần chinh phục.",
      estimatedMinutes: 2,
      keyVisualIcon: "Target"
    },
    {
      id: "p-slide-3",
      slideNumber: 3,
      title: "HOẠT ĐỘNG 1: KHỞI ĐỘNG - VÌ SAO BỊ NGÃ DÚI?",
      subtitle: "Tình huống va chạm xe và vai trò của dây an toàn",
      category: "activity1",
      bullets: [
        "Thí nghiệm tình huống: Xe buýt đột ngột đạp phanh gấp.",
        "Hiện tượng quan sát: Mọi hành khách đều bị xô dạt mạnh về phía trước.",
        "Câu hỏi khám phá: Liệu có 'bàn tay vô hình' nào đẩy chúng ta không?",
        "Bí mật khoa học: Trạng thái quán tính của vật chất!"
      ],
      highlightQuote: "Vật chất luôn có tính ì tự nhiên muốn duy trì vận tốc vốn có của nó.",
      teacherNotes: "Mời học sinh chia sẻ trải nghiệm thực tế khi đi xe buýt hoặc ô tô.",
      estimatedMinutes: 6,
      keyVisualIcon: "Sparkles"
    },
    {
      id: "p-slide-4",
      slideNumber: 4,
      title: "HOẠT ĐỘNG 2: BẢN CHẤT 3 ĐỊNH LUẬT NEWTON",
      subtitle: "Trụ cột của Cơ học cổ điển",
      category: "activity2",
      bullets: [
        "Định luật I: Vật cô lập hoặc hợp lực bằng 0 thì đứng yên hoặc chuyển động thẳng đều mãi mãi.",
        "Định luật II: Vectơ gia tốc a→ = F→ / m <=> F→ = m.a→ (1 N = 1 kg.m/s²).",
        "Định luật III: Trong mọi tương tác, F12→ = -F21→ (Cùng độ lớn, ngược hướng, KHÔNG triệt tiêu nhau).",
        "Lưu ý cốt tử: Cặp lực trực đối đặt lên 2 vật khác nhau nên không bao giờ triệt tiêu!"
      ],
      highlightQuote: "Khi bạn đẩy vào bức tường, bức tường cũng đang đẩy lại bạn một lực y hệt.",
      teacherNotes: "Nhấn mạnh sâu điểm khác nhau giữa hai lực cân bằng và hai lực trực đối.",
      estimatedMinutes: 22,
      keyVisualIcon: "BookOpen"
    },
    {
      id: "p-slide-5",
      slideNumber: 5,
      title: "HOẠT ĐỘNG 3: LUYỆN TẬP TÍNH TOÁN LỰC & GIA TỐC",
      subtitle: "Vận dụng phương trình F = m.a vào chuyển động biến đổi đều",
      category: "activity3",
      bullets: [
        "Bài toán: Xe ô tô 1.2 tấn đang chạy 72 km/h (20 m/s), phanh với lực hãm 3600 N.",
        "Gia tốc chuyển động: a = -3600 / 1200 = -3 m/s² (chuyển động chậm dần đều).",
        "Quãng đường hãm phanh: s = (0 - 20²) / (2 * (-3)) ≈ 66.7 mét.",
        "Quy tắc vàng: Luôn vẽ trục toạ độ, xác định chiều dương và dấu của vectơ lực."
      ],
      highlightQuote: "Tính toán chính xác cứu sống sinh mạng trong thiết kế khoảng cách an toàn.",
      teacherNotes: "Cho học sinh 3 phút tự tính, kiểm tra chéo kết quả trên vở.",
      estimatedMinutes: 12,
      keyVisualIcon: "CheckCircle"
    },
    {
      id: "p-slide-6",
      slideNumber: 6,
      title: "HOẠT ĐỘNG 4: VẬN DỤNG & CÔNG NGHỆ Ô TÔ",
      subtitle: "Vùng biến dạng hấp thụ xung lực và túi khí",
      category: "activity4",
      bullets: [
        "Nguyên lí túi khí: Kéo dài thời gian tương tác Δt làm giảm áp lực cực đại lên cơ thể người.",
        "Vùng đầu xe dễ móp méo: Chủ động hấp thụ cơ năng va chạm, bảo vệ cabin hành khách.",
        "Thông điệp giao thông: Luôn thắt dây an toàn mọi lúc mọi nơi!",
        "Nhiệm vụ về nhà: Bài tập SGK trang 45 và làm mô hình rơi an toàn cho quả trứng."
      ],
      highlightQuote: "Khoa học sinh ra để bảo vệ sự sống và làm cuộc sống văn minh hơn.",
      teacherNotes: "Gợi ý cuộc thi STEM chế tạo khoang bảo vệ quả trứng thả từ tầng 2.",
      estimatedMinutes: 5,
      keyVisualIcon: "Award"
    }
  ],
  exam: {
    title: "ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KỲ I - VẬT LÍ 10",
    examType: "Kiểm tra giữa học kỳ",
    subject: "Vật lí",
    grade: "Lớp 10",
    timeAllowedMinutes: 45,
    examCode: "VATLI10-GK1-7991",
    totalScore: 10.0,
    matrix: [
      {
        id: "p-mat-1",
        topic: "Chuyển động thẳng biến đổi đều",
        subTopic: "Vận tốc, gia tốc, đồ thị chuyển động",
        part1_mcq: { know: 4, understand: 2, apply: 0 },
        part2_trueFalse: { know: 1, understand: 1, apply: 0 },
        part3_shortAns: { know: 1, understand: 1, apply: 0 },
        part4_essay: { know: 0, understand: 1, apply: 0 },
        scoreAllocation: 3.5
      },
      {
        id: "p-mat-2",
        topic: "Ba định luật Newton",
        subTopic: "Định luật I, II, III Newton, quán tính, lực trực đối",
        part1_mcq: { know: 2, understand: 2, apply: 2 },
        part2_trueFalse: { know: 0, understand: 1, apply: 1 },
        part3_shortAns: { know: 0, understand: 1, apply: 1 },
        part4_essay: { know: 0, understand: 0, apply: 1 },
        scoreAllocation: 4.0
      },
      {
        id: "p-mat-3",
        topic: "Một số lực trong thực tiễn",
        subTopic: "Trọng lực, lực ma sát, lực căng dây",
        part1_mcq: { know: 1, understand: 1, apply: 0 },
        part2_trueFalse: { know: 0, understand: 0, apply: 1 },
        part3_shortAns: { know: 0, understand: 0, apply: 1 },
        part4_essay: { know: 0, understand: 0, apply: 1 },
        scoreAllocation: 2.5
      }
    ],
    specifications: [
      {
        id: "p-spec-1",
        topic: "Chuyển động thẳng biến đổi đều",
        subTopic: "Gia tốc và phương trình",
        learningOutcomes: {
          know: ["Nêu được định nghĩa gia tốc, đơn vị của gia tốc m/s²."],
          understand: ["Phân biệt được chuyển động nhanh dần đều và chậm dần đều qua dấu của tích a.v."],
          apply: ["Tính được quãng đường và thời gian trong chuyển động biến đổi đều."]
        },
        part1Count: { know: 4, understand: 2, apply: 0 },
        part2Count: { know: 1, understand: 1, apply: 0 },
        part3Count: { know: 1, understand: 1, apply: 0 },
        part4Count: { know: 0, understand: 1, apply: 0 },
        competencyCode: "NL1: Nhận thức vật lí"
      },
      {
        id: "p-spec-2",
        topic: "Ba định luật Newton",
        subTopic: "Khái niệm lực, khối lượng, quán tính",
        learningOutcomes: {
          know: ["Phát biểu được nội dung 3 định luật Newton."],
          understand: ["Giải thích được hiện tượng quán tính và bản chất của cặp lực tương hỗ."],
          apply: ["Vận dụng định luật II Newton tìm gia tốc dưới tác dụng của nhiều lực."]
        },
        part1Count: { know: 2, understand: 2, apply: 2 },
        part2Count: { know: 0, understand: 1, apply: 1 },
        part3Count: { know: 0, understand: 1, apply: 1 },
        part4Count: { know: 0, understand: 0, apply: 1 },
        competencyCode: "NL2: Tìm hiểu thế giới tự nhiên"
      },
      {
        id: "p-spec-3",
        topic: "Một số lực thường gặp",
        subTopic: "Trọng lực, ma sát",
        learningOutcomes: {
          know: ["Nhận biết công thức trọng lực P = m.g."],
          understand: ["Hiểu vai trò có ích và có hại của lực ma sát trong đời sống."],
          apply: ["Tính lực cản trong các chuyển động thực tế."]
        },
        part1Count: { know: 1, understand: 1, apply: 0 },
        part2Count: { know: 0, understand: 0, apply: 1 },
        part3Count: { know: 0, understand: 0, apply: 1 },
        part4Count: { know: 0, understand: 0, apply: 1 },
        competencyCode: "NL3: Vận dụng kiến thức, kĩ năng đã học"
      }
    ],
    part1_mcq: [
      {
        id: "pmcq-1",
        number: 1,
        question: "Đơn vị chuẩn của gia tốc trong hệ đơn vị SI là:",
        options: { A: "m/s", B: "m/s²", C: "km/h", D: "kg.m/s" },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Gia tốc đo bằng độ biến thiên vận tốc trong một đơn vị thời gian, đơn vị là mét trên giây bình phương (m/s²).",
        point: 0.25
      },
      {
        id: "pmcq-2",
        number: 2,
        question: "Theo định luật I Newton, một vật sẽ tiếp tục chuyển động thẳng đều khi:",
        options: {
          A: "Hợp lực tác dụng lên vật không đổi.",
          B: "Hợp lực tác dụng lên vật bằng 0.",
          C: "Vật chỉ chịu tác dụng của trọng lực.",
          D: "Lực tác dụng cùng hướng chuyển động."
        },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Nếu một vật không chịu tác dụng của lực nào hoặc chịu các lực có hợp lực bằng 0 thì vật đang chuyển động sẽ tiếp tục chuyển động thẳng đều.",
        point: 0.25
      },
      {
        id: "pmcq-3",
        number: 3,
        question: "Đại lượng đặc trưng cho mức quán tính của một vật là:",
        options: { A: "Trọng lượng", B: "Khối lượng", C: "Vận tốc", D: "Thể tích" },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Khối lượng là đại lượng đặc trưng cho mức quán tính của vật; vật có khối lượng càng lớn thì mức quán tính càng lớn.",
        point: 0.25
      },
      {
        id: "pmcq-4",
        number: 4,
        question: "Hệ thức đúng của Định luật II Newton dạng vectơ là:",
        options: { A: "F→ = m / a→", B: "a→ = m . F→", C: "F→ = m . a→", D: "m = F→ . a→" },
        correctAnswer: "C",
        cognitiveLevel: "know",
        explanation: "Hệ thức Định luật II Newton: F→ = m.a→.",
        point: 0.25
      },
      {
        id: "pmcq-5",
        number: 5,
        question: "Cặp lực tác dụng và phản lực trong Định luật III Newton có đặc điểm nào sau đây?",
        options: {
          A: "Đặt vào cùng một vật.",
          B: "Cùng phương, ngược chiều và cùng độ lớn, đặt vào hai vật khác nhau.",
          C: "Triệt tiêu lẫn nhau tạo nên trạng thái cân bằng.",
          D: "Xuất hiện không đồng thời."
        },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Lực và phản lực luôn cùng phương, ngược chiều, cùng độ lớn và đặt vào hai vật tương tác khác nhau.",
        point: 0.25
      },
      {
        id: "pmcq-6",
        number: 6,
        question: "Trọng lực tác dụng lên vật có khối lượng m ở nơi có gia tốc rơi tự do g được xác định bởi:",
        options: { A: "P = m / g", B: "P = m . g", C: "P = g / m", D: "P = 1/2 m . g²" },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Công thức độ lớn trọng lực: P = m.g.",
        point: 0.25
      },
      {
        id: "pmcq-7",
        number: 7,
        question: "Một lực 20 N tác dụng vào vật khối lượng 5 kg làm vật thu được gia tốc bằng:",
        options: { A: "4 m/s²", B: "100 m/s²", C: "0.25 m/s²", D: "15 m/s²" },
        correctAnswer: "A",
        cognitiveLevel: "understand",
        explanation: "Áp dụng định luật II Newton: a = F / m = 20 / 5 = 4 m/s².",
        point: 0.25
      },
      {
        id: "pmcq-8",
        number: 8,
        question: "Khi xe đang chạy thẳng đều về phía trước, tài xế đột ngột rẽ nhanh sang trái. Hành khách trên xe sẽ bị nghiêng về phía nào?",
        options: { A: "Nghiêng sang trái", B: "Nghiêng sang phải", C: "Ngả người ra sau", D: "Chúi người về trước" },
        correctAnswer: "B",
        cognitiveLevel: "understand",
        explanation: "Do quán tính, hành khách có xu hướng tiếp tục chuyển động theo hướng thẳng ban đầu, do đó bị nghiêng sang phía phải.",
        point: 0.25
      },
      {
        id: "pmcq-9",
        number: 9,
        question: "Một vật chuyển động chậm dần đều với vận tốc ban đầu v0 = 10 m/s và gia tốc a = -2 m/s². Thời gian để vật dừng hẳn là:",
        options: { A: "2 giây", B: "5 giây", C: "10 giây", D: "20 giây" },
        correctAnswer: "B",
        cognitiveLevel: "understand",
        explanation: "Khi vật dừng hẳn v = 0 => 0 = 10 - 2t => t = 5 s.",
        point: 0.25
      },
      {
        id: "pmcq-10",
        number: 10,
        question: "Một quả bóng đập mạnh vào tường rồi bật ngược trở lại. Lực mà tường tác dụng lên quả bóng so với lực mà quả bóng tác dụng lên tường có:",
        options: {
          A: "Độ lớn lớn hơn.",
          B: "Độ lớn nhỏ hơn.",
          C: "Độ lớn bằng nhau.",
          D: "Thời gian tác dụng dài hơn."
        },
        correctAnswer: "C",
        cognitiveLevel: "understand",
        explanation: "Theo định luật III Newton, hai lực luôn có độ lớn bằng nhau tuyệt đối.",
        point: 0.25
      },
      {
        id: "pmcq-11",
        number: 11,
        question: "Một vật có khối lượng 2 kg được kéo trượt trên sàn nằm ngang bởi lực kéo F = 10 N song song với sàn. Biết hệ số ma sát μ = 0.2, lấy g = 10 m/s². Gia tốc của vật là:",
        options: { A: "3 m/s²", B: "5 m/s²", C: "1 m/s²", D: "2 m/s²" },
        correctAnswer: "A",
        cognitiveLevel: "apply",
        explanation: "Fms = μ.m.g = 0.2 * 2 * 10 = 4 N. Gia tốc a = (F - Fms) / m = (10 - 4) / 2 = 3 m/s².",
        point: 0.25
      },
      {
        id: "pmcq-12",
        number: 12,
        question: "Một thang máy khối lượng 800 kg đang đi lên nhanh dần đều với gia tốc 2 m/s². Lấy g = 10 m/s². Lực căng của dây cáp kéo thang máy là:",
        options: { A: "6400 N", B: "8000 N", C: "9600 N", D: "1600 N" },
        correctAnswer: "C",
        cognitiveLevel: "apply",
        explanation: "T - P = m.a => T = m(g + a) = 800 * (10 + 2) = 9600 N.",
        point: 0.25
      }
    ],
    part2_trueFalse: [
      {
        id: "ptf-1",
        number: 1,
        contextPrompt: "Xét một ô tô khối lượng m = 1000 kg đang chuyển động thẳng đều trên đường nằm ngang với vận tốc 54 km/h (15 m/s). Lấy g = 10 m/s². Xét tính Đúng / Sai của các nhận định:",
        statements: [
          { subId: "a", text: "Trọng lực tác dụng lên xe có độ lớn là 10 000 N.", isCorrect: true, explanation: "Đúng. P = m.g = 1000 * 10 = 10 000 N." },
          { subId: "b", text: "Vì xe đang chạy nên hợp lực tác dụng lên xe có giá trị lớn hơn 0.", isCorrect: false, explanation: "Sai. Xe chuyển động thẳng đều nên gia tốc a = 0, theo định luật I Newton hợp lực tác dụng lên xe bằng 0." },
          { subId: "c", text: "Nếu lực cản của mặt đường và không khí là 800 N thì lực phát động của động cơ là 800 N.", isCorrect: true, explanation: "Đúng. Do Fkéo - Fcản = m.a = 0 nên Fkéo = Fcản = 800 N." },
          { subId: "d", text: "Nếu tắt máy đột ngột, xe sẽ dừng lại ngay lập tức do không còn lực phát động.", isCorrect: false, explanation: "Sai. Do quán tính và ma sát, xe sẽ chuyển động chậm dần đều một quãng đường rồi mới dừng lại." }
        ],
        cognitiveLevel: "understand",
        point: 1.0
      },
      {
        id: "ptf-2",
        number: 2,
        contextPrompt: "Hai học sinh A (khối lượng 40 kg) và B (khối lượng 60 kg) đi giày trượt băng đứng đối diện nhau trên mặt băng phẳng không ma sát. Học sinh A dùng tay đẩy mạnh học sinh B một lực 120 N. Xét tính Đúng / Sai:",
        statements: [
          { subId: "a", text: "Lực mà học sinh B tác dụng ngược lại lên học sinh A cũng có độ lớn đúng bằng 120 N.", isCorrect: true, explanation: "Đúng. Theo định luật III Newton, FAB = FBA = 120 N." },
          { subId: "b", text: "Gia tốc của hai học sinh trong thời gian tương tác là như nhau.", isCorrect: false, explanation: "Sai. aA = F/mA = 120/40 = 3 m/s²; aB = F/mB = 120/60 = 2 m/s²." },
          { subId: "c", text: "Hai học sinh sẽ cùng chuyển động lùi xa nhau về hai hướng ngược nhau.", isCorrect: true, explanation: "Đúng. Lực tương hỗ ngược chiều đẩy hai người về hai phía ngược nhau." },
          { subId: "d", text: "Sau khi rời tay nhau, học sinh B sẽ trượt với vận tốc lớn hơn học sinh A.", isCorrect: false, explanation: "Sai. Học sinh A có khối lượng bé hơn nên thu gia tốc lớn hơn, do đó đạt vận tốc lớn hơn." }
        ],
        cognitiveLevel: "apply",
        point: 1.0
      }
    ],
    part3_shortAns: [
      {
        id: "psa-1",
        number: 1,
        question: "Một xe tải có khối lượng 3 tấn đang tăng tốc với gia tốc 1.5 m/s². Độ lớn hợp lực tác dụng lên xe là bao nhiêu Newton?",
        correctAnswer: "4500",
        cognitiveLevel: "know",
        explanation: "F = m.a = 3000 kg * 1.5 m/s² = 4500 N.",
        point: 0.5
      },
      {
        id: "psa-2",
        number: 2,
        question: "Một vật có khối lượng 4 kg đang nằm yên thì chịu tác dụng của lực F = 8 N trong thời gian 5 giây. Vận tốc của vật ở cuối giây thứ 5 là bao nhiêu m/s?",
        correctAnswer: "10",
        cognitiveLevel: "understand",
        explanation: "a = F/m = 8/4 = 2 m/s². v = v0 + at = 0 + 2*5 = 10 m/s.",
        point: 0.5
      },
      {
        id: "psa-3",
        number: 3,
        question: "Một khẩu súng có khối lượng 4 kg bắn một viên đạn 20 g (0.02 kg) với vận tốc 600 m/s. Vận tốc giật lùi của súng ngay sau khi bắn có độ lớn bằng bao nhiêu m/s?",
        correctAnswer: "3",
        cognitiveLevel: "understand",
        explanation: "Theo định luật bảo toàn động lượng: M.v_súng = m.v_đạn => v_súng = (0.02 * 600) / 4 = 3 m/s.",
        point: 0.5
      },
      {
        id: "psa-4",
        number: 4,
        question: "Một ô tô đang chạy với vận tốc 20 m/s thì hãm phanh chuyển động chậm dần đều với gia tốc có độ lớn 4 m/s². Quãng đường ô tô đi được đến khi dừng hẳn là bao nhiêu mét?",
        correctAnswer: "50",
        cognitiveLevel: "apply",
        explanation: "s = (v² - v0²) / (2a) = (0 - 20²) / (2 * (-4)) = -400 / -8 = 50 m.",
        point: 0.5
      }
    ],
    part4_essay: [
      {
        id: "pe-1",
        number: 1,
        question: "Một vật khối lượng m = 5 kg được kéo trượt trên sàn nằm ngang dưới tác dụng của lực kéo F = 25 N hợp với phương ngang một góc α = 30°. Biết hệ số ma sát giữa vật và sàn là μ = 0.2. Lấy g = 10 m/s².\na) Vẽ hình biểu diễn các lực tác dụng lên vật và thiết lập biểu thức tính gia tốc của vật. (1.0 điểm)\nb) Tính gia tốc của vật và quãng đường vật đi được sau 4 giây xuất phát từ trạng thái nghỉ. (0.5 điểm)",
        cognitiveLevel: "apply",
        maxScore: 1.5,
        sampleAnswer: "a) Các lực tác dụng: Trọng lực P→, phản lực N→, lực kéo F→, lực ma sát Fms→. Chiếu lên trục Oy: N + F.sinα - P = 0 => N = P - F.sinα = m.g - F.sin(30°) = 5*10 - 25*0.5 = 37.5 N. Fms = μ.N = 0.2 * 37.5 = 7.5 N. Chiếu lên trục Ox: F.cosα - Fms = m.a => a = (F.cosα - Fms) / m.\nb) Tính số: a = (25 * cos30° - 7.5) / 5 = (21.65 - 7.5) / 5 = 2.83 m/s². Quãng đường: s = 1/2 a.t² = 1/2 * 2.83 * 4² = 22.64 m.",
        rubrics: [
          { criterion: "Vẽ đúng sơ đồ 4 lực, chiếu lên Oy tìm N = 37.5 N và Fms = 7.5 N", maxScore: 0.75 },
          { criterion: "Viết biểu thức chiếu Ox tìm ra công thức a = (F.cosα - Fms)/m", maxScore: 0.25 },
          { criterion: "Tính đúng gia tốc a ≈ 2.83 m/s² và quãng đường s ≈ 22.64 m", maxScore: 0.5 }
        ]
      },
      {
        id: "pe-2",
        number: 2,
        question: "Dưới góc độ vật lí, hãy phân tích tại sao khi nhảy từ trên cao xuống đất, con người thường có phản xạ chùng chân gập đầu gối? Sử dụng công thức định luật II Newton dưới dạng xung lượng của lực F.Δt = Δp để chứng minh tác dụng bảo vệ xương khớp của động tác này.",
        cognitiveLevel: "apply",
        maxScore: 1.5,
        sampleAnswer: "Khi tiếp đất từ độ cao h, người có vận tốc v chạm đất. Để dừng lại, động lượng biến thiên một lượng xác định: Δp = 0 - m.v = -m.v (không đổi). Theo định luật II Newton: F_tb . Δt = Δp => F_tb = |Δp| / Δt. Động tác chùng chân gập đầu gối giúp kéo dài quãng đường hãm và kéo dài thời gian tiếp đất Δt (thường tăng từ 0.05s lên 0.3s - gấp khoảng 6 lần). Vì Δt tăng lên đáng kể nên độ lớn của lực phản lực trung bình F_tb từ mặt đất tác dụng lên xương khớp và cột sống giảm đi tương ứng khoảng 6 lần, ngăn ngừa gãy xương hoặc chấn thương cột sống nghiêm trọng.",
        rubrics: [
          { criterion: "Nêu được biểu thức xung lượng lực F_tb . Δt = Δp và chỉ ra biến thiên động lượng Δp không đổi", maxScore: 0.5 },
          { criterion: "Phân tích được động tác chùng chân làm tăng thời gian hãm tiếp đất Δt", maxScore: 0.5 },
          { criterion: "Lập luận chỉ ra lực tác dụng F_tb giảm tỷ lệ nghịch với Δt giúp bảo vệ an toàn cơ thể", maxScore: 0.5 }
        ]
      }
    ]
  }
};
