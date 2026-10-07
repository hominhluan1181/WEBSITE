/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Dữ liệu chuẩn lồng ghép Năng lực số (NLS) - AI và Tích hợp Giáo dục Quốc phòng - An ninh (QPAN)
 * Nguồn căn cứ:
 * 1. Biên bản thống nhất Phân phối chương trình môn Âm nhạc 6,7,8,9 năm học 2026-2027 (Trường THCS Long Hồ)
 * 2. Phụ lục Hướng dẫn địa chỉ lồng ghép GDQP&AN năm học 2026-2027 môn Âm nhạc cấp THCS
 */

export interface IntegrationTopicGuide {
  grade: 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9';
  topicNumber: number;
  topicTitle: string;
  hasNls: boolean;
  hasAi: boolean;
  hasQpan: boolean;
  // Nội dung NLS / AI
  nlsAiObjective?: string;
  nlsAiProcessStep?: {
    activityCode: 'HD1' | 'HD2' | 'HD3' | 'HD4';
    activityTitle: string;
    stepName: string;
    teacherAction: string;
    studentAction: string;
  };
  // Nội dung QPAN theo Phụ lục chính thức
  qpanTopicTitle?: string;
  qpanObjective?: string;
  qpanProcessVandun?: string;
}

export const MUSIC_INTEGRATION_MAP: Record<string, IntegrationTopicGuide> = {
  // ===================== KHỐI 6 =====================
  // Chủ đề 1 (Tiết 1 Hát: Con đường học trò -> NLS)
  'kntt-6-t1': {
    grade: 'Lớp 6',
    topicNumber: 1,
    topicTitle: 'Chủ đề 1: Tuổi học trò',
    hasNls: true,
    hasAi: false,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Học sinh biết tìm kiếm, khai thác học liệu số, tra cứu giai điệu bài hát trên môi trường mạng an toàn; sử dụng thiết bị nghe nhìn hỗ trợ học hát.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên hướng dẫn học sinh quét mã QR / truy cập học liệu số để nghe bài hát mẫu "Con đường học trò", quan sát bản phổ điện tử trên màn hình chiếu.',
      studentAction: 'Học sinh sử dụng thiết bị số (máy tính/máy chiếu bảng tương tác), chủ động nghe giai điệu mẫu và tập hát theo bản phổ số hóa.',
    },
  },

  // Chủ đề 3 (Tiết 2 Nhịp 4/4 & Nghe nhạc Nhớ ơn thầy cô -> AI)
  'kntt-6-t3': {
    grade: 'Lớp 6',
    topicNumber: 3,
    topicTitle: 'Chủ đề 3: Nhớ ơn thầy cô',
    hasNls: false,
    hasAi: true,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Trí tuệ nhân tạo (AI): Học sinh tiếp cận công cụ AI nhận diện nhịp điệu 4/4 và gợi ý các tác phẩm âm nhạc cùng thể loại tri ân thầy cô.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép AI)',
      teacherAction: 'Giáo viên thị phạm công cụ trợ lý âm nhạc AI nhận diện phách mạnh - nhẹ của nhịp 4/4 và tự động hiển thị gợi ý các bài hát chủ đề thầy cô.',
      studentAction: 'Học sinh quan sát công cụ AI phân tích nhịp 4/4, lắng nghe gợi ý và liên hệ các bài hát cùng chủ đề tri ân.',
    },
  },

  // Chủ đề 4 (Tiết 2 Nhạc sĩ Văn Ký & Bài ca hi vọng -> QPAN)
  'kntt-6-t4': {
    grade: 'Lớp 6',
    topicNumber: 4,
    topicTitle: 'Chủ đề 4: Ước mơ hoà bình',
    hasNls: false,
    hasAi: false,
    hasQpan: true,
    qpanTopicTitle: 'Chủ đề: Cách đánh mưu trí, sáng tạo của quân và dân ta trong các cuộc kháng chiến chống giặc ngoại xâm.',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Hiểu được hoàn cảnh sáng tác bài hát (1958), khát vọng hòa bình và niềm tin vào thắng lợi; bồi dưỡng lòng yêu nước, khâm phục cách đánh mưu trí, sáng tạo của quân và dân ta.',
    qpanProcessVandun: 'Giới thiệu hoàn cảnh sáng tác bài hát; năm 1958 khi đất nước còn bị chia cắt làm 2 miền. Khát vọng hòa bình, niềm tin vào tương lai đất nước, luôn đấu tranh kiên cường cùng cách đánh mưu trí, sáng tạo của quân và dân ta trong các cuộc kháng chiến chống giặc ngoại xâm. Liên hệ các hình thức chiến đấu sáng tạo như chiến tranh du kích - địa đạo, đường mòn Hồ Chí Minh. Qua đó giới thiệu thêm 1 số bài hát: Du kích ca (Đỗ Nhuận), Mặt trời trong bóng tối, Bước chân trên dãy Trường Sơn.',
  },

  // Chủ đề 5 (Tiết 4 Khèn và sáo trúc -> NLS)
  'kntt-6-t5': {
    grade: 'Lớp 6',
    topicNumber: 5,
    topicTitle: 'Chủ đề 5: Giai điệu quê hương',
    hasNls: true,
    hasAi: false,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Học sinh biết tìm kiếm hình ảnh, video âm thanh nhạc cụ dân tộc (Khèn, Sáo trúc) qua thư viện số âm nhạc.',
    nlsAiProcessStep: {
      activityCode: 'HD3',
      activityTitle: 'Hoạt động 3: Luyện tập & Củng cố',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên trình chiếu thư viện số về nhạc cụ dân gian, hướng dẫn học sinh tra cứu âm sắc Khèn và Sáo trúc.',
      studentAction: 'Học sinh quan sát hình ảnh 3D và video biểu diễn nhạc cụ dân tộc trên nền tảng học liệu số.',
    },
  },

  // Chủ đề 6 (Tiết 1 Hát: Chỉ có một trên đời -> AI)
  'kntt-6-t6': {
    grade: 'Lớp 6',
    topicNumber: 6,
    topicTitle: 'Chủ đề 6: Mẹ trong trái tim em',
    hasNls: false,
    hasAi: true,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Trí tuệ nhân tạo (AI): Trải nghiệm phần mềm/AI hỗ trợ kiểm tra cao độ, phát hiện lỗi chênh phách khi luyện tập hát bài "Chỉ có một trên đời".',
    nlsAiProcessStep: {
      activityCode: 'HD3',
      activityTitle: 'Hoạt động 3: Luyện tập & Củng cố',
      stepName: 'Bước 3: Báo cáo, thảo luận (Lồng ghép AI)',
      teacherAction: 'Giáo viên cho học sinh hát vào micro có phần mềm AI chấm cao độ tự động để các em tự nhận xét sự chuẩn xác của giọng hát.',
      studentAction: 'Học sinh theo dõi thang đo cao độ AI hiển thị trực quan, hào hứng điều chỉnh hơi thở và cao độ khi hát.',
    },
  },

  // Chủ đề 8 (Tiết 2 Như có Bác trong ngày đại thắng -> QPAN)
  'kntt-6-t8': {
    grade: 'Lớp 6',
    topicNumber: 8,
    topicTitle: 'Chủ đề 8: Bác Hồ với thiếu nhi',
    hasNls: false,
    hasAi: false,
    hasQpan: true,
    qpanTopicTitle: 'Chủ đề: Địa danh lịch sử gắn với các cuộc kháng chiến chống giặc ngoại xâm của dân tộc',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Hiểu được ý nghĩa lịch sử thiêng liêng của ngày đại thắng 30/4/1975, vai trò cổ vũ của âm nhạc cách mạng; bồi dưỡng lòng tự hào về các địa danh lịch sử giải phóng đất nước.',
    qpanProcessVandun: 'Giới thiệu hoàn cảnh ra đời của bài hát, ý nghĩa lịch sử và vai trò của bài hát trong việc cổ vũ tinh thần chiến đấu và xây dựng đất nước của nhân dân Việt Nam. Qua đó giới thiệu 1 số địa danh lịch sử trong nước và địa phương bằng hình ảnh, video.',
  },

  // ===================== KHỐI 7 =====================
  // Chủ đề 1 (Tiết 1 Hát Khai trường -> NLS)
  'kntt-7-t1': {
    grade: 'Lớp 7',
    topicNumber: 1,
    topicTitle: 'Chủ đề 1: Ngày khai trường',
    hasNls: true,
    hasAi: false,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Học sinh biết ghi âm phần thể hiện bài hát bằng điện thoại/máy tính cá nhân, chia sẻ sản phẩm thu âm lên nhóm lớp học số an toàn.',
    nlsAiProcessStep: {
      activityCode: 'HD4',
      activityTitle: 'Hoạt động 4: Vận dụng thực tiễn',
      stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên giao nhiệm vụ học sinh về nhà sử dụng thiết bị thông minh tự quay video/ghi âm bài hát "Khai trường" nộp vào kho bài tập số.',
      studentAction: 'Học sinh ghi nhận hướng dẫn kỹ thuật số, thực hiện ghi âm và lưu trữ sản phẩm âm nhạc đúng quy định.',
    },
  },

  // Chủ đề 2 (Tiết 4 Nhạc sĩ Hoàng Việt & Nhạc rừng -> AI)
  'kntt-7-t2': {
    grade: 'Lớp 7',
    topicNumber: 2,
    topicTitle: 'Chủ đề 2: Môi trường xanh',
    hasNls: false,
    hasAi: true,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Trí tuệ nhân tạo (AI): Sử dụng công cụ AI phân tách các lớp âm thanh thiên nhiên (tiếng chim, tiếng suối) trong bài hát "Nhạc rừng".',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép AI)',
      teacherAction: 'Giáo viên bật công cụ AI lọc âm thanh, minh họa cách AI nhận diện âm thanh chim hót, suối reo hòa cùng tiếng hát của bộ đội miền Đông.',
      studentAction: 'Học sinh thích thú quan sát AI phân tích âm thanh đa kênh, cảm nhận sâu sắc vẻ đẹp lạc quan của người chiến sĩ trong tác phẩm.',
    },
  },

  // Chủ đề 4 (Tiết 1 Lí kéo chài -> QPAN)
  'kntt-7-t4': {
    grade: 'Lớp 7',
    topicNumber: 4,
    topicTitle: 'Chủ đề 4: Giai điệu quê hương',
    hasNls: false,
    hasAi: false,
    hasQpan: true,
    qpanTopicTitle: 'Chủ đề: Giới thiệu hình ảnh bảo vệ chủ quyền biển, đảo Việt Nam',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Hiểu vai trò của ngư dân trong phát triển kinh tế biển gắn với bảo vệ chủ quyền biển đảo Tổ quốc; xác định vị trí hai quần đảo Hoàng Sa và Trường Sa trên bản đồ.',
    qpanProcessVandun: 'GV cho HS xem video, hình ảnh về hoạt động đánh bắt hải sản của ngư dân. Giúp học sinh hiểu vai trò của ngư dân trong phát triển kinh tế biển gắn với bảo vệ chủ quyền biển, đảo Việt Nam; giới thiệu vị trí hai quần đảo Hoàng Sa và Trường Sa trên bản đồ Việt Nam, nêu ý nghĩa về kinh tế, quốc phòng và an ninh. Giáo dục tình yêu quê hương, ý thức bảo vệ chủ quyền quốc gia và giữ gìn môi trường biển.',
  },

  // Chủ đề 5 (Tiết 1 Hát Mùa xuân ơi -> NLS; Tiết 3 Cồng chiêng, T'rưng Tây Nguyên -> QPAN)
  'kntt-7-t5': {
    grade: 'Lớp 7',
    topicNumber: 5,
    topicTitle: 'Chủ đề 5: Nhịp điệu mùa xuân',
    hasNls: true,
    hasAi: false,
    hasQpan: true,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Khai thác dữ liệu số về không gian văn hóa cồng chiêng Tây Nguyên và các video biểu diễn mùa xuân.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên chiếu bảo tàng số 3D Không gian văn hóa Cồng chiêng Tây Nguyên cho học sinh khám phá.',
      studentAction: 'Học sinh tương tác trên màn hình chiếu, lắng nghe thanh âm cồng chiêng số hóa sắc nét.',
    },
    qpanTopicTitle: 'Chủ đề: Quyền tự do tín ngưỡng, tôn giáo theo quy định của pháp luật',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Giáo dục ý thức bảo tồn di sản văn hóa phi vật thể, tôn trọng quyền tự do tín ngưỡng, tôn giáo của đồng bào các dân tộc; củng cố khối đại đoàn kết toàn dân tộc.',
    qpanProcessVandun: 'GV giới thiệu cồng chiêng, đàn t’rưng của Tây Nguyên, cho học sinh xem video sinh hoạt văn hóa cồng chiêng và đàn T\'rưng của đồng bào Tây Nguyên, những di sản văn hóa đặc sắc của các dân tộc Việt Nam, GV tổ chức thảo luận ngắn về ý nghĩa của việc giữ gìn bản sắc văn hóa dân tộc; từ đó giáo dục HS ý thức bảo tồn di sản văn hóa phi vật thể, tôn trọng quyền tự do tín ngưỡng, tôn giáo của đồng bào các dân tộc theo quy định của pháp luật, góp phần củng cố khối đại đoàn kết toàn dân tộc trong sự nghiệp xây dựng và bảo vệ Tổ quốc.',
  },

  // Chủ đề 6 (Tiết 4 Cello và Contrabass -> AI)
  'kntt-7-t6': {
    grade: 'Lớp 7',
    topicNumber: 6,
    topicTitle: 'Chủ đề 6: Âm nhạc nước ngoài',
    hasNls: false,
    hasAi: true,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Trí tuệ nhân tạo (AI): Sử dụng AI mô phỏng dải tần âm trầm của đàn Cello và Contrabass so với các nhạc cụ khác trong dàn nhạc.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép AI)',
      teacherAction: 'Giáo viên sử dụng ứng dụng AI so sánh phổ âm trầm của Cello và Contrabass, phát đoạn nhạc mẫu để học sinh phân biệt.',
      studentAction: 'Học sinh quan sát biểu đồ sóng âm AI hiển thị, lắng nghe và nhận diện chính xác âm sắc trầm ấm của Cello.',
    },
  },

  // ===================== KHỐI 8 =====================
  // Chủ đề 1 (Tiết 1 Hát Chào năm học mới -> NLS)
  'kntt-8-t1': {
    grade: 'Lớp 8',
    topicNumber: 1,
    topicTitle: 'Chủ đề 1: Chào năm học mới',
    hasNls: true,
    hasAi: false,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Tự xây dựng danh sách bài hát (playlist) số phục vụ các hoạt động văn nghệ chào mừng năm học mới.',
    nlsAiProcessStep: {
      activityCode: 'HD4',
      activityTitle: 'Hoạt động 4: Vận dụng thực tiễn',
      stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên hướng dẫn các tổ sử dụng nền tảng số tạo danh sách các bài hát tuổi học trò phù hợp biểu diễn khai giảng.',
      studentAction: 'Các nhóm phân công tìm kiếm, chọn lọc nhạc beat chuẩn trên nền tảng số và nộp danh sách bài hát.',
    },
  },

  // Chủ đề 2 (Tiết 1 Hát Việt Nam ơi -> QPAN)
  'kntt-8-t2': {
    grade: 'Lớp 8',
    topicNumber: 2,
    topicTitle: 'Chủ đề 2: Tôi yêu Việt Nam',
    hasNls: false,
    hasAi: false,
    hasQpan: true,
    qpanTopicTitle: 'Chủ đề: Giáo dục lòng tự hào, tự tôn dân tộc và sức mạnh đại đoàn kết toàn dân tộc trong đấu tranh chống giặc ngoại xâm',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Giáo dục lòng tự hào, tự tôn dân tộc, tinh thần vượt khó, hy sinh vì Tổ quốc; nhận thức rõ sức mạnh đại đoàn kết toàn dân tộc trong đấu tranh bảo vệ chủ quyền.',
    qpanProcessVandun: 'Giới thiệu một vài hình ảnh, giáo dục tinh thần vượt khó, hy sinh vì Tổ quốc, khát vọng bảo vệ, dựng xây đất nước hòa bình, ổn định, giữ vững độc lập, chủ quyền dân tộc. Giáo dục lòng tự hào, tự tôn dân tộc và sức mạnh đại đoàn kết toàn dân tộc trong đấu tranh chống giặc ngoại xâm ở mọi tầng lớp, giai cấp.',
  },

  // Chủ đề 3 (Tiết 1 Hát Ngàn ước mơ Việt Nam -> AI)
  'kntt-8-t3': {
    grade: 'Lớp 8',
    topicNumber: 3,
    topicTitle: 'Chủ đề 3: Hoà ca',
    hasNls: false,
    hasAi: true,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Trí tuệ nhân tạo (AI): Sử dụng công cụ AI phối bè tự động, hỗ trợ học sinh nghe mẫu cách bè trầm - bè cao trong hợp xướng.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép AI)',
      teacherAction: 'Giáo viên mở đoạn nhạc AI tạo hòa âm bè mẫu cho bài hát "Ngàn ước mơ Việt Nam" để học sinh cảm nhận hiệu ứng đa thanh.',
      studentAction: 'Học sinh lắng nghe tiếng bè do AI tách lập, thực hành xướng âm theo bè đã được phân công.',
    },
  },

  // Chủ đề 4 (Tiết 1 Hát Nơi ấy Trường Sa -> QPAN)
  'kntt-8-t4': {
    grade: 'Lớp 8',
    topicNumber: 4,
    topicTitle: 'Chủ đề 4: Biển đảo quê hương',
    hasNls: false,
    hasAi: false,
    hasQpan: true,
    qpanTopicTitle: 'Chủ đề: Giới thiệu một số mốc quốc giới',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Giúp học sinh nhận biết vị trí biển đảo của Tổ quốc, nhà giàn, hải đăng, cờ Tổ quốc trên các đảo; hiểu sâu sắc ý nghĩa thiêng liêng của các mốc quốc giới, mốc chủ quyền.',
    qpanProcessVandun: 'Cho học sinh quan sát hình ảnh cột mốc chủ quyền trên đất liền. Giáo viên giới thiệu hình ảnh bản đồ Việt Nam, quần đảo Hoàng Sa, Trường Sa và một số mốc chủ quyền trên biển, giúp học sinh nhận biết vị trí biển, đảo của Tổ quốc, nhà giàn, hải đăng, cờ Tổ quốc trên các đảo và giới thiệu ý nghĩa của các mốc quốc giới, mốc chủ quyền.',
  },

  // Chủ đề 5 (Tiết 2 Trần Hoàn & Một mùa xuân nho nhỏ -> AI)
  'kntt-8-t5': {
    grade: 'Lớp 8',
    topicNumber: 5,
    topicTitle: 'Chủ đề 5: Chào xuân',
    hasNls: false,
    hasAi: true,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Trí tuệ nhân tạo (AI): Ứng dụng AI tra cứu tiểu sử, danh mục tác phẩm và bối cảnh sáng tác của nhạc sĩ Trần Hoàn.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép AI)',
      teacherAction: 'Giáo viên hướng dẫn câu lệnh (prompt) mẫu để học sinh tra cứu các tác phẩm tiêu biểu của nhạc sĩ Trần Hoàn qua nền tảng dữ liệu số/AI.',
      studentAction: 'Học sinh tóm tắt thông tin tác giả, tác phẩm "Một mùa xuân nho nhỏ" (thơ Thanh Hải, nhạc Trần Hoàn).',
    },
  },

  // Chủ đề 8 (Tiết 2 Frederic Chopin -> NLS)
  'kntt-8-t8': {
    grade: 'Lớp 8',
    topicNumber: 8,
    topicTitle: 'Chủ đề 8: Nhịp điệu mùa hè',
    hasNls: true,
    hasAi: false,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Tìm kiếm và thưởng thức các bản ghi âm chất lượng cao kiệt tác của F. Chopin trên thư viện nhạc cổ điển số.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên chia sẻ đường link nghe trực tuyến tác phẩm "Fantaisie Impromptu in C Sharp Minor" do các nghệ sĩ piano quốc tế trình tấu.',
      studentAction: 'Học sinh thưởng thức tác phẩm trên thiết bị số, cảm nhận tốc độ linh hoạt và âm sắc điêu luyện của đàn piano.',
    },
  },

  // ===================== KHỐI 9 =====================
  // Chủ đề 1 (Tiết 2 Đọc nhạc số 1 -> AI; Tiết 4 Nhạc sĩ Huy Du & Đường chúng ta đi -> QPAN)
  'kntt-9-t1': {
    grade: 'Lớp 9',
    topicNumber: 1,
    topicTitle: 'Chủ đề 1: Nối vòng tay lớn',
    hasNls: false,
    hasAi: true,
    hasQpan: true,
    nlsAiObjective: 'Lồng ghép Trí tuệ nhân tạo (AI): Sử dụng công cụ AI phân tích quãng âm, cao độ trong Bài đọc nhạc số 1.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép AI)',
      teacherAction: 'Giáo viên hướng dẫn học sinh xem AI phân tích cấu trúc các quãng 2, quãng 3 trong bài đọc nhạc.',
      studentAction: 'Học sinh đọc nhạc chuẩn cao độ dựa trên biểu đồ phân tích quãng AI.',
    },
    qpanTopicTitle: 'Chủ đề: Một số hình ảnh về phát triển kinh tế, xã hội và bảo đảm quốc phòng, an ninh.',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Hiểu rõ mối liên hệ giữa phát triển kinh tế - xã hội (kinh tế biển, điện gió, cảng biển) với bảo đảm quốc phòng an ninh bảo vệ vững chắc Tổ quốc.',
    qpanProcessVandun: 'GV trình chiếu hình ảnh phát triển kinh tế trên biển: điện gió, cảng biển, ngư dân bám biển, hải quân bảo vệ biển đảo; phát triển kinh tế trên đất liền hoặc có thể đặt câu hỏi thảo luận: "Phát triển kinh tế biển gắn liền với yếu tố nào để đảm bảo quốc phòng an ninh?". GV kết luận: phát triển kinh tế luôn gắn với củng cố quốc phòng, an ninh.',
  },

  // Chủ đề 3 (Tiết 1 Hát Tháng năm học trò -> NLS)
  'kntt-9-t3': {
    grade: 'Lớp 9',
    topicNumber: 3,
    topicTitle: 'Chủ đề 3: Kỉ niệm dưới mái trường',
    hasNls: true,
    hasAi: false,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Thiết kế video kỷ yếu âm nhạc số kết hợp bài hát "Tháng năm học trò" lưu giữ kỷ niệm tuổi học trò cuối cấp THCS.',
    nlsAiProcessStep: {
      activityCode: 'HD4',
      activityTitle: 'Hoạt động 4: Vận dụng thực tiễn',
      stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên khuyến khích học sinh dùng phần mềm biên tập video số lồng ghép hình ảnh tập thể lớp trên nền nhạc bài hát.',
      studentAction: 'Học sinh thực hiện clip kỷ yếu ngắn đầy ý nghĩa, rèn luyện kỹ năng số hóa sản phẩm văn hóa nghệ thuật.',
    },
  },

  // Chủ đề 5 (Tiết 1 Hát Ngôi nhà của chúng ta -> AI)
  'kntt-9-t5': {
    grade: 'Lớp 9',
    topicNumber: 5,
    topicTitle: 'Chủ đề 5: Trái đất xanh',
    hasNls: false,
    hasAi: true,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Trí tuệ nhân tạo (AI): Sử dụng AI tạo nền âm thanh tự nhiên (tiếng sóng, tiếng gió, rừng xanh) làm nhạc đệm sinh động cho bài hát "Ngôi nhà của chúng ta".',
    nlsAiProcessStep: {
      activityCode: 'HD3',
      activityTitle: 'Hoạt động 3: Luyện tập & Củng cố',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép AI)',
      teacherAction: 'Giáo viên kích hoạt đoạn nhạc nền hiệu ứng sinh thái tạo bằng AI, bắt nhịp cho học sinh hát hòa giọng.',
      studentAction: 'Học sinh hát trên nền âm thanh sinh thái sống động, nâng cao ý thức bảo vệ hành tinh xanh.',
    },
  },

  // Chủ đề 6 (Tiết 2 Chúng em cần hòa bình -> QPAN)
  'kntt-9-t6': {
    grade: 'Lớp 9',
    topicNumber: 6,
    topicTitle: 'Chủ đề 6: Tiếng hát hòa bình',
    hasNls: false,
    hasAi: false,
    hasQpan: true,
    qpanTopicTitle: 'Chủ đề: Hậu quả của các cuộc chiến tranh xâm lược đối với dân tộc Việt Nam.',
    qpanObjective: 'Tích hợp Quốc phòng và An ninh (QPAN): Hiểu sâu sắc thông điệp yêu hòa bình trong âm nhạc; nhận thức được hậu quả nặng nề của chiến tranh xâm lược đối với dân tộc Việt Nam, từ đó nâng cao ý thức trách nhiệm bảo vệ Tổ quốc.',
    qpanProcessVandun: 'Sau khi nghe tác phẩm, GV đặt câu hỏi: "Âm nhạc gửi gắm thông điệp gì về hòa bình?". HS trả lời. GV liên hệ hậu quả chiến tranh, giáo dục lòng yêu hòa bình và ý thức bảo vệ Tổ quốc.',
  },

  // Chủ đề 7 (Tiết 2 Franz Schubert & Serenade -> NLS)
  'kntt-9-t7': {
    grade: 'Lớp 9',
    topicNumber: 7,
    topicTitle: 'Chủ đề 7: Âm nhạc nước ngoài',
    hasNls: true,
    hasAi: false,
    hasQpan: false,
    nlsAiObjective: 'Lồng ghép Năng lực số (NLS): Tìm hiểu kho tàng ca khúc nghệ thuật (Lied) của nhạc sĩ F. Schubert trên các nền tảng bách khoa toàn thư âm nhạc số.',
    nlsAiProcessStep: {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 2: Thực hiện nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên hướng dẫn học sinh tra cứu các phiên bản biểu diễn khúc nhạc "Serenade" (Dạ khúc) trên các kho nhạc số thế giới.',
      studentAction: 'Học sinh so sánh âm sắc bản độc tấu vĩ cầm và bản hát có lời trên thiết bị nghe nhìn.',
    },
  },
};

