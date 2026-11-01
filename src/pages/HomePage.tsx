import React, { useState, useEffect } from 'react';
import { Festival } from '../types';
import { festivalService } from '../services/festivalService';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onShowToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onShowToast }) => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [keyword, setKeyword] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'quocgia' | 'unesco' | 'songnuoc'>('all');

  useEffect(() => {
    festivalService.getFestivals().then(setFestivals);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('kham-pha-le-hoi', {
      query: keyword,
      region: regionFilter,
      month: monthFilter
    });
  };

  const handleApplyTag = (tag: string) => {
    setKeyword(tag.replace('#', ''));
    onNavigate('kham-pha-le-hoi', {
      query: tag.replace('#', '')
    });
  };

  const handleToggleFav = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    const isNowFav = await festivalService.toggleFavorite(id);
    onShowToast(isNowFav ? `Đã thêm "${name}" vào danh sách yêu thích!` : `Đã bỏ lưu "${name}".`);
    setFestivals(await festivalService.getFestivals());
  };

  const handleRemind = (e: React.MouseEvent, name: string, date: string) => {
    e.stopPropagation();
    onShowToast(`Đã đặt lời nhắc chu kỳ âm lịch cho "${name}" (${date})!`);
  };

  const filteredFestivals = festivals.filter(f => {
    if (activeCategory === 'quocgia') return f.heritageRank === 'QUOC_GIA' || f.category === 'national';
    if (activeCategory === 'unesco') return f.heritageRank === 'UNESCO' || f.category === 'unesco';
    if (activeCategory === 'songnuoc') return f.category === 'songnuoc' || f.regionKey === 'trung';
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Cultural Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#6b000f] text-white pb-16 pt-8 sm:pt-12">
        {/* Traditional Dong Son / Cloud SVG Motif Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
          <svg className="w-full h-full object-cover" fill="none" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <circle cx="600" cy="400" r="380" stroke="#fdf9f1" strokeDasharray="8 8" strokeWidth="4"></circle>
            <circle cx="600" cy="400" r="290" stroke="#fdf9f1" strokeWidth="2"></circle>
            <circle cx="600" cy="400" r="190" stroke="#fdf9f1" strokeDasharray="12 6" strokeWidth="3"></circle>
            <circle cx="600" cy="400" fill="#fdf9f1" r="90"></circle>
            <path d="M600 20 L600 780 M220 400 L980 400" stroke="#fdf9f1" strokeWidth="1.5"></path>
          </svg>
        </div>

        {/* Soft Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8e1921] via-transparent to-[#6b000f] opacity-90 pointer-events-none"></div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Top Tagline & Academic Attribution Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-[#ffdea8]/30">
              <span className="material-symbols-outlined text-[16px] text-[#ffdea8]">stars</span>
              <span className="text-[11px] uppercase tracking-wider text-[#ffdea8] font-bold">
                Di Sản Phi Vật Thể Quốc Gia & UNESCO
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <span className="inline-block w-2 h-2 rounded-full bg-[#f2be5e] animate-ping"></span>
              <span>Dữ liệu số hóa Lịch Âm Dương 2025</span>
            </div>
          </div>

          {/* Main Portal Hero Typography */}
          <div className="max-w-4xl">
            <span className="text-xs uppercase text-[#ffdea8] tracking-widest block mb-2 font-bold">
              Cổng Thông Tin Số Hóa Di Sản Dân Tộc
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white tracking-tight drop-shadow-md mb-4 font-bold leading-tight">
              LỄ HỘI VIỆT — TINH HOA VĂN HÓA DÂN TỘC
            </h1>
            <p className="text-sm sm:text-lg text-white/90 max-w-3xl leading-relaxed mb-8 font-light">
              Khám phá lễ hội truyền thống Việt Nam • Hành trình tìm về cội nguồn qua từng ngày âm lịch và những nét đẹp ngàn năm văn hiến được lưu truyền qua bao thế hệ.
            </p>
          </div>

          {/* Integrated Smart Cultural Search Engine */}
          <div className="bg-[#fdf9f1] text-[#1c1c17] rounded-2xl p-4 sm:p-6 shadow-2xl relative z-10 max-w-5xl border border-[#e0bfbd]/50">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Main Keyword Input */}
                <div className="md:col-span-5 relative flex items-center bg-[#f7f3eb] rounded-xl px-4 py-2.5 border border-[#e0bfbd]/40">
                  <span className="material-symbols-outlined text-[#7c5800] mr-2 text-[22px]">search</span>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Tìm tên lễ hội, địa phương (Bắc Ninh, Phú Thọ, An Giang...)"
                    className="w-full bg-transparent text-sm text-[#1c1c17] placeholder:text-[#8c716f] focus:outline-none"
                  />
                </div>

                {/* Regional Dropdown Filter */}
                <div className="md:col-span-3 relative flex items-center bg-[#f7f3eb] rounded-xl px-4 py-2.5 border border-[#e0bfbd]/40">
                  <span className="material-symbols-outlined text-[#7c5800] mr-2 text-[20px]">travel_explore</span>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full bg-transparent text-sm text-[#1c1c17] focus:outline-none cursor-pointer"
                  >
                    <option value="all">Tất cả vùng miền</option>
                    <option value="bac">Miền Bắc (Đình làng, Mùa xuân)</option>
                    <option value="trung">Miền Trung (Biển, Cố đô, Chăm)</option>
                    <option value="nam">Miền Nam (Sông nước, Miếu bà)</option>
                  </select>
                </div>

                {/* Lunar Month Dropdown Filter */}
                <div className="md:col-span-2 relative flex items-center bg-[#f7f3eb] rounded-xl px-4 py-2.5 border border-[#e0bfbd]/40">
                  <span className="material-symbols-outlined text-[#7c5800] mr-2 text-[20px]">dark_mode</span>
                  <select
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    className="w-full bg-transparent text-sm text-[#1c1c17] focus:outline-none cursor-pointer"
                  >
                    <option value="all">Tháng Âm</option>
                    <option value="1">Tháng Giêng (Tết)</option>
                    <option value="2">Tháng Hai</option>
                    <option value="3">Tháng Ba</option>
                    <option value="4">Tháng Tư</option>
                    <option value="8">Tháng Tám (Đền Trần)</option>
                    <option value="10">Tháng Mười</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-11 flex items-center justify-center gap-1.5 rounded-xl bg-[#8e1921] hover:bg-[#6b000f] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[18px]">manage_search</span>
                    <span>Tra cứu</span>
                  </button>
                </div>
              </div>

              {/* Quick Tag Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] uppercase text-[#7c5800] font-bold mr-1">
                  Lễ hội thịnh hành:
                </span>
                {['#HộiLim', '#GiỗTổHùngVương', '#ChùaHương', '#ĐềnTrần', '#LễHộiCầuNgư', '#BàChúaXứ'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleApplyTag(tag)}
                    className="px-2.5 py-1 rounded-full bg-[#f1ede6] hover:bg-[#ffc968] hover:text-[#775300] text-[#584140] text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Section 2: Quick Today Widget & Real-time Lunar Countdown Dashboard */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border border-[#e0bfbd]/40">
          {/* Dual Calendar Synchronizer */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-[#e0bfbd]/40">
            <div className="flex items-center gap-3">
              {/* Solar Badge */}
              <div className="flex flex-col items-center justify-center bg-[#f1ede6] rounded-xl p-3 min-w-[95px] text-center shadow-sm">
                <span className="text-[10px] uppercase text-[#7c5800] font-bold">Dương Lịch</span>
                <span className="font-serif text-3xl text-[#8e1921] font-bold my-0.5">15</span>
                <span className="text-xs text-[#584140]">Tháng 01, 2025</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="material-symbols-outlined text-[#7c5800] text-[22px]">sync_alt</span>
              </div>
              {/* Lunar Badge */}
              <div className="flex flex-col items-center justify-center bg-[#8e1921] text-white rounded-xl p-3 min-w-[105px] text-center shadow-md">
                <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Âm Lịch</span>
                <span className="font-serif text-3xl text-[#ffdea8] font-bold my-0.5">16</span>
                <span className="text-xs text-white/90">Tháng Chạp</span>
                <span className="text-[10px] text-white/70">Giáp Thìn (2024)</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[#7c5800] text-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Ngày Hoàng Đạo (Kim Quỹ)</span>
              </div>
              <p className="text-xs text-[#584140] mt-1 leading-snug">
                Giờ tốt: Tý (23-1), Dần (3-5), Mão (5-7), Ngọ (11-13). Thích hợp cầu an, chuẩn bị đón xuân cội nguồn.
              </p>
            </div>
          </div>

          {/* Festive Countdown Metric Cards */}
          <div className="lg:col-span-4 bg-[#f7f3eb] rounded-xl p-4 flex flex-col justify-between gap-2 border border-[#e0bfbd]/30">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase text-[#8e1921] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">celebration</span> Đếm Ngược Lễ Tiết
              </span>
              <span className="px-2 py-0.5 rounded bg-[#ffc968] text-[#775300] text-[11px] font-bold">Xuân 2025</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-[#8e1921] font-bold leading-none">14</span>
              <span className="text-sm text-[#1c1c17] font-semibold">ngày nữa đến</span>
              <span className="text-sm text-[#7c5800] font-bold">Tết Nguyên Đán Ất Tỵ</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#584140] pt-1 border-t border-[#e0bfbd]/30">
              <span className="material-symbols-outlined text-[16px] text-[#7c5800]">event_upcoming</span>
              <span>Lễ sắp mở: <strong className="text-[#1c1c17]">Đền Sái (11/1 ÂL)</strong>, <strong className="text-[#1c1c17]">Hội Lim (13/1 ÂL)</strong></span>
            </div>
          </div>

          {/* Quick Action Jump Button */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <button
              onClick={() => onNavigate('lich-am-duong')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#f1ede6] hover:bg-[#ece8e0] transition-colors group shadow-sm text-left"
            >
              <div className="flex flex-col">
                <span className="text-sm text-[#8e1921] font-bold group-hover:text-[#6b000f] transition-colors font-serif">
                  Tra Cứu Lịch Âm Dương
                </span>
                <span className="text-xs text-[#584140]">Vạn sự, can chi, ngày khai hội</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#8e1921] flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Festivals Showcase */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase text-[#7c5800] font-bold tracking-widest">
              <span className="material-symbols-outlined text-[16px]">hotel_class</span>
              <span>Hồn Cốt Dân Tộc • Di Sản Bất Hủ</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#8e1921] tracking-tight mt-1 font-bold">
              Lễ Hội Tiêu Biểu Toàn Quốc
            </h2>
            <p className="text-sm text-[#584140] mt-1">
              Hệ thống các đại lễ truyền thống ngàn năm quy mô bậc nhất khắp ba miền Bắc - Trung - Nam
            </p>
          </div>

          {/* Quick Category Segment Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#8e1921] text-white shadow-sm'
                  : 'bg-[#f1ede6] text-[#584140] hover:bg-[#ece8e0]'
              }`}
            >
              Tất cả ({festivals.length})
            </button>
            <button
              onClick={() => setActiveCategory('quocgia')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === 'quocgia'
                  ? 'bg-[#8e1921] text-white shadow-sm'
                  : 'bg-[#f1ede6] text-[#584140] hover:bg-[#ece8e0]'
              }`}
            >
              Quốc Lễ
            </button>
            <button
              onClick={() => setActiveCategory('unesco')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === 'unesco'
                  ? 'bg-[#8e1921] text-white shadow-sm'
                  : 'bg-[#f1ede6] text-[#584140] hover:bg-[#ece8e0]'
              }`}
            >
              UNESCO
            </button>
            <button
              onClick={() => setActiveCategory('songnuoc')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === 'songnuoc'
                  ? 'bg-[#8e1921] text-white shadow-sm'
                  : 'bg-[#f1ede6] text-[#584140] hover:bg-[#ece8e0]'
              }`}
            >
              Hội Sông Biển
            </button>
          </div>
        </div>

        {/* 6 Primary Festival Cards Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFestivals.slice(0, 6).map((fest) => (
            <article
              key={fest.id}
              onClick={() => onNavigate('chi-tiet-le-hoi', { id: fest.id })}
              className="cursor-pointer group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#e0bfbd]/50"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={fest.image}
                  alt={fest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Calendar Dual Badge Top-Left */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-md flex flex-col items-center min-w-[56px] border border-[#d4a346]/40">
                  <div className="w-full bg-[#8e1921] text-white py-0.5 text-center text-[10px] uppercase font-bold">
                    Âm Lịch
                  </div>
                  <div className="py-1 px-2 text-center">
                    <span className="font-serif text-lg text-[#8e1921] leading-none block font-bold">
                      {fest.lunarDay}
                    </span>
                    <span className="text-[10px] text-[#584140] uppercase font-semibold">
                      T.{fest.lunarMonth}
                    </span>
                  </div>
                </div>

                {/* Regional & Rank Tag Top-Right */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#224e5b]/90 backdrop-blur-sm text-white text-[11px] font-semibold shadow-sm">
                    Miền {fest.region}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffc968] text-[#775300] text-[10px] font-bold shadow-sm">
                    {fest.heritageRankLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-xs text-[#ffdea8]">
                    <span className="material-symbols-outlined text-[15px]">location_on</span>
                    <span className="truncate">{fest.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#8e1921] group-hover:text-[#6b000f] transition-colors mb-1.5">
                    {fest.name}
                  </h3>
                  <p className="text-xs text-[#584140] line-clamp-2 leading-relaxed mb-3">
                    {fest.shortDesc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 bg-[#f7f3eb] -mx-4 -mb-4 px-4 py-3 rounded-b-2xl border-t border-[#e0bfbd]/40">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleToggleFav(e, fest.id, fest.name)}
                      className="p-1.5 rounded-full hover:bg-white text-[#584140] hover:text-[#8e1921] transition-colors"
                      title="Lưu yêu thích"
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: festivalService.isFavorite(fest.id) ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                    <button
                      onClick={(e) => handleRemind(e, fest.name, fest.lunarDate)}
                      className="p-1.5 rounded-full hover:bg-white text-[#584140] hover:text-[#7c5800] transition-colors"
                      title="Nhắc lịch âm"
                    >
                      <span className="material-symbols-outlined text-[20px]">notification_add</span>
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8e1921] group-hover:translate-x-0.5 transition-transform">
                    Xem chi tiết
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: Upcoming Festivals Timeline (7 - 30 days) */}
      <section className="w-full bg-[#f7f3eb] py-16 border-y border-[#e0bfbd]/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase text-[#7c5800] font-bold tracking-wider">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Khai Hội Đầu Xuân</span>
              </div>
              <h2 className="font-serif text-3xl text-[#8e1921] font-bold tracking-tight mt-1">
                Lễ Hội Sắp Khai Mở (7 - 30 Ngày Tới)
              </h2>
              <p className="text-sm text-[#584140] mt-1">
                Lên kế hoạch du xuân trẩy hội cùng gia đình, chuẩn bị lễ vật và hành hương đúng ngày hoàng đạo
              </p>
            </div>
            <button
              onClick={() => onNavigate('lich-am-duong')}
              className="inline-flex items-center gap-1.5 text-[#8e1921] font-bold text-sm hover:underline"
            >
              <span>Xem trọn vẹn Lịch Lễ Hội 2025</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Timeline Item 1 */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#e0bfbd]/50">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-[#8e1921] text-white rounded-xl p-3 min-w-[75px] text-center shadow-sm">
                  <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Còn lại</span>
                  <span className="font-serif text-2xl font-bold leading-none my-0.5">25</span>
                  <span className="text-[10px] text-white/80">ngày</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#ffc968] text-[#775300] text-xs font-bold">
                      11 tháng Giêng ÂL
                    </span>
                    <span className="text-[#584140] text-xs">• 08/02/2025 Dương lịch</span>
                    <span className="px-2 py-0.5 rounded bg-[#f1ede6] text-xs text-[#7c5800]">
                      Đông Anh, Hà Nội
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#8e1921]">
                    Lễ Hội Rước Vua Giả Đền Sái
                  </h3>
                  <p className="text-xs text-[#584140] mt-0.5">
                    Tái hiện điển tích Thần Kim Quy giúp Vua An Dương Vương xây thành Cổ Loa, lễ rước kiệu vua sống độc nhất vô nhị.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => onShowToast('Đã thêm nhắc nhở Lễ Hội Đền Sái vào lịch cá nhân!')}
                  className="px-3.5 py-2 rounded-xl bg-[#f1ede6] hover:bg-[#ece8e0] text-xs text-[#1c1c17] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">alarm_on</span>
                  <span>Đặt nhắc nhở</span>
                </button>
                <button
                  onClick={() => onNavigate('ban-do-le-hoi')}
                  className="px-3.5 py-2 rounded-xl bg-[#8e1921] hover:bg-[#6b000f] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">navigation</span>
                  <span>Chỉ đường</span>
                </button>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#e0bfbd]/50">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-[#6b000f] text-white rounded-xl p-3 min-w-[75px] text-center shadow-sm">
                  <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Còn lại</span>
                  <span className="font-serif text-2xl font-bold leading-none my-0.5">27</span>
                  <span className="text-[10px] text-white/80">ngày</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#ffc968] text-[#775300] text-xs font-bold">
                      13 tháng Giêng ÂL
                    </span>
                    <span className="text-[#584140] text-xs">• 10/02/2025 Dương lịch</span>
                    <span className="px-2 py-0.5 rounded bg-[#f1ede6] text-xs text-[#7c5800]">
                      Tiên Du, Bắc Ninh
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#8e1921]">
                    Khai Mạc Ngày Chính Hội Lim Xứ Kinh Bắc
                  </h3>
                  <p className="text-xs text-[#584140] mt-0.5">
                    Các liền anh liền chị trẩy hội hát đối đáp dân ca quan họ tại đồi Lim và chùa Hồng Ân, thưởng thức trầu têm cánh phượng.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => onShowToast('Đã thêm nhắc nhở Hội Lim (13 tháng Giêng) vào lịch cá nhân!')}
                  className="px-3.5 py-2 rounded-xl bg-[#f1ede6] hover:bg-[#ece8e0] text-xs text-[#1c1c17] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">alarm_on</span>
                  <span>Đặt nhắc nhở</span>
                </button>
                <button
                  onClick={() => onNavigate('chi-tiet-le-hoi', { id: 'lim' })}
                  className="px-3.5 py-2 rounded-xl bg-[#8e1921] hover:bg-[#6b000f] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  <span>Cẩm nang hội</span>
                </button>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#e0bfbd]/50">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-[#224e5b] text-white rounded-xl p-3 min-w-[75px] text-center shadow-sm">
                  <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Còn lại</span>
                  <span className="font-serif text-2xl font-bold leading-none my-0.5">29</span>
                  <span className="text-[10px] text-white/80">ngày</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#ffc968] text-[#775300] text-xs font-bold">
                      Rằm Tháng Giêng (15/1 ÂL)
                    </span>
                    <span className="text-[#584140] text-xs">• 12/02/2025 Dương lịch</span>
                    <span className="px-2 py-0.5 rounded bg-[#f1ede6] text-xs text-[#7c5800]">
                      Nam Định
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#8e1921]">
                    Lễ Khai Ấn Đền Trần Nam Định
                  </h3>
                  <p className="text-xs text-[#584140] mt-0.5">
                    Nghi thức phát lộc ấn thiêng liêng lúc nửa đêm, nhắc nhở tinh thần Hào khí Đông A và khuyến khích tu thân lập đức.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => onShowToast('Đã thêm nhắc nhở Lễ Khai Ấn Đền Trần vào lịch cá nhân!')}
                  className="px-3.5 py-2 rounded-xl bg-[#f1ede6] hover:bg-[#ece8e0] text-xs text-[#1c1c17] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">alarm_on</span>
                  <span>Đặt nhắc nhở</span>
                </button>
                <button
                  onClick={() => onNavigate('chi-tiet-le-hoi', { id: 'dentran' })}
                  className="px-3.5 py-2 rounded-xl bg-[#8e1921] hover:bg-[#6b000f] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  <span>Cẩm nang hội</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Geographic Regional Exploration (Three Cultural Belts) */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase text-[#7c5800] font-bold tracking-widest block mb-1">
            Địa Lý & Văn Hóa Tập Quán
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#8e1921] font-bold tracking-tight">
            Khám Phá Sắc Màu Ba Miền
          </h2>
          <p className="text-sm text-[#584140] mt-2">
            Dải đất hình chữ S mang đậm dấu ấn phong tục riêng biệt qua mỗi vùng địa linh nhân kiệt
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Miền Bắc */}
          <div className="bg-[#f1ede6] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-[#e0bfbd]/50">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#023744] text-white text-xs font-bold">
                  Văn Hóa Sông Hồng
                </span>
                <span className="font-serif text-3xl text-[#8e1921] font-bold opacity-30">01</span>
              </div>
              <h3 className="font-serif text-xl text-[#8e1921] font-bold mb-2">
                Miền Bắc: Mùa Xuân & Đình Làng
              </h3>
              <p className="text-xs sm:text-sm text-[#584140] leading-relaxed mb-4">
                Cái nôi văn minh lúa nước sông Hồng với lễ hội rộn ràng sau Tết. Tiếng trống hội làng giòn giã, các làn điệu Quan họ, Chèo, trò chơi kéo co mồi lửa và lễ tưởng nhớ công ơn tiền nhân khai hoang dựng ấp.
              </p>
              <ul className="flex flex-col gap-2 text-xs text-[#1c1c17] mb-6">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Lễ hội Đền Hùng, chùa Hương, Phủ Dầy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Trò diễn tích: Tịch Điền, Đấu vật Liễu Đôi</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Tín ngưỡng Thành Hoàng làng tôn kính</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('kham-pha-le-hoi', { region: 'bac' })}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#f7f3eb] text-[#8e1921] text-xs font-bold text-center transition-colors shadow-sm border border-[#e0bfbd]/50"
            >
              Khám phá Lễ Hội Miền Bắc →
            </button>
          </div>

          {/* Miền Trung */}
          <div className="bg-[#f1ede6] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-[#e0bfbd]/50">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#7c5800] text-white text-xs font-bold">
                  Cố Đô & Biển Đảo
                </span>
                <span className="font-serif text-3xl text-[#7c5800] font-bold opacity-30">02</span>
              </div>
              <h3 className="font-serif text-xl text-[#8e1921] font-bold mb-2">
                Miền Trung: Sóng Biển & Cồng Chiêng
              </h3>
              <p className="text-xs sm:text-sm text-[#584140] leading-relaxed mb-4">
                Miền duyên hải kiên cường với tín ngưỡng Thần Nam Hải (Cá Ông), lễ hội Festival Cố đô Huế trang nhã và không gian rực rỡ sắc màu lễ hội Ka-tê Chăm Pa cùng âm vang Không gian cồng chiêng Tây Nguyên.
              </p>
              <ul className="flex flex-col gap-2 text-xs text-[#1c1c17] mb-6">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Lễ hội Cầu Ngư dọc duyên hải Trung Bộ</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Lễ hội đền Po Nagar & Tháp Chăm Ka-tê</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Lễ tế Giao & Lễ hội Điện Hòn Chén xứ Huế</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('kham-pha-le-hoi', { region: 'trung' })}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#f7f3eb] text-[#8e1921] text-xs font-bold text-center transition-colors shadow-sm border border-[#e0bfbd]/50"
            >
              Khám phá Lễ Hội Miền Trung →
            </button>
          </div>

          {/* Miền Nam */}
          <div className="bg-[#f1ede6] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border border-[#e0bfbd]/50">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#8e1921] text-white text-xs font-bold">
                  Chín Nhánh Phù Sa
                </span>
                <span className="font-serif text-3xl text-[#8e1921] font-bold opacity-30">03</span>
              </div>
              <h3 className="font-serif text-xl text-[#8e1921] font-bold mb-2">
                Miền Nam: Sông Nước & Miếu Bà
              </h3>
              <p className="text-xs sm:text-sm text-[#584140] leading-relaxed mb-4">
                Tính cách Nam Bộ khoáng đạt cởi mở với các lễ hội miếu Bà, ngày giỗ các bậc tiền hiền khai hoang mở cõi và những ngày hội tưng bừng trên dòng sông: Đua ghe Ngo Khmer, Chợ nổi Cái Răng, Lễ Ok Om Bok.
              </p>
              <ul className="flex flex-col gap-2 text-xs text-[#1c1c17] mb-6">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Lễ Vía Bà Chúa Xứ Núi Sam & Điện Bà Tây Ninh</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Lễ Đua Ghe Ngo Sóc Trăng (Lễ Ok Om Bok)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7c5800]">check_circle</span>
                  <span>Lễ Kỳ Yên đình làng Nam Bộ</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('kham-pha-le-hoi', { region: 'nam' })}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#f7f3eb] text-[#8e1921] text-xs font-bold text-center transition-colors shadow-sm border border-[#e0bfbd]/50"
            >
              Khám phá Lễ Hội Miền Nam →
            </button>
          </div>
        </div>
      </section>

      {/* Section 6: Academic Capstone Project Banner (Đồ án D01 - Bùi Trung Nam - PH60600) */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6b000f] via-[#8e1921] to-[#023744] text-white p-6 sm:p-10 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <span className="material-symbols-outlined text-[240px]">history_edu</span>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdea8] text-[#271900] text-xs uppercase font-bold mb-3 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>Đồ Án Tốt Nghiệp Chuyên Ngành Công Nghệ Thông Tin</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight mb-2">
                Đề Tài D01: Lịch Lễ Hội Truyền Thống Theo Âm Lịch
              </h2>
              <p className="text-xs sm:text-sm text-white/90 italic leading-relaxed mb-4 font-serif">
                "Mỗi lễ hội là một câu chuyện văn hóa. Mỗi ngày âm lịch là một dấu ấn truyền thống."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-white/80 pt-2 border-t border-white/20">
                <div><strong className="text-white">Sinh viên thực hiện:</strong> Bùi Trung Nam</div>
                <div><strong className="text-white">Mã số sinh viên:</strong> PH60600</div>
                <div><strong className="text-white">Backend dự kiến:</strong> Java Spring Boot, MySQL, Spring Security</div>
                <div><strong className="text-white">Tên miền hệ thống:</strong> lehoiviet.ai.studio</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() => onNavigate('quan-tri')}
                className="px-6 py-3 rounded-xl bg-[#ffdea8] hover:bg-[#f2be5e] text-[#271900] font-bold text-xs sm:text-sm text-center transition-all shadow-md"
              >
                Truy Cập Quản Trị Hệ Thống
              </button>
              <button
                onClick={() => onNavigate('kham-pha-le-hoi')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm text-center transition-all backdrop-blur-sm border border-white/20"
              >
                Số Hóa Dữ Liệu Di Sản
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
