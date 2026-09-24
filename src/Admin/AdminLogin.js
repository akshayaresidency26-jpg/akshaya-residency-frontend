import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./Admin.css";


const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";


function AdminLogin() {

  const navigate =
    useNavigate();


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    password,
    setPassword,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);


    try {

      const response =
        await fetch(
          `${API_URL}/api/admin/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
          "Login failed."
        );
      }


      localStorage.setItem(
        "adminToken",
        data.token
      );


      navigate(
        "/admin/dashboard"
      );

    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-logo">
          AR
        </div>


        <h1>
          Akshaya Residency
        </h1>

        <p className="admin-subtitle">
          Administration Portal
        </p>


        {error && (

          <div className="admin-error">
            {error}
          </div>

        )}


        <form
          onSubmit={handleLogin}
        >

          <label>
            Admin Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Admin email"
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Password"
            required
          />


          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>

      </div>

    </div>
  );
}


export default AdminLogin;