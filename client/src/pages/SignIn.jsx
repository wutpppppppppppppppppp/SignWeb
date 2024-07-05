import React from "react";

const SignIn = () => {
  return <div>SignIn</div>;
  const handleSubmit = (event) => {
    event.preventDefault();
};

return(
  <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar title="เข้าสู่ระบบ" />
      <div className="flex-grow grid grid-cols-5 gap-4 py-4"></div>
  </div>
  )
}

export default SignIn;
