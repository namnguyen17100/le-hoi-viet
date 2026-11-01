import React, { useState } from 'react';
import { Festival } from '../types';
import { INITIAL_FESTIVALS } from '../services/mockData';

interface FestivalMapPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onShowToast: (msg: string) => void;
}

export const FestivalMapPage: React.FC<FestivalMapPageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedRank, setSelectedRank] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMarker, setActiveMarker] = useState<Festival | null>(INITIAL_FESTIVALS[0]);
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredFestivals = INITIAL_FESTIVALS.filter(f => {
    if (selectedRegion !== 'all' && f.regionKey !== selectedRegion) return false;
    if (selectedMonth !== 'all' && f.lunarMonth !== Number(selectedMonth)) return false;
    if (selectedRank !== 'all' && f.category !== selectedRank) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return f.name.toLowerCase().includes(q) || f.province.toLowerCase().includes(q) || f.location.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSelectMarker = (fest: Festival) => {
    setActiveMarker(fest);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner & Decorative Arch */}
      <section className="relative px-4 sm:px-6 pt-4 pb-6 max-w-[1280px] mx-auto w-full">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#584140] mb-3">
          <button onClick={() => onNavigate('trang-chu')} className="hover:text-[#8e1921] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Trang chủ</span>
          </button>
          <span className="material-symbols-outlined text-[13px] text-[#8c716f]">chevron_right</span>
          <span className="text-[#8e1921] font-semibold">Bản đồ Lễ Hội</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4">
          <div className="space-y-1 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ffdea8] text-[#271900] text-[10px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">explore</span>
              HỆ THỐNG ĐỊA LÝ DI SẢN PHI VẬT THỂ QUỐC GIA
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-[#8e1921] font-bold tracking-tight">
              Bản Đồ Di Sản & Không Gian Lễ Hội Dân Tộc
            </h1>
            <p className="text-xs sm:text-sm text-[#584140] leading-relaxed">
              Tra cứu không gian văn hóa, định vị phân bổ 8.000+ lễ hội truyền thống khắp 63 tỉnh thành Việt Nam theo trục tọa độ địa lý kết hợp chu kỳ lịch trăng (Âm lịch).
            </p>
          </div>

          {/* Academic Metadata Badge */}
          <div className="bg-[#f1ede6] p-3 rounded-2xl flex items-center gap-3 shadow-sm shrink-0 border border-[#e0bfbd]/40">
            <div className="w-10 h-10 rounded-xl bg-[#8e1921] text-white flex items-center justify-center font-serif text-base font-bold shadow-sm">
              D01
            </div>
            <div className="flex flex-col text-xs text-[#584140]">
              <span className="font-semibold text-[#8e1921]">Đồ án Tốt nghiệp CNTT</span>
              <span>SV: Bùi Trung Nam • PH60600</span>
            </div>
          </div>
        </div>

        {/* Quick Filter Control Bar */}
        <div className="bg-[#f7f3eb] rounded-2xl p-4 shadow-sm space-y-3 border border-[#e0bfbd]/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#584140] font-semibold mr-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#7c5800]">filter_alt</span> Vùng miền:
              </span>
              {[
                { key: 'all', label: 'Toàn quốc (63 tỉnh)' },
                { key: 'bac', label: 'Miền Bắc' },
                { key: 'trung', label: 'Miền Trung' },
                { key: 'nam', label: 'Miền Nam' },
              ].map(r => (
                <button
                  key={r.key}
                  onClick={() => setSelectedRegion(r.key)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                    selectedRegion === r.key
                      ? 'bg-[#8e1921] text-white shadow-xs'
                      : 'bg-[#f1ede6] text-[#584140] hover:bg-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto text-xs">
              {/* Lunar Month Select */}
              <div className="relative flex-1 md:w-48">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full appearance-none bg-white pl-3 pr-8 py-2 rounded-xl text-[#1c1c17] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8e1921]/20 border border-[#e0bfbd]/50"
                >
                  <option value="all">Mọi thời điểm Âm lịch</option>
                  <option value="1">Tháng Giêng (Khai Xuân)</option>
                  <option value="2">Tháng Hai (Hạ Điền)</option>
                  <option value="3">Tháng Ba (Giỗ Tổ)</option>
                  <option value="4">Tháng Tư (Hội Gióng)</option>
                  <option value="10">Tháng Mười (Ghe Ngo)</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-2.5 text-[#584140] text-[16px]">
                  calendar_month
                </span>
              </div>

              {/* Heritage Rank Select */}
              <div className="relative flex-1 md:w-52">
                <select
                  value={selectedRank}
                  onChange={(e) => setSelectedRank(e.target.value)}
                  className="w-full appearance-none bg-white pl-3 pr-8 py-2 rounded-xl text-[#1c1c17] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8e1921]/20 border border-[#e0bfbd]/50"
                >
                  <option value="all">Tất cả cấp bậc di sản</option>
                  <option value="unesco">Di sản UNESCO vinh danh</option>
                  <option value="denchua">Hội Đền Chùa Cổ Tự</option>
                  <option value="songnuoc">Lễ hội Sông nước & Biển</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-2.5 text-[#584140] text-[16px]">
                  verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Workspace: Split Layout */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Search & Festival Directory Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-4 flex flex-col h-[750px]">
            {/* Search Header */}
            <div className="bg-[#f1ede6] rounded-2xl p-4 shadow-sm space-y-2 border border-[#e0bfbd]/40">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#7c5800] text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tỉnh thành, tên lễ hội..."
                  className="w-full bg-white pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm text-[#1c1c17] placeholder:text-[#8c716f] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8e1921]/20 border border-[#e0bfbd]/40"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#584140] pt-1">
                <span>Hiển thị <strong className="text-[#8e1921]">{filteredFestivals.length}</strong> điểm di sản</span>
                <span className="flex items-center gap-1 text-[#7c5800] font-semibold text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                  Dữ liệu số hóa 2025
                </span>
              </div>
            </div>

            {/* Festival Scrollable List */}
            <div className="overflow-y-auto space-y-3 pr-1 flex-1">
              {filteredFestivals.map((fest) => {
                const isFocused = activeMarker?.id === fest.id;
                return (
                  <article
                    key={fest.id}
                    onClick={() => handleSelectMarker(fest)}
                    className={`cursor-pointer p-3.5 rounded-2xl transition-all shadow-xs group border ${
                      isFocused
                        ? 'bg-white border-[#8e1921] ring-2 ring-[#8e1921]/20'
                        : 'bg-[#f7f3eb] border-[#e0bfbd]/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      <div className="relative w-18 h-18 rounded-xl overflow-hidden shrink-0 shadow-xs">
                        <img
                          src={fest.image}
                          alt={fest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-1 left-1 bg-[#8e1921] text-white text-[9px] font-bold px-1 py-0.5 rounded">
                          {fest.region}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="font-serif font-bold text-sm text-[#8e1921] truncate group-hover:text-[#6b000f]">
                            {fest.name}
                          </h3>
                          <span className="text-[10px] text-[#7c5800] font-bold shrink-0">
                            {fest.lunarDay}/{fest.lunarMonth} ÂL
                          </span>
                        </div>
                        <p className="text-xs text-[#584140] flex items-center gap-1 mt-0.5 truncate">
                          <span className="material-symbols-outlined text-[14px] text-[#8c716f]">location_on</span>
                          {fest.province}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#e0bfbd]/30">
                          <span className="text-[10px] text-[#023744] bg-[#bdeafa]/40 px-2 py-0.5 rounded-full font-semibold">
                            {fest.categoryLabel}
                          </span>
                          <span className="text-xs text-[#8e1921] font-bold flex items-center gap-0.5 group-hover:underline">
                            Định vị <span className="material-symbols-outlined text-[14px]">near_me</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Heritage Map Canvas (8 Cols) */}
          <div className="lg:col-span-8 relative bg-[#FAF6EE] rounded-3xl shadow-md h-[750px] overflow-hidden flex flex-col justify-between border border-[#e0bfbd]/50">
            {/* Compass Tools & Top Bar */}
            <div className="relative z-20 p-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl shadow-xs border border-[#e0bfbd]/40">
                <span className="material-symbols-outlined text-[18px] text-[#8e1921]">public</span>
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-bold text-[#8e1921]">Tọa độ Di sản Lễ hội Quốc gia</span>
                  <span className="text-[#584140] text-[10px]">Kinh độ 102°08'Đ - 109°28'Đ • Vĩ độ 8°27'B - 23°23'B</span>
                </div>
              </div>

              {/* Control Pill */}
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow-xs border border-[#e0bfbd]/40">
                <button
                  onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
                  className="w-8 h-8 rounded-lg hover:bg-[#f1ede6] flex items-center justify-center text-[#1c1c17]"
                  title="Phóng to"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.1))}
                  className="w-8 h-8 rounded-lg hover:bg-[#f1ede6] flex items-center justify-center text-[#1c1c17]"
                  title="Thu nhỏ"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <div className="w-[1px] h-4 bg-[#e0bfbd]/60 mx-1"></div>
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setActiveMarker(INITIAL_FESTIVALS[0]);
                    onShowToast('Đã đặt lại góc nhìn bản đồ toàn cảnh Việt Nam');
                  }}
                  className="w-8 h-8 rounded-lg hover:bg-[#f1ede6] flex items-center justify-center text-[#8e1921]"
                  title="Đặt lại góc nhìn"
                >
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                </button>
              </div>
            </div>

            {/* Simulated S-Shaped Cultural Map of Vietnam */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <div
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease-out' }}
                className="w-full h-full flex items-center justify-center"
              >
                <svg className="w-full h-full max-h-[700px] select-none" fill="none" viewBox="0 0 700 780" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dongsonPattern" patternUnits="userSpaceOnUse" width="120" height="120" x="0" y="0">
                      <circle cx="60" cy="60" r="50" stroke="#d4a346" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.18"></circle>
                      <circle cx="60" cy="60" r="35" stroke="#d4a346" strokeWidth="0.5" opacity="0.15"></circle>
                      <circle cx="60" cy="60" r="18" stroke="#8e1921" strokeWidth="0.75" opacity="0.1"></circle>
                    </pattern>
                  </defs>

                  <rect width="700" height="780" fill="url(#dongsonPattern)"></rect>

                  {/* Gulf of Tonkin & East Sea Callout Texts */}
                  <text x="510" y="240" fill="#584140" fontFamily="'Playfair Display', serif" fontSize="14" fontStyle="italic" letterSpacing="3" opacity="0.4">
                    VỊNH BẮC BỘ
                  </text>
                  <text x="470" y="470" fill="#584140" fontFamily="'Playfair Display', serif" fontSize="18" fontWeight="700" letterSpacing="6" opacity="0.5">
                    BIỂN ĐÔNG
                  </text>
                  <text x="470" y="495" fill="#7c5800" fontFamily="'Be Vietnam Pro', sans-serif" fontSize="10" fontWeight="600" letterSpacing="1" opacity="0.7">
                    CHỦ QUYỀN THIÊNG LIÊNG VIỆT NAM
                  </text>

                  {/* Paracel Islands (Hoàng Sa) & Spratly Islands (Trường Sa) */}
                  <g className="cursor-pointer" onClick={() => onShowToast('Quần đảo Hoàng Sa - TP. Đà Nẵng, Việt Nam')}>
                    <rect x="525" y="340" width="130" height="48" rx="8" fill="#FDFBF7" stroke="#e0bfbd" strokeWidth="1" opacity="0.95"></rect>
                    <circle cx="538" cy="358" r="4" fill="#8e1921"></circle>
                    <circle cx="548" cy="353" r="2.5" fill="#d4a346"></circle>
                    <circle cx="556" cy="363" r="3" fill="#d4a346"></circle>
                    <text x="568" y="358" fill="#6b000f" fontFamily="'Be Vietnam Pro', sans-serif" fontSize="11" fontWeight="700">QUẦN ĐẢO HOÀNG SA</text>
                    <text x="568" y="372" fill="#584140" fontFamily="'Be Vietnam Pro', sans-serif" fontSize="9">(TP. Đà Nẵng, Việt Nam)</text>
                  </g>

                  <g className="cursor-pointer" onClick={() => onShowToast('Quần đảo Trường Sa - Tỉnh Khánh Hòa, Việt Nam')}>
                    <rect x="490" y="580" width="140" height="48" rx="8" fill="#FDFBF7" stroke="#e0bfbd" strokeWidth="1" opacity="0.95"></rect>
                    <circle cx="505" cy="598" r="4" fill="#8e1921"></circle>
                    <circle cx="516" cy="604" r="3" fill="#d4a346"></circle>
                    <circle cx="524" cy="593" r="2" fill="#d4a346"></circle>
                    <text x="536" y="598" fill="#6b000f" fontFamily="'Be Vietnam Pro', sans-serif" fontSize="11" fontWeight="700">QUẦN ĐẢO TRƯỜNG SA</text>
                    <text x="536" y="612" fill="#584140" fontFamily="'Be Vietnam Pro', sans-serif" fontSize="9">(Tỉnh Khánh Hòa, Việt Nam)</text>
                  </g>

                  {/* Stylized S-Shaped Continental Map of Vietnam */}
                  <path
                    d="M 235 60
                       C 260 55, 330 65, 360 85
                       C 385 102, 380 135, 350 155
                       C 320 175, 305 185, 305 205
                       C 305 225, 340 250, 365 295
                       C 385 330, 400 375, 410 420
                       C 420 460, 425 490, 400 525
                       C 380 550, 340 575, 320 600
                       C 295 630, 260 670, 235 675
                       C 215 680, 205 660, 210 645
                       C 218 625, 250 610, 260 580
                       C 275 540, 280 500, 265 470
                       C 245 435, 230 380, 235 340
                       C 240 300, 220 260, 205 220
                       C 195 190, 185 160, 195 130
                       C 205 100, 215 70, 235 60 Z"
                    fill="#F2EDE2"
                    stroke="#D8CEBD"
                    strokeWidth="1.8"
                  ></path>

                  {/* Major Rivers */}
                  <path d="M 245 80 Q 285 110 315 130" opacity="0.25" stroke="#023744" strokeWidth="1.5"></path>
                  <path d="M 235 620 Q 270 635 310 640" opacity="0.25" stroke="#023744" strokeWidth="1.5"></path>

                  {/* INTERACTIVE PINS */}
                  {INITIAL_FESTIVALS.map((fest) => {
                    const isSelected = activeMarker?.id === fest.id;
                    const pinColor = fest.category === 'songnuoc' ? '#023744' : fest.heritageRank === 'UNESCO' ? '#8e1921' : '#7c5800';

                    return (
                      <g
                        key={fest.id}
                        onClick={() => handleSelectMarker(fest)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <circle cx={fest.coordinates.x} cy={fest.coordinates.y} r={isSelected ? 18 : 12} fill={pinColor} fillOpacity="0.2"></circle>
                        <circle cx={fest.coordinates.x} cy={fest.coordinates.y} r={isSelected ? 9 : 7} fill={pinColor}></circle>
                        <circle cx={fest.coordinates.x} cy={fest.coordinates.y} r="3" fill="#fdf9f1"></circle>
                        <text
                          x={fest.coordinates.x + 12}
                          y={fest.coordinates.y - 2}
                          fill={pinColor}
                          fontFamily="'Be Vietnam Pro', sans-serif"
                          fontSize="11"
                          fontWeight="700"
                        >
                          {fest.province}
                        </text>
                        <text
                          x={fest.coordinates.x + 12}
                          y={fest.coordinates.y + 11}
                          fill="#584140"
                          fontFamily="'Be Vietnam Pro', sans-serif"
                          fontSize="9"
                        >
                          {fest.name.split(' - ')[0].slice(0, 15)} ({fest.lunarDay}/{fest.lunarMonth})
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Floating Popup Drawer when marker selected */}
              {activeMarker && (
                <div className="absolute z-30 w-80 bg-white rounded-2xl shadow-2xl p-4 top-16 right-6 border border-[#e0bfbd]/60 animate-in fade-in zoom-in-95">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8e1921] text-white">
                      {activeMarker.heritageRankLabel}
                    </span>
                    <button
                      onClick={() => setActiveMarker(null)}
                      className="text-[#584140] hover:text-[#8e1921] p-0.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#8e1921] mb-1">
                    {activeMarker.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#7c5800] font-semibold mb-2">
                    <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                    <span>{activeMarker.lunarDate}</span>
                  </div>
                  <p className="text-xs text-[#584140] line-clamp-3 mb-3 leading-relaxed">
                    {activeMarker.shortDesc}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onShowToast(`Đang mở lộ trình chỉ đường tới: ${activeMarker.location}`)}
                      className="flex-1 py-1.5 px-3 bg-[#8e1921] text-white text-xs font-semibold rounded-lg hover:bg-[#6b000f] transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">navigation</span>
                      Chỉ đường
                    </button>
                    <button
                      onClick={() => onNavigate('chi-tiet-le-hoi', { id: activeMarker.id })}
                      className="py-1.5 px-3 bg-[#f1ede6] text-[#1c1c17] text-xs font-semibold rounded-lg hover:bg-[#ece8e0] transition-colors border border-[#e0bfbd]/50"
                    >
                      Xem lễ hội
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Cartographic Legend */}
            <div className="relative z-20 p-4 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-[#FAF6EE] via-[#FAF6EE]/90 to-transparent">
              <div className="flex flex-wrap items-center gap-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-xs text-xs text-[#584140] border border-[#e0bfbd]/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#8e1921]"></span>
                  <span>Đại Lễ / UNESCO</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#7c5800]"></span>
                  <span>Di sản Tín ngưỡng / Cổ Tự</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#023744]"></span>
                  <span>Lễ hội Sông nước / Biển đảo</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl shadow-xs border border-[#e0bfbd]/40 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#ffdea8] flex items-center justify-center text-[#8e1921] font-bold">
                  <span className="material-symbols-outlined text-[16px]">explore</span>
                </div>
                <div className="flex flex-col text-[11px] leading-tight">
                  <span className="font-bold text-[#8e1921]">Phương Hướng Du Xuân</span>
                  <span className="text-[#584140] text-[9px]">Chính Bắc: Thăng Long • Chính Nam: Gia Định</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spring Festival Density Insights & Travel Heritage Route */}
      <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-[1px] flex-1 bg-[#e0bfbd]/40"></div>
          <div className="flex items-center gap-2 text-[#7c5800]">
            <span className="material-symbols-outlined text-[18px]">filter_vintage</span>
            <span className="text-xs uppercase tracking-widest text-[#8e1921] font-bold">
              Cẩm Nang Lộ Trình Văn Hóa
            </span>
            <span className="material-symbols-outlined text-[18px]">filter_vintage</span>
          </div>
          <div className="h-[1px] flex-1 bg-[#e0bfbd]/40"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Top 5 Highest Density Festival Provinces */}
          <div className="lg:col-span-5 bg-[#f1ede6] rounded-2xl p-6 shadow-sm flex flex-col justify-between border border-[#e0bfbd]/40">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif text-xl text-[#8e1921] font-bold">
                  Mật Độ Lễ Hội Mùa Xuân
                </h2>
                <span className="text-[10px] uppercase font-bold text-[#7c5800] bg-[#ffdea8] px-2 py-0.5 rounded-full">
                  TOP 5 TỈNH THÀNH
                </span>
              </div>
              <p className="text-xs text-[#584140] mb-4">
                Số lượng hội làng truyền thống diễn ra tập trung nhất trong 3 tháng đầu xuân theo thống kê của Viện Văn hóa Dân gian.
              </p>

              <div className="space-y-3 text-xs">
                {[
                  { name: '1. TP. Hà Nội (Thăng Long - Xứ Đoài)', count: '1.095 lễ hội', percent: '100%', color: 'bg-[#8e1921]' },
                  { name: '2. Bắc Ninh (Vùng Kinh Bắc Cổ)', count: '547 lễ hội', percent: '65%', color: 'bg-[#6b000f]' },
                  { name: '3. Phú Thọ (Đất Tổ Cội Nguồn)', count: '425 lễ hội', percent: '52%', color: 'bg-[#7c5800]' },
                  { name: '4. Nam Định (Xứ Sơn Nam Hạ - Đền Trần)', count: '386 lễ hội', percent: '46%', color: 'bg-[#f2be5e]' },
                  { name: '5. Thừa Thiên Huế (Cố Đô Di Sản)', count: '280 lễ hội', percent: '35%', color: 'bg-[#224e5b]' },
                ].map((p, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#1c1c17]">{p.name}</span>
                      <span className="font-bold text-[#8e1921]">{p.count}</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
                      <div className={`${p.color} h-2 rounded-full`} style={{ width: p.percent }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 bg-white p-3 rounded-xl flex items-center justify-between border border-[#e0bfbd]/40 text-xs">
              <span className="text-[#584140]">Tổng số lễ hội cả nước: <strong className="text-[#8e1921]">7.965</strong> sự kiện</span>
              <button onClick={() => onNavigate('van-hoa-viet')} className="text-[#8e1921] font-bold hover:underline">
                Chi tiết báo cáo →
              </button>
            </div>
          </div>

          {/* Recommended Heritage Itinerary Route */}
          <div className="lg:col-span-7 bg-[#f7f3eb] rounded-2xl p-6 shadow-sm flex flex-col justify-between border border-[#e0bfbd]/40">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8e1921] tracking-wider block">
                    Hành Trình Du Xuân Di Sản
                  </span>
                  <h2 className="font-serif text-xl text-[#1c1c17] font-bold mt-0.5">
                    Cung Đường Hành Hương Đầu Năm: "Về Miền Di Sản"
                  </h2>
                </div>
                <span className="px-3 py-1 bg-[#ffdea8] text-[#271900] text-xs font-bold rounded-full">
                  3 Ngày 2 Đêm
                </span>
              </div>
              <p className="text-xs text-[#584140] mb-4">
                Lộ trình kết nối các điểm di sản tiêu biểu theo chuỗi thời gian lễ hội từ Rằm tháng Giêng đến Giỗ Tổ tháng Ba:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-3.5 shadow-xs flex flex-col gap-1 border border-[#e0bfbd]/40">
                  <span className="w-6 h-6 rounded-full bg-[#8e1921] text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#8e1921]">Thăng Long - Hội Lim</h4>
                  <p className="text-[11px] text-[#7c5800] font-semibold">Mùng 6 - 13 Giêng</p>
                  <p className="text-xs text-[#584140] mt-0.5">Trẩy hội Chùa Hương, viếng Đền Ngọc Sơn và nghe canh hát Quan họ đồi Lim.</p>
                </div>

                <div className="bg-white rounded-xl p-3.5 shadow-xs flex flex-col gap-1 border border-[#e0bfbd]/40">
                  <span className="w-6 h-6 rounded-full bg-[#7c5800] text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#8e1921]">Khai Ấn Đền Trần</h4>
                  <p className="text-[11px] text-[#7c5800] font-semibold">14 - 15 Tháng Giêng</p>
                  <p className="text-xs text-[#584140] mt-0.5">Lễ rước nước tế cá, lễ dâng hương và phát ấn cầu lộc đầu năm tại Tức Mặc, Nam Định.</p>
                </div>

                <div className="bg-white rounded-xl p-3.5 shadow-xs flex flex-col gap-1 border border-[#e0bfbd]/40">
                  <span className="w-6 h-6 rounded-full bg-[#023744] text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#8e1921]">Núi Hùng Cội Nguồn</h4>
                  <p className="text-[11px] text-[#7c5800] font-semibold">Mùng 10 Tháng 3 ÂL</p>
                  <p className="text-xs text-[#584140] mt-0.5">Hành hương dâng bánh chưng, bánh giầy tạ ơn các vua Hùng dựng nước tại Phú Thọ.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#e0bfbd]/40">
              <span className="text-[#584140]">Khoảng cách toàn lộ trình: <strong className="text-[#1c1c17]">~235 km</strong> • Thuận tiện cao tốc Bắc - Nam</span>
              <button
                onClick={() => onShowToast('Đã tải sơ đồ hành trình du xuân di sản (PDF)!')}
                className="px-4 py-2 rounded-xl bg-[#8e1921] text-white font-bold hover:bg-[#6b000f] transition-all flex items-center gap-1 shadow-sm"
              >
                <span>Tải sơ đồ hành trình</span>
                <span className="material-symbols-outlined text-[16px]">download</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
