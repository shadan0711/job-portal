
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, DollarSign, Clock } from 'lucide-react';

const CategoryJobs = () => {
  const { categoryName } = useParams();

  const jobsData = {
    "electrician": [
      { id: "elec-1", title: "Industrial Electrician 1", type: "Full-Time", location: "Mumbai, IN", salary: "₹35,0000" },
      { id: "elec-2", title: "Commercial Wireman 2", type: "Contract", location: "Pune, IN", salary: "₹28,000" },
      { id: "elec-3", title: "Maintenance Electrician 3", type: "Full-Time", location: "Delhi, IN", salary: "₹40,000" },
      { id: "elec-4", title: "Substation Operator 4", type: "Part-Time", location: "Bangalore, IN", salary: "₹22,000" },
      { id: "elec-5", title: "Residential Electrician 5", type: "Full-Time", location: "Chennai, IN", salary: "₹25,000" },
      { id: "elec-6", title: "Solar Panel Electrician 6", type: "Contract", location: "Hyderabad, IN", salary: "₹32,000" },
      { id: "elec-7", title: "Control Panel Wireman 7", type: "Full-Time", location: "Kolkata, IN", salary: "₹30,000" },
      { id: "elec-8", title: "Automotive Electrician 8", type: "Full-Time", location: "Ahmedabad, IN", salary: "₹38,000" },
      { id: "elec-9", title: "High Voltage Lineman 9", type: "Contract", location: "Jaipur, IN", salary: "₹45,000" },
      { id: "elec-10", title: "Apprentice Electrician 10", type: "Full-Time", location: "Surat, IN", salary: "₹18,000" },
    ],
    "plumber": Array.from({ length: 10 }, (_, i) => ({
      id: `plumb-${i + 1}`, title: `Master Plumber ${i + 1}`, type: "Contract", location: "Pune, IN", salary: "₹32,000"
    })),
    "ac technician": Array.from({ length: 10 }, (_, i) => ({
      id: `ac-${i + 1}`, title: `AC Technical Engineer ${i + 1}`, type: "Full-Time", location: "Delhi NCR", salary: "₹30,000"
    })),
    "aaa": Array.from({ length: 10 }, (_, i) => ({
      id: `aaa-${i + 1}`, title: `aaa Specialist ${i + 1}`, type: "Contract", location: "Remote", salary: "₹50,000"
    })),
    "bbbb": Array.from({ length: 10 }, (_, i) => ({
      id: `bbbb-${i + 1}`, title: `bbbb Senior Executive ${i + 1}`, type: "Full-Time", location: "Bangalore", salary: "₹45,000"
    })),
    "cccc": Array.from({ length: 10 }, (_, i) => ({
      id: `cccc-${i + 1}`, title: `cccc Field Officer ${i + 1}`, type: "On-Site", location: "Chennai", salary: "₹38,000"
    })),
    "ddd": Array.from({ length: 10 }, (_, i) => ({
      id: `ddd-${i + 1}`, title: `ddd Core Coordinator ${i + 1}`, type: "Hybrid", location: "Kolkata", salary: "₹40,000"
    })),
  };

  const safeKey = categoryName ? categoryName.toLowerCase() : "";
  const currentJobs = jobsData[safeKey] || [];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        
        <Link to="/" className="flex items-center gap-2 text-cyan-400 mb-8 hover:text-cyan-300 transition-colors group w-fit">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Categories
        </Link>

        <div className="mb-12 border-b border-white/5 pb-6">
          <h1 className="text-4xl font-extrabold text-white capitalize">
            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{categoryName}</span> Jobs
          </h1>
          <p className="text-gray-400 text-sm mt-2">Explore all verified high-paying premium openings listed today.</p>
        </div>

        {currentJobs.length > 0 ? (
          <div className="space-y-4">
            {currentJobs.map((subJob) => (
              <motion.div
                key={subJob.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 6, borderColor: "rgba(34,211,238,0.3)" }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-cyan-500/10 text-cyan-400 px-3 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                      {subJob.type}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Clock size={12} /> Verified Listing
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {subJob.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-cyan-500" /> {subJob.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={14} className="text-emerald-500" /> {subJob.salary} / Month
                    </div>
                  </div>
                </div>

                {/* REDIRECTION CONFIGURATION TO JOBFIND */}
                <Link
                  to={`/jobfind/${subJob.id}`}
                  state={{ jobData: subJob }}
                  className="w-full md:w-auto px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold text-center hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300 active:scale-95 whitespace-nowrap"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-gray-400">No vacancies found for "{categoryName}". Check your App.jsx route setup.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryJobs;