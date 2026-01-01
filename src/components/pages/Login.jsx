import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import Input from "../common/Input";
import Button from "../common/Button";

const LoginPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "", error: "" });

  const { isUser, loginUser, error, isLoading } = useAuth();

  useEffect(() => {
    if(isUser) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await loginUser(formData.email, formData.password);

    if (result.success) {
      navigate("/");
    }
  };

return (
  <div className="flex items-center justify-center w-full min-h-[calc(100vh-var(--nav-h))] bg-[var(--bg-main)] px-4 py-10 transition-colors">
    <div className="w-full max-w-md md:max-w2xl bg-[var(--bg-panel)] rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10 p-8 sm:p-12">
      
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-strong)] text-center">
          Login to your account
        </h1>
        <p className="text-[var(--text-soft)] mt-2 text-sm">Welcome back to the community</p>
      </div>

      {error && (
        <p className="w-full text-sm text-white bg-[var(--accent-danger)] rounded-lg p-3 text-center mb-6 font-bold shadow-[0_4px_0_#b02b38]">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <Input
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className="w-full"
        />

        <Input
          name="password"
          label="Password:"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full"
          autoComplete="password"
        />

        <Button 
          type="submit" 
          btnP 
          className="w-full mt-2" 
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="mt-8 text-center text-[var(--text-soft)]">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-bold text-[var(--accent-focus)] hover:underline transition">
          Sign up
        </Link>
      </p>
    </div>
  </div>
);
};

export default LoginPage;