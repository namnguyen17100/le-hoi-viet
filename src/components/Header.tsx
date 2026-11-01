import React from 'react';
import { LOGO_URL } from '../services/mockData';
import { User } from '../types';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  favoritesCount: number;
  currentUser: User | null;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  favoritesCount,
  currentUser,
  onOpenAuthModal,
}) => {
  const navItems = [
    { id: 'trang-chu', label: 'Trang chủ' },
    { id: 'lich-am-duong', label: 'Lịch Âm Dương' },
    { id: 'kham-pha-le-hoi', label: 'Khám phá Lễ Hội' },
    { id: 'ban-do-le-hoi', label: 'Bản đồ Lễ Hội' },
    { id: 'van-hoa-viet', label: 'Văn hóa Việt' },
    { id: 'quan-tri', label: 'Quản trị' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf9f1]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(45,35,30,0.06)] border-b border-[#e0bfbd]/40">
      {/* Top Academic & Astronomical Info Bar */}
      <div className="bg-[#8e1921] text-[#fdf9f1] py-1 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[#ffdea8] text-[16px]">calendar_month</span>
              <span className="text-white/90">Hôm nay: Thứ Năm, 15/01/2025</span>
              <span className="text-[#ffdea8]">•</span>
              <span className="font-semibold text-[#ffdea8]">16 Tháng Chạp (Giáp Thìn)</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-white/85">
              <span className="material-symbols-outlined text-[15px] text-[#ffdea8]">school</span>
              <span>Đề tài D01 • SV: Bùi Trung Nam (MSV: PH60600)</span>
            </div>
            <div className="flex items-center gap-1 text-[#ffdea8]">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span className="font-bold tracking-wider uppercase text-[10px]">Di sản Việt Nam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('trang-chu')}
            className="flex items-center gap-3 group text-left transition-transform hover:opacity-95"
          >
            <img
              alt="Lễ Hội Việt Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              src={LOGO_URL}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-xl text-[#8e1921] group-hover:text-[#6b000f] transition-colors tracking-tight font-serif">
                Lễ Hội Việt
              </span>
              <span className="text-[11px] text-[#7c5800] tracking-wider uppercase font-semibold">
                Tinh hoa văn hóa truyền thống
              </span>
            </div>
          </button>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`py-2 text-[15px] transition-all font-medium border-b-2 ${
                  isActive
                    ? 'text-[#8e1921] font-bold border-[#8e1921]'
                    : 'text-[#584140] hover:text-[#1c1c17] border-transparent hover:border-[#8e1921]/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Suite */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Favorites Button */}
          <button
            onClick={() => onNavigate('yeu-thich')}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              currentPage === 'yeu-thich'
                ? 'bg-[#8e1921] text-white'
                : 'text-[#584140] hover:text-[#8e1921] hover:bg-[#f1ede6]'
            }`}
            title="Xem danh sách lễ hội yêu thích"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: favoritesCount > 0 ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
            <span className="hidden md:inline text-xs font-semibold">Yêu thích</span>
            {favoritesCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                currentPage === 'yeu-thich' ? 'bg-white text-[#8e1921]' : 'bg-[#8e1921] text-white'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>

          <div className="h-6 w-[1px] bg-[#e0bfbd]/60 hidden sm:block"></div>

          {/* User Account / Profile */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full hover:bg-[#f1ede6] transition-all text-left"
            title="Tài khoản & Phân quyền Spring Security"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#d4a346] shadow-sm"
              src={currentUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH3pDCKqpWeAIhb5468TjwFofq-rUUBjDVwfitp8r4ebYkEfPbDzd-nUpNVCo11XuEMzAnFtUN-vM4gtm2Xsny-57swaEYD-xJ1YuEraRYpgju9lvtoEe8Bj9n5eTZa0f2nrWfbJvvFvQ6qfIK07jsivlZZdqnBQEoVh9vfX_ImQeRZa4-Ty7HC7qr_VtXbW-iNzqkjhiUPYOSD0BvG_2hAiD8JcRqJy11Zn3ccB4'}
            />
            <div className="hidden xl:flex flex-col">
              <span className="text-xs text-[#1c1c17] font-semibold leading-tight">
                {currentUser?.fullName || 'Bùi Trung Nam'}
              </span>
              <span className="text-[10px] text-[#7c5800] font-medium">
                {currentUser?.studentId || 'PH60600'} • {currentUser?.role || 'SUPER_ADMIN'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Strip */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-[#f1ede6] border-t border-[#e0bfbd]/30 gap-2 scrollbar-none text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
              currentPage === item.id
                ? 'bg-[#8e1921] text-white font-semibold'
                : 'text-[#584140] hover:bg-[#ece8e0]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
