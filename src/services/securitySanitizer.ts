/**
 * Bai 21: Phong chong Prompt Injection va lam sach du lieu dau vao
 */
export class SecuritySanitizer {
  private static DANGEROUS_PATTERNS = [
    /ignore\s+all\s+previous\s+instructions/i,
    /system\s+prompt/i,
    /you\s+are\s+now/i,
    /disregard/i,
    /<script.*?>.*?<\/script>/gis,
  ];

  public static sanitizeInput(text: string): string {
    if (!text) return '';
    let sanitized = text.trim();
    for (const pattern of this.DANGEROUS_PATTERNS) {
      sanitized = sanitized.replace(pattern, '[BLOCKED_INJECTION_PATTERN]');
    }
    return sanitized;
  }

  public static wrapWithXMLTags(tag: string, content: string): string {
    const cleanContent = this.sanitizeInput(content);
    return `<${tag}>\n${cleanContent}\n</${tag}>`;
  }
}
