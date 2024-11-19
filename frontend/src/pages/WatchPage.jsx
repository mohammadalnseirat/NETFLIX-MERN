import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import WatchPageSkeleton from "../components/skeleton/WatchPageSkeleton";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatReleaseDate } from "../../utils/dateFunction";
import { ORIGANL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../../utils/constant";
import ReactPlayer from "react-player";

const WatchPage = () => {
  const { id } = useParams();
  const { contentType } = useContentStore();
  const [trailers, setTrailers] = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const [contentDetails, setContentDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const slideRef = useRef(null);

  //* state for the current index:
  const [currentIndex, setCurrentIndex] = useState(0);

  //? useEffect To get the data:
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailers();
  }, [contentType, id]);

  //! get similar content:
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  //! get content details:
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContentDetails(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContentDetails(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  //! loading:
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  //? handle next and previous:
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex < trailers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  //? handle Slide:
  const SlideLeft = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({
        left: -slideRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const SlideRight = () => {
    if (slideRef.current) {
      slideRef.current.scrollBy({
        left: slideRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  //! if there is no content:
  if (!contentDetails) {
    return (
      <div className="bg-black min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className=" text-center mx-auto h-full py-8 mt-40">
            <h2 className="gradient-text text-2xl sm:text-5xl font-bold capitalize text-balance">
              Content not found
            </h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen text-gray-50">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            {/* Left Arrow */}
            <button
              className={`bg-gray-500/50 hover:bg-red-600 text-red-600 py-2 px-4 hover:text-gray-50 rounded-md ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              } transition-all duration-300`}
              disabled={currentIndex === 0}
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} />
            </button>
            {/* Right Arrow */}
            <button
              className={`bg-gray-500/70 hover:bg-red-600 text-red-600 py-2 px-4 hover:text-gray-50 rounded-md ${
                currentIndex === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } transition-all duration-300`}
              disabled={currentIndex === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentIndex].key}`}
            />
          )}
          {trailers.length === 0 && (
            <h2 className="text-center text-2xl mt-5">
              No trailers available for this content{" "}
              <span className="font-bold gradient-text">
                {contentDetails?.title || contentDetails?.name}
              </span>
              😓
            </h2>
          )}
        </div>
        {/* Content Detail Start here */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold gradient-text text-balance">
              {contentDetails?.title || contentDetails?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                contentDetails?.release_date || contentDetails?.first_air_date
              )}{" "}
              | {"  "}
              {contentDetails?.adult ? (
                <span className="text-red-500">18+</span>
              ) : (
                <span className="text-red-500">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{contentDetails?.overview}</p>
          </div>
          <img
            src={ORIGANL_IMG_BASE_URL + contentDetails?.poster_path}
            alt="poster-image"
            className="max-h-[600px] rounded-md"
          />
        </div>
        {similarContent.length > 0 && (
          <div className="max-w-5xl mx-auto relative mt-12">
            <h3 className=" mb-4 text-3xl gradient-text font-bold">
              Similar Content Movies/Tv Shows
            </h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={slideRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null; //! optimaization if there is image poster path
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="poster-image"
                      className="w-full h-auto rounded-md"
                    />
                    <h2 className="mt-4 text-lg font-semibold">
                      {content?.title?.length > 10
                        ? `${content?.title?.slice(0, 10)}...`
                        : content?.title || content?.name.length > 10
                        ? `${content?.name?.slice(0, 10)}...`
                        : content?.name}
                    </h2>
                  </Link>
                );
              })}
              <ChevronRight
                onClick={SlideRight}
                className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-500 text-gray-50 rounded-full"
              />
              <ChevronLeft
                onClick={SlideLeft}
                className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-500 text-gray-50 rounded-full"
              />
            </div>
          </div>
        )}
        {/* Content Detail End here */}
      </div>
    </div>
  );
};

export default WatchPage;
