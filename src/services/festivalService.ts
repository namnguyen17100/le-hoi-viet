import { Festival } from '../types';
import { INITIAL_FESTIVALS } from './mockData';
import { apiClient } from './apiClient';

class FestivalService {
  private festivals: Festival[] = [];
  private favoriteIds: Set<string> = new Set(['lim', 'denhung', 'dentran', 'chuahuong', 'nuisam']);
  private reminderIds: Set<string> = new Set(['lim', 'denhung']);
  private notesMap: Map<string, string> = new Map([
    ['chuahuong', 'Xuất phát từ Hà Đông lúc 5:00 sáng mùng 6 để tránh ùn ứ đò Suối Yến. Cần mang máy quay phim nghiên cứu điệu múa rồng tại sân Thiên Trù.']
  ]);

  constructor() {
    // Initialize with mock data, sync with localStorage if available
    const saved = localStorage.getItem('lehoiviet_festivals');
    if (saved) {
      try {
        this.festivals = JSON.parse(saved);
      } catch {
        this.festivals = [...INITIAL_FESTIVALS];
      }
    } else {
      this.festivals = [...INITIAL_FESTIVALS];
    }

    const savedFavs = localStorage.getItem('lehoiviet_favs');
    if (savedFavs) {
      try {
        this.favoriteIds = new Set(JSON.parse(savedFavs));
      } catch {
        // use default
      }
    }

    const savedReminders = localStorage.getItem('lehoiviet_reminders');
    if (savedReminders) {
      try {
        this.reminderIds = new Set(JSON.parse(savedReminders));
      } catch {
        // use default
      }
    }
  }

  private persist() {
    localStorage.setItem('lehoiviet_festivals', JSON.stringify(this.festivals));
    localStorage.setItem('lehoiviet_favs', JSON.stringify(Array.from(this.favoriteIds)));
    localStorage.setItem('lehoiviet_reminders', JSON.stringify(Array.from(this.reminderIds)));
  }

