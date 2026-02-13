import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Download } from 'lucide-react';
import { TOOLS } from '../constants';
import { escapeHtml, sanitizeInput, safeJsonParse } from '../utils/sanitization';

const counterClass = (count: number, limits: { good: number; warn: number }) => {
  if (count <= limits.good) return 'text-emerald-400';
  if (count <= limits.warn) return 'text-amber-400';
  return 'text-rose-400';
};

const safeGetUrlPartsLocal = (urlString: string) => {
  try {
    const url = new URL(sanitizeInput(urlString));
    return { hostname: url.hostname, pathname: url.pathname };
  } catch {
    return null;
  }
};

const CodeBlock: React.FC<{ title: string; code: string; onCopy: () => void }> = ({ title, code, onCopy }) => (
  <motion.div whileHover={{ y: -4 }} className="relative bg-[#0b0b0b] border border-white/6 rounded-2xl p-4 shadow-md">
    <div className="flex items-start justify-between mb-3">
      <h4 className="text-sm font-bold text-white">{title}</h4>
      <button onClick={onCopy} className="inline-flex items-center space-x-2 text-slate-300 bg-white/3 hover:bg-white/5 px-3 py-1 rounded-full text-sm">
        <Copy size={14} />
        <span>Copy</span>
      </button>
    </div>
    <pre className="text-sm text-slate-300 overflow-x-auto max-h-56 rounded-md p-3 bg-gradient-to-b from-white/2 to-white/3 font-mono whitespace-pre-wrap">
      {code}
    </pre>
  </motion.div>
);

