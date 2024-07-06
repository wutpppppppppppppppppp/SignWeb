import React from "react";
import Navbar2 from "../components/Navbar2";

const SignIn = () => {
  return (
  
  <div>
    <label className="input input-bordered flex items-center gap-2">
        Firstname
      <input type="text" className="grow" placeholder="Daisy" />
    </label>

    <label className="input input-bordered flex items-center gap-2">
        Lastname
      <input type="text" className="grow" placeholder="Daisy" />
    </label>

    <label className="input input-bordered flex items-center gap-2">
        Email
      <input type="text" className="grow" placeholder="daisy@site.com" />
    </label>
    
    <select className="select select-bordered w-full max-w-xs">
      <option disabled selected>หลักสูตรล่ามภาษามือ</option>
      <option>หลักสูตร1</option>
      <option>หลักสูตร2</option>
    </select>

    <select className="select select-bordered w-full max-w-xs">
      <option disabled selected> กลุ่มล่าม</option>
      <option>หลักสูตร1</option>
      <option>หลักสูตร2</option>
    </select>

  </div>
  );
};

export default SignIn;
