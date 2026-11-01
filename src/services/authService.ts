import { User } from '../types';
import { CURRENT_USER } from './mockData';
import { apiClient } from './apiClient';

class AuthService {
  private user: User | null = null;

  constructor() {
    const saved = localStorage.getItem('lehoiviet_user');
    if (saved) {
      try {
        this.user = JSON.parse(saved);
        if (this.user?.token) {
          apiClient.setToken(this.user.token);
        }
      } catch {
        this.user = CURRENT_USER;
        apiClient.setToken(CURRENT_USER.token);
      }
    } else {
      this.user = CURRENT_USER;
      apiClient.setToken(CURRENT_USER.token);
    }
  }

  public getCurrentUser(): User | null {
    return this.user;
  }

  public async login(username: string): Promise<User> {
    // Simulated Spring Security JWT authentication
    const user: User = {
      ...CURRENT_USER,
      username: username || 'nam.bt',
      token: `jwt_${Date.now()}_spring_security_authorized`
    };
    this.user = user;
    localStorage.setItem('lehoiviet_user', JSON.stringify(user));
    apiClient.setToken(user.token);
    return apiClient.simulateNetwork(user);
  }

  public async logout(): Promise<void> {
    this.user = null;
    localStorage.removeItem('lehoiviet_user');
    apiClient.setToken(null);
    return apiClient.simulateNetwork(undefined);
  }

  public isAuthenticated(): boolean {
    return !!this.user;
  }

  public isSuperAdmin(): boolean {
    return this.user?.role === 'SUPER_ADMIN';
  }
}

export const authService = new AuthService();
