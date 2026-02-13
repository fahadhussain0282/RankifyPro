
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Linkedin, Twitter, Copy, Mail, MessageCircle, X } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);
  const currentUrl = window.location.href;
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handle click outside to close the more options menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Post not found</h2>
          <Link to="/blog" className="text-cyan-400 font-bold flex items-center justify-center">
            <ArrowLeft size={20} className="mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async (platform: string) => {
    const title = post.title;
    const url = currentUrl;

    try {
      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
          break;
        case 'pinterest':
          window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, '_blank', 'noopener,noreferrer');
          break;
        case 'whatsapp':
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`, '_blank', 'noopener,noreferrer');
          break;
        case 'email':
          window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent("Check out this article: " + url)}`;
          break;
        case 'copy':
          await navigator.clipboard.writeText(url);
          alert('Article link copied to clipboard!');
          break;
        case 'native':
          // Attempt native share API first (mobile)
          if (navigator.share && url.startsWith('http')) {
            await navigator.share({
              title: title,
              url: url
            });
          } else {
            // Dropdown fallback for desktop or unsupported environments
            setShowMoreMenu(!showMoreMenu);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.warn('Sharing failed:', error);
    }
  };

  return (
    <article className="pb-32">
      {/* Featured Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link to="/blog" className="inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 mb-12 transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Blog</span>
        </Link>
        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
          <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full font-bold">SEO Strategy</span>
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{post.author}</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-10 leading-tight">{post.title}</h1>
        <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-16">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Post Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-cyan lg:prose-xl max-w-none">
            {post.content.map((p, idx) => (
              <p key={idx} className="text-slate-300 text-lg leading-[1.8] mb-8">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0 relative">
             <div className="flex items-center space-x-4">
               <img src="/images/fahad-hussain.jpg" className="w-16 h-16 rounded-full border-2 border-cyan-500 object-cover" alt="Fahad Hussain" />
               <div>
                 <div className="font-bold text-white">Written by Fahad Hussain</div>
                 <div className="text-slate-500 text-sm">Founder & Senior SEO Strategist</div>
               </div>
             </div>
             
             <div className="flex items-center space-x-3 relative">
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2">Share Article:</span>
               <button 
                 onClick={() => handleShare('linkedin')}
                 className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
                 title="Share on LinkedIn"
               >
                 <Linkedin size={18} />
               </button>
               <button 
                 onClick={() => handleShare('twitter')}
                 className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
                 title="Share on Twitter"
               >
                 <Twitter size={18} />
               </button>
               <button 
                 onClick={() => handleShare('pinterest')}
                 className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
                 title="Share on Pinterest"
               >
                <svg viewBox="0 0 24 24" width="18" height="18" className="w-[18px] h-[18px] fill-current" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                 </svg>
               </button>
               
               <div className="relative">
                 <button 
                   onClick={() => handleShare('native')}
                   className={`p-3 rounded-full border transition-all ${showMoreMenu ? 'bg-cyan-500 border-cyan-500 text-black' : 'bg-white/5 border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50'}`}
                   title="More sharing options"
                 >
                   <Share2 size={18} />
                 </button>

                 <AnimatePresence>
                   {showMoreMenu && (
                     <motion.div 
                       ref={menuRef}
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       className="absolute bottom-full right-0 mb-4 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                     >
                       <button 
                         onClick={() => { handleShare('whatsapp'); setShowMoreMenu(false); }}
                         className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                       >
                         <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                           <MessageCircle size={16} />
                         </div>
                         <span className="text-sm font-medium text-slate-300 group-hover:text-white">WhatsApp</span>
                       </button>
                       <button 
                         onClick={() => { handleShare('email'); setShowMoreMenu(false); }}
                         className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                       >
                         <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                           <Mail size={16} />
                         </div>
                         <span className="text-sm font-medium text-slate-300 group-hover:text-white">Email</span>
                       </button>
                       <button 
                         onClick={() => { handleShare('copy'); setShowMoreMenu(false); }}
                         className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                       >
                         <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-slate-400">
                           <Copy size={16} />
                         </div>
                         <span className="text-sm font-medium text-slate-300 group-hover:text-white">Copy Link</span>
                       </button>
                       <div className="border-t border-white/5 mt-1 pt-1">
                          <button 
                            onClick={() => setShowMoreMenu(false)}
                            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                              <X size={16} />
                            </div>
                            <span className="text-sm font-medium text-red-500">Close</span>
                          </button>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
