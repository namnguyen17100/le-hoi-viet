/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Spring Boot REST API Client & Service Gateway
 * Designed for seamless integration with Spring Boot 3.x, Spring Security & JWT
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('lehoiviet_jwt_token');
  }

  public setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('lehoiviet_jwt_token', token);
    } else {
      localStorage.removeItem('lehoiviet_jwt_token');
    }
  }

  public getToken(): string | null {
    return this.token || localStorage.getItem('lehoiviet_jwt_token');
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const currentToken = this.getToken();
    if (currentToken) {
      headers['Authorization'] = `Bearer ${currentToken}`;
    }
    return headers;
  }

  // Simulated latency for realistic frontend UX
  public async simulateNetwork<T>(data: T, delayMs: number = 100): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
  }

  public async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch {
      // In current prototype stage, mock services will be called directly
      throw new Error(`Endpoint ${endpoint} not available in mock mode`);
    }
  }

  public async post<T, B>(endpoint: string, body: B): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch {
      throw new Error(`Endpoint ${endpoint} not available in mock mode`);
    }
  }
}

export const apiClient = new ApiClient();
