import './styles.css'
import React, { useRef } from 'react'

interface Props {
  text: string,
  file: object,
  fileName?: string
}

const Upload: React.FC<Props> = (props: any): JSX.Element =>  {

    // https://bobbyhadz.com/blog/react-open-file-input-on-button-click
    const inputRef: any = useRef(null)
    
    const handleClick = (): void => {
        inputRef.current.click()
    }

    const handleFileChange = (event: any): void => {
        const fileObj: any = event.target.files && event.target.files[0] as HTMLInputElement

        if (!fileObj) {
          return
        }
        event.target.value = null
        props.file(fileObj)
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
        <button className="clear" onClick={() => props.file("")}>Clear</button>
        <br />
        <p className="file-name">
        { props.fileName }
        </p>
    </div>
  )
}

export default Upload