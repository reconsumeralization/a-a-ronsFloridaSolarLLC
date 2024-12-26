export function formatBlogContent(content: string): string {
  // Remove extra whitespace and normalize line endings
  return content
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s+/gm, "");
}
