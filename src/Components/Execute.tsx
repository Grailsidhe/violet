import React, { useState, useEffect } from 'react'
import './styles.css'

interface Props {
    switchAction: any,
    downloadURL: any,
    filePending: any,
    clearAll: any
  }

const Execute: React.FC<Props> = (props: any): JSX.Element =>  {

    const [status, setStatus] = useState("Execute")
    const [message, setMessage] = useState("")
    const [action, setAction] = useState(false)

    const handleClick = () => {
        if (props.filePending) {
            if (props.downloadURL) {
                setMessage("")
                window.location.href = props.downloadURL
            }
            else {
                setMessage("")
                setAction(true)
            }
        }
        else {
            setMessage("Please upload a file")
        }
    }

    useEffect(() => {
        props.switchAction(action)
    }, [action])

    useEffect(() => {
        props.filePending ? (setMessage(""), setStatus("Execute"), setAction(false)) : null
    }, [props.filePending])

    useEffect(() => {
        if (action && props.filePending && !props.downloadURL) {
            setStatus("Processing...")
        }
        else if (action && props.downloadURL) {
            setStatus("Download")
        }
        else {
            setStatus("Execute")
        }
    }, [action, props.downloadURL])

    return (
        <div>
           {status === "Processing..." ? status : <button className="confirmation-button" onClick={handleClick}>{status}</button>}
            <div className="message">
                {status === "Download" ? <button className="refresh-button" onClick={() => props.clearAll("")}>Reset</button> : message}
            </div>
        </div>
    )
}

export default Execute