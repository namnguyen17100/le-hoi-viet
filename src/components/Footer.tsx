import React from 'react';
import { LOGO_URL } from '../services/mockData';

interface FooterProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#f1ede6] text-[#1c1c17] mt-16 border-t border-[#e0bfbd]/50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & Identity */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Lễ Hội Việt Logo"
                className="h-9 w-auto object-contain"
                src={LOGO_URL}
              />
              <span className="font-headline-sm text-2xl text-[#8e1921] font-bold font-serif">
                Lễ Hội Việt
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#584140] leading-relaxed">
              Nền tảng tra cứu và số hóa di sản lễ hội truyền thống theo âm lịch Việt Nam. Kết nối thế hệ trẻ với nguồn cội văn hóa dân tộc ngàn năm văn hiến.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#7c5800] font-semibold">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              <span>Đồ án tốt nghiệp Công nghệ thông tin</span>
            </div>
          </div>

          {/* Column 2: Thesis Profile (Đề tài D01) */}
          <div className="flex flex-col gap-3">
            <span className="text-base text-[#8e1921] font-bold font-serif border-b border-[#e0bfbd]/40 pb-1">
              Hồ sơ Đề tài D01
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#584140]">
              <li>
                <strong className="text-[#1c1c17]">Tên đề tài:</strong> Lịch lễ hội truyền thống theo âm lịch
              </li>
              <li>
                <strong className="text-[#1c1c17]">Mã đồ án:</strong> D01
              </li>
              <li>
                <strong className="text-[#1c1c17]">Sinh viên:</strong> Bùi Trung Nam
              </li>
              <li>
                <strong className="text-[#1c1c17]">Mã sinh viên:</strong> PH60600
              </li>
              <li>
                <strong className="text-[#1c1c17]">Kiến trúc:</strong> Spring Boot, React, MySQL, JWT
              </li>
              <li>
                <strong className="text-[#1c1c17]">Tên miền:</strong> lehoiviet.ai.studio
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Festivals */}
          <div className="flex flex-col gap-3">
            <span className="text-base text-[#8e1921] font-bold font-serif border-b border-[#e0bfbd]/40 pb-1">
              Lễ hội Nổi bật
            </span>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <button
                onClick={() => onNavigate('chi-tiet-le-hoi', { id: 'denhung' })}
                className="text-left text-[#584140] hover:text-[#8e1921] transition-colors"
              >
                Lễ hội Đền Hùng (10/3 ÂL)
              </button>
              <button
                onClick={() => onNavigate('chi-tiet-le-hoi', { id: 'lim' })}
                className="text-left text-[#584140] hover:text-[#8e1921] transition-colors"
              >
                Hội Lim Bắc Ninh (13 tháng Giêng)
              </button>
              <button
                onClick={() => onNavigate('chi-tiet-le-hoi', { id: 'chuahuong' })}
                className="text-left text-[#584140] hover:text-[#8e1921] transition-colors"
              >
                Lễ hội Chùa Hương (Khai hội mùng 6)
              </button>
              <button
                onClick={() => onNavigate('chi-tiet-le-hoi', { id: 'dentran' })}
                className="text-left text-[#584140] hover:text-[#8e1921] transition-colors"
              >
                Lễ Khai ấn Đền Trần (Rằm tháng Giêng)
              </button>
              <button
                onClick={() => onNavigate('chi-tiet-le-hoi', { id: 'caungu' })}
                className="text-left text-[#584140] hover:text-[#8e1921] transition-colors"
              >
                Lễ hội Cầu Ngư Duyên Hải Miền Trung
              </button>
              <button
                onClick={() => onNavigate('chi-tiet-le-hoi', { id: 'nuisam' })}
                className="text-left text-[#584140] hover:text-[#8e1921] transition-colors"
              >
                Lễ hội Vía Bà Chúa Xứ Núi Sam
              </button>
            </div>
          </div>

          {/* Column 4: Research Info */}
          <div className="flex flex-col gap-3">
            <span className="text-base text-[#8e1921] font-bold font-serif border-b border-[#e0bfbd]/40 pb-1">
              Thông tin Nghiên cứu
            </span>
            <p className="text-xs sm:text-sm text-[#584140] leading-relaxed">
              Hệ thống đối chiếu lịch vạn niên thiên văn, thuật toán quy đổi âm - dương lịch phục vụ bảo tồn và phát huy giá trị di sản phi vật thể.
            </p>
            <div className="p-3 bg-[#fdf9f1] rounded-xl border border-[#e0bfbd]/60 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] uppercase text-[#7c5800] font-bold tracking-wider">
                Hội đồng bảo vệ đồ án
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#1c1c17]">
                Học viện Công nghệ & Truyền thông
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-[#e0bfbd]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-[#584140] italic font-serif">
            "Mỗi lễ hội là một câu chuyện văn hóa. Mỗi ngày âm lịch là một dấu ấn truyền thống."
          </p>
          <p className="text-xs text-[#584140]">
            © 2025 Lễ Hội Việt (Đề tài D01 - SV: Bùi Trung Nam - PH60600). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
