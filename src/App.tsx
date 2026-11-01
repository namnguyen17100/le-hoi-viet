import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { LunarCalendarPage } from './pages/LunarCalendarPage';
import { FestivalExplorePage } from './pages/FestivalExplorePage';
import { FestivalDetailPage } from './pages/FestivalDetailPage';
import { FestivalMapPage } from './pages/FestivalMapPage';
import { VietCulturePage } from './pages/VietCulturePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { authService } from './services/authService';
import { festivalService } from './services/festivalService';
import { User } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('trang-chu');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const [favoritesCount, setFavoritesCount] = useState<number>(5);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refreshFavoritesCount = async () => {
    const favs = await festivalService.getFavorites();
    setFavoritesCount(favs.length);
  };

  useEffect(() => {
    refreshFavoritesCount();
  }, [currentPage]);

  const handleNavigate = (page: string, params: Record<string, string> = {}) => {
    setCurrentPage(page);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    refreshFavoritesCount();
  };

  return (
    <div className="min-h-screen bg-[#fdf9f1] text-[#1c1c17] flex flex-col font-sans selection:bg-[#8e1921] selection:text-white">
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        favoritesCount={favoritesCount}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full pt-28 sm:pt-28">
        {currentPage === 'trang-chu' && (
          <HomePage onNavigate={handleNavigate} onShowToast={handleShowToast} />
        )}
        {currentPage === 'lich-am-duong' && (
          <LunarCalendarPage onNavigate={handleNavigate} onShowToast={handleShowToast} />
        )}
        {currentPage === 'kham-pha-le-hoi' && (
          <FestivalExplorePage
            onNavigate={handleNavigate}
            onShowToast={handleShowToast}
            initialQuery={routeParams.query || ''}
            initialRegion={routeParams.region || 'all'}
            initialMonth={routeParams.month || 'all'}
          />
        )}
        {currentPage === 'chi-tiet-le-hoi' && (
          <FestivalDetailPage
            festivalId={routeParams.id || 'lim'}
            onNavigate={handleNavigate}
            onShowToast={handleShowToast}
          />
        )}
        {currentPage === 'ban-do-le-hoi' && (
          <FestivalMapPage onNavigate={handleNavigate} onShowToast={handleShowToast} />
        )}
        {currentPage === 'van-hoa-viet' && (
          <VietCulturePage onNavigate={handleNavigate} onShowToast={handleShowToast} />
        )}
        {currentPage === 'quan-tri' && (
          <AdminDashboardPage onNavigate={handleNavigate} onShowToast={handleShowToast} />
        )}
        {currentPage === 'yeu-thich' && (
          <FavoritesPage onNavigate={handleNavigate} onShowToast={handleShowToast} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Spring Security / JWT Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChange={(user) => setCurrentUser(user)}
        onShowToast={handleShowToast}
      />

      {/* Interactive System Toast */}
      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
}