/**
 * Lấy cấu hình lồng ghép chuẩn cho một bài học/chủ đề cụ thể
 */
export function getMusicIntegrationGuide(lessonId: string): IntegrationTopicGuide | undefined {
  return MUSIC_INTEGRATION_MAP[lessonId];
}

/**
 * Lấy toàn bộ danh sách các địa chỉ lồng ghép theo khối lớp từ tài liệu hướng dẫn
 */
export function getIntegrationGuidesForGrade(grade: 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9'): {
  id: string;
  guide: IntegrationTopicGuide;
}[] {
  return Object.entries(MUSIC_INTEGRATION_MAP)
    .filter(([_, g]) => g.grade === grade)
    .map(([id, guide]) => ({ id, guide }));
}

/**
 * Lấy nội dung tích hợp chuẩn dựa vào tài liệu hướng dẫn đính kèm cho một chủ đề:
 * Nếu bài học có trực tiếp trong danh mục hướng dẫn thì dùng trực tiếp;
 * Đồng thời đảm bảo có đầy đủ cả 2 nội dung: Lồng ghép NLS-AI và Tích hợp ANQP từ hướng dẫn của khối lớp.
 */
export function resolveOfficialLessonIntegration(grade: 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9', topicNumber: number): {
  nlsAiObjective: string;
  nlsAiProcessStep: {
    activityCode: 'HD1' | 'HD2' | 'HD3' | 'HD4';
    activityTitle: string;
    stepName: string;
    teacherAction: string;
    studentAction: string;
  };
  qpanTopicTitle: string;
  qpanObjective: string;
  qpanProcessVandun: string;
  sourceNote: string;
} {
  const directKey = `kntt-${grade.replace('Lớp ', '')}-t${topicNumber}`;
  const directGuide = MUSIC_INTEGRATION_MAP[directKey];

  // Tìm mẫu NLS/AI từ tài liệu hướng dẫn của khối lớp
  const gradeGuides = Object.values(MUSIC_INTEGRATION_MAP).filter(g => g.grade === grade);
  const nlsAiSource = (directGuide && (directGuide.hasNls || directGuide.hasAi))
    ? directGuide
    : (gradeGuides.find(g => g.hasNls || g.hasAi) || MUSIC_INTEGRATION_MAP['kntt-7-t1']);

  // Tìm mẫu ANQP từ Phụ lục hướng dẫn của khối lớp
  const qpanSource = (directGuide && directGuide.hasQpan)
    ? directGuide
    : (gradeGuides.find(g => g.hasQpan) || MUSIC_INTEGRATION_MAP['kntt-7-t4']);

  return {
    nlsAiObjective: nlsAiSource.nlsAiObjective || 'Lồng ghép Năng lực số (NLS): Học sinh biết tìm kiếm, khai thác học liệu số, tra cứu giai điệu bài hát trên môi trường mạng an toàn; sử dụng thiết bị nghe nhìn hỗ trợ học hát.',
    nlsAiProcessStep: nlsAiSource.nlsAiProcessStep || {
      activityCode: 'HD2',
      activityTitle: 'Hoạt động 2: Hình thành kiến thức mới',
      stepName: 'Bước 1: Chuyển giao nhiệm vụ (Lồng ghép NLS)',
      teacherAction: 'Giáo viên hướng dẫn học sinh quét mã QR / truy cập học liệu số để nghe bài hát mẫu, quan sát bản phổ điện tử trên màn hình chiếu.',
      studentAction: 'Học sinh sử dụng thiết bị số (máy tính/máy chiếu bảng tương tác), chủ động nghe giai điệu mẫu và tập hát theo bản phổ số hóa.',
    },
    qpanTopicTitle: qpanSource.qpanTopicTitle || 'Chủ đề: Giáo dục lòng yêu nước, giữ gìn bản sắc văn hóa dân tộc và bảo vệ chủ quyền biên giới, biển đảo Việt Nam.',
    qpanObjective: qpanSource.qpanObjective || 'Tích hợp Quốc phòng và An ninh (QPAN): Hiểu vai trò của văn hóa nghệ thuật và ngư dân, chiến sĩ trong giữ gìn bản sắc dân tộc gắn với bảo vệ chủ quyền biển, đảo và biên cương Tổ quốc.',
    qpanProcessVandun: qpanSource.qpanProcessVandun || 'Giáo viên giới thiệu hình ảnh, video tư liệu, tổ chức thảo luận ngắn về ý thức bảo tồn di sản văn hóa dân tộc và trách nhiệm bảo vệ chủ quyền lãnh thổ, củng cố khối đại đoàn kết toàn dân tộc.',
    sourceNote: directGuide 
      ? `Địa chỉ trực tiếp theo tài liệu hướng dẫn (${directGuide.topicTitle})`
      : `Địa chỉ chuẩn theo Phụ lục hướng dẫn môn Âm nhạc ${grade} năm học 2026-2027`
  };
}
