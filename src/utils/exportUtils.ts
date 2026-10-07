/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Export Utilities: Word (.doc/.docx compatible), PowerPoint, Single-File HTML, JSON State
 */

import { LessonPlan5512, Exam7991, SlideItem, ProjectState, TeacherProfile } from '../types/eduharness';

/**
 * Trigger file download in browser
 */
export function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export Lesson Plan (KHBD 5512) to Word format
 */
export function exportKhbdToWord(khbd: LessonPlan5512, profile?: TeacherProfile) {
  const schoolName = profile?.school || khbd.schoolName;
  const department = profile?.department || khbd.department;
  const teacherName = profile?.name || khbd.teacherName;
  const academicYear = profile?.academicYear || khbd.academicYear;
  const subject = profile?.subject || khbd.subject;

  const content = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>${khbd.lessonTitle}</title>
    <style>
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 13pt;
        line-height: 1.35;
        color: #000;
        margin: 2cm 2cm 2cm 2.5cm;
      }
      h1, h2, h3, h4 {
        font-family: 'Times New Roman', Times, serif;
        margin: 6pt 0;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 8pt 0;
      }
      th, td {
        border: 1px solid #333;
        padding: 5pt 7pt;
        vertical-align: top;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
        text-align: center;
      }
      .text-center { text-align: center; }
      .text-bold { font-weight: bold; }
      .text-italic { font-style: italic; }
      .header-table { border: none; margin-bottom: 12pt; }
      .header-table td { border: none; padding: 2pt; }
      .activity-box {
        border: 1px solid #666;
        padding: 8pt;
        margin: 8pt 0;
        background-color: #fafafa;
      }
    </style>
  </head>
  <body>
    <div class="text-center" style="margin-top: 10pt; margin-bottom: 16pt;">
      <h2 style="margin: 0; text-transform: uppercase;">KẾ HOẠCH BÀI DẠY</h2>
      <div class="text-italic">(Theo Công văn số 5512/BGDĐT-GDTrH ngày 18/12/2020 của Bộ GDĐT)</div>
      <h3 style="margin-top: 8pt; text-transform: uppercase; color: #1e3a8a;">${khbd.lessonTitle}</h3>
      <div style="margin-top: 4pt;">Môn học: <b>${subject}</b> - Lớp: <b>${khbd.grade}</b> (${khbd.durationPeriods} tiết)</div>
      <div>Giáo viên thực hiện: <b>${teacherName}</b> - Năm học: <b>${academicYear}</b></div>
    </div>


    <h4>I. MỤC TIÊU BÀI HỌC</h4>
    <p><b>1. Về kiến thức:</b></p>
    <ul>
      ${khbd.objectives.knowledge.map(k => `<li>${k}</li>`).join('')}
    </ul>

    <p><b>2. Về năng lực:</b></p>
    <p class="text-italic">- Năng lực chung:</p>
    <ul>
      ${khbd.objectives.competencies.general.map(g => `<li>${g}</li>`).join('')}
    </ul>
    <p class="text-italic">- Năng lực đặc thù môn học:</p>
    <ul>
      ${khbd.objectives.competencies.subject.map(s => `<li>${s}</li>`).join('')}
    </ul>
    ${(khbd.objectives.competencies.nlsAi && khbd.objectives.competencies.nlsAi.length > 0) ? `
      <p class="text-italic">- Lồng ghép Năng lực số (NLS) và Trí tuệ nhân tạo (AI) (Biên bản thống nhất PPCT môn Âm nhạc 2026-2027):</p>
      <ul>
        ${khbd.objectives.competencies.nlsAi.map(n => `<li>${n}</li>`).join('')}
      </ul>
    ` : (khbd.nlsAiObjective ? `
      <p class="text-italic">- Lồng ghép Năng lực số (NLS) và Trí tuệ nhân tạo (AI) (Biên bản thống nhất PPCT môn Âm nhạc 2026-2027):</p>
      <ul>
        <li>${khbd.nlsAiObjective}</li>
      </ul>
    ` : '')}

    <p><b>3. Về phẩm chất:</b></p>
    <ul>
      ${khbd.objectives.qualities.map(q => `<li>${q}</li>`).join('')}
    </ul>

    ${(khbd.objectives.qpanIntegration && khbd.objectives.qpanIntegration.length > 0) ? `
      <p><b>4. Tích hợp Giáo dục Quốc phòng và An ninh (ANQP) (Phụ lục hướng dẫn địa chỉ lồng ghép GDQP&AN 2026-2027):</b></p>
      <ul>
        ${khbd.objectives.qpanIntegration.map(q => `<li>${q}</li>`).join('')}
      </ul>
    ` : (khbd.qpanObjective ? `
      <p><b>4. Tích hợp Giáo dục Quốc phòng và An ninh (ANQP) (Phụ lục hướng dẫn địa chỉ lồng ghép GDQP&AN 2026-2027):</b></p>
      <ul>
        <li>${khbd.qpanObjective} <i>(${khbd.qpanTopicTitle || ''})</i></li>
      </ul>
    ` : '')}

    <h4>II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h4>
    <p><b>1. Đối với giáo viên:</b> ${khbd.equipment.teacher.join('; ')}</p>
    <p><b>2. Đối với học sinh:</b> ${khbd.equipment.students.join('; ')}</p>
    <p><b>3. Học liệu hình ảnh trực quan & âm thanh sư phạm (SGK Kết nối tri thức với cuộc sống):</b></p>
    <ul>
      <li><b>Bản nhạc bài hát chính thức:</b> ${khbd.visualAids?.songSheet?.title || `Bản nhạc: ${khbd.lessonTitle}`} (${khbd.visualAids?.songSheet?.meter || 'Nhịp 2/4 vừa phải'})</li>
      <li><b>Bài tập đọc nhạc (Solfège):</b> ${khbd.visualAids?.sightReadingSheet?.title || 'Bản phổ Bài tập đọc nhạc số 1'} (${khbd.visualAids?.sightReadingSheet?.tonality || 'Đô - Rê - Mi - Son - La'})</li>
      <li><b>Chân dung Nhạc sĩ & Danh nhân:</b> ${khbd.visualAids?.composerPortrait?.title || 'Chân dung Nhạc sĩ Văn Cao, Trịnh Công Sơn, Mozart, Beethoven'}</li>
      <li><b>Nhạc cụ học đường & Dân tộc:</b> ${khbd.visualAids?.instrumentGuide?.title || 'Đàn tranh, Sáo trúc, Đàn bầu, Melodica, Recorder & Thanh phách'}</li>
    </ul>

    <h4>III. TIẾN TRÌNH DẠY HỌC (CHUẨN 4 HOẠT ĐỘNG CÔNG VĂN 5512)</h4>
    ${khbd.activities.map(act => {
      const hasNlsStep = act.nlsAiNote || (khbd.nlsAiProcessStep && khbd.nlsAiProcessStep.activityCode === act.code);
      const nlsText = act.nlsAiNote || (khbd.nlsAiProcessStep ? `${khbd.nlsAiProcessStep.stepName} — GV: ${khbd.nlsAiProcessStep.teacherAction} / HS: ${khbd.nlsAiProcessStep.studentAction}` : '');
      const hasQpan = act.qpanNote || (act.code === 'HD4' && khbd.qpanProcessVandun);
      const qpanText = act.qpanNote || (khbd.qpanProcessVandun ? `${khbd.qpanTopicTitle ? `${khbd.qpanTopicTitle}: ` : ''}${khbd.qpanProcessVandun}` : '');

      return `
      <div style="margin-top: 12pt;">
        <h4 style="color: #0b3a75; margin-bottom: 4pt;">${act.title} (Thời lượng: ~${act.timeMinutes} phút)</h4>
        <p><b>a) Mục tiêu:</b> ${act.objective}</p>
        <p><b>b) Nội dung:</b> ${act.content}</p>
        <p><b>c) Sản phẩm:</b> ${act.product}</p>
        ${act.media ? `<p style="color: #1e3a8a; background-color: #f1f5f9; padding: 4pt 6pt; border-left: 3pt solid #3b82f6;"><b>Học liệu trực quan:</b> ${act.media.title} <i>(${act.media.caption || ''})</i></p>` : ''}
        ${hasNlsStep ? `<p style="color: #0369a1; background-color: #f0f9ff; padding: 4pt 6pt; border-left: 3pt solid #0284c7;"><b>★ Lồng ghép NLS - AI (Theo hướng dẫn):</b> ${nlsText}</p>` : ''}
        ${hasQpan ? `<p style="color: #b45309; background-color: #fffbeb; padding: 4pt 6pt; border-left: 3pt solid #f59e0b;"><b>★ Tích hợp GDQP&AN (Phụ lục hướng dẫn):</b> ${qpanText}</p>` : ''}
        <p><b>d) Tổ chức thực hiện:</b></p>
        <table>
          <thead>
            <tr>
              <th width="28%">Các bước tổ chức</th>
              <th width="36%">Hoạt động của Giáo viên</th>
              <th width="36%">Hoạt động của Học sinh</th>
            </tr>
          </thead>
          <tbody>
            ${act.steps.map(step => `
              <tr>
                <td><b>${step.stepName}</b></td>
                <td>${step.teacherAction}</td>
                <td>${step.studentAction}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      `;
    }).join('')}

    <div style="margin-top: 24pt;">
      <table class="header-table" width="100%">
        <tr>
          <td width="50%" class="text-center">
            <b>DUYỆT CỦA TỔ CHUYÊN MÔN</b><br><br><br><br>
            ..................................................
          </td>
          <td width="50%" class="text-center">
            <i>Ngày ..... tháng ..... năm 20...</i><br>
            <b>GIÁO VIÊN SOẠN BÀI</b><br><br><br><br>
            <b>${khbd.teacherName}</b>
          </td>
        </tr>
      </table>
    </div>
  </body>
  </html>
  `;
  downloadBlob(content, `KHBD_5512_${khbd.subject}_${khbd.grade}.doc`, 'application/msword;charset=utf-8');
}

/**
 * Export 7991 Exam (Matrix, Specs, Exam Paper, Key) to Word format
 */
export function exportExamToWord(exam: Exam7991, khbd: LessonPlan5512, profile?: TeacherProfile) {
  const schoolName = profile?.school || khbd.schoolName;
  const department = profile?.department || khbd.department;
  const teacherName = profile?.name || khbd.teacherName;
  const academicYear = profile?.academicYear || khbd.academicYear;
  const subject = profile?.subject || exam.subject;
  const showTeacher = profile?.showTeacherOnExam !== false;

  const content = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>${exam.title}</title>
    <style>
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt;
        line-height: 1.3;
        color: #000;
        margin: 1.5cm 1.5cm 1.5cm 2cm;
      }
      h1, h2, h3, h4 {
        font-family: 'Times New Roman', Times, serif;
        margin: 4pt 0;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 6pt 0;
      }
      th, td {
        border: 1px solid #333;
        padding: 4pt 5pt;
        vertical-align: middle;
        font-size: 10.5pt;
      }
      th {
        background-color: #eaeaea;
        font-weight: bold;
        text-align: center;
      }
      .text-center { text-align: center; }
      .text-bold { font-weight: bold; }
      .text-italic { font-style: italic; }
      .header-table { border: none; margin-bottom: 8pt; }
      .header-table td { border: none; padding: 2pt; font-size: 11.5pt; }
      .page-break { page-break-before: always; }
      .badge-part {
        font-weight: bold;
        text-transform: uppercase;
        background-color: #f0f0f0;
        padding: 4pt;
        margin-top: 10pt;
        border-left: 4px solid #000;
      }
    </style>
  </head>
  <body>
    <!-- PHỤ LỤC 1: MA TRẬN ĐỀ THEO CÔNG VĂN 7991 -->
    <table class="header-table" width="100%">
      <tr>
        <td width="40%" class="text-center">
          <b>${schoolName}</b><br>
          <b>${department}</b>
        </td>
        <td width="60%" class="text-center">
          <b>BẢNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ</b><br>
          <i>(Kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ GDĐT)</i><br>
          <b>Môn: ${subject} - ${exam.grade} - Thời gian: ${exam.timeAllowedMinutes} phút</b><br>
          ${showTeacher ? `<i>Giáo viên ra đề: ${teacherName} - Năm học: ${academicYear}</i>` : `<i>Năm học: ${academicYear}</i>`}
        </td>
      </tr>
    </table>


    <table>
      <thead>
        <tr>
          <th rowspan="3">TT</th>
          <th rowspan="3">Chủ đề/Chương</th>
          <th rowspan="3">Nội dung/đơn vị kiến thức</th>
          <th colspan="12">Mức độ đánh giá</th>
          <th rowspan="3">Tổng điểm</th>
          <th rowspan="3">Tỉ lệ %</th>
        </tr>
        <tr>
          <th colspan="3">Nhiều lựa chọn (Phần I)</th>
          <th colspan="3">Đúng - Sai (Phần II)</th>
          <th colspan="3">Trả lời ngắn (Phần III)</th>
          <th colspan="3">Tự luận (Phần IV)</th>
        </tr>
        <tr>
          <th>Biết</th><th>Hiểu</th><th>VD</th>
          <th>Biết</th><th>Hiểu</th><th>VD</th>
          <th>Biết</th><th>Hiểu</th><th>VD</th>
          <th>Biết</th><th>Hiểu</th><th>VD</th>
        </tr>
      </thead>
      <tbody>
        ${exam.matrix.map((row, idx) => `
          <tr>
            <td class="text-center">${idx + 1}</td>
            <td><b>${row.topic}</b></td>
            <td>${row.subTopic}</td>
            <td class="text-center">${row.part1_mcq.know || ''}</td>
            <td class="text-center">${row.part1_mcq.understand || ''}</td>
            <td class="text-center">${row.part1_mcq.apply || ''}</td>
            <td class="text-center">${row.part2_trueFalse.know || ''}</td>
            <td class="text-center">${row.part2_trueFalse.understand || ''}</td>
            <td class="text-center">${row.part2_trueFalse.apply || ''}</td>
            <td class="text-center">${row.part3_shortAns.know || ''}</td>
            <td class="text-center">${row.part3_shortAns.understand || ''}</td>
            <td class="text-center">${row.part3_shortAns.apply || ''}</td>
            <td class="text-center">${row.part4_essay.know || ''}</td>
            <td class="text-center">${row.part4_essay.understand || ''}</td>
            <td class="text-center">${row.part4_essay.apply || ''}</td>
            <td class="text-center"><b>${row.scoreAllocation.toFixed(1)}</b></td>
            <td class="text-center">${Math.round(row.scoreAllocation * 10)}%</td>
          </tr>
        `).join('')}
        <tr style="background-color: #f7f7f7; font-weight: bold;">
          <td colspan="3" class="text-center">TỔNG SỐ ĐIỂM</td>
          <td colspan="3" class="text-center">3.0 điểm</td>
          <td colspan="3" class="text-center">2.0 điểm</td>
          <td colspan="3" class="text-center">2.0 điểm</td>
          <td colspan="3" class="text-center">3.0 điểm</td>
          <td class="text-center">10.0</td>
          <td class="text-center">100%</td>
        </tr>
        <tr style="background-color: #f7f7f7; font-weight: bold;">
          <td colspan="3" class="text-center">TỈ LỆ % THEO MỨC ĐỘ</td>
          <td colspan="4" class="text-center">Nhận biết: 40% (4.0đ)</td>
          <td colspan="4" class="text-center">Thông hiểu: 30% (3.0đ)</td>
          <td colspan="4" class="text-center">Vận dụng: 30% (3.0đ)</td>
          <td colspan="2" class="text-center">Chuẩn CV 7991</td>
        </tr>
      </tbody>
    </table>

    <div class="page-break"></div>

    <!-- ĐỀ THI CHÍNH THỨC 4 PHẦN -->
    <table class="header-table" width="100%">
      <tr>
        <td width="45%" class="text-center">
          <div><b>${schoolName}</b></div>
          <div><b>Mã đề: ${exam.examCode}</b></div>
          ${showTeacher ? `<div style="font-size: 10pt; color: #333;">Giáo viên: <b>${teacherName}</b></div>` : ''}
          <div>-------------------</div>
        </td>
        <td width="55%" class="text-center">
          <div class="text-bold">${exam.title}</div>
          <div>Môn: <b>${subject}</b> - Khối <b>${exam.grade}</b></div>
          <div><i>Thời gian làm bài: ${exam.timeAllowedMinutes} phút (Không kể phát đề)</i></div>
          <div style="font-size: 10pt;">Năm học: ${academicYear}</div>
        </td>
      </tr>
    </table>


    <div style="border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 4pt 0; margin-bottom: 10pt; font-size: 11pt;">
      Họ và tên thí sinh: ............................................................................ Số báo danh: ..................... Lớp: .............
    </div>

    <!-- PHẦN I -->
    <div class="badge-part">PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 điểm)</div>
    <p><i>Thí sinh trả lời từ câu 1 đến câu ${exam.part1_mcq.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án. (Mỗi câu trả lời đúng được 0,25 điểm)</i></p>
    
    ${exam.part1_mcq.map(q => `
      <div style="margin-bottom: 8pt;">
        <p><b>Câu ${q.number}.</b> ${q.question}</p>
        <table style="border: none; margin: 2pt 0;">
          <tr>
            <td style="border: none; width: 25%;"><b>A.</b> ${q.options.A}</td>
            <td style="border: none; width: 25%;"><b>B.</b> ${q.options.B}</td>
            <td style="border: none; width: 25%;"><b>C.</b> ${q.options.C}</td>
            <td style="border: none; width: 25%;"><b>D.</b> ${q.options.D}</td>
          </tr>
        </table>
      </div>
    `).join('')}

    <!-- PHẦN II -->
    <div class="badge-part">PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI (2,0 điểm)</div>
    <p><i>Thí sinh trả lời từ câu 1 đến câu ${exam.part2_trueFalse.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.</i></p>
    <p class="text-italic" style="font-size: 10.5pt; color: #333;">- Thí sinh chỉ lựa chọn chính xác 01 ý trong 01 câu được 0,1 điểm; lựa chọn chính xác 02 ý được 0,25 điểm; lựa chọn chính xác 03 ý được 0,5 điểm; lựa chọn chính xác cả 04 ý được 1,0 điểm.</p>

    ${exam.part2_trueFalse.map(q => `
      <div style="margin-bottom: 10pt;">
        <p><b>Câu ${q.number}.</b> ${q.contextPrompt}</p>
        ${q.statements.map(s => `
          <div style="margin-left: 15pt; margin-bottom: 3pt;">
            <b>${s.subId})</b> ${s.text}
          </div>
        `).join('')}
      </div>
    `).join('')}

    <!-- PHẦN III -->
    <div class="badge-part">PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 điểm)</div>
    <p><i>Thí sinh trả lời từ câu 1 đến câu ${exam.part3_shortAns.length}. Thí sinh viết đáp án số hoặc từ ngắn gọn vào phiếu làm bài. (Mỗi câu trả lời đúng được 0,5 điểm)</i></p>

    ${exam.part3_shortAns.map(q => `
      <div style="margin-bottom: 8pt;">
        <p><b>Câu ${q.number}.</b> ${q.question}</p>
      </div>
    `).join('')}

    <!-- PHẦN IV -->
    <div class="badge-part">PHẦN IV. CÂU HỎI TỰ LUẬN (3,0 điểm)</div>
    <p><i>Thí sinh trình bày chi tiết lời giải vào giấy làm bài thi.</i></p>

    ${exam.part4_essay.map(q => `
      <div style="margin-bottom: 10pt;">
        <p><b>Câu ${q.number} (${q.maxScore.toFixed(1)} điểm).</b> ${q.question.replace(/\n/g, '<br>')}</p>
      </div>
    `).join('')}

    <div class="text-center" style="margin-top: 14pt;"><b>----------------- HẾT -----------------</b></div>

    <div class="page-break"></div>

    <!-- HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN -->
    <h3 class="text-center">HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM CHI TIẾT (CHUẨN 10,0 ĐIỂM)</h3>
    <h4 style="margin-top: 8pt;">1. ĐÁP ÁN PHẦN I (Mỗi câu 0,25 điểm - Tổng 3,0 điểm)</h4>
    <table>
      <thead>
        <tr>
          ${exam.part1_mcq.map(q => `<th>Câu ${q.number}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${exam.part1_mcq.map(q => `<td class="text-center"><b>${q.correctAnswer}</b></td>`).join('')}
        </tr>
      </tbody>
    </table>

    <h4 style="margin-top: 10pt;">2. ĐÁP ÁN PHẦN II (Tổng 2,0 điểm - Barem chuẩn CV 7991)</h4>
    <table>
      <thead>
        <tr>
          <th>Câu</th>
          <th>Lệnh a</th>
          <th>Lệnh b</th>
          <th>Lệnh c</th>
          <th>Lệnh d</th>
          <th>Hướng dẫn thang điểm</th>
        </tr>
      </thead>
      <tbody>
        ${exam.part2_trueFalse.map(q => `
          <tr>
            <td class="text-center"><b>Câu ${q.number}</b></td>
            <td class="text-center"><b>${q.statements[0]?.isCorrect ? 'ĐÚNG' : 'SAI'}</b></td>
            <td class="text-center"><b>${q.statements[1]?.isCorrect ? 'ĐÚNG' : 'SAI'}</b></td>
            <td class="text-center"><b>${q.statements[2]?.isCorrect ? 'ĐÚNG' : 'SAI'}</b></td>
            <td class="text-center"><b>${q.statements[3]?.isCorrect ? 'ĐÚNG' : 'SAI'}</b></td>
            <td>Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ<br>Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h4 style="margin-top: 10pt;">3. ĐÁP ÁN PHẦN III (Mỗi câu 0,5 điểm - Tổng 2,0 điểm)</h4>
    <table>
      <thead>
        <tr>
          <th>Câu</th>
          <th>Đáp án</th>
          <th>Hướng dẫn chi tiết</th>
        </tr>
      </thead>
      <tbody>
        ${exam.part3_shortAns.map(q => `
          <tr>
            <td class="text-center"><b>Câu ${q.number}</b></td>
            <td class="text-center"><b>${q.correctAnswer}</b></td>
            <td>${q.explanation}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h4 style="margin-top: 10pt;">4. ĐÁP ÁN VÀ BAREM PHẦN IV TỰ LUẬN (Tổng 3,0 điểm)</h4>
    ${exam.part4_essay.map(q => `
      <div style="margin-bottom: 8pt; border: 1px solid #ccc; padding: 6pt;">
        <p><b>Câu ${q.number} (${q.maxScore.toFixed(1)} điểm):</b></p>
        <p><i>Hướng dẫn giải tóm tắt:</i> ${q.sampleAnswer.replace(/\n/g, '<br>')}</p>
        <table style="margin-top: 4pt;">
          <thead>
            <tr>
              <th>Tiêu chí chấm điểm chi tiết</th>
              <th width="20%">Điểm tối đa</th>
            </tr>
          </thead>
          <tbody>
            ${q.rubrics.map(r => `
              <tr>
                <td>${r.criterion}</td>
                <td class="text-center"><b>${r.maxScore.toFixed(2)}đ</b></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `).join('')}
  </body>
  </html>
  `;
  downloadBlob(content, `DE_THI_7991_${exam.subject}_${exam.grade}.doc`, 'application/msword;charset=utf-8');
}

/**
 * Generate Standalone Single-File HTML using Alpine.js, Tailwind CDN, Lucide CDN
 * Matches the mandatory instruction:
 * "xuất mã nguồn hoàn chỉnh trong một file đơn nhất (Single-file HTML sử dụng Tailwind CDN, Lucide Icons CDN và Alpine.js)
 * để giáo viên có thể mở trực tiếp bằng trình duyệt mà không cần cài đặt Node.js hay dòng lệnh."
 */
export function generateStandaloneSingleFileHtml(projectState: ProjectState): string {
  const jsonStateStr = JSON.stringify(projectState, null, 2);
  
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduHarness 5512 & 7991 - Bản Độc Lập Chạy Trực Tiếp</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Alpine.js CDN -->
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Be Vietnam Pro', sans-serif; background-color: #F8FAFC; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    @media print {
      .no-print { display: none !important; }
      body { background: white !important; }
    }
  </style>
</head>
<body class="text-slate-900 min-h-screen flex flex-col" x-data='appData()'>

  <!-- Top Bar Contract (1 Row, 3 Zones) -->
  <header class="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between no-print sticky top-0 z-40">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
        DT
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-900" x-text="state.teacherProfile.name"></span>
          <span class="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium" x-text="'Giáo viên ' + state.teacherProfile.subject"></span>
        </div>
        <div class="text-[10px] text-slate-500">
          <span x-text="state.teacherProfile.school"></span> · <span x-text="'Năm học ' + state.teacherProfile.academicYear"></span>
        </div>
      </div>
    </div>

    <nav class="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
      <button @click="activeTab = 'khbd'" :class="activeTab === 'khbd' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'" class="px-3 py-1 text-xs rounded-md transition-colors">
        1. KHBD 5512
      </button>
      <button @click="activeTab = 'slide'" :class="activeTab === 'slide' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'" class="px-3 py-1 text-xs rounded-md transition-colors">
        2. Slide Giảng Dạy
      </button>
      <button @click="activeTab = 'exam'" :class="activeTab === 'exam' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'" class="px-3 py-1 text-xs rounded-md transition-colors">
        3. Đề Thi 4 Phần (7991)
      </button>
      <button @click="activeTab = 'matrix'" :class="activeTab === 'matrix' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'" class="px-3 py-1 text-xs rounded-md transition-colors">
        4. Ma Trận & Đặc Tả
      </button>
      <button @click="activeTab = 'json'" :class="activeTab === 'json' ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'" class="px-3 py-1 text-xs rounded-md transition-colors">
        5. JSON State
      </button>
    </nav>

    <div class="flex items-center gap-2">
      <button onclick="window.print()" class="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors">
        In A4
      </button>
      <button @click="downloadJson()" class="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
        Lưu JSON
      </button>
    </div>
  </header>

  <!-- Split-Pane Workspace -->
  <div class="flex-1 flex overflow-hidden">
    <!-- Left Pane: 380px Width -->
    <aside class="w-[380px] shrink-0 border-r border-slate-200 bg-white p-5 overflow-y-auto no-print space-y-5">
      <div class="p-3 bg-blue-50 border border-blue-100 rounded-xl">
        <div class="text-xs font-bold text-blue-900">Xin chào, Cô Duyên Thanh! 👋</div>
        <div class="text-[11px] text-blue-700 mt-0.5" x-text="'Giáo viên ' + state.teacherProfile.subject + ' – ' + state.teacherProfile.school"></div>
        <div class="text-[10px] text-blue-600/80 font-mono mt-1" x-text="'Năm học: ' + state.teacherProfile.academicYear"></div>
      </div>

      <div>
        <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Hồ sơ giáo viên & bài dạy</h2>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Tên bài dạy</label>
            <input type="text" x-model="state.khbd.lessonTitle" class="w-full text-xs p-2 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Môn học</label>
              <input type="text" x-model="state.teacherProfile.subject" @input="state.khbd.subject = state.teacherProfile.subject; state.exam.subject = state.teacherProfile.subject" class="w-full text-xs p-2 border border-slate-200 rounded-md">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1">Khối lớp</label>
              <input type="text" x-model="state.khbd.grade" class="w-full text-xs p-2 border border-slate-200 rounded-md">
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Giáo viên giảng dạy</label>
            <input type="text" x-model="state.teacherProfile.name" @input="state.khbd.teacherName = state.teacherProfile.name" class="w-full text-xs p-2 border border-slate-200 rounded-md">
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">Tên trường</label>
            <input type="text" x-model="state.teacherProfile.school" @input="state.khbd.schoolName = state.teacherProfile.school" class="w-full text-xs p-2 border border-slate-200 rounded-md">
          </div>
        </div>
      </div>


      <!-- Legal Compliance Badges -->
      <div class="border-t border-slate-100 pt-4">
        <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pháp lý sư phạm</h2>
        <div class="space-y-2 text-xs">
          <div class="p-2.5 bg-blue-50 border border-blue-100 rounded-lg">
            <div class="font-semibold text-blue-900">Công văn 5512/BGDĐT-GDTrH</div>
            <div class="text-blue-700 text-[11px] mt-0.5">Chuẩn 4 hoạt động: Khởi động · Khám phá · Luyện tập · Vận dụng. Đầy đủ 4 bước a-b-c-d.</div>
          </div>
          <div class="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg">
            <div class="font-semibold text-emerald-900 flex items-center justify-between">
              <span>Công văn 7991 (17/12/2024)</span>
              <span class="text-emerald-800 font-mono font-bold">10.0 / 10.0đ</span>
            </div>
            <div class="text-emerald-700 text-[11px] mt-0.5">
              Phần I: 3.0đ · Phần II: 2.0đ · Phần III: 2.0đ · Phần IV: 3.0đ. Tỉ lệ: 40% Biết - 30% Hiểu - 30% Vận dụng.
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Switcher -->
      <div class="border-t border-slate-100 pt-4">
        <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Chuyển nhanh phân hệ</h2>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <button @click="activeTab = 'khbd'" class="p-2 text-left border rounded-md hover:bg-slate-50">1. Giáo án 5512</button>
          <button @click="activeTab = 'slide'" class="p-2 text-left border rounded-md hover:bg-slate-50">2. Slide trình chiếu</button>
          <button @click="activeTab = 'exam'" class="p-2 text-left border rounded-md hover:bg-slate-50">3. Đề thi 7991</button>
          <button @click="activeTab = 'matrix'" class="p-2 text-left border rounded-md hover:bg-slate-50">4. Ma trận & Đặc tả</button>
        </div>
      </div>
    </aside>

    <!-- Right Pane: Flexible Workspace -->
    <main class="flex-1 min-w-0 p-8 overflow-y-auto bg-slate-50">
      
      <!-- TAB 1: KHBD 5512 (INLINE EDITABLE & QUICK CONVERT) -->
      <div x-show="activeTab === 'khbd'" class="max-w-4xl mx-auto space-y-5">
        
        <!-- Top Toolbar -->
        <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm no-print">
          <div>
            <h2 class="text-sm font-bold text-slate-900">Phân hệ KHBD (Công văn 5512/BGDĐT-GDTrH)</h2>
            <p class="text-xs text-slate-500">Chỉnh sửa trực tiếp (Inline Editable) bảng tiến trình 4 hoạt động</p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="convertKhbdToSlides()" class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
              <span>⚡ Chuyển Đổi Nhanh KHBD Thành Slide</span>
            </button>
            <button onclick="window.print()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg">
              In A4
            </button>
          </div>
        </div>

        <div class="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-slate-300">
          <div class="text-center pb-6 border-b border-slate-200">
            <div class="text-xs uppercase font-semibold text-slate-500" x-text="state.khbd.schoolName"></div>
            <input type="text" x-model="state.khbd.lessonTitle" class="text-xl font-bold text-slate-900 mt-2 uppercase text-center w-full border-b border-dashed border-slate-300 focus:outline-hidden py-1">
            <div class="text-xs text-slate-600 mt-2 font-medium">
              Môn: <span x-text="state.khbd.subject"></span> · Lớp: <span x-text="state.khbd.grade"></span> · Thời lượng: <span x-text="state.khbd.durationPeriods"></span> tiết
            </div>
            <div class="text-xs text-slate-500 mt-1">
              Giáo viên: <b x-text="state.teacherProfile.name"></b> — Năm học: <span x-text="state.teacherProfile.academicYear"></span>
            </div>
          </div>

          <!-- Bảng tiến trình 4 hoạt động chuẩn 5512 (Inline Editable) -->
          <div class="mt-6 space-y-6">
            <template x-for="(act, idx) in state.khbd.activities" :key="act.id">
              <div class="p-5 border border-slate-200 rounded-xl bg-slate-50/60 shadow-2xs">
                <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center" x-text="idx + 1"></span>
                    <input type="text" x-model="act.title" class="font-bold text-sm text-blue-950 bg-white border border-slate-200 rounded px-2 py-0.5 w-80">
                  </div>
                  <span class="text-xs text-slate-500 font-mono" x-text="'~' + act.timeMinutes + ' phút'"></span>
                </div>
                
                <div class="space-y-3 text-xs text-slate-700">
                  <div>
                    <b class="text-slate-900 block mb-1">a) Mục tiêu:</b>
                    <textarea x-model="act.objective" rows="2" class="w-full p-2 border border-slate-300 rounded text-xs bg-white"></textarea>
                  </div>
                  <div>
                    <b class="text-slate-900 block mb-1">b) Nội dung:</b>
                    <textarea x-model="act.content" rows="2" class="w-full p-2 border border-slate-300 rounded text-xs bg-white"></textarea>
                  </div>
                  <div>
                    <b class="text-slate-900 block mb-1">c) Sản phẩm:</b>
                    <textarea x-model="act.product" rows="2" class="w-full p-2 border border-slate-300 rounded text-xs bg-white"></textarea>
                  </div>
                  <div>
                    <b class="text-slate-900 block mb-1">d) Tổ chức thực hiện (Tiến trình 4 bước chuẩn 5512):</b>
                    <div class="overflow-x-auto mt-2">
                      <table class="w-full border-collapse border border-slate-300 text-xs bg-white">
                        <thead>
                          <tr class="bg-slate-100 text-slate-800">
                            <th class="border border-slate-300 p-2 text-left w-1/4">Bước</th>
                            <th class="border border-slate-300 p-2 text-left w-3/8 text-blue-900">Hoạt động Giáo viên</th>
                            <th class="border border-slate-300 p-2 text-left w-3/8 text-emerald-900">Hoạt động Học sinh</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template x-for="step in act.steps" :key="step.stepName">
                            <tr>
                              <td class="border border-slate-300 p-2 font-bold text-blue-900 align-top bg-slate-50/50" x-text="step.stepName"></td>
                              <td class="border border-slate-300 p-2 align-top">
                                <textarea x-model="step.teacherAction" rows="2" class="w-full p-1.5 border border-slate-200 rounded text-xs"></textarea>
                              </td>
                              <td class="border border-slate-300 p-2 align-top">
                                <textarea x-model="step.studentAction" rows="2" class="w-full p-1.5 border border-slate-200 rounded text-xs"></textarea>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="mt-8 pt-4 border-t border-slate-200 text-center">
            <button @click="convertKhbdToSlides()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
              ⚡ Chuyển Đổi Nhanh KHBD Thành Slide (Chế độ 16:9)
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: SLIDE TRÌNH CHIẾU 16:9 VỚI THẺ TRỰC QUAN HÓA KIẾN THỨC -->
      <div x-show="activeTab === 'slide'" class="max-w-5xl mx-auto space-y-4">
        
        <!-- Slide Top Action Bar -->
        <div class="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm no-print">
          <div>
            <h2 class="text-sm font-bold text-slate-900">Phân hệ Slide Trình Chiếu 16:9</h2>
            <p class="text-xs text-slate-500">Đồng bộ từ 4 hoạt động KHBD 5512 · Thẻ trực quan hóa tri thức</p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="convertKhbdToSlides()" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
              <span>⚡ Đồng bộ từ KHBD</span>
            </button>
            <button @click="toggleFullscreen()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1">
              <span>⛶ Toàn màn hình</span>
            </button>
          </div>
        </div>

        <!-- 16:9 Presentation Stage -->
        <div id="presentation-stage" class="aspect-video bg-slate-900 text-white rounded-2xl p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-slate-800">
          <div class="flex justify-between items-center text-xs text-slate-400 font-mono border-b border-white/10 pb-2">
            <span x-text="'SLIDE ' + (currentSlide + 1) + ' / ' + state.slides.length"></span>
            <span x-text="state.khbd.subject + ' ' + state.khbd.grade + ' · ' + state.khbd.schoolName"></span>
          </div>

          <div class="my-auto py-3">
            <span class="text-xs text-blue-400 font-bold uppercase tracking-wider block mb-1" x-text="state.slides[currentSlide].subtitle"></span>
            <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight" x-text="state.slides[currentSlide].title"></h2>
            
            <!-- Thẻ trực quan hóa kiến thức (Knowledge Visualization Cards) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              <template x-for="(bullet, bIdx) in state.slides[currentSlide].bullets" :key="bIdx">
                <div class="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs text-slate-100">
                  <div class="flex items-center justify-between text-[10px] text-blue-400 font-mono font-bold mb-1">
                    <span>MỤC TIÊU CỐT LÕI</span>
                    <span x-text="'#' + (bIdx + 1)"></span>
                  </div>
                  <div class="leading-relaxed" x-text="bullet"></div>
                </div>
              </template>
            </div>

            <div x-show="state.slides[currentSlide].highlightQuote" class="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-xs italic text-amber-300">
              "<span x-text="state.slides[currentSlide].highlightQuote"></span>"
            </div>
          </div>

          <!-- Slide Footer & Controls -->
          <div class="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
            <div class="flex items-center gap-2 font-mono text-amber-300 bg-black/40 px-3 py-1 rounded-md border border-white/10">
              <span>⏱ Đếm ngược: </span>
              <span class="font-bold" x-text="formatTimer(timerSeconds)"></span>
              <button @click="toggleTimer()" class="ml-2 px-1.5 py-0.5 bg-white/20 hover:bg-white/30 rounded text-[10px] text-white" x-text="isTimerRunning ? 'Dừng' : 'Bắt đầu'"></button>
              <button @click="timerSeconds = 180" class="px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[10px] text-white">3p</button>
            </div>

            <div class="flex gap-2">
              <button @click="currentSlide = Math.max(0, currentSlide - 1)" :disabled="currentSlide === 0" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-white font-semibold">◀ Trước</button>
              <button @click="currentSlide = Math.min(state.slides.length - 1, currentSlide + 1)" :disabled="currentSlide === state.slides.length - 1" class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 rounded-lg text-white font-semibold">Tiếp ▶</button>
            </div>
          </div>
        </div>

        <!-- Speaker notes -->
        <div class="p-4 bg-white rounded-xl border border-slate-200 text-xs shadow-2xs">
          <span class="font-bold text-slate-800 block mb-1">Ghi chú sư phạm giáo viên khi đứng lớp (Speaker Notes):</span>
          <p class="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100" x-text="state.slides[currentSlide].teacherNotes || 'Quan sát học sinh, điều phối hoạt động theo đúng thời gian dự kiến.'"></p>
        </div>
      </div>

      <!-- TAB 3: ĐỀ THI 7991 (4 PHẦN ĐỘC LẬP) -->
      <div x-show="activeTab === 'exam'" class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div class="text-center border-b border-slate-200 pb-4 mb-6">
          <h2 class="text-lg font-bold text-slate-900" x-text="state.exam.title"></h2>
          <div class="text-xs text-slate-500 mt-1">Thời gian làm bài: <span x-text="state.exam.timeAllowedMinutes"></span> phút · Barem chuẩn: 10.0 điểm</div>
        </div>

        <!-- PHẦN I: TN NHIỀU LỰA CHỌN -->
        <div class="mb-8">
          <div class="bg-blue-50 border-l-4 border-blue-600 p-2.5 rounded-r-md flex justify-between items-center mb-4">
            <span class="font-bold text-xs text-blue-900 uppercase">Phần I. Câu trắc nghiệm nhiều phương án lựa chọn (3,0 điểm)</span>
            <span class="text-xs text-blue-700 font-mono">12 câu · 0.25đ / câu</span>
          </div>
          <div class="space-y-4">
            <template x-for="q in state.exam.part1_mcq" :key="q.id">
              <div class="text-xs p-3 border border-slate-100 rounded-md hover:border-slate-300">
                <p class="font-medium text-slate-900" x-text="'Câu ' + q.number + '. ' + q.question"></p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-slate-700">
                  <div :class="q.correctAnswer === 'A' ? 'font-bold text-blue-600' : ''" x-text="'A. ' + q.options.A"></div>
                  <div :class="q.correctAnswer === 'B' ? 'font-bold text-blue-600' : ''" x-text="'B. ' + q.options.B"></div>
                  <div :class="q.correctAnswer === 'C' ? 'font-bold text-blue-600' : ''" x-text="'C. ' + q.options.C"></div>
                  <div :class="q.correctAnswer === 'D' ? 'font-bold text-blue-600' : ''" x-text="'D. ' + q.options.D"></div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- PHẦN II: TN ĐÚNG/SAI 4 LỆNH a-b-c-d -->
        <div class="mb-8">
          <div class="bg-emerald-50 border-l-4 border-emerald-600 p-2.5 rounded-r-md flex justify-between items-center mb-4">
            <span class="font-bold text-xs text-emerald-900 uppercase">Phần II. Câu trắc nghiệm Đúng / Sai (2,0 điểm)</span>
            <span class="text-xs text-emerald-700 font-mono">4 lệnh a-b-c-d · 1.0đ / câu</span>
          </div>
          <div class="space-y-6">
            <template x-for="q in state.exam.part2_trueFalse" :key="q.id">
              <div class="p-4 border border-slate-200 rounded-lg text-xs space-y-3">
                <p class="font-semibold text-slate-900" x-text="'Câu ' + q.number + '. ' + q.contextPrompt"></p>
                <div class="space-y-2">
                  <template x-for="s in q.statements" :key="s.subId">
                    <div class="flex items-start justify-between p-2 rounded bg-slate-50 border border-slate-100">
                      <div class="flex-1 pr-4">
                        <span class="font-bold text-slate-800" x-text="s.subId + ') '"></span>
                        <span class="text-slate-700" x-text="s.text"></span>
                        <div class="text-[11px] text-slate-500 italic mt-0.5" x-text="'→ ' + s.explanation"></div>
                      </div>
                      <span :class="s.isCorrect ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-rose-100 text-rose-800 font-bold'" class="px-2 py-0.5 rounded text-[11px]" x-text="s.isCorrect ? 'ĐÚNG' : 'SAI'"></span>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- PHẦN III: TRẢ LỜI NGẮN -->
        <div class="mb-8">
          <div class="bg-amber-50 border-l-4 border-amber-600 p-2.5 rounded-r-md flex justify-between items-center mb-4">
            <span class="font-bold text-xs text-amber-900 uppercase">Phần III. Câu trắc nghiệm trả lời ngắn (2,0 điểm)</span>
            <span class="text-xs text-amber-700 font-mono">4 câu · 0.5đ / câu</span>
          </div>
          <div class="space-y-3">
            <template x-for="q in state.exam.part3_shortAns" :key="q.id">
              <div class="p-3 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
                <div class="flex-1 pr-4">
                  <span class="font-semibold text-slate-900" x-text="'Câu ' + q.number + '. ' + q.question"></span>
                  <div class="text-slate-500 italic text-[11px] mt-1" x-text="'Giải thích: ' + q.explanation"></div>
                </div>
                <div class="text-right">
                  <span class="text-xs text-slate-500 block">Đáp án:</span>
                  <span class="font-bold font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded" x-text="q.correctAnswer"></span>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- PHẦN IV: TỰ LUẬN -->
        <div>
          <div class="bg-purple-50 border-l-4 border-purple-600 p-2.5 rounded-r-md flex justify-between items-center mb-4">
            <span class="font-bold text-xs text-purple-900 uppercase">Phần IV. Câu hỏi tự luận (3,0 điểm)</span>
            <span class="text-xs text-purple-700 font-mono">2 câu · 1.5đ / câu</span>
          </div>
          <div class="space-y-4">
            <template x-for="q in state.exam.part4_essay" :key="q.id">
              <div class="p-4 border border-slate-200 rounded-lg text-xs space-y-2">
                <div class="flex justify-between">
                  <span class="font-bold text-slate-900" x-text="'Câu ' + q.number + ' (' + q.maxScore.toFixed(1) + ' điểm)'"></span>
                </div>
                <p class="text-slate-800 whitespace-pre-line" x-text="q.question"></p>
                <div class="p-2.5 bg-slate-50 border rounded text-slate-600 mt-2">
                  <b class="text-slate-800">Hướng dẫn chấm & Barem:</b>
                  <p class="mt-1" x-text="q.sampleAnswer"></p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- TAB 4: MA TRẬN & ĐẶC TẢ -->
      <div x-show="activeTab === 'matrix'" class="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-xs">
        <h2 class="text-base font-bold text-slate-900 mb-4 text-center">BẢNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ (CÔNG VĂN 7991)</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-slate-300">
            <thead>
              <tr class="bg-slate-100 text-slate-800">
                <th class="border border-slate-300 p-2" rowspan="2">Chủ đề</th>
                <th class="border border-slate-300 p-2" colspan="3">Phần I (Nhiều lựa chọn)</th>
                <th class="border border-slate-300 p-2" colspan="3">Phần II (Đúng - Sai)</th>
                <th class="border border-slate-300 p-2" colspan="3">Phần III (Trả lời ngắn)</th>
                <th class="border border-slate-300 p-2" colspan="3">Phần IV (Tự luận)</th>
                <th class="border border-slate-300 p-2" rowspan="2">Tổng điểm</th>
              </tr>
              <tr class="bg-slate-50 text-[11px]">
                <th>Biết</th><th>Hiểu</th><th>VD</th>
                <th>Biết</th><th>Hiểu</th><th>VD</th>
                <th>Biết</th><th>Hiểu</th><th>VD</th>
                <th>Biết</th><th>Hiểu</th><th>VD</th>
              </tr>
            </thead>
            <tbody>
              <template x-for="row in state.exam.matrix" :key="row.id">
                <tr class="text-center">
                  <td class="border border-slate-300 p-2 text-left font-semibold" x-text="row.topic"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part1_mcq.know || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part1_mcq.understand || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part1_mcq.apply || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part2_trueFalse.know || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part2_trueFalse.understand || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part2_trueFalse.apply || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part3_shortAns.know || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part3_shortAns.understand || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part3_shortAns.apply || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part4_essay.know || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part4_essay.understand || '-'"></td>
                  <td class="border border-slate-300 p-1" x-text="row.part4_essay.apply || '-'"></td>
                  <td class="border border-slate-300 p-1 font-bold text-blue-700" x-text="row.scoreAllocation.toFixed(1) + 'đ'"></td>
                </tr>
              </template>
              <tr class="bg-blue-50 font-bold text-center">
                <td class="border border-slate-300 p-2 text-left">TỔNG ĐIỂM (10.0đ)</td>
                <td colspan="3" class="border border-slate-300 p-1">3.0đ (30%)</td>
                <td colspan="3" class="border border-slate-300 p-1">2.0đ (20%)</td>
                <td colspan="3" class="border border-slate-300 p-1">2.0đ (20%)</td>
                <td colspan="3" class="border border-slate-300 p-1">3.0đ (30%)</td>
                <td class="border border-slate-300 p-1 text-emerald-700">10.0đ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 5: JSON STATE BÀN GIAO -->
      <div x-show="activeTab === 'json'" class="max-w-4xl mx-auto bg-white p-6 rounded-xl border border-slate-200">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-bold text-slate-900">Khối JSON State Bàn Giao Phiên Làm Việc (Harness Engineering)</h2>
          <button @click="copyJson()" class="px-3 py-1.5 bg-slate-900 text-white text-xs rounded hover:bg-slate-800">
            Sao chép JSON
          </button>
        </div>
        <textarea class="w-full h-96 font-mono text-xs p-4 bg-slate-900 text-emerald-400 rounded-lg border border-slate-800" readonly x-text="JSON.stringify(state, null, 2)"></textarea>
      </div>

    </main>
  </div>

  <script>
    function appData() {
      return {
        activeTab: 'khbd',
        currentSlide: 0,
        timerSeconds: 180,
        isTimerRunning: false,
        timerInterval: null,
        state: ${jsonStateStr},
        toggleTimer() {
          if (this.isTimerRunning) {
            clearInterval(this.timerInterval);
            this.isTimerRunning = false;
          } else {
            this.isTimerRunning = true;
            this.timerInterval = setInterval(() => {
              if (this.timerSeconds > 0) {
                this.timerSeconds--;
              } else {
                clearInterval(this.timerInterval);
                this.isTimerRunning = false;
              }
            }, 1000);
          }
        },
        formatTimer(sec) {
          const m = Math.floor(sec / 60);
          const s = sec % 60;
          return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        },
        toggleFullscreen() {
          const el = document.getElementById('presentation-stage');
          if (!el) return;
          if (!document.fullscreenElement) {
            el.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        },
        convertKhbdToSlides() {
          const acts = this.state.khbd.activities || [];
          const act1 = acts[0] || {};
          const act2 = acts[1] || {};
          const act3 = acts[2] || {};
          const act4 = acts[3] || {};

          this.state.slides = [
            {
              id: 's1',
              slideNumber: 1,
              title: this.state.khbd.lessonTitle,
              subtitle: this.state.khbd.subject + ' ' + this.state.khbd.grade + ' · Chuẩn CV 5512',
              bullets: [
                'Mục tiêu kiến thức cốt lõi',
                'Năng lực đặc thù & Năng lực chung',
                'Phẩm chất rèn luyện và chuẩn bị học liệu'
              ],
              highlightQuote: 'Tri thức là hành trang - Tự chủ và sáng tạo là chìa khóa thành công.',
              teacherNotes: 'Ổn định lớp, giới thiệu mục tiêu bài học và tiêu chí đánh giá hoạt động nhóm.',
              estimatedMinutes: 3
            },
            {
              id: 's2',
              slideNumber: 2,
              title: act1.title || 'Hoạt động 1: Khởi động',
              subtitle: 'Khởi động & Tạo tâm thế (~' + (act1.timeMinutes || 5) + ' phút)',
              bullets: [
                'Mục tiêu: ' + (act1.objective || 'Tạo hứng thú học tập'),
                'Nhiệm vụ: ' + (act1.content || 'Tham gia tình huống mở đầu'),
                'Sản phẩm: ' + (act1.product || 'Câu trả lời ban đầu của học sinh')
              ],
              highlightQuote: 'Khởi động hứng khởi - Đặt vấn đề tự nhiên - Khơi gợi tư duy khám phá.',
              teacherNotes: 'Tổ chức trò chơi hoặc câu hỏi gợi mở, quan sát sự hào hứng của học sinh.',
              estimatedMinutes: act1.timeMinutes || 5
            },
            {
              id: 's3',
              slideNumber: 3,
              title: act2.title || 'Hoạt động 2: Hình thành kiến thức mới',
              subtitle: 'Khám phá & Chiếm lĩnh tri thức (~' + (act2.timeMinutes || 20) + ' phút)',
              bullets: [
                'Nội dung: ' + (act2.content || 'Khám phá kiến thức cốt lõi'),
                'Sản phẩm cần đạt: ' + (act2.product || 'Bản ghi kết quả thảo luận nhóm'),
                'Yêu cầu sư phạm: ' + (act2.objective || 'Nắm vững nguyên lý và phương pháp')
              ],
              highlightQuote: 'Học sinh tự học, tự khám phá và kiến tạo tri thức dưới sự định hướng của giáo viên.',
              teacherNotes: 'Phát phiếu học tập, chia nhóm, quan sát và hỗ trợ các nhóm gặp khó khăn.',
              estimatedMinutes: Math.round((act2.timeMinutes || 20) / 2)
            },
            {
              id: 's4',
              slideNumber: 4,
              title: 'Quy Trình 4 Bước Chuẩn Sư Phạm 5512',
              subtitle: 'Tổ chức thực hiện Hoạt động 2',
              bullets: [
                'Bước 1: Chuyển giao nhiệm vụ rõ ràng, cụ thể',
                'Bước 2: Học sinh hợp tác nhóm, chủ động giải quyết vấn đề',
                'Bước 3: Đại diện nhóm báo cáo, lớp phản biện tích cực',
                'Bước 4: Giáo viên nhận xét, chuẩn hóa kiến thức ghi bảng'
              ],
              highlightQuote: 'Đảm bảo sự tương tác hai chiều liên tục giữa giáo viên và học sinh.',
              teacherNotes: 'Chốt kiến thức cốt lõi lên bảng, yêu cầu học sinh ghi vào vở bài học.',
              estimatedMinutes: Math.round((act2.timeMinutes || 20) / 2)
            },
            {
              id: 's5',
              slideNumber: 5,
              title: act3.title || 'Hoạt động 3: Luyện tập & Củng cố',
              subtitle: 'Thực hành & Khắc sâu kiến thức (~' + (act3.timeMinutes || 12) + ' phút)',
              bullets: [
                'Nhiệm vụ: ' + (act3.content || 'Hệ thống bài tập thực hành theo mức độ'),
                'Sản phẩm: ' + (act3.product || 'Lời giải chi tiết hoặc phần trình bày của học sinh'),
                'Yêu cầu đạt được: ' + (act3.objective || 'Rèn luyện kỹ năng giải quyết bài tập')
              ],
              highlightQuote: 'Luyện tập thường xuyên - Khắc sâu phương pháp - Hình thành kỹ năng vững chắc.',
              teacherNotes: 'Cho học sinh làm bài tập cá nhân, gọi đại diện chữa bài và phân tích lỗi sai.',
              estimatedMinutes: act3.timeMinutes || 12
            },
            {
              id: 's6',
              slideNumber: 6,
              title: act4.title || 'Hoạt động 4: Vận dụng thực tiễn',
              subtitle: 'Kết nối đời sống & Hướng dẫn tự học (~' + (act4.timeMinutes || 8) + ' phút)',
              bullets: [
                'Tình huống: ' + (act4.content || 'Nhiệm vụ vận dụng kiến thức vào thực tế đời sống'),
                'Sản phẩm trải nghiệm: ' + (act4.product || 'Báo cáo giải quyết vấn đề thực tế'),
                'Dặn dò: Hoàn thiện sản phẩm học tập và đọc trước bài mới'
              ],
              highlightQuote: 'Mang kiến thức vào cuộc sống - Nuôi dưỡng niềm đam mê học tập suốt đời.',
              teacherNotes: 'Hướng dẫn học sinh tìm tòi mở rộng, chuẩn bị bài cho tiết học tiếp theo.',
              estimatedMinutes: act4.timeMinutes || 8
            }
          ];

          this.currentSlide = 0;
          this.activeTab = 'slide';
          alert('Đã chuyển đổi thành công 4 hoạt động của KHBD thành Slide Deck 16:9!');
        },
        copyJson() {
          navigator.clipboard.writeText(JSON.stringify(this.state, null, 2));
          alert('Đã sao chép toàn bộ khối JSON State vào bộ nhớ tạm!');
        },
        downloadJson() {
          const blob = new Blob([JSON.stringify(this.state, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'eduharness_state_' + this.state.khbd.subject + '.json';
          a.click();
        }
      }
    }
  </script>
</body>
</html>`;
}
