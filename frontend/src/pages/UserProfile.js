import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Calendar, 
   ArrowLeft,
  ShieldCheck, MapPin, ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Context use karein

const UserProfile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth(); // AuthContext se token aur basic info lein
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Aapka backend route jo user ki full details (with populated profile) deta ho
        const response = await fetch('http://localhost:5000/api/v1/auth/getUserDetails', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setProfileData(data.userDetails);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center font-bold">Loading Profile...</div>;

  // Agar backend se data na mile toh AuthContext wala basic data use karein
  const displayUser = profileData || authUser;
  const details = profileData?.additionalDetails || {};

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#0f172a] flex flex-col pt-20"
    >
      {/* Top Nav */}
      <div className="w-full max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white">
          <ArrowLeft size={20} /> <span className="font-bold text-sm">Back</span>
        </button>
        
        <div className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-white font-bold text-sm">{displayUser?.fullName}</p>
            <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">{displayUser?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
             <User size={20} />
          </div>
        </div>
      </div>

      {/* Profile Hero */}
      <div className="flex-1 px-6 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-[4rem] bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-2xl">
              <User size={80} />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">{displayUser?.fullName}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-black uppercase tracking-widest">
                  <ShieldCheck size={16} /> Verified Account
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailBox icon={<Mail />} label="Email Address" value={displayUser?.email} />
              <DetailBox icon={<Phone />} label="Contact" value={details?.contactNumber || "Not Provided"} />
              <DetailBox icon={<MapPin />} label="Gender" value={details?.gender || "Not Provided"} />
              <DetailBox icon={<Calendar />} label="Age" value={details?.age ? `${details.age} Years` : "Not Provided"} />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-8">About Me</h3>
              <p className="text-gray-400 leading-relaxed italic">
                {details?.about || "No description added yet. Click edit to tell people about yourself!"}
              </p>
              <button className="mt-10 w-full flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-blue-500/50 transition-all group">
                <span className="text-gray-200 font-bold text-lg">Edit Profile Details</span>
                <ChevronRight className="group-hover:translate-x-2 transition-transform text-blue-400" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DetailBox = ({ icon, label, value }) => (
  <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group">
    <div className="w-14 h-14 bg-blue-600/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-2">{label}</p>
    <p className="text-xl text-gray-100 font-bold tracking-tight">{value}</p>
  </div>
);

export default UserProfile;