import { SystemLog, CommunitySubmission } from '../types';
import { SYSTEM_LOGS, COMMUNITY_SUBMISSIONS } from './mockData';
import { festivalService } from './festivalService';
import { apiClient } from './apiClient';

class AdminService {
  private logs: SystemLog[] = [...SYSTEM_LOGS];
  private submissions: CommunitySubmission[] = [...COMMUNITY_SUBMISSIONS];

  public async getKpiMetrics() {
    const festivals = await festivalService.getFestivals();
    return apiClient.simulateNetwork({
      digitizedCount: festivals.length,
      lunarAccuracy: '100%',
      articlesCount: 46,
      queriesCount: '45.2k',
      gisVerifiedProvinces: '63/63',
      pendingCount: this.submissions.filter(s => s.status === 'PENDING').length
    });
  }

  public async getSystemLogs(): Promise<SystemLog[]> {
    return apiClient.simulateNetwork(this.logs);
  }

  public async getCommunitySubmissions(): Promise<CommunitySubmission[]> {
    return apiClient.simulateNetwork(this.submissions);
  }

  public async reviewSubmission(id: string, action: 'APPROVE' | 'REJECT'): Promise<void> {
    const sub = this.submissions.find(s => s.id === id);
    if (sub) {
      sub.status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
      if (action === 'APPROVE') {
        // Automatically create festival record
        await festivalService.createFestival({
          name: sub.festivalName,
          location: sub.location,
          lunarDate: sub.lunarTime,
          shortDesc: sub.excerpt,
          categoryLabel: sub.category,
          status: 'PUBLISHED',
          confidenceScore: 92
        });
      }
    }
    return apiClient.simulateNetwork(undefined);
  }

  public exportReport(format: 'EXCEL' | 'PDF' | 'JSON'): void {
    const filename = `Bao_Cao_De_Tai_D01_Le_Hoi_Viet_${new Date().toISOString().split('T')[0]}.${format === 'EXCEL' ? 'xlsx' : format === 'PDF' ? 'pdf' : 'json'}`;
    const dummyBlob = new Blob(
      [JSON.stringify({
        project: 'Đồ án tốt nghiệp D01: Lịch lễ hội truyền thống theo âm lịch',
        student: 'Bùi Trung Nam (MSV: PH60600)',
        academicUnit: 'Học viện Công nghệ & Truyền thông',
        exportDate: new Date().toISOString(),
        format: format,
        recordCount: 128
      }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(dummyBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const adminService = new AdminService();