const SEOMetaGenerator: React.FC = () => {
  const { toolId } = useParams();
  const tool = TOOLS.find(t => t.id === toolId);

  useEffect(() => { window.scrollTo(0, 0); }, [toolId]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [siteName, setSiteName] = useState('');
  const [socialImage, setSocialImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  const metaTitle = useMemo(() => `<title>${escapeHtml(title || siteName)}</title>`, [title, siteName]);
  const metaDescription = useMemo(() => `<meta name="description" content="${escapeHtml(description)}" />`, [description]);
  const metaKeywords = useMemo(() => (keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}" />` : ''), [keywords]);

  const ogTags = useMemo(() => {
    const tags = [] as string[];
    const imageSource = uploadedImage || socialImage;
    if (siteName) tags.push(`<meta property="og:site_name" content="${escapeHtml(siteName)}" />`);
    if (title) tags.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
    if (description) tags.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
    if (pageUrl) tags.push(`<meta property="og:url" content="${escapeHtml(pageUrl)}" />`);
    if (imageSource) tags.push(`<meta property="og:image" content="${escapeHtml(imageSource)}" />`);
    tags.push(`<meta property="og:type" content="website" />`);
    return tags.join('\n');
  }, [siteName, title, description, pageUrl, socialImage, uploadedImage]);

  const twitterTags = useMemo(() => {
    const tags = [] as string[];
    const imageSource = uploadedImage || socialImage;
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    if (author) tags.push(`<meta name="twitter:creator" content="@${escapeHtml(author.replace('@', ''))}" />`);
    if (title) tags.push(`<meta name="twitter:title" content="${escapeHtml(title)}" />`);
    if (description) tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);
    if (imageSource) tags.push(`<meta name="twitter:image" content="${escapeHtml(imageSource)}" />`);
    return tags.join('\n');
  }, [author, title, description, socialImage, uploadedImage]);

  const htmlMetaBlock = [metaTitle, metaDescription, metaKeywords].filter(Boolean).join('\n');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // small feedback could be added here
    } catch (e) {
      alert('Copy failed — please allow clipboard permissions.');
    }
  };

  // Autosave: load and persist to localStorage
  const STORAGE_KEY = 'seoMetaDraft_v1';
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = safeJsonParse(raw, {}) as any;
        if (data.title) setTitle(sanitizeInput(data.title as string, 100));
        if (data.description) setDescription(sanitizeInput(data.description as string, 160));
        if (data.keywords) setKeywords(sanitizeInput(data.keywords as string, 500));
        if (data.pageUrl) setPageUrl(sanitizeInput(data.pageUrl as string, 2000));
        if (data.author) setAuthor(sanitizeInput(data.author as string, 100));
        if (data.siteName) setSiteName(sanitizeInput(data.siteName as string, 100));
        if (data.socialImage) setSocialImage(sanitizeInput(data.socialImage as string, 2000));
        if (data.uploadedImage) setUploadedImage(sanitizeInput(data.uploadedImage as string, 10000000));
      }
    } catch (e) { 
      console.warn('Failed to load saved draft:', e);
    }
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      const payload = { title, description, keywords, pageUrl, author, siteName, socialImage, uploadedImage };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (e) {}
    }, 400);
    return () => clearTimeout(handle);
  }, [title, description, keywords, pageUrl, author, siteName, socialImage, uploadedImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setUploadedImage(base64);
      };
      reader.onerror = () => {
        console.error('Failed to read image file');
      };
      reader.readAsDataURL(file);
    }
  };

  const clearDraft = () => {
    setTitle(''); setDescription(''); setKeywords(''); setPageUrl(''); setAuthor(''); setSiteName(''); setSocialImage(''); setUploadedImage('');
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  };

  const buildHtml = () => {
    const head = [metaTitle, metaDescription, metaKeywords].filter(Boolean).join('\n');
    const og = ogTags;
    const tw = twitterTags;
    return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8"/>\n<meta name="viewport" content="width=device-width,initial-scale=1"/>\n${head}\n${og}\n${tw}\n</head>\n<body>\n<!-- Page preview content -->\n<h1>${title || siteName}</h1>\n<p>${description}</p>\n</body>\n</html>`;
  };

  const downloadHtml = () => {
    const content = buildHtml();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(title || siteName || 'meta').replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };


  return (
    <div className="pb-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/tools" className="inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 mb-6 transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Tools</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">{tool?.title || 'SEO Meta Tag Generator'}</h1>
          <p className="text-slate-400 max-w-2xl mb-8">Generate optimized meta title, description, Open Graph and Twitter Card tags in real time. No account or API — everything runs in your browser.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.form whileHover={{ y: -4 }} className="col-span-1 bg-gradient-to-b from-white/3 via-white/2 to-white/3 border border-white/5 p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                <label className="text-xs text-slate-400">Page title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g. How to Improve SEO in 2026" className="w-full bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm" />
                <div className="flex items-center justify-between text-xs">
                  <div className="text-slate-400">Characters</div>
                  <div className={`font-mono ${counterClass(title.length, { good: 60, warn: 70 })}`}>{title.length}</div>
                </div>

                <label className="text-xs text-slate-400">Meta description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief, compelling description under 160 characters" className="w-full bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm h-28" />
                <div className="flex items-center justify-between text-xs">
                  <div className="text-slate-400">Characters</div>
                  <div className={`font-mono ${counterClass(description.length, { good: 160, warn: 200 })}`}>{description.length}</div>
                </div>

                <label className="text-xs text-slate-400">Keywords (comma separated)</label>
                <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="seo, meta tags, open graph" className="w-full bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm" />

                <label className="text-xs text-slate-400">Page URL</label>
                <input value={pageUrl} onChange={(e) => setPageUrl(e.target.value)} placeholder="https://example.com/page" className="w-full bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm" />

                <label className="text-xs text-slate-400">Author name (Twitter handle optional)</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="@author or Author Name" className="w-full bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm" />

                <label className="text-xs text-slate-400">Site name</label>
                <input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="RankifyPro" className="w-full bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm" />

                <label className="text-xs text-slate-400">Social image URL</label>
                <input value={socialImage} onChange={(e) => setSocialImage(e.target.value)} placeholder="https://example.com/og-image.jpg" className="w-full bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm" />

                <label className="text-xs text-slate-400">Or upload image directly</label>
                <input type="file" accept="image/*" onChange={handleFileUpload} title="Upload image file" className="w-full text-sm text-slate-400 file:mr-3 file:px-3 file:py-2 file:bg-white/5 file:border file:border-white/6 file:rounded-lg file:text-xs file:text-white file:cursor-pointer hover:file:bg-white/10" />

                <div className="text-xs text-slate-500">Tip: Keep titles under 60 characters and descriptions under 160 for best SERP display.</div>
              </div>
            </motion.form>

            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <CodeBlock title="HTML Meta" code={htmlMetaBlock} onCopy={() => copyToClipboard(htmlMetaBlock)} />

                  <CodeBlock title="Open Graph (Facebook / LinkedIn)" code={ogTags} onCopy={() => copyToClipboard(ogTags)} />

                  <CodeBlock title="Twitter Card" code={twitterTags} onCopy={() => copyToClipboard(twitterTags)} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Live Previews</h4>
                    <div className="flex items-center space-x-2">
                      <button onClick={downloadHtml} className="inline-flex items-center space-x-2 text-slate-300 bg-white/3 hover:bg-white/5 px-3 py-1 rounded-full text-sm">
                        <Download size={14} />
                        <span>Download HTML</span>
                      </button>
                      <button onClick={clearDraft} className="inline-flex items-center space-x-2 text-slate-300 bg-white/3 hover:bg-white/5 px-3 py-1 rounded-full text-sm">Clear</button>
                    </div>
                  </div>

                  {/* Google Search Preview */}
                  <motion.div whileHover={{ y: -2 }} className="bg-[#0b0b0b] border border-white/6 rounded-2xl p-4 shadow-md">
                    <div className="text-xs text-slate-500 font-semibold mb-3">GOOGLE SEARCH</div>
                    <div className="space-y-1">
                      <div className={`text-sm font-semibold ${!title ? 'text-slate-500' : 'text-cyan-400'}`}>
                        {title || 'Your page title'}
                      </div>
                      {pageUrl && safeGetUrlPartsLocal(pageUrl) && (
                        <div className="text-xs text-emerald-600 truncate">
                          {safeGetUrlPartsLocal(pageUrl)?.hostname} › {safeGetUrlPartsLocal(pageUrl)?.pathname.slice(1)}
                        </div>
                      )}
                      <div className={`text-sm ${!description ? 'text-slate-500' : 'text-slate-300'}`}>
                        {description || 'Meta description preview will appear here.'}
                      </div>
                    </div>
                  </motion.div>

                  {/* Facebook Preview */}
                  <motion.div whileHover={{ y: -2 }} className="bg-[#0b0b0b] border border-white/6 rounded-2xl p-4 shadow-md">
                    <div className="text-xs text-slate-500 font-semibold mb-3">FACEBOOK / LINKEDIN</div>
                    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/2">
                      {(uploadedImage || socialImage) && (
                        <div className="w-full aspect-video bg-white/5 overflow-hidden flex items-center justify-center">
                          <img src={uploadedImage || socialImage} alt="Social preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-3">
                        {siteName && <div className="text-xs text-slate-500 mb-1">{siteName.toUpperCase()}</div>}
                        <div className={`text-sm font-bold ${!title ? 'text-slate-500' : 'text-white'}`}>
                          {title || 'Your page title'}
                        </div>
                        <div className={`text-xs ${!description ? 'text-slate-500' : 'text-slate-300'} mt-2`}>
                          {description || 'Meta description preview will appear here.'}
                        </div>
                        {pageUrl && safeGetUrlPartsLocal(pageUrl) && (
                          <div className="text-xs text-slate-400 mt-2 truncate">
                            {safeGetUrlPartsLocal(pageUrl)?.hostname}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Twitter Preview */}
                  <motion.div whileHover={{ y: -2 }} className="bg-[#0b0b0b] border border-white/6 rounded-2xl p-4 shadow-md">
                    <div className="text-xs text-slate-500 font-semibold mb-3">TWITTER / X</div>
                    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/2">
                      {(uploadedImage || socialImage) && (
                        <div className="w-full aspect-video bg-white/5 overflow-hidden flex items-center justify-center">
                          <img src={uploadedImage || socialImage} alt="Social preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-3">
                        <div className={`text-sm font-bold ${!title ? 'text-slate-500' : 'text-white'}`}>
                          {title || 'Your page title'}
                        </div>
                        <div className={`text-xs ${!description ? 'text-slate-500' : 'text-slate-300'} mt-1`}>
                          {description || 'Meta description preview will appear here.'}
                        </div>
                        {pageUrl && safeGetUrlPartsLocal(pageUrl) && (
                          <div className="text-xs text-slate-500 mt-2 truncate">
                            {safeGetUrlPartsLocal(pageUrl)?.hostname}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="bg-white/3 rounded-2xl p-4 text-sm text-slate-300">
                    <div className="font-bold mb-2">Preview Tips</div>
                    <div className="text-xs text-slate-400">• Keep titles under 60 characters for optimal Google display • Descriptions work best between 150–160 characters • Images should be 1200×630px or larger for social platforms</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SEOMetaGenerator;
