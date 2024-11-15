import axios from "axios";

export const fetchFromTmdb = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer" + process.env.TMDB_API_KEY,
    },
  };
  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch data from TMDb: ${response.status}` + response.statusText
    );
  }
  return response.data;
};

//! we will use this function to get the data instead of 
//! recreate options each time when we want to fetch the data from the database
