// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Plus, Trash2, Users, Briefcase, FileText } from 'lucide-react';

// const AdminPanel = () => {
//   const [stats, setStats] = useState({ users: 0, jobs: 0, apps: 0 });
//   const [loading, setLoading] = useState(true);

//   // Fetch real stats from the backend
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/admin/stats', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setStats(res.data.stats); // Assuming backend returns {stats: {users, jobs, apps}}
//       } catch (err) {
//         console.error("Error fetching admin stats", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []); // useEffect is now USED

//   if (loading) return <div className="p-10 text-white">Loading Dashboard...</div>;

//   return (
//     <div className="p-10 pt-28 max-w-7xl mx-auto">
//       <div className="flex justify-between items-end mb-10">
//         <div>
//           <h1 className="text-4xl font-bold">Admin Console</h1>
//           <p className="text-gray-400">Manage jobs, users, and review metrics.</p>
//         </div>
//         <button className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
//           <Plus size={20} /> Post New Job
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         {/* We are now using 'stats' and 'icon' variables */}
//         <StatCard label="Total Users" value={stats.users} icon={Users} color="blue" />
//         <StatCard label="Live Jobs" value={stats.jobs} icon={Briefcase} color="emerald" />
//         <StatCard label="Applications" value={stats.apps} icon={FileText} color="amber" />
//       </div>

//       <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-white/5 text-gray-400 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-4">Job Title</th>
//               <th className="px-6 py-4">Category</th>
//               <th className="px-6 py-4">Applicants</th>
//               <th className="px-6 py-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-white/5">
//             <tr className="hover:bg-white/5 transition-colors">
//               <td className="px-6 py-4 font-medium">Lead UX Designer</td>
//               <td className="px-6 py-4 text-gray-400">Design</td>
//               <td className="px-6 py-4">45</td>
//               <td className="px-6 py-4 text-right">
//                 <button className="text-red-400 hover:text-red-300 ml-4"><Trash2 size={18}/></button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Helper component for the stat cards
// const StatCard = ({ label, value, icon: Icon, color }) => {
//   // Mapping colors to Tailwind classes safely
//   const colorMap = {
//     blue: "bg-blue-500/20 text-blue-400",
//     emerald: "bg-emerald-500/20 text-emerald-400",
//     amber: "bg-amber-500/20 text-amber-400"
//   };

//   return (
//     <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
//       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colorMap[color]}`}>
//         <Icon size={24} />
//       </div>
//       <p className="text-gray-400 text-sm">{label}</p>
//       <p className="text-3xl font-bold mt-1">{value}</p>
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Users, Briefcase, FileText, ExternalLink, MapPin } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';


import { useNavigate } from 'react-router-dom';



const AdminPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, jobs: 0, apps: 0 });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setStats(res.data.stats);
          setApplications(res.data.applications);
        }
      } catch (err) {
        console.error("Error fetching admin stats", err);
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-cyan-400 font-bold animate-bounce text-xl">Accessing Admin Secure Vault...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 pt-28 max-w-7xl mx-auto">
      <Toaster />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Console
          </h1>
          <p className="text-gray-400 mt-2">Manage jobs, review user applications, and platform metrics.</p>
        </div>
        <button 
      onClick={() => navigate('/admin/jobpost')} // Ye line add karein
      className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
    >
      <Plus size={20} /> Post New Job
    </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total Users" value={stats.users} icon={Users} color="blue" />
        <StatCard label="Live Jobs" value={stats.jobs} icon={Briefcase} color="emerald" />
        <StatCard label="Total Applications" value={stats.apps} icon={FileText} color="amber" />
      </div>

      {/* Applications Table */}
      <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Recent Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-widest">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Applied For</th>
                <th className="px-6 py-4">Exp. (Yrs)</th>
                <th className="px-6 py-4">Resume</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{app.fullName}</div>
                      <div className="text-xs text-gray-500">{app.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-cyan-400">
                        {app.jobId?.title || "Unknown Job"}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={12} /> {app.jobId?.location || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10">
                        {app.experience} Years
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm underline underline-offset-4"
                      >
                        View CV <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    No applications found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/20 text-amber-400 border-amber-500/20"
  };

  return (
    <div className={`p-6 bg-white/5 border border-white/10 rounded-3xl transition-transform hover:scale-[1.02] duration-300`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colorMap[color]} border`}>
        <Icon size={24} />
      </div>
      <p className="text-gray-400 text-sm font-medium">{label}</p>
      <p className="text-4xl font-bold mt-1 tracking-tight">{value}</p>
    </div>
  );
};

export default AdminPanel;