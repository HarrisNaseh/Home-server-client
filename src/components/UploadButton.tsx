import { FormEvent, useRef, useState} from 'react'
import axios from 'axios'
import addLogo from '../assets/images/plus.svg'

import {toast} from 'react-toastify'

function UploadButton() {

    const[uploadProcess, setUploadProcess] = useState<number>(0);

    const mediaUploadRef = useRef<HTMLInputElement>(null)

    const toastId = useRef<string | number | null>(null);

    async function handleMediaChange() {
      const length = mediaUploadRef?.current?.files?.length
      if (length === 0 || length === undefined)
      {
        alert("Please Select files first")
        return
      }
      const files = mediaUploadRef?.current?.files
  
      if (files === undefined || files === null){
        alert("Please Select files first")
        return
      }
      const formData = new FormData()
  
      for(let i = 0; i < length; i++){
        const file = files.item(i)
        if(file){
          formData.append("files", file);
        }
      }
      
      const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
      try{
        const response = await axios.post(`${baseApiUrl}/upload`, formData, {
          headers: {"Content-Type": "multipart/form-data",},
          onUploadProgress:(progressEvent) => {
            const total = progressEvent.total || 1;
            const curr = progressEvent.loaded;

            setUploadProcess(Math.round((curr/total) * 100))
            const progress = (curr/total)
                if (toastId.current === null){
                toastId.current = toast('Uploading', {
                                        progress: progress,
                                        hideProgressBar: false,
                                        draggable: false,
                                        position: "bottom-left",
                                        closeOnClick: false,
                                        pauseOnHover: false,
                                        theme: "dark" 
                                    });
            }
            else{
                toast.update(toastId.current, {progress})
            }
          },
        });


        if (toastId.current !== null){

          const {Files_Uploaded} = await response.data;
          const {Error_Strings} = await response.data;
          let files_string;

          if (Files_Uploaded === 0){
            files_string = "No Files were uploaded. Only images and videos are accepted"
          }
          else if (Files_Uploaded === 1){
            files_string = "1 File Uploaded"
          }
          else{
            files_string = `${Files_Uploaded} Files Uploaded`
          }

        //   toast(files_string, {
        //     hideProgressBar: false,
        //     draggable: false,
        //     position: "bottom-left",
        //     pauseOnHover: false,
        //     theme: "dark",
        //     autoClose: 5000,
        //     type: "success" 
        // });

            toast.update(toastId.current, {
            render: files_string,
            type: "success",
            isLoading: false,
            autoClose: 5000, // Automatically close after 5 seconds
             });

        if(Error_Strings !== ""){
          toast.error(`Not all files were uploaded.\n ${Error_Strings}`, {
            position: "bottom-left",
            autoClose: 10000,
            closeOnClick: false,
            pauseOnHover: true,
            theme: "dark"
          })
        }
        }
        
        setUploadProcess(0);
        toastId.current = null
  
      } catch(error){
        setUploadProcess(0)
        if(toastId.current !== null){
          toast.done(toastId.current)
        }
        // toast.error("Not all files were uploaded")

        // //Add a toast for the failaur
      
        console.log("Problem Processing upload: ",error)
      }
  
    }
  

     function handleUpload(event: FormEvent) {
      event.preventDefault();
      mediaUploadRef?.current?.click()
    }

  return (
    <form id="upload-form" encType='multipart/form-data'>
        
    <input 
    type='file' multiple
    id="file"
    ref={mediaUploadRef}
    onChange={handleMediaChange}
    hidden/>
  
  <button type='submit'
  onClick={handleUpload}>
        <img 
          src={addLogo}
          alt='Add Logo'
          id='Add Logo'
          style={{height: "2em"}}/>
      </button>
      {uploadProcess > 0 && <p>{uploadProcess} %</p>}
    </form>
  )
}

export default UploadButton