
import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-32">
      <section className="pt-20 pb-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient">Privacy Policy</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how RankifyPro handles your personal data.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed">
          <p className="text-sm text-slate-500 mb-8">Last Updated: October 2024</p>
          
          <h2 className="text-white">1. Introduction</h2>
          <p>
            Welcome to RankifyPro ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your personal information when you visit our website or engage with our SEO services.
          </p>

          <h2 className="text-white">2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li><strong>Personal Contact Information:</strong> Name, email address, phone number, and LinkedIn profile link when you fill out our contact forms or request an audit.</li>
            <li><strong>Business Information:</strong> Website URL, business name, and current SEO performance data provided during consultations.</li>
            <li><strong>Usage Data:</strong> We automatically collect certain information when you visit our site, such as your IP address, browser type, and how you interact with our pages via cookies and analytics tools.</li>
          </ul>

          <h2 className="text-white">3. How We Use Your Information</h2>
          <p>We use the collected data for various purposes, including:</p>
          <ul>
            <li>To provide and maintain our SEO services.</li>
            <li>To notify you about changes to our service or company updates.</li>
            <li>To provide customer support and strategy consultations.</li>
            <li>To gather analysis or valuable information so that we can improve our website and services.</li>
            <li>To monitor the usage of our website and detect/prevent technical issues.</li>
          </ul>

          <h2 className="text-white">4. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your personal information, including SSL encryption and secure database management.
          </p>

          <h2 className="text-white">5. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-white">6. Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our services (e.g., Google Analytics, CRM software). These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>

          <h2 className="text-white">7. Your Rights</h2>
          <p>
            You have the right to access, update, or delete the personal information we have on you. If you wish to be informed what personal data we hold about you or if you want it to be removed from our systems, please contact us at fahadhussain0282@gmail.com.
          </p>

          <h2 className="text-white">8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-white">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:<br />
            Email: fahadhussain0282@gmail.com<br />
            Phone: +92 349 7731178
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
