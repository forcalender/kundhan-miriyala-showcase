
export const calculateReadTime = (content: string): string => {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Count words (split by whitespace and filter empty strings)
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Average reading speed is 200-250 words per minute, we'll use 225
  const wordsPerMinute = 225;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readTimeMinutes} min read`;
};
