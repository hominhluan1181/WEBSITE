/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * JSON State Modal: Harness Engineering Session Handover
 */

import React, { useState } from 'react';
import { ProjectState } from '../types/eduharness';
import { X, Copy, Check, Download, Upload, Code2, AlertCircle } from 'lucide-react';
import { downloadBlob } from '../utils/exportUtils';

interface JsonStateModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ProjectState;
  setState: React.Dispatch<React.SetStateAction<ProjectState>>;
}

export const JsonStateModal: React.FC<JsonStateModalProps> = ({
  isOpen,
  onClose,
  state,
  setState,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [importText, setImportText] = useState<string>('');
  const [importError, setImportError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'view' | 'import'>('view');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(state, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadBlob(
      jsonString,
      `EduHarness_State_${state.khbd.subject}_${state.khbd.grade}.json`,
      'application/json;charset=utf-8'
    );
  };

  const handleApplyImport = () => {
    setImportError(null);
    try {
      const parsed = JSON.parse(importText);
      if (!parsed.khbd || !parsed.exam || !parsed.slides) {
        throw new Error('Dữ liệu JSON không đúng cấu trúc EduHarness (thiếu khbd, exam hoặc slides).');
      }
      setState(parsed);
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Lỗi phân tích cú pháp JSON không hợp lệ.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-900 text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Khối JSON State Bàn Giao Phiên Làm Việc
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Harness Engineering · Lưu trữ trạng thái hoàn chỉnh không thất thoát
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('view')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'view' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Xem & Xuất
              </button>
              <button
                onClick={() => setActiveTab('import')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'import' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Nhập State
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'view' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">
                  Dữ liệu phiên làm việc hiện tại (KHBD 5512 + Slide + Đề thi 7991):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã sao chép!' : 'Sao chép JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tải file .json</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={jsonString}
                className="w-full h-96 p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none resize-none"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dán nội dung JSON State đã lưu trước đó vào đây:
                </label>
                <textarea
                  placeholder="Dán mã JSON State tại đây..."
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="w-full h-80 p-4 font-mono text-xs bg-slate-900 text-white rounded-xl border border-slate-800 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              {importError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{importError}</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleApplyImport}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
                >
                  Khôi phục phiên làm việc từ JSON
                </button>
              </div>
            </div>
          )}
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
