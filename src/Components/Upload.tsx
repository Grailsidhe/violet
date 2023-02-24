import './styles.css'
import React, { useRef, useState } from 'react'
import fileClient from '../fileClient'

interface Props {
  text: string,
  execute: boolean,
  format?: string,
  action: string
}

const Upload: React.FC<Props> = (props: any): JSX.Element =>  {

    const [fileObj1, setFileObj1] = useState<any>({})
    const [filePath1, setFilePath1] = useState<any>()

    // https://bobbyhadz.com/blog/react-open-file-input-on-button-click
    const inputRef: any = useRef(null)
    // 👇️ open file input box on click of other element
    const handleClick = (): void => {
        inputRef.current.click()
    };

    const handleClear = (): void => {
      setFileObj1({})
    }

    const handleFileChange = (event: any): void => {
        const fileObj: any = event.target.files && event.target.files[0] as HTMLInputElement
        //const filePath = URL.createObjectURL(event.target.files[0])

        if (!fileObj) {
          return
        }
        // 👇️ reset file input
        event.target.value = null
    
        // 👇️ is now empty
        console.log(event.target.files)
    
        // 👇️ can still access file object here
        //console.log(fileObj.name)

        setFileObj1(fileObj)
      };
      console.log("fileObj: ", fileObj1)
      // *** call on fileClient to process once exe is go and file is in storage
      props.execute && fileObj1 && props.format ? fileClient(fileObj1, props.action, props.format) : console.log("void")

  return (
    <div className="input-wrapper">
        <input
            style={{display: 'none'}}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
        />
        <button onClick={handleClick}>{props.text}</button>
        <button className="clear" onClick={handleClear}>Clear</button>
        <br />
        <p className="file-name">
        {fileObj1.name ? fileObj1.name : ""}
        </p>
    </div>
  )
}

export default Upload