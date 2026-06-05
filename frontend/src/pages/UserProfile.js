// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   User, Mail, Phone, Calendar, 
//    ArrowLeft,
//   ShieldCheck, MapPin, ChevronRight 
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Context use karein

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const { user: authUser } = useAuth(); // AuthContext se token aur basic info lein
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         // Aapka backend route jo user ki full details (with populated profile) deta ho
//         const response = await fetch('http://localhost:5000/api/v1/auth/getUserDetails', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const data = await response.json();
//         if (data.success) {
//           setProfileData(data.userDetails);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) return <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center font-bold">Loading Profile...</div>;

//   // Agar backend se data na mile toh AuthContext wala basic data use karein
//   const displayUser = profileData || authUser;
//   const details = profileData?.additionalDetails || {};

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="min-h-screen bg-[#0f172a] flex flex-col pt-20"
//     >
//       {/* Top Nav */}
//       <div className="w-full max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
//         <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white">
//           <ArrowLeft size={20} /> <span className="font-bold text-sm">Back</span>
//         </button>
        
//         <div className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
//           <div className="text-right hidden sm:block">
//             <p className="text-white font-bold text-sm">{displayUser?.fullName}</p>
//             <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">{displayUser?.role}</p>
//           </div>
//           <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
//              <User size={20} />
//           </div>
//         </div>
//       </div>

//       {/* Profile Hero */}
//       <div className="flex-1 px-6 pb-24">
//         <div className="max-w-7xl mx-auto flex flex-col gap-10">
//           <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl">
//             <div className="w-40 h-40 md:w-52 md:h-52 rounded-[4rem] bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-2xl">
//               <User size={80} />
//             </div>

//             <div className="text-center md:text-left">
//               <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">{displayUser?.fullName}</h2>
//               <div className="flex flex-wrap justify-center md:justify-start gap-4">
//                 <span className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-black uppercase tracking-widest">
//                   <ShieldCheck size={16} /> Verified Account
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Details Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <DetailBox icon={<Mail />} label="Email Address" value={displayUser?.email} />
//               <DetailBox icon={<Phone />} label="Contact" value={details?.contactNumber || "Not Provided"} />
//               <DetailBox icon={<MapPin />} label="Gender" value={details?.gender || "Not Provided"} />
//               <DetailBox icon={<Calendar />} label="Age" value={details?.age ? `${details.age} Years` : "Not Provided"} />
//             </div>

