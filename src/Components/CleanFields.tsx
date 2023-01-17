import React, { useState } from 'react'
import Upload from './Upload'
import './styles.css'

const CleanFields: React.FC = () =>  {

    const [downloadLink, setDownloadLink] = useState<string>("") // downloadLink needs to be passed by backend
    const [selectOption, setSelectOption] = useState<string>("1") // marker for function

    // needs completion
    function handleSelect(choice: string): void {
        choice == "1" ?
            console.log("1") :
        choice == "2" ?
            console.log("2") :
            console.log("3")
    }

    function handleChange(event: any): void {
        setSelectOption(event.target.value)
        handleSelect(selectOption[0])
    }

    return (
        <div className="wrapper">
            <h2>Clean Fields</h2>
            <div className='upload-wrapper'>
                <Upload text="Upload File" />
                <label>
                    Format &nbsp;
                    <select onChange={handleChange}>
                        <option value={"1"}>channel_id,device_type</option>
                        <option value={"2"}>push_address,device_type</option>
                    </select>
                </label>
            </div>
            <h4>
                <a href={downloadLink.length > 0 ? downloadLink : ""} target="new">{downloadLink.length > 0 ? "Download File" : null}</a>
            </h4>
        </div>
    )
  }
  
  export default CleanFields