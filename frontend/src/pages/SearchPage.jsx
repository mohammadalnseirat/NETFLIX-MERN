import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGANL_IMG_BASE_URL } from "../../utils/constant";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setContentType } = useContentStore();

  //? handle Tab Change:
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    //! clear the results:
    setResults([]);
    setSearchTerm("");
  };

  //! handle Search Field:
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Noting Found,Please make sure you are searching in the correct category."
        );
      } else {
        toast.error("An error occurred while searching.");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-900"
            } hover:bg-red-700`}
            onClick={() => handleTabChange("movie")}
          >
            Movies
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-900"
            } hover:bg-red-700`}
            onClick={() => handleTabChange("tv")}
          >
            TV Shows
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-900"
            } hover:bg-red-700`}
            onClick={() => handleTabChange("person")}
          >
            Person
          </button>
        </div>
        <form
          onSubmit={handleSearch}
          className="flex gap-4 mb-8 items-stretch max-w-2xl mx-auto"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`search for a : ${activeTab}`}
            className="w-full p-2 rounded bg-gray-900 border border-red-600 text-gray-50"
          />
          <button className="bg-red-600 hover:bg-red-700 p-2 rounded text-gray-50">
            <Search className="size-6" />
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null; // optmaization the code
            return (
              <div
                key={result.id}
                className="bg-gray-950 p-4 rounded border border-red-600"
              >
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGANL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 mx-auto rounded"
                    />
                    <h2 className="text-xl mt-2 font-bold gradient-text">
                      {result.name}
                    </h2>
                  </div>
                ) : (
                  <Link
                    to={`/watch/${result.id}`}
                    onClick={() => {
                      setContentType(activeTab);
                    }}
                  >
                    <img
                      src={ORIGANL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="text-xl mt-2 font-bold gradient-text">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
