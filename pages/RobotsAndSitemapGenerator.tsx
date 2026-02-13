import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { TOOLS } from '../constants';
import { escapeXml, sanitizeInput, isValidUrl, safeJsonParse, validateCrawlDelay } from '../utils/sanitization';

const CodeBlock: React.FC<{ title: string; code: string; onCopy: () => void }> = ({ title, code, onCopy }) => (
  <motion.div whileHover={{ y: -4 }} className="relative bg-[#0b0b0b] border border-white/6 rounded-2xl p-4 shadow-md">
    <div className="flex items-start justify-between mb-3">
      <h4 className="text-sm font-bold text-white">{title}</h4>
      <button onClick={onCopy} className="inline-flex items-center space-x-2 text-slate-300 bg-white/3 hover:bg-white/5 px-3 py-1 rounded-full text-sm transition-all">
        <Copy size={14} />
        <span>Copy</span>
      </button>
    </div>
    <pre className="text-sm text-slate-300 overflow-x-auto max-h-56 rounded-md p-3 bg-gradient-to-b from-white/2 to-white/3 font-mono whitespace-pre-wrap break-words">
      {code}
    </pre>
  </motion.div>
);

const RobotsAndSitemapGenerator: React.FC = () => {
  const { toolId } = useParams();
  const tool = TOOLS.find(t => t.id === toolId);

  useEffect(() => { window.scrollTo(0, 0); }, [toolId]);

  const [websiteUrl, setWebsiteUrl] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [crawlDelay, setCrawlDelay] = useState('');
  const [allowAllBots, setAllowAllBots] = useState(true);
  const [additionalPaths, setAdditionalPaths] = useState('');

  const urlError = useMemo(() => {
    if (!websiteUrl) return 'Website URL is required';
    if (!isValidUrl(websiteUrl)) return 'Invalid URL format (must start with http:// or https://)';
    return '';
  }, [websiteUrl]);

  const sitemapError = useMemo(() => {
    if (!sitemapUrl) return '';
    if (!isValidUrl(sitemapUrl)) return 'Invalid sitemap URL format';
    return '';
  }, [sitemapUrl]);

  const baseUrl = useMemo(() => {
    if (!websiteUrl || !isValidUrl(websiteUrl)) return '';
    try {
      const url = new URL(websiteUrl);
      return url.origin;
    } catch {
      return '';
    }
  }, [websiteUrl]);

  const robotsTxt = useMemo(() => {
    if (!baseUrl) return '';
    
    let content = '';
    
    if (allowAllBots) {
      content += 'User-agent: *\n';
      content += 'Allow: /\n';
    } else {
      content += 'User-agent: *\n';
      content += 'Disallow: /\n';
    }

    if (crawlDelay && !isNaN(Number(crawlDelay))) {
      content += `Crawl-delay: ${crawlDelay}\n`;
    }

    const finalSitemapUrl = sitemapUrl || `${baseUrl}/sitemap.xml`;
    if (finalSitemapUrl && isValidUrl(finalSitemapUrl)) {
      content += `Sitemap: ${finalSitemapUrl}\n`;
    }

    return content.trim();
  }, [baseUrl, allowAllBots, crawlDelay, sitemapUrl]);

  const sitemapXml = useMemo(() => {
    if (!baseUrl) return '';

    // Use YYYY-MM-DD format for sitemap compliance
    const today = new Date();
    const isoDate = today.toISOString().split('T')[0]; // Extract just the date portion
    
    const paths = [
      '/',
      '/about',
      '/services',
      '/tools',
      '/blog',
      '/contact'
    ];

    if (additionalPaths) {
      const customPaths = additionalPaths
        .split('\n')
        .map(p => p.trim())
        .filter(p => p && p.startsWith('/'));
      paths.push(...customPaths);
    }

    // Remove duplicates while preserving order
    const uniquePaths = Array.from(new Set(paths)).filter(Boolean);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    uniquePaths.forEach(path => {
      if (path && path.trim()) {
        const url = `${baseUrl}${path}`;
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(url)}</loc>\n`;
        xml += `    <lastmod>${isoDate}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';
      }
    });

    xml += '</urlset>\n';
    return xml;
  }, [baseUrl, additionalPaths]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      alert('Copy failed — please allow clipboard permissions.');
    }
  };

  const downloadFile = (filename: string, content: string) => {
    const mimeType = filename.endsWith('.xml') ? 'application/xml' : 'text/plain';
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const downloadBoth = () => {
    downloadFile('robots.txt', robotsTxt);
    setTimeout(() => {
      downloadFile('sitemap.xml', sitemapXml);
    }, 200);
  };

  // Autosave: load and persist to localStorage
  const STORAGE_KEY = 'robotsAndSitemapDraft_v1';
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = safeJsonParse(raw, {}) as any;
        if (data.websiteUrl) setWebsiteUrl(sanitizeInput(data.websiteUrl as string, 2000));
        if (data.sitemapUrl) setSitemapUrl(sanitizeInput(data.sitemapUrl as string, 2000));
        if (data.crawlDelay) setCrawlDelay(validateCrawlDelay(data.crawlDelay as string));
        if (data.additionalPaths) setAdditionalPaths(sanitizeInput(data.additionalPaths as string, 5000));
        if (typeof data.allowAllBots === 'boolean') setAllowAllBots(data.allowAllBots);
      }
    } catch (e) { 
      console.warn('Failed to load saved draft:', e);
    }
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      const payload = { websiteUrl, sitemapUrl, crawlDelay, allowAllBots, additionalPaths };
      try { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); 
      } catch (e) {
        console.warn('Failed to save draft:', e);
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [websiteUrl, sitemapUrl, crawlDelay, allowAllBots, additionalPaths]);

  const clearDraft = () => {
    setWebsiteUrl('');
    setSitemapUrl('');
    setCrawlDelay('');
    setAllowAllBots(true);
    setAdditionalPaths('');
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  };

  return (
    <div className="pb-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/tools" className="inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 mb-6 transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Tools</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">{tool?.title || 'Robots.txt & Sitemap Generator'}</h1>
          <p className="text-slate-400 max-w-2xl mb-8">Generate valid robots.txt and sitemap.xml files instantly. Customize crawl delays, bot permissions, and site paths. Everything runs in your browser — no API required.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.form whileHover={{ y: -4 }} className="col-span-1 bg-gradient-to-b from-white/3 via-white/2 to-white/3 border border-white/5 p-6 rounded-2xl shadow-lg">
              <div className="space-y-5">
                {/* Website URL */}
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Website URL *</label>
                  <input
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full mt-2 bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  {urlError && (
                    <div className="flex items-center space-x-2 mt-2 text-xs text-rose-400">
                      <AlertCircle size={14} />
                      <span>{urlError}</span>
                    </div>
                  )}
                  {!urlError && websiteUrl && (
                    <div className="flex items-center space-x-2 mt-2 text-xs text-emerald-400">
                      <CheckCircle size={14} />
                      <span>Valid URL</span>
                    </div>
                  )}
                </div>

                {/* Sitemap URL */}
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sitemap URL (Optional)</label>
                  <input
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    placeholder="https://example.com/sitemap.xml"
                    className="w-full mt-2 bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  {sitemapError && (
                    <div className="flex items-center space-x-2 mt-2 text-xs text-rose-400">
                      <AlertCircle size={14} />
                      <span>{sitemapError}</span>
                    </div>
                  )}
                  <div className="text-xs text-slate-500 mt-2">
                    {!sitemapUrl && baseUrl ? `Will default to: ${baseUrl}/sitemap.xml` : ''}
                  </div>
                </div>

                {/* Crawl Delay */}
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Crawl Delay (seconds) (Optional)</label>
                  <input
                    value={crawlDelay}
                    onChange={(e) => setCrawlDelay(validateCrawlDelay(e.target.value))}
                    placeholder="0"
                    type="text"
                    inputMode="numeric"
                    className="w-full mt-2 bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  <div className="text-xs text-slate-500 mt-2">Recommended if you want to limit crawl rate</div>
                </div>

                {/* Bot Permissions Toggle */}
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3 block">Bot Permissions</label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setAllowAllBots(true)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                        allowAllBots
                          ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-400'
                          : 'bg-white/3 border border-white/6 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      Allow All
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllowAllBots(false)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                        !allowAllBots
                          ? 'bg-rose-500/20 border border-rose-400 text-rose-400'
                          : 'bg-white/3 border border-white/6 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      Block All
                    </button>
                  </div>
                  <div className={`text-xs mt-3 ${allowAllBots ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {allowAllBots ? '✓ All bots allowed to crawl your site' : '✗ All bots blocked from crawling'}
                  </div>
                </div>

                {/* Additional Paths */}
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Additional Paths (Optional)</label>
                  <textarea
                    value={additionalPaths}
                    onChange={(e) => setAdditionalPaths(e.target.value)}
                    placeholder={'/blog\n/products\n/pricing'}
                    className="w-full mt-2 bg-transparent border border-white/6 rounded-lg px-3 py-2 text-white text-sm h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                  />
                  <div className="text-xs text-slate-500 mt-2">One path per line (e.g., /blog, /products). Default paths are included automatically.</div>
                </div>

                <button
                  type="button"
                  onClick={clearDraft}
                  className="w-full py-2 px-3 bg-white/3 hover:bg-white/5 border border-white/6 rounded-lg text-xs font-bold text-slate-300 transition-all"
                >
                  Clear All
                </button>
              </div>
            </motion.form>

            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-white">Output Files</h3>
                      {!urlError && (
                        <button
                          onClick={downloadBoth}
                          className="inline-flex items-center space-x-2 text-slate-300 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-400 px-3 py-1 rounded-full text-sm font-bold transition-all"
                        >
                          <Download size={14} />
                          <span>Download Both</span>
                        </button>
                      )}
                    </div>

                    {!urlError ? (
                      <div className="space-y-6">
                        <CodeBlock
                          title="robots.txt"
                          code={robotsTxt}
                          onCopy={() => copyToClipboard(robotsTxt)}
                        />
                        <CodeBlock
                          title="sitemap.xml"
                          code={sitemapXml}
                          onCopy={() => copyToClipboard(sitemapXml)}
                        />
                      </div>
                    ) : (
                      <motion.div whileHover={{ y: -4 }} className="bg-[#0b0b0b] border border-rose-500/30 rounded-2xl p-6 shadow-md">
                        <div className="flex items-start space-x-3">
                          <AlertCircle size={20} className="text-rose-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-sm font-bold text-rose-400 mb-2">Invalid Website URL</h4>
                            <p className="text-xs text-slate-400">Please enter a valid website URL starting with http:// or https:// to generate robots.txt and sitemap.xml files.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Information & Tips</h4>
                  </div>

                  <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-cyan-600/10 to-cyan-400/5 border border-cyan-500/30 rounded-2xl p-4 shadow-md">
                    <div className="text-xs font-bold text-cyan-400 mb-3">ROBOTS.TXT</div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>• Place robots.txt in your website root directory</li>
                      <li>• Controls which bots can crawl your site</li>
                      <li>• Crawl-delay limits how often bots access your site</li>
                      <li>• Always include your sitemap URL</li>
                      <li>• Bots aren't required to follow robots.txt rules</li>
                    </ul>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-emerald-600/10 to-emerald-400/5 border border-emerald-500/30 rounded-2xl p-4 shadow-md">
                    <div className="text-xs font-bold text-emerald-400 mb-3">SITEMAP.XML</div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>• Place sitemap.xml in your website root directory</li>
                      <li>• Helps search engines discover and index all pages</li>
                      <li>• Includes URL priority and change frequency</li>
                      <li>• Register in Google Search Console</li>
                      <li>• Max 50,000 URLs per sitemap</li>
                    </ul>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-amber-600/10 to-amber-400/5 border border-amber-500/30 rounded-2xl p-4 shadow-md">
                    <div className="text-xs font-bold text-amber-400 mb-3">BEST PRACTICES</div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>✓ Add both files to your domain root</li>
                      <li>✓ Reference sitemap in robots.txt</li>
                      <li>✓ Update sitemap when content changes</li>
                      <li>✓ Test with Google Search Console</li>
                      <li>✓ Use robots.txt to block sensitive areas</li>
                    </ul>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md">
                    <div className="text-xs font-bold text-slate-300 mb-2">PRO TIP</div>
                    <p className="text-xs text-slate-400">Combine a well-formed robots.txt with a comprehensive sitemap.xml to significantly improve your site's SEO performance and crawl efficiency.</p>
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

export default RobotsAndSitemapGenerator;
