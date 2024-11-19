import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ContentSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const slideRef = useRef(null);

  //? useEffect To Fetch The data:
  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };

    getContent();
  }, [contentType, category]);

  //! Formatted Category and Content type Name:
  const formattedCategory =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
  //! Function To Scroll left and right:
  const slideLeft = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({
        left: -slideRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const slideRight = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({
        left: slideRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      className="bg-black relative px-5 md:px-20 text-gray-50"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-2xl font-bold gradient-text mb-4">
        {formattedCategory} {formattedContentType}
      </h2>
      {/* Content Slider */}
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={slideRef}
      >
        {content.map((item) => (
          <Link
            key={item.id}
            to={`/watch/${item.id}`}
            className=" min-w-[250px] group relative"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item?.backdrop_path}
                alt="content-image"
                className="transition transform ease-in-out duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-center mt-2 font-semibold">
              {item.title || item.name}
            </p>
          </Link>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            onClick={slideLeft}
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black hover:bg-black/70 text-gray-50 border border-red-600  z-10"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={slideRight}
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center size-12 rounded-full bg-black hover:bg-black/70 text-gray-50 border border-red-600 z-10"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}
    </div>
  );
};

export default ContentSlider;
