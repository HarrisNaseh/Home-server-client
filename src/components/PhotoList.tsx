import { ListProps } from "../types";
import ListItem from "./ListItem";
import "../assets/css/PhotoList.css";
import justifiedLayout from "justified-layout";
import useWindowSize from "./GetWidth";

function PhotoList(props: ListProps) {

  const {width} = useWindowSize();

  const containerWidth = Math.min(width - 20, 1400); 
  const targetRowHeight = 150; // Desired height for rows
  const boxSpacing = 4; // Spacing between photos

  // Prepare the layout configuration
  const imageData = props.items.map((item) => ({
    width: item.width,
    height: item.height,
  }));

  // Generate layout
  const layout = justifiedLayout(imageData, {
    containerWidth,
    targetRowHeight,
    boxSpacing,
  });

  return (
    <section className="items-container" style={{ width: containerWidth }}>
      {props.items !== null ? (
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
                  width={box.width} // Adjusted by layout
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No Photos or Videos on server</p>
      )}
    </section>
  );
}

export default PhotoList;
