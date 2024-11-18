import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  //! handle Submit:
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/sign-up?email=${email}`);
  };
  return (
    <div className="hero-bg relative">
      {/* Navbar start here */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52" />
        </Link>
        <Link
          to={"/sign-in"}
          className="bg-red-600 text-gray-50 px-2 py-1 font-medium capitalize rounded-md hover:bg-red-700 transition-all duration-200"
        >
          sign in
        </Link>
      </header>
      {/* Navbar end here */}
      {/* Hero section start here */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-gray-50 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 capitalize gradient-text ">
          unlimited movies, TV shows and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
        <p className="mb-4 text-slate-300">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 w-1/2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="p-2 rounded-md flex-1 bg-black/80 border text-red-500 border-red-500 cursor-pointer focus:outline-none focus:ring focus:ring-red-500 transition-all duration-200"
          />
          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 font-medium rounded-md flex items-center justify-center hover:bg-red-700 transition-all duration-200">
            Get Started <ChevronRight className="size-8 md:size-10" />{" "}
          </button>
        </form>
      </div>
      {/* Hero section end here */}
      <div className="h-2 w-full bg-red-500" aria-hidden="true" />
      {/* 1st Section start here */}
      <div className="py-10 bg-black text-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="gradient-text text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="TV-IMAGE" className="mt-4 relative z-20" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* 1st Section end here */}
      <div className="h-2 w-full bg-red-500" aria-hidden="true" />
      {/* 2nd Section start here */}
      <div className="py-10 bg-black text-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 relative">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="stranger-things-lg"
                className="mt-4"
              />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 md:w-1/2 h-24 border border-red-500 rounded-md">
                <img
                  src="/stranger-things-sm.png"
                  alt="stranger-things-sm"
                  className="h-full rounded-tl-md rounded-bl-md"
                />
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-1">
                    <span className="text-md md:text-lg font-bold ">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-600">
                      Downloading...
                    </span>
                  </div>
                  <img
                    src="/download-icon.gif"
                    alt="download-icon"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="gradient-text text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>
      {/* 2nd Section end here */}
      <div className="h-2 w-full bg-red-500" aria-hidden="true" />
      {/* 3rd Section start here */}
      <div className="py-10 bg-black text-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="gradient-text text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h1>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="devices-IMAGE"
              className="mt-4 relative z-20"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* 3rd Section end here */}
      <div className="h-2 w-full bg-red-500" aria-hidden="true" />
      {/* 4th Section start here */}
      <div className="py-10 bg-black text-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 ">
            <img src="/kids.png" alt="kids-image" className="mt-4" />
          </div>
          {/* Right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="gradient-text text-4xl md:text-5xl font-extrabold mb-4">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
      {/* 4th Section end here */}
    </div>
  );
};
export default AuthScreen;
