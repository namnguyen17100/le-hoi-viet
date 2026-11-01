import React, { useState, useEffect } from 'react';
import { CulturalArticle, GlossaryTerm, FolkGame } from '../types';
import { articleService } from '../services/articleService';

interface VietCulturePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onShowToast: (msg: string) => void;
}

export const VietCulturePage: React.FC<VietCulturePageProps> = ({ onNavigate, onShowToast }) => {
  const [articles, setArticles] = useState<CulturalArticle[]>([]);
  const [glossary, setGlossary] = useState<GlossaryTerm[]>([]);
  const [games, setGames] = useState<FolkGame[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('tat-ca');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlphabet, setSelectedAlphabet] = useState('Tất cả');

  useEffect(() => {
    articleService.getArticles(activeCategory, searchQuery).then(setArticles);
    articleService.getGlossaryTerms(selectedAlphabet, searchQuery).then(setGlossary);
    articleService.getFolkGames().then(setGames);
  }, [activeCategory, searchQuery, selectedAlphabet]);

  const categories = [
    { key: 'tat-ca', label: 'Tất Cả', icon: 'apps' },
    { key: 'tin-nguong', label: 'Phong Tục & Tín Ngưỡng', icon: 'temple_buddhist' },
    { key: 'lich-tiet-khi', label: 'Lịch Âm & Tiết Khí', icon: 'bedtime' },
    { key: 'tro-choi', label: 'Trò Chơi Dân Gian', icon: 'sports_martial_arts' },
    { key: 'dan-ca', label: 'Âm Nhạc & Dân Ca Di Sản', icon: 'queue_music' },
    { key: 'am-thuc', label: 'Ẩm Thực Lễ Hội', icon: 'ramen_dining' },
  ];

  const handleApplyKeyword = (kw: string) => {
    setSearchQuery(kw);
    onShowToast(`Đang lọc chuyên đề theo từ khóa: "${kw}"`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumbs & Context Bar */}
      <div className="w-full bg-[#f7f3eb] px-4 sm:px-6 py-2.5 shadow-xs border-b border-[#e0bfbd]/40">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#584140]">
          <nav className="flex items-center gap-1.5">
            <button onClick={() => onNavigate('trang-chu')} className="hover:text-[#8e1921] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Trang chủ</span>
            </button>
            <span className="text-[#e0bfbd]">/</span>
            <span className="text-[#8e1921] font-semibold">Văn Hóa Việt & Tri Thức Dân Gian</span>
          </nav>
          <div className="flex items-center gap-1.5 text-xs text-[#7c5800] font-semibold">
            <span className="material-symbols-outlined text-[16px]">auto_stories</span>
            <span>Lưu trữ 240+ điển tích di sản & tập quán 54 dân tộc</span>
          </div>
        </div>
      </div>

      {/* Editorial Intro Header */}
      <section className="w-full bg-[#fdf9f1] px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-4 relative">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-1 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-[#7c5800] uppercase font-bold tracking-widest">
                <span className="w-6 h-[2px] bg-[#7c5800] inline-block"></span>
                <span>Kho Tàng Văn Hiến Ngàn Năm</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#8e1921] font-bold tracking-tight">
                Kho Tàng Văn Hóa, Điển Tích & Phong Tục Dân Gian
              </h1>
              <p className="text-xs sm:text-sm text-[#584140] leading-relaxed">
                Hành trình ngược dòng thời gian khám phá cội nguồn nghi lễ, chiều sâu triết lý âm dương ngũ hành và sắc thái phong tục truyền đời của 54 dân tộc anh em trên dải đất Việt Nam hình chữ S.
              </p>
            </div>

            {/* Quick Stats Bento Strip */}
            <div className="flex items-center gap-3 bg-[#f1ede6] p-3.5 rounded-2xl shadow-sm border border-[#e0bfbd]/50">
              <div className="flex flex-col items-center px-3">
                <span className="font-serif text-xl sm:text-2xl text-[#8e1921] font-bold">54</span>
                <span className="text-[10px] text-[#584140] font-semibold">Tộc Người</span>
              </div>
              <div className="w-[1px] h-8 bg-[#e0bfbd]"></div>
              <div className="flex flex-col items-center px-3">
                <span className="font-serif text-xl sm:text-2xl text-[#7c5800] font-bold">24</span>
                <span className="text-[10px] text-[#584140] font-semibold">Tiết Khí</span>
              </div>
              <div className="w-[1px] h-8 bg-[#e0bfbd]"></div>
              <div className="flex flex-col items-center px-3">
                <span className="font-serif text-xl sm:text-2xl text-[#023744] font-bold">3,000+</span>
                <span className="text-[10px] text-[#584140] font-semibold">Hương Ước</span>
              </div>
            </div>
          </div>

          {/* Search & Keyword Ribbon */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8c716f] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tra cứu điển tích, phong tục, tục ngữ, trò chơi cổ truyền..."
                className="w-full bg-white pl-12 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-[#1c1c17] placeholder:text-[#8c716f] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8e1921]/20 border border-[#e0bfbd]/50"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
              <span className="text-[#584140] whitespace-nowrap font-medium">Gợi ý:</span>
              {['Tứ Bất Tử', '24 Tiết Khí', 'Hát Xoan', 'Kéo Co Ngồi', 'Bánh Chưng'].map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleApplyKeyword(kw)}
                  className="bg-[#f1ede6] hover:bg-[#8e1921] hover:text-white px-3 py-1 rounded-full text-[#1c1c17] text-[11px] font-semibold transition-all whitespace-nowrap border border-[#e0bfbd]/40"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Topic Tabs */}
      <nav className="w-full bg-[#f1ede6] px-4 sm:px-6 py-2 shadow-xs sticky top-20 z-30 border-y border-[#e0bfbd]/40">
        <div className="max-w-[1280px] mx-auto flex items-center overflow-x-auto gap-2 scrollbar-none py-1">
          {categories.map((c) => {
            const isActive = activeCategory === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#8e1921] text-white shadow-sm'
                    : 'text-[#584140] hover:text-[#1c1c17] hover:bg-[#ece8e0]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{c.icon}</span>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12">
        {/* Featured Editorial Article */}
        {articles.length > 0 && (
          <article className="w-full bg-white rounded-2xl overflow-hidden shadow-md flex flex-col lg:flex-row group hover:shadow-xl transition-all border border-[#e0bfbd]/50">
            <div className="lg:w-7/12 relative min-h-[320px] overflow-hidden">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#8e1921] text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm">
                  Chuyên khảo đặc biệt
                </span>
                <span className="bg-[#ffc968] text-[#775300] px-3 py-1 rounded-full text-[10px] font-bold">
                  {articles[0].category}
                </span>
              </div>
            </div>
            <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between gap-4 bg-[#f7f3eb]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-[#584140]">
                  <span className="flex items-center gap-1 text-[#7c5800] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> {articles[0].readTime}
                  </span>
                  <span>•</span>
                  <span>Cập nhật: {articles[0].updateDate}</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#8e1921] font-bold leading-tight group-hover:text-[#6b000f] transition-colors">
                  {articles[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-[#584140] leading-relaxed line-clamp-4">
                  {articles[0].summary}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-3 border-t border-[#e0bfbd]/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={articles[0].authorAvatar}
                      alt={articles[0].author}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#d4a346]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1c17]">{articles[0].author}</span>
                      <span className="text-[10px] text-[#584140]">{articles[0].authorTitle}</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#584140] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    {articles[0].views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Knowledge Articles Grid */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[#8e1921] font-bold">
              Bài Viết Chuyên Đề Di Sản ({articles.length})
            </h2>
            <span className="text-xs text-[#7c5800] font-semibold">Khảo cứu văn hóa dân gian</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group border border-[#e0bfbd]/40"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#8e1921] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {art.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#584140] mb-1">
                      <span className="text-[#7c5800] font-semibold">{art.author}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#8e1921] group-hover:text-[#6b000f] transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#584140] line-clamp-3 mt-1.5 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#e0bfbd]/30 flex items-center justify-between text-xs text-[#584140]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      {art.views.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onShowToast(`Đang mở toàn văn bài viết: "${art.title}"`)}
                      className="text-[#8e1921] font-bold hover:underline flex items-center gap-0.5"
                    >
                      Đọc tiếp <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section: Folk Games Encyclopedia */}
        <section className="w-full bg-[#f7f3eb] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 border border-[#e0bfbd]/40">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] uppercase font-bold text-[#7c5800] tracking-wider">
              Không Gian Tương Tác Sống Động
            </span>
            <h2 className="font-serif text-2xl text-[#8e1921] font-bold">
              Góc Trải Nghiệm Trò Chơi Dân Gian & Luật Chơi Cổ Truyền
            </h2>
            <p className="text-xs text-[#584140]">
              Khám phá quy chuẩn luật chơi, ý nghĩa phong tục và kỹ năng thi đấu của các trò diễn hội làng đã nuôi dưỡng tinh thần thượng võ qua bao thế hệ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {games.map((game, i) => (
              <div
                key={game.id}
                className="bg-white p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3 border border-[#e0bfbd]/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#8e1921]/10 text-[#8e1921] flex items-center justify-center font-serif font-bold text-sm">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] text-[#7c5800] bg-[#ffdea8] px-2 py-0.5 rounded-full font-bold">
                      {game.location.split(' ')[0]}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1c1c17] mb-1">
                    {game.name}
                  </h3>
                  <p className="text-xs text-[#584140] line-clamp-3 leading-relaxed">
                    {game.rules}
                  </p>
                </div>
                <div className="bg-[#f7f3eb] p-2.5 rounded-xl text-[11px] flex flex-col gap-0.5 border border-[#e0bfbd]/30">
                  <span className="font-bold text-[#8e1921]">Kỹ năng thi đấu:</span>
                  <span className="text-[#584140] line-clamp-1">{game.technique}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Festival & Lunar Terminology Glossary */}
        <section className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 border border-[#e0bfbd]/40">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase font-bold text-[#7c5800] tracking-wider block mb-1">
                Bách Khoa Thư Lễ Hội
              </span>
              <h2 className="font-serif text-2xl text-[#8e1921] font-bold">
                Từ Điển Thuật Ngữ Lễ Hội & Âm Dương Lịch Cổ Truyền
              </h2>
              <p className="text-xs text-[#584140] mt-1">
                Tra cứu tường minh các khái niệm nghi lễ, chức sắc, thời khắc phụng vụ trong hệ thống tế tự dân gian Việt Nam.
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <span className="text-[#584140] font-semibold mr-1">Vần:</span>
              {['Tất cả', 'T', 'R', 'K', 'H', 'S'].map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedAlphabet(letter)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    selectedAlphabet === letter
                      ? 'bg-[#8e1921] text-white shadow-xs'
                      : 'bg-[#f1ede6] text-[#584140] hover:bg-[#ece8e0]'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossary.map((term) => (
              <div
                key={term.id}
                className="p-4 rounded-2xl bg-[#f7f3eb] hover:bg-[#f1ede6] transition-all flex flex-col gap-2 border border-[#e0bfbd]/40 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-base text-[#8e1921]">{term.term}</span>
                    <span className="text-xs text-[#7c5800] font-serif">{term.hanNom}</span>
                  </div>
                  <span className="text-[10px] bg-[#ffdea8] text-[#271900] px-2 py-0.5 rounded-full font-bold">
                    {term.category}
                  </span>
                </div>
                <p className="text-xs text-[#584140] leading-relaxed">
                  {term.definition}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Capstone Thesis Card */}
        <section className="w-full bg-[#ece8e0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-[#e0bfbd]/50">
          <div className="max-w-2xl flex flex-col gap-2">
            <span className="text-[11px] uppercase font-bold text-[#8e1921] tracking-wider">
              Hồ Sơ Khoa Học Đề Tài Tốt Nghiệp D01
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1c1c17] font-bold">
              Nền Tảng Số Hóa Di Sản Lễ Hội Truyền Thống Theo Âm Lịch Việt Nam
            </h3>
            <p className="text-xs text-[#584140] leading-relaxed">
              Hệ thống ứng dụng thuật toán thiên văn đối chiếu lịch vạn niên và chu kỳ mặt trăng phục vụ công tác bảo tồn, lưu trữ tri thức phi vật thể và quảng bá lễ tục dân gian đến cộng đồng công nghệ số.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#584140]">
              <span>Sinh viên thực hiện: <strong className="text-[#8e1921]">Bùi Trung Nam</strong></span>
              <span>•</span>
              <span>Mã sinh viên: <strong className="text-[#1c1c17]">PH60600</strong></span>
              <span>•</span>
              <span>Đơn vị: <strong className="text-[#1c1c17]">Học viện Công nghệ & Truyền thông</strong></span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onShowToast('Đang tải tài liệu nghiên cứu đề tài D01 (PDF)...')}
              className="px-5 py-2.5 rounded-xl bg-[#8e1921] hover:bg-[#6b000f] text-white text-xs font-bold transition-all shadow-sm"
            >
              Tải tài liệu nghiên cứu (PDF)
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
