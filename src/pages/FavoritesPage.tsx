import React, { useState, useEffect } from 'react';
import { Festival } from '../types';
import { festivalService } from '../services/festivalService';

interface FavoritesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onShowToast: (msg: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate, onShowToast }) => {
  const [favorites, setFavorites] = useState<Festival[]>([]);
  const [activeTab, setActiveTab] = useState<'favs' | 'reminders' | 'routes' | 'articles'>('favs');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Trang phục truyền thống: Áo dài ngũ thân / Áo the khăn xếp', completed: true },
    { id: 2, text: 'Đặt trước vé cáp treo Hương Tích & đò Suối Yến online', completed: true },
    { id: 3, text: 'Lễ vật chay: Trầm hương thanh khiết, hoa sen, oản ngọc', completed: true },
    { id: 4, text: 'Sổ tay ghi chép điền dã di sản & thẻ nhớ máy ảnh dự phòng', completed: false },
    { id: 5, text: 'Liên hệ nhóm liền anh liền chị CLB Quan họ Tiên Du', completed: false },
  ]);

  const loadFavorites = async () => {
    const list = await festivalService.getFavorites();
    setFavorites(list);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleToggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    onShowToast('Đã cập nhật danh mục chuẩn bị lễ vật!');
  };

  const handleRemoveFavorite = async (id: string, name: string) => {
    await festivalService.toggleFavorite(id);
    onShowToast(`Đã bỏ lưu "${name}" khỏi danh mục yêu thích.`);
    loadFavorites();
  };

  const handleSaveNote = async (id: string) => {
    await festivalService.saveNote(id, noteContent);
    setEditingNoteId(null);
    onShowToast('Đã lưu ghi chú nghiên cứu!');
    loadFavorites();
  };

  const handleSyncGoogle = () => {
    onShowToast('Đã tạo liên kết đồng bộ Google Calendar (.ics) cho 5 lễ hội đã lưu!');
  };

  const handleExportPdf = () => {
    onShowToast('Đang xuất sổ tay cẩm nang du xuân di sản (PDF)...');
  };

  return (
    <div className="flex flex-col w-full">
      {/* BREADCRUMBS & CONTEXTUAL TOP BAR */}
      <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 pt-4 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#584140]">
          <button onClick={() => onNavigate('trang-chu')} className="hover:text-[#8e1921] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Trang chủ</span>
          </button>
          <span className="text-[#e0bfbd]">/</span>
          <span>Cá Nhân</span>
          <span className="text-[#e0bfbd]">/</span>
          <span className="text-[#8e1921] font-bold">Lễ Hội Đã Lưu & Lịch Trình</span>
        </nav>
      </section>

      {/* USER PROFILE DASHBOARD HEADER */}
      <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 pb-6">
        <div className="relative bg-[#f1ede6] rounded-2xl shadow-sm p-6 sm:p-8 overflow-hidden border border-[#e0bfbd]/40">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Profile Identity Block */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH3pDCKqpWeAIhb5468TjwFofq-rUUBjDVwfitp8r4ebYkEfPbDzd-nUpNVCo11XuEMzAnFtUN-vM4gtm2Xsny-57swaEYD-xJ1YuEraRYpgju9lvtoEe8Bj9n5eTZa0f2nrWfbJvvFvQ6qfIK07jsivlZZdqnBQEoVh9vfX_ImQeRZa4-Ty7HC7qr_VtXbW-iNzqkjhiUPYOSD0BvG_2hAiD8JcRqJy11Zn3ccB4"
                  alt="Bùi Trung Nam"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-3 ring-[#d4a346] shadow-md"
                />
                <span className="absolute bottom-0 right-0 bg-[#8e1921] text-white rounded-full p-1 shadow-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                </span>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-2xl text-[#1c1c17] font-bold tracking-tight">
                    Bùi Trung Nam
                  </h1>
                  <span className="bg-[#8e1921] text-white px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                    MSV: PH60600
                  </span>
                  <span className="bg-[#ffdea8] text-[#271900] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                    Đề tài D01
                  </span>
                </div>
                <p className="text-xs text-[#584140]">
                  Nhà nghiên cứu văn hóa dân gian • Khách du xuân di sản • Niên khóa 2021 - 2025
                </p>
                <div className="flex items-center gap-1.5 text-[#7c5800] text-xs font-semibold mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">military_tech</span>
                  <span>Chỉ số khám phá: Đã mở khóa 18 không gian di sản phi vật thể</span>
                </div>
              </div>
            </div>

            {/* Numerical Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 lg:pt-0">
              <div className="bg-white p-3 rounded-xl shadow-xs flex flex-col items-center justify-center text-center min-w-[90px] border border-[#e0bfbd]/40">
                <span className="font-serif text-2xl font-bold text-[#8e1921] leading-none">{favorites.length}</span>
                <span className="text-[11px] text-[#584140] mt-1">Lễ hội đã lưu</span>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-xs flex flex-col items-center justify-center text-center min-w-[90px] border border-[#e0bfbd]/40">
                <span className="font-serif text-2xl font-bold text-[#7c5800] leading-none">04</span>
                <span className="text-[11px] text-[#584140] mt-1">Chuông âm lịch</span>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-xs flex flex-col items-center justify-center text-center min-w-[90px] border border-[#e0bfbd]/40">
                <span className="font-serif text-2xl font-bold text-[#023744] leading-none">03</span>
                <span className="text-[11px] text-[#584140] mt-1">Lộ trình du xuân</span>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-xs flex flex-col items-center justify-center text-center min-w-[90px] border border-[#e0bfbd]/40">
                <span className="font-serif text-2xl font-bold text-[#1c1c17] leading-none">08</span>
                <span className="text-[11px] text-[#584140] mt-1">Bài viết di sản</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAB NAVIGATION BAR */}
      <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 mb-6">
        <div className="bg-[#f7f3eb] p-1.5 rounded-2xl shadow-sm flex flex-wrap items-center gap-1.5 border border-[#e0bfbd]/40">
          <button
            onClick={() => setActiveTab('favs')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'favs'
                ? 'bg-[#8e1921] text-white shadow-sm'
                : 'text-[#584140] hover:text-[#1c1c17] hover:bg-[#ece8e0]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            <span>Lễ Hội Yêu Thích</span>
            <span className="ml-1 bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">
              {favorites.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('reminders');
              onShowToast('Đang hiển thị 4 lịch hẹn nhắc ngày âm lịch!');
            }}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'reminders'
                ? 'bg-[#8e1921] text-white shadow-sm'
                : 'text-[#584140] hover:text-[#1c1c17] hover:bg-[#ece8e0]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">alarm</span>
            <span>Lịch Nhắc Âm Lịch & Thông Báo</span>
            <span className="ml-1 bg-[#ffdea8] text-[#271900] px-1.5 py-0.2 rounded-full text-[10px]">
              4
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('routes');
              onNavigate('ban-do-le-hoi');
            }}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#584140] hover:text-[#1c1c17] hover:bg-[#ece8e0] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">explore</span>
            <span>Lộ Trình Du Xuân 2025</span>
          </button>

          <button
            onClick={() => onNavigate('van-hoa-viet')}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#584140] hover:text-[#1c1c17] hover:bg-[#ece8e0] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Bài Viết Đã Đánh Dấu</span>
          </button>
        </div>
      </section>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT & CENTER: FAVORITES LIST (8 COLS) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* TOOLBAR: ACTION SUITE */}
          <div className="bg-[#f7f3eb] p-4 rounded-2xl shadow-sm flex flex-col gap-3 border border-[#e0bfbd]/40">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[10px] uppercase font-bold text-[#7c5800] mr-1">Bộ lọc:</span>
                <span className="bg-[#8e1921] text-white px-3 py-1 rounded-full font-semibold shadow-xs">
                  Tất cả ({favorites.length})
                </span>
                <span className="bg-white text-[#584140] px-3 py-1 rounded-full font-semibold border border-[#e0bfbd]/40">
                  Tháng Giêng ÂL (4)
                </span>
                <span className="bg-white text-[#584140] px-3 py-1 rounded-full font-semibold border border-[#e0bfbd]/40">
                  Miền Bắc (4)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e0bfbd]/30 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSyncGoogle}
                  className="bg-white hover:bg-[#f1ede6] text-[#8e1921] font-semibold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all border border-[#e0bfbd]/50"
                >
                  <span className="material-symbols-outlined text-[16px]">event_available</span>
                  <span>Đồng bộ Google Calendar</span>
                </button>
                <button
                  onClick={handleExportPdf}
                  className="bg-white hover:bg-[#f1ede6] text-[#023744] font-semibold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all border border-[#e0bfbd]/50"
                >
                  <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                  <span>In Cẩm nang PDF</span>
                </button>
              </div>

              <button
                onClick={() => onShowToast('Đã sao chép liên kết chia sẻ danh mục lễ hội!')}
                className="bg-white hover:bg-[#f1ede6] text-[#584140] font-semibold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all border border-[#e0bfbd]/50 ml-auto"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>

          {/* Cards List */}
          {favorites.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center border border-[#e0bfbd]/40 flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-[#7c5800]">bookmark_border</span>
              <p className="text-sm text-[#584140]">Chưa có lễ hội nào trong danh sách yêu thích.</p>
              <button
                onClick={() => onNavigate('kham-pha-le-hoi')}
                className="px-4 py-2 bg-[#8e1921] text-white rounded-xl text-xs font-bold"
              >
                Khám Phá Lễ Hội Ngay
              </button>
            </div>
          ) : (
            favorites.map((fest) => (
              <article
                key={fest.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden p-5 flex flex-col md:flex-row gap-5 border border-[#e0bfbd]/40"
              >
                {/* Visual Thumbnail */}
                <div className="relative w-full md:w-52 h-44 md:h-auto rounded-xl overflow-hidden shrink-0">
                  <img src={fest.image} alt={fest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#8e1921] text-white rounded-lg shadow-md flex flex-col overflow-hidden text-center min-w-[50px]">
                    <div className="px-1.5 py-0.5 text-[9px] uppercase font-bold bg-[#6b000f]">
                      Tháng {fest.lunarMonth}
                    </div>
                    <div className="px-1.5 py-1 bg-white text-[#1c1c17]">
                      <span className="font-serif text-base leading-none block font-bold text-[#8e1921]">
                        {fest.lunarDay}
                      </span>
                      <span className="text-[9px] text-[#584140] block font-semibold">ÂL</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-[#023744]/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                    {fest.region}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-[#7c5800] text-xs font-semibold mb-0.5">
                          <span className="material-symbols-outlined text-[16px]">celebration</span>
                          <span>{fest.heritageRankLabel}</span>
                        </div>
                        <h3
                          onClick={() => onNavigate('chi-tiet-le-hoi', { id: fest.id })}
                          className="font-serif font-bold text-lg text-[#1c1c17] hover:text-[#8e1921] transition-colors cursor-pointer"
                        >
                          {fest.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleRemoveFavorite(fest.id, fest.name)}
                        className="text-[#8c716f] hover:text-[#ba1a1a] p-1"
                        title="Bỏ lưu khỏi danh sách"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#584140] mt-1.5 line-clamp-2 leading-relaxed">
                      {fest.shortDesc}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#584140] mt-2">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-[#8e1921]">location_on</span>
                        {fest.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-[#7c5800]">schedule</span>
                        {fest.lunarDate}
                      </span>
                    </div>

                    {/* Personal Note Box */}
                    {fest.personalNote && (
                      <div className="mt-2.5 p-3 bg-[#f7f3eb] rounded-xl flex items-start gap-2 text-xs border border-[#e0bfbd]/40">
                        <span className="material-symbols-outlined text-[#7c5800] text-[16px] mt-0.5 shrink-0">
                          sticky_note_2
                        </span>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#7c5800] text-[11px]">Ghi chú nghiên cứu:</span>
                          <p className="text-[#584140] italic mt-0.5">{fest.personalNote}</p>
                        </div>
                      </div>
                    )}

                    {/* Note editor dialog inline */}
                    {editingNoteId === fest.id && (
                      <div className="mt-2 p-3 bg-[#f7f3eb] rounded-xl flex flex-col gap-2 border border-[#8e1921]/30">
                        <textarea
                          rows={2}
                          value={noteContent}
                          onChange={(e) => setNoteContent(e.target.value)}
                          placeholder="Nhập ghi chú cá nhân, giờ xuất hành, vật phẩm cúng..."
                          className="w-full p-2 bg-white rounded-lg text-xs border border-[#e0bfbd] text-[#1c1c17] focus:outline-none"
                        />
                        <div className="flex justify-end gap-2 text-xs">
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="px-3 py-1 bg-white text-[#584140] rounded-lg"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={() => handleSaveNote(fest.id)}
                            className="px-3 py-1 bg-[#8e1921] text-white rounded-lg font-bold shadow-xs"
                          >
                            Lưu Ghi Chú
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e0bfbd]/30 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingNoteId(fest.id);
                          setNoteContent(fest.personalNote || '');
                        }}
                        className="bg-[#f1ede6] hover:bg-[#ece8e0] text-[#1c1c17] px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition-all"
                      >
                        <span className="material-symbols-outlined text-[15px] text-[#7c5800]">edit_note</span>
                        <span>{fest.personalNote ? 'Sửa ghi chú' : 'Thêm ghi chú'}</span>
                      </button>
                      <button
                        onClick={() => onNavigate('ban-do-le-hoi')}
                        className="bg-[#f1ede6] hover:bg-[#ece8e0] text-[#1c1c17] px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition-all"
                      >
                        <span className="material-symbols-outlined text-[15px] text-[#023744]">directions</span>
                        <span>Chỉ đường</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onNavigate('chi-tiet-le-hoi', { id: fest.id })}
                      className="bg-[#8e1921] text-white hover:bg-[#6b000f] px-4 py-1.5 rounded-xl font-semibold flex items-center gap-1 shadow-xs transition-colors ml-auto"
                    >
                      <span>Xem chi tiết</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* RIGHT: COUNTDOWN & CHECKLIST (4 COLS) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Upcoming Countdown Clock */}
          <div className="bg-[#6b000f] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-white/20 px-3 py-0.5 rounded-full text-[10px] uppercase font-bold text-[#ffdea8] tracking-wider">
                Đếm ngược sự kiện gần nhất
              </span>
              <span className="material-symbols-outlined text-[#ffdea8] text-[20px]">hourglass_bottom</span>
            </div>
            <h4 className="font-serif font-bold text-lg text-white">Trẩy Hội Chùa Hương</h4>
            <div className="text-xs text-white/80 mt-1">
              Mùng 6 Tháng Giêng (Ất Tỵ) • 03/02/2025
            </div>

            <div className="grid grid-cols-4 gap-2 text-center pt-4">
              <div className="bg-white/10 rounded-xl p-2 border border-white/10">
                <span className="font-serif text-2xl font-bold text-[#ffdea8] block">19</span>
                <span className="text-[10px] text-white/80">Ngày</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 border border-white/10">
                <span className="font-serif text-2xl font-bold text-[#ffdea8] block">14</span>
                <span className="text-[10px] text-white/80">Giờ</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 border border-white/10">
                <span className="font-serif text-2xl font-bold text-[#ffdea8] block">32</span>
                <span className="text-[10px] text-white/80">Phút</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 border border-white/10">
                <span className="font-serif text-2xl font-bold text-[#ffdea8] block">48</span>
                <span className="text-[10px] text-white/80">Giây</span>
              </div>
            </div>
          </div>

          {/* Preparation & Ritual Checklist */}
          <div className="bg-[#f7f3eb] rounded-2xl p-6 shadow-sm flex flex-col gap-4 border border-[#e0bfbd]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8e1921] text-[20px]">checklist_rtl</span>
                <h4 className="font-serif font-bold text-base text-[#1c1c17]">Nhắc Việc & Chuẩn Bị Lễ</h4>
              </div>
              <span className="text-[10px] bg-[#ffdea8] text-[#271900] px-2 py-0.5 rounded-full font-bold">
                {checklist.filter(c => c.completed).length}/{checklist.length} Xong
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  onClick={() => handleToggleCheck(item.id)}
                  className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl cursor-pointer hover:bg-[#f1ede6] transition-colors border border-[#e0bfbd]/40"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    readOnly
                    className="accent-[#8e1921] w-4 h-4 mt-0.5 rounded cursor-pointer"
                  />
                  <span className={`leading-snug ${item.completed ? 'line-through text-[#8c716f]' : 'text-[#1c1c17] font-medium'}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Research Progress Widget */}
          <div className="bg-[#f7f3eb] rounded-2xl p-6 shadow-sm flex flex-col gap-3 border border-[#e0bfbd]/40 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#7c5800]">Hồ Sơ Đề Tài D01</span>
            <h5 className="font-serif font-bold text-sm text-[#1c1c17]">Tiến Độ Số Hóa Của Nam</h5>
            <div className="space-y-2 mt-1">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Thu thập tư liệu hội mùa Xuân</span>
                  <strong className="text-[#8e1921]">85%</strong>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div className="bg-[#8e1921] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Ghi âm làn điệu & nghi lễ cúng</span>
                  <strong className="text-[#7c5800]">60%</strong>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div className="bg-[#7c5800] h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span>Bản đồ tọa độ địa điểm tâm linh</span>
                  <strong className="text-[#023744]">92%</strong>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div className="bg-[#023744] h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
