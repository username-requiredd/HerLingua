import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-pink-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold text-xl">D</div>
              <span className="ml-2 font-bold text-xl">DeutschMaster</span>
            </div>
            <p className="text-pink-100 mb-4">Master German naturally with our immersive courses designed for all levels.</p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <a key={social} href="#" className="text-pink-200 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d={`M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`} clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-pink-400 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Courses', 'Pricing', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-pink-100 hover:text-white transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-pink-400 pb-2">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Free Lessons', 'Grammar Guide', 'Vocabulary Lists', 'German Culture'].map((resource) => (
                <li key={resource}>
                  <a href="#" className="text-pink-100 hover:text-white transition">{resource}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-pink-400 pb-2">Contact Us</h3>
            <address className="not-italic text-pink-100">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 mr-2 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Language St, Berlin, Germany</span>
              </div>
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 mr-2 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+49 123 456 789</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@deutschmaster.com</span>
              </div>
            </address>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-pink-200">NEWSLETTER SIGNUP</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-gray-800 rounded-l-lg focus:outline-none w-full"
                />
                <button className="bg-pink-400 hover:bg-pink-300 text-white px-4 py-2 rounded-r-lg transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-pink-500 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-pink-200 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DeutschMaster. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-pink-200 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-pink-200 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-pink-200 hover:text-white text-sm transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;