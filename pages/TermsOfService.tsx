
import React, { useEffect } from 'react';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-32">
      <section className="pt-20 pb-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gradient">Terms of Service</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our services or website.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed">
          <p className="text-sm text-slate-500 mb-8">Effective Date: October 2024</p>
          
          <h2 className="text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the RankifyPro website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2 className="text-white">2. Scope of SEO Services</h2>
          <p>
            RankifyPro provides Search Engine Optimization (SEO) services, including but not limited to On-Page, Off-Page, Technical, and Local SEO. While we utilize industry-best practices and ethical "white-hat" strategies, the client acknowledges that search engine algorithms are proprietary and change frequently. We do not guarantee specific rankings or "Position #1" results, as these are controlled solely by search engines like Google.
          </p>

          <h2 className="text-white">3. Client Obligations</h2>
          <p>To ensure the success of our SEO campaigns, the client agrees to:</p>
          <ul>
            <li>Provide accurate and complete information regarding their business and website.</li>
            <li>Provide necessary access to website CMS, FTP, or hosting as required for implementation.</li>
            <li>Respond to requests for content approval or strategy changes in a timely manner.</li>
            <li>Pay for services as outlined in the specific project agreement or invoice.</li>
          </ul>

          <h2 className="text-white">4. Intellectual Property</h2>
          <p>
            All content, strategies, and reports created by RankifyPro for the client remain the intellectual property of RankifyPro until full payment for the respective service period has been received, after which ownership of custom-created content for the client's website transfers to the client.
          </p>

          <h2 className="text-white">5. Limitation of Liability</h2>
          <p>
            RankifyPro shall not be held liable for any loss of rankings, traffic, or business revenue resulting from search engine algorithm updates, manual penalties caused by previous "black-hat" work performed by others, or changes made to the website by the client without our consultation.
          </p>

          <h2 className="text-white">6. Confidentiality</h2>
          <p>
            We respect your business data. Both parties agree to keep all non-public, sensitive business information shared during the course of the engagement strictly confidential.
          </p>

          <h2 className="text-white">7. Termination</h2>
          <p>
            Either party may terminate the service agreement with a written notice as specified in your individual contract (typically 30 days). RankifyPro reserves the right to terminate services immediately if the client is found to be engaging in illegal activities or violating these terms.
          </p>

          <h2 className="text-white">8. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the jurisdiction in which RankifyPro operates, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-white">9. Contact</h2>
          <p>
            For any questions regarding these terms, please contact:<br />
            Email: fahadhussain0282@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
