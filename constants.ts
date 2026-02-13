
import { Service, BlogPost, Testimonial, Tool } from './types';

export const BRAND_NAME = "RankifyPro";
export const CONTACT_INFO = {
  email: "fahadhussain0282@gmail.com",
  phone: "+92 349 7731178",
  linkedin: "https://www.linkedin.com/in/fahad-hussain-seo/",
};

export const SERVICES: Service[] = [
  {
    id: "on-page-seo",
    title: "On-Page SEO",
    description: "Optimize your website content and structure to rank higher and convert better.",
    longDescription: "I optimize your website content, structure, and user experience to help search engines understand your pages and users take action.",
    features: ["Keyword optimization", "Content optimization", "Meta tags and headings", "Internal linking", "UX and conversion improvements"],
    icon: "Search",
    image: "/images/on-page-seo.jpg"
  },
  {
    id: "off-page-seo",
    title: "Off-Page SEO",
    description: "Build strong backlinks and brand authority to dominate your niche.",
    longDescription: "I build high quality backlinks and brand mentions that strengthen your website authority and rankings.",
    features: ["High quality backlinks", "Guest posting", "Digital PR", "Brand mentions", "Outreach campaigns"],
    icon: "Link",
    image: "/images/off-page-seo.jpg"
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    description: "Fix site issues, improve speed, and ensure search engines can crawl correctly.",
    longDescription: "I fix technical problems that stop your website from ranking and improve speed, crawlability, and indexation.",
    features: ["Site speed optimization", "Core Web Vitals improvement", "Mobile optimization", "Crawlability fixes", "Schema markup"],
    icon: "Settings",
    image: "/images/technical-seo.jpg"
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Get more local customers by ranking higher in Google Maps.",
    longDescription: "I help local businesses rank higher in local search and Google Maps to attract more nearby customers.",
    features: ["Google Business Profile", "Local citations", "Local keyword targeting", "Review management", "Local ranking growth"],
    icon: "MapPin",
    image: "/images/local-seo.jpg"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "John Miller",
    role: "Marketing Director",
    company: "TechPulse",
    text: "RankifyPro transformed our organic traffic. We saw a 150% increase in leads within the first 6 months of our collaboration.",
    metric: "+150% Leads",
    avatar: "https://i.pravatar.cc/150?u=john"
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "CEO",
    company: "EcoStore",
    text: "The technical audit was a game changer. Our site speed improved by 80%, and our search positions followed immediately.",
    metric: "Top 3 Ranking",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    role: "CMO",
    company: "GlobalReach",
    text: "The best SEO investment we've made. Our international traffic grew by 200%, opening up entirely new markets for our brand.",
    metric: "+200% Global",
    avatar: "https://i.pravatar.cc/150?u=maria"
  },
  {
    id: "4",
    name: "David Wilson",
    role: "Founder",
    company: "LocalBites",
    text: "Dominating local search in our city seemed impossible until we met Fahad. We are now the #1 choice for local customers.",
    metric: "#1 Local Rank",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: "5",
    name: "Emma Thompson",
    role: "Growth Lead",
    company: "SaaSify",
    text: "Technical SEO was our main bottleneck. The comprehensive audit and direct implementation fixed everything in weeks.",
    metric: "85% Speed Boost",
    avatar: "https://i.pravatar.cc/150?u=emma"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "seo-works-2026",
    title: "How SEO Actually Works in 2026 and What You Should Focus On",
    date: "May 15, 2024",
    author: "Fahad Hussain",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=675",
    excerpt: "SEO is evolving faster than ever. In 2026, the focus has shifted from simple keyword matching to deep user intent and AI-driven relevance.",
    content: [
      "The landscape of Search Engine Optimization is undergoing its most significant transformation yet as we move further into 2026. Search engines have evolved from mere indexers to sophisticated AI systems that understand intent, context, and nuance. To succeed today, you must move beyond the old tactics of keyword stuffing and low-quality link building.",
      "The primary focus for 2026 is User Experience (UX) paired with high-value Expertise, Authoritativeness, and Trustworthiness (E-A-T). Google's algorithms now prioritize sites that not only provide the right information but do so in a way that is accessible, fast, and secure. This means your site structure must be impeccable, and your content must serve a genuine purpose for the human reader.",
      "Artificial Intelligence has changed how users search. With the rise of Search Generative Experience (SGE), users often get answers directly on the results page. To remain relevant, your content needs to be cited as a primary source for these AI answers. This requires hyper-specific, well-structured data and a clear topical authority in your niche.",
      "Technical SEO remains the foundation of your success. If the search bots cannot crawl your site efficiently, or if your mobile experience is lackluster, all the great content in the world won't save your rankings. Core Web Vitals are no longer a 'nice to have'—they are a critical ranking factor that can make or break your visibility.",
      "Voice search and multi-modal search are also on the rise. People are searching with images and their voices more than ever. Optimizing for conversational queries and ensuring your images have descriptive, keyword-rich alt text is essential for capturing this growing segment of the search market.",
      "Sustainable growth in SEO requires a long-term mindset. There are no shortcuts that won't eventually lead to a penalty. Ethical, white-hat strategies that focus on building a genuine brand presence are the only way to ensure your rankings survive the inevitable algorithm updates.",
      "Finally, data-driven decision-making is key. You must use tools like Search Console and advanced analytics to track user behavior on your site. Understanding where users drop off or which pages have high engagement allows you to refine your strategy in real-time.",
      "In conclusion, SEO in 2026 is about being the best possible answer to a user's problem. By focusing on intent, technical excellence, and brand authority, you can ensure RankifyPro helps your business dominate the search results for years to come."
    ]
  },
  {
    id: "on-page-checklist",
    title: "On-Page SEO Checklist That Improves Rankings Fast",
    date: "June 02, 2024",
    author: "Fahad Hussain",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200&h=675",
    excerpt: "Nail your on-page SEO with this comprehensive checklist designed for quick results and better user engagement.",
    content: [
      "On-page SEO is one of the few aspects of search marketing where you have 100% control. By meticulously optimizing every element on your page, you send clear signals to search engines about what your content is and why it deserves to be at the top. This guide breaks down the essential checklist for modern on-page success.",
      "Start with your Title Tags and Meta Descriptions. These are your first impression in the SERPs. Your title should include your primary keyword naturally and be compelling enough to drive clicks. Keep it under 60 characters to avoid truncation. Meta descriptions, while not a direct ranking factor, significantly impact your Click-Through Rate (CTR).",
      "Heading hierarchy is crucial for both SEO and readability. Your page should have exactly one H1 tag containing your primary keyword. Subsequent sections should use H2 and H3 tags to organize content logically. This helps search bots understand the structure of your information and allows users to skim the content easily.",
      "Image optimization is often overlooked. Every image on your site should have a descriptive file name and a relevant ALT tag. This not only helps with image search rankings but is essential for accessibility. Additionally, compress your images to ensure they don't slow down your page load times.",
      "Internal linking is the glue that holds your site's SEO together. By linking to other relevant pages on your site, you distribute 'link juice' and help search engines discover more of your content. Use descriptive anchor text that gives users and bots an idea of what the target page is about.",
      "URL structure should be clean and readable. Avoid long strings of numbers or random characters. A 'pretty' URL like rankifypro.com/seo-checklist/ is much more effective than a cryptic one. Include your primary keyword in the URL slug for a subtle but effective SEO boost.",
      "Content quality remains the most important factor. Your content must satisfy the user's intent. If they are looking for a guide, provide depth. If they want a quick answer, be concise. Aim for a healthy word count that covers the topic thoroughly without adding unnecessary fluff.",
      "Mobile-friendliness is non-negotiable. Ensure your text is readable, buttons are easy to click, and the layout doesn't shift as it loads on a smartphone. With mobile-first indexing, your mobile site is essentially the version Google uses to rank you.",
      "By following this checklist for every page you publish, you create a solid foundation for your overall SEO strategy. Consistency is key, and the small improvements you make on-page will compound into massive ranking gains over time."
    ]
  },
  {
    id: "technical-mistakes",
    title: "Technical SEO Mistakes That Are Killing Your Traffic",
    date: "June 10, 2024",
    author: "Fahad Hussain",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=675",
    excerpt: "Even the best content won't rank if your technical foundation is broken. Learn how to spot and fix common SEO killers.",
    content: [
      "Technical SEO is the engine under the hood of your website. If it's malfunctioning, you won't get far, no matter how shiny the exterior looks. Many businesses struggle to rank simply because they ignore the invisible technical elements that search engines rely on. Here are the most common mistakes and how to fix them.",
      "First, let's talk about Site Speed. In an era of instant gratification, a slow-loading site is a death sentence for your traffic. Google's Core Web Vitals have made speed a direct ranking factor. Use tools like PageSpeed Insights to identify bloated scripts, unoptimized images, or slow server response times that are dragging you down.",
      "Crawlability issues can prevent your best pages from ever being indexed. If your robots.txt file is incorrectly configured, you might be accidentally blocking search bots from parts of your site. Regularly check Google Search Console for crawl errors or pages that are 'Excluded' from the index.",
      "Duplicate content is another common technical pitfall. This often happens through URL parameters, session IDs, or having both HTTP and HTTPS versions of a page live. Use canonical tags to tell search engines which version of a page is the 'master' copy to avoid confusing the algorithm and diluting your ranking power.",
      "Broken links (404 errors) create a poor user experience and waste your 'crawl budget'. When a bot hits a dead end, it might stop crawling your site altogether. Use a site crawler like Screaming Frog to find broken internal and external links and set up proper 301 redirects to active, relevant pages.",
      "Missing or improperly implemented Schema Markup is a missed opportunity. Structured data helps search engines understand the context of your content, which can lead to rich snippets like star ratings, product prices, or FAQ dropdowns in the search results. These enhance visibility and boost CTR significantly.",
      "Mobile-first indexing means Google uses your mobile site for ranking. If your mobile site has less content than your desktop version, or if it's poorly optimized, your rankings will suffer. Ensure a responsive design that provides a seamless experience across all device sizes.",
      "Security is a ranking signal. Running your site on HTTP instead of HTTPS is a major mistake. Not only does it hurt your SEO, but modern browsers will flag your site as 'Not Secure' to users, causing them to bounce immediately. Always ensure you have a valid SSL certificate.",
      "Fixing these technical issues isn't just about pleasing bots; it's about providing a reliable, fast, and secure experience for your visitors. When you combine technical excellence with great content, your growth potential becomes limitless."
    ]
  },
  {
    id: "build-backlinks-risk",
    title: "How to Build High Quality Backlinks Without Risk",
    date: "July 01, 2024",
    author: "Fahad Hussain",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200&h=675",
    excerpt: "Backlinks are still a top ranking factor, but risky tactics can lead to penalties. Discover a safe, sustainable approach.",
    content: [
      "Backlinks remain one of the most powerful signals in Google's ranking algorithm. They act as 'votes of confidence' from other websites. However, the days of buying thousands of cheap links from 'link farms' are long gone. Today, the focus must be on quality, relevance, and natural acquisition. Here's how to build a powerful link profile safely.",
      "The most sustainable way to get links is to create 'Linkable Assets'. These are pieces of content so valuable that others naturally want to cite them. Original research, deep-dive case studies, or interactive tools are great examples. When you provide unique data or insights, you become an authority that others want to link to.",
      "Guest posting, when done correctly, is still highly effective. The key is to avoid low-quality 'guest post farms'. Focus on reputable, niche-relevant websites with an active audience. Your guest post should be a high-quality article that provides real value to their readers, with a naturally placed link back to your site.",
      "Digital PR is the high-end version of link building. This involves reaching out to journalists and bloggers with a compelling story or expert commentary. If you can get featured in a major publication like Forbes, TechCrunch, or a leading trade journal, the resulting backlink is worth more than hundreds of smaller ones.",
      "The 'Broken Link Building' strategy is a win-win for everyone involved. You find a dead link on a relevant website, create a better version of that content on your own site, and then reach out to the site owner to suggest they replace the broken link with yours. It helps them fix their site and gets you a high-quality link.",
      "Resource page link building involves finding pages that curate lists of helpful tools or articles in your industry. If you have a resource that fits perfectly, reach out to the curator. If your content is genuinely helpful, they'll likely be happy to add it to their list.",
      "Contextual relevance is more important than raw Domain Authority (DA). A link from a smaller, highly relevant blog in your specific niche is often more valuable than a link from a giant, unrelated news site. Search engines look for links that make sense within the context of the content.",
      "Monitor your backlink profile regularly using tools like Ahrefs or Semrush. This allows you to see who is linking to you and identify any spammy links that might be hurting your reputation. While Google is good at ignoring spam, a manual disavow might be necessary in extreme cases.",
      "Building a link profile takes time and patience. It's a marathon, not a sprint. By focusing on genuine relationships and high-value content, you build a fortress of authority that search engines will reward with higher rankings and more traffic."
    ]
  }
];

