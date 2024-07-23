import React from "react";
import { FaGoogle } from "react-icons/fa";
import Navbar from "../components/Header";
const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Add your sign-in logic here
  };
  return(
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar title="เข้าสู่ระบบ" />
      <div className="flex-grow grid grid-cols-5 gap-4 py-4"></div>
    </div>
  )
}


//   return (
//     <div id="root" className="flex flex-col justify-center items-center w-full h-full max-w-screen-xl mx-auto my-0">
//       <div className="bg-base-100 p-4 text-5xl font-bold">
//         เข้าสู่ระบบ
//       </div>
//       <div className="flex-grow flex justify-center items-center">
//         <div className="bg-base-100 p-8 rounded-lg shadow-md w-96">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 อีเมล
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 รหัสผ่าน
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//             >
//               เข้าสู่ระบบ
//             </button>
//           </form>
//           <div className="mt-4 text-center">
//             <hr className="border-gray-300 my-2" />
//             <button className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//               <FaGoogle className="mr-2" />
//               Google
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
export default SignIn;