//             <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 shadow-xl">
//               <h3 className="text-2xl font-bold text-white mb-8">About Me</h3>
//               <p className="text-gray-400 leading-relaxed italic">
//                 {details?.about || "No description added yet. Click edit to tell people about yourself!"}
//               </p>
//               <button className="mt-10 w-full flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-blue-500/50 transition-all group">
//                 <span className="text-gray-200 font-bold text-lg">Edit Profile Details</span>
//                 <ChevronRight className="group-hover:translate-x-2 transition-transform text-blue-400" size={24} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const DetailBox = ({ icon, label, value }) => (
//   <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group">
//     <div className="w-14 h-14 bg-blue-600/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
//       {React.cloneElement(icon, { size: 28 })}
//     </div>
//     <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-2">{label}</p>
//     <p className="text-xl text-gray-100 font-bold tracking-tight">{value}</p>
//   </div>
// );

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Calendar, 
  ArrowLeft, ShieldCheck, MapPin, 
  ChevronRight, Edit3, Save, X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Edit State Management Form
  const [editForm, setEditForm] = useState({
    fullName: "",
    contactNumber: "",
    gender: "",
    age: "",
    about: ""
  });

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/getUserDetails`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProfileData(data.userDetails);
        // Initialize form fields with incoming backend data sync
        setEditForm({
          fullName: data.userDetails?.fullName || "",
          contactNumber: data.userDetails?.additionalDetails?.contactNumber || "",
          gender: data.userDetails?.additionalDetails?.gender || "",
          age: data.userDetails?.additionalDetails?.age || "",
          about: data.userDetails?.additionalDetails?.about || ""
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSaveProfile = async () => {
  setSaveLoading(true);
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/updateProfile`, {
      method: 'PUT', // Route schema method
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editForm)
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      toast.success("Profile records updated dynamically! ✨");
      setIsEditing(false);
      fetchUserData(); // Refreshes and repopulates dashboard view
    } else {
      // Backend se jo message aayega ab wahi toast par dikhega!
      toast.error(data.message || "Failed update process loop");
    }
  } catch (error) {
    console.error("Update operational crash details:", error);
    toast.error("Network or connection error with server!");
  } finally {
    setSaveLoading(false);
  }
};

  if (loading) return <div className="min-h-screen bg-[#0f172a] text-cyan-400 flex items-center justify-center font-bold animate-pulse">Loading Profile...</div>;

  const displayUser = profileData || authUser;
  const details = profileData?.additionalDetails || {};

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#0f172a] flex flex-col pt-16 px-4"
    >
      <Toaster />
      
      {/* Top Standard Nav Bar - Optimized to Max 4W size scale */}
      <div className="w-full max-w-4xl mx-auto py-6 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all text-sm font-medium">
          <ArrowLeft size={16} /> Back
        </button>
        
        <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-white font-semibold text-xs">{displayUser?.fullName}</p>
            <p className="text-blue-400 text-[9px] font-bold uppercase tracking-wider">{displayUser?.role}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">
             <User size={16} />
          </div>
        </div>
      </div>

      {/* Main Profile Core Wrapper Box */}
      <div className="w-full max-w-4xl mx-auto pb-16 space-y-6">
        
        {/* Profile Hero Header Element - Resized perfectly from p-20 down to p-8 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-md">
            <User size={48} />
          </div>

          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <div className="space-y-1 max-w-xs mx-auto md:mx-0">
                <label className="text-[10px] text-gray-400 uppercase font-bold">Edit Full Name</label>
                <input type="text" value={editForm.fullName} onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} className="w-full bg-slate-900 border border-white/10 text-white px-3 py-1.5 rounded-xl outline-none focus:border-blue-500 text-lg font-bold" />
              </div>
            ) : (
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{displayUser?.fullName}</h2>
            )}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck size={12} /> Verified Account
              </span>
            </div>
          </div>
          
          {/* Action Trigger Node Toggle controls */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button onClick={handleSaveProfile} disabled={saveLoading} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition-all">
                  <Save size={14} /> {saveLoading ? "Saving..." : "Save"}
                </button>
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all">
                  <X size={14} /> Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:border-blue-500/40 rounded-xl text-xs font-bold transition-all text-gray-300 hover:text-white">
                <Edit3 size={14} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Details Informational Grid - Resized from p-10 grids down to standardized clean compact blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailBox isEditing={false} icon={<Mail />} label="Email Address" value={displayUser?.email} />
            
            <DetailBox isEditing={isEditing} icon={<Phone />} label="Contact" value={details?.contactNumber || "Not Provided"}>
              <input type="text" value={editForm.contactNumber} onChange={(e) => setEditForm({...editForm, contactNumber: e.target.value})} className="w-full bg-slate-900 border border-white/10 text-white p-2 rounded-xl text-sm outline-none mt-1 focus:border-blue-500" />
            </DetailBox>
            
            <DetailBox isEditing={isEditing} icon={<MapPin />} label="Gender" value={details?.gender || "Not Provided"}>
              <select value={editForm.gender} onChange={(e) => setEditForm({...editForm, gender: e.target.value})} className="w-full bg-slate-900 border border-white/10 text-white p-2 rounded-xl text-sm outline-none mt-1 focus:border-blue-500">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </DetailBox>
            
            <DetailBox isEditing={isEditing} icon={<Calendar />} label="Age" value={details?.age ? `${details.age} Years` : "Not Provided"}>
              <input type="number" value={editForm.age} onChange={(e) => setEditForm({...editForm, age: e.target.value})} className="w-full bg-slate-900 border border-white/10 text-white p-2 rounded-xl text-sm outline-none mt-1 focus:border-blue-500" />
            </DetailBox>
          </div>

          {/* About Bio Section - Re-structured bounding block size */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">About Me</h3>
              {isEditing ? (
                <textarea rows="4" value={editForm.about} onChange={(e) => setEditForm({...editForm, about: e.target.value})} className="w-full bg-slate-900 border border-white/10 text-white p-3 rounded-xl text-xs outline-none focus:border-blue-500 resize-none" placeholder="Write something about your workflow..." />
              ) : (
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "{details?.about || "No description added yet. Click edit to update your bio details!"}"
                </p>
              )}
            </div>
            
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="mt-4 w-full flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl hover:border-blue-500/50 transition-all group text-left">
                <span className="text-gray-300 font-medium text-xs">Modify Content Blocks</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform text-blue-400" size={16} />
              </button>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// Sub-Component Block optimized to encapsulate inline reactive form fields rendering logic
const DetailBox = ({ icon, label, value, isEditing, children }) => (
  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-all group flex flex-col justify-between">
    <div>
      <div className="w-9 h-9 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition-transform">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</p>
    </div>
    {isEditing ? children : <p className="text-base text-gray-200 font-semibold truncate">{value}</p>}
  </div>
);

export default UserProfile;