import {createContext, useState} from "react";

export const FilesStore = createContext<    
    {uploadedFiles: FormData,
    setUploadedFiles: React.Dispatch<React.SetStateAction<FormData>>  
  }>({
    uploadedFiles: new FormData(),
    setUploadedFiles: () => null
  }
);

FilesStore.displayName = "UploadContext";

// @ts-ignore
function UploadContext({children}){

    const [uploadedFiles, setUploadedFiles] = useState<FormData>(new FormData)


    return(<FilesStore.Provider value={{uploadedFiles, setUploadedFiles}}> {children} </FilesStore.Provider>);

}

export default UploadContext;