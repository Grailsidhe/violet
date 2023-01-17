import './styles.css'
import React, { useRef, useState } from 'react'

interface Props {
  text: string,
}

const Upload: React.FC<Props> = (props): JSX.Element =>  {

    const [fileObj1, setFileObj1] = useState<any>({})

    // https://bobbyhadz.com/blog/react-open-file-input-on-button-click
    const inputRef: any = useRef(null)
    // 👇️ open file input box on click of other element
    const handleClick = (): void => {
        inputRef.current.click()
    };

    const handleClear = (): void => {
      // find code to clear the browser file
      setFileObj1({})
    }

    const handleFileChange = (event: any): void => {
        const fileObj: any = event.target.files && event.target.files[0]
        if (!fileObj) {
          return
        }
    
        console.log('fileObj is', fileObj)
    
        // 👇️ reset file input
        event.target.value = null
    
        // 👇️ is now empty
        console.log(event.target.files)
    
        // 👇️ can still access file object here
        console.log(fileObj)
        console.log(fileObj.name)

        setFileObj1(fileObj)
      };

  return (
    <div className="input-wrapper">
        <input // not HTML! react
            style={{display: 'none'}}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
        />
        <button onClick={handleClick}>{props.text}</button>
        <button onClick={handleClear}>Clear</button>
        <br />
        <p className="file-name">
        {fileObj1.name ? fileObj1.name : ""}
        </p>
    </div>
  )
}

export default Upload