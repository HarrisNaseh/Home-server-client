export interface ListItemProps {
    id: number
    width: number
    height: number
    type: string
    duration: number
}

export interface ListProps{
    page: number;
    items: ListItemProps[];
  }