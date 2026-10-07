/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Export Modal: Trung tâm xuất bản tài liệu chuẩn Bộ GDĐT
 */

import React from 'react';
import { ProjectState } from '../types/eduharness';
import { 
  X, 
  FileText, 
  Presentation, 
  GraduationCap, 
  Printer, 
  FileCode, 
  Download, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { 
  exportKhbdToWord, 
  exportExamToWord, 
  generateStandaloneSingleFileHtml, 
  downloadBlob 
} from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ProjectState;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, state }) => {
  if (!isOpen) return null;

  const handleExportStandalone = () => {
    const html = generateStandaloneSingleFileHtml(state);
    downloadBlob(
      html, 
      `EduHarness_${state.khbd.subject}_${state.khbd.grade}_SingleFile.html`, 
      'text/html;charset=utf-8'
    );
  };

  const handleExportSlidesHtml = () => {
    const slideHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Slide Trình Chiếu - ${state.khbd.lessonTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Be Vietnam Pro', sans-serif; }</style>
</head>
<body class="bg-slate-900 text-white min-h-screen p-8">
  <div class="max-w-5xl mx-auto space-y-12">
    <div class="text-center py-6 border-b border-slate-800">
      <h1 class="text-3xl font-bold uppercase">${state.khbd.lessonTitle}</h1>
      <p class="text-blue-400 mt-2">${state.khbd.subject} - ${state.khbd.grade} · ${state.khbd.schoolName}</p>
    </div>
    ${state.slides.map((s, idx) => `
      <div class="aspect-video bg-slate-800 border border-slate-700 rounded-2xl p-10 flex flex-col justify-between shadow-2xl">
        <div class="flex justify-between text-xs text-slate-400 font-mono">
          <span>SLIDE ${idx + 1} / ${state.slides.length}</span>
          <span>~${s.estimatedMinutes} phút</span>
        </div>
        <div>
          <span class="text-xs uppercase text-blue-400 font-semibold tracking-wider">${s.subtitle || ''}</span>
          <h2 class="text-2xl font-bold mt-1 text-white">${s.title}</h2>
          <ul class="mt-6 space-y-3 text-sm text-slate-200">
            ${s.bullets.map(b => `<li class="flex items-start gap-2"><span class="text-blue-400">▸</span> <span>${b}</span></li>`).join('')}
          </ul>
        </div>
        <div class="pt-4 border-t border-slate-700 text-xs italic text-slate-400">
          "${s.highlightQuote || ''}"
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
    downloadBlob(slideHtml, `Slide_${state.khbd.subject}_${state.khbd.grade}.html`, 'text/html;charset=utf-8');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Trung Tâm Xuất Bản Tài Liệu Sư Phạm
              </h3>
              <p className="text-xs text-slate-500">
                Xuất file định dạng chuẩn Bộ GDĐT không cần cài đặt phần mềm phụ trợ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Options Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Export Word KHBD 5512 */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-sm text-slate-900">1. Kế hoạch bài dạy (Word)</h4>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  File Word (.doc/.docx) chuẩn Công văn 5512 với đầy đủ 4 hoạt động, bảng tổ chức 3 cột và chữ ký duyệt tổ chuyên môn.
                </p>
              </div>
              <button
                onClick={() => exportKhbdToWord(state.khbd)}
                className="w-full py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải KHBD 5512 (.doc)</span>
              </button>
            </div>

            {/* 2. Export Word Đề thi 7991 */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-sm text-slate-900">2. Đề kiểm tra & Ma trận (Word)</h4>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Đầy đủ: Ma trận đề (PL1) + Đề thi 4 phần (Đúng/Sai 4 ý) + Đáp án & Barem chuẩn 10.0 điểm theo Công văn 7991.
                </p>
              </div>
              <button
                onClick={() => exportExamToWord(state.exam, state.khbd)}
                className="w-full py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Đề thi 7991 (.doc)</span>
              </button>
            </div>

            {/* 3. Export Standalone Single-File HTML */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50/50 hover:bg-purple-50/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileCode className="w-5 h-5 text-purple-600" />
                  <h4 className="font-bold text-sm text-slate-900">3. Single-File HTML Độc Lập</h4>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Xuất file HTML đơn nhất tích hợp Tailwind CDN & Alpine.js. Giáo viên chỉ cần click đúp mở trên trình duyệt, không cần cài đặt Node.js!
                </p>
              </div>
              <button
                onClick={handleExportStandalone}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tải file HTML độc lập</span>
              </button>
            </div>

            {/* 4. Export Presentation Slides */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Presentation className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-sm text-slate-900">4. Bộ Slide Bài Giảng</h4>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Xuất bản bài giảng dạng HTML Slide Deck 16:9 sắc nét, sẵn sàng trình chiếu trên máy chiếu lớp học hoặc tivi cảm ứng.
                </p>
              </div>
              <button
                onClick={handleExportSlidesHtml}
                className="w-full py-2 px-3 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Slide Deck (.html)</span>
              </button>
            </div>

          </div>

          {/* Quick Print Section */}
          <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs text-slate-700">
            <span className="flex items-center gap-2 font-medium">
              <Printer className="w-4 h-4 text-slate-500" />
              In trực tiếp ra máy in hoặc Lưu dưới dạng PDF chuẩn trang A4:
            </span>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => window.print(), 100);
              }}
              className="px-3 py-1.5 bg-white hover:bg-slate-200 border border-slate-300 font-semibold rounded-lg transition-colors text-slate-800"
            >
              Mở hộp thoại In (Ctrl+P)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
