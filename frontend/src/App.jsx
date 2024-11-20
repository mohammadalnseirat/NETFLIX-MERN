import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/Home/HomePage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistory from "./pages/SearchHistory";
import NotFoundPage from "./pages/404";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const { user, authCheck, isCheckingAuth } = useAuthStore();

  //?useEffect To Check Authentication:
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  //! loading:
  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-spin size-14 text-red-600" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sign-up"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-in"
          element={!user ? <SignInPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistory /> : <Navigate to="/sign-in" />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
