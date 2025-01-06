
// import {ListItemProps} from "../types"
// import "../assets/css/ListItem.css"
// import { Link } from "react-router-dom"

// function ListItem(props: ListItemProps) {
//   const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
//   return (

//     <Link to={`media/${props.id}`}>
//         <img src={`${baseApiUrl}/media/${props.id}/thumbnail`}
//               alt={`thumbnail for item ${props.id}`}
//               id={`${props.id}`}
//               className="media-thumbnail"
//               loading="lazy"/>
//     </Link>
      
//   )
// }


// export default ListItem


import { ListItemProps } from "../types";
import "../assets/css/ListItem.css";
import { Link } from "react-router-dom";

function ListItem(props: ListItemProps) {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

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
    </Link>
  );
}

export default ListItem;
