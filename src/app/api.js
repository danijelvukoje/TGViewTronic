const apiKey = `Client-ID ${process.env.UNSPLASH_API_KEY}`;
const makeMockCall = searchText => {
  const resObj = {
    total: 30,
    total_pages: 3,
    results: [],
  };
  // Hel
  const imgObj = {
    user: {
      name: 'firstname lastname',
    },
    description: `a nice image of ${searchText}`,
    urls: {
      small: 'https://picsum.photos/400/600',
    },
  };

  for (let i = 0; i < 10; i++) {
    resObj.results.push(imgObj);
  }

  return resObj;
};

const makeAPICall = async (searchText, page) => {
  const res = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${searchText}`, { headers: { Authorization: apiKey } });
  const resObj = await res.json();
  return resObj;
};

const imageAPI = (process.env.NODE_ENV === 'production')
  ? makeAPICall
  : makeMockCall;

export default imageAPI;
