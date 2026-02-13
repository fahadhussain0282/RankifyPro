import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Image as ImageIcon, UploadCloud, Loader, Check, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import { TOOLS } from '../constants';

const MAX_TARGET_BYTES = 100 * 1024; // 100KB

const humanFileSize = (size: number) => {
  if (size === 0) return '0 B';
  const i = Math.floor(Math.log(size) / Math.log(1024));
  const sizes = ['B', 'KB', 'MB', 'GB'];
  return (size / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

type OutputFormat = 'jpg' | 'png' | 'webp' | 'pdf';

const ImageCompressor: React.FC = () => {
  const { toolId } = useParams();
  const tool = TOOLS.find(t => t.id === toolId);

  const [dragActive, setDragActive] = useState(false);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('webp');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [toolId]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${Math.min(100, progress)}%`;
    }
  }, [progress]);

  if (!tool) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Tool not found</h2>
          <Link to="/tools" className="text-cyan-400 font-bold flex items-center justify-center">
            <ArrowLeft size={20} className="mr-2" /> Back to Tools
          </Link>
        </div>
      </div>
    );
  }

  const handleFiles = async (file?: File) => {
    const f = file || (inputRef.current && inputRef.current.files && inputRef.current.files[0]);
    if (!f) return;
    // revoke previous urls
    if (sourceUrl) {
      try { URL.revokeObjectURL(sourceUrl); } catch {}
    }
    if (previewUrl) {
      try { URL.revokeObjectURL(previewUrl); } catch {}
    }
    if (downloadUrl) {
      try { URL.revokeObjectURL(downloadUrl); } catch {}
    }

    setSourceFile(f);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setResultSize(null);
    const url = URL.createObjectURL(f);
    setSourceUrl(url);
  };

  // compress logic: iteratively reduce quality and (if needed) scale down until under target size
  const compressImage = async (file: File) => {
    setIsCompressing(true);
    setProgress(5);
    try {
      // load image (ImageBitmap preferred)
      let imgWidth = 0;
      let imgHeight = 0;
      let imgSource: ImageBitmap | HTMLImageElement | null = null;

      if ((window as any).createImageBitmap) {
        imgSource = await (window as any).createImageBitmap(file) as ImageBitmap;
        imgWidth = (imgSource as ImageBitmap).width;
        imgHeight = (imgSource as ImageBitmap).height;
      } else {
        const tempUrl = URL.createObjectURL(file);
        const img = await new Promise<HTMLImageElement>((res, rej) => {
          const i = new Image();
          i.onload = () => res(i);
          i.onerror = (e) => rej(e);
          i.src = tempUrl;
        });
        try { URL.revokeObjectURL(tempUrl); } catch {}
        imgSource = img;
        imgWidth = img.width;
        imgHeight = img.height;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      let width = imgWidth;
      let height = imgHeight;
      const MAX_DIM = 1920;
      if (width > MAX_DIM || height > MAX_DIM) {
        const scale = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      canvas.width = width;
      canvas.height = height;

      if ((imgSource as ImageBitmap).close !== undefined) {
        ctx.drawImage(imgSource as ImageBitmap, 0, 0, width, height);
      } else {
        ctx.drawImage(imgSource as HTMLImageElement, 0, 0, width, height);
      }

      const mimeForImage = outputFormat === 'jpg' ? 'image/jpeg' : outputFormat === 'png' ? 'image/png' : 'image/webp';
      const toBlob = (quality: number, mime: string = mimeForImage) =>
        new Promise<Blob | null>((res) => canvas.toBlob((b) => res(b), mime, quality));

      let quality = 0.92;
      let blob = await toBlob(quality);
      setProgress(30);

      while (blob && blob.size > MAX_TARGET_BYTES && quality > 0.45) {
        quality = Math.max(0.45, quality - 0.07);
        blob = await toBlob(quality);
        setProgress((prev) => Math.min(80, prev + 10));
      }

      let scaleFactor = 0.92;
      while (blob && blob.size > MAX_TARGET_BYTES && (width > 600 || height > 600)) {
        width = Math.round(width * scaleFactor);
        height = Math.round(height * scaleFactor);
        canvas.width = width;
        canvas.height = height;
        if ((imgSource as ImageBitmap).close !== undefined) {
          ctx.drawImage(imgSource as ImageBitmap, 0, 0, width, height);
        } else {
          ctx.drawImage(imgSource as HTMLImageElement, 0, 0, width, height);
        }
        quality = Math.max(0.4, quality - 0.03);
        blob = await toBlob(quality);
        setProgress((prev) => Math.min(95, prev + 3));
        scaleFactor = Math.max(0.8, scaleFactor - 0.02);
      }

      if (!blob) throw new Error('Compression failed');

      // revoke previous object URLs
      if (previewUrl) { try { URL.revokeObjectURL(previewUrl); } catch {} }
      if (downloadUrl) { try { URL.revokeObjectURL(downloadUrl); } catch {} }

      // always create an image preview
      const previewBlob = blob;
      const previewObjectUrl = URL.createObjectURL(previewBlob);
      setPreviewUrl(previewObjectUrl);

      if (outputFormat === 'pdf') {
        // embed high-quality JPEG into PDF
        const imgDataUrl = canvas.toDataURL('image/jpeg', Math.max(0.75, quality));
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const imgEl = await new Promise<HTMLImageElement>((res, rej) => {
          const i = new Image();
          i.onload = () => res(i);
          i.onerror = (e) => rej(e);
          i.src = imgDataUrl;
        });

        const imgW = imgEl.width;
        const imgH = imgEl.height;
        const scale = Math.min((pageWidth * 0.95) / imgW, (pageHeight * 0.95) / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const x = (pageWidth - drawW) / 2;
        const y = (pageHeight - drawH) / 2;

        doc.addImage(imgDataUrl, 'JPEG', x, y, drawW, drawH);
        const pdfBlob = doc.output('blob') as Blob;
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setDownloadUrl(pdfUrl);
        setResultSize(pdfBlob.size);
      } else {
        const downloadBlob = blob;
        const downloadObjectUrl = URL.createObjectURL(downloadBlob);
        setDownloadUrl(downloadObjectUrl);
        setResultSize(downloadBlob.size);
      }

      setProgress(100);
      setTimeout(() => setProgress(0), 600);
    } catch (err) {
      console.error(err);
      alert('An error occurred while compressing. Please try a different image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFiles(f);
  };

  const handleUploadClick = () => inputRef.current?.click();

  return (
    <div className="pb-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link to="/tools" className="inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 mb-12 transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back to Tools</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">{tool.title} — HD quality under 100KB</h1>
          <p className="text-slate-400 max-w-2xl mb-8">{tool.longDescription}</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Instructions + CTA card */}
            <motion.div whileHover={{ y: -4 }} className="col-span-1 bg-gradient-to-b from-white/3 via-white/2 to-white/3 border border-white/5 p-6 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <ImageIcon size={28} className="text-cyan-400" />
                </div>
                <div className="w-full">
                  <h2 className="text-xl font-bold text-white">{tool.title}</h2>
                  <p className="text-slate-400 mt-2 text-sm">{tool.description}</p>

                  <ul className="mt-4 text-sm text-slate-400 space-y-2">
                    {tool.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      onClick={handleUploadClick}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 w-full"
                    >
                      <UploadCloud size={16} />
                      <span>Upload Image</span>
                    </button>

                    <button
                      onClick={() => { if (sourceFile) compressImage(sourceFile); }}
                      disabled={!sourceFile || isCompressing}
                      className="bg-white/5 hover:bg-white/6 text-slate-200 px-4 py-2 rounded-full font-medium transition-all disabled:opacity-50 w-full"
                    >
                      {isCompressing ? (
                        <span className="flex items-center justify-center space-x-2"><Loader size={16} className="animate-spin" /> <span>Compressing...</span></span>
                      ) : (
                        <span>Compress</span>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 w-full">
                    <label htmlFor="output-format" className="text-xs text-slate-400 block mb-2">Output format:</label>
                    <select id="output-format" title="Select output format" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as 'jpg' | 'png' | 'webp' | 'pdf')} className="w-full bg-white/5 text-slate-200 px-3 py-2 rounded-full text-sm">
                      <option value="jpg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WEBP</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>

                  <div className="mt-6 text-xs text-slate-500">Tip: For best results, upload a high-resolution JPG/PNG. The compressor will preserve visual fidelity while reducing file size.</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Drag & Drop area */}
            <div className="col-span-1 lg:col-span-2 flex flex-col">
              <motion.div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`relative rounded-2xl border-2 p-6 h-72 flex flex-col justify-center items-center transition-all ${dragActive ? 'border-cyan-400/60 bg-white/2' : 'border-white/5 bg-white/1'}`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  title="Upload image file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const f = e.target.files && e.target.files[0];
                    if (f) handleFiles(f);
                  }}
                />

                <motion.div initial={{ opacity: 0.9 }} whileHover={{ scale: 1.02 }} className="flex flex-col items-center justify-center">
                  <UploadCloud size={52} className="text-cyan-400/95 mb-4" />
                  <h3 className="text-xl font-semibold text-white text-center">Drag & drop your image here</h3>
                  <p className="text-sm text-slate-400 mt-2 text-center">Or click <button onClick={handleUploadClick} className="text-cyan-400 underline">browse</button> to select a file</p>

                  <div className="mt-4 flex items-center space-x-3">
                    <div className="text-xs text-slate-400">Max target size:</div>
                    <div className="bg-white/5 px-3 py-1 rounded-full text-sm text-white">100KB</div>
                  </div>

                  {sourceFile && (
                    <div className="mt-6 w-full text-sm text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate" title={sourceFile.name}>{sourceFile.name}</div>
                        <div className="text-xs text-slate-500">{humanFileSize(sourceFile.size)}</div>
                      </div>
                      <div className="text-xs text-slate-400 flex-shrink-0">{sourceFile.type}</div>
                    </div>
                  )}

                  <div className="mt-6 w-full flex items-center justify-center">
                    <div className="w-48 h-3 bg-white/5 rounded-full overflow-hidden">
                      <div ref={progressRef} className="h-full bg-cyan-400 transition-all" />
                    </div>
                  </div>

                </motion.div>

                {/* floating action */}
                <div className="absolute right-6 bottom-6">
                  <button onClick={() => { if (sourceFile) compressImage(sourceFile); }} disabled={!sourceFile || isCompressing} className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-full font-semibold transition-all flex items-center space-x-2">
                    {isCompressing ? <Loader size={16} className="animate-spin" /> : <Check size={16} />}
                    <span>{isCompressing ? 'Working' : 'Start Compress'}</span>
                  </button>
                </div>
              </motion.div>

              {/* Preview area */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: sourceUrl ? 1 : 0.6 }} transition={{ duration: 0.4 }} className="bg-white/3 rounded-2xl p-4 sm:p-6 flex flex-col items-center min-h-0">
                  <h4 className="text-sm text-slate-300 mb-3 flex-shrink-0">Original</h4>
                  <div className="flex-1 flex items-center justify-center w-full min-h-0">
                    {sourceUrl ? (
                      <img src={sourceUrl} alt="original" className="max-h-48 rounded-md object-contain shadow-lg" />
                    ) : (
                      <div className="h-48 w-full rounded-md bg-white/3 flex items-center justify-center text-slate-500 text-center px-2">No image selected</div>
                    )}
                  </div>
                  <div className="mt-3 text-xs text-slate-400 flex-shrink-0">{sourceFile ? humanFileSize(sourceFile.size) : '-'}</div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: previewUrl ? 1 : 0.6 }} transition={{ duration: 0.4 }} className="bg-white/3 rounded-2xl p-4 sm:p-6 flex flex-col items-center min-h-0">
                  <div className="flex items-center w-full justify-between mb-3 flex-shrink-0 gap-2">
                    <h4 className="text-sm text-slate-300 flex-shrink-0">Compressed</h4>
                    {downloadUrl && (
                      <a href={downloadUrl} download={`compressed-${sourceFile?.name || 'image'}.${outputFormat === 'jpg' ? 'jpg' : outputFormat === 'png' ? 'png' : outputFormat === 'webp' ? 'webp' : 'pdf'}`} className="text-cyan-400 hover:underline flex items-center space-x-1 text-xs sm:text-sm flex-shrink-0 whitespace-nowrap">
                        <Download size={14} />
                        <span>Download</span>
                      </a>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full min-h-0">
                    {previewUrl ? (
                      <img src={previewUrl} alt="compressed" className="max-h-48 rounded-md object-contain shadow-lg transition-all" />
                    ) : (
                      <div className="h-48 w-full rounded-md bg-white/3 flex items-center justify-center text-slate-500 text-center px-2">No result yet</div>
                    )}
                  </div>
                  <div className="mt-3 text-xs text-slate-400 flex-shrink-0">{resultSize ? humanFileSize(resultSize) : '-'}</div>
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageCompressor;
