import React, { useState } from 'react'
import Upload from './Upload'
import './styles.css'

const CleanFields: React.FC = () =>  {

    const [downloadLink, setDownloadLink] = useState<string>("") // downloadLink needs to be passed by backend
    const [selectOption, setSelectOption] = useState<string>("format-1") // marker for function
    const [exe, setExe] = useState<boolean>(false)

    return (
        <div className="wrapper">
            <h2>Clean Fields</h2>
            <div className='upload-wrapper'>

                <Upload text="Upload File" execute={exe} format={selectOption} action="clean-fields" />

                <button className="confirmation-button" onClick={() => setExe(true)}>Execute</button>

                <label className="input-wrapper">
                    Format &nbsp;
                    <select onChange={(event) => setSelectOption(event.target.value)}>
                        <option value={"format-1"}>channel_id,device_type</option>
                        {/* <option value={"format-2"}>push_address,device_type</option> */}
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