  public async getFestivals(params?: {
    region?: string;
    lunarMonth?: number | string;
    category?: string;
    query?: string;
    status?: string;
  }): Promise<Festival[]> {
    let result = [...this.festivals];

    if (params?.region && params.region !== 'all' && params.region !== '') {
      const regionParam = params.region.toLowerCase();
      result = result.filter(
        f => f.regionKey === params.region || f.region.toLowerCase().includes(regionParam)
      );
    }

    if (params?.lunarMonth && params.lunarMonth !== 'all' && params.lunarMonth !== '') {
      const m = Number(params.lunarMonth);
      result = result.filter(f => f.lunarMonth === m);
    }

    if (params?.category && params.category !== 'all' && params.category !== '') {
      const catParam = params.category.toLowerCase();
      result = result.filter(f => f.category === params.category || f.heritageRank.toLowerCase() === catParam);
    }

    if (params?.status && params.status !== '') {
      result = result.filter(f => f.status.toLowerCase() === params.status?.toLowerCase());
    }

    if (params?.query && params.query.trim()) {
      const q = params.query.toLowerCase().trim();
      result = result.filter(f => 
        f.name.toLowerCase().includes(q) ||
        f.province.toLowerCase().includes(q) ||
        f.shortDesc.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        (f.tags && f.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Attach favorites & reminders
    result = result.map(f => ({
      ...f,
      hasReminder: this.reminderIds.has(f.id),
      personalNote: this.notesMap.get(f.id)
    }));

    return apiClient.simulateNetwork(result);
  }

  public async getFestivalById(id: string): Promise<Festival | undefined> {
    const fest = this.festivals.find(f => f.id === id || f.slug === id);
    if (!fest) return undefined;
    return apiClient.simulateNetwork({
      ...fest,
      hasReminder: this.reminderIds.has(fest.id),
      personalNote: this.notesMap.get(fest.id)
    });
  }

  public async getFavorites(): Promise<Festival[]> {
    const favs = this.festivals
      .filter(f => this.favoriteIds.has(f.id))
      .map(f => ({
        ...f,
        hasReminder: this.reminderIds.has(f.id),
        personalNote: this.notesMap.get(f.id)
      }));
    return apiClient.simulateNetwork(favs);
  }

  public async toggleFavorite(id: string): Promise<boolean> {
    if (this.favoriteIds.has(id)) {
      this.favoriteIds.delete(id);
    } else {
      this.favoriteIds.add(id);
    }
    this.persist();
    return apiClient.simulateNetwork(this.favoriteIds.has(id));
  }

  public isFavorite(id: string): boolean {
    return this.favoriteIds.has(id);
  }

  public async toggleReminder(id: string): Promise<boolean> {
    if (this.reminderIds.has(id)) {
      this.reminderIds.delete(id);
    } else {
      this.reminderIds.add(id);
    }
    this.persist();
    return apiClient.simulateNetwork(this.reminderIds.has(id));
  }

  public hasReminder(id: string): boolean {
    return this.reminderIds.has(id);
  }

  public async saveNote(id: string, note: string): Promise<void> {
    this.notesMap.set(id, note);
    return apiClient.simulateNetwork(undefined);
  }

  public async createFestival(data: Partial<Festival>): Promise<Festival> {
    const id = 'fest-' + Date.now();
    const newFestival: Festival = {
      id,
      code: data.code || `VH-VN-${String(this.festivals.length + 1).padStart(2, '0')}`,
      name: data.name || 'Lễ hội mới',
      slug: (data.name || 'le-hoi-moi').toLowerCase().replace(/\s+/g, '-'),
      region: data.region || 'Bắc',
      regionKey: data.regionKey || 'bac',
      province: data.province || 'Hà Nội',
      district: data.district || '',
      location: data.location || '',
      lunarDate: data.lunarDate || 'Tháng Giêng ÂL',
      lunarMonth: data.lunarMonth || 1,
      lunarDay: data.lunarDay || 1,
      solarDate2025: data.solarDate2025 || '2025',
      heritageRank: data.heritageRank || 'DAN_GIAN',
      heritageRankLabel: data.heritageRankLabel || 'Di sản Dân gian',
      category: data.category || 'folk',
      categoryLabel: data.categoryLabel || 'Lễ hội Dân gian',
      shortDesc: data.shortDesc || '',
      fullDesc: data.fullDesc || '',
      history: data.history || '',
      lunarMeaning: data.lunarMeaning || '',
      rituals: data.rituals || ['Lễ dâng hương tế thần'],
      games: data.games || ['Hội thi văn nghệ dân gian'],
      image: data.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY7TeCOsRc5Ig2FnvqVEBDePRl0UEHUsAfSmOlZXItqNkzw75I-9Tb2ol1bf5vV_sOISAA25blfis9s6qkwbGUMAxLRNXUCXr-OUMneFhc9OKx0f6qaNaoBk1PqdVXWHQpQ1hZiNE1QbgVLWi5yxBHzgslo9MP7LkLzTJpIcQG6oEs0kQoZWUAJ1WjlMYFjJTTzCebisfYV2O8BQLkG4g5LXi3c8uLo8CM2cHEqXk',
      coordinates: data.coordinates || { x: 300, y: 150, lat: 21.0, lng: 105.8 },
      featured: Boolean(data.featured),
      status: data.status || 'PUBLISHED',
      confidenceScore: data.confidenceScore || 90,
      verifiedSource: data.verifiedSource || 'Sở VHTTDL Địa phương'
    };

    this.festivals.unshift(newFestival);
    this.persist();
    return apiClient.simulateNetwork(newFestival);
  }

  public async updateFestival(id: string, updates: Partial<Festival>): Promise<Festival> {
    const idx = this.festivals.findIndex(f => f.id === id);
    if (idx === -1) throw new Error('Không tìm thấy lễ hội');
    this.festivals[idx] = { ...this.festivals[idx], ...updates };
    this.persist();
    return apiClient.simulateNetwork(this.festivals[idx]);
  }

  public async deleteFestival(id: string): Promise<boolean> {
    this.festivals = this.festivals.filter(f => f.id !== id);
    this.persist();
    return apiClient.simulateNetwork(true);
  }
}

export const festivalService = new FestivalService();
