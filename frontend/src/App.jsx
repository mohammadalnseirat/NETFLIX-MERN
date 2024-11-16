import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/Home/HomePage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistory from "./pages/SearchHistory";
import NotFoundPage from "./pages/404";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/history" element={<SearchHistory />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
