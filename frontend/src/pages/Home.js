


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, Zap, Wind, HardHat, Hammer, Shield, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountrySlider from './CountrySlider';
import Hero from './Hero';
import Footer from './Footer';

const Home = () => {
  const [categories, setCategories] = useState([]);

  const iconMap = { Zap, Wrench, Wind, HardHat, Hammer, Shield, Layers };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/category/all');
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log('Category Fetch Error:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500 overflow-x-hidden">
      <section className="relative h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 inline-block">
              The Future of Construction Hiring
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Legendary</span> Career
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Skip the noise. Get connected with premium industrial opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-4 bg-[#020617]"><CountrySlider /></div>

      <section className="max-w-7xl mx-auto pt-20 pb-12 px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <p className="text-gray-500 text-sm mt-1">Select a category to view all specialized job opportunities</p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-10 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-gray-400 text-lg">No Active Categories Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((cat) => {
              const IconComponent = iconMap[cat.icon] || Zap;
              return (
                <Link to={`/jobs/${cat._id}`} key={cat._id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(34,211,238,0.4)' }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 backdrop-blur-sm group h-full"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                      <IconComponent size={22} />
                    </div>
                    <h3 className="font-bold text-sm text-white tracking-wide group-hover:text-cyan-400 transition-colors capitalize">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1 font-medium group-hover:text-gray-400">
                      {cat.vacancies || 0} Vacancies
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto pb-32 px-6">
        <div className="mt-20"><Hero /><Footer /></div>
      </section>
    </div>
  );
};

export default Home;