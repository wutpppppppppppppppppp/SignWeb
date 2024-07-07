import React from "react";
import Navbar from "../components/Navbar";

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


  </div>
  );
};

export default SignIn;
