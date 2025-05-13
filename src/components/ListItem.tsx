import { ListItemProps } from "../types";
import "../assets/css/ListItem.css";
// import { Link } from "react-router-dom";
import {  PhotoView } from 'react-photo-view';
import useWindowSize from "./GetWidth";

function ListItem(props: ListItemProps) {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
  
  const formatDuration = (duration: number | null) => {
    if (duration === null) return "";
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (

    <div>
      {props.type === "video" ? 
      <PhotoView key={props.id}
      render={() => {

        const {width} = useWindowSize();
        const {height} = useWindowSize();

        const vidWidth = props.width;
        const vidHeight = props.height;
        const aspectRatio = vidWidth / vidHeight;

        let elemWidth = 0;
        let elemHeight = 0;
        if (aspectRatio >= 1){
          elemWidth = width;
          elemHeight = elemWidth / aspectRatio;
        }
        else if (aspectRatio < 1){
          elemHeight = height;
          elemWidth = elemHeight / aspectRatio;
        }

        if(elemHeight >= height){
          elemHeight = height;
          elemWidth = elemHeight * aspectRatio;
        }





        return (
          
          <div
            style={{width: elemWidth, height: elemHeight, transform: `matrix(1, 0, 0, 1, ${-elemWidth/2}, ${-elemHeight/2})`
            }}
          >
            <video
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            >
              <source src={`${baseApiUrl}/media/${props.id}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }}
    >
      <img
        src={`${baseApiUrl}/media/${props.id}/thumbnail`}
        alt={`thumbnail for item ${props.id}`}
        id={`${props.id}`}
        className="media-thumbnail"
        loading="lazy"
        style={{
          width: props.width, 
          height: props.height, 
          objectFit: "cover", 
        }}
      />
      </PhotoView>: 
      <PhotoView key= {props.id}src={`${baseApiUrl}/media/${props.id}`}>
      <img
        src={`${baseApiUrl}/media/${props.id}/thumbnail`}
        alt={`thumbnail for item ${props.id}`}
        id={`${props.id}`}
        className="media-thumbnail"
        loading="lazy"
        style={{
          width: props.width, 
          height: props.height,
          objectFit: "cover", 
        }}
      /></PhotoView>}
    
      {props.type === "video" && props.duration !== null && (
            <div className="video-duration">
              {formatDuration(props.duration)}
            </div>
          )} 
      </div>


  );
}

export default ListItem;
