import React, { useState, useEffect } from 'react';
import { Festival } from '../types';
import { festivalService } from '../services/festivalService';

interface FestivalDetailPageProps {
  festivalId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onShowToast: (msg: string) => void;
}

export const FestivalDetailPage: React.FC<FestivalDetailPageProps> = ({
  festivalId,
  onNavigate,
  onShowToast,
}) => {
  const [festival, setFestival] = useState<Festival | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    festivalService.getFestivalById(festivalId || 'lim').then((data) => {
      if (data) {
        setFestival(data);
        setIsSaved(festivalService.isFavorite(data.id));
      } else {
        // fallback to lim
        festivalService.getFestivalById('lim').then(d => {
          if (d) {
            setFestival(d);
            setIsSaved(festivalService.isFavorite(d.id));
          }
        });
      }
    });
  }, [festivalId]);

  if (!festival) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-3 border-[#8e1921] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-[#584140]">Đang tải hồ sơ di sản...</span>
        </div>
      </div>
    );
  }

  const handleToggleFavorite = async () => {
    const nextState = await festivalService.toggleFavorite(festival.id);
    setIsSaved(nextState);
    onShowToast(nextState ? `Đã lưu "${festival.name}" vào danh sách yêu thích!` : `Đã bỏ lưu "${festival.name}".`);
  };

  const handleSetReminder = () => {
    onShowToast(`Đã đặt thông báo lịch âm: ${festival.lunarDate} (${festival.name})!`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    onShowToast('Đã sao chép liên kết hồ sơ di sản vào khay nhớ tạm!');
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    onShowToast(isPlayingAudio ? 'Đã tạm dừng âm thanh quan họ.' : 'Đang phát diễn xướng điệu: "Người Ở Đừng Về"');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb Bar */}
      <section className="w-full bg-[#f7f3eb] py-2.5 px-4 sm:px-6 border-b border-[#e0bfbd]/40">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-xs sm:text-sm text-[#584140]">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <button onClick={() => onNavigate('trang-chu')} className="hover:text-[#8e1921] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Trang chủ</span>
            </button>
            <span className="text-[#e0bfbd]">/</span>
            <button onClick={() => onNavigate('kham-pha-le-hoi')} className="hover:text-[#8e1921]">
              Khám phá Lễ Hội
            </button>
            <span className="text-[#e0bfbd]">/</span>
            <span className="px-2 py-0.5 rounded-full bg-[#bdeafa]/40 text-[#023744] font-semibold text-xs">
              Miền {festival.region}
            </span>
            <span className="text-[#e0bfbd]">/</span>
            <span className="text-[#8e1921] font-bold">{festival.name}</span>
          </nav>
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7c5800]">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>MÃ DI SẢN: {festival.code}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#6b000f] text-white">
        {/* Visual Backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('${festival.image}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#6b000f] via-[#6b000f]/80 to-transparent"></div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-12 flex flex-col gap-6">
          {/* UNESCO Heritage Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-[#ffdea8]/30">
            <span className="material-symbols-outlined text-[#ffdea8] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span className="text-[11px] text-[#ffdea8] font-bold uppercase tracking-wider">
              {festival.heritageRankLabel}
            </span>
          </div>

          {/* Main Headline & Subtitle */}
          <div className="flex flex-col gap-2 max-w-4xl">
            <span className="text-xs uppercase text-[#ffdea8] tracking-widest font-bold">
              {festival.categoryLabel} • {festival.province}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
              {festival.name} — Tiếng Hát Giao Duyên Vượt Thời Gian
            </h1>
            <p className="text-sm sm:text-base text-white/90 max-w-3xl font-light leading-relaxed">
              {festival.fullDesc}
            </p>
          </div>

          {/* Compact Dual-Calendar & Metadata Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md text-white border border-white/20">
            {/* Date Lunar */}
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-[#ffc968] flex items-center justify-center text-[#775300] shrink-0 font-bold">
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Âm Lịch Hàng Năm</span>
                <span className="text-sm font-bold truncate">{festival.lunarDate}</span>
                <span className="text-[11px] text-white/80">(Chính hội ngày {festival.lunarDay} ÂL)</span>
              </div>
            </div>

            {/* Date Solar 2025 */}
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 font-bold">
                <span className="material-symbols-outlined text-[20px]">event_upcoming</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Dương Lịch Năm 2025</span>
                <span className="text-sm font-bold truncate">{festival.solarDate2025}</span>
                <span className="text-[11px] text-white/80">Năm Ất Tỵ</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 font-bold">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Địa Điểm Tổ Chức</span>
                <span className="text-sm font-bold truncate">{festival.district}</span>
                <span className="text-[11px] text-white/80 truncate">{festival.province}</span>
              </div>
            </div>

            {/* Scope */}
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 font-bold">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Quy Mô & Cấp Độ</span>
                <span className="text-sm font-bold truncate">{festival.heritageRankLabel}</span>
                <span className="text-[11px] text-[#ffdea8] truncate">{festival.attendeesCount || 'Cả nước tụ hội'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleToggleFavorite}
              className="h-11 px-5 rounded-xl bg-[#ffc968] hover:bg-[#f2be5e] text-[#775300] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
              <span>{isSaved ? 'Đã Lưu Vào Yêu Thích' : 'Thêm vào Yêu thích'}</span>
            </button>

            <button
              onClick={handleSetReminder}
              className="h-11 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 backdrop-blur-sm transition-all border border-white/20"
            >
              <span className="material-symbols-outlined text-[18px]">alarm_on</span>
              <span>Đặt nhắc lịch âm</span>
            </button>

            <button
              onClick={handleShare}
              className="h-11 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 backdrop-blur-sm transition-all border border-white/20"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Chia sẻ di sản</span>
            </button>

            <button
              onClick={() => onNavigate('ban-do-le-hoi')}
              className="h-11 px-4 rounded-xl bg-[#bdeafa] text-[#001f27] font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-[#a2cddd] shadow-sm transition-all sm:ml-auto"
            >
              <span className="material-symbols-outlined text-[18px]">near_me</span>
              <span>Xem trên Bản đồ Lễ hội</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout (70% Primary Column - 30% Utility Sidebar) */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN ARTICLE COLUMN (8 cols) */}
          <article className="lg:col-span-8 flex flex-col gap-10">
            {/* Tab Quick Jump Bar */}
            <nav className="sticky top-20 z-30 bg-[#f1ede6]/95 backdrop-blur-md p-1.5 rounded-2xl shadow-sm flex items-center gap-1 overflow-x-auto text-xs font-semibold text-[#584140] border border-[#e0bfbd]/40">
              <a href="#nguon-goc" className="px-3 py-2 rounded-xl hover:bg-white hover:text-[#8e1921] transition-colors whitespace-nowrap">
                Nguồn gốc & Lịch sử
              </a>
              <a href="#thoi-diem-am-lich" className="px-3 py-2 rounded-xl hover:bg-white hover:text-[#8e1921] transition-colors whitespace-nowrap">
                Ý nghĩa Âm lịch
              </a>
              <a href="#nghi-le" className="px-3 py-2 rounded-xl hover:bg-white hover:text-[#8e1921] transition-colors whitespace-nowrap">
                Nghi lễ tế rước
              </a>
              <a href="#tro-choi-quan-ho" className="px-3 py-2 rounded-xl hover:bg-white hover:text-[#8e1921] transition-colors whitespace-nowrap">
                Hát đối & Hội thi
              </a>
              <a href="#tu-lieu-am-thanh" className="px-3 py-2 rounded-xl hover:bg-white hover:text-[#8e1921] transition-colors whitespace-nowrap">
                Tư liệu & Âm nhạc
              </a>
              <a href="#cam-nang-du-khach" className="px-3 py-2 rounded-xl hover:bg-white hover:text-[#8e1921] transition-colors whitespace-nowrap">
                Cẩm nang
              </a>
            </nav>

            {/* SECTION 1: Nguồn Gốc & Lịch Sử */}
            <section id="nguon-goc" className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#8e1921] rounded-full"></span>
                <span className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                  Mục 01 / Cội Nguồn Di Sản
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#8e1921] font-bold">
                1. Nguồn Gốc & Lịch Sử Hình Thành {festival.name}
              </h2>
              <div className="bg-[#f7f3eb] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col gap-4 text-[#1c1c17] text-sm sm:text-base border border-[#e0bfbd]/40">
                <p className="leading-relaxed">
                  {festival.history}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                  <div className="bg-white p-4 rounded-xl shadow-xs flex items-start gap-3 border border-[#e0bfbd]/40">
                    <span className="material-symbols-outlined text-[#8e1921] text-[28px] shrink-0">history_edu</span>
                    <div>
                      <span className="font-serif font-bold text-sm text-[#8e1921] block">Cột mốc Lịch sử Cổ truyền</span>
                      <span className="text-xs text-[#584140]">Gắn bó với văn hóa đình chùa, hương ước làng xã truyền đời của tổ tiên người Việt.</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-xs flex items-start gap-3 border border-[#e0bfbd]/40">
                    <span className="material-symbols-outlined text-[#7c5800] text-[28px] shrink-0">award_star</span>
                    <div>
                      <span className="font-serif font-bold text-sm text-[#7c5800] block">Giá trị Tinh thần Bất diệt</span>
                      <span className="text-xs text-[#584140]">Nơi hội tụ tinh hoa tri thức dân gian, nghệ thuật ca xướng và tinh thần cố kết cộng đồng.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Phân Tích Lịch Âm & Chu Kỳ Trăng */}
            <section id="thoi-diem-am-lich" className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#7c5800] rounded-full"></span>
                <span className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                  Mục 02 / Thiên Văn & Âm Lịch Học
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#8e1921] font-bold">
                2. Không Gian & Thời Điểm Tổ Chức Theo Lịch Âm
              </h2>
              <div className="bg-[#ece8e0] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-[#e0bfbd]/40">
                <div className="flex flex-col md:flex-row gap-5 items-center">
                  <div className="w-full md:w-48 h-44 bg-[#6b000f] text-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-inner shrink-0">
                    <span className="material-symbols-outlined text-[44px] text-[#ffdea8]">nightlight_round</span>
                    <span className="font-serif text-2xl font-bold text-[#ffdea8] mt-1">{festival.lunarDay} Tháng {festival.lunarMonth}</span>
                    <span className="text-xs text-white/80">{festival.lunarDate}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#8e1921]">
                      Ý nghĩa thiên văn của thời điểm mở hội theo lịch trăng
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1c1c17] leading-relaxed">
                      {festival.lunarMeaning}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: Nghi Lễ Truyền Thống */}
            <section id="nghi-le" className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#8e1921] rounded-full"></span>
                <span className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                  Mục 03 / Tín Ngưỡng Dân Tộc
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#8e1921] font-bold">
                3. Quy Trình Nghi Lễ Truyền Thống
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {festival.rituals.map((ritual, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#f7f3eb] shadow-xs flex flex-col gap-2 border border-[#e0bfbd]/40">
                    <div className="flex items-center gap-2 text-[#8e1921] font-serif font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-[#8e1921] text-white flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <span>Nghi thức số {idx + 1}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#584140] leading-relaxed">
                      {ritual}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: Hoạt Động Hội & Trò Chơi Dân Gian */}
            <section id="tro-choi-quan-ho" className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#8e1921] rounded-full"></span>
                <span className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                  Mục 04 / Phần Hội & Diễn Xướng
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#8e1921] font-bold">
                4. Hoạt Động Hội & Trò Chơi Dân Gian Đặc Sắc
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {festival.games.map((game, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white shadow-xs border border-[#e0bfbd]/40 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#7c5800] text-[24px]">sports_kabaddi</span>
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-sm text-[#8e1921]">{game}</span>
                      <span className="text-xs text-[#584140] mt-0.5">Sôi nổi không khí thi đấu và giao duyên truyền đời.</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: Tư Liệu Âm Thanh & Lời Ca Cổ */}
            {festival.songs && festival.songs.length > 0 && (
              <section id="tu-lieu-am-thanh" className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-1 bg-[#8e1921] rounded-full"></span>
                  <span className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                    Mục 05 / Thính Giác & Ca Từ
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#8e1921] font-bold">
                  5. Bộ Sưu Tập Âm Thanh & Lời Ca Mẫu Mực
                </h2>
                <div className="bg-[#f1ede6] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-[#e0bfbd]/40">
                  {festival.songs.map((song, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#e0bfbd]/40">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handleToggleAudio}
                          className="w-12 h-12 rounded-full bg-[#8e1921] text-white flex items-center justify-center shadow-md hover:bg-[#6b000f] transition-all shrink-0"
                          title={isPlayingAudio ? 'Tạm dừng' : 'Nghe diễn xướng'}
                        >
                          <span className="material-symbols-outlined text-[26px]">
                            {isPlayingAudio ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                        <div className="flex flex-col">
                          <span className="font-serif font-bold text-sm sm:text-base text-[#1c1c17]">{song.title}</span>
                          <span className="text-xs text-[#584140]">{song.subtitle}</span>
                          <p className="text-xs italic text-[#8e1921] mt-1 font-serif">"{song.verse}"</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#7c5800] bg-[#f7f3eb] px-2.5 py-1 rounded-full shrink-0">
                        {song.duration || '04:12'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 6: Cẩm Nang Cho Du Khách */}
            {festival.tips && (
              <section id="cam-nang-du-khach" className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-1 bg-[#7c5800] rounded-full"></span>
                  <span className="text-[11px] uppercase text-[#7c5800] font-bold tracking-wider">
                    Mục 06 / Văn Hóa Thưởng Thức
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#8e1921] font-bold">
                  6. Lưu Ý & Cẩm Nang Cho Khách Hành Hương
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#f7f3eb] border border-[#e0bfbd]/40 flex flex-col gap-3">
                    <span className="font-serif font-bold text-sm text-[#8e1921] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                      Nếp Ứng Xử Thanh Lịch
                    </span>
                    <ul className="flex flex-col gap-2 text-xs text-[#584140]">
                      {festival.tips.behavior.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#7c5800] mt-0.5">check</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#f7f3eb] border border-[#e0bfbd]/40 flex flex-col gap-3">
                    <span className="font-serif font-bold text-sm text-[#7c5800] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">bakery_dining</span>
                      Đặc Sản Không Thể Bỏ Lỡ
                    </span>
                    <ul className="flex flex-col gap-2 text-xs text-[#584140]">
                      {festival.tips.food.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#8e1921] mt-0.5">restaurant</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </article>

          {/* UTILITY SIDEBAR (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Countdown Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f1ede6] shadow-md flex flex-col gap-4 border border-[#e0bfbd]/40">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#8e1921] tracking-wider">Hệ Thống Lịch Vạn Niên</span>
                <span className="px-2 py-0.5 rounded-full bg-[#7c5800] text-white text-[10px] font-bold">Ất Tỵ 2025</span>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-inner flex flex-col items-center text-center border border-[#e0bfbd]/40">
                <span className="text-[11px] text-[#584140] uppercase font-bold">Chính Hội Mùa Xuân 2025</span>
                <div className="font-serif text-3xl font-bold text-[#8e1921] my-1">
                  {festival.lunarDay} / {festival.lunarMonth < 10 ? `0${festival.lunarMonth}` : festival.lunarMonth}
                </div>
                <span className="text-xs font-semibold text-[#7c5800]">Tháng {festival.lunarMonth === 1 ? 'Giêng' : festival.lunarMonth} (Âm Lịch)</span>
                <div className="w-full h-[1px] bg-[#ece8e0] my-2"></div>
                <div className="flex items-center justify-between w-full text-xs text-[#584140]">
                  <span>Dương lịch tương ứng:</span>
                  <span className="font-bold text-[#1c1c17]">{festival.solarDate2025.split(' ')[0]}</span>
                </div>
              </div>

              {/* Countdown Pill */}
              <div className="p-4 bg-[#6b000f] text-white rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffdea8] text-[24px]">hourglass_top</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#ffdea8] font-bold">Thời Gian Còn Lại</span>
                    <span className="font-serif text-base font-bold">Còn {festival.daysLeft || 27} Ngày Nữa</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-white/20 font-bold">Đến khai hội</span>
              </div>
            </div>

            {/* Location & Navigation */}
            <div className="p-5 rounded-2xl bg-[#f7f3eb] shadow-sm flex flex-col gap-4 border border-[#e0bfbd]/40">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#8e1921] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">explore</span>
                  Vị Trí & Tọa Độ Địa Lý
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#e0bfbd]/40 text-xs flex flex-col gap-1.5">
                <span className="font-bold text-[#1c1c17]">{festival.location}</span>
                <span className="text-[#584140]">Tọa độ: {festival.coordinates.lat}° B, {festival.coordinates.lng}° Đ</span>
              </div>
              <button
                onClick={() => onNavigate('ban-do-le-hoi')}
                className="w-full py-2.5 rounded-xl bg-[#8e1921] text-white text-xs font-bold text-center hover:bg-[#6b000f] transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Xem trên Bản Đồ Lễ Hội</span>
                <span className="material-symbols-outlined text-[16px]">navigation</span>
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
