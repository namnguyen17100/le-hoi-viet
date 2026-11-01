import React, { useState, useEffect } from 'react';
import { DayInfo, Festival } from '../types';
import { lunarService } from '../services/lunarService';
import { festivalService } from '../services/festivalService';

interface LunarCalendarPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onShowToast: (msg: string) => void;
}

export const LunarCalendarPage: React.FC<LunarCalendarPageProps> = ({ onNavigate, onShowToast }) => {
  const [days, setDays] = useState<DayInfo[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'national' | 'north' | 'central_south' | 'moon'>('all');
  const [tableSearch, setTableSearch] = useState('');
  const [viewMode, setViewMode] = useState<'solar' | 'lunar'>('solar');

  useEffect(() => {
    lunarService.getFebruary2025Matrix().then((matrix) => {
      setDays(matrix);
      // Default to 10 Feb (13/1 ÂL - Hoi Lim)
      const defaultDay = matrix.find(d => d.solarDay === 10 && d.solarMonth === 2);
      setSelectedDay(defaultDay || matrix[16]);
    });
  }, []);

  const monthDirectoryFestivals = [
    {
      lunarDate: '04 - 05 Tháng Giêng',
      solarDate: '01 - 02/02/2025',
      name: 'Lễ hội Gò Đống Đa (Chiến thắng Ngọc Hồi)',
      location: 'Đống Đa, Hà Nội',
      rank: 'Quốc Gia',
      badgeClass: 'bg-[#ffdad8] text-[#8e1921]',
      id: 'dongda'
    },
    {
      lunarDate: '06 Tháng Giêng',
      solarDate: '03/02/2025',
      name: 'Lễ hội Chùa Hương (Khai hội Suối Yến)',
      location: 'Mỹ Đức, Hà Nội',
      rank: 'Di Sản Quốc Gia',
      badgeClass: 'bg-[#bdeafa] text-[#023744]',
      id: 'chuahuong'
    },
    {
      lunarDate: '06 - 08 Tháng Giêng',
      solarDate: '03 - 05/02/2025',
      name: 'Lễ hội Đền Cổ Loa (An Dương Vương)',
      location: 'Đông Anh, Hà Nội',
      rank: 'Di Tích Đặc Biệt',
      badgeClass: 'bg-[#ffdea8] text-[#7c5800]',
      id: 'coloa'
    },
    {
      lunarDate: '12 - 14 Tháng Giêng',
      solarDate: '09 - 11/02/2025',
      name: 'Hội Lim - Dân ca Quan họ Kinh Bắc (Chính hội 13)',
      location: 'Tiên Du, Bắc Ninh',
      rank: 'UNESCO Phi Vật Thể',
      badgeClass: 'bg-[#8e1921] text-white',
      id: 'lim',
      isHighlight: true
    },
    {
      lunarDate: '14 - 15 Tháng Giêng',
      solarDate: '11 - 12/02/2025',
      name: 'Lễ Khai ấn Đền Trần & Tết Nguyên Tiêu',
      location: 'Lộc Vượng, Nam Định',
      rank: 'Trọng Điểm Quốc Gia',
      badgeClass: 'bg-[#ffdea8] text-[#7c5800]',
      id: 'dentran'
    },
    {
      lunarDate: '15 - 18 Tháng Giêng',
      solarDate: '12 - 15/02/2025',
      name: 'Lễ hội Chùa Bà Thiên Hậu Bình Dương',
      location: 'TP. Thủ Dầu Một, Bình Dương',
      rank: 'Miền Nam / Dân Gian',
      badgeClass: 'bg-[#bdeafa] text-[#023744]',
      id: 'bathienhau'
    },
    {
      lunarDate: '16 - 18 Tháng Giêng',
      solarDate: '13 - 15/02/2025',
      name: 'Hội Làng Triều Khúc (Múa Bồng & Bố Cái Đại Vương)',
      location: 'Thanh Trì, Hà Nội',
      rank: 'Di Sản Dân Gian',
      badgeClass: 'bg-[#ece8e0] text-[#1c1c17]',
      id: 'trieukhuc'
    }
  ];

  const filteredDirectory = monthDirectoryFestivals.filter(f => {
    if (!tableSearch.trim()) return true;
    const q = tableSearch.toLowerCase().trim();
    return f.name.toLowerCase().includes(q) || f.location.toLowerCase().includes(q) || f.lunarDate.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb & Decorative Seal */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#584140]">
            <button onClick={() => onNavigate('trang-chu')} className="hover:text-[#8e1921] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Trang chủ</span>
            </button>
            <span className="text-[#e0bfbd]">/</span>
            <span className="text-[#8e1921] font-semibold">Lịch Âm Dương & Lễ Hội</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#ece8e0] rounded-full text-[#7c5800] text-xs font-semibold">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="uppercase text-[11px] tracking-wider">Ất Tỵ 2025 • Hệ Can Chi Thiên Văn</span>
          </div>
        </div>

        {/* Editorial Header Block */}
        <div className="relative mt-2 mb-6 p-6 sm:p-8 bg-[#f7f3eb] rounded-2xl overflow-hidden shadow-sm border border-[#e0bfbd]/40">
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#ffdea8]/20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-[#8e1921] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <span>Thiên Can Địa Chi</span>
                <span>•</span>
                <span>Tiết Khí Lập Xuân</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl text-[#8e1921] font-bold tracking-tight">
                Lịch Vạn Niên & Lễ Hội Truyền Thống
              </h1>
              <p className="text-xs sm:text-sm text-[#584140] mt-1.5 leading-relaxed">
                Tra cứu đối soát can chi, ngày hoàng đạo, tiết khí và các đại lễ hội dân tộc theo chu kỳ trăng. Nguồn cội hội tụ ngàn năm di sản văn hóa Việt Nam.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="px-4 py-2.5 rounded-xl bg-[#f1ede6] text-right shadow-sm border border-[#e0bfbd]/50">
                <span className="block text-[10px] text-[#7c5800] uppercase font-bold">Tiết Khí Hiện Tại</span>
                <span className="font-serif text-lg text-[#8e1921] font-bold">Lập Xuân (立春)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Command Bar */}
        <div className="bg-[#f1ede6] rounded-2xl p-4 sm:p-5 mb-6 shadow-sm flex flex-col gap-4 border border-[#e0bfbd]/40">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Date Selector & Month Navigation */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-[#e0bfbd]/40">
                <button
                  onClick={() => onShowToast('Hệ thống đang hiển thị Tháng 02/2025 (Chính hội mùa xuân Ất Tỵ)')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-[#584140] hover:text-[#8e1921] hover:bg-[#f1ede6] transition-all"
                  title="Tháng trước"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <div className="px-4 text-center">
                  <span className="block font-serif text-lg text-[#8e1921] font-bold leading-tight">
                    Tháng 02 / 2025
                  </span>
                  <span className="block text-[11px] text-[#7c5800] font-medium">
                    Tháng Giêng • Năm Ất Tỵ
                  </span>
                </div>
                <button
                  onClick={() => onShowToast('Tháng 03/2025: Lễ hội Đền Hùng 10/3 ÂL')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-[#584140] hover:text-[#8e1921] hover:bg-[#f1ede6] transition-all"
                  title="Tháng sau"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>

              <button
                onClick={() => {
                  const today = days.find(d => d.solarDay === 10);
                  if (today) setSelectedDay(today);
                  onShowToast('Đã định vị ngày chính hội xuân (10/02/2025 - 13 Tháng Giêng)');
                }}
                className="px-3.5 py-2 rounded-xl bg-[#ece8e0] hover:bg-[#e6e2da] text-[#1c1c17] text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px] text-[#7c5800]">today</span>
                <span>Hôm nay (15/01 ÂL)</span>
              </button>

              {/* Toggle Solar / Lunar View */}
              <div className="inline-flex p-1 bg-[#ece8e0] rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setViewMode('solar')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'solar' ? 'bg-[#8e1921] text-white shadow-sm' : 'text-[#584140] hover:text-[#1c1c17]'
                  }`}
                >
                  Dương Lịch làm chuẩn
                </button>
                <button
                  onClick={() => setViewMode('lunar')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'lunar' ? 'bg-[#8e1921] text-white shadow-sm' : 'text-[#584140] hover:text-[#1c1c17]'
                  }`}
                >
                  Âm Lịch trọng tâm
                </button>
              </div>
            </div>

            {/* Legend Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#584140]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ffc968]"></span>
                <span>Ngày Hoàng Đạo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ece8e0] border border-[#e0bfbd]"></span>
                <span>Hắc Đạo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#8e1921]"></span>
                <span className="font-semibold text-[#8e1921]">Đại Lễ Truyền Thống</span>
              </div>
            </div>
          </div>

          {/* Filter Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#e0bfbd]/30">
            <span className="text-[11px] uppercase text-[#7c5800] font-bold mr-1">Lọc hiển thị:</span>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                categoryFilter === 'all' ? 'bg-[#8e1921] text-white shadow-sm' : 'bg-[#ece8e0] text-[#584140] hover:bg-white'
              }`}
            >
              Tất cả (28 Lễ hội)
            </button>
            <button
              onClick={() => setCategoryFilter('national')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                categoryFilter === 'national' ? 'bg-[#8e1921] text-white shadow-sm' : 'bg-[#ece8e0] text-[#584140] hover:bg-white'
              }`}
            >
              Đại lễ Quốc gia (5)
            </button>
            <button
              onClick={() => setCategoryFilter('north')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                categoryFilter === 'north' ? 'bg-[#8e1921] text-white shadow-sm' : 'bg-[#ece8e0] text-[#584140] hover:bg-white'
              }`}
            >
              Lễ hội Dân gian Miền Bắc (14)
            </button>
            <button
              onClick={() => setCategoryFilter('central_south')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                categoryFilter === 'central_south' ? 'bg-[#8e1921] text-white shadow-sm' : 'bg-[#ece8e0] text-[#584140] hover:bg-white'
              }`}
            >
              Lễ hội Miền Trung & Nam (9)
            </button>
            <button
              onClick={() => setCategoryFilter('moon')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                categoryFilter === 'moon' ? 'bg-[#8e1921] text-white shadow-sm' : 'bg-[#ece8e0] text-[#584140] hover:bg-white'
              }`}
            >
              Mùng Một & Rằm (Trăng tròn)
            </button>
          </div>
        </div>

        {/* MAIN TWO-COLUMN WORKSPACE: CALENDAR GRID (8 Cols) + DETAIL DRAWER (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: CALENDAR GRID (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col bg-[#f7f3eb] rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e0bfbd]/40">
            {/* Day-of-week Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs uppercase font-bold tracking-wider">
              <div className="py-2 text-[#584140]">Thứ Hai</div>
              <div className="py-2 text-[#584140]">Thứ Ba</div>
              <div className="py-2 text-[#584140]">Thứ Tư</div>
              <div className="py-2 text-[#584140]">Thứ Năm</div>
              <div className="py-2 text-[#584140]">Thứ Sáu</div>
              <div className="py-2 text-[#8e1921]">Thứ Bảy</div>
              <div className="py-2 text-[#8e1921]">Chủ Nhật</div>
            </div>

            {/* Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {days.map((day, idx) => {
                const isSelected = selectedDay?.solarDate === day.solarDate;
                const isHoiLim = day.solarDay === 10 && day.solarMonth === 2;
                const isChuaHuong = day.solarDay === 4 && day.solarMonth === 2;
                const isDenTran = day.solarDay === 11 || day.solarDay === 12;
                const isMung1 = day.solarDay === 30 && day.solarMonth === 1;
                const is30Tet = day.solarDay === 29 && day.solarMonth === 1;
                const isRam = day.solarDay === 12 && day.solarMonth === 2;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDay(day)}
                    className={`min-h-[96px] sm:min-h-[105px] p-2 rounded-xl flex flex-col justify-between cursor-pointer transition-all ${
                      !day.isCurrentMonth
                        ? 'bg-[#ece8e0]/40 text-[#584140]/40'
                        : isSelected
                        ? 'bg-white shadow-lg ring-2 ring-[#8e1921] scale-[1.02] z-10'
                        : 'bg-white shadow-xs hover:bg-[#f1ede6]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`font-serif text-lg leading-tight ${
                        isSelected || isHoiLim ? 'text-[#8e1921] font-bold' : day.isCurrentMonth ? 'text-[#1c1c17]' : 'text-[#584140]/40'
                      }`}>
                        {viewMode === 'solar' ? day.solarDay : day.lunarDay}
                      </span>
                      <div className="text-right">
                        <span className={`text-[11px] font-bold ${
                          isHoiLim || isRam || isMung1 ? 'text-[#8e1921]' : 'text-[#7c5800]'
                        }`}>
                          {viewMode === 'solar' ? `${day.lunarDay}/${day.lunarMonth}` : `${day.solarDay}/${day.solarMonth}`}
                        </span>
                        {day.isHoangDao && (
                          <span className="material-symbols-outlined text-[10px] text-[#7c5800] block" style={{ fontVariationSettings: "'FILL' 1" }}>
                            stars
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-1 flex flex-col gap-0.5">
                      {is30Tet && (
                        <span className="truncate text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded bg-[#ffdad8] text-[#8e1921]">
                          30 Tất Niên
                        </span>
                      )}
                      {isMung1 && (
                        <span className="truncate text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded bg-[#8e1921] text-white">
                          Mùng 1 Tết
                        </span>
                      )}
                      {isChuaHuong && (
                        <span className="truncate text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded bg-[#8e1921] text-white">
                          Chùa Hương
                        </span>
                      )}
                      {isHoiLim && (
                        <span className="truncate text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded bg-[#8e1921] text-white shadow-xs">
                          Hội Lim (Chính)
                        </span>
                      )}
                      {isDenTran && (
                        <span className="truncate text-[9px] sm:text-[10px] font-semibold px-1 py-0.5 rounded bg-[#ffdea8] text-[#7c5800]">
                          Khai ấn Đền Trần
                        </span>
                      )}
                      {isRam && (
                        <span className="truncate text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded bg-[#ffc968] text-[#775300]">
                          Rằm Thượng Nguyên
                        </span>
                      )}
                      {!is30Tet && !isMung1 && !isChuaHuong && !isHoiLim && !isDenTran && !isRam && (
                        <span className="text-[9px] sm:text-[10px] text-[#584140] truncate">
                          {day.canChiDay}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footnote */}
            <div className="mt-4 pt-3 border-t border-[#e0bfbd]/40 flex flex-wrap items-center justify-between text-xs text-[#584140]">
              <span>* Nhấp vào từng ô ngày để xem chi tiết giờ xuất hành, can chi, tiết khí và hồ sơ lễ hội.</span>
              <span className="font-semibold text-[#7c5800]">Năm Ất Tỵ 2025 • Tháng Giêng Đủ (30 ngày)</span>
            </div>
          </div>

          {/* RIGHT: DAY DETAIL DRAWER / INSPECTOR (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {selectedDay ? (
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#e0bfbd]/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8e1921] via-[#d4a346] to-[#8e1921]"></div>

                {/* Selected Day Header Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase text-[#7c5800] font-bold">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      Chi tiết ngày đang chọn
                    </span>
                    <h2 className="font-serif text-2xl text-[#8e1921] font-bold mt-0.5">
                      {selectedDay.lunarDay} Tháng {selectedDay.lunarMonth === 1 ? 'Giêng' : selectedDay.lunarMonth} ÂL
                    </h2>
                    <p className="text-xs sm:text-sm text-[#1c1c17] font-medium">
                      Dương lịch: {selectedDay.solarDay}/{selectedDay.solarMonth}/{selectedDay.solarYear}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-[#8e1921] text-white rounded-xl text-center min-w-[55px] shadow-sm">
                    <span className="text-[10px] uppercase font-bold">Tháng {selectedDay.lunarMonth}</span>
                    <span className="font-serif text-xl font-bold leading-none my-0.5">{selectedDay.lunarDay}</span>
                    <span className="text-[9px] bg-white/20 px-1 rounded">Âm Lịch</span>
                  </div>
                </div>

                {/* Astronomical & Feng Shui Specs Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#f7f3eb] rounded-xl mb-4 text-xs border border-[#e0bfbd]/40">
                  <div className="p-1">
                    <span className="block text-[#584140] text-[11px]">Can Chi Ngày:</span>
                    <span className="font-bold text-[#8e1921] text-sm">{selectedDay.canChiDay}</span>
                  </div>
                  <div className="p-1">
                    <span className="block text-[#584140] text-[11px]">Can Chi Tháng:</span>
                    <span className="font-semibold text-[#1c1c17] text-sm">{selectedDay.canChiMonth}</span>
                  </div>
                  <div className="p-1">
                    <span className="block text-[#584140] text-[11px]">Năm Âm Lịch:</span>
                    <span className="font-semibold text-[#1c1c17] text-xs">{selectedDay.lunarYearName}</span>
                  </div>
                  <div className="p-1">
                    <span className="block text-[#584140] text-[11px]">Trực & Tiết Khí:</span>
                    <span className="font-semibold text-[#7c5800] text-xs">{selectedDay.truc} • {selectedDay.tietKhi}</span>
                  </div>
                </div>

                {/* Hoang Dao Hours */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#7c5800] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                      Giờ Hoàng Đạo (Tốt)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#ffdea8] text-[#271900] font-bold">
                      {selectedDay.hoangDaoType}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs">
                    {selectedDay.hoangDaoHours.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#f1ede6] text-[#1c1c17] font-medium text-[11px]">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Departure Directions */}
                <div className="p-2.5 bg-[#f1ede6] rounded-xl mb-4 flex items-center justify-between text-xs border border-[#e0bfbd]/30">
                  <div>
                    <span className="text-[#584140]">Hỷ Thần:</span> <strong className="text-[#8e1921]">{selectedDay.hyThan}</strong>
                  </div>
                  <span className="text-[#e0bfbd]">•</span>
                  <div>
                    <span className="text-[#584140]">Tài Thần:</span> <strong className="text-[#7c5800]">{selectedDay.taiThan}</strong>
                  </div>
                </div>

                {/* Festivals in Selected Day */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] uppercase text-[#8e1921] font-bold tracking-wider">
                    Sự Kiện Lễ Hội Trong Ngày ({selectedDay.festivals.length > 0 ? selectedDay.festivals.length : '1'} sự kiện)
                  </span>

                  {selectedDay.festivals.length > 0 ? (
                    selectedDay.festivals.map(f => (
                      <div key={f.id} className="p-3.5 rounded-xl bg-[#f7f3eb] border border-[#e0bfbd]/50">
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8e1921] text-white">
                            {f.heritageRankLabel}
                          </span>
                          <button
                            onClick={() => {
                              festivalService.toggleFavorite(f.id);
                              onShowToast(`Đã lưu "${f.name}" vào yêu thích!`);
                            }}
                            className="text-[#7c5800] hover:text-[#8e1921]"
                          >
                            <span className="material-symbols-outlined text-[18px]">bookmark</span>
                          </button>
                        </div>
                        <h3 className="font-serif font-bold text-base text-[#8e1921]">{f.name}</h3>
                        <p className="text-xs text-[#584140] line-clamp-2 mt-1">{f.shortDesc}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => onNavigate('chi-tiet-le-hoi', { id: f.id })}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-[#8e1921] hover:bg-[#6b000f] text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-sm"
                          >
                            <span className="material-symbols-outlined text-[16px]">explore</span>
                            <span>Xem Cẩm Nang</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3.5 rounded-xl bg-[#f7f3eb] border border-[#e0bfbd]/50">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7c5800] text-white">
                          Phong Tục Tiêu Biểu
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#8e1921]">
                        Ngày Lành Du Xuân & Vãng Cảnh Chùa
                      </h3>
                      <p className="text-xs text-[#584140] mt-1">
                        Thích hợp làm lễ tạ đầu năm, đi lễ đền chùa cầu bình an, mở hàng khai trương hoặc xuất hành hướng {selectedDay.hyThan}.
                      </p>
                      <button
                        onClick={() => onNavigate('kham-pha-le-hoi')}
                        className="mt-3 w-full py-1.5 px-3 rounded-lg bg-[#8e1921] hover:bg-[#6b000f] text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>Khám Phá Danh Mục Lễ Hội</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Mini Quote Callout */}
            <div className="p-4 bg-[#ffdea8]/30 rounded-2xl flex items-center gap-3 text-[#271900] border border-[#d4a346]/40">
              <span className="material-symbols-outlined text-[32px] text-[#7c5800] shrink-0">nature_people</span>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase font-bold text-[#7c5800]">Phong Tục Tháng Giêng</span>
                <p className="text-xs italic mt-0.5 leading-snug">
                  "Tháng Giêng ăn Tết ở nhà, Tháng Hai cờ bạc, Tháng Ba hội hè." Trẩy hội cầu lộc đầu năm mang lại cát tường bình an.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE MONTHLY FESTIVAL DIRECTORY TABLE */}
        <div className="mt-12 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e0bfbd]/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif text-2xl text-[#8e1921] font-bold tracking-tight">
                Danh Sách Lễ Hội Trong Tháng 02/2025
              </h2>
              <p className="text-xs sm:text-sm text-[#584140]">
                Tra cứu tổng hợp theo ngày Âm lịch, phân hạng di tích và địa danh hành chính.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#584140] text-[18px]">search</span>
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Tìm tên lễ hội, tỉnh thành..."
                  className="pl-9 pr-3 py-2 bg-[#f7f3eb] rounded-xl text-xs text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#8e1921]/20 w-64 border border-[#e0bfbd]/40"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#f1ede6] text-[#584140] text-[11px] uppercase font-bold">
                  <th className="py-3 px-3 rounded-l-lg">Ngày Âm Lịch</th>
                  <th className="py-3 px-3">Ngày Dương Lịch</th>
                  <th className="py-3 px-3">Tên Lễ Hội Truyền Thống</th>
                  <th className="py-3 px-3">Địa Phương Diễn Ra</th>
                  <th className="py-3 px-3">Phân Loại / Quy Mô</th>
                  <th className="py-3 px-3 text-right rounded-r-lg">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0bfbd]/30">
                {filteredDirectory.map((row, i) => (
                  <tr
                    key={i}
                    className={`hover:bg-[#f7f3eb] transition-colors ${row.isHighlight ? 'bg-[#ffdad8]/30 font-medium' : ''}`}
                  >
                    <td className="py-3.5 px-3 font-bold text-[#8e1921]">{row.lunarDate}</td>
                    <td className="py-3.5 px-3 text-[#1c1c17]">{row.solarDate}</td>
                    <td className="py-3.5 px-3 font-semibold text-[#1c1c17]">{row.name}</td>
                    <td className="py-3.5 px-3 text-[#584140]">{row.location}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeClass}`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => onNavigate('chi-tiet-le-hoi', { id: row.id === 'lim' ? 'lim' : 'chuahuong' })}
                        className="text-[#8e1921] font-bold hover:underline"
                      >
                        Chi tiết →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Project Context Footer */}
        <div className="mt-8 p-4 bg-[#ece8e0] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#584140] border border-[#e0bfbd]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8e1921] flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">developer_board</span>
            </div>
            <div>
              <span className="font-bold text-[#8e1921] text-sm block">Thuật Toán Quy Đổi Âm Dương • Phân Hệ D01</span>
              <p className="text-xs text-[#584140]">Áp dụng mô hình tính toán thiên văn Hoàng đạo - Hắc đạo, điểm sóc theo múi giờ GMT+7 Việt Nam.</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span>Sinh viên thực hiện: <strong className="text-[#8e1921]">Bùi Trung Nam (MSV: PH60600)</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
