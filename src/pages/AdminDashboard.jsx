import React, { useState, useEffect } from "react";
import bgImage from '../images/website bg for all pages.png'; // same background as leaderboard

function AdminDashboard() {
  // ------------------ SIMPLE AUTH ------------------
  const FRONT_ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
  const FRONT_ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("adminAuthed") === "1");
  const [adminId, setAdminId] = useState(() => sessionStorage.getItem("adminId") || "");
  const [adminPass, setAdminPass] = useState("");
  const [authError, setAuthError] = useState("");
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    const id = adminId.trim();
    // 1) Primary: check against frontend env vars
    if (
      FRONT_ADMIN_ID && FRONT_ADMIN_PASS && id === FRONT_ADMIN_ID && adminPass === FRONT_ADMIN_PASS
    ) {
      sessionStorage.setItem("adminAuthed", "1");
      sessionStorage.setItem("adminId", id);
      setAuthed(true);
      setTimeout(() => window.location.reload(), 0);
      return;
    }
    // 2) Fallback: ask backend (which has its own defaults or env-driven creds)
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password: adminPass })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data && data.ok) {
        sessionStorage.setItem("adminAuthed", "1");
        sessionStorage.setItem("adminId", id);
        setAuthed(true);
        setTimeout(() => window.location.reload(), 0);
      } else {
        setAuthError(data?.error || "Invalid ID or password");
      }
    } catch (err) {
      setAuthError("Login failed. Please try again.");
    }
  };

  // ------------------ TRACKING & IDENTITY ------------------
  const [deviceName, setDeviceName] = useState(() => localStorage.getItem("adminDeviceName") || "");
  const [deviceId] = useState(() => {
    let id = localStorage.getItem("adminDeviceId");
    if (!id) {
      id = Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem("adminDeviceId", id);
    }
    return id;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthed");
    sessionStorage.removeItem("adminId");
    setAuthed(false);
    setAdminId("");
    setAdminPass("");
    // Ensure immediate transition back to login
    setTimeout(() => window.location.reload(), 0);
  };

  // ------------------ TRACKING HELPERS ------------------
  const getPublicIP = async () => {
    const services = [
      "https://api.ipify.org?format=json",
      "https://icanhazip.com",
      "https://ifconfig.me/ip",
      "http://checkip.amazonaws.com"
    ];
    for (const url of services) {
      try {
        const res = await fetch(url, { timeout: 3000 });
        const text = await res.text();
        // Handle json or plain text
        if (text.includes("{")) {
          return JSON.parse(text).ip;
        }
        return text.trim();
      } catch (e) { }
    }
    return "unknown";
  };

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    const nickname = deviceName ? `${deviceName} - ` : "";

    let device = "Unknown Device";
    if (/android/i.test(ua)) device = "Android";
    else if (/iPad|iPhone|iPod/.test(ua)) device = "iOS";
    else if (/Windows/i.test(ua)) device = "Win PC";
    else if (/Macintosh/i.test(ua)) device = "Mac";
    else if (/Linux/i.test(ua)) device = "Linux";

    let browser = "UNK";
    if (/chrome|crios/i.test(ua)) browser = "Chrome";
    else if (/firefox|iceweasel/i.test(ua)) browser = "Firefox";
    else if (/safari/i.test(ua)) browser = "Safari";
    else if (/edge/i.test(ua)) browser = "Edge";

    const res = `${window.screen.width}x${window.screen.height}`;
    return `${nickname}${device} [ID:${deviceId}] (${browser} @ ${res})`;
  };

  const API_BASE = import.meta.env.VITE_API_BASE;
  // ------------------ SCORE MANAGEMENT ------------------
  const [team, setTeam] = useState("Devadatta");
  const [score, setScore] = useState("");
  const [scores, setScores] = useState({});
  const [loadingScore, setLoadingScore] = useState(false);

  const teams = ["Devadatta", "Vasuki", "Mayura", "Airavata", "Garuda", "Simha"];

  useEffect(() => {
    if (!authed) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/scores`);
        const text = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
        const data = JSON.parse(text);
        setScores(data || {});
      } catch (err) {
        console.error("Error fetching scores", err);
      }
    })();
  }, [API_BASE, authed]);

  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingScore(true);
      const [ip, device] = await Promise.all([getPublicIP(), getDeviceInfo()]);
      const res = await fetch(`${API_BASE}/update-score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: team,
          score: Number(score),
          admin_id: adminId,
          public_ip: ip,
          user_device: device
        }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
      const data = JSON.parse(text);
      alert(data.message || "Score updated!");
      if (data && data.scores) setScores(data.scores);
      setScore("");
    } catch (err) {
      console.error("Error updating score", err);
      alert(`Failed to update score: ${err.message}`);
    } finally {
      setLoadingScore(false);
    }
  };

  // Gate: show login form until authenticated
  if (!authed) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-6"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <form
          onSubmit={handleLogin}
          className="bg-black/70 backdrop-blur-md border border-[#dbab6a]/40 rounded-2xl shadow-2xl w-[90%] max-w-sm p-8 space-y-6"
        >
          <h2 className="text-3xl text-[#dbab6a] italic text-center">Admin Login</h2>
          {authError && (
            <div className="text-red-400 text-sm text-center">{authError}</div>
          )}
          <label className="flex flex-col text-[#dbab6a] text-lg font-semibold">
            ID
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="mt-2 p-3 bg-gray-900 border border-[#dbab6a]/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dbab6a]"
              placeholder="Enter ID"
              autoFocus
            />
          </label>
          <label className="flex flex-col text-[#dbab6a] text-lg font-semibold">
            Password
            <input
              type="password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="mt-2 p-3 bg-gray-900 border border-[#dbab6a]/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dbab6a]"
              placeholder="Enter password"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-[#dbab6a] text-black font-bold py-3 rounded-lg hover:brightness-110 hover:shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  // ------------------ ANNOUNCEMENTS MANAGEMENT ------------------
  const [announcements, setAnnouncements] = useState([

  ]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loadingAnnouncement, setLoadingAnnouncement] = useState(false);

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingAnnouncement(true);
      const [ip, device] = await Promise.all([getPublicIP(), getDeviceInfo()]);
      if (editId) {
        const res = await fetch(`${API_BASE}/announcements/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title, description, date, time, admin_id: adminId,
            public_ip: ip,
            user_device: device
          }),
        });
        if (!res.ok) throw new Error("Failed to update announcement");
        alert("Announcement updated successfully");
      } else {
        const res = await fetch(`${API_BASE}/announcements`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title, description, date, time, admin_id: adminId,
            public_ip: ip,
            user_device: device
          }),
        });
        if (!res.ok) throw new Error("Failed to create announcement");
        alert("Announcement created successfully");
      }
      await fetchAnnouncements();
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      console.error("Error submitting announcement", err);
      alert(`Failed to submit announcement: ${err.message}`);
    } finally {
      setLoadingAnnouncement(false);
    }
  };

  const handleEdit = (a) => {
    setEditId(a.id);
    setTitle(a.title);
    setDescription(a.description);
    setDate(a.date);
    setTime(a.time);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const [ip, device] = await Promise.all([getPublicIP(), getDeviceInfo()]);
      const res = await fetch(`${API_BASE}/announcements/${id}?admin_id=${adminId}&public_ip=${ip}&user_device=${encodeURIComponent(device)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete announcement");
      await fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement", err);
    }
  };

  async function fetchAnnouncements() {
    if (!API_BASE) {
      console.error("API_BASE is not defined. Check your .env file.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/announcements`);
      const data = await res.json();
      if (Array.isArray(data)) setAnnouncements(data);
    } catch (err) {
      console.error(`Error fetching announcements from ${API_BASE}/announcements:`, err);
    }
  }

  async function fetchLogs() {
    try {
      setLoadingLogs(true);
      const res = await fetch(`${API_BASE}/admin/logs`);
      const data = await res.json();
      if (Array.isArray(data)) setLogs(data);
    } catch (err) {
      console.error("Error fetching logs", err);
    } finally {
      setLoadingLogs(false);
    }
  }

  useEffect(() => {
    if (!authed) return;
    fetchAnnouncements();
  }, [API_BASE, authed]);

  // ------------------ UI ------------------
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center p-8 space-y-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-5xl flex justify-between items-center">
        <button
          onClick={() => {
            if (!showLogs) fetchLogs();
            setShowLogs(!showLogs);
          }}
          className="bg-[#dbab6a] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition flex items-center gap-2"
        >
          {showLogs ? "Close Logs" : "📋 View Logs"}
        </button>
        <div className="flex items-center gap-4">

          <button
            onClick={handleLogout}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Heading */}
      <h1
        className="text-5xl text-[#dbab6a] italic mb-4"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        Admin Dashboard
      </h1>

      {/* ------------------ ADMIN LOGS SECTION ------------------ */}
      {showLogs && (
        <section className="w-full max-w-5xl bg-black/80 backdrop-blur-xl border border-[#dbab6a]/40 rounded-2xl p-6 shadow-2xl animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl text-[#dbab6a]">Maintenance Logs</h2>
            <button
              onClick={fetchLogs}
              className="text-xs text-[#dbab6a] underline hover:text-white"
              disabled={loadingLogs}
            >
              {loadingLogs ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          <div className="overflow-x-auto max-h-[400px]">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="sticky top-0 bg-gray-900 text-[#dbab6a] uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Admin</th>
                  <th className="px-4 py-3">Public IP</th>
                  <th className="px-4 py-3">Device (Identity)</th>
                  <th className="px-4 py-3">Action Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500 italic">No logs found</td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-mono">{log.admin_id}</td>
                      <td className="px-4 py-3 text-sky-400 font-mono">{log.public_ip || log.device_ip}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs italic">{log.user_device || "Unknown"}</td>
                      <td className="px-4 py-3 text-white">{log.action_details}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ------------------ TEAM SCORES ------------------ */}
      <section className="w-full flex flex-col items-center space-y-8">
        <h2 className="text-3xl text-white/90 italic">Manage Team Scores</h2>

        <form
          onSubmit={handleScoreSubmit}
          className="bg-black/60 backdrop-blur-lg border border-[#dbab6a]/40 
                     p-8 rounded-2xl shadow-2xl w-[90%] max-w-md flex flex-col gap-6"
        >
          <label className="flex flex-col text-[#dbab6a] text-lg font-semibold">
            Select Team
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="mt-2 p-3 bg-gray-900 border border-[#dbab6a]/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dbab6a]"
              disabled={loadingScore}
            >
              {teams.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-[#dbab6a] text-lg font-semibold">
            New Score
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="mt-2 p-3 bg-transparent border border-[#dbab6a]/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dbab6a]"
              placeholder="Enter score..."
              disabled={loadingScore}
            />
          </label>

          <button
            type="submit"
            className="mt-4 bg-[#dbab6a] text-black font-bold py-3 rounded-lg hover:brightness-110 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loadingScore}
          >
            {loadingScore ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Score"
            )}
          </button>
        </form>

        <div className="bg-black/70 backdrop-blur-md border border-[#dbab6a]/40 rounded-2xl shadow-lg p-6 w-[90%] max-w-2xl">
          <h3 className="text-3xl text-[#dbab6a] mb-6 text-center">Current Scores</h3>
          <div className="grid grid-cols-2 gap-4 text-white">
            {teams.map((t) => (
              <div
                key={t}
                className="flex justify-between px-4 py-3 bg-gray-800/60 rounded-lg"
              >
                <span className="font-semibold">{t}</span>
                <span className="text-[#dbab6a] font-bold">
                  {scores[t] !== undefined ? scores[t] : 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------ ANNOUNCEMENTS ------------------ */}
      <section className="w-full flex flex-col items-center space-y-8">
        <h2 className="text-3xl text-white/90 italic">Manage Announcements</h2>

        {/* Existing Announcements */}
        <div className="w-full max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-black/70 border border-[#dbab6a]/40 p-6 rounded-xl shadow-lg text-white transition hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl text-[#dbab6a] font-bold mb-2">{a.title}</h3>
                <p className="text-sm mb-2">{a.description}</p>
                <p className="text-xs text-gray-400">
                  {a.startDate} • {a.time}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(a)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add / Edit Form */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#dbab6a] text-black font-bold py-3 px-6 rounded-lg hover:brightness-110 hover:shadow-lg transition-all"
          >
            ➕ Add New Announcement
          </button>
        )}

        {showForm && (
          <form
            onSubmit={handleAnnouncementSubmit}
            className="bg-black/60 backdrop-blur-lg border border-[#dbab6a]/40 
                       p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg flex flex-col gap-6"
          >
            <label className="flex flex-col text-[#dbab6a] text-lg font-semibold">
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 p-3 bg-transparent border border-[#dbab6a]/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dbab6a]"
                placeholder="Enter title..."
                disabled={loadingAnnouncement}
              />
            </label>

            <label className="flex flex-col text-[#dbab6a] text-lg font-semibold">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 p-3 bg-transparent border border-[#dbab6a]/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dbab6a]"
                placeholder="Enter description..."
                disabled={loadingAnnouncement}
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col text-[#dbab6a] text-lg font-semibold">
                Date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 p-3 bg-transparent border border-[#dbab6a]/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dbab6a]"
                  disabled={loadingAnnouncement}
                />
              </label>

              <label className="flex flex-col text-[#dbab6a] text-lg font-semibold">
                Time
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-2 p-3 bg-transparent border border-[#dbab6a]/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dbab6a]"
                  placeholder="e.g. 7:00 PM"
                  disabled={loadingAnnouncement}
                />
              </label>
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setTitle("");
                  setDescription("");
                  setDate("");
                  setTime("");
                }}
                className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
                disabled={loadingAnnouncement}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#dbab6a] text-black font-bold py-2 px-6 rounded-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loadingAnnouncement}
              >
                {loadingAnnouncement ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    {editId ? "Updating..." : "Saving..."}
                  </span>
                ) : (
                  editId ? "Update" : "Save"
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;