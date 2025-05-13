// import { ListProps } from "../types";
// import ListItem from "./ListItem";
// import "../assets/css/PhotoList.css";
// import justifiedLayout from "justified-layout";
// import useWindowSize from "./GetWidth";

// function PhotoList(props: ListProps) {

//   const {width} = useWindowSize();

//   const containerWidth = Math.min(width - 20, 1400); 
//   const targetRowHeight = 150; // Desired height for rows
//   const boxSpacing = 4; // Spacing between photos

//   const imageData = props.items !== null ? props.items.map((item) => ({
//     width: item.width,
//     height: item.height,
//   })): [];

//   // Generate layout
//   const layout = justifiedLayout(imageData, {
//     containerWidth,
//     targetRowHeight,
//     boxSpacing,
//   });

//   return (
//     <section className="items-container" style={{ width: containerWidth }}>
//       {props.items !== null ? (
//         <ul className="item-list" style={{ position: "relative" }}>
//           {layout.boxes.map((box, index) => {
//             const item = props.items[index]; // Get corresponding ListItemProps
//             return (
//               <li
//                 key={item.id}
//                 className="image-box"
//                 style={{
//                   position: "absolute",
//                   top: box.top,
//                   left: box.left,
//                   width: box.width,
//                   height: box.height,
//                 }}
//               >
//                 <ListItem
//                   id={item.id}
//                   height={box.height} // Adjusted by layout
//                   width={box.width}
//                   type = {item.type} // Adjusted by layout
//                   duration = {item.duration}
//                 />
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <p>No Photos or Videos on server</p>
//       )}
//     </section>
//   );
// }

// export default PhotoList;

import { ListProps } from "../types";
import ListItem from "./ListItem";
import "../assets/css/PhotoList.css";
import justifiedLayout from "justified-layout";
import useWindowSize from "./GetWidth";

import { PhotoProvider} from 'react-photo-view';

function PhotoList(props: ListProps) {

  const {width} = useWindowSize();

  const containerWidth = Math.min(width - 20, 1400); 
  const targetRowHeight = 150; // Desired height for rows
  const boxSpacing = 4; // Spacing between photos

  const imageData = props.items !== null ? props.items.map((item) => ({
    width: item.width,
    height: item.height,
  })): [];

  // Generate layout
  const layout = justifiedLayout(imageData, {
    containerWidth,
    targetRowHeight,
    boxSpacing,
  });

  return (
    <section className="items-container" style={{ width: containerWidth }}>
      {props.items !== null ? (
        <PhotoProvider
        toolbarRender={({ onScale, scale }) => {
          return (
            <>
              <svg onClick={() => onScale(scale + 1)} className="PhotoView-Slider__toolbarIcon" width="44" height="44" viewBox="0 0 768 768" fill="white">
                <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z"></path>
                </svg>
              <svg onClick={() => onScale(scale - 1)} className="PhotoView-Slider__toolbarIcon" width="44" height="44" viewBox="0 0 768 768" fill="white">
                <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z"></path>
                </svg>
            </>
          );
        }}>
        <ul className="item-list" style={{ position: "relative" }}>
          {layout.boxes.map((box, index) => {
            const item = props.items[index]; // Get corresponding ListItemProps
            return (
              <li
                key={item.id}
                className="image-box"
                style={{
                  position: "absolute",
                  top: box.top,
                  left: box.left,
                  width: box.width,
                  height: box.height,
                }}
              >
                <ListItem
                  id={item.id}
                  height={box.height} // Adjusted by layout
                  width={box.width}
                  type = {item.type} // Adjusted by layout
                  duration = {item.duration}
                />
              </li>
            );
          })}
        </ul>
        </PhotoProvider>
      ) : (
        <p>No Photos or Videos on server</p>
      )}
    </section>
  );
}

export default PhotoList;

