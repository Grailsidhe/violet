import React, { useState, useEffect } from 'react'
import Upload from './Upload'
import Execute from './Execute'
import Papa from 'papaparse'
import _ from 'lodash'
import './styles.css'

const ClearColumns: React.FC = () =>  {

    const [, setSelectOption] = useState<string>("format-1") // marker for function
    const [fileObj, setFileObj] = useState<any>({})
    const [exe, setExe] = useState<boolean>(false)
    const [downloadURL, setDownloadURL] = useState("")
    const [filePending, setFilePending] = useState(false)

    // call fileClient to process data on exe === true
    const fileClient = async (
        fileObj: any,
        format?: string
        ): Promise<void> => {

            const header: any = []
            const columns: any = []
            const file2: any = []

            const data: any = Papa.parse(fileObj, { header: true, 
                step: function(results: any, parser) {
                    console.log("Row data:", results.data)
                    console.log("Row errors:", results.errors)

                    const header1: string[] = Object.keys(results.data).slice(0, 2)
                    header.push(header1)
                    const values: object = Object.values(results.data).slice(0, 2)
                    columns.push(values)
                },
                complete: function(results, file) {
                    console.log("Parsing complete:", results, file)
                    file2.push(header.flat().slice(0, 2)) 
                    for (let i = 0; i < columns.length; i ++) {
                        file2.push(columns[i])
                    }
                    const newCsv: any = new Blob([Papa.unparse(file2)], { type: "text/csv" })

                    // create download link
                    const csvUrl = URL.createObjectURL(newCsv)
                    setDownloadURL(csvUrl)
                    setExe(false)
                }
            })
    }

    useEffect(() => {
        fileClient(fileObj)
    }, [exe])

    useEffect(() => {
        fileObj.name ? setFilePending(true) : setFilePending(false)
        setDownloadURL("")
    }, [fileObj])

    return (
        <div className="wrapper">
            <h2>Clear Columns</h2>
            <div className='upload-wrapper'>

                <Upload text="Upload File" file={(obj: {}) => setFileObj(obj)} fileName={fileObj.name} />

                <Execute switchAction={(bool: boolean) => setExe(bool)} downloadURL={downloadURL} filePending={filePending} clearAll={() => setFileObj("")} />

                <label className="input-wrapper">
                    Format &nbsp;
                    <select onChange={(event) => setSelectOption(event.target.value)}>
                        <option value={"format-1"}>column1,column2</option>
                        {/* <option value={"format-2"}>push_address,device_type</option> */}
                    </select>
                </label>
            </div>
        </div>
    )
  }
  
  export default ClearColumns