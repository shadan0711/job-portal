
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Plus, Trash2, Users, Briefcase, FileText, ExternalLink, MapPin } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';


// import { useNavigate } from 'react-router-dom';



// const AdminPanel = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({ users: 0, jobs: 0, apps: 0 });
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/admin/stats', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         if (res.data.success) {
//           setStats(res.data.stats);
//           setApplications(res.data.applications);
//         }
//       } catch (err) {
//         console.error("Error fetching admin stats", err);
//         toast.error("Failed to load admin data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
//         <div className="text-cyan-400 font-bold animate-bounce text-xl">Accessing Admin Secure Vault...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white p-6 pt-28 max-w-7xl mx-auto">
//       <Toaster />
      
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
//         <div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//             Admin Console
//           </h1>
//           <p className="text-gray-400 mt-2">Manage jobs, review user applications, and platform metrics.</p>
//         </div>
//         <button 
//       onClick={() => navigate('/admin/jobpost')} // Ye line add karein
//       className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
//     >
//       <Plus size={20} /> Post New Job
//     </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         <StatCard label="Total Users" value={stats.users} icon={Users} color="blue" />
//         <StatCard label="Live Jobs" value={stats.jobs} icon={Briefcase} color="emerald" />
//         <StatCard label="Total Applications" value={stats.apps} icon={FileText} color="amber" />
//       </div>

//       {/* Applications Table */}
//       <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md">
//         <div className="p-6 border-b border-white/10">
//           <h2 className="text-xl font-bold">Recent Applications</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-widest">
//               <tr>
//                 <th className="px-6 py-4">Candidate</th>
//                 <th className="px-6 py-4">Applied For</th>
//                 <th className="px-6 py-4">Exp. (Yrs)</th>
//                 <th className="px-6 py-4">Resume</th>
//                 <th className="px-6 py-4 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-white/5">
//               {applications.length > 0 ? (
//                 applications.map((app) => (
//                   <tr key={app._id} className="hover:bg-white/5 transition-colors group">
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-white">{app.fullName}</div>
//                       <div className="text-xs text-gray-500">{app.email}</div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-cyan-400">
//                         {app.jobId?.title || "Unknown Job"}
//                       </div>
//                       <div className="text-xs text-gray-500 flex items-center gap-1">
//                         <MapPin size={12} /> {app.jobId?.location || "N/A"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10">
//                         {app.experience} Years
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <a 
//                         href={app.resumeUrl} 
//                         target="_blank" 
//                         rel="noreferrer"
//                         className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm underline underline-offset-4"
//                       >
//                         View CV <ExternalLink size={14} />
//                       </a>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
//                     No applications found in the database.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ label, value, icon: Icon, color }) => {
//   const colorMap = {
//     blue: "bg-blue-500/20 text-blue-400 border-blue-500/20",
//     emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
//     amber: "bg-amber-500/20 text-amber-400 border-amber-500/20"
//   };

//   return (
//     <div className={`p-6 bg-white/5 border border-white/10 rounded-3xl transition-transform hover:scale-[1.02] duration-300`}>
//       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colorMap[color]} border`}>
//         <Icon size={24} />
//       </div>
//       <p className="text-gray-400 text-sm font-medium">{label}</p>
//       <p className="text-4xl font-bold mt-1 tracking-tight">{value}</p>
//     </div>
//   );
// };

// export default AdminPanel;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Users, Briefcase, FileText, ExternalLink, MapPin, FolderPlus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, jobs: 0, apps: 0 });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category State
  const [categoryData, setCategoryData] = useState({
    name: "",
    icon: "",
    vacancies: "",
  });

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

  // Category Submit Handler
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api';
      
      await axios.post(
        `${baseUrl}/category/create`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category Created Successfully!");
      setCategoryData({ name: "", icon: "", vacancies: "" }); // Reset Form
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category");
    }
  };

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
          onClick={() => navigate('/admin/jobpost')}
          className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={20} /> Post New Job
        </button>
      </div>

      {/* Create Category Form Section (Upper Area) */}
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 mb-10 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
          <FolderPlus className="text-cyan-400" size={22} />
          <h2 className="text-xl font-bold">Create New Category</h2>
        </div>
        
        <form onSubmit={handleCategorySubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5 tracking-wider uppercase">Category Name</label>
            <input
              type="text"
              placeholder="e.g. Development"
              value={categoryData.name}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5 tracking-wider uppercase">Icon Name</label>
            <input
              type="text"
              placeholder="e.g. Code"
              value={categoryData.icon}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              onChange={(e) => setCategoryData({ ...categoryData, icon: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5 tracking-wider uppercase">Vacancies</label>
            <input
              type="number"
              placeholder="e.g. 12"
              value={categoryData.vacancies}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              onChange={(e) => setCategoryData({ ...categoryData, vacancies: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Create Category
          </button>
        </form>
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