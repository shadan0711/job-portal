
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { LogOut, Briefcase, Search, UserPlus, User as UserIcon } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/5 px-6 py-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
        
//         {/* Logo Section */}
//         <Link to="/" className="flex items-center gap-2 group">
//           <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-2 rounded-xl">
//             <Briefcase className="text-white" size={24} />
//           </div>
//           <span className="text-2xl font-black text-white">
//             JOB<span className="text-blue-400">FLOW</span>
//           </span>
//         </Link>

//         {/* Auth Actions */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             <div className="flex items-center gap-4">
              
//               {/* 🔥 FIX: Profile Icon tabhi dikhega jab user Admin NAHI hoga */}
//               {user.role !== 'Admin' && (
//                 <Link to="/UserProfile" className="p-2 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400 transition-all">
//                   <UserIcon size={20} className="text-gray-300" />
//                 </Link>
//               )}
              
//               <div className="hidden md:block text-right">
//                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
//                   {user.role === 'Admin' ? 'Admin Node' : 'Welcome'}
//                 </p>
//                 <p className="text-sm font-semibold text-white">{user.fullName || 'User'}</p>
//               </div>

//               <button 
//                 onClick={handleLogout} 
//                 className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
//               >
//                 <LogOut size={18} /> 
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">
//               <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-all">
//                 Login
//               </Link>
//               <Link to="/signup" className="flex items-center gap-2 bg-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg hover:bg-blue-500 transition-all">
//                 <UserPlus size={18} />
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Briefcase, UserPlus, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/5 px-4 md:px-6 py-3 md:py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-1.5 md:p-2 rounded-xl transition-transform group-hover:scale-105">
            <Briefcase className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-xl md:text-2xl font-black text-white tracking-tight">
            JOB<span className="text-blue-400">FLOW</span>
          </span>
        </Link>

        {/* Auth Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <div className="flex items-center gap-3 md:gap-4">
              
              {/* Profile Icon tabhi dikhega jab user Admin NAHI hoga */}
              {user.role !== 'Admin' && (
                <Link to="/UserProfile" className="p-2 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400 transition-all flex items-center justify-center">
                  <UserIcon className="text-gray-300 w-[18px] h-[18px] md:w-5 md:h-5" />
                </Link>
              )}
              
              <div className="hidden md:block text-right">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  {user.role === 'Admin' ? 'Admin Node' : 'Welcome'}
                </p>
                <p className="text-sm font-semibold text-white">{user.fullName || 'User'}</p>
              </div>

              <button 
                onClick={handleLogout} 
                className="flex items-center gap-1.5 md:gap-2 bg-red-500/10 text-red-400 px-3 py-2 md:px-4 md:py-2 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-xs md:text-sm font-semibold"
              >
                <LogOut size={16} /> 
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 md:gap-3">
              <Link to="/login" className="px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-gray-400 hover:text-white transition-all">
                Login
              </Link>
              
              {/* 🔥 FIXED & POLISHED RESPONSIVE SIGN UP BUTTON */}
              <Link 
                to="/signup" 
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-cyan-500/20 px-3.5 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm transition-all duration-300 active:scale-95 hover:scale-[1.02]"
              >
                <UserPlus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;