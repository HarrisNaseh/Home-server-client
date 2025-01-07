import { ListItemProps } from "../types";
import "../assets/css/ListItem.css";
import { Link } from "react-router-dom";

function ListItem(props: ListItemProps) {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

  const formatDuration = (duration: number | null) => {
    if (duration === null) return "";
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Link to={`media/${props.id}`}>
      <img
        src={`${baseApiUrl}/media/${props.id}/thumbnail`}
        alt={`thumbnail for item ${props.id}`}
        id={`${props.id}`}
        className="media-thumbnail"
        loading="lazy"
        style={{
          width: props.width, // Dynamically set width
          height: props.height, // Dynamically set height
          objectFit: "cover", // Ensures the image fills the area without distortion
        }}
      />
          {props.type === "video" && props.duration !== null && (
            <div className="video-duration">
              {formatDuration(props.duration)}
            </div>
          )}
    </Link>


  );
}

export default ListItem;
