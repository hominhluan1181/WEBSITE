/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Kho Tư Liệu Học Liệu Trực Quan Môn Âm Nhạc THCS (SGK Kết nối tri thức với cuộc sống)
 * Bao gồm: Bản nhạc bài hát, Bản phổ tập đọc nhạc, Chân dung nhạc sĩ, Nhạc cụ & Video bài giảng
 */

import {
  musicInstrumentsBanner,
  vietnameseInstrumentsShowcase,
  musicComposersGallery,
  songSheetMusic,
  sightReadingSheet,
  musicHeroScene,
  vietnamDanTranh,
  composerPortrait,
  musicSheetScore,
  orchestraBand,
} from '../assets/images';

export interface VisualMediaItem {
  id: string;
  category: 'song_sheet' | 'sight_reading' | 'composer' | 'instrument' | 'video';
  title: string;
  subtitle: string;
  imageUrl: string;
  gradeBadge: string;
  tags: string[];
  description: string;
  keyDetails: Record<string, string>;
  videoUrl?: string; // YouTube or educational embed
  audioMelodyId?: string;
}

export const MUSIC_VISUAL_CATALOG: VisualMediaItem[] = [
  // 1. Bản nhạc bài hát SGK
  {
    id: 'sheet-mua-khai-truong',
    category: 'song_sheet',
    title: 'Bản nhạc bài hát "Mùa khai trường"',
    subtitle: 'Nhạc và lời: Phan Trần Bảng · Nhịp 2/4 vừa phải',
    imageUrl: songSheetMusic,
    gradeBadge: 'Lớp 6',
    tags: ['Bài hát', 'Khai giảng', 'Nhịp 2/4', 'Lớp 6'],
    description: 'Bản phổ chính thức SGK Âm nhạc 6 Kết nối tri thức. Giai điệu trong sáng, rộn rã miêu tả niềm vui học sinh tựu trường.',
    keyDetails: {
      'Tác giả': 'Nhạc sĩ Phan Trần Bảng',
      'Điệu thức / Nhịp': 'Đô trưởng (C major) · Nhịp 2/4',
      'Tính chất': 'Rộn rã, tươi vui, hào hứng',
      'Vị trí SGK': 'Chủ đề 1: Tuổi học trò (Âm nhạc 6)',
    },
    audioMelodyId: 'tdn-1',
  },
  {
    id: 'sheet-con-duong-hoc-tro',
    category: 'song_sheet',
    title: 'Bản nhạc bài hát "Con đường học trò"',
    subtitle: 'Nhạc: Nguyễn Kiều Hưng · Thơ: Nguyễn Trọng Tạo',
    imageUrl: musicSheetScore,
    gradeBadge: 'Lớp 6',
    tags: ['Bài hát', 'Nhịp 3/4', 'Học trò', 'Lớp 6'],
    description: 'Bản phổ bài hát nét giai điệu tha thiết, nhịp nhàng theo nhịp 3/4, ca ngợi mái trường và bạn bè thân thương.',
    keyDetails: {
      'Tác giả': 'Nguyễn Kiều Hưng - Nguyễn Trọng Tạo',
      'Điệu thức / Nhịp': 'Nhịp 3/4 nhịp nhàng (Valse)',
      'Tính chất': 'Trữ tình, êm đềm, thiết tha',
      'Vị trí SGK': 'Chủ đề 2: Con đường học trò (Âm nhạc 6)',
    },
  },
  {
    id: 'sheet-khuc-ca-bon-mua',
    category: 'song_sheet',
    title: 'Bản nhạc bài hát "Khúc ca bốn mùa"',
    subtitle: 'Nhạc và lời: Nguyễn Hải · Nhịp 3/8 vui tươi',
    imageUrl: songSheetMusic,
    gradeBadge: 'Lớp 7',
    tags: ['Bài hát', 'Bốn mùa', 'Nhịp 3/8', 'Lớp 7'],
    description: 'Giai điệu rộn ràng, sinh động về bốn mùa thiên nhiên tươi đẹp tươi sáng của tuổi thơ học trò THCS.',
    keyDetails: {
      'Tác giả': 'Nhạc sĩ Nguyễn Hải',
      'Điệu thức / Nhịp': 'Nhịp 3/8 nhí nhảnh, vui tươi',
      'Tính chất': 'Trong trẻo, hồn nhiên, giàu hình ảnh',
      'Vị trí SGK': 'Chủ đề 1: Khúc ca bốn mùa (Âm nhạc 7)',
    },
    audioMelodyId: 'tdn-2',
  },
  {
    id: 'sheet-thoi-ao-trang',
    category: 'song_sheet',
    title: 'Bản nhạc bài hát "Thời áo trắng"',
    subtitle: 'Nhạc và lời: Trương Quang Lục · Nhịp 2/4',
    imageUrl: musicSheetScore,
    gradeBadge: 'Lớp 8',
    tags: ['Bài hát', 'Áo trắng', 'Trường xưa', 'Lớp 8'],
    description: 'Bản nhạc khắc họa ký ức tuổi học trò thơ mộng, gắn liền với tiếng ve kêu và màu hoa phượng đỏ rực sân trường.',
    keyDetails: {
      'Tác giả': 'Nhạc sĩ Trương Quang Lục',
      'Điệu thức / Nhịp': 'Fa trưởng · Nhịp 2/4',
      'Tính chất': 'Tha thiết, hoài niệm, sâu lắng',
      'Vị trí SGK': 'Chủ đề 1: Mùa thu ngày khai trường (Âm nhạc 8)',
    },
  },

  // 2. Bản phổ tập đọc nhạc (Solfège Scores)
  {
    id: 'score-tdn-so-1',
    category: 'sight_reading',
    title: 'Bản phổ Bài đọc nhạc số 1 (Âm nhạc 6)',
    subtitle: 'Thang âm Đô - Rê - Mi - Son - La · Nhịp 2/4',
    imageUrl: sightReadingSheet,
    gradeBadge: 'Lớp 6',
    tags: ['Đọc nhạc', 'Nhịp 2/4', 'Nốt trắng', 'Lớp 6'],
    description: 'Bản tập đọc nhạc cơ bản với thang ngũ cung hiện đại. Giúp học sinh nắm vững cao độ Đô, Rê, Mi, Son, La và trường độ nốt đen, nốt trắng.',
    keyDetails: {
      'Thang âm': 'Đô - Rê - Mi - Son - La',
      'Nhịp': 'Nhịp 2/4 (Moderato)',
      'Ký hiệu trường độ': 'Nốt đen, nốt trắng, dấu lặng đen',
      'Yêu cầu cần đạt': 'Đọc đúng cao độ, gõ phách chuẩn xác',
    },
    audioMelodyId: 'tdn-1',
  },
  {
    id: 'score-tdn-so-2',
    category: 'sight_reading',
    title: 'Bản phổ Bài đọc nhạc số 2 (Âm nhạc 7)',
    subtitle: 'Thang âm Đô trưởng (C Major) · Nhịp 3/4',
    imageUrl: sightReadingSheet,
    gradeBadge: 'Lớp 7',
    tags: ['Đọc nhạc', 'Nhịp 3/4', 'Đô trưởng', 'Lớp 7'],
    description: 'Bản tập đọc nhạc nâng cao nhịp 3/4 với trọng âm phách 1 mạnh, phách 2-3 nhẹ. Rèn luyện kỹ năng xướng âm và chỉ huy nhịp.',
    keyDetails: {
      'Thang âm': 'Đô - Rê - Mi - Pha - Son - La - Si - Đô',
      'Nhịp': 'Nhịp 3/4 nhịp nhàng',
      'Kỹ năng': 'Đánh nhịp 3/4 tay phải, xướng âm hòa thanh',
      'Vị trí': 'SGK Âm nhạc 7 - KNTT',
    },
    audioMelodyId: 'tdn-2',
  },

  // 3. Chân dung nhạc sĩ & Danh nhân âm nhạc
  {
    id: 'composer-van-cao',
    category: 'composer',
    title: 'Nhạc sĩ Văn Cao (1923 – 1995)',
    subtitle: 'Tác giả Quốc ca Việt Nam (Tiến quân ca) · Giải thưởng Hồ Chí Minh',
    imageUrl: composerPortrait,
    gradeBadge: 'Danh nhân',
    tags: ['Nhạc sĩ', 'Việt Nam', 'Văn Cao', 'Quốc ca'],
    description: 'Cây đại thụ của nền tân nhạc Việt Nam. Tác giả của Quốc ca hùng tráng (Tiến quân ca), Làng tôi, Trường ca Sông Lô, Mùa xuân đầu tiên.',
    keyDetails: {
      'Năm sinh - mất': '1923 – 1995 (Quê Nam Định, sinh tại Hải Phòng)',
      'Tác phẩm tiêu biểu': 'Tiến quân ca, Làng tôi, Ca ngợi Hồ Chủ tịch, Ngày mùa',
      'Đóng góp': 'Đặt nền móng xuất sắc cho nền âm nhạc cách mạng Việt Nam',
      'Chủ đề SGK': 'Thường thức âm nhạc: Tác giả - tác phẩm (Âm nhạc 6 & 7)',
    },
  },
  {
    id: 'composer-trinh-cong-son',
    category: 'composer',
    title: 'Nhạc sĩ Trịnh Công Sơn (1939 – 2001)',
    subtitle: 'Nhạc sĩ của tình yêu và hòa bình · Tác giả "Nối vòng tay lớn"',
    imageUrl: musicComposersGallery,
    gradeBadge: 'Danh nhân',
    tags: ['Nhạc sĩ', 'Trịnh Công Sơn', 'Nối vòng tay lớn', 'Hòa bình'],
    description: 'Một trong những nhạc sĩ lớn nhất của tân nhạc Việt Nam. Những ca khúc giàu chất thơ triết lý, nhân văn sâu sắc và gắn kết muôn triệu trái tim.',
    keyDetails: {
      'Năm sinh - mất': '1939 – 2001 (Quê Thừa Thiên Huế)',
      'Tác phẩm học đường': 'Nối vòng tay lớn, Em là bông hồng nhỏ, Tuổi đời mênh mông',
      'Phong cách nghệ thuật': 'Giai điệu mộc mạc, ca từ giàu chất thơ và triết lý nhân sinh',
      'Chủ đề SGK': 'Âm nhạc và cuộc sống (SGK Kết nối tri thức)',
    },
  },
  {
    id: 'composer-mozart',
    category: 'composer',
    title: 'Wolfgang Amadeus Mozart (1756 – 1791)',
    subtitle: 'Thiên tài âm nhạc cổ điển Áo · Đại diện trường phái Cổ điển Vienna',
    imageUrl: composerPortrait,
    gradeBadge: 'Cổ điển',
    tags: ['Nhạc sĩ', 'Mozart', 'Cổ điển Áo', 'Giao hưởng'],
    description: 'Thần đồng âm nhạc vĩ đại nhất lịch sử. Ông sáng tác từ năm 5 tuổi và để lại hơn 600 kiệt tác giao hưởng, opera, concerto và sonata.',
    keyDetails: {
      'Quốc tịch': 'Áo (Sinh tại Salzburg)',
      'Tác phẩm tiêu biểu': 'Hành khúc Thổ Nhĩ Kỳ, Bản giao hưởng số 40, Cây sáo thần',
      'Đặc điểm âm nhạc': 'Trong sáng, cân đối, tràn ngập ánh sáng và vẻ đẹp thuần khiết',
      'Vị trí SGK': 'Thường thức âm nhạc thế giới (Âm nhạc THCS)',
    },
  },
  {
    id: 'composer-beethoven',
    category: 'composer',
    title: 'Ludwig van Beethoven (1770 – 1827)',
    subtitle: 'Nhà soạn nhạc thiên tài Đức · Người bắc cầu Cổ điển sang Lãng mạn',
    imageUrl: musicComposersGallery,
    gradeBadge: 'Cổ điển',
    tags: ['Nhạc sĩ', 'Beethoven', 'Giao hưởng số 5', 'Đức'],
    description: 'Tượng đài âm nhạc thế giới. Dù bị điếc hoàn toàn ở nửa sau cuộc đời, ông vẫn sáng tác nên Bản giao hưởng số 9 (Khúc hoan ca) và Giao hưởng Định mệnh bất hủ.',
    keyDetails: {
      'Quốc tịch': 'Đức (Bonn - Vienna)',
      'Tác phẩm tiêu biểu': 'Bản giao hưởng số 5 (Định mệnh), Bản giao hưởng số 9, Sonata Ánh trăng',
      'Tinh thần': 'Ý chí quật cường vươn lên số phận, ngợi ca tự do và tình anh em nhân loại',
      'Vị trí SGK': 'Chân dung danh nhân âm nhạc thế giới',
    },
  },

  // 4. Nhạc cụ dạy học & Hòa tấu
  {
    id: 'instrument-vietnam-folk',
    category: 'instrument',
    title: 'Nhạc cụ Dân tộc Việt Nam: Đàn tranh, Sáo trúc, Đàn bầu',
    subtitle: 'Nhạc cụ cổ truyền độc đáo thể hiện bản sắc văn hóa Việt Nam',
    imageUrl: vietnamDanTranh,
    gradeBadge: 'Dân tộc',
    tags: ['Nhạc cụ', 'Đàn tranh', 'Sáo trúc', 'Đàn bầu', 'Dân tộc'],
    description: 'Bộ sưu tập nhạc cụ dân tộc cổ truyền với âm sắc trầm bổng, trong trẻo, mang đậm hồn cốt dân ca ba miền Bắc - Trung - Nam.',
    keyDetails: {
      'Đàn tranh': '16 - 19 dây, âm sắc lảnh lót, thanh thoát',
      'Sáo trúc': 'Ống trúc khoét lỗ thổi hơi, âm thanh bay bổng da diết',
      'Đàn bầu': 'Nhạc cụ 1 dây độc nhất vô nhị trên thế giới với vòi nảy cần đàn',
      'SGK KNTT': 'Chủ đề Âm nhạc dân gian & Nhạc cụ gõ dân tộc',
    },
  },
  {
    id: 'instrument-classroom-band',
    category: 'instrument',
    title: 'Dàn nhạc cụ học đường & Phương Tây',
    subtitle: 'Đàn Piano, Guitar, Melodica, Recorder, Song loan & Bộ gõ',
    imageUrl: orchestraBand,
    gradeBadge: 'Thực hành',
    tags: ['Nhạc cụ', 'Melodica', 'Recorder', 'Guitar', 'Piano'],
    description: 'Hệ thống nhạc cụ thực hành chuẩn Bộ GD&ĐT trang bị cho phòng bộ môn Âm nhạc THCS để luyện tập hòa tấu và gõ đệm.',
    keyDetails: {
      'Kèn Melodica': 'Kèn phím hơi thổi qua ống ngậm, dễ học cho học sinh THCS',
      'Sáo Recorder': 'Sáo dọc hệ Soprano chuẩn cao độ',
      'Song loan & Thanh phách': 'Nhạc cụ gõ giữ nhịp cơ bản trong tiết học',
      'Đàn Organ/Keyboard': 'Giáo viên sử dụng làm chuẩn cao độ và đệm hát',
    },
  },

  // 5. Video bài giảng & Tư liệu giáo dục âm nhạc
  {
    id: 'video-doc-mua-khai-truong',
    category: 'video',
    title: 'Video Bài giảng Mẫu: Hướng dẫn hát & Gõ đệm bài "Mùa khai trường"',
    subtitle: 'Tư liệu video giáo dục âm nhạc THCS chuẩn KNTT',
    imageUrl: musicHeroScene,
    gradeBadge: 'Video SGK',
    tags: ['Video', 'Hướng dẫn', 'Gõ đệm', 'Lớp 6'],
    description: 'Video trực quan ghi lại các bước giáo viên làm mẫu khẩu hình, hướng dẫn học sinh xướng âm và gõ phách nhịp 2/4 chuẩn xác.',
    keyDetails: {
      'Thời lượng': '8 phút 45 giây',
      'Nội dung chính': 'Khởi động giọng -> Dạy hát từng câu -> Ghép cả bài -> Gõ đệm song loan',
      'Độ phân giải': 'Full HD 1080p sắc nét',
      'Nguồn': 'Kênh Giáo dục Âm nhạc Bộ GD&ĐT & VTV7 Giáo dục',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
  },
];
