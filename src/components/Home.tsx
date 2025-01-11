import { useEffect, useState } from "react"
// import ListItem from "./ListItem"
import PhotoList from "./PhotoList";
import axios from "axios";

import {toast, ToastContainer} from "react-toastify"

import { FilesStore } from "../context/UploadContext"
import { useContext } from "react";

function Home() {

    const {uploadedFiles} = useContext(FilesStore);

    const[page, setPage] = useState<number>(1)
    const[items, setItems] = useState<
    { id: number; type: string; path: string; date: string; 
      mediatype: string; size: number; width: number; height: number; duration:number }[]
  >([]);

  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {

        axios.get(`${baseApiUrl}/`)
        .then((result) => setItems(result.data))
        .catch(console.error)
        
    }, [uploadedFiles]) //we have the uploaded things in a context so this can rerun every time
  return (

    <section className="media-list-container">
        <PhotoList items={items} page={1}/>
        <ToastContainer/>
    </section>

  )
}

export default Home