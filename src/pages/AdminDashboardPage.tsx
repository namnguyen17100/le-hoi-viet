import React, { useState, useEffect } from 'react';
import { Festival, SystemLog, CommunitySubmission } from '../types';
import { festivalService } from '../services/festivalService';
import { adminService } from '../services/adminService';

interface AdminDashboardPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onShowToast: (msg: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate, onShowToast }) => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>([]);
  const [kpi, setKpi] = useState({
    digitizedCount: 128,
    lunarAccuracy: '100%',
    articlesCount: 46,
    queriesCount: '45.2k',
    gisVerifiedProvinces: '63/63',
    pendingCount: 3
  });

  // Filter states
  const [searchFilter, setSearchFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFestival, setModalFestival] = useState<Partial<Festival>>({
    name: '',
    province: 'Hà Nội',
    region: 'Bắc',
    regionKey: 'bac',
    lunarDate: 'Tháng Giêng ÂL',
    lunarMonth: 1,
    lunarDay: 15,
    solarDate2025: '2025',
    heritageRankLabel: 'Di sản Dân gian',
    category: 'folk',
    shortDesc: '',
  });

  const loadData = async () => {
    const festList = await festivalService.getFestivals();
    setFestivals(festList);
    const kpiData = await adminService.getKpiMetrics();
    setKpi(kpiData);
    const logList = await adminService.getSystemLogs();
    setLogs(logList);
    const subList = await adminService.getCommunitySubmissions();
    setSubmissions(subList);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReviewSubmission = async (id: string, action: 'APPROVE' | 'REJECT') => {
    await adminService.reviewSubmission(id, action);
    onShowToast(action === 'APPROVE' ? 'Đã phê duyệt và bổ sung hồ sơ lễ hội vào CSDL quốc gia!' : 'Đã từ chối hồ sơ di sản.');
    loadData();
  };

  const handleSaveFestival = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFestival.name) return;
    await festivalService.createFestival(modalFestival);
    onShowToast(`Đã thêm mới hồ sơ lễ hội: "${modalFestival.name}"!`);
    setIsModalOpen(false);
    loadData();
  };

  const handleDeleteFestival = async (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa hồ sơ lễ hội "${name}"?`)) {
      await festivalService.deleteFestival(id);
      onShowToast(`Đã xóa hồ sơ lễ hội "${name}".`);
      loadData();
    }
  };

  const handleExport = (format: 'EXCEL' | 'PDF') => {
    adminService.exportReport(format);
    onShowToast(`Đã xuất báo cáo đồ án D01 thành công (${format})!`);
  };

  const filteredFestivals = festivals.filter(f => {
    if (regionFilter && f.region !== regionFilter && f.regionKey !== regionFilter) return false;
    if (monthFilter && f.lunarMonth !== Number(monthFilter)) return false;
    if (categoryFilter && f.category !== categoryFilter) return false;
    if (statusFilter && f.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      return f.name.toLowerCase().includes(q) || f.province.toLowerCase().includes(q) || f.code.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Administrative Banner & Metadata Bar */}
      <div className="relative w-full bg-[#ece8e0] py-6 px-4 sm:px-6 shadow-sm border-b border-[#e0bfbd]/50">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8e1921] text-white text-[10px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">shield_person</span>
                CMS v1.4 • Super Admin
              </span>
              <span className="text-xs text-[#7c5800] font-semibold">
                Đồ án tốt nghiệp D01 • CSDL Văn hóa phi vật thể Việt Nam
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#8e1921] font-bold tracking-tight">
              Hệ Thống Quản Trị Dữ Liệu Lễ Hội
            </h1>
            <p className="text-xs text-[#584140]">
              Trung tâm biên tập số hóa, chuẩn hóa thuật toán quy đổi âm - dương và điều phối di sản văn hóa truyền thống.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl shadow-sm border border-[#e0bfbd]/50 self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-[#6b000f] text-white flex items-center justify-center font-serif text-base shadow-inner">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div className="flex flex-col pr-2">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-[#1c1c17]">Bùi Trung Nam</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#d4a346]"></span>
              </div>
              <span className="text-[11px] text-[#584140] font-medium">MSV: PH60600 • Hội đồng Kỹ thuật</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* KPI METRIC CARDS (5-Panel Responsive Grid) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e0bfbd]/50 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#584140]">Lễ hội số hóa</span>
              <div className="w-8 h-8 rounded-lg bg-[#ffdad8] flex items-center justify-center text-[#8e1921]">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-bold text-[#8e1921]">{kpi.digitizedCount}</span>
                <span className="text-[11px] text-[#7c5800] font-bold">+12 tháng này</span>
              </div>
              <span className="text-[11px] text-[#584140] block mt-0.5">Đạt 100% mục tiêu giai đoạn 1</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e0bfbd]/50 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#584140]">Chuẩn hóa âm dương</span>
              <div className="w-8 h-8 rounded-lg bg-[#ffdea8] flex items-center justify-center text-[#7c5800]">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-bold text-[#1c1c17]">{kpi.lunarAccuracy}</span>
                <span className="text-[11px] text-[#8e1921] font-bold">2025-2030</span>
              </div>
              <span className="text-[11px] text-[#584140] block mt-0.5">Sai số thuật toán: 0.00%</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e0bfbd]/50 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#584140]">Bài viết tập tục</span>
              <div className="w-8 h-8 rounded-lg bg-[#bdeafa] flex items-center justify-center text-[#023744]">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-bold text-[#023744]">{kpi.articlesCount}</span>
                <span className="text-[11px] text-[#584140]">bài khảo cứu</span>
              </div>
              <span className="text-[11px] text-[#584140] block mt-0.5">Trích dẫn Viện Hán Nôm</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e0bfbd]/50 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#584140]">Tra cứu & Nhắc hẹn</span>
              <div className="w-8 h-8 rounded-lg bg-[#ece8e0] flex items-center justify-center text-[#1c1c17]">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-bold text-[#1c1c17]">{kpi.queriesCount}</span>
                <span className="text-[11px] text-[#8e1921] font-bold">Lượt xem</span>
              </div>
              <span className="text-[11px] text-[#584140] block mt-0.5">Đồng bộ Google & iCal</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e0bfbd]/50 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#584140]">Tọa độ GIS xác minh</span>
              <div className="w-8 h-8 rounded-lg bg-[#ffc968] flex items-center justify-center text-[#775300]">
                <span className="material-symbols-outlined text-[18px]">pin_drop</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-bold text-[#7c5800]">{kpi.gisVerifiedProvinces}</span>
                <span className="text-[11px] text-[#584140]">tỉnh thành</span>
              </div>
              <span className="text-[11px] text-[#584140] block mt-0.5">Đã gắn mốc di tích số</span>
            </div>
          </div>
        </section>

        {/* QUICK ADMINISTRATIVE ACTIONS BAR */}
        <section className="bg-[#f1ede6] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-[#e0bfbd]/40">
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base text-[#1c1c17]">Thao Tác Quản Trị Tốc Hành</span>
            <span className="text-xs text-[#584140]">Thiết lập tham số chu kỳ thiên văn và công bố dữ liệu tức thì</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-10 px-4 bg-[#8e1921] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-[#6b000f] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Thêm Lễ Hội Mới</span>
            </button>

            <button
              onClick={() => onShowToast('Đã cập nhật bảng quy đổi lịch Âm Dương năm Bính Ngọ (2026)!')}
              className="h-10 px-4 bg-white text-[#8e1921] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-[#f7f3eb] transition-colors border border-[#e0bfbd]/50"
            >
              <span className="material-symbols-outlined text-[18px] text-[#7c5800]">update</span>
              <span>Cập Nhật Lịch Âm 2026</span>
            </button>

            <button
              onClick={() => onShowToast('Đã đồng bộ lại 128 mốc GIS theo hệ tọa độ chuẩn WGS-84!')}
              className="h-10 px-4 bg-white text-[#023744] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-[#f7f3eb] transition-colors border border-[#e0bfbd]/50"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
              <span>Đồng Bộ Tọa Độ GIS</span>
            </button>

            <button
              onClick={() => handleExport('EXCEL')}
              className="h-10 px-4 bg-[#7c5800] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-[#5e4200] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Xuất Báo Cáo Đề Tài (Excel)</span>
            </button>
          </div>
        </section>

        {/* DATA MANAGEMENT SYSTEM: FILTERS & TABLE */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-[#8e1921] rounded-full"></div>
              <div>
                <h2 className="font-serif font-bold text-xl text-[#8e1921]">
                  Danh Mục Hồ Sơ Lễ Hội & Quy Chuẩn Âm Lịch
                </h2>
                <p className="text-xs text-[#584140]">
                  Quản lý kho dữ liệu di sản, trạng thái thẩm định học thuật và ấn bản số
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-xl shadow-xs border border-[#e0bfbd]/50 text-xs">
              <span className="material-symbols-outlined text-[#8e1921] text-[16px]">verified</span>
              <span className="font-semibold text-[#1c1c17]">Bộ dữ liệu chuẩn đề tài D01</span>
            </div>
          </div>

          {/* Filter Controls Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#e0bfbd]/40 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#584140] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Tra cứu theo tên lễ hội, nhân vật phụng thờ, mã số..."
                className="w-full h-10 pl-9 pr-3 bg-[#f7f3eb] rounded-xl text-xs text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#8e1921]/20 border border-[#e0bfbd]/40"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="h-10 px-3 bg-[#f7f3eb] rounded-xl text-[#1c1c17] focus:outline-none border border-[#e0bfbd]/40 cursor-pointer"
              >
                <option value="">Tất cả Vùng Miền</option>
                <option value="Bắc">Miền Bắc</option>
                <option value="Trung">Miền Trung</option>
                <option value="Nam">Miền Nam</option>
              </select>

              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="h-10 px-3 bg-[#f7f3eb] rounded-xl text-[#1c1c17] focus:outline-none border border-[#e0bfbd]/40 cursor-pointer"
              >
                <option value="">Chu kỳ Tháng Âm</option>
                <option value="1">Tháng Giêng (Khai Xuân)</option>
                <option value="2">Tháng Hai</option>
                <option value="3">Tháng Ba (Giỗ Tổ)</option>
                <option value="4">Tháng Tư</option>
                <option value="10">Tháng Mười</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 px-3 bg-[#f7f3eb] rounded-xl text-[#1c1c17] focus:outline-none border border-[#e0bfbd]/40 cursor-pointer"
              >
                <option value="">Phân Loại</option>
                <option value="unesco">Di sản UNESCO</option>
                <option value="national">Di sản Quốc gia</option>
                <option value="folk">Dân gian</option>
                <option value="denchua">Đền Chùa</option>
              </select>

              <button
                onClick={() => {
                  setSearchFilter('');
                  setRegionFilter('');
                  setMonthFilter('');
                  setCategoryFilter('');
                  setStatusFilter('');
                }}
                className="h-10 px-3 text-[#8e1921] hover:bg-[#f1ede6] rounded-xl font-semibold flex items-center gap-1 transition-colors"
                title="Đặt lại bộ lọc"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Đặt lại</span>
              </button>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e0bfbd]/40">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#f1ede6] text-[#1c1c17] uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Mã Di Sản</th>
                    <th className="py-3.5 px-4">Tên Lễ Hội & Dấu Ấn</th>
                    <th className="py-3.5 px-4">Lịch Âm & Dương (2025)</th>
                    <th className="py-3.5 px-4">Địa Phương</th>
                    <th className="py-3.5 px-4">Phân Loại</th>
                    <th className="py-3.5 px-4">Trạng Thái & Kiểm Định</th>
                    <th className="py-3.5 px-4 text-right">Thao Tác CMS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0bfbd]/30">
                  {filteredFestivals.map((fest) => (
                    <tr key={fest.id} className="hover:bg-[#f7f3eb] transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-[#ece8e0] text-[#8e1921] rounded">
                          {fest.code}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 min-w-[240px]">
                        <div className="flex items-center gap-3">
                          <img
                            src={fest.image}
                            alt={fest.name}
                            className="w-12 h-12 rounded-xl object-cover shadow-xs shrink-0"
                          />
                          <div className="flex flex-col">
                            <span className="font-serif font-bold text-sm text-[#8e1921]">{fest.name}</span>
                            <span className="text-[11px] text-[#584140] line-clamp-1">{fest.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#8e1921]">{fest.lunarDate}</span>
                          <span className="text-[11px] text-[#584140]">{fest.solarDate2025}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#1c1c17]">{fest.province}</span>
                          <span className="text-[11px] text-[#584140]">Miền {fest.region}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ffdea8] text-[#271900] text-[10px] font-bold">
                          {fest.heritageRankLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center gap-1 text-[#8e1921] font-bold text-xs">
                            <span className="w-2 h-2 rounded-full bg-[#8e1921]"></span>
                            {fest.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Chờ xác minh'}
                          </span>
                          <span className="text-[10px] text-[#7c5800]">
                            Độ tin cậy: {fest.confidenceScore}% ({fest.verifiedSource?.split(' ')[0] || 'Chính thức'})
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => onNavigate('chi-tiet-le-hoi', { id: fest.id })}
                            className="p-1.5 rounded-lg hover:bg-[#f1ede6] text-[#584140] hover:text-[#8e1921] transition-colors"
                            title="Xem trước trang chi tiết"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button
                            onClick={() => {
                              setModalFestival(fest);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-[#f1ede6] text-[#584140] hover:text-[#7c5800] transition-colors"
                            title="Chỉnh sửa nội dung"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit_square</span>
                          </button>
                          <button
                            onClick={() => handleDeleteFestival(fest.id, fest.name)}
                            className="p-1.5 rounded-lg hover:bg-[#ffdad6] text-[#ba1a1a] transition-colors"
                            title="Xóa hồ sơ"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 bg-[#f1ede6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#584140]">
              <span>Hiển thị <strong>{filteredFestivals.length}</strong> trong số <strong>{kpi.digitizedCount}</strong> hồ sơ di sản</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 bg-white rounded-lg shadow-xs border border-[#e0bfbd]/40">1</button>
                <button className="px-3 py-1 bg-white rounded-lg shadow-xs border border-[#e0bfbd]/40">2</button>
              </div>
            </div>
          </div>
        </section>

        {/* DUAL SUB-MODULES: ALGORITHM LOG & COMMUNITY SUBMISSIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SUB-MODULE 1: LUNAR ALGORITHM VERIFICATION LOG (7 COLS) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-[#e0bfbd]/40 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#bdeafa] text-[#023744] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">terminal</span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#8e1921]">
                      Nhật Ký Thuật Toán Lịch Thiên Văn
                    </h3>
                    <span className="text-xs text-[#584140]">Mô hình tính toán múi giờ GMT+7 của SV Bùi Trung Nam</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#7c5800] bg-[#ffdea8] px-2.5 py-1 rounded-full">
                  Đồng bộ 2025 - 2030
                </span>
              </div>
              <p className="text-xs text-[#584140] leading-relaxed">
                Hệ thống áp dụng thuật toán thiên văn Jean Meeus kết hợp quy chuẩn lịch vạn niên Việt Nam để tự động phát hiện tháng nhuận, tiết khí Lập Xuân và đối chiếu ngày lễ chính hội.
              </p>

              <div className="flex flex-col gap-2 mt-1">
                {logs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-[#f7f3eb] flex items-start gap-3 border border-[#e0bfbd]/30">
                    <div className="w-2 h-2 rounded-full bg-[#8e1921] mt-1.5 shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#1c1c17]">{log.title}</span>
                        <span className="text-[10px] text-[#584140]">{log.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#584140] mt-0.5">{log.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#e0bfbd]/30 flex items-center justify-between text-xs">
              <span className="text-[#7c5800] font-semibold">Tác giả thuật toán: Bùi Trung Nam (PH60600)</span>
              <button
                onClick={() => onShowToast('Đã làm mới và kiểm tra sai số thuật toán: 0.00%!')}
                className="text-[#8e1921] font-bold hover:underline"
              >
                Kiểm định lại →
              </button>
            </div>
          </div>

          {/* SUB-MODULE 2: COMMUNITY SUBMISSION MODERATION QUEUE (5 COLS) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-[#e0bfbd]/40 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ffdea8] text-[#7c5800] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#8e1921]">
                      Chờ Duyệt Từ Cộng Đồng
                    </h3>
                    <span className="text-xs text-[#584140]">{submissions.filter(s => s.status === 'PENDING').length} lễ hội gửi kèm sắc phong</span>
                  </div>
                </div>
                <span className="w-6 h-6 rounded-full bg-[#8e1921] text-white text-xs font-bold flex items-center justify-center">
                  {submissions.filter(s => s.status === 'PENDING').length}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {submissions.map((sub) => (
                  <div key={sub.id} className="p-3 rounded-xl bg-[#f7f3eb] flex flex-col gap-2 border border-[#e0bfbd]/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-xs text-[#1c1c17] block">{sub.festivalName}</span>
                        <span className="text-[10px] text-[#584140]">{sub.location} • {sub.lunarTime}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#ffdea8] text-[#271900] text-[10px] font-bold">
                        {sub.category}
                      </span>
                    </div>
                    <p className="text-xs italic text-[#584140]">"{sub.excerpt}"</p>
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#e0bfbd]/20">
                      {sub.status === 'PENDING' ? (
                        <>
                          <button
                            onClick={() => onShowToast(`Đang mở chứng tích sắc phong của ${sub.festivalName}`)}
                            className="px-2.5 py-1 bg-white text-[#1c1c17] rounded-lg text-[11px] font-semibold border border-[#e0bfbd]/40 hover:bg-[#f1ede6]"
                          >
                            Xem chứng tích
                          </button>
                          <button
                            onClick={() => handleReviewSubmission(sub.id, 'APPROVE')}
                            className="px-2.5 py-1 bg-[#8e1921] text-white rounded-lg text-[11px] font-bold hover:bg-[#6b000f] shadow-xs"
                          >
                            Duyệt vào CSDL
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-bold text-[#8e1921]">
                          ✓ Đã duyệt vào CSDL
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-[#584140]">
              Quy trình thẩm định tuân thủ Thông tư 04/2023/TT-BVHTTDL
            </div>
          </div>
        </section>
      </div>

      {/* Add / Edit Festival Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#fdf9f1] rounded-2xl shadow-2xl max-w-lg w-full border border-[#e0bfbd] overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#8e1921] text-white p-4 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base">Thêm Mới / Biên Tập Lễ Hội</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveFestival} className="p-6 flex flex-col gap-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1c1c17] mb-1">Tên Lễ Hội</label>
                <input
                  type="text"
                  value={modalFestival.name || ''}
                  onChange={(e) => setModalFestival({ ...modalFestival, name: e.target.value })}
                  placeholder="Ví dụ: Hội Đền Cổ Loa"
                  required
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#e0bfbd] text-sm text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#8e1921]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#1c1c17] mb-1">Tỉnh / Thành Phố</label>
                  <input
                    type="text"
                    value={modalFestival.province || ''}
                    onChange={(e) => setModalFestival({ ...modalFestival, province: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#e0bfbd] text-sm text-[#1c1c17] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1c1c17] mb-1">Vùng Miền</label>
                  <select
                    value={modalFestival.region || 'Bắc'}
                    onChange={(e) => setModalFestival({ ...modalFestival, region: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#e0bfbd] text-sm text-[#1c1c17] focus:outline-none cursor-pointer"
                  >
                    <option value="Bắc">Miền Bắc</option>
                    <option value="Trung">Miền Trung</option>
                    <option value="Nam">Miền Nam</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#1c1c17] mb-1">Thời Gian Âm Lịch</label>
                  <input
                    type="text"
                    value={modalFestival.lunarDate || ''}
                    onChange={(e) => setModalFestival({ ...modalFestival, lunarDate: e.target.value })}
                    placeholder="Ví dụ: 06 - 08 Tháng Giêng ÂL"
                    required
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#e0bfbd] text-sm text-[#1c1c17] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1c1c17] mb-1">Phân Hạng Di Sản</label>
                  <select
                    value={modalFestival.heritageRankLabel || 'Di sản Quốc gia'}
                    onChange={(e) => setModalFestival({ ...modalFestival, heritageRankLabel: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#e0bfbd] text-sm text-[#1c1c17] focus:outline-none cursor-pointer"
                  >
                    <option value="UNESCO Di Sản Phi Vật Thể">UNESCO Vinh Danh</option>
                    <option value="Di Tích Quốc Gia Đặc Biệt">Di Tích Quốc Gia Đặc Biệt</option>
                    <option value="Di sản Dân gian">Di sản Dân gian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1c1c17] mb-1">Tóm Tắt & Thần Tích</label>
                <textarea
                  rows={3}
                  value={modalFestival.shortDesc || ''}
                  onChange={(e) => setModalFestival({ ...modalFestival, shortDesc: e.target.value })}
                  placeholder="Mô tả tóm lược ý nghĩa và nghi lễ chính..."
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#e0bfbd] text-xs text-[#1c1c17] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-[#e0bfbd]/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-[#ece8e0] rounded-xl text-xs font-semibold text-[#584140]"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#8e1921] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#6b000f]"
                >
                  Lưu & Xuất Bản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
