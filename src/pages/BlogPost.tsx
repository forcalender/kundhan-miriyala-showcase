
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

const blogPostsData = [
  {
    id: 1,
    title: "Building AI-Powered Web Applications",
    excerpt: "Exploring the integration of machine learning models into modern web frameworks for enhanced user experiences.",
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence is revolutionizing the way we build web applications. From chatbots to recommendation systems, AI-powered features are becoming essential for creating engaging user experiences.</p>
      
      <h2>Key Technologies</h2>
      <p>Modern AI web applications leverage several key technologies:</p>
      <ul>
        <li><strong>TensorFlow.js</strong> - For running machine learning models in the browser</li>
        <li><strong>OpenAI APIs</strong> - For natural language processing and generation</li>
        <li><strong>WebRTC</strong> - For real-time communication and data processing</li>
      </ul>
      
      <h2>Implementation Strategies</h2>
      <p>When building AI-powered web applications, consider these implementation strategies:</p>
      <ol>
        <li>Start with pre-trained models to reduce development time</li>
        <li>Implement proper error handling for AI service failures</li>
        <li>Use progressive enhancement to ensure accessibility</li>
        <li>Optimize for performance with lazy loading and caching</li>
      </ol>
      
      <h2>Best Practices</h2>
      <p>To ensure your AI-powered web application is robust and user-friendly:</p>
      <ul>
        <li>Always provide fallback options when AI services are unavailable</li>
        <li>Implement proper loading states and user feedback</li>
        <li>Consider privacy implications and data handling</li>
        <li>Test thoroughly across different devices and network conditions</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building AI-powered web applications opens up exciting possibilities for creating more intelligent and responsive user experiences. By following best practices and leveraging the right technologies, developers can create applications that truly enhance user productivity and engagement.</p>
    `,
    date: "Dec 10, 2024",
    readTime: "5 min read",
    category: "AI/ML",
    gradient: "from-purple-400 to-pink-400",
    tags: ["AI", "Machine Learning", "Web Development", "React"],
    author: "Kyle Morris",
    featured: true
  },
  {
    id: 2,
    title: "The Future of Accessible Design",
    excerpt: "How inclusive design principles are shaping the next generation of digital products and user interfaces.",
    content: `
      <h2>Understanding Accessibility</h2>
      <p>Accessible design is not just about compliance—it's about creating inclusive experiences that work for everyone. As we move toward a more connected world, accessibility becomes a fundamental requirement, not an afterthought.</p>
      
      <h2>Core Principles</h2>
      <p>The foundation of accessible design rests on four key principles:</p>
      <ul>
        <li><strong>Perceivable</strong> - Information must be presentable in ways users can perceive</li>
        <li><strong>Operable</strong> - Interface components must be operable by all users</li>
        <li><strong>Understandable</strong> - Information and UI operation must be understandable</li>
        <li><strong>Robust</strong> - Content must be robust enough for various assistive technologies</li>
      </ul>
      
      <h2>Modern Accessibility Tools</h2>
      <p>Today's developers have access to powerful tools for creating accessible experiences:</p>
      <ul>
        <li>Screen reader testing tools</li>
        <li>Color contrast analyzers</li>
        <li>Keyboard navigation testers</li>
        <li>Automated accessibility scanners</li>
      </ul>
      
      <h2>Design Systems and Accessibility</h2>
      <p>Modern design systems are incorporating accessibility from the ground up. This approach ensures that accessible design patterns are reusable and consistently applied across products.</p>
      
      <h2>The Business Case</h2>
      <p>Accessible design benefits everyone:</p>
      <ul>
        <li>Expands your potential user base</li>
        <li>Improves SEO and discoverability</li>
        <li>Reduces legal risks</li>
        <li>Enhances overall user experience</li>
      </ul>
      
      <h2>Looking Forward</h2>
      <p>The future of accessible design lies in proactive inclusion rather than reactive accommodation. By building accessibility into our design process from day one, we create better products for everyone.</p>
    `,
    date: "Nov 28, 2024",
    readTime: "7 min read",
    category: "Design",
    gradient: "from-blue-400 to-cyan-400",
    tags: ["Accessibility", "UX Design", "Inclusive Design"],
    author: "Kyle Morris",
    featured: true
  },
  {
    id: 3,
    title: "Optimizing React Performance",
    excerpt: "Advanced techniques for building lightning-fast React applications with modern optimization strategies.",
    content: `
      <h2>Performance Fundamentals</h2>
      <p>React performance optimization is crucial for delivering smooth user experiences. Understanding React's rendering behavior is the first step toward building performant applications.</p>
      
      <h2>Common Performance Bottlenecks</h2>
      <p>Identifying performance issues early can save significant development time:</p>
      <ul>
        <li>Unnecessary re-renders</li>
        <li>Large bundle sizes</li>
        <li>Unoptimized images and assets</li>
        <li>Inefficient state management</li>
      </ul>
      
      <h2>Optimization Techniques</h2>
      <p>Key strategies for optimizing React applications:</p>
      <ol>
        <li><strong>Memoization</strong> - Use React.memo, useMemo, and useCallback wisely</li>
        <li><strong>Code Splitting</strong> - Implement lazy loading with React.lazy</li>
        <li><strong>Virtual Scrolling</strong> - Handle large lists efficiently</li>
        <li><strong>Image Optimization</strong> - Use modern formats and lazy loading</li>
      </ol>
      
      <h2>Modern React Features</h2>
      <p>React 18 introduces powerful new features for performance:</p>
      <ul>
        <li>Concurrent rendering</li>
        <li>Automatic batching</li>
        <li>Suspense improvements</li>
        <li>useDeferredValue and useTransition hooks</li>
      </ul>
      
      <h2>Measuring Performance</h2>
      <p>Tools and techniques for monitoring React performance:</p>
      <ul>
        <li>React DevTools Profiler</li>
        <li>Chrome DevTools Performance tab</li>
        <li>Web Vitals metrics</li>
        <li>Bundle analyzers</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Remember these key principles when optimizing React applications:</p>
      <ul>
        <li>Measure before optimizing</li>
        <li>Focus on user-perceived performance</li>
        <li>Don't over-optimize prematurely</li>
        <li>Consider the trade-offs of each optimization</li>
      </ul>
    `,
    date: "Nov 15, 2024",
    readTime: "6 min read",
    category: "Development",
    gradient: "from-green-400 to-emerald-400",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    author: "Kyle Morris",
    featured: false
  },
  {
    id: 4,
    title: "Data Science in Practice",
    excerpt: "Real-world applications of data science techniques in solving complex business problems.",
    content: `
      <h2>The Data Science Landscape</h2>
      <p>Data science has evolved from a niche field to a critical business function. Organizations across industries are leveraging data to drive decision-making and create competitive advantages.</p>
      
      <h2>Key Data Science Applications</h2>
      <p>Real-world applications span multiple domains:</p>
      <ul>
        <li><strong>Predictive Analytics</strong> - Forecasting trends and behaviors</li>
        <li><strong>Customer Segmentation</strong> - Understanding user groups and preferences</li>
        <li><strong>Fraud Detection</strong> - Identifying suspicious activities and patterns</li>
        <li><strong>Recommendation Systems</strong> - Personalizing user experiences</li>
      </ul>
      
      <h2>The Data Science Process</h2>
      <p>A systematic approach to data science projects:</p>
      <ol>
        <li>Problem definition and goal setting</li>
        <li>Data collection and exploration</li>
        <li>Data cleaning and preprocessing</li>
        <li>Model development and validation</li>
        <li>Deployment and monitoring</li>
      </ol>
      
      <h2>Tools and Technologies</h2>
      <p>Modern data science toolkit includes:</p>
      <ul>
        <li><strong>Python</strong> - Primary programming language for data science</li>
        <li><strong>R</strong> - Statistical computing and graphics</li>
        <li><strong>SQL</strong> - Database querying and data manipulation</li>
        <li><strong>Jupyter Notebooks</strong> - Interactive development environment</li>
        <li><strong>Cloud Platforms</strong> - Scalable computing and storage</li>
      </ul>
      
      <h2>Challenges and Solutions</h2>
      <p>Common challenges in data science projects:</p>
      <ul>
        <li>Data quality and availability issues</li>
        <li>Model interpretability and bias</li>
        <li>Scalability and performance concerns</li>
        <li>Integration with existing systems</li>
      </ul>
      
      <h2>Future Trends</h2>
      <p>The future of data science is shaped by:</p>
      <ul>
        <li>AutoML and democratization of ML</li>
        <li>Edge computing and real-time analytics</li>
        <li>Ethical AI and responsible data use</li>
        <li>Cross-functional collaboration and domain expertise</li>
      </ul>
    `,
    date: "Oct 30, 2024",
    readTime: "8 min read",
    category: "Data Science",
    gradient: "from-orange-400 to-red-400",
    tags: ["Data Science", "Analytics", "Python", "Business Intelligence"],
    author: "Kyle Morris",
    featured: false
  },
  {
    id: 5,
    title: "Microservices Architecture Patterns",
    excerpt: "Best practices for designing scalable microservices systems with modern cloud technologies.",
    content: `
      <h2>Understanding Microservices</h2>
      <p>Microservices architecture represents a fundamental shift from monolithic applications to distributed systems. This approach offers greater flexibility, scalability, and maintainability for complex applications.</p>
      
      <h2>Core Principles</h2>
      <p>Successful microservices implementations follow these principles:</p>
      <ul>
        <li><strong>Single Responsibility</strong> - Each service handles one business capability</li>
        <li><strong>Decentralized</strong> - Services manage their own data and business logic</li>
        <li><strong>Fault Tolerant</strong> - Designed to handle failures gracefully</li>
        <li><strong>Observable</strong> - Comprehensive monitoring and logging</li>
      </ul>
      
      <h2>Common Patterns</h2>
      <p>Essential patterns for microservices architecture:</p>
      <ol>
        <li><strong>API Gateway</strong> - Single entry point for client requests</li>
        <li><strong>Service Discovery</strong> - Dynamic service location and registration</li>
        <li><strong>Circuit Breaker</strong> - Preventing cascading failures</li>
        <li><strong>Event Sourcing</strong> - Storing state changes as events</li>
        <li><strong>CQRS</strong> - Separating command and query responsibilities</li>
      </ol>
      
      <h2>Technology Stack</h2>
      <p>Modern microservices leverage various technologies:</p>
      <ul>
        <li><strong>Containers</strong> - Docker for packaging and deployment</li>
        <li><strong>Orchestration</strong> - Kubernetes for container management</li>
        <li><strong>Service Mesh</strong> - Istio for service-to-service communication</li>
        <li><strong>Message Queues</strong> - RabbitMQ, Apache Kafka for async communication</li>
      </ul>
      
      <h2>Challenges and Solutions</h2>
      <p>Common microservices challenges:</p>
      <ul>
        <li>Distributed system complexity</li>
        <li>Data consistency across services</li>
        <li>Service communication overhead</li>
        <li>Testing and debugging distributed systems</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Key recommendations for microservices success:</p>
      <ul>
        <li>Start with a monolith and extract services gradually</li>
        <li>Invest heavily in monitoring and observability</li>
        <li>Implement comprehensive automated testing</li>
        <li>Plan for eventual consistency in data management</li>
        <li>Design for failure from the beginning</li>
      </ul>
    `,
    date: "Oct 15, 2024",
    readTime: "9 min read",
    category: "Development",
    gradient: "from-indigo-400 to-purple-400",
    tags: ["Microservices", "Architecture", "Cloud", "DevOps"],
    author: "Kyle Morris",
    featured: false
  },
  {
    id: 6,
    title: "Machine Learning Model Deployment",
    excerpt: "A comprehensive guide to deploying ML models in production environments with monitoring and scaling.",
    content: `
      <h2>From Development to Production</h2>
      <p>Deploying machine learning models to production is a critical step that transforms research prototypes into business value. This process involves numerous considerations beyond the model itself.</p>
      
      <h2>Deployment Strategies</h2>
      <p>Different approaches to model deployment:</p>
      <ul>
        <li><strong>Batch Inference</strong> - Processing data in scheduled batches</li>
        <li><strong>Real-time Inference</strong> - Serving predictions on-demand</li>
        <li><strong>Edge Deployment</strong> - Running models on edge devices</li>
        <li><strong>Hybrid Approaches</strong> - Combining multiple deployment strategies</li>
      </ul>
      
      <h2>MLOps Pipeline</h2>
      <p>A complete MLOps pipeline includes:</p>
      <ol>
        <li>Model versioning and registry</li>
        <li>Automated testing and validation</li>
        <li>Continuous integration and deployment</li>
        <li>Performance monitoring and alerting</li>
        <li>Model retraining and updates</li>
      </ol>
      
      <h2>Infrastructure Considerations</h2>
      <p>Key infrastructure requirements for ML deployment:</p>
      <ul>
        <li><strong>Scalability</strong> - Handling varying loads and traffic patterns</li>
        <li><strong>Latency</strong> - Meeting real-time inference requirements</li>
        <li><strong>Reliability</strong> - Ensuring high availability and fault tolerance</li>
        <li><strong>Security</strong> - Protecting models and data in production</li>
      </ul>
      
      <h2>Monitoring and Observability</h2>
      <p>Essential monitoring practices for production ML systems:</p>
      <ul>
        <li>Model performance metrics</li>
        <li>Data drift detection</li>
        <li>Prediction quality monitoring</li>
        <li>System health and resource utilization</li>
        <li>Business impact measurement</li>
      </ul>
      
      <h2>Common Pitfalls</h2>
      <p>Avoid these common deployment mistakes:</p>
      <ul>
        <li>Insufficient testing with production data</li>
        <li>Ignoring model versioning and rollback strategies</li>
        <li>Overlooking data preprocessing consistency</li>
        <li>Inadequate monitoring and alerting</li>
        <li>Not planning for model updates and retraining</li>
      </ul>
      
      <h2>Tools and Platforms</h2>
      <p>Popular tools for ML model deployment:</p>
      <ul>
        <li><strong>MLflow</strong> - Model lifecycle management</li>
        <li><strong>Kubeflow</strong> - ML workflows on Kubernetes</li>
        <li><strong>TensorFlow Serving</strong> - High-performance model serving</li>
        <li><strong>AWS SageMaker</strong> - End-to-end ML platform</li>
        <li><strong>Docker</strong> - Containerization for consistent deployment</li>
      </ul>
    `,
    date: "Sep 28, 2024",
    readTime: "12 min read",
    category: "AI/ML",
    gradient: "from-teal-400 to-green-400",
    tags: ["MLOps", "Deployment", "Monitoring", "Production"],
    author: "Kyle Morris",
    featured: false
  }
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  
  const post = blogPostsData.find(p => p.id === parseInt(id || '0'));

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12" ref={setRef}>
        {/* Hero Section */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
          {/* Category Badge */}
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${post.gradient} mb-6`}>
            {post.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-primary leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 text-sm rounded-full font-medium"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Content */}
        <div 
          className={`prose prose-lg max-w-none transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            color: 'hsl(var(--foreground))',
          }}
        />

        {/* Back to Blog CTA */}
        <div className={`text-center mt-16 pt-12 border-t border-border transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
          <Link to="/blog">
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
              Read More Posts
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
