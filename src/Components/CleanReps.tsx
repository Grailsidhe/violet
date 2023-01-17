import React, { useState } from 'react'
import Upload from './Upload'
import './styles.css'

const CleanReps: React.FC = () =>  {

    const [downloadLink, setDownloadLink] = useState<string>("") // downloadLink needs to be passed by backend

    return (
        <div className="wrapper">
            <h2>Clean Repetitions</h2>
            <div className='upload-wrapper'>
                <Upload text="Upload File 1" />
                <Upload text="Upload File 2" />
            </div>
            <h4>
                <a href={downloadLink.length > 0  ? downloadLink : ""} target="new">{downloadLink.length > 0 ? "Download File" : null}</a>
            </h4>
        </div>
    )
  }
  
  export default CleanReps

  /*
  condition both file values to be present before working
  */