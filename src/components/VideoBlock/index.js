import React from "react";
import { Text, RichText, Image, Link } from "@sitecore-jss/sitecore-jss-react";
import RouterLink from "../../atoms/RouterLink";
import YouTube from "react-youtube";
import "./style.css";

const VideoBlock = ({ fields }) => {
  if (!fields) {
    return null;
  }

  const { videoId, title } = fields;

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <Text
          tag="h1"
          field={title}
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
        />
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
        </div>
        {videoId && videoId.value && (
          <div className="videoWrapper flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
            <YouTube videoId={videoId?.value} opts={opts} onReady={_onReady} />
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoBlock;
