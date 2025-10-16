import React, { useState, useEffect, useRef } from "react";
import templeBg from "../images/temple_bg_2.png";
import trinityFest from "../images/trinityfest2.png";
import submitBg from "../images/submit bg.png";
import submitBtn from "../images/submitbtn.png";
import websiteBg from "../images/website bg for all pages.png";

const RegistrationForm = (compact=false) => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    stream: "",
    phone: "",
    dob: "",
    year: "",
    college: "",
  });

  const [dobInputType, setDobInputType] = useState("text");
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message: string }
  const [submitting, setSubmitting] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    try {
      setSubmitting(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'Registration successful! 🎉' });
        setFormData({
          fullName: "",
          gender: "",
          email: "",
          stream: "",
          phone: "",
          dob: "",
          year: "",
          college: "",
        });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({ type: 'error', message: 'Server error. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Responsive input styling
  const inputClasses =
    "w-full text-sm sm:text-base md:text-lg lg:text-xl " +
    "p-2 sm:p-3 md:p-3 " +
    "bg-[#b3915c] text-white placeholder:text-black " +
    "rounded-lg font-[Lancelot] " +
    "focus:outline-none focus:ring-2 focus:ring-[#a9742a]";

  return (
    <div
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center overflow-x-hidden py-0 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${websiteBg})` }}
    >
      {/* Right-side Temple Background */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-full lg:w-full xl:w-[70vw] bg-center md:bg-center lg:bg-center xl:bg-right bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${templeBg})`,
        }}
      />

      {/* Right fade gradient over temple */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-full lg:w-full xl:w-[70vw] bg-gradient-to-l from-black/70 via-black/45 to-transparent" />

      {/* Left Image (Desktop Only) */}
    <div className="hidden xl:block xl:order-1 xl:w-[120rem] relative z-30 overflow-visible">
  <img
  src={trinityFest}
  alt="Trinity Fest"
  className="absolute right-[-25px] top-1/2 -translate-y-1/2 -translate-x-[35vh] h-[100vh] w-[120rem] object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]"
/>

</div>

      {/* Registration Form */}
      <div className="w-full md:w-11/12 lg:w-2/3 xl:w-1/2 md:order-1 lg:order-2 flex flex-col justify-center px-5 sm:px-7 md:px-8 lg:px-10 text-white relative z-10 py-0 md:py-0 max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-[700px] md:mx-auto lg:mx-auto xl:mx-0 xl:-translate-x-12">
      {/* Heading */}
      {/* ===== Title Section ===== */}
          <div
            className={`relative flex justify-center ${
              compact ? "mb-2" : "mb-5"
            }`}
          >
            <div
              className={`inline-block text-center ${
                compact ? "px-5 py-2" : "px-8 py-3"
              } rounded-md bg-[#1A0F08] border border-[#8C6A3E] shadow-[0_10px_25px_rgba(0,0,0,0.5)]`}
            >
              <h2
                className={`${
                  compact ? "text-[22px]" : "text-[32px]"
                } md:text-[40px] leading-none text-[#E7B565]`}
                style={{ fontFamily: "'Reggae One', cursive" }}
              >
                REGISTRATION 
              </h2>
            </div>
          </div>

      {/* Form Container */}
      <div
        className="relative rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-2 md:border-none border-[#f3cf9b]/40 animate-fadeIn bg-black/40 backdrop-blur-[2px]"
      >
        <div className="relative z-10">
          {/* Inline status banner */}
          {status && (
            <div
              role="status"
              aria-live="polite"
              className={`mb-4 px-4 py-3 rounded-lg border text-center ${
                status.type === 'success'
                  ? 'bg-green-600/30 border-green-400 text-green-200'
                  : 'bg-red-600/30 border-red-400 text-red-200'
              }`}
            >
              {status.message}
            </div>
          )}
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              ref={nameInputRef}
              value={formData.fullName}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            <input
              type="text"
              name="stream"
              placeholder="Enter Stream"
              value={formData.stream}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            <input
              type={dobInputType}
              name="dob"
              placeholder="DOB"
              value={formData.dob}
              onChange={handleChange}
              onFocus={() => setDobInputType("date")}
              onBlur={(e) => {
                if (!e.target.value) setDobInputType("text");
              }}
              className={inputClasses}
              required
            />
            <input
              type="text"
              name="year"
              placeholder="Enter Year of Study"
              value={formData.year}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            <input
              type="text"
              name="college"
              placeholder="Enter College Name"
              value={formData.college}
              onChange={handleChange}
              className={inputClasses}
              required
            />

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-5 md:mt-6">
              <button
                type="submit"
                className="relative rounded-full shadow-lg hover:scale-105 transition
                           w-28 h-10 sm:w-34 sm:h-11 md:w-40 md:h-13 lg:w-48 lg:h-14 overflow-hidden bg-no-repeat bg-contain bg-center disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundImage: `url(${submitBg})` }}
                aria-label="Submit registration"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="absolute inset-0 flex items-center justify-center gap-2 text-black font-semibold">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <img
                    src={submitBtn}
                    alt="Submit"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-auto object-contain pointer-events-none select-none"
                  />
                )}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div >
  );
};

export default RegistrationForm;
