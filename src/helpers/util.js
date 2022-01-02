const hd = 720;
const mid = 480;
const low = 360;
const superLow = 240;

const isValidUrl = (url) => {
  return url.includes(process.env.URL);
};

const getJsonUrl = (url) => {
  const index = url.lastIndexOf("/");
  const first = url.slice(0, index + 1);
  const second = url.slice(index + 1);
  return first + ".json" + second;
};

const getVideoInfo = (json) => {
  return {
    video_url:
      json[0].data.children[0].data.secure_media.reddit_video.fallback_url,
    thumbnail: json[0].data.children[0].data.thumbnail,
    thumbnail_height: json[0].data.children[0].data.thumbnail_height,
    thumbnail_width: json[0].data.children[0].data.thumbnail_width,
    title: json[0].data.children[0].data.title,
    height: json[0].data.children[0].data.secure_media.reddit_video.height,
  };
};

const getVideoSound = (json) => {
  const video_url =
    json[0].data.children[0].data.secure_media.reddit_video.fallback_url;
  const height = json[0].data.children[0].data.secure_media.reddit_video.height;
  return video_url.replace(`DASH_${height}`, "DASH_audio");
};

const getDifferentVideoQualities = (json) => {
  const video_url =
    json[0].data.children[0].data.secure_media.reddit_video.fallback_url;
  const height = json[0].data.children[0].data.secure_media.reddit_video.height;
  const videoQuality = `DASH_${height}`;
  switch (height) {
    case 1080: {
      return {
        uhd: video_url,
        hd: video_url.replace(videoQuality, changeVideoQuality(hd)),
        480: video_url.replace(videoQuality, changeVideoQuality(mid)),
        360: video_url.replace(videoQuality, changeVideoQuality(low)),
        240: video_url.replace(videoQuality, changeVideoQuality(superLow)),
      };
    }
    case 720: {
      return {
        hd: video_url,
        480: video_url.replace(videoQuality, changeVideoQuality(mid)),
        360: video_url.replace(videoQuality, changeVideoQuality(low)),
        240: video_url.replace(videoQuality, changeVideoQuality(superLow)),
      };
    }
    case 480: {
      return {
        480: video_url,
        360: video_url.replace(videoQuality, changeVideoQuality(low)),
        240: video_url.replace(videoQuality, changeVideoQuality(superLow)),
      };
    }
    case 360: {
      return {
        360: video_url,
        240: video_url.replace(videoQuality, changeVideoQuality(superLow)),
      };
    }
    default: {
      return {
        video: video_url,
      };
    }
  }
};

const changeVideoQuality = (height) => {
  return `DASH_${height}`;
};

module.exports = {
  isValidUrl,
  getJsonUrl,
  getVideoSound,
  getVideoInfo,
  getDifferentVideoQualities,
};
