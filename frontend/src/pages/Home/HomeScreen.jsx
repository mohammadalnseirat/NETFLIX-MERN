import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import {
  MOVIE_CATGROIES,
  ORIGANL_IMG_BASE_URL,
  TV_CATGROIES,
} from "../../../utils/constant";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { useContentStore } from "../../store/content";
import ContentSlider from "../../components/ContentSlider";
import { useState } from "react";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const [imageLoading, setImageLoading] = useState(true);

  //? loading for the image:
  if (!trendingContent) {
    return (
      <div className="h-screen text-gray-50 relative">
        <Navbar />
        <div className="absolute top=0 left-0 flex items-center justify-center w-full h-full bg-black/70 -z-10 shimmer" />
        <div />
      </div>
    );
  }
  return (
    <>
      <div className="relative text-gray-50  h-screen">
        <Navbar />
        {/* COOL OPTIMIZATION HACK FOR IMAGES */}
        {imageLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
        )}
        {/* Your Home Screen Code Here */}
        <img
          src={ORIGANL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="hero-image"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => {
            setImageLoading(false);
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col  justify-center px-8 sm:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full -z-10" />
          <div className="max-w-2xl">
            <h1 className="text-6xl gradient-text mt-4 font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200)
                : trendingContent?.overview}
            </p>
          </div>
          <div className="flex mt-2">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/50 font-semibold text-black py-2 px-4 rounded-md flex items-center mr-4 transition-all duration-200 "
            >
              <Play className="fill-red-600 text-red-600 size-6 mr-2" />
              Play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500 hover:bg-red-600 font-semibold text-white py-2 px-4 rounded-md flex items-center transition-all duration-200 "
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10 text-gray-50">
        {contentType === "movie"
          ? MOVIE_CATGROIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))
          : TV_CATGROIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
