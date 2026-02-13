import React from 'react';
import { useParams } from 'react-router-dom';
import ImageCompressor from './ImageCompressor';
import SEOMetaGenerator from './SEOMetaGenerator.tsx';
import RobotsAndSitemapGenerator from './RobotsAndSitemapGenerator.tsx';
import { TOOLS } from '../constants';

const ToolRouter: React.FC = () => {
  const { toolId } = useParams();
  const tool = TOOLS.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Tool not found</h2>
        </div>
      </div>
    );
  }

  // route to specific tool page component by id
  switch (tool.id) {
    case 'image-compressor':
      return <ImageCompressor />;
    case 'seo-meta-generator':
      return <SEOMetaGenerator />;
    case 'robots-and-sitemap':
      return <RobotsAndSitemapGenerator />;
    default:
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Tool not implemented yet</h2>
          </div>
        </div>
      );
  }
};

export default ToolRouter;
