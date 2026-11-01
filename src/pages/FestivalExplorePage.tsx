import React, { useState, useEffect } from 'react';
import { Festival } from '../types';
import { festivalService } from '../services/festivalService';

interface FestivalExplorePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onShowToast: (msg: string) => void;
  initialQuery?: string;
  initialRegion?: string;
  initialMonth?: string;
}

export const FestivalExplorePage: React.FC<FestivalExplorePageProps> = ({
  onNavigate,
  onShowToast,
  initialQuery = '',
  initialRegion = 'all',
  initialMonth = 'all',
}) => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [hasGamesOnly, setHasGamesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'nearest' | 'month' | 'scale'>('nearest');
  const [currentPage, setCurrentPage] = useState(1);

  const loadFestivals = async () => {
    const list = await festivalService.getFestivals({
      query: searchQuery,
      region: selectedRegion === 'all' ? undefined : selectedRegion,
      lunarMonth: selectedMonth === 'all' ? undefined : selectedMonth,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
    });
    setFestivals(list);
  };

  useEffect(() => {
    loadFestivals();
  }, [searchQuery, selectedRegion, selectedMonth, selectedCategory]);

  const handleToggleFavorite = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    const isFav = await festivalService.toggleFavorite(id);
    onShowToast(isFav ? `Đã lưu "${name}" vào danh sách yêu thích!` : `Đã bỏ lưu "${name}".`);
    loadFestivals();
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedMonth('all');
    setSelectedCategory('all');
    setSelectedProvince('');
    setHasGamesOnly(false);
    onShowToast('Đã thiết lập lại toàn bộ bộ lọc!');
  };

  const filteredList = festivals.filter(f => {
    if (selectedProvince && !f.province.toLowerCase().includes(selectedProvince.toLowerCase())) return false;
    if (hasGamesOnly && (!f.games || f.games.length === 0)) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
        {/* Top Editorial Header & Discovery Summary */}
        <div className="pt-2 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2 text-[#7c5800] text-xs uppercase font-bold tracking-wider">
              <span className="material-symbols-outlined text-[16px]">travel_explore</span>
              <span>Hệ Thống Phân Loại & Thư Mục Lễ Hội Âm Lịch Toàn Quốc</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#8e1921] font-bold tracking-tight">
              Kho Tàng Di Sản Lễ Hội Dân Tộc Việt Nam
            </h1>
            <p className="text-xs sm:text-sm text-[#584140]">
              Tra cứu niên lịch, phong tục tín ngưỡng và nghi lễ cổ truyền qua 54 dân tộc anh em. Dữ liệu đối chiếu chuẩn xác theo vòng quay thiên văn âm - dương lịch.
            </p>
          </div>

          {/* Live Catalog Metric Badge */}
          <div className="bg-[#ece8e0] px-5 py-4 rounded-2xl flex items-center gap-4 shadow-sm border border-[#e0bfbd]/40">
            <div className="w-12 h-12 rounded-xl bg-[#8e1921] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[26px]">history_edu</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl text-[#8e1921] font-bold">128</span>
                <span className="text-xs text-[#7c5800] font-bold">Di sản</span>
              </div>
              <span className="text-xs text-[#584140]">Đã được số hóa & kiểm chứng niên biểu</span>
            </div>
          </div>
        </div>

        {/* Quick Search, Quick Filters & Sorting Strip */}
        <div className="bg-[#f7f3eb] p-4 rounded-2xl mb-8 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border border-[#e0bfbd]/40">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#7c5800] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên lễ hội, địa danh, thần tích (Vua Hùng, Chử Đồng Tử, Hai Bà Trưng...)"
              className="w-full pl-12 pr-4 py-2.5 bg-white text-[#1c1c17] text-xs sm:text-sm rounded-xl placeholder:text-[#8c716f] focus:outline-none focus:ring-2 focus:ring-[#8e1921]/20 shadow-xs border border-[#e0bfbd]/50"
            />
          </div>

          {/* Quick Sorting Bar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="text-xs text-[#584140] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">swap_vert</span>
              Sắp xếp:
            </span>
            <div className="inline-flex bg-[#f1ede6] rounded-xl p-1 text-xs">
              <button
                onClick={() => setSortBy('nearest')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  sortBy === 'nearest' ? 'bg-white text-[#8e1921] shadow-xs' : 'text-[#584140] hover:text-[#1c1c17]'
                }`}
              >
                Gần nhất
              </button>
              <button
                onClick={() => setSortBy('month')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  sortBy === 'month' ? 'bg-white text-[#8e1921] shadow-xs' : 'text-[#584140] hover:text-[#1c1c17]'
                }`}
              >
                Theo tháng ÂL
              </button>
              <button
                onClick={() => setSortBy('scale')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  sortBy === 'scale' ? 'bg-white text-[#8e1921] shadow-xs' : 'text-[#584140] hover:text-[#1c1c17]'
                }`}
              >
                Quy mô lớn
              </button>
            </div>
          </div>
        </div>

        {/* Main 2-Column Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= SIDEBAR: FACET FILTERS (4 Cols) ================= */}
          <aside className="lg:col-span-4 flex flex-col gap-6 bg-[#f7f3eb] p-5 sm:p-6 rounded-2xl shadow-sm border border-[#e0bfbd]/40">
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e0bfbd]/40">
              <div className="flex items-center gap-2 text-[#8e1921] font-bold font-serif text-base">
                <span className="material-symbols-outlined text-[20px]">tune</span>
                <span>Bộ Lọc Di Sản</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[#7c5800] text-xs font-semibold hover:underline hover:text-[#8e1921] transition-colors"
              >
                Thiết lập lại
              </button>
            </div>

            {/* Facet 1: Vùng Miền */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                1. Vùng Địa Lý & Văn Hóa
              </label>
              <div className="flex flex-col gap-1.5 pt-1 text-xs">
                {[
                  { key: 'all', label: 'Tất cả các vùng', count: '128' },
                  { key: 'bac', label: 'Miền Bắc (Đồng bằng & Việt Bắc)', count: '64' },
                  { key: 'trung', label: 'Miền Trung & Tây Nguyên', count: '38' },
                  { key: 'nam', label: 'Miền Nam & ĐBSCL', count: '26' },
                ].map((r) => (
                  <label
                    key={r.key}
                    className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors border ${
                      selectedRegion === r.key
                        ? 'bg-white border-[#8e1921]/40 shadow-xs'
                        : 'bg-white/70 border-transparent hover:bg-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-[#1c1c17] font-medium">
                      <input
                        type="radio"
                        name="region"
                        checked={selectedRegion === r.key}
                        onChange={() => setSelectedRegion(r.key)}
                        className="accent-[#8e1921] w-4 h-4"
                      />
                      {r.label}
                    </span>
                    <span className="text-[10px] text-[#584140] bg-[#f1ede6] px-2 py-0.5 rounded-full font-bold">
                      {r.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Facet 2: 12 Tháng Âm Lịch Grid */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                  2. Chu Kỳ Tháng Âm Lịch
                </label>
                <span className="text-[11px] text-[#8e1921] font-semibold">Xuân trẩy hội</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-xs">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                  const isSelected = selectedMonth === String(m);
                  return (
                    <button
                      key={m}
                      onClick={() => setSelectedMonth(isSelected ? 'all' : String(m))}
                      className={`py-1.5 rounded-lg text-center font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#8e1921] text-white shadow-xs'
                          : 'bg-white text-[#584140] hover:bg-[#f1ede6] border border-[#e0bfbd]/30'
                      }`}
                    >
                      {m === 1 ? 'T.Giêng' : m === 12 ? 'T.Chạp' : `T.${m}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Facet 3: Loại Hình Di Sản */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                3. Phân Loại Di Sản & Tín Ngưỡng
              </label>
              <div className="flex flex-col gap-2 pt-1 text-xs text-[#1c1c17]">
                {[
                  { key: 'unesco', label: 'Di sản đại diện UNESCO', count: '14' },
                  { key: 'national', label: 'Di sản Quốc gia đặc biệt', count: '52' },
                  { key: 'denchua', label: 'Tín ngưỡng & Cổ tự Phật giáo', count: '31' },
                  { key: 'folk', label: 'Lễ hội Dân gian & Vương triều', count: '45' },
                  { key: 'songnuoc', label: 'Sông nước & Biển đảo', count: '19' },
                ].map((cat) => (
                  <label key={cat.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.key}
                      onChange={() => setSelectedCategory(selectedCategory === cat.key ? 'all' : cat.key)}
                      className="accent-[#8e1921] w-4 h-4"
                    />
                    <span className="flex-1">{cat.label}</span>
                    <span className="text-[10px] text-[#7c5800] font-bold">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Facet 4: Tỉnh / Thành Phố Trọng Điểm */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                4. Tỉnh / Thành Phố Trọng Điểm
              </label>
              <div className="relative pt-1">
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full bg-white text-[#1c1c17] text-xs px-3 py-2.5 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#8e1921]/30 shadow-xs border border-[#e0bfbd]/50 pr-8"
                >
                  <option value="">Toàn bộ 63 Tỉnh Thành</option>
                  <option value="Phú Thọ">Phú Thọ (Đất Tổ Cội Nguồn)</option>
                  <option value="Bắc Ninh">Bắc Ninh (Vùng Kinh Bắc)</option>
                  <option value="Hà Nội">Hà Nội (Thăng Long Xứ Đoài)</option>
                  <option value="Nam Định">Nam Định (Phủ Thiên Trường)</option>
                  <option value="Huế">Thừa Thiên Huế (Cố Đô Di Sản)</option>
                  <option value="Khánh Hòa">Khánh Hòa (Nha Trang Tháp Bà)</option>
                  <option value="An Giang">An Giang (Vùng Núi Sam)</option>
                  <option value="Sóc Trăng">Sóc Trăng (Văn Hóa Khmer)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#584140] text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Facet 5: Tiêu Chí Trải Nghiệm */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                5. Tiêu Chí Trải Nghiệm Điền Dã
              </label>
              <div className="flex flex-col gap-2 pt-1 text-xs text-[#1c1c17]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasGamesOnly}
                    onChange={(e) => setHasGamesOnly(e.target.checked)}
                    className="accent-[#8e1921] w-4 h-4 rounded"
                  />
                  <span>Có trò chơi dân gian (Vật, kéo co, bơi chải)</span>
                </label>
              </div>
            </div>

            {/* Sidebar Banner: Thesis attribution */}
            <div className="p-4 rounded-xl bg-[#f1ede6] border border-[#e0bfbd]/50 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#7c5800] font-bold text-[10px] uppercase">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>Học Viện Công Nghệ & Truyền Thông</span>
              </div>
              <span className="font-serif font-bold text-sm text-[#8e1921]">
                Hệ Thống Nghiên Cứu Lịch Lễ Hội D01
              </span>
              <p className="text-[11px] text-[#584140] leading-relaxed">
                Thuật toán đồng bộ ngày âm - dương chuẩn thiên văn do Sinh viên <strong>Bùi Trung Nam (MSV: PH60600)</strong> xây dựng nhằm hỗ trợ du khách tiếp cận chuẩn xác mùa lễ hội.
              </p>
            </div>
          </aside>

          {/* ================= MAIN FESTIVAL GRID (8 Cols) ================= */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            {/* Active Filter Indicator Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#ece8e0] px-4 py-2.5 rounded-xl text-xs border border-[#e0bfbd]/40">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[#584140] font-medium">Đang lọc theo:</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8e1921]/10 text-[#8e1921] font-bold">
                  {selectedRegion === 'all' ? 'Toàn quốc' : `Miền ${selectedRegion.toUpperCase()}`}
                </span>
                {selectedMonth !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffc968] text-[#775300] font-bold">
                    Tháng {selectedMonth} ÂL
                  </span>
                )}
                {hasGamesOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#1c1c17] font-semibold">
                    Có trò chơi dân gian
                  </span>
                )}
              </div>
              <span className="text-[#584140] font-semibold">
                Hiển thị {filteredList.length} di sản
              </span>
            </div>

            {/* Festival Catalog Grid (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredList.map((fest) => (
                <article
                  key={fest.id}
                  onClick={() => onNavigate('chi-tiet-le-hoi', { id: fest.id })}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer border border-[#e0bfbd]/40"
                >
                  <div className="relative h-52 w-full overflow-hidden">
                    <img
                      src={fest.image}
                      alt={fest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Calendar Badge Floating Top-Left */}
                    <div className="absolute top-3 left-3 flex flex-col items-center bg-white rounded-xl shadow-md overflow-hidden text-center min-w-[55px] border border-[#d4a346]/40">
                      <div className="bg-[#8e1921] text-white w-full py-0.5 px-2 text-[10px] font-bold">
                        {fest.lunarDay}/{fest.lunarMonth}
                      </div>
                      <div className="py-1 px-2 font-serif text-sm text-[#8e1921] font-bold leading-none">
                        ÂL
                      </div>
                    </div>

                    {/* Tags Floating Top-Right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#7c5800] text-white text-[10px] font-bold uppercase shadow-sm">
                        {fest.heritageRank}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#8e1921] text-[10px] font-semibold">
                        Miền {fest.region}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1 text-[11px] text-[#ffdea8] mb-0.5">
                        <span className="material-symbols-outlined text-[15px]">location_on</span>
                        <span className="truncate">{fest.location}</span>
                      </div>
                      <h2 className="font-serif text-lg font-bold text-white leading-tight group-hover:text-[#ffdea8] transition-colors truncate">
                        {fest.name}
                      </h2>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                    <p className="text-xs text-[#584140] line-clamp-3 leading-relaxed">
                      {fest.shortDesc}
                    </p>

                    <div className="flex flex-col gap-2 pt-2 border-t border-[#e0bfbd]/30 text-xs">
                      <div className="flex items-center justify-between text-[#584140]">
                        <span className="flex items-center gap-1 text-[11px]">
                          <span className="material-symbols-outlined text-[15px] text-[#7c5800]">schedule</span>
                          {fest.lunarDate}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <span className="material-symbols-outlined text-[15px] text-[#7c5800]">groups</span>
                          {fest.attendeesCount || 'Quy mô lớn'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => handleToggleFavorite(e, fest.id, fest.name)}
                            className="w-8 h-8 rounded-lg bg-[#f1ede6] flex items-center justify-center text-[#8e1921] hover:bg-[#8e1921] hover:text-white transition-colors"
                            title="Lưu yêu thích"
                          >
                            <span
                              className="material-symbols-outlined text-[18px]"
                              style={{ fontVariationSettings: festivalService.isFavorite(fest.id) ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              favorite
                            </span>
                          </button>
                        </div>

                        <span className="px-3 py-1.5 rounded-lg bg-[#8e1921] text-white text-xs font-semibold hover:bg-[#6b000f] transition-all flex items-center gap-1 shadow-sm">
                          <span>Xem chi tiết</span>
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Strip */}
            <nav aria-label="Pagination" className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-[#f7f3eb] rounded-2xl border border-[#e0bfbd]/40">
              <span className="text-xs text-[#584140]">
                Trang <strong className="text-[#1c1c17]">{currentPage}</strong> trên <strong className="text-[#1c1c17]">16</strong> (Tổng 128 lễ hội di sản)
              </span>
              <div className="flex items-center gap-1 text-xs">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-[#584140] flex items-center justify-center disabled:opacity-40 border border-[#e0bfbd]/40"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg font-bold ${
                      currentPage === page ? 'bg-[#8e1921] text-white shadow-xs' : 'bg-white text-[#1c1c17] hover:bg-[#f1ede6] border border-[#e0bfbd]/40'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-1 text-[#584140]">...</span>
                <button
                  onClick={() => setCurrentPage(16)}
                  className={`w-8 h-8 rounded-lg font-bold ${
                    currentPage === 16 ? 'bg-[#8e1921] text-white shadow-xs' : 'bg-white text-[#1c1c17] hover:bg-[#f1ede6] border border-[#e0bfbd]/40'
                  }`}
                >
                  16
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(16, prev + 1))}
                  className="w-8 h-8 rounded-lg bg-white text-[#1c1c17] hover:bg-[#f1ede6] flex items-center justify-center border border-[#e0bfbd]/40"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </nav>
          </main>
        </div>

        {/* Project Attribution Banner */}
        <div className="mt-12 bg-[#ece8e0] p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#e0bfbd]/50">
          <div>
            <span className="text-[11px] uppercase font-bold text-[#7c5800] block mb-1">
              Hồ Sơ Đồ Án Tốt Nghiệp Chuyên Ngành CNTT • Đề Tài D01
            </span>
            <h2 className="font-serif text-xl font-bold text-[#8e1921]">
              Số Hóa Lịch Lễ Hội Truyền Thống Dân Tộc Theo Âm Lịch Việt Nam
            </h2>
            <p className="text-xs text-[#584140] mt-1 max-w-2xl">
              Xây dựng và phát triển bởi <strong>Bùi Trung Nam (MSV: PH60600)</strong>. Nền tảng kết hợp thuật toán tính toán lịch thiên văn của Hồ Ngọc Đức với dữ liệu di sản phi vật thể quốc gia được phê duyệt bởi Bộ Văn hóa, Thể thao và Du lịch.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase text-[#7c5800] font-bold block">Mã Định Danh</span>
              <span className="font-serif text-xl font-bold text-[#8e1921]">D01 - PH60600</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#8e1921] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
