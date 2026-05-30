e// import React from 'react';
// import { motion } from 'framer-motion';
// import { Briefcase } from 'lucide-react'; // Modern icons
// import { Link } from 'react-router-dom';

// const Home = () => {

//   const jobs = [
//   { id: 1, title: "Senior Civil Engineer", type: "Full-Time", location: "Remote", salary: "$120k - $150k", icon: <Briefcase size={24} /> },
//   { id: 2, title: "Master Plumber", type: "Contract", location: "Mumbai", salary: "$40k - $60k", icon: <Briefcase size={24} /> },
//   { id: 3, title: "Industrial Electrician", type: "Full-Time", location: "Pune", salary: "$50k - $75k", icon: <Briefcase size={24} /> },
//   { id: 4, title: "Site Supervisor", type: "Full-Time", location: "Bangalore", salary: "$70k - $90k", icon: <Briefcase size={24} /> },
//   { id: 5, title: "Project Manager", type: "Hybrid", location: "Delhi", salary: "$110k - $140k", icon: <Briefcase size={24} /> },
//   { id: 6, title: "Safety Officer", type: "On-site", location: "Chennai", salary: "$45k - $65k", icon: <Briefcase size={24} /> },
// ];


//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white selection:bg-cyan-500">
//       {/* Hero Section */}
//       <section className="relative pt-32 pb-20 px-6">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-6xl font-extrabold tracking-tight"
//           >
//             Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Dream Career</span>
//           </motion.h1>
//           <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
//             The modern platform for connecting top talent with industry leaders. 
//             Experience job hunting powered by AI and sleek design.
//           </p>
          
//           <div className="mt-10 flex justify-center gap-4">
//             <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-full font-semibold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(8,145,178,0.3)]">
//               Browse Jobs
//             </button>
//             <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all">
//               For Employers
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Featured Job Cards */}
//       <section className="max-w-7xl mx-auto py-20 px-6">
//   <h2 className="text-3xl font-bold mb-10 text-center">Featured Opportunities</h2>
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//     {jobs.map((job) => (
//       <motion.div 
//         key={job.id} 
//         whileHover={{ y: -8, scale: 1.02 }}
//         className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-cyan-500/50 hover:bg-white/10 transition-all group relative overflow-hidden"
//       >
//         {/* Decorative Glow */}
//         <div className="absolute -right-4 -top-4 w-20 h-20 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all" />

//         <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-4 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all duration-300">
//           {job.icon}
//         </div>

//         <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/80 mb-2 block">
//           {job.type}
//         </span>

//         <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
//           {job.title}
//         </h3>

//         <p className="text-gray-400 mt-2 text-sm flex items-center gap-2">
//           <span>{job.location}</span> • <span>{job.salary}</span>
//         </p>

//         <Link 
//   to={`/job/${job.id}`} 
//   className="mt-8 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-cyan-600 hover:border-cyan-600 transition-all text-center block"
// >
//   View Details
// </Link>
//       </motion.div>
//     ))}
//   </div>
// </section>
//     </div>
//   );
// };

// export default Home;





// import React from 'react';
// import { motion } from 'framer-motion';
// import { Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import CountrySlider from './CountrySlider';
// import Hero from './Hero'; // Add this line
// import Footer from './Footer';


// const Home = () => {
//   const jobs = [
//     { 
//       id: 1, title: "Senior Civil Engineer", type: "Full-Time", location: "Remote", salary: "$120k", 
//       image: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&q=80&w=800" 
//     },
//     { 
//       id: 2, title: "Master Plumber", type: "Contract", location: "Mumbai", salary: "$60k", 
//       image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800" 
//     },
//     { 
//       id: 3, title: "Industrial Electrician", type: "Full-Time", location: "Pune", salary: "$75k", 
//       image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" 
//     },
//     { 
//       id: 4, title: "Site Supervisor", type: "Full-Time", location: "Bangalore", salary: "$90k", 
//       image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800" 
//     },
//     { 
//       id: 5, title: "Project Manager", type: "Hybrid", location: "Delhi", salary: "$140k", 
//       image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800" 
//     },
//     { 
//       id: 6, title: "Safety Officer", type: "On-site", location: "Chennai", salary: "$65k", 
//       image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" 
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500 overflow-x-hidden">
      
//       {/* --- HERO SECTION WITH VIDEO BACKGROUND --- */}
//       <section className="relative h-[90vh] flex items-center justify-center px-6 overflow-hidden">
//         {/* Background Video */}
//         <div className="absolute inset-0 z-0">
//           <video 
//             autoPlay loop muted playsInline 
//             className="w-full h-full object-cover opacity-40"
//           >
//             <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-blue-lines-shining-33871-large.mp4" type="video/mp4" />
//           </video>
//           {/* Gradient Overlays for smooth blending */}
//           <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/20 via-[#0f172a]/60 to-[#020617]" />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]" />
//         </div>

//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 inline-block">
//               The Future of Construction Hiring
//             </span>
//             <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
//               Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Legendary</span> Career
//             </h1>
//             <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//               Skip the noise. Get connected with premium industrial opportunities 
//               using our AI-driven matching ecosystem.
//             </p>
            
