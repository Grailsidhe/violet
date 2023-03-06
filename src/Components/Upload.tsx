import './styles.css'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  text: string,
  file: object
}

const Upload: React.FC<Props> = (props: any): JSX.Element =>  {

    const [fileObj1, setFileObj1] = useState<any>({})

    // https://bobbyhadz.com/blog/react-open-file-input-on-button-click
    const inputRef: any = useRef(null)
    
    const handleClick = (): void => {
        inputRef.current.click()
    }

    const handleClear = (): void => {
      setFileObj1({})
    }

    useEffect(() => {
      props.file(fileObj1)
    }, [fileObj1])

    const handleFileChange = (event: any): void => {
        const fileObj: any = event.target.files && event.target.files[0] as HTMLInputElement

        if (!fileObj) {
          return
        }
        event.target.value = null
        setFileObj1(fileObj)
      }

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
        {fileObj1.name}
        </p>
    </div>
  )
}

export default Upload