export interface Festival {
  id: string;
  code: string;
  name: string;
  slug: string;
  region: 'Bắc' | 'Trung' | 'Nam' | 'Tây Nguyên';
  regionKey: 'bac' | 'trung' | 'nam' | 'taynguyen';
  province: string;
  district: string;
  location: string;
  lunarDate: string;
  lunarMonth: number;
  lunarDay: number;
  solarDate2025: string;
  heritageRank: 'UNESCO' | 'QUOC_GIA' | 'DAN_GIAN' | 'TIN_NGUONG';
  heritageRankLabel: string;
  category: 'unesco' | 'national' | 'folk' | 'songnuoc' | 'denchua';
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  history: string;
  lunarMeaning: string;
  rituals: string[];
  games: string[];
  songs?: {
    title: string;
    artist?: string;
    subtitle: string;
    verse: string;
    duration?: string;
  }[];
  tips?: {
    behavior: string[];
    food: string[];
  };
  image: string;
  coordinates: {
    x: number;
    y: number;
    lat: number;
    lng: number;
  };
  featured: boolean;
  status: 'PUBLISHED' | 'PENDING' | 'DRAFT';
  confidenceScore: number;
  verifiedSource: string;
  daysLeft?: number;
  attendeesCount?: string;
  tags?: string[];
  personalNote?: string;
  hasReminder?: boolean;
}

export interface DayInfo {
  solarDate: string;
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  lunarYearName: string;
  canChiDay: string;
  canChiMonth: string;
  tietKhi: string;
  truc: string;
  isHoangDao: boolean;
  hoangDaoType: string;
  hoangDaoHours: string[];
  hyThan: string;
  taiThan: string;
  festivals: Festival[];
  isCurrentMonth?: boolean;
}

export interface CulturalArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryKey: 'tin-nguong' | 'lich-tiet-khi' | 'tro-choi' | 'dan-ca' | 'am-thuc';
  readTime: string;
  updateDate: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  summary: string;
  content: string;
  views: number;
  image: string;
  featured?: boolean;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  hanNom: string;
  category: string;
  definition: string;
  alphabet: string;
}

export interface FolkGame {
  id: string;
  name: string;
  location: string;
  description: string;
  technique: string;
  rules: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  studentId: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'RESEARCHER' | 'USER';
  avatar: string;
  token: string;
  email?: string;
}

export interface SystemLog {
  id: string;
  title: string;
  timestamp: string;
  author: string;
  content: string;
  type: 'ASTRONOMICAL' | 'SECURITY' | 'GIS';
}

export interface CommunitySubmission {
  id: string;
  festivalName: string;
  location: string;
  lunarTime: string;
  category: string;
  excerpt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