export const PROCESS_STEPS = [
  { step: "Step 1", title: "Website Audit & Strategy", description: "Comprehensive analysis of your current performance and goal setting." },
  { step: "Step 2", title: "Keyword & Competitor Analysis", description: "Identifying high-value opportunities and analyzing what works for competitors." },
  { step: "Step 3", title: "On-Page & Technical Fixes", description: "Direct optimizations to your site's code, speed, and content." },
  { step: "Step 4", title: "Authority & Link Building", description: "Ethical acquisition of high-quality backlinks to boost your domain power." },
  { step: "Step 5", title: "Tracking & Growth", description: "Continuous monitoring, reporting, and strategy refinement for long-term ROI." }
];

export const TOOLS: Tool[] = [
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Fast, accurate image compression without API. Drop an image and get optimized, web-ready files under 100KB with preserved quality.",
    longDescription: "Professional image compression tool that runs entirely in your browser. Compress images to under 100KB while preserving visual quality and color accuracy. Perfect for web optimization and faster page loads.",
    features: ["No account or API required", "Runs entirely in your browser", "Preserves color accuracy and sharpness", "Multiple output formats (JPG, PNG, WEBP, PDF)", "Instant preview and download", "Mobile and desktop optimized"],
    icon: "Image",
    image: "/images/image-compressor.jpg"
  }
  ,
  {
    id: "seo-meta-generator",
    title: "SEO Meta Tag Generator",
    description: "Generate optimized meta tags, Open Graph and Twitter Card markup instantly — no API required.",
    longDescription: "A fast, in-browser SEO meta tag generator for titles, descriptions, Open Graph and Twitter Cards. Live preview, copy-to-clipboard, and character counters to help you craft the perfect snippets.",
    features: ["Real-time generation", "Open Graph & Twitter Card tags", "Live character counters", "Copy-per-section buttons", "Runs entirely in the browser", "Mobile & desktop optimized"],
    icon: "Globe",
    image: "/images/seo-meta-tag-generator.jpg"
  }
  ,
  {
    id: "robots-and-sitemap",
    title: "Robots.txt & Sitemap Generator",
    description: "Generate valid robots.txt and sitemap.xml files with live preview. Customize crawl delays, bot permissions, and site paths.",
    longDescription: "Professional robots.txt and sitemap.xml generator. Create valid XML and text files, customize bot permissions, set crawl delays, and include custom paths. Generate, preview, and download both files instantly.",
    features: ["Live preview for both files", "Customizable bot permissions", "Crawl delay settings", "Sitemap URL configuration", "Custom path inclusion", "Copy & download functionality"],
    icon: "FileText",
    image: "/images/robots-and-sitemap-generator.jpg"
  }
];



