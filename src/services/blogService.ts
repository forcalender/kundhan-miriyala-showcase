
// Mock API service - replace with your actual CMS/API calls
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  content?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  slug?: string;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface BlogPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
}

// Mock data - replace with actual CMS data
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building AI-Powered Web Applications",
    excerpt: "Exploring the integration of machine learning models into modern web frameworks for enhanced user experiences.",
    date: "Dec 10, 2024",
    readTime: "5 min read",
    category: "AI/ML",
    gradient: "from-purple-400 to-pink-400",
    tags: ["AI", "Machine Learning", "Web Development", "React"],
    featured: true,
    author: "John Doe",
    slug: "building-ai-powered-web-applications"
  },
  {
    id: 2,
    title: "The Future of Accessible Design",
    excerpt: "How inclusive design principles are shaping the next generation of digital products and user interfaces.",
    date: "Nov 28, 2024",
    readTime: "7 min read",
    category: "Design",
    gradient: "from-blue-400 to-cyan-400",
    tags: ["Accessibility", "UX Design", "Inclusive Design"],
    featured: true,
    author: "Jane Smith",
    slug: "future-of-accessible-design"
  },
  {
    id: 3,
    title: "Optimizing React Performance",
    excerpt: "Advanced techniques for building lightning-fast React applications with modern optimization strategies.",
    date: "Nov 15, 2024",
    readTime: "6 min read",
    category: "Development",
    gradient: "from-green-400 to-emerald-400",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    featured: false,
    author: "Mike Johnson",
    slug: "optimizing-react-performance"
  },
  {
    id: 4,
    title: "Data Science in Practice",
    excerpt: "Real-world applications of data science techniques in solving complex business problems.",
    date: "Oct 30, 2024",
    readTime: "8 min read",
    category: "Data Science",
    gradient: "from-orange-400 to-red-400",
    tags: ["Data Science", "Analytics", "Python", "Business Intelligence"],
    featured: false,
    author: "Sarah Wilson",
    slug: "data-science-in-practice"
  },
  {
    id: 5,
    title: "Microservices Architecture Patterns",
    excerpt: "Best practices for designing scalable microservices systems with modern cloud technologies.",
    date: "Oct 15, 2024",
    readTime: "9 min read",
    category: "Development",
    gradient: "from-indigo-400 to-purple-400",
    tags: ["Microservices", "Architecture", "Cloud", "DevOps"],
    featured: false,
    author: "David Brown",
    slug: "microservices-architecture-patterns"
  },
  {
    id: 6,
    title: "Machine Learning Model Deployment",
    excerpt: "A comprehensive guide to deploying ML models in production environments with monitoring and scaling.",
    date: "Sep 28, 2024",
    readTime: "12 min read",
    category: "AI/ML",
    gradient: "from-teal-400 to-green-400",
    tags: ["MLOps", "Deployment", "Monitoring", "Production"],
    featured: false,
    author: "Emily Davis",
    slug: "machine-learning-model-deployment"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class BlogService {
  private static readonly CACHE_KEY = 'blog_posts_cache';
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Get all blog posts with filtering and pagination
  static async getBlogPosts(params: BlogPostsParams = {}): Promise<BlogPostsResponse> {
    await delay(300); // Simulate API call

    const { page = 1, limit = 4, category, featured } = params;
    
    let filteredPosts = [...mockBlogPosts];

    // Apply filters
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    if (featured !== undefined) {
      filteredPosts = filteredPosts.filter(post => post.featured === featured);
    }

    // Calculate pagination
    const totalCount = filteredPosts.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    return {
      posts: paginatedPosts,
      totalCount,
      totalPages,
      currentPage: page
    };
  }

  // Get a single blog post by ID
  static async getBlogPost(id: number): Promise<BlogPost | null> {
    await delay(200);
    
    const post = mockBlogPosts.find(post => post.id === id);
    return post || null;
  }

  // Get featured blog posts
  static async getFeaturedPosts(limit: number = 2): Promise<BlogPost[]> {
    await delay(200);
    
    return mockBlogPosts.filter(post => post.featured).slice(0, limit);
  }

  // Get categories
  static async getCategories(): Promise<string[]> {
    await delay(100);
    
    const categories = Array.from(new Set(mockBlogPosts.map(post => post.category)));
    return ['all', ...categories];
  }

  // Search blog posts
  static async searchPosts(query: string): Promise<BlogPost[]> {
    await delay(300);
    
    const lowerQuery = query.toLowerCase();
    return mockBlogPosts.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}
