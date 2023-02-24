import React, { useState } from 'react'
import Upload from './Upload'
import './styles.css'

const CleanReps: React.FC = () =>  {

    const [downloadLink, setDownloadLink] = useState<string>("") // downloadLink needs to be passed by backend
    const [exe, setExe] = useState<boolean>(false)

    return (
        <div className="wrapper">
            <h2>Clean Repetitions</h2>
            <div className='upload-wrapper'>

                <Upload text="Upload File 1" execute={exe} action="clean-reps" />

                <button className="confirmation-button" onClick={() => setExe(true)}>Execute</button>

                <Upload text="Upload File 2" execute={exe} action="clean-reps" />
                
            </div>
            <h4>
                <a href={downloadLink.length > 0  ? downloadLink : ""} target="new">{downloadLink.length > 0 ? "Download File" : null}</a>
            </h4>
        </div>
    )
  }
  
  export default CleanReps