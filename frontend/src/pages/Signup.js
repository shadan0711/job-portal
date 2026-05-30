
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '', email: '', password: '', confirmPassword: '', 
//     age: '', dob: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       // Step 1: Send OTP to User's email
//       const response = await fetch('http://localhost:5000/api/v1/auth/sendotp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: formData.email })
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Step 2: Navigate to Verify Page with Form Data in state
//         navigate('/verify-email', { state: { signupData: formData } });
//       } else {
//         alert(data.message || "Failed to send OTP");
//       }
//     } catch (err) {
//       console.error("OTP Error:", err);
//       alert("Server error! Backend check karein.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6 py-12">
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
//         <h2 className="text-3xl font-bold text-white text-center mb-8">Create <span className="text-blue-400">Account</span></h2>
        
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
//             value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />

//           <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
//             value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />

//           <div className="grid grid-cols-2 gap-4">
//             <input type="number" placeholder="Age" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
//               value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
//             <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 text-gray-400"
//               value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <input type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
//               value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
//             <input type="password" placeholder="Confirm Password" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
//               value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
//           </div>

//           <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all">
//             Get OTP
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };
// export default Signup;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Toast import kiya

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', 
    age: '', dob: '', role: 'Candidate' // Default role agar backend mangta hai
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password matching check with Toast
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!"); // Alert ki jagah toast
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("OTP sent to your email!");
        navigate('/verify-email', { state: { signupData: formData } });
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP Error:", err);
      toast.error("Server error! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Create <span className="text-blue-400">Account</span></h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />

          <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />

          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Age" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
              value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
            <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 text-gray-400"
              value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <input type="password" placeholder="Confirm Password" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
              value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all">
            Get OTP
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default Signup;