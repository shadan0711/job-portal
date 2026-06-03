// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // 1. useNavigate import kiya
// import { useAuth } from '../context/AuthContext';
// import { LogOut, Briefcase, Search, UserPlus, User as UserIcon } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate(); // 2. Navigate hook initialize kiya

//   // 3. Logout handle karne ke liye function
//   const handleLogout = () => {
//     logout(); // Context se state clear karega
//     toast.success("Logged out successfully!"); // Toast dikhayega
//     navigate('/'); // Bina refresh kiye home par bhejega
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

//         {/* Find Jobs Link */}
//         {/* <div className="hidden md:flex items-center">
//             <Link to="/jobs" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-blue-400 transition-all">
//                 <Search size={16} /> Find Jobs
//             </Link>
//         </div> */}

//         {/* Auth Actions */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             <div className="flex items-center gap-4">
//               <Link to="/UserProfile" className="p-2 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400 transition-all">
//                 <UserIcon size={20} className="text-gray-300" />
//               </Link>
              
//               <div className="hidden md:block text-right">
//                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Welcome</p>
//                 <p className="text-sm font-semibold text-white">{user.fullName || 'User'}</p>
//               </div>

//               {/* onClick par handleLogout call kiya */}
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
import { LogOut, Briefcase, Search, UserPlus, User as UserIcon } from 'lucide-react';
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
    <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-2 rounded-xl">
            <Briefcase className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black text-white">
            JOB<span className="text-blue-400">FLOW</span>
          </span>
        </Link>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              
              {/* 🔥 FIX: Profile Icon tabhi dikhega jab user Admin NAHI hoga */}
              {user.role !== 'Admin' && (
                <Link to="/UserProfile" className="p-2 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400 transition-all">
                  <UserIcon size={20} className="text-gray-300" />
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
                className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut size={18} /> 
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-all">
                Login
              </Link>
              <Link to="/signup" className="flex items-center gap-2 bg-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg hover:bg-blue-500 transition-all">
                <UserPlus size={18} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;