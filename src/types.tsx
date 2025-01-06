export interface ListItemProps {
    id: number
    width: number
    height: number
}

export interface ListProps{
    page: number;
    items: ListItemProps[];
  }