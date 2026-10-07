/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Web Audio Synthesizer cho Giáo dục Âm nhạc THCS
 * Cung cấp: Phím đàn ảo, phát cao độ chuẩn, xướng âm Solfège mẫu, Luyện thanh & Máy đập nhịp (Metronome)
 */

class MusicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMelodyPlaying: boolean = false;
  private melodyTimeoutId: NodeJS.Timeout | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Phát một nốt đơn với âm sắc ấm, tự nhiên (Piano / Organ mô phỏng)
   */
  public playNote(freq: number, duration: number = 0.6, type: 'piano' | 'sine' | 'flute' = 'piano') {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Primary tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'piano') {
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        osc2.frequency.setValueAtTime(freq * 2, now); // 1st harmonic

        // Envelope: Fast attack, natural decay
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(gain);
        osc2.connect(gain);
      } else if (type === 'flute') {
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc1.connect(gain);
      } else {
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc1.connect(gain);
      }

      gain.connect(ctx.destination);

      osc1.start(now);
      if (type === 'piano') osc2.start(now);

      osc1.stop(now + duration + 0.05);
      if (type === 'piano') osc2.stop(now + duration + 0.05);
    } catch {
      // AudioContext might be blocked before first user gesture
    }
  }

  /**
   * Phát tiếng gõ nhịp (Metronome click)
   */
  public playClick(accent: boolean = false) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(accent ? 1200 : 800, now);

      gain.gain.setValueAtTime(accent ? 0.4 : 0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // AudioContext blocked
    }
  }

  /**
   * Phát tuần tự chuỗi nốt giai điệu xướng âm (Solfège Melody Player)
   */
  public async playMelody(
    notes: { name: string; freq: number; duration: number }[],
    onNoteChange?: (index: number) => void,
    onComplete?: () => void
  ) {
    this.stopMelody();
    this.isMelodyPlaying = true;

    for (let i = 0; i < notes.length; i++) {
      if (!this.isMelodyPlaying) break;
      const item = notes[i];
      if (onNoteChange) onNoteChange(i);
      this.playNote(item.freq, item.duration * 0.9, 'piano');
      await new Promise((res) => {
        this.melodyTimeoutId = setTimeout(res, item.duration * 1000);
      });
    }

    this.isMelodyPlaying = false;
    if (onNoteChange) onNoteChange(-1);
    if (onComplete) onComplete();
  }

  public stopMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyTimeoutId) {
      clearTimeout(this.melodyTimeoutId);
      this.melodyTimeoutId = null;
    }
  }

  public isPlaying(): boolean {
    return this.isMelodyPlaying;
  }
}

export const musicAudioEngine = new MusicAudioEngine();

// Thang âm Solfège tiêu chuẩn (C4 - C5)
export interface SolfegeKey {
  solfege: string;
  note: string;
  freq: number;
  color: string;
  vietnamese: string;
}

export const SOLFEGE_KEYS: SolfegeKey[] = [
  { solfege: 'Do', note: 'C4', freq: 261.63, color: 'bg-rose-500', vietnamese: 'Đô' },
  { solfege: 'Re', note: 'D4', freq: 293.66, color: 'bg-orange-500', vietnamese: 'Rê' },
  { solfege: 'Mi', note: 'E4', freq: 329.63, color: 'bg-amber-500', vietnamese: 'Mi' },
  { solfege: 'Fa', note: 'F4', freq: 349.23, color: 'bg-emerald-500', vietnamese: 'Pha' },
  { solfege: 'Sol', note: 'G4', freq: 392.00, color: 'bg-teal-500', vietnamese: 'Son' },
  { solfege: 'La', note: 'A4', freq: 440.00, color: 'bg-blue-500', vietnamese: 'La' },
  { solfege: 'Si', note: 'B4', freq: 493.88, color: 'bg-purple-500', vietnamese: 'Si' },
  { solfege: 'Do²', note: 'C5', freq: 523.25, color: 'bg-pink-500', vietnamese: 'Đô cao' },
];

// Bài đọc nhạc mẫu SGK Kết nối tri thức
export interface SolfegeExercise {
  id: string;
  title: string;
  meter: string;
  grade: string;
  description: string;
  notes: { name: string; freq: number; duration: number }[];
}

export const SOLFEGE_EXERCISES: SolfegeExercise[] = [
  {
    id: 'tdn-1',
    title: 'Bài tập đọc nhạc số 1 (Âm nhạc 6 - KNTT)',
    meter: 'Nhịp 2/4 · Vừa phải (Moderato)',
    grade: 'Lớp 6',
    description: 'Thang âm Đô - Rê - Mi - Son - La. Luyện đọc nốt trắng và nốt đen nhịp nhàng.',
    notes: [
      { name: 'Đô', freq: 261.63, duration: 0.6 },
      { name: 'Rê', freq: 293.66, duration: 0.6 },
      { name: 'Mi', freq: 329.63, duration: 0.6 },
      { name: 'Son', freq: 392.00, duration: 0.6 },
      { name: 'La', freq: 440.00, duration: 1.2 },
      { name: 'Son', freq: 392.00, duration: 0.6 },
      { name: 'Mi', freq: 329.63, duration: 0.6 },
      { name: 'Rê', freq: 293.66, duration: 0.6 },
      { name: 'Đô', freq: 261.63, duration: 1.2 },
    ],
  },
  {
    id: 'tdn-2',
    title: 'Bài tập đọc nhạc số 2 (Âm nhạc 7 - KNTT)',
    meter: 'Nhịp 3/4 · Nhịp nhàng (Andante)',
    grade: 'Lớp 7',
    description: 'Thang âm Đô trưởng: Đô - Mi - Son - Đô² - Son - Mi - Đô.',
    notes: [
      { name: 'Đô', freq: 261.63, duration: 0.5 },
      { name: 'Mi', freq: 329.63, duration: 0.5 },
      { name: 'Son', freq: 392.00, duration: 0.5 },
      { name: 'Đô²', freq: 523.25, duration: 1.0 },
      { name: 'Si', freq: 493.88, duration: 0.5 },
      { name: 'La', freq: 440.00, duration: 0.5 },
      { name: 'Son', freq: 392.00, duration: 1.0 },
      { name: 'Mi', freq: 329.63, duration: 0.5 },
      { name: 'Rê', freq: 293.66, duration: 0.5 },
      { name: 'Đô', freq: 261.63, duration: 1.2 },
    ],
  },
  {
    id: 'luyen-thanh',
    title: 'Mẫu Luyện thanh 5 bậc (Vocal Warm-up)',
    meter: 'Nhịp 2/4 · Ma - Me - Mi - Mo - Mu / La - La - La',
    grade: 'Khối THCS',
    description: 'Khởi động giọng, mở rộng khẩu hình và điều chỉnh luồng hơi trước khi tập hát.',
    notes: [
      { name: 'Đô', freq: 261.63, duration: 0.4 },
      { name: 'Rê', freq: 293.66, duration: 0.4 },
      { name: 'Mi', freq: 329.63, duration: 0.4 },
      { name: 'Pha', freq: 349.23, duration: 0.4 },
      { name: 'Son', freq: 392.00, duration: 0.7 },
      { name: 'Pha', freq: 349.23, duration: 0.4 },
      { name: 'Mi', freq: 329.63, duration: 0.4 },
      { name: 'Rê', freq: 293.66, duration: 0.4 },
      { name: 'Đô', freq: 261.63, duration: 0.8 },
    ],
  },
];
