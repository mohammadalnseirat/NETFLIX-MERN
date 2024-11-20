import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../../utils/constant";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month, day, and year from the Date object
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Return the formatted date string
  return `${month} ${day}, ${year}`;
}
const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  //! useEffect to fetch the data:
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setSearchHistory(res.data.content);
      } catch (error) {
        console.log("Error getting search history", error.message);
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  //! handle delete item from search history:
  const handleDelete = async (item) => {
    try {
      await axios.delete(`/api/v1/search/history/${item.id}`);
      setSearchHistory(searchHistory.filter((entry) => entry.id !== item.id));
      toast.success("Item deleted from search history");
    } catch (error) {
      toast.error("Failed to delete item from search history");
    }
  };

  //! check if the search history is empty:
  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-red-600">
            Search History
          </h1>
          <div className="flex items-center justify-center gap-2 h-96">
            <p className="text-xl sm:text-3xl font-bold capitalize gradient-text">
              No search history found
            </p>
            <span className="text-xl sm:text-2xl">😓</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen text-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory?.map((item) => (
            <div
              key={item._id}
              className="bg-gray-950 rounded p-4 flex items-start"
            >
              <img
                src={SMALL_IMG_BASE_URL + item.image}
                alt="history-image"
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-md text-gray-50">
                  {item.title.length > 15
                    ? item.title.slice(0, 15) + "..."
                    : item.title}
                </span>
                <span className="text-sm text-gray-400">
                  {formatDate(item.createdAt)}
                </span>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold text-center rounded-full ml-auto ${
                  item.searchType === "movie"
                    ? "bg-red-600"
                    : item.searchType === "tv"
                    ? "bg-cyan-600"
                    : "bg-green-600"
                }`}
              >
                {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-500 transition-all duration-200"
                onClick={() => handleDelete(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
