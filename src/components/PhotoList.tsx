
import { ListProps } from "../types"
import ListItem from "./ListItem"
import "../assets/css/PhotoList.css"
import "../assets/css/ListItem.css"
function PhotoList(props: ListProps) {
  return (
    <section className="items-container">
      <ul className="item-list">
        {props.items.map((item) =>
        <li key={item.id} className="image-box">
        <ListItem id={item.id}/>
        </li>
        )}
      </ul>
    </section>
  )
}

export default PhotoList
