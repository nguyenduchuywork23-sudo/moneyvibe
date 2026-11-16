/**
 * Bai 20: Chien luoc Semantic Cache va Prompt Caching
 */
export class SemanticCacheManager {
  private static cache = new Map<string, { response: string; expiresAt: number }>();
  private static TTL_MS = 1000 * 60 * 60; // 1 hour

  private static hashKey(prompt: string): string {
    let hash = 0;
    for (let i = 0; i < prompt.length; i++) {
      hash = (hash << 5) - hash + prompt.charCodeAt(i);
      hash |= 0;
    }
    return `cache_${Math.abs(hash)}`;
  }

  public static get(prompt: string): string | null {
    const key = this.hashKey(prompt);
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return item.response;
  }

  public static set(prompt: string, response: string): void {
    const key = this.hashKey(prompt);
    this.cache.set(key, {
      response,
      expiresAt: Date.now() + this.TTL_MS,
    });
  }
}
