const isValidUrl = (url) => {
  return url.includes(process.env.URL);
};

const getJsonUrl = (url) => {
  const index = url.lastIndexOf("/");
  const first = url.slice(0, index + 1);
  const second = url.slice(index + 1);
  return first + ".json" + second;
};

module.exports = {
  isValidUrl,
  getJsonUrl,
};
