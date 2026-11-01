import { CulturalArticle, GlossaryTerm, FolkGame } from '../types';
import { CULTURAL_ARTICLES, GLOSSARY_TERMS, FOLK_GAMES } from './mockData';
import { apiClient } from './apiClient';

class ArticleService {
  private articles: CulturalArticle[] = [...CULTURAL_ARTICLES];
  private glossary: GlossaryTerm[] = [...GLOSSARY_TERMS];
  private games: FolkGame[] = [...FOLK_GAMES];

  public async getArticles(categoryKey?: string, search?: string): Promise<CulturalArticle[]> {
    let list = [...this.articles];
    if (categoryKey && categoryKey !== 'tat-ca') {
      list = list.filter(a => a.categoryKey === categoryKey);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
    }
    return apiClient.simulateNetwork(list);
  }

  public async getArticleById(id: string): Promise<CulturalArticle | undefined> {
    const art = this.articles.find(a => a.id === id || a.slug === id);
    return apiClient.simulateNetwork(art);
  }

  public async getGlossaryTerms(alphabet?: string, search?: string): Promise<GlossaryTerm[]> {
    let list = [...this.glossary];
    if (alphabet && alphabet !== 'Tất cả') {
      list = list.filter(g => g.alphabet.toUpperCase() === alphabet.toUpperCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(g => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q));
    }
    return apiClient.simulateNetwork(list);
  }

  public async getFolkGames(): Promise<FolkGame[]> {
    return apiClient.simulateNetwork(this.games);
  }
}

export const articleService = new ArticleService();
