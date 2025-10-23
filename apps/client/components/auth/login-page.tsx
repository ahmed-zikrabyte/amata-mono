import React from "react";
import LoginForm from "./login-form";
import AuthSideComponent from "./auth-side-component";


const LoginPage = () => {
  return (
    <section className="h-[70vh] md:h-[90vh] flex items-center justify-center lg:justify-between px-6 md:px-20">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <LoginForm />
      </div>
      <AuthSideComponent />
    </section>  
  );
};

export default LoginPage;
