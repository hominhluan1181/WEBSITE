/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pedagogical Templates conforming to CV 5512/BGDĐT-GDTrH & CV 7991/BGDĐT-GDTrH (17/12/2024)
 */

import { LessonPlan5512, SlideItem, Exam7991, ProjectState, defaultTeacherProfile } from '../types/eduharness';

export const mathGrade10Template: ProjectState = {
  version: "1.0-CV7991-CV5512",
  updatedAt: new Date().toISOString(),
  activeModule: "khbd",
  teacherProfile: {
    ...defaultTeacherProfile,
    subject: "Toán học",
    department: "TỔ TOÁN - TIN HỌC"
  },
  khbd: {
    schoolName: "TRƯỜNG THPT CHUYÊN LÊ HỒNG PHONG",
    department: "TỔ TOÁN - TIN HỌC",
    teacherName: "NGUYỄN VĂN AN",
    subject: "Toán học",
    grade: "Lớp 10",
    lessonTitle: "BÀI 1: KHÁI NIỆM VECTƠ VÀ CÁC PHÉP TOÁN TRÊN VECTƠ",
    durationPeriods: 2,
    semester: "Học kỳ I",
    academicYear: "2024 - 2025",
    objectives: {
      knowledge: [
        "Hiểu được định nghĩa vectơ, vectơ-không, độ dài của vectơ, hai vectơ cùng phương, cùng hướng, ngược hướng và hai vectơ bằng nhau.",
        "Nắm vững quy tắc ba điểm, quy tắc hình bình hành trong phép cộng và trừ vectơ.",
        "Vận dụng tính chất vectơ để giải quyết bài toán hình học và các hiện tượng tổng hợp lực trong vật lí."
      ],
      competencies: {
        general: [
          "Năng lực tự chủ và tự học: Chủ động tìm tòi, nghiên cứu SGK và phiếu học tập cá nhân.",
          "Năng lực giao tiếp và hợp tác: Tương tác nhóm 4 học sinh, phản biện và thống nhất kết quả giải bài.",
          "Năng lực giải quyết vấn đề và sáng tạo: Mô hình hóa bài toán thực tế kéo thuyền hoặc tổng hợp lực kéo."
        ],
        subject: [
          "Năng lực tư duy và lập luận toán học: So sánh phương, hướng, độ lớn giữa các đại lượng có hướng.",
          "Năng lực mô hình hóa toán học: Biểu diễn chuyển động của chất điểm bằng vectơ vận tốc, gia tốc."
        ]
      },
      qualities: [
        "Chăm chỉ: Tích cực hoàn thành nhiệm vụ học tập theo nhóm và cá nhân.",
        "Trung thực: Khách quan trong thảo luận và tự đánh giá sản phẩm của bạn học.",
        "Trách nhiệm: Có ý thức kỉ luật và tinh thần phối hợp nhóm cao."
      ]
    },
    equipment: {
      teacher: [
        "Kế hoạch bài dạy, giáo án điện tử trình chiếu đa phương tiện (Slides).",
        "Mô hình thực nghiệm lực kế đo lực kéo hai hướng, phiếu học tập số 1, 2, 3.",
        "Thước thẳng chia vạch, phấn màu hoặc bút dạ bảng tương tác."
      ],
      students: [
        "Sách giáo khoa Toán 10 (Bộ sách Kết nối tri thức với cuộc sống), vở ghi chép.",
        "Thước kẻ, compa, bút dạ, bảng phụ nhóm (khổ A3) để trình bày kết quả."
      ]
    },
    activities: [
      {
        id: "act-1",
        code: "HD1",
        title: "Hoạt động 1: Mở đầu / Khởi động (Tạo tâm thế và gợi mở vấn đề)",
        timeMinutes: 7,
        objective: "Kích thích hứng thú tìm tòi; nhận thức được sự khác biệt giữa đại lượng vô hướng (khối lượng, nhiệt độ) và đại lượng có hướng (lực, vận tốc).",
        content: "Quan sát hình ảnh hai chiếc thuyền kéo sà lan trên sông cùng hướng hoặc chếch nhau góc 60 độ. Học sinh thảo luận: 'Để sà lan đi thẳng về phía trước thì lực kéo phải được xác định bởi những yếu tố nào?'",
        product: "Học sinh nêu được câu trả lời: Lực kéo vừa cần biết độ mạnh yếu (độ lớn), vừa cần biết phương và chiều kéo. Từ đó nảy sinh nhu cầu về một công cụ toán học biểu diễn đại lượng có hướng.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Chiếu hình ảnh trực quan hai tàu kéo kéo sà lan trên màn hình. Yêu cầu cả lớp suy nghĩ cá nhân trong 1 phút, sau đó thảo luận cặp đôi trả lời câu hỏi khởi động.",
            studentAction: "Tiếp nhận câu hỏi, quan sát tranh vẽ và liên hệ với kiến thức thực tế đời sống."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Quan sát các bàn trao đổi, gợi mở thêm: 'Nếu hai tàu kéo cùng phương nhưng ngược chiều thì sà lan chuyển động thế nào?'.",
            studentAction: "Trao đổi với bạn cùng bàn, ghi nhanh các từ khóa: phương, chiều, độ lớn vào nháp."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Mời đại diện 2 học sinh phát biểu. Yêu cầu các học sinh khác nhận xét, bổ sung.",
            studentAction: "Đại diện học sinh trả lời: 'Lực kéo phụ thuộc vào độ lớn và hướng kéo'. Học sinh khác gật đầu tán thành."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Giáo viên nhận xét, chốt kiến thức: 'Trong toán học và vật lí, những đại lượng vừa có độ lớn vừa có hướng được mô hình hóa bằng khái niệm Vectơ. Chúng ta cùng vào bài học mới'.",
            studentAction: "Ghi tên bài học vào vở và chuẩn bị tâm thế bước vào phần Khám phá kiến thức."
          }
        ]
      },
      {
        id: "act-2",
        code: "HD2",
        title: "Hoạt động 2: Hình thành kiến thức mới (Khám phá và tiếp nhận tri thức)",
        timeMinutes: 20,
        objective: "Học sinh xây dựng được định nghĩa vectơ; điểm đầu, điểm cuối, phương, hướng; hai vectơ cùng hướng, ngược hướng, hai vectơ bằng nhau và quy tắc cộng ba điểm.",
        content: "Nghiên cứu mục 1 SGK, thực hiện Phiếu học tập số 1: Cho hình bình hành ABCD. Xác định các vectơ có điểm đầu và điểm cuối là các đỉnh A, B, C, D. Tìm các cặp vectơ cùng phương, cùng hướng, ngược hướng và bằng nhau.",
        product: "Bảng nhóm A3 hoàn thành: Định nghĩa vectơ là đoạn thẳng có hướng. Kí hiệu AB→, a→. Nhận diện được AB→ = DC→, AD→ = BC→ và quy tắc 3 điểm AB→ + BC→ = AC→.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Chia lớp thành 6 nhóm học tập. Phát phiếu học tập số 1. Yêu cầu nhóm vẽ hình bình hành ABCD, gọi O là giao điểm hai đường chéo, chỉ ra các cặp vectơ bằng nhau.",
            studentAction: "Các nhóm nhận phiếu, phân công nhóm trưởng điều hành, thư ký ghi chép."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Đi vòng quanh hỗ trợ các nhóm gặp khó khăn khi phân biệt 'cùng phương' và 'cùng hướng', hướng dẫn quy tắc đặt ngón tay từ điểm đầu đến điểm cuối.",
            studentAction: "Học sinh tích cực tranh luận trong nhóm: 'Vectơ AB và BA có bằng nhau không?', 'Tại sao vectơ AB và CD lại ngược hướng?'."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Yêu cầu nhóm 2 treo sản phẩm lên bảng chính. Mời nhóm 5 nhận xét chéo.",
            studentAction: "Đại diện nhóm 2 tự tin thuyết trình về các cặp vectơ bằng nhau. Nhóm 5 đặt câu hỏi phản biện về vectơ-không."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Chuẩn hóa kiến thức lên bảng: Định nghĩa chính xác, điều kiện để hai vectơ bằng nhau (cùng hướng và cùng độ dài). Giới thiệu quy tắc ba điểm và quy tắc hình bình hành.",
            studentAction: "Lắng nghe, ghi chú kiến thức trọng tâm vào vở đóng khung cẩn thận."
          }
        ]
      },
      {
        id: "act-3",
        code: "HD3",
        title: "Hoạt động 3: Luyện tập (Củng cố và rèn luyện kỹ năng)",
        timeMinutes: 12,
        objective: "Củng cố kĩ năng xác định vectơ, tính độ dài, cộng trừ vectơ thông qua hệ thống bài tập trắc nghiệm và tự luận ngắn.",
        content: "Giải bài tập trong Phiếu số 2: Bài 1 (Nhận diện vectơ trên lục giác đều ABCDEF tâm O), Bài 2 (Chứng minh đẳng thức vectơ OA→ + OB→ + OC→ = 0→ khi O là trọng tâm tam giác).",
        product: "Lời giải chuẩn xác của học sinh trên bảng con hoặc vở bài tập. Rút ra phương pháp biến đổi vectơ bằng quy tắc xen điểm.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Giao nhiệm vụ cá nhân làm Bài 1 trong 3 phút, sau đó đổi chéo vở chấm điểm nhanh.",
            studentAction: "Đọc đề, vẽ hình lục giác đều tâm O vào vở nháp và xác định vectơ theo yêu cầu."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Quan sát tiến độ, gọi 2 học sinh lên bảng giải trực tiếp 2 câu hỏi.",
            studentAction: "Tập trung giải bài, hai học sinh lên bảng hoàn thành bài giải chi tiết."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Yêu cầu cả lớp quan sát bài trên bảng, phát hiện lỗi sai sót về kí hiệu mũi tên vectơ hoặc suy luận.",
            studentAction: "Học sinh dưới lớp nhận xét, bổ sung cách giải nhanh hơn bằng tính chất đối xứng."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Chốt lại các lỗi thường gặp: Quên kí hiệu mũi tên, nhầm lẫn giữa đoạn thẳng AB và độ dài vectơ |AB→|.",
            studentAction: "Ghi nhận bài học kinh nghiệm và sửa chữa bài giải trong vở."
          }
        ]
      },
      {
        id: "act-4",
        code: "HD4",
        title: "Hoạt động 4: Vận dụng (Mở rộng và gắn với thực tiễn)",
        timeMinutes: 6,
        objective: "Vận dụng kiến thức vectơ để tính hợp lực trong vật lí và lập sơ đồ bay của máy bay khi có vận tốc gió tác động.",
        content: "Tình huống thực tế: Một chiếc máy bay bay theo hướng Bắc với vận tốc 700 km/h, gặp luồng gió thổi theo hướng Đông với vận tốc 100 km/h. Hãy biểu diễn các vectơ vận tốc và tính vận tốc thực tế của máy bay so với mặt đất.",
        product: "Bản vẽ hình học vectơ vận tốc hợp lực và kết quả tính độ lớn v ≈ 707.1 km/h theo định lí Pythagore.",
        steps: [
          {
            stepName: "Bước 1: Chuyển giao nhiệm vụ học tập",
            teacherAction: "Chiếu đề bài tình huống hàng không lên màn hình. Đặt câu hỏi kích thích tư duy giải quyết vấn đề.",
            studentAction: "Ghi chép thông số bài toán, vẽ hệ trục toạ độ Đông - Tây - Nam - Bắc."
          },
          {
            stepName: "Bước 2: Thực hiện nhiệm vụ học tập",
            teacherAction: "Gợi ý áp dụng quy tắc hình chữ nhật và định lí Pythagore để tính độ dài vectơ tổng.",
            studentAction: "Học sinh tính toán: v^2 = 700^2 + 100^2 = 500000 => v = 707.1 km/h."
          },
          {
            stepName: "Bước 3: Báo cáo kết quả và thảo luận",
            teacherAction: "Mời 1 học sinh trả lời miệng nhanh kết quả và giải thích ý nghĩa trong điều khiển máy bay.",
            studentAction: "Học sinh trình bày kết quả và nêu nhận xét: Phi công phải chỉnh góc lái để bù trừ sức gió."
          },
          {
            stepName: "Bước 4: Đánh giá kết quả, kết luận",
            teacherAction: "Khen ngợi tư duy liên môn Toán - Lí. Giao nhiệm vụ tự học ở nhà tìm hiểu thêm về tích vô hướng.",
            studentAction: "Lắng nghe hướng dẫn tự học về nhà và kết thúc tiết học hào hứng."
          }
        ]
      }
    ]
  },
  slides: [
    {
      id: "slide-1",
      slideNumber: 1,
      title: "VECTƠ VÀ CÁC PHÉP TOÁN TRÊN VECTƠ",
      subtitle: "Toán học 10 - Chương trình GDPT 2018 (Công văn 5512)",
      category: "intro",
      bullets: [
        "Trường THPT Chuyên Lê Hồng Phong - Tổ Toán - Tin",
        "Giáo viên thực hiện: ThS. Nguyễn Văn An",
        "Thời lượng: 2 tiết học chuẩn sư phạm",
        "Mô hình học tập: Dạy học tích cực lấy học sinh làm trung tâm"
      ],
      highlightQuote: "Toán học là chìa khóa mở cánh cửa khám phá mọi chuyển động của vũ trụ.",
      teacherNotes: "Chào lớp, kiểm tra sĩ số nhanh, tạo không khí hào hứng và giới thiệu chủ đề mới.",
      estimatedMinutes: 3,
      keyVisualIcon: "Compass"
    },
    {
      id: "slide-2",
      slideNumber: 2,
      title: "MỤC TIÊU BÀI HỌC CẦN ĐẠT",
      subtitle: "Chuẩn phẩm chất & năng lực theo CT GDPT 2018",
      category: "objective",
      bullets: [
        "Về kiến thức: Nắm vững định nghĩa vectơ, hai vectơ cùng hướng, bằng nhau, quy tắc cộng trừ.",
        "Về năng lực: Mô hình hóa các hiện tượng cơ học, tư duy logic và lập luận toán học sắc bén.",
        "Về phẩm chất: Rèn luyện tính cẩn thận, chính xác, tinh thần làm việc nhóm kỷ luật.",
        "Đích đến: Vận dụng giải quyết tình huống thực tế liên môn Vật lí và Đời sống."
      ],
      highlightQuote: "Mỗi bước đi của bài toán đều gắn liền với ý nghĩa thực tiễn rõ ràng.",
      teacherNotes: "Nhấn mạnh yêu cầu cần đạt để học sinh tự theo dõi mức độ tiếp thu trong suốt tiết học.",
      estimatedMinutes: 2,
      keyVisualIcon: "Target"
    },
    {
      id: "slide-3",
      slideNumber: 3,
      title: "HOẠT ĐỘNG 1: KHỞI ĐỘNG - GỢI MỞ VẤN ĐỀ",
      subtitle: "Thử thách kéo tàu trên sông - Khám phá đại lượng có hướng",
      category: "activity1",
      bullets: [
        "Tình huống: Hai tàu kéo tác dụng lực kéo sà lan trên sông.",
        "Câu hỏi 1: Lực tác dụng chỉ cần biết độ mạnh yếu hay còn yếu tố nào khác?",
        "Câu hỏi 2: Làm sao để biểu diễn hướng chuyển động vừa có độ lớn vừa có chiều trên trang giấy?",
        "Kết luận: Cần xây dựng khái niệm VECTƠ - Đoạn thẳng định hướng!"
      ],
      highlightQuote: "Một đại lượng chỉ có độ lớn là chưa đủ để định hình không gian chuyển động.",
      teacherNotes: "Tổ chức cho học sinh thảo luận cặp đôi 2 phút, bấm giờ trên màn hình, gọi 2 em trả lời.",
      estimatedMinutes: 7,
      keyVisualIcon: "Sparkles"
    },
    {
      id: "slide-4",
      slideNumber: 4,
      title: "HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC",
      subtitle: "Định nghĩa vectơ, độ dài và các tính chất cơ bản",
      category: "activity2",
      bullets: [
        "1. Vectơ là một đoạn thẳng có hướng: Điểm đầu A, điểm cuối B (Kí hiệu: AB→).",
        "2. Hai vectơ cùng phương: Giá của chúng song song hoặc trùng nhau.",
        "3. Hai vectơ bằng nhau: Cùng hướng VÀ cùng độ dài (|a→| = |b→|).",
        "4. Quy tắc ba điểm (Cộng): Với 3 điểm A, B, C bất kì: AB→ + BC→ = AC→.",
        "5. Quy tắc hình bình hành: Nếu ABCD là hình bình hành thì AB→ + AD→ = AC→."
      ],
      highlightQuote: "Vectơ bằng nhau khi và chỉ khi cùng hướng và cùng độ dài tuyệt đối.",
      teacherNotes: "Cho các nhóm thực hiện Phiếu học tập số 1, kiểm tra các nhóm vẽ hình bình hành và nhận xét chéo.",
      estimatedMinutes: 20,
      keyVisualIcon: "BookOpen"
    },
    {
      id: "slide-5",
      slideNumber: 5,
      title: "HOẠT ĐỘNG 3: LUYỆN TẬP - CỦNG CỐ KỸ NĂNG",
      subtitle: "Thực hành trên hình học phẳng và quy tắc xen điểm",
      category: "activity3",
      bullets: [
        "Bài tập 1: Cho lục giác đều ABCDEF tâm O. Tìm các vectơ bằng với vectơ AB→.",
        "Bài tập 2: Cho tam giác ABC, gọi M là trung điểm BC. Chứng minh: AB→ + AC→ = 2AM→.",
        "Lưu ý vàng: Luôn kiểm tra chiều mũi tên vectơ, không đồng nhất độ dài với vectơ!",
        "Thử thách tốc độ: Bấm giờ 3 phút giải nhanh bài tập trắc nghiệm số 1."
      ],
      highlightQuote: "Thực hành liên tục là con đường duy nhất biến kiến thức thành bản năng.",
      teacherNotes: "Bấm giờ đếm ngược 3 phút, quan sát học sinh làm bài, gọi bạn học sinh nhận xét lỗi sai thường gặp.",
      estimatedMinutes: 12,
      keyVisualIcon: "CheckCircle"
    },
    {
      id: "slide-6",
      slideNumber: 6,
      title: "HOẠT ĐỘNG 4: VẬN DỤNG & TỔNG KẾT",
      subtitle: "Ứng dụng trong hàng không và hướng dẫn tự học",
      category: "activity4",
      bullets: [
        "Bài toán hàng không: Tính vận tốc thực của máy bay khi gặp gió ngang 100 km/h.",
        "Kết quả tính toán: v = √(700² + 100²) ≈ 707.1 km/h, góc lệch phi công cần chỉnh.",
        "Nhiệm vụ về nhà: Hoàn thành bài tập 1, 2, 3 SGK trang 84.",
        "Chuẩn bị bài mới: Tìm hiểu phép nhân vectơ với một số thực (k.a→)."
      ],
      highlightQuote: "Học đi đôi với hành, mang tri thức lớp học soi rọi vào thực tiễn cuộc sống.",
      teacherNotes: "Tuyên dương các cá nhân và nhóm tích cực. Nhắc nhở nộp bài tập về nhà trên LMS.",
      estimatedMinutes: 6,
      keyVisualIcon: "Award"
    }
  ],
  exam: {
    title: "ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KỲ I - TOÁN 10",
    examType: "Kiểm tra giữa học kỳ",
    subject: "Toán học",
    grade: "Lớp 10",
    timeAllowedMinutes: 90,
    examCode: "TOAN10-GK1-7991",
    totalScore: 10.0,
    matrix: [
      {
        id: "mat-1",
        topic: "Vectơ và các phép toán",
        subTopic: "Khái niệm vectơ, hai vectơ bằng nhau, cùng phương",
        part1_mcq: { know: 4, understand: 2, apply: 0 },
        part2_trueFalse: { know: 1, understand: 1, apply: 0 },
        part3_shortAns: { know: 1, understand: 1, apply: 0 },
        part4_essay: { know: 0, understand: 1, apply: 0 },
        scoreAllocation: 4.0
      },
      {
        id: "mat-2",
        topic: "Tổng và hiệu hai vectơ",
        subTopic: "Quy tắc 3 điểm, quy tắc hình bình hành, độ dài vectơ tổng",
        part1_mcq: { know: 2, understand: 2, apply: 2 },
        part2_trueFalse: { know: 0, understand: 1, apply: 1 },
        part3_shortAns: { know: 0, understand: 1, apply: 1 },
        part4_essay: { know: 0, understand: 0, apply: 1 },
        scoreAllocation: 3.5
      },
      {
        id: "mat-3",
        topic: "Tích của vectơ với một số & Ứng dụng",
        subTopic: "Trung điểm, trọng tâm tam giác, bài toán thực tiễn tổng hợp lực",
        part1_mcq: { know: 1, understand: 1, apply: 0 },
        part2_trueFalse: { know: 0, understand: 0, apply: 1 },
        part3_shortAns: { know: 0, understand: 0, apply: 1 },
        part4_essay: { know: 0, understand: 0, apply: 1 },
        scoreAllocation: 2.5
      }
    ],
    specifications: [
      {
        id: "spec-1",
        topic: "Vectơ và các phép toán",
        subTopic: "Khái niệm vectơ",
        learningOutcomes: {
          know: [
            "Nhận biết được định nghĩa vectơ, kí hiệu vectơ, điểm đầu, điểm cuối.",
            "Nhận biết được vectơ-không và hướng của vectơ-không."
          ],
          understand: [
            "Hiểu điều kiện để hai vectơ cùng phương, cùng hướng và ngược hướng.",
            "Xác định được hai vectơ bằng nhau khi cùng hướng và cùng độ dài."
          ],
          apply: [
            "Vận dụng tính chất vectơ cùng phương để chứng minh ba điểm thẳng hàng."
          ]
        },
        part1Count: { know: 4, understand: 2, apply: 0 },
        part2Count: { know: 1, understand: 1, apply: 0 },
        part3Count: { know: 1, understand: 1, apply: 0 },
        part4Count: { know: 0, understand: 1, apply: 0 },
        competencyCode: "NL1: Tư duy & lập luận toán học"
      },
      {
        id: "spec-2",
        topic: "Tổng và hiệu hai vectơ",
        subTopic: "Quy tắc 3 điểm, hình bình hành",
        learningOutcomes: {
          know: [
            "Phát biểu được quy tắc 3 điểm với phép cộng và phép trừ hai vectơ.",
            "Phát biểu được quy tắc hình bình hành."
          ],
          understand: [
            "Hiểu và áp dụng quy tắc xen điểm để tính toán hoặc rút gọn biểu thức vectơ.",
            "Tính được độ dài của vectơ tổng trong các tam giác đặc biệt (vuông, đều)."
          ],
          apply: [
            "Vận dụng quy tắc hình bình hành giải bài toán tổng hợp lực thực tế."
          ]
        },
        part1Count: { know: 2, understand: 2, apply: 2 },
        part2Count: { know: 0, understand: 1, apply: 1 },
        part3Count: { know: 0, understand: 1, apply: 1 },
        part4Count: { know: 0, understand: 0, apply: 1 },
        competencyCode: "NL2: Mô hình hóa toán học"
      },
      {
        id: "spec-3",
        topic: "Tích vectơ với số và Ứng dụng",
        subTopic: "Tính chất trung điểm, trọng tâm",
        learningOutcomes: {
          know: [
            "Nhận biết công thức vectơ trung điểm: IA→ + IB→ = 0→.",
            "Nhận biết công thức vectơ trọng tâm tam giác: GA→ + GB→ + GC→ = 0→."
          ],
          understand: [
            "Biểu diễn được một vectơ theo hai vectơ không cùng phương."
          ],
          apply: [
            "Giải quyết bài toán cực trị độ dài hoặc chuyển động máy bay trong môi trường có lực cản."
          ]
        },
        part1Count: { know: 1, understand: 1, apply: 0 },
        part2Count: { know: 0, understand: 0, apply: 1 },
        part3Count: { know: 0, understand: 0, apply: 1 },
        part4Count: { know: 0, understand: 0, apply: 1 },
        competencyCode: "NL3: Giải quyết vấn đề toán học"
      }
    ],
    // Part I: 12 multiple choice questions (3.0 pts total, 0.25 pt each)
    part1_mcq: [
      {
        id: "p1-q1",
        number: 1,
        question: "Cho đoạn thẳng AB có độ dài bằng 6 cm. Độ dài của vectơ AB→ là:",
        options: {
          A: "6 cm",
          B: "3 cm",
          C: "12 cm",
          D: "36 cm"
        },
        correctAnswer: "A",
        cognitiveLevel: "know",
        explanation: "Độ dài của vectơ AB→ bằng khoảng cách giữa điểm đầu và điểm cuối, tức là độ dài đoạn thẳng AB = 6 cm.",
        point: 0.25
      },
      {
        id: "p1-q2",
        number: 2,
        question: "Vectơ có điểm đầu và điểm cuối trùng nhau được gọi là:",
        options: {
          A: "Vectơ đơn vị",
          B: "Vectơ-không",
          C: "Vectơ cùng hướng",
          D: "Vectơ đối"
        },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Theo định nghĩa SGK, vectơ có điểm đầu trùng điểm cuối kí hiệu là 0→, gọi là vectơ-không.",
        point: 0.25
      },
      {
        id: "p1-q3",
        number: 3,
        question: "Khẳng định nào sau đây là ĐÚNG về hai vectơ bằng nhau?",
        options: {
          A: "Hai vectơ có cùng phương và cùng độ dài.",
          B: "Hai vectơ có cùng hướng và cùng độ dài.",
          C: "Hai vectơ có cùng điểm đầu và cùng điểm cuối.",
          D: "Hai vectơ có cùng phương nhưng khác hướng."
        },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Hai vectơ a→ và b→ được gọi là bằng nhau nếu chúng có cùng hướng và cùng độ dài.",
        point: 0.25
      },
      {
        id: "p1-q4",
        number: 4,
        question: "Với ba điểm bất kì M, N, P, hệ thức nào sau đây luôn ĐÚNG theo quy tắc ba điểm?",
        options: {
          A: "MN→ + NP→ = MP→",
          B: "MN→ + PM→ = NP→",
          C: "NP→ + MN→ = MP→",
          D: "MP→ + PN→ = NM→"
        },
        correctAnswer: "A",
        cognitiveLevel: "know",
        explanation: "Quy tắc 3 điểm phép cộng: Điểm cuối của vectơ thứ nhất trùng với điểm đầu của vectơ thứ hai: MN→ + NP→ = MP→.",
        point: 0.25
      },
      {
        id: "p1-q5",
        number: 5,
        question: "Cho hình bình hành ABCD. Khẳng định nào sau đây là ĐÚNG?",
        options: {
          A: "AB→ = CD→",
          B: "AB→ = DC→",
          C: "AD→ = CB→",
          D: "AC→ = BD→"
        },
        correctAnswer: "B",
        cognitiveLevel: "know",
        explanation: "Trong hình bình hành ABCD, hai đoạn thẳng AB và DC song song và bằng nhau, đồng thời hướng từ A đến B trùng hướng từ D đến C nên AB→ = DC→.",
        point: 0.25
      },
      {
        id: "p1-q6",
        number: 6,
        question: "Cho tam giác ABC. Gọi M là trung điểm của cạnh BC. Vectơ nào sau đây bằng vectơ-không?",
        options: {
          A: "MB→ + MC→",
          B: "MB→ - MC→",
          C: "AM→ + MB→",
          D: "AB→ + AC→"
        },
        correctAnswer: "A",
        cognitiveLevel: "know",
        explanation: "Vì M là trung điểm của BC nên MB→ và MC→ là hai vectơ đối nhau, do đó MB→ + MC→ = 0→.",
        point: 0.25
      },
      {
        id: "p1-q7",
        number: 7,
        question: "Cho hình vuông ABCD cạnh a. Độ dài của vectơ AB→ + AD→ bằng:",
        options: {
          A: "a",
          B: "2a",
          C: "a√2",
          D: "a√3"
        },
        correctAnswer: "C",
        cognitiveLevel: "understand",
        explanation: "Theo quy tắc hình bình hành, AB→ + AD→ = AC→. Đường chéo hình vuông cạnh a có độ dài AC = a√2.",
        point: 0.25
      },
      {
        id: "p1-q8",
        number: 8,
        question: "Cho tam giác đều ABC cạnh 4 cm. Độ dài của vectơ hiệu AB→ - AC→ bằng:",
        options: {
          A: "0 cm",
          B: "4 cm",
          C: "4√3 cm",
          D: "8 cm"
        },
        correctAnswer: "B",
        cognitiveLevel: "understand",
        explanation: "Theo quy tắc trừ: AB→ - AC→ = CB→. Độ dài |CB→| = CB = 4 cm vì tam giác ABC đều.",
        point: 0.25
      },
      {
        id: "p1-q9",
        number: 9,
        question: "Cho ba điểm phân biệt A, B, C. Điều kiện cần và đủ để ba điểm A, B, C thẳng hàng là:",
        options: {
          A: "AB→ = AC→",
          B: "Tồn tại số k ≠ 0 sao cho AB→ = k.AC→",
          C: "|AB→| = |AC→|",
          D: "AB→ + AC→ = BC→"
        },
        correctAnswer: "B",
        cognitiveLevel: "understand",
        explanation: "Ba điểm phân biệt A, B, C thẳng hàng khi và chỉ khi hai vectơ AB→ và AC→ cùng phương, tức là AB→ = k.AC→ với k ≠ 0.",
        point: 0.25
      },
      {
        id: "p1-q10",
        number: 10,
        question: "Cho tam giác ABC có G là trọng tâm. Mệnh đề nào sau đây SAI?",
        options: {
          A: "GA→ + GB→ + GC→ = 0→",
          B: "Với mọi điểm M bất kì, MA→ + MB→ + MC→ = 3MG→",
          C: "AG→ = (2/3)AM→ (với M là trung điểm BC)",
          D: "GA→ + GB→ = GC→"
        },
        correctAnswer: "D",
        cognitiveLevel: "understand",
        explanation: "Vì GA→ + GB→ + GC→ = 0→ nên GA→ + GB→ = -GC→ chứ không phải bằng GC→.",
        point: 0.25
      },
      {
        id: "p1-q11",
        number: 11,
        question: "Hai lực F1→ và F2→ có cùng độ lớn 50 N, cùng tác dụng vào một vật và hợp với nhau góc 60°. Độ lớn của hợp lực F→ = F1→ + F2→ là:",
        options: {
          A: "50 N",
          B: "50√2 N",
          C: "50√3 N",
          D: "100 N"
        },
        correctAnswer: "C",
        cognitiveLevel: "apply",
        explanation: "F = 2 * F1 * cos(60° / 2) = 2 * 50 * cos(30°) = 2 * 50 * (√3 / 2) = 50√3 N.",
        point: 0.25
      },
      {
        id: "p1-q12",
        number: 12,
        question: "Một con thuyền chuyển động thẳng đều qua sông với vận tốc riêng so với dòng nước là 12 km/h. Nước chảy với vận tốc 5 km/h vuông góc với bờ. Vận tốc thực của thuyền so với bờ là:",
        options: {
          A: "17 km/h",
          B: "7 km/h",
          C: "13 km/h",
          D: "15 km/h"
        },
        correctAnswer: "C",
        cognitiveLevel: "apply",
        explanation: "Do hai chuyển động vuông góc nhau: v = √(12² + 5²) = √(144 + 25) = √169 = 13 km/h.",
        point: 0.25
      }
    ],
    // Part II: True/False with 4 commands a-b-c-d (2 questions, 2.0 pts total, 1.0 pt each)
    part2_trueFalse: [
      {
        id: "p2-q1",
        number: 1,
        contextPrompt: "Cho hình chữ nhật ABCD có tâm O, cạnh AB = 4 cm, cạnh BC = 3 cm. Xét tính Đúng / Sai của các mệnh đề sau:",
        statements: [
          {
            subId: "a",
            text: "Độ dài của vectơ AC→ bằng 5 cm.",
            isCorrect: true,
            explanation: "Đúng. AC là đường chéo hình chữ nhật: AC = √(AB² + BC²) = √(4² + 3²) = 5 cm."
          },
          {
            subId: "b",
            text: "Hai vectơ AB→ và CD→ là hai vectơ bằng nhau.",
            isCorrect: false,
            explanation: "Sai. Hai vectơ AB→ và CD→ ngược hướng nhau (AB→ = -CD→), do đó AB→ = DC→ mới đúng."
          },
          {
            subId: "c",
            text: "Vectơ OA→ + OB→ + OC→ + OD→ = 0→.",
            isCorrect: true,
            explanation: "Đúng. Vì O là tâm đối xứng, ta có OA→ + OC→ = 0→ và OB→ + OD→ = 0→, suy ra tổng bằng 0→."
          },
          {
            subId: "d",
            text: "Độ lớn của vectơ tổng AB→ + AD→ bằng 7 cm.",
            isCorrect: false,
            explanation: "Sai. Theo quy tắc hình bình hành AB→ + AD→ = AC→. Do đó độ lớn bằng AC = 5 cm, không phải 7 cm."
          }
        ],
        cognitiveLevel: "understand",
        point: 1.0
      },
      {
        id: "p2-q2",
        number: 2,
        contextPrompt: "Cho tam giác ABC có trọng tâm G. Gọi M, N, P lần lượt là trung điểm của các cạnh BC, CA, AB. Xét tính Đúng / Sai của các khẳng định sau:",
        statements: [
          {
            subId: "a",
            text: "Vectơ AM→ + BN→ + CP→ = 0→.",
            isCorrect: true,
            explanation: "Đúng. AM→ = 1/2(AB→ + AC→), BN→ = 1/2(BA→ + BC→), CP→ = 1/2(CA→ + CB→). Cộng vế theo vế triệt tiêu về 0→."
          },
          {
            subId: "b",
            text: "Với điểm O bất kì trong mặt phẳng, ta luôn có OA→ + OB→ + OC→ = 3OG→.",
            isCorrect: true,
            explanation: "Đúng. Đây là tính chất trọng tâm cơ bản: OA→ + OB→ + OC→ = 3OG→."
          },
          {
            subId: "c",
            text: "Hai vectơ GA→ và GM→ là hai vectơ cùng hướng.",
            isCorrect: false,
            explanation: "Sai. GA→ và GM→ nằm trên cùng đường thẳng nối A và M nhưng ngược chiều nhau (GA→ = -2GM→)."
          },
          {
            subId: "d",
            text: "Nếu |AB→ + AC→| = |AB→ - AC→| thì tam giác ABC là tam giác cân tại A.",
            isCorrect: false,
            explanation: "Sai. |AB→ + AC→| = |AB→ - AC→| tương đương 2AM = BC, điều này chứng minh tam giác ABC vuông tại A chứ không phải tam giác cân."
          }
        ],
        cognitiveLevel: "apply",
        point: 1.0
      }
    ],
    // Part III: Short Answer (4 questions, 2.0 pts total, 0.5 pt each)
    part3_shortAns: [
      {
        id: "p3-q1",
        number: 1,
        question: "Cho hình vuông ABCD có cạnh bằng 5√2 cm. Tính độ dài của vectơ tổng AB→ + BC→ + CD→. (Đáp án viết dưới dạng số nguyên tính theo đơn vị cm).",
        correctAnswer: "7 (hoặc 7.07 / chính xác 5√2 ≈ 7)",
        cognitiveLevel: "know",
        explanation: "Ta có: AB→ + BC→ + CD→ = AC→ + CD→ = AD→. Độ dài |AD→| = AD = 5√2 ≈ 7.07 cm.",
        point: 0.5
      },
      {
        id: "p3-q2",
        number: 2,
        question: "Cho tam giác đều ABC cạnh 6 cm. Tính độ dài của vectơ tổng AB→ + AC→. (Đáp án làm tròn đến một chữ số thập phân, đơn vị cm).",
        correctAnswer: "10.4",
        cognitiveLevel: "understand",
        explanation: "Gọi M là trung điểm BC thì AB→ + AC→ = 2AM→. Đường cao tam giác đều cạnh 6 là AM = 6 * √3 / 2 = 3√3 ≈ 5.196 cm. Do đó 2AM = 6√3 ≈ 10.392 ≈ 10.4 cm.",
        point: 0.5
      },
      {
        id: "p3-q3",
        number: 3,
        question: "Cho ba lực F1, F2, F3 cùng tác dụng vào một chất điểm cân bằng. Biết F1 = 30 N, F2 = 40 N và góc giữa F1 và F2 bằng 90°. Hỏi độ lớn của lực F3 bằng bao nhiêu Newton?",
        correctAnswer: "50",
        cognitiveLevel: "understand",
        explanation: "Chất điểm cân bằng khi F1→ + F2→ + F3→ = 0→ => F3→ = -(F1→ + F2→). Do F1 vuông góc F2 nên F3 = √(30² + 40²) = 50 N.",
        point: 0.5
      },
      {
        id: "p3-q4",
        number: 4,
        question: "Trên mặt phẳng toạ độ Oxy, cho vectơ u→ = (m - 2; 4) và v→ = (3; 6). Tìm giá trị của tham số m để hai vectơ u→ và v→ cùng phương.",
        correctAnswer: "4",
        cognitiveLevel: "apply",
        explanation: "Hai vectơ cùng phương khi tỉ số toạ độ bằng nhau: (m - 2) / 3 = 4 / 6 => m - 2 = 2 => m = 4.",
        point: 0.5
      }
    ],
    // Part IV: Essay (2 questions, 3.0 pts total, 1.5 pt each)
    part4_essay: [
      {
        id: "p4-q1",
        number: 1,
        question: "Cho hình bình hành ABCD. Gọi M là trung điểm của cạnh AB và N là điểm trên cạnh CD sao cho CN = 2ND. \na) Hãy phân tích vectơ MN→ theo hai vectơ AB→ và AD→. (1.0 điểm)\nb) Gọi G là trọng tâm của tam giác BCD. Chứng minh ba điểm A, G, C thẳng hàng hoặc tìm toạ độ điểm G theo hệ vectơ cơ sở. (0.5 điểm)",
        cognitiveLevel: "apply",
        maxScore: 1.5,
        sampleAnswer: "a) Ta có MN→ = MA→ + AD→ + DN→. Vì M là trung điểm AB nên MA→ = -1/2 AB→. Vì CN = 2ND nên DN = 1/3 DC = 1/3 AB, do đó DN→ = 1/3 AB→. Vậy MN→ = -1/2 AB→ + AD→ + 1/3 AB→ = -1/6 AB→ + AD→.\nb) Trọng tâm G của tam giác BCD thỏa mãn: GB→ + GC→ + GD→ = 0→. Với gốc A: AB→ + AC→ + AD→ = 3AG→ => AG→ = 1/3(AB→ + AC→ + AD→). Vì ABCD là hình bình hành nên AB→ + AD→ = AC→ => AG→ = 1/3(AC→ + AC→) = 2/3 AC→. Hệ thức AG→ = 2/3 AC→ chứng tỏ ba điểm A, G, C thẳng hàng.",
        rubrics: [
          { criterion: "Xác định đúng mối quan hệ MA→ = -1/2 AB→ và DN→ = 1/3 AB→", maxScore: 0.5 },
          { criterion: "Biến đổi và rút gọn chính xác MN→ = -1/6 AB→ + AD→", maxScore: 0.5 },
          { criterion: "Vận dụng tính chất trọng tâm và hình bình hành chỉ ra AG→ = 2/3 AC→ và kết luận thẳng hàng", maxScore: 0.5 }
        ]
      },
      {
        id: "p4-q2",
        number: 2,
        question: "Một chiếc đèn chùm trang trí có khối lượng m = 15 kg được treo vào trần nhà bằng hai sợi dây cáp nhẹ không dãn OA và OB cùng hợp với trần nhà một góc 45°. Lấy gia tốc trọng trường g = 9.8 m/s².\na) Vẽ sơ đồ phân tích các lực tác dụng lên điểm nút treo O và thiết lập phương trình cân bằng lực dạng vectơ. (0.75 điểm)\nb) Tính độ lớn lực căng T1 và T2 của mỗi sợi dây cáp. (0.75 điểm)",
        cognitiveLevel: "apply",
        maxScore: 1.5,
        sampleAnswer: "a) Trọng lực tác dụng lên đèn chùm: P = m * g = 15 * 9.8 = 147 N. Điểm O chịu tác dụng của 3 lực: Lực căng T1→ theo hướng OA, lực căng T2→ theo hướng OB và trọng lực P→ hướng thẳng đứng xuống dưới. Điều kiện cân bằng: T1→ + T2→ + P→ = 0→ <=> T1→ + T2→ = -P→.\nb) Do tính chất đối xứng, góc giữa hai sợi dây với phương thẳng đứng đều là 90° - 45° = 45°. Do đó độ lớn hai lực căng bằng nhau: T1 = T2 = T. Chiếu lên phương thẳng đứng: T1 * cos(45°) + T2 * cos(45°) = P <=> 2 * T * (√2 / 2) = 147 <=> T * √2 = 147 => T = 147 / √2 ≈ 103.94 N.",
        rubrics: [
          { criterion: "Tính đúng trọng lực P = 147 N, vẽ đúng sơ đồ lực và viết được phương trình vectơ T1→ + T2→ + P→ = 0→", maxScore: 0.75 },
          { criterion: "Lập luận tính đối xứng T1 = T2, chiếu lên trục thẳng đứng và tính đúng T ≈ 103.94 N", maxScore: 0.75 }
        ]
      }
    ]
  }
};
