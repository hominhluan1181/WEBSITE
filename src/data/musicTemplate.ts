/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Music Grade 7 Template - Trường THCS Long Hồ
 * Chuẩn Công văn 5512/BGDĐT-GDTrH & Công văn 7991/BGDĐT-GDTrH (17/12/2024)
 */

import { ProjectState, defaultTeacherProfile } from '../types/eduharness';

export const musicGrade7Template: ProjectState = {
  version: "1.0-CV7991-CV5512",
  updatedAt: new Date().toISOString(),
  activeModule: "khbd",
  teacherProfile: { ...defaultTeacherProfile },
  khbd: {
    schoolName: defaultTeacherProfile.school,
    department: defaultTeacherProfile.department,
    teacherName: defaultTeacherProfile.name,
    subject: defaultTeacherProfile.subject,
    grade: "Lớp 7",
    lessonTitle: "CHỦ ĐỀ 1: GIAI ĐIỆU QUÊ HƯƠNG - HÁT BÀI LÍ CÂY ĐA & ĐỌC NHẠC BÀI SỐ 1",
    durationPeriods: 2,
    semester: "Học kỳ I",
    academicYear: defaultTeacherProfile.academicYear,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Học sinh biết tìm kiếm, khai thác học liệu số, tra cứu giai điệu bài hát trên môi trường mạng an toàn; sử dụng thiết bị nghe nhìn hỗ trợ học hát; biết ghi âm phần thể hiện bài hát bằng thiết bị số, chia sẻ sản phẩm thu âm lên nhóm lớp học an toàn (Căn cứ Biên bản thống nhất PPCT môn Âm nhạc 2026-2027).',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên hướng dẫn học sinh quét mã QR / truy cập học liệu số để nghe bài hát mẫu "Lí cây đa", quan sát bản phổ điện tử trên màn hình chiếu.',
      studentAction: 'Học sinh sử dụng thiết bị số (máy tính/máy chiếu bảng tương tác), chủ động nghe giai điệu mẫu và tập hát theo bản phổ số hóa.',
    },
    qpanTopicTitle: 'Chủ đề: Giới thiệu hình ảnh bảo vệ chủ quyền biển, đảo Việt Nam (Phụ lục hướng dẫn GDQP&AN 2026-2027)',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Hiểu vai trò của ngư dân trong phát triển kinh tế biển gắn với bảo vệ chủ quyền biển đảo Tổ quốc; xác định vị trí hai quần đảo Hoàng Sa và Trường Sa trên bản đồ; giáo dục lòng tự hào và ý thức bảo vệ chủ quyền quốc gia.',
    qpanProcessVandun: 'GV cho HS xem video, hình ảnh về hoạt động đánh bắt hải sản của ngư dân gắn với bảo vệ chủ quyền biển, đảo Việt Nam; giới thiệu vị trí hai quần đảo Hoàng Sa và Trường Sa trên bản đồ Việt Nam, nêu ý nghĩa về kinh tế, quốc phòng và an ninh. Giáo dục tình yêu quê hương và ý thức bảo vệ chủ quyền thiêng liêng của Tổ quốc.',
    objectives: {
      knowledge: [
        "Hát đúng giai điệu, lời ca bài hát 'Lí cây đa' (Dân ca quan họ Bắc Ninh), thể hiện được sắc thái vui tươi, trong sáng, dí dỏm.",
        "Biết cách lấy hơi, giữ nhịp, phát âm nhả chữ rõ ràng và thể hiện được các tiếng đệm, tiếng lót đặc trưng của dân ca quan họ.",
        "Đọc đúng cao độ các nốt Đô - Rê - Mi - Son - La và trường độ nốt đen, nốt trắng, nốt móc đơn trong Bài đọc nhạc số 1 (nhịp 2/4)."
      ],
      competencies: {
        general: [
          "Năng lực tự chủ và tự học: Chủ động luyện thanh, tập hát từng câu và luyện đọc nhạc cá nhân trước gương hoặc tại nhà.",
          "Năng lực giao tiếp và hợp tác: Biết phối hợp với các bạn trong tổ/nhóm khi hát bè, gõ đệm theo phách và biểu diễn tốp ca.",
          "Năng lực sáng tạo: Tự tạo động tác vận động cơ thể (Body Percussion) hoặc múa phụ họa đơn giản phù hợp với tính chất âm nhạc."
        ],
        subject: [
          "Năng lực thể hiện âm nhạc: Hát đúng giai điệu và tính chất bài dân ca; đọc nhạc đúng trường độ, cao độ kết hợp gõ phách.",
          "Năng lực cảm thụ và hiểu biết âm nhạc: Cảm nhận được nét duyên dáng, tinh tế của văn hóa Quan họ Bắc Ninh.",
          "Năng lực ứng dụng và sáng tạo âm nhạc: Vận dụng nhạc cụ gõ (song loan, thanh phách, trống nhỏ) gõ đệm cho bài hát."
        ],
        nlsAi: [
          "Lồng ghép Năng lực số (NLS): Học sinh biết tìm kiếm, khai thác học liệu số, tra cứu giai điệu bài hát trên môi trường mạng an toàn; sử dụng thiết bị nghe nhìn hỗ trợ học hát; biết ghi âm phần thể hiện bài hát bằng thiết bị số, chia sẻ sản phẩm thu âm lên nhóm lớp học an toàn (Căn cứ Biên bản thống nhất PPCT môn Âm nhạc 2026-2027)."
        ]
      },
      qualities: [
        "Yêu nước: Trân trọng và có ý thức giữ gìn, bảo tồn các làn điệu dân ca truyền thống của dân tộc Việt Nam.",
        "Nhân ái: Tôn trọng sự khác biệt trong năng khiếu âm nhạc của bạn học, chia sẻ và động viên bạn cùng tiến bộ.",
        "Chăm chỉ: Tích cực tham gia các hoạt động luyện tập hát và đọc nhạc của lớp."
      ],
      qpanIntegration: [
        "Tích hợp Quốc phòng và An ninh (QPAN): Hiểu vai trò của ngư dân trong phát triển kinh tế biển gắn với bảo vệ chủ quyền biển đảo Tổ quốc; xác định vị trí hai quần đảo Hoàng Sa và Trường Sa trên bản đồ; bồi dưỡng lòng yêu nước, ý thức bảo vệ chủ quyền quốc gia và giữ gìn môi trường biển (Căn cứ Phụ lục hướng dẫn GDQP&AN môn Âm nhạc 2026-2027)."
      ]
    },
    equipment: {
      teacher: [
        "Đàn phím điện tử (Keyboard/Organ), máy tính, loa phát âm thanh, video clip liền anh liền chị hát quan họ bên gốc đa đình làng.",
        "Nhạc cụ gõ: Thanh phách, song loan, trống nhỏ, tambourine.",
        "Bản nhạc bài hát 'Lí cây đa' và Bài đọc nhạc số 1 phóng to trên bảng phụ/màn hình tương tác."
      ],
      students: [
        "Sách giáo khoa Âm nhạc 7 (Bộ sách Kết nối tri thức với cuộc sống), vở ghi chép môn Âm nhạc.",
        "Thanh phách gõ bằng tre hoặc song loan tự chuẩn bị."
      ]
    },
    activities: [
      {
        id: "m-act-1",
        code: "HD1",
        title: "Hoạt động 1: Mở đầu / Khởi động (Lắng nghe làn điệu quê hương)",
        timeMinutes: 7,
        objective: "Tạo tâm thế hào hứng, khơi gợi cảm xúc thẩm mỹ và dẫn dắt học sinh bước vào không gian văn hóa dân ca Quan họ Bắc Ninh.",
        content: "Học sinh lắng nghe trích đoạn bài hát 'Lí cây đa' do nghệ sĩ quan họ biểu diễn và tham gia trò chơi nghe giai điệu đoán vùng miền.",
        product: "Học sinh trả lời đúng tên làn điệu dân ca miền Bắc (Quan họ Bắc Ninh), nhận diện được nét giai điệu vui tươi, rộn ràng.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Mở đoạn video clip 1 phút về lễ hội vùng Kinh Bắc có hình ảnh cây đa, giếng nước, sân đình. Đặt câu hỏi: 'Giai điệu này gợi cho các em nhớ đến vùng văn hóa nào của đất nước ta?'.",
            studentAction: "Lắng nghe giai điệu, quan sát trang phục áo tứ thân, nón quai thao trong video clip."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Khích lệ học sinh phát biểu cảm nhận về sự vui tươi, dí dỏm của giai điệu.",
            studentAction: "Trao đổi nhanh với bạn cùng bàn về tên bài hát và nét độc đáo của làn điệu quan họ."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Mời đại diện 2 học sinh trả lời miệng.",
            studentAction: "Học sinh trả lời: 'Dạ thưa cô, đây là dân ca Quan họ Bắc Ninh rất quen thuộc ạ'."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Giáo viên nhận xét, khen ngợi và dẫn vào bài: 'Hôm nay cô trò chúng ta cùng học hát bài Lí cây đa và rèn luyện đọc nhạc bài số 1'.",
            studentAction: "Mở SGK Âm nhạc 7 trang 6 và ghi tên bài học vào vở."
          }
        ]
      },
      {
        id: "m-act-2",
        code: "HD2",
        title: "Hoạt động 2: Hình thành kiến thức mới (Khám phá & Học hát bài Lí cây đa)",
        timeMinutes: 20,
        objective: "Học sinh nắm vững cấu trúc bài hát, luyện thanh mẫu âm, hát chuẩn cao độ từng câu kết hợp nhả chữ có các từ đệm lót: 'rằng', 'thì', 'í, a'.",
        content: "1. Khởi động giọng (Luyện thanh mẫu âm Ma - Me - Mi - Mo - Mu).\n2. Đọc lời ca theo tiết tấu.\n3. Học hát từng câu theo lối móc xích bằng đàn Organ.\n4. Ghép hoàn chỉnh cả bài kết hợp nhạc đệm.",
        product: "Cả lớp và từng tổ hát chuẩn xác cao độ, nhịp điệu của cả 4 câu hát bài 'Lí cây đa'.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Đàn gam Đô trưởng, hướng dẫn cả lớp đứng thẳng tư thế, thả lỏng vai và luyện thanh khởi động giọng. Đàn giai điệu câu 1 hai lần và yêu cầu học sinh hát nhắc lại.",
            studentAction: "Tập trung luyện thanh theo tiếng đàn của cô; lắng nghe kỹ cao độ và hát mẫu theo giai điệu."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Đàn từng câu: Câu 1 ('Trèo lên quán dốc...'), Câu 2 ('Thấy hai cô nàng...'), Câu 3 ('Miệng cười chúm chím...'), Câu 4 ('Như hoa lục bình...'). Lưu ý chỗ có luyến và ngân đủ 2 phách.",
            studentAction: "Hát theo đàn từng câu, chú ý lấy hơi ở đầu câu và phát âm tròn vành rõ chữ."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Yêu cầu dãy bàn 1 hát đối đáp với dãy bàn 2. Nhận xét cao độ câu cuối.",
            studentAction: "Dãy 1 hát câu 1, 3; Dãy 2 hát đáp lại câu 2, 4. Cả hai dãy cùng hòa giọng đoạn kết."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Sửa lỗi chênh phô ở tiếng luyến 'í, a'. Khen ngợi tinh thần học tập sôi nổi của lớp.",
            studentAction: "Ghi nhớ cách lấy hơi sâu bằng bụng và sắc thái vui tươi khi thể hiện bài hát."
          }
        ]
      },
      {
        id: "m-act-3",
        code: "HD3",
        title: "Hoạt động 3: Luyện tập (Hát gõ đệm & Đọc nhạc Bài số 1)",
        timeMinutes: 12,
        objective: "Rèn luyện kĩ năng giữ phách, gõ đệm bằng thanh phách/song loan; đọc đúng tên nốt, cao độ và trường độ Bài đọc nhạc số 1 (nhịp 2/4).",
        content: "1. Hát kết hợp gõ đệm theo phách (Phách 1 mạnh, phách 2 nhẹ).\n2. Đọc thang âm Đô - Rê - Mi - Son - La.\n3. Đọc tiết tấu Bài đọc nhạc số 1 và đọc kết hợp gõ nhịp 2/4.",
        product: "Học sinh gõ thanh phách đều đặn, không bị cuốn nhịp; đọc trôi chảy Bài đọc nhạc số 1 theo tiếng đàn.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Làm mẫu cách cầm thanh phách và gõ vào các phách mạnh của bài hát. Đàn Bài đọc nhạc số 1 với tiết tấu nhịp 2/4.",
            studentAction: "Cầm thanh phách đúng tư thế, chú ý quan sát cô làm mẫu và gõ phách thử."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Bắt nhịp cho cả lớp vừa hát vừa gõ phách; sau đó chia nhóm luyện đọc bài đọc nhạc số 1.",
            studentAction: "Vừa hát vừa gõ phách nhịp nhàng: 'Trèo (gõ) lên (gõ) quán dốc (gõ)...'."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Mời Tổ 1 hát, Tổ 2 gõ đệm; đổi vai ngược lại. Gọi 1 học sinh đọc nhạc đơn ca.",
            studentAction: "Tổ 1 tự tin thể hiện giọng hát, Tổ 2 gõ thanh phách ăn khớp, giữ đúng nhịp độ."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Nhận xét kĩ thuật giữ nhịp, lưu ý không gõ quá mạnh làm át tiếng hát.",
            studentAction: "Lắng nghe góp ý, điều chỉnh âm lượng gõ thanh phách hài hòa với giọng hát."
          }
        ]
      },
      {
        id: "m-act-4",
        code: "HD4",
        title: "Hoạt động 4: Vận dụng (Biểu diễn sáng tạo & Giới thiệu di sản)",
        timeMinutes: 6,
        objective: "Phát huy khả năng tự tin biểu diễn sân khấu; mở rộng hiểu biết về Dân ca Quan họ Bắc Ninh - Di sản văn hóa phi vật thể của nhân loại.",
        content: "Tốp ca nam nữ biểu diễn bài hát kết hợp động tác múa phụ họa (động tác chỉ tay, nghiêng nón, vẫy tay nhẹ nhàng). Thảo luận ngắn về trách nhiệm giữ gìn dân ca quê hương.",
        product: "Màn biểu diễn tươi vui, duyên dáng của nhóm học sinh; các em hiểu được giá trị trường tồn của dân ca Việt Nam.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Mời nhóm văn nghệ xung phong lên trước lớp biểu diễn bài hát có động tác phụ họa.",
            studentAction: "Nhóm xung phong lên bục giảng, chuẩn bị nón và thanh phách."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Đàn đệm nhạc nền, cổ vũ và ghi hình ngắn sản phẩm học tập của học sinh.",
            studentAction: "Tự tin biểu diễn, nụ cười tươi tắn thể hiện nét duyên quan họ."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Mời cả lớp vỗ tay tán thưởng và nhận xét phần trình diễn của nhóm bạn.",
            studentAction: "Cả lớp hào hứng vỗ tay, nhận xét bạn hát hay và động tác múa rất uyển chuyển."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Tổng kết tiết học, dặn dò học sinh luyện hát cho ông bà bố mẹ nghe và chuẩn bị bài mới.",
            studentAction: "Đứng nghiêm chào cô giáo kết thúc tiết học âm nhạc tràn đầy niềm vui."
          }
        ]
      }
    ]
  },
  slides: [
    {
      id: "m-slide-1",
      slideNumber: 1,
      title: "CHỦ ĐỀ 1: GIAI ĐIỆU QUÊ HƯƠNG",
      subtitle: "Học hát: Lí cây đa & Đọc nhạc Bài số 1",
      category: "intro",
      bullets: [
        `Trường: ${defaultTeacherProfile.school} – Tổ ${defaultTeacherProfile.department}`,
        `Giáo viên giảng dạy: Cô ${defaultTeacherProfile.name}`,
        `Môn: ${defaultTeacherProfile.subject} – Khối Lớp 7`,
        `Năm học: ${defaultTeacherProfile.academicYear}`
      ],
      highlightQuote: "Âm nhạc là ngôn ngữ chung của nhân loại, nơi cảm xúc tâm hồn cất cánh bay xa.",
      teacherNotes: "Khởi động lớp học với nụ cười thân thiện, kiểm tra thanh phách và tư thế ngồi ngay ngắn của học sinh.",
      estimatedMinutes: 2,
      keyVisualIcon: "Music"
    },
    {
      id: "m-slide-2",
      slideNumber: 2,
      title: "MỤC TIÊU BÀI HỌC CẦN ĐẠT",
      subtitle: "Phát triển năng lực cảm thụ và biểu diễn âm nhạc",
      category: "objective",
      bullets: [
        "1. Về kiến thức: Hát đúng giai điệu, lời ca bài hát 'Lí cây đa' dân ca Quan họ Bắc Ninh.",
        "2. Về kĩ năng: Biết lấy hơi, nhả chữ rõ ràng các tiếng luyến láy; đọc chuẩn Bài đọc nhạc số 1.",
        "3. Về năng lực: Gõ đệm phách nhịp nhàng, biểu diễn tự tin đơn ca và tốp ca kết hợp vận động.",
        "4. Về phẩm chất: Thêm yêu làn điệu dân ca truyền thống và niềm tự hào văn hóa dân tộc Việt Nam."
      ],
      highlightQuote: "Yêu dân ca là yêu cội nguồn, bồi đắp tâm hồn trong sáng cho thế hệ trẻ.",
      teacherNotes: "Nhắc lại yêu cầu giữ trật tự và lắng nghe tiếng đàn khi luyện thanh.",
      estimatedMinutes: 2,
      keyVisualIcon: "Target"
    },
    {
      id: "m-slide-3",
      slideNumber: 3,
      title: "HOẠT ĐỘNG 1: KHỞI ĐỘNG - GIAI ĐIỆU QUAN HỌ",
      subtitle: "Lắng nghe làn điệu mượt mà của miền quê Kinh Bắc",
      category: "activity1",
      bullets: [
        "Quan sát hình ảnh: Cây đa cổ thụ, giếng nước, mái đình làng quê Bắc Bộ.",
        "Nghệ thuật Quan họ Bắc Ninh: Được UNESCO công nhận là Di sản văn hóa phi vật thể của nhân loại năm 2009.",
        "Tính chất bài hát 'Lí cây đa': Vui tươi, dí dỏm, lạc quan, rộn rã tiếng cười ngày hội.",
        "Khám phá các từ đệm đặc trưng: rằng, thì, í, a... tạo nên phong vị mộc mạc mà duyên dáng."
      ],
      highlightQuote: "Người ơi người ở đừng về — Lời ca thắm đượm nghĩa tình non nước.",
      teacherNotes: "Mở đoạn nhạc mẫu cho học sinh nghe, đặt câu hỏi gợi mở cảm xúc vui tươi.",
      estimatedMinutes: 7,
      keyVisualIcon: "Sparkles"
    },
    {
      id: "m-slide-4",
      slideNumber: 4,
      title: "HOẠT ĐỘNG 2: HỌC HÁT BÀI LÍ CÂY ĐA",
      subtitle: "Tập hát từng câu theo lối móc xích chuẩn cao độ",
      category: "activity2",
      bullets: [
        "Luyện thanh khởi động: Mẫu âm Mi - Ma - Mo trên gam Đô trưởng (C Major).",
        "Câu 1: 'Trèo lên quán dốc, ngồi gốc í a cây đa...'",
        "Câu 2: 'Rằng tôi lí í a cây đa, rằng tôi lới í a cây đa...'",
        "Câu 3: 'Ai đem a í a tình tính tang, tình tính tang...'",
        "Câu 4: 'Cho đôi mình gặp, xem hội í a đêm rằm...'",
        "Lưu ý phát âm: Nhả chữ nhẹ nhàng, ngân đủ phách ở cuối câu hát."
      ],
      highlightQuote: "Hát đúng phách, tròn vành rõ chữ là nền tảng của mọi giọng ca hay.",
      teacherNotes: "Đàn từng câu 2 lần, hướng dẫn học sinh lấy hơi sâu bằng bụng.",
      estimatedMinutes: 20,
      keyVisualIcon: "BookOpen"
    },
    {
      id: "m-slide-5",
      slideNumber: 5,
      title: "HOẠT ĐỘNG 3: LUYỆN TẬP GÕ ĐỆM & ĐỌC NHẠC",
      subtitle: "Kết hợp thanh phách theo nhịp 2/4 và đọc thang âm",
      category: "activity3",
      bullets: [
        "Nhịp 2/4: Mỗi ô nhịp có 2 phách, phách 1 mạnh, phách 2 nhẹ.",
        "Gõ đệm phách: Gõ đều đặn vào phách mạnh và phách nhẹ theo tiến trình lời ca.",
        "Bài đọc nhạc số 1: Thang âm Đô - Rê - Mi - Son - La (5 nốt nhạc pentatonic).",
        "Thực hành nhóm: Dãy A hát, Dãy B gõ phách đệm; sau đó đổi vai tương tác."
      ],
      highlightQuote: "Tiết tấu là nhịp đập trái tim của tác phẩm âm nhạc.",
      teacherNotes: "Bấm giờ đếm ngược 3 phút cho các nhóm tự ghép tiếng gõ phách với lời ca.",
      estimatedMinutes: 12,
      keyVisualIcon: "CheckCircle"
    },
    {
      id: "m-slide-6",
      slideNumber: 6,
      title: "HOẠT ĐỘNG 4: VẬN DỤNG & TỔNG KẾT",
      subtitle: "Tự tin biểu diễn và lan tỏa tình yêu nghệ thuật",
      category: "activity4",
      bullets: [
        "Biểu diễn tốp ca: Kết hợp động tác múa nón và vẫy tay duyên dáng.",
        `Người hướng dẫn: Cô ${defaultTeacherProfile.name} – ${defaultTeacherProfile.school}`,
        "Dặn dò về nhà: Hát thuộc lòng bài hát Lí cây đa cho gia đình thưởng thức.",
        "Chuẩn bị bài mới: Tìm hiểu các nhạc cụ dân tộc Việt Nam (Đàn tranh, Đàn bầu, Sáo trúc)."
      ],
      highlightQuote: "Mỗi nốt nhạc là một bông hoa điểm tô cho cuộc sống thêm rạng rỡ yêu thương.",
      teacherNotes: "Khen ngợi các em học sinh có giọng hát truyền cảm và gõ nhịp chuẩn xác.",
      estimatedMinutes: 5,
      keyVisualIcon: "Award"
    }
  ],
  exam: {
    title: "ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KỲ I - MÔN ÂM NHẠC 7",
    examType: "Đánh giá định kỳ",
    subject: defaultTeacherProfile.subject,
    grade: "Lớp 7",
    timeAllowedMinutes: 45,
    examCode: "AMNHAC7-GK1-7991",
    totalScore: 10.0,
    matrix: [
      {
        id: "m-mat-1",
        topic: "Hát và Cảm thụ âm nhạc",
        subTopic: "Dân ca quan họ, bài hát Lí cây đa, nguồn gốc và sắc thái",
        part1_mcq: { know: 4, understand: 2, apply: 0 },
        part2_trueFalse: { know: 1, understand: 1, apply: 0 },
        part3_shortAns: { know: 1, understand: 1, apply: 0 },
        part4_essay: { know: 0, understand: 1, apply: 0 },
        scoreAllocation: 3.5
      },
      {
        id: "m-mat-2",
        topic: "Nhạc lí và Đọc nhạc",
        subTopic: "Nhịp 2/4, cao độ Đô - Rê - Mi - Son - La, hình nốt đen, trắng, móc đơn",
        part1_mcq: { know: 2, understand: 2, apply: 2 },
        part2_trueFalse: { know: 0, understand: 1, apply: 1 },
        part3_shortAns: { know: 0, understand: 1, apply: 1 },
        part4_essay: { know: 0, understand: 0, apply: 1 },
        scoreAllocation: 4.0
      },
      {
        id: "m-mat-3",
        topic: "Nhạc cụ và Thường thức âm nhạc",
        subTopic: "Nhạc cụ gõ dân tộc, thanh phách, song loan, di sản quan họ",
        part1_mcq: { know: 1, understand: 1, apply: 0 },
        part2_trueFalse: { know: 0, understand: 0, apply: 1 },
        part3_shortAns: { know: 0, understand: 0, apply: 1 },
        part4_essay: { know: 0, understand: 0, apply: 1 },
        scoreAllocation: 2.5
      }
    ],
    specifications: [
      {
        id: "m-spec-1",
        topic: "Hát và Cảm thụ âm nhạc",
        subTopic: "Dân ca Quan họ Bắc Ninh",
        learningOutcomes: {
          know: [
            "Nhận biết được nguồn gốc của bài hát Lí cây đa thuộc thể loại dân ca quan họ Bắc Ninh.",
            "Nhận biết được các tiếng đệm lót đặc trưng (rằng, thì, í, a) trong bài hát."
          ],
          understand: [
            "Hiểu được tính chất âm nhạc vui tươi, lạc quan, dí dỏm của bài dân ca.",
            "Hiểu ý nghĩa của việc giữ gìn và phát huy di sản văn hóa phi vật thể của dân tộc."
          ],
          apply: [
            "Biết thể hiện sắc thái tình cảm phù hợp khi trình diễn bài hát trước tập thể."
          ]
        },
        part1Count: { know: 4, understand: 2, apply: 0 },
        part2Count: { know: 1, understand: 1, apply: 0 },
        part3Count: { know: 1, understand: 1, apply: 0 },
        part4Count: { know: 0, understand: 1, apply: 0 },
        competencyCode: "NL1: Thể hiện âm nhạc"
      },
      {
        id: "m-spec-2",
        topic: "Nhạc lí và Đọc nhạc",
        subTopic: "Số chỉ nhịp 2/4 và trường độ nốt",
        learningOutcomes: {
          know: [
            "Nhận biết được định nghĩa nhịp 2/4: Mỗi ô nhịp có 2 phách, mỗi phách bằng một nốt đen.",
            "Nhận biết được vị trí 5 nốt nhạc trên khuông nhạc khóa Sol: Đô, Rê, Mi, Son, La."
          ],
          understand: [
            "Hiểu mối quan hệ trường độ giữa nốt trắng, nốt đen và nốt móc đơn.",
            "Tính toán được tổng số phách trong các ô nhịp đơn vị nhịp 2/4."
          ],
          apply: [
            "Đọc chuẩn xác cao độ và trường độ bài đọc nhạc số 1 kết hợp gõ phách."
          ]
        },
        part1Count: { know: 2, understand: 2, apply: 2 },
        part2Count: { know: 0, understand: 1, apply: 1 },
        part3Count: { know: 0, understand: 1, apply: 1 },
        part4Count: { know: 0, understand: 0, apply: 1 },
        competencyCode: "NL2: Cảm thụ và hiểu biết âm nhạc"
      },
      {
        id: "m-spec-3",
        topic: "Nhạc cụ gõ và Di sản",
        subTopic: "Thanh phách, song loan và văn hóa quan họ",
        learningOutcomes: {
          know: [
            "Nhận biết hình dáng và cách sử dụng thanh phách, song loan, trống nhỏ."
          ],
          understand: [
            "Phân biệt được cách gõ đệm theo phách và gõ đệm theo tiết tấu lời ca."
          ],
          apply: [
            "Sáng tạo các động tác gõ đệm cơ thể (Body Percussion) cho bài hát."
          ]
        },
        part1Count: { know: 1, understand: 1, apply: 0 },
        part2Count: { know: 0, understand: 0, apply: 1 },
        part3Count: { know: 0, understand: 0, apply: 1 },
        part4Count: { know: 0, understand: 0, apply: 1 },
        competencyCode: "NL3: Ứng dụng và sáng tạo âm nhạc"
      }
    ],
    part1_mcq: [
      {
        id: "m-p1-q1",
        number: 1,
        question: "Bài hát 'Lí cây đa' thuộc thể loại âm nhạc nào sau đây?",
        options: {
          A: "Dân ca Quan họ Bắc Ninh",
          B: "Dân ca Nam Bộ",
          C: "Dân ca Ví, Giặm Nghệ Tĩnh",
          D: "Dân ca Tây Nguyên"
        },
        correctAnswer: "A",
        cognitiveLevel: "know",
        explanation: "Bài hát 'Lí cây đa' là một làn điệu dân ca Quan họ Bắc Ninh rất nổi tiếng và đặc sắc.",
        point: 0.25
      },
      {
        id: "m-p1-q2",
        number: 2,
        question: "Số chỉ nhịp 2/4 cho biết điều gì trong một ô nhịp?",
        options: {
          A: "Có 2 phách, mỗi phách có giá trị bằng một nốt đen",
          B: "Có 4 phách, mỗi phách bằng một nốt móc đơn",
          C: "Có 2 phách, mỗi phách bằng một nốt trắng",
          D: "Có 3 phách, phách đầu nhẹ phách sau mạnh"
        },
        correctAnswer: "A",
        cognitiveLevel: "know",
        explanation: "Nhịp 2/4 gồm 2 phách trong một ô nhịp, phách 1 mạnh, phách 2 nhẹ; mỗi phách có độ dài bằng một nốt đen.",
        point: 0.25
      },
      {
        id: "m-p1-q3",
        number: 3,
        question: "Trong khuông nhạc có khóa Sol, nốt Son nằm ở vị trí nào?",
        options: {
          A: "Nằm ở dòng kẻ thứ 1",
          B: "Nằm ở dòng kẻ thứ 2",
          C: "Nằm ở khe thứ 2",
          D: "Nằm ở dòng kẻ thứ 3"
        },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Khóa Sol bắt đầu vẽ từ dòng kẻ thứ 2 của khuông nhạc, do đó nốt nằm trên dòng kẻ thứ 2 chính là nốt Son.",
        point: 0.25
      },
      {
        id: "m-p1-q4",
        number: 4,
        question: "Một nốt trắng có giá trị trường độ bằng bao nhiêu nốt đen?",
        options: {
          A: "1 nốt đen",
          B: "2 nốt đen",
          C: "3 nốt đen",
          D: "4 nốt đen"
        },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "1 nốt trắng có độ dài ngân bằng 2 nốt đen (hoặc bằng 4 nốt móc đơn).",
        point: 0.25
      },
      {
        id: "m-p1-q5",
        number: 5,
        question: "Nhạc cụ nào sau đây là nhạc cụ gõ thường dùng để gõ giữ phách trong trường học?",
        options: {
          A: "Thanh phách",
          B: "Đàn Tranh",
          C: "Đàn Bầu",
          D: "Sáo trúc"
        },
        correctAnswer: "A",
        cognitiveLevel: "know",
        explanation: "Thanh phách và song loan là những nhạc cụ gõ phổ biến nhất được dùng để rèn luyện gõ đệm giữ phách.",
        point: 0.25
      },
      {
        id: "m-p1-q6",
        number: 6,
        question: "Dân ca Quan họ Bắc Ninh được UNESCO vinh danh là Di sản văn hóa phi vật thể đại diện của nhân loại vào năm nào?",
        options: {
          A: "Năm 2003",
          B: "Năm 2009",
          C: "Năm 2015",
          D: "Năm 2021"
        },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Dân ca Quan họ Bắc Ninh được UNESCO công nhận là Di sản văn hóa phi vật thể của nhân loại vào ngày 30/9/2009.",
        point: 0.25
      },
      {
        id: "m-p1-q7",
        number: 7,
        question: "Sắc thái tình cảm chủ đạo khi thể hiện bài hát 'Lí cây đa' là:",
        options: {
          A: "Trầm buồn, tha thiết",
          B: "Hùng tráng, uy nghiêm",
          C: "Vui tươi, trong sáng, dí dỏm",
          D: "Nhanh dữ dội, dồn dập"
        },
        correctAnswer: "C",
        cognitiveLevel: "understand",
        explanation: "Bài hát 'Lí cây đa' có giai điệu vui tươi, hồn nhiên và mang tính chất dí dỏm, lạc quan của hội làng.",
        point: 0.25
      },
      {
        id: "m-p1-q8",
        number: 8,
        question: "Các từ đệm 'rằng', 'thì', 'í, a' trong bài hát có tác dụng gì đối với giai điệu?",
        options: {
          A: "Làm bài hát dài hơn và khó hát hơn",
          B: "Tạo sự mượt mà, luyến láy và phong vị duyên dáng của dân ca quan họ",
          C: "Thay thế các nốt nhạc bị thiếu trong bản nhạc",
          D: "Đánh dấu chỗ học sinh được phép nghỉ hát"
        },
        correctAnswer: "B",
        cognitiveLevel: "understand",
        explanation: "Các từ lót, đệm đưa hơi là nét đặc trưng tinh túy tạo nên sự mềm mại, tình tứ và duyên dáng trong lối hát quan họ.",
        point: 0.25
      },
      {
        id: "m-p1-q9",
        number: 9,
        question: "Trong nhịp 2/4, một ô nhịp có chứa một nốt đen và hai nốt móc đơn thì ô nhịp đó đã đủ bao nhiêu phách?",
        options: {
          A: "Đủ 1 phách",
          B: "Đủ 2 phách",
          C: "Thừa 1 phách",
          D: "Thiếu nửa phách"
        },
        correctAnswer: "B",
        cognitiveLevel: "understand",
        explanation: "1 nốt đen = 1 phách, 2 nốt móc đơn = 1 phách (mỗi nốt đơn 0.5 phách). Tổng cộng: 1 + 1 = 2 phách, vừa đủ 1 ô nhịp 2/4.",
        point: 0.25
      },
      {
        id: "m-p1-q10",
        number: 10,
        question: "Khi gõ đệm theo phách cho bài hát viết ở nhịp 2/4, động tác gõ rơi vào:",
        options: {
          A: "Chỉ gõ ở đầu câu hát",
          B: "Gõ đều đặn vào cả phách mạnh và phách nhẹ của mỗi ô nhịp",
          C: "Chỉ gõ vào phách nhẹ",
          D: "Gõ theo từng chữ cái của lời bài hát"
        },
        correctAnswer: "B",
        cognitiveLevel: "understand",
        explanation: "Gõ đệm theo phách là gõ đều đặn liên tục vào từng phách (cả phách 1 mạnh và phách 2 nhẹ) của bản nhạc.",
        point: 0.25
      },
      {
        id: "m-p1-q11",
        number: 11,
        question: "Thứ tự cao độ từ thấp đến cao của 5 nốt nhạc trong thang âm Đô trưởng ngũ cung là:",
        options: {
          A: "Đô - Mi - Rê - Son - La",
          B: "Đô - Rê - Mi - Son - La",
          C: "La - Son - Mi - Rê - Đô",
          D: "Đô - Rê - Fa - Son - Si"
        },
        correctAnswer: "B",
        cognitiveLevel: "apply",
        explanation: "Thứ tự cao độ chuẩn từ thấp lên cao là: Đô (C) -> Rê (D) -> Mi (E) -> Son (G) -> La (A).",
        point: 0.25
      },
      {
        id: "m-p1-q12",
        number: 12,
        question: "Khi thực hiện gõ đệm cơ thể (Body Percussion) cho bài hát, cách phối hợp nào sau đây giúp phân biệt rõ phách mạnh và phách nhẹ trong nhịp 2/4?",
        options: {
          A: "Phách 1 dậm chân (mạnh) - Phách 2 vỗ tay (nhẹ)",
          B: "Cả 2 phách đều vỗ tay cùng một cường độ nhẹ",
          C: "Phách 1 im lặng - Phách 2 dậm chân thật mạnh",
          D: "Chỉ lắc đầu không dùng tay chân"
        },
        correctAnswer: "A",
        cognitiveLevel: "apply",
        explanation: "Dậm chân tạo âm sắc trầm vang ở phách 1 mạnh, vỗ tay tạo âm thanh giòn nhẹ ở phách 2 là cách phân biệt rất tự nhiên và hiệu quả.",
        point: 0.25
      }
    ],
    part2_trueFalse: [
      {
        id: "m-p2-q1",
        number: 1,
        contextPrompt: "Xét các phát biểu sau đây về bài hát 'Lí cây đa' và nghệ thuật Dân ca Quan họ Bắc Ninh. Xét tính Đúng / Sai của các nhận định:",
        statements: [
          {
            subId: "a",
            text: "Bài hát 'Lí cây đa' được sáng tác bởi một nhạc sĩ hiện đại vào thế kỷ 21.",
            isCorrect: false,
            explanation: "Sai. Đây là bài dân ca truyền thống được lưu truyền trong dân gian từ lâu đời, không rõ tác giả cụ thể."
          },
          {
            subId: "b",
            text: "Trong lối hát quan họ, các liền anh liền chị thường sử dụng trang phục áo tứ thân, nón quai thao hoặc áo the khăn xếp.",
            isCorrect: true,
            explanation: "Đúng. Đây là trang phục lễ hội truyền thống mang đậm bản sắc văn hóa của người quan họ vùng Kinh Bắc."
          },
          {
            subId: "c",
            text: "Các từ 'tình tính tang', 'í a' trong bài hát là các từ tượng thanh và đệm lót dân gian.",
            isCorrect: true,
            explanation: "Đúng. Đây là các từ đệm gợi lên tiếng tơ đàn và nét duyên dáng của âm nhạc dân ca."
          },
          {
            subId: "d",
            text: "Khi hát dân ca chỉ cần hát thật to, không cần chú ý đến việc lấy hơi hay luyến láy.",
            isCorrect: false,
            explanation: "Sai. Hát dân ca đặc biệt đòi hỏi sự tinh tế, nắn nót, nhả chữ 'vang, rền, nền, nảy' và giữ hơi mềm mại."
          }
        ],
        cognitiveLevel: "understand",
        point: 1.0
      },
      {
        id: "m-p2-q2",
        number: 2,
        contextPrompt: "Xét các kiến thức Nhạc lí cơ bản và Bài đọc nhạc số 1 viết ở nhịp 2/4. Xét tính Đúng / Sai của các nhận định:",
        statements: [
          {
            subId: "a",
            text: "Trong nhịp 2/4, một nốt trắng có thể chiếm trọn cả một ô nhịp.",
            isCorrect: true,
            explanation: "Đúng. Vì 1 nốt trắng ngân 2 phách, đúng bằng dung lượng 2 phách của 1 ô nhịp 2/4."
          },
          {
            subId: "b",
            text: "Nốt Mi có cao độ thấp hơn nốt Đô.",
            isCorrect: false,
            explanation: "Sai. Nốt Mi nằm ở dòng kẻ thứ 1, cao hơn nốt Đô nằm ở dòng kẻ phụ thứ nhất phía dưới."
          },
          {
            subId: "c",
            text: "Dấu lặng đen có thời gian nghỉ tương đương với trường độ của một nốt đen.",
            isCorrect: true,
            explanation: "Đúng. Dấu lặng đen biểu thị thời gian nghỉ bằng 1 phách (tương đương 1 nốt đen)."
          },
          {
            subId: "d",
            text: "Bốn nốt móc đơn liên tiếp trong nhịp 2/4 có tổng trường độ là 4 phách.",
            isCorrect: false,
            explanation: "Sai. Mỗi nốt móc đơn là 0.5 phách, do đó 4 nốt móc đơn chỉ có tổng trường độ bằng 2 phách."
          }
        ],
        cognitiveLevel: "apply",
        point: 1.0
      }
    ],
    part3_shortAns: [
      {
        id: "m-p3-q1",
        number: 1,
        question: "Tên tỉnh thành nào là cái nôi sản sinh ra làn điệu Dân ca Quan họ được UNESCO công nhận là di sản văn hóa phi vật thể?",
        correctAnswer: "Bắc Ninh (hoặc Bắc Ninh - Bắc Giang)",
        cognitiveLevel: "know",
        explanation: "Vùng đất Kinh Bắc (chủ yếu thuộc tỉnh Bắc Ninh và một phần tỉnh Bắc Giang) là cội nguồn của Dân ca Quan họ.",
        point: 0.5
      },
      {
        id: "m-p3-q2",
        number: 2,
        question: "Số chỉ nhịp 2/4 gồm bao nhiêu phách trong mỗi ô nhịp? (Điền một chữ số nguyên).",
        correctAnswer: "2",
        cognitiveLevel: "know",
        explanation: "Số chỉ trên (số 2) biểu thị có 2 phách trong mỗi ô nhịp.",
        point: 0.5
      },
      {
        id: "m-p3-q3",
        number: 3,
        question: "Nốt nhạc nào nằm ở dòng kẻ phụ thứ nhất phía dưới của khuông nhạc khóa Sol?",
        correctAnswer: "Đô (hoặc C / nốt Đô)",
        cognitiveLevel: "understand",
        explanation: "Nốt Đô nằm ngay trên dòng kẻ phụ thứ nhất phía dưới khuông nhạc.",
        point: 0.5
      },
      {
        id: "m-p3-q4",
        number: 4,
        question: "Một ô nhịp 2/4 chứa một dấu lặng đen và hai nốt móc đơn. Hỏi ô nhịp đó đã có tổng cộng bao nhiêu phách?",
        correctAnswer: "2",
        cognitiveLevel: "apply",
        explanation: "Dấu lặng đen = 1 phách, 2 nốt móc đơn = 1 phách. Tổng cộng = 2 phách.",
        point: 0.5
      }
    ],
    part4_essay: [
      {
        id: "m-p4-q1",
        number: 1,
        question: "a) Trình bày hoàn cảnh ra đời và vẻ đẹp nội dung, nghệ thuật của bài hát 'Lí cây đa' (Dân ca Quan họ Bắc Ninh). (1.0 điểm)\nb) Là một học sinh THCS, em cần làm gì để góp phần giữ gìn và phát huy các làn điệu dân ca truyền thống của quê hương đất nước? (0.5 điểm)",
        cognitiveLevel: "understand",
        maxScore: 1.5,
        sampleAnswer: "a) 'Lí cây đa' là bài dân ca quan họ Bắc Ninh đặc sắc gắn liền với không gian hội làng Kinh Bắc mùa xuân. Bài hát phản ánh tâm hồn lạc quan, yêu đời, tình cảm gắn bó của những người dân lao động qua hình ảnh thân thương: cây đa, quán dốc, mái đình và nụ cười rạng rỡ như hoa nở. Vẻ đẹp nghệ thuật thể hiện ở giai điệu trong sáng, nhịp nhàng và việc khéo léo sử dụng các từ đệm lót 'rằng, thì, í, a' tạo nên sự uyển chuyển, tình tứ đặc trưng.\nb) Trách nhiệm của học sinh: Tích cực học tập và trân trọng các tiết học dân ca; thường xuyên lắng nghe và tập hát các bài dân ca của quê hương; tự tin biểu diễn trong các buổi sinh hoạt văn nghệ trường lớp; giới thiệu các bài dân ca hay đến bạn bè qua mạng xã hội lành mạnh.",
        rubrics: [
          { criterion: "Nêu đúng nguồn gốc xuất xứ quan họ Bắc Ninh và ý nghĩa nội dung tươi vui của bài hát", maxScore: 0.5 },
          { criterion: "Phân tích nét đặc sắc nghệ thuật của giai điệu và từ ngữ đệm lót dân gian", maxScore: 0.5 },
          { criterion: "Nêu được ít nhất 2 hành động cụ thể, thiết thực của học sinh để bảo tồn dân ca", maxScore: 0.5 }
        ]
      },
      {
        id: "m-p4-q2",
        number: 2,
        question: "Hãy chép lại lời ca bài hát 'Lí cây đa' theo đúng thứ tự 4 câu hát. Sau đó, đánh dấu các vị trí cần gõ phách (gõ thanh phách) vào lời ca để thể hiện đúng tính chất nhịp 2/4 vui tươi của bài hát. (1.5 điểm)",
        cognitiveLevel: "apply",
        maxScore: 1.5,
        sampleAnswer: "Lời ca và đánh dấu vị trí gõ phách (kí hiệu dấu * là một tiếng gõ phách):\n- Câu 1: Trèo (*) lên (*) quán (*) dốc, (*) ngồi (*) gốc (*) í a (*) cây (*) đa (*).\n- Câu 2: Rằng (*) tôi (*) lí (*) í a (*) cây (*) đa, (*) rằng (*) tôi (*) lới (*) í a (*) cây (*) đa (*).\n- Câu 3: Ai (*) đem (*) a (*) í a (*) tình (*) tính (*) tang, (*) tình (*) tính (*) tang (*).\n- Câu 4: Cho (*) đôi (*) mình (*) gặp, (*) xem (*) hội (*) í a (*) đêm (*) rằm (*).\nNhận xét: Mỗi ô nhịp có 2 tiếng gõ phách đều đặn, tiếng gõ đầu tiên rơi vào đầu phách mạnh giúp giọng hát ngân vang, đúng nhịp điệu rộn rã của bài dân ca.",
        rubrics: [
          { criterion: "Chép đúng và đầy đủ chính xác lời ca của cả 4 câu hát bài Lí cây đa", maxScore: 0.75 },
          { criterion: "Đánh dấu chính xác vị trí gõ phách theo nhịp 2/4 đều đặn xuyên suốt bài hát", maxScore: 0.5 },
          { criterion: "Nêu nhận xét ngắn gọn về tác dụng của việc gõ phách đối với việc giữ nhịp bài hát", maxScore: 0.25 }
        ]
      }
    ]
  }
};
