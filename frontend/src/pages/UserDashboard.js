// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import JobCard from '../components/JobCard';

// const UserDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');

//   return (
//     <div className="flex pt-20">
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//       <main className="flex-1 p-8">
//         <header className="mb-10">
//           <h1 className="text-4xl font-bold">Hello, Alex 👋</h1>
//           <p className="text-gray-400">Here's what's happening with your job search today.</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <section>
//             <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
//             <div className="space-y-4">
//               {/* This would be a map over job data */}
//               <JobCard job={{title: "Frontend Engineer", category: "React", location: "Remote", salary: "$120k", description: "Design next-gen interfaces."}} />
//             </div>
//           </section>
          
//           <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
//             <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="p-4 bg-blue-600/20 rounded-2xl border border-blue-600/30">
//                 <span className="block text-2xl font-bold">12</span>
//                 <span className="text-sm text-blue-300">Jobs Applied</span>
//               </div>
//               <div className="p-4 bg-purple-600/20 rounded-2xl border border-purple-600/30">
//                 <span className="block text-2xl font-bold">4</span>
//                 <span className="text-sm text-purple-300">Interviews</span>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };
// export default UserDashboard;