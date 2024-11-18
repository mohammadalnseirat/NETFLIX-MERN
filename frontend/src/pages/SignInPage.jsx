import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Loader } from "lucide-react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isSigninIn } = useAuthStore();
  //? handle Sign In User:
  const handleSignIn = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex items-center justify-center mt-20 mx-3">
        <div className="bg-black/70 space-y-6 max-w-md p-8 rounded-lg shadow-md w-full border border-red-600 ">
          <h1 className="text-3xl font-semibold text-center text-gray-300 mb-4">
            Sign In
          </h1>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="text-gray-300 font-medium block cursor-pointer"
              >
                Email :
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 text-gray-100 rounded-md border border-gray-700 mt-1 bg-transparent focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gray-300 font-medium block cursor-pointer"
              >
                Password :
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full px-3 py-2 text-gray-100 rounded-md border border-gray-700 mt-1 bg-transparent focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isSigninIn}
              className="w-full py-2 text-gray-100 rounded-md bg-red-600 hover:bg-red-800 transition-all duration-200 font-semibold"
            >
              {isSigninIn ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">Signing In...</span>
                  <Loader
                    className=" w-5 h-5 animate-spin"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center text-gray-300">
            {"Don't"} have an Account?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 px-1 py-0.5 bg-gray-200 font-semibold border border-red-500 rounded-md hover:bg-red-600 hover:text-gray-100 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
