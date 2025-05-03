import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";

const AccountSettingsPage = () => {
  const [newUsername, setNewUsername] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
  const [usernameButtonHovered, setUsernameButtonHovered] = useState(false);

  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setUsernameSuccess("");

    if (!newUsername.trim()) {
      setUsernameError("Username cannot be empty");
      return;
    }

    setIsUpdatingUsername(true);

    try {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setUsernameError("You must be logged in to update your username");
        return;
      }

      const response = await axios.put(
        "http://localhost:8090/api/user/updateUsername",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            newUsername: newUsername,
          },
        }
      );

      alert("Username updated successfully!");
      setNewUsername("");
      sessionStorage.clear();
      window.location.reload();
      window.location.href = "/login";
    } catch (err) {
      setUsernameError(err.response?.data || "Failed to update username");
    } finally {
      setIsUpdatingUsername(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <BackButton />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginTop: "1rem",
        }}
      >
        <h1
          style={{
            color: "#5a3921",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Account Settings
        </h1>

        {/* Username Update Section */}
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #f0e6d8",
          }}
        >
          <h2
            style={{
              color: "#5a3921",
              marginBottom: "1rem",
              fontSize: "1.25rem",
            }}
          >
            Change Username
          </h2>

          {usernameError && (
            <div
              style={{
                color: "#d32f2f",
                backgroundColor: "#ffebee",
                padding: "0.75rem",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
            >
              {usernameError}
            </div>
          )}

          {usernameSuccess && (
            <div
              style={{
                color: "#2e7d32",
                backgroundColor: "#e8f5e9",
                padding: "0.75rem",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
            >
              {usernameSuccess}
            </div>
          )}

          <form onSubmit={handleUsernameUpdate}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#5a3921",
                }}
              >
                New Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                style={{
                  width: "95%",
                  backgroundColor: "white",
                  color: "black",
                  padding: "0.75rem",
                  border: "1px solid #d7ccc8",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isUpdatingUsername}
              onMouseEnter={() => setUsernameButtonHovered(true)}
              onMouseLeave={() => setUsernameButtonHovered(false)}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: isUpdatingUsername
                  ? "#cccccc"
                  : usernameButtonHovered
                  ? "#b07d4b"
                  : "#c28c5c",
                color: "white",
                border: "none",
                borderRadius: "25px",
                cursor: isUpdatingUsername ? "not-allowed" : "pointer",
                fontSize: "0.95rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                boxShadow:
                  usernameButtonHovered && !isUpdatingUsername
                    ? "0 4px 8px rgba(194, 140, 92, 0.4)"
                    : "0 2px 5px rgba(194, 140, 92, 0.3)",
                transform:
                  usernameButtonHovered && !isUpdatingUsername
                    ? "translateY(-2px)"
                    : "none",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              {isUpdatingUsername ? "Updating..." : "Update Username"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
