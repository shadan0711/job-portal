import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-[#020617] text-white py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Build Your <span className="text-blue-400">Future</span> With Us
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Connecting skilled professionals with world-class construction and engineering projects.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Expert Engineers', 'Verified Sites', 'Safety First'].map((item) => (
            <div key={item} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm">
              <CheckCircle size={16} className="text-blue-400" /> {item}
            </div>
          ))}
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-blue-500/20">
          Explore Jobs <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;