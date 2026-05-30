import React from 'react';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

const JobCard = ({ job, onApply }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 transition-all group">
      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{job.description}</p>
      
      <div className="flex flex-wrap gap-4 text-xs text-gray-300 mb-6">
        <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded"><Briefcase size={14}/> {job.category}</span>
        <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded"><MapPin size={14}/> {job.location}</span>
        <span className="flex items-center gap-1 bg-blue-500/20 text-blue-300 px-2 py-1 rounded"><DollarSign size={14}/> {job.salary}</span>
      </div>
      
      <button 
        onClick={() => onApply(job._id)}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all"
      >
        Apply Now
      </button>
    </div>
  );
};
export default JobCard;