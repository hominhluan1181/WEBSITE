/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Profile Settings Modal: Quản lý hồ sơ giáo viên & nhà trường
 */

import React, { useState } from 'react';
import { TeacherProfile } from '../types/eduharness';
import { 
  User, 
  School, 
  BookOpen, 
  Calendar, 
  Save, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ToggleLeft, 
  ToggleRight,
  Music
} from 'lucide-react';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TeacherProfile;
  onSaveProfile: (newProfile: TeacherProfile) => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<TeacherProfile>({ ...profile });
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  const handleResetDefault = () => {
    setFormData({
      name: "Nguyễn Thị Duyên Thanh",
      subject: "Âm Nhạc",
      department: "Thể dục - Nghệ thuật",
      school: "Trường THCS Long Hồ",
      academicYear: "2026–2027",
      showTeacherOnExam: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              DT
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Cài Đặt Hồ Sơ Giáo Viên & Nhà Trường
              </h3>
              <p className="text-xs text-slate-500">
                Dữ liệu định danh dùng chung cho toàn bộ KHBD, Slide, Đề kiểm tra và Barem
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Section 1: Thông tin cá nhân */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                Thông Tin Cá Nhân
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Profile cá nhân</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên giáo viên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Thị Duyên Thanh"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Môn giảng dạy <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Ví dụ: Âm Nhạc"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tổ chuyên môn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Ví dụ: Thể dục - Nghệ thuật"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Thông tin nhà trường */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <School className="w-4 h-4 text-emerald-600" />
                Thông Tin Nhà Trường
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Đơn vị công tác</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên trường <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder="Ví dụ: Trường THCS Long Hồ"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Năm học <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  placeholder="Ví dụ: 2026–2027"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Tùy chọn sư phạm */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">
                  Hiển thị tên giáo viên trên Đề kiểm tra
                </span>
                <span className="text-[11px] text-slate-500">
                  Khi bật, tên giáo viên sẽ xuất hiện ở phần đầu trang đề thi và hướng dẫn chấm
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    showTeacherOnExam: !formData.showTeacherOnExam,
                  })
                }
                className="text-blue-600 focus:outline-none"
              >
                {formData.showTeacherOnExam ? (
                  <ToggleRight className="w-7 h-7 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetDefault}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              Khôi phục mặc định (Cô Duyên Thanh)
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                disabled={isSaved}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-emerald-600 rounded-lg transition-colors shadow-sm"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã lưu thành công!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu thay đổi</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
