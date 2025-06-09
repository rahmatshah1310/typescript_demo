import { useState, useRef, ChangeEvent } from "react";

export const useFileUpload=(
    uploadFn:(formData:FormData)=>void
)=>{
    const fileInputRef=useRef<HTMLInputElement>(null);
    const [selectedFile,setSelectedFile]=useState<File | null>(null);
    const [previewUrl,setPreviewUrl]=useState<string | null>(null);


    const handleFileChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const file=e.target.files?.[0]
        if(file){
            selectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleUpload=()=>{
        if (!selectedFile) return;
        
        const formData=new formData()
        formData.append(file,selectedFile)
        uploadFn(formData)
    }

    return {
    fileInputRef,
    selectedFile,
    previewUrl,
    handleFileChange,
    handleUpload,
  };

}