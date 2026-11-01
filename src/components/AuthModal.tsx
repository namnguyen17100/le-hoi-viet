import React, { useState } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  onShowToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  onShowToast,
}) => {
  const [username, setUsername] = useState('nam.bt');
  const [password, setPassword] = useState('password123');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await authService.login(username);
      onUserChange(user);
      onShowToast(`Đăng nhập thành công với vai trò ${user.role}!`);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    onUserChange(null);
    onShowToast('Đã đăng xuất phiên làm việc.');
    onClose();
  };

  const handleSwitchToSuperAdmin = async () => {
    const user = await authService.login('nam.bt');
    onUserChange(user);
    onShowToast('Đã chuyển quyền: Super Admin (Bùi Trung Nam - PH60600)');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#fdf9f1] rounded-2xl shadow-2xl max-w-md w-full border border-[#e0bfbd] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#8e1921] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-[#ffdea8]">security</span>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Cổng Xác Thực JWT & Phân Quyền</h3>
              <p className="text-xs text-white/80">Spring Security 6.x • JWT Bearer Token</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {currentUser ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 bg-[#f1ede6] rounded-xl border border-[#e0bfbd]/50">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#d4a346]"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1c1c17] text-sm">{currentUser.fullName}</span>
                    <span className="bg-[#8e1921] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {currentUser.role}
                    </span>
                  </div>
                  <span className="text-xs text-[#584140]">MSV: {currentUser.studentId} • {currentUser.email}</span>
                </div>
              </div>

              {/* JWT Token preview */}
              <div className="p-3 bg-white rounded-lg border border-[#e0bfbd]/60 text-xs flex flex-col gap-1">
                <span className="font-semibold text-[#7c5800] uppercase text-[10px] tracking-wider">
                  JWT Header: Authorization: Bearer ...
                </span>
                <p className="font-mono text-[10px] text-[#584140] break-all bg-[#f7f3eb] p-1.5 rounded">
                  {currentUser.token}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2 px-3 rounded-lg border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] text-xs font-semibold transition-colors"
                >
                  Đăng xuất
                </button>
                <button
                  onClick={handleSwitchToSuperAdmin}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#8e1921] text-white hover:bg-[#6b000f] text-xs font-semibold transition-colors shadow-sm"
                >
                  Gia hạn phiên Admin
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1c1c17] mb-1">Tài khoản</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#e0bfbd] rounded-lg text-sm text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#8e1921]/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1c17] mb-1">Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#e0bfbd] rounded-lg text-sm text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#8e1921]/30"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-[#8e1921] hover:bg-[#6b000f] text-white rounded-lg font-semibold text-sm transition-colors shadow-sm mt-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Đang xác thực JWT...' : 'Đăng nhập (Spring Security)'}
              </button>
            </form>
          )}

          {/* Quick Demo Credentials */}
          <div className="pt-3 border-t border-[#e0bfbd]/40">
            <span className="text-[11px] uppercase font-bold text-[#7c5800] block mb-2">
              Tài khoản mẫu (Đồ án D01):
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={handleSwitchToSuperAdmin}
                className="px-2.5 py-1.5 rounded-lg bg-[#f1ede6] hover:bg-[#ece8e0] text-[#8e1921] font-semibold border border-[#e0bfbd]/60 transition-colors"
              >
                Super Admin: Bùi Trung Nam (PH60600)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
