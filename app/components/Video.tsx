import { Plyr } from "plyr-react"
import "plyr-react/plyr.css"

export default function Video({id} : {id: string}) {
  console.log('Video component received id:', id);
  const videoSrc: Plyr.SourceInfo = {
    type: "video",
    sources: [
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
        type: "video/mp4",
        size: 720,
      },
    ],
    poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
  };
  return (
    <div className="grid grid-cols-[1fr] w-full rounded-md items-center">
      <div className="w-full p-5 py-0">
          <Plyr source={videoSrc} />
      </div>
    </div>
  );
};