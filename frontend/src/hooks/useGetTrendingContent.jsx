import { useEffect, useState } from "react";
import axios from "axios";
import { useContentStore } from "../store/content";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  //!UseEffect To Fetch The data:
  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content);
    };

    // * call the getTrendingContent function:
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
