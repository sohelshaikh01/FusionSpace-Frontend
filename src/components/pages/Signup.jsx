import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Input from "../common/Input";
import Button from "../common/Button";

const SignupPage = () => {
  const { registerUser, error, isUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
  });

  useEffect(() => {
    if (isUser) navigate("/");
  }, [isUser, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);

    if (result.success) {
      navigate("/");
    }
  };

return (
  <div className="flex items-center justify-center w-full min-h-[calc(100vh-var(--nav-h))] bg-[var(--bg-main)] px-4 py-10 transition-colors">
    <div className="w-full max-w-md md:max-w-2xl bg-[var(--bg-panel)] rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10 p-8 sm:p-12">
      
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-strong)] text-center">
          Signup to create account
        </h1>
        <p className="text-[var(--text-soft)] mt-2 text-sm">Join the FusionSpace community</p>
      </div>

      {error && (
        <p className="w-full text-sm text-white bg-[var(--accent-danger)] rounded-lg p-3 text-center mb-6 font-bold shadow-[0_4px_0_#b02b38]">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          name="fullName"
          label="Full Name:"
          placeholder="Enter your full name"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <Input
          name="username"
          label="Username:"
          placeholder="Enter your username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <div className="md:col-span-2">
          <Input
            name="email"
            label="Email:"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          name="password"
          label="Password:"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Input
          name="bio"
          label="Bio:"
          placeholder="Enter your bio"
          type="text"
          value={formData.bio}
          onChange={handleChange}
          required
        />

        <div className="md:col-span-2">
          <Input
            type="file"
            name="avatar"
            label="Avatar:"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>

        <Button
          type="submit"
          btnP
          className="md:col-span-2 mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      <p className="mt-8 text-center text-[var(--text-soft)]">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-[var(--accent-focus)] hover:underline transition">
          Login
        </Link>
      </p>
    </div>
  </div>
);
};

export default SignupPage;