//             <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
//               <button className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(8,145,178,0.3)] flex items-center justify-center gap-2">
//                 Explore Vacancies <ArrowRight size={20} />
//               </button>
//               <button className="px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all border-b-4 border-b-white/5 active:border-b-0">
//                 Post a Job
//               </button>
//             </div>
//             <CountrySlider/>
//           </motion.div>
//         </div>
//       </section>

//       {/* --- FEATURED JOB CARDS WITH IMAGES --- */}
//       <section className="max-w-7xl mx-auto py-32 px-6">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
//           <div>
//             <h2 className="text-4xl font-bold">Featured Opportunities</h2>
//             <p className="text-gray-500 mt-2">Hand-picked roles from top-tier companies</p>
//           </div>
//           <Link to="/jobs" className="text-cyan-400 font-bold hover:text-cyan-300 transition-all flex items-center gap-2">
//             View All Jobs <ArrowRight size={18} />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {jobs.map((job) => (
//             <motion.div 
//               key={job.id} 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -12 }}
//               className="group bg-[#0f172a]/50 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm hover:border-cyan-500/40 hover:bg-[#0f172a] transition-all duration-500 shadow-2xl"
//             >
//               {/* Job Image Container */}
//               <div className="h-48 w-full overflow-hidden relative">
//                 <img 
//                   src={job.image} 
//                   alt={job.title} 
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
//                 <div className="absolute top-4 left-4 bg-cyan-600/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
//                   {job.type}
//                 </div>
//               </div>

//               <div className="p-8">
//                 <div className="flex items-center gap-3 text-cyan-400 mb-4">
//                   <Briefcase size={18} />
//                   <span className="text-xs font-bold tracking-widest uppercase">Verified Employer</span>
//                 </div>

//                 <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
//                   {job.title}
//                 </h3>

//                 <div className="space-y-3 mb-8">
//                   <div className="flex items-center gap-2 text-gray-400 text-sm">
//                     <MapPin size={16} className="text-gray-600" /> {job.location}
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-400 text-sm">
//                     <DollarSign size={16} className="text-gray-600" /> {job.salary} / Yearly
//                   </div>
//                 </div>

//                 <Link 
//                   to={`/job/${job.id}`} 
//                   className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-cyan-600 hover:border-cyan-600 transition-all text-center block shadow-lg"
//                 >
//                   View Position
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <Hero/>
//         <Footer/>
//       </section>
//     </div>
//   );
// };

// export default Home;



import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountrySlider from './CountrySlider';
import Hero from './Hero';
import Footer from './Footer';

const Home = () => {
  const jobs = [
    { id: 1, title: "Senior Civil Engineer", type: "Full-Time", location: "Remote", salary: "$120k", image: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Master Plumber", type: "Contract", location: "Mumbai", salary: "$60k", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Industrial Electrician", type: "Full-Time", location: "Pune", salary: "$75k", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Site Supervisor", type: "Full-Time", location: "Bangalore", salary: "$90k", image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Project Manager", type: "Hybrid", location: "Delhi", salary: "$140k", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800" },
    { id: 6, title: "Safety Officer", type: "On-site", location: "Chennai", salary: "$65k", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        {/* <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-blue-lines-shining-33871-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/20 via-[#0f172a]/60 to-[#020617]" />
        </div> */}

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
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5 mb-12">
              <button className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-bold transition-all shadow-[0_0_40px_rgba(8,145,178,0.3)] flex items-center justify-center gap-2">
                Explore Vacancies <ArrowRight size={20} />
              </button>
              <button className="px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                Post a Job
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- COUNTRY SLIDER (Placed between sections) --- */}
      <div className="py-4 bg-[#020617]">
        <CountrySlider/>
      </div>

      {/* --- FEATURED JOB CARDS --- */}
      {/* Reduced py-32 to pt-12 to close the gap */}
      <section className="max-w-7xl mx-auto pt-12 pb-32 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold">Featured Opportunities</h2>
            <p className="text-gray-500 mt-2">Hand-picked roles from top-tier companies</p>
          </div>
          <Link to="/jobs" className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-2">
            View All Jobs <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs.map((job) => (
            <motion.div 
              key={job.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group bg-[#0f172a]/50 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-500"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img src={job.image} alt={job.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-cyan-600/90 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                  {job.type}
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 text-cyan-400 mb-4">
                  <Briefcase size={18} />
                  <span className="text-xs font-bold uppercase">Verified Employer</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400">{job.title}</h3>
                <div className="space-y-3 mb-8 text-gray-400 text-sm">
                  <div className="flex items-center gap-2"><MapPin size={16} /> {job.location}</div>
                  <div className="flex items-center gap-2"><DollarSign size={16} /> {job.salary} / Yearly</div>
                </div>
                <Link to={`/job/${job.id}`} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-cyan-600 transition-all text-center block">
                  View Position
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Secondary Content Area */}
        <div className="mt-20">
          <Hero/>
          <Footer/>
        </div>
      </section>
    </div>
  );
};

export default Home;