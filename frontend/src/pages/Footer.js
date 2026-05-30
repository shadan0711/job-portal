import React from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Users, 
  Briefcase,
  ChevronRight,
  CodeXml 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-white/10 pt-16 pb-8 text-white font-sans">
      {/* Changed grid-cols-4 to grid-cols-3 for better spacing */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4 text-left">
          <h3 className="text-2xl font-bold">
            Job<span className="text-cyan-400">Portal</span>
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            The leading platform for Engineering and Construction careers. 
            Connecting professionals with world-class industrial projects.
          </p>
          <div className="flex gap-4">
            <Globe size={20} className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
            <Users size={20} className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
            <Briefcase size={20} className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
            <CodeXml size={20} className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-left">
          <h4 className="font-bold mb-6 text-white text-lg">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-cyan-400 cursor-pointer transition-all flex items-center gap-2">
              <ChevronRight size={14} className="text-cyan-600" /> Find Jobs
            </li>
            <li className="hover:text-cyan-400 cursor-pointer transition-all flex items-center gap-2">
              <ChevronRight size={14} className="text-cyan-600" /> Companies
            </li>
            <li className="hover:text-cyan-400 cursor-pointer transition-all flex items-center gap-2">
              <ChevronRight size={14} className="text-cyan-600" /> Career Advice
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-left">
          <h4 className="font-bold mb-6 text-white text-lg">Support</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
               <Mail size={16} className="text-cyan-500" /> contact@jobportal.com
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
               <Phone size={16} className="text-cyan-500" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
               <MapPin size={16} className="text-cyan-500" /> New Delhi, India
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-gray-500 text-xs">
          © 2026 JobPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;