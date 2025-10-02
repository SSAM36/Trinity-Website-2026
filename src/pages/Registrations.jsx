import React, { useState, useEffect, useRef } from "react";
import templeBg from "../images/temple_bg_2.png";
import trinityFest from "../images/trinityfest2.png";
import submitBg from "../images/submit bg.png";
import submitBtn from "../images/submitbtn.png";

const RegistrationForm = () => {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
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
    }
  };

  // Responsive input styling
  const inputClasses =
    "w-full text-base sm:text-lg md:text-xl lg:text-2xl " +
    "p-2 sm:p-3 md:p-4 " +
    "bg-[#b3915c] text-white placeholder:text-black " +
    "rounded-lg font-[Lancelot] " +
    "focus:outline-none focus:ring-2 focus:ring-[#a9742a]";

  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row items-center overflow-x-hidden py-16 sm:py-2 bg-black">
      {/* Background Temple Image */}

      {/* Right fade gradient */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[40vw] md:w-[34vw] lg:w-[28vw] bg-gradient-to-l from-black/75 via-black/50 to-transparent" />

      {/* Left Image (Desktop Only) */}
      <div className="hidden md:block md:w-1/2 md:order-2 lg:order-1 relative z-10 min-h-screen overflow-visible mt-8">
        <img
          src="/src/images/trinityfest2.png"
          alt="Trinity Fest"
          className="pointer-events-none select-none absolute left-0 top-0 h-full w-auto md:object-contain lg:object-contain object-left md:translate-x-2 lg:translate-x-12 drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
        />
      </div>

      {/* Registration Form */}
      <div className="w-full md:w-1/2 md:order-1 lg:order-2 flex flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-12 text-white relative z-10 py-8 md:py-0 max-w-xl md:max-w-2xl lg:max-w-[860px]"
          style={{
                backgroundImage: `url(${templeBg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                transition: "all 0.3s ease-in-out",
                backgroundColor: "rgba(0,0,0,0.6)" // semi-transparent overlay for readability
              }}>
      {/* Heading */}
      <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#e5a35c] mb-6 md:mb-8 lg:mb-10 text-center font-[Reggae_One] mt-8">
        Registration
      </h2>

      {/* Form Container */}
      <div
        className="relative rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-2 md:border-none border-[#f3cf9b]/40 animate-fadeIn"

      >
        {/* Overlay to reduce opacity */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
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
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClasses}
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
            />
            <input
              type="text"
              name="stream"
              placeholder="Enter Stream"
              value={formData.stream}
              onChange={handleChange}
              className={inputClasses}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
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
            />
            <input
              type="text"
              name="year"
              placeholder="Enter Year of Study"
              value={formData.year}
              onChange={handleChange}
              className={inputClasses}
            />
            <input
              type="text"
              name="college"
              placeholder="Enter College Name"
              value={formData.college}
              onChange={handleChange}
              className={inputClasses}
            />

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-5 md:mt-6">
              <button
                type="submit"
                className="relative rounded-full shadow-lg hover:scale-105 transition
                           w-36 h-12 sm:w-44 sm:h-14 md:w-56 md:h-16 lg:w-64 lg:h-20 overflow-hidden bg-no-repeat bg-contain bg-center"
                style={{ backgroundImage: `url(${submitBg})` }}
                aria-label="Submit registration"
              >
                <img
                  src="/src/images/submitbtn.png"
                  alt="Submit"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-auto object-contain pointer-events-none select-none"
                />
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
