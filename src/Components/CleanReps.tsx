import React, { useState, useEffect } from 'react'
import Upload from './Upload'
import Execute from './Execute'
import Papa from 'papaparse'
import _ from 'lodash'
import './styles.css'

const CleanReps: React.FC = () =>  {

    const [fileObj1, setFileObject1] = useState({})
    const [fileObj2, setFileObject2] = useState({})
    const [exe, setExe] = useState<boolean>(false)
    const [downloadURL, setDownloadURL] = useState("")
    const [selectedRadioButton, setSelectedRadioButton] = useState("keepDoubles")

    const handleFileChange = (obj: {}, file: string) => {
        file === "1" ? setFileObject1(obj) : setFileObject2(obj)
    }

    const fileClient = async (
        fileObj1: any,
        fileObj2: any,
        format: string
        ): Promise<void> => {
            const header: any = []
            const columns1: any = []
            const columns2: any = []
            const columns: any = []
            const endFile: any = []
            
            const csv1 = Papa.parse(fileObj1, { header: true,
                step: function(results: any, parser) {
                    console.log("Row data:", results.data)
                    console.log("Row errors:", results.errors)
    
                    const values: object = Object.values(results.data)
                    columns1.push(values)
                }
            })
            const csv2 = Papa.parse(fileObj2, { header: true,
                step: function(results: any, parser) {
                    console.log("Row data:", results.data)
                    console.log("Row errors:", results.errors)
    
                    const header1: string[] = Object.keys(results.data)
                    header.push(header1)
                    const values: object = Object.values(results.data)
                    columns2.push(values)
                },
                complete: function(results, file) {
                    console.log("Parsing complete:", results, file)

                    if (format == "keepDoubles") {
                        // keep double values
                        columns1.forEach((subArr1: []) => {
                            columns2.forEach((subArr2: []) => {
                                if(subArr1.toString() === subArr2.toString()) {
                                    columns.push(subArr1)
                                }
                            })
                        })
                        console.log(columns)
                    }
                    else if (format == "keepSingles") {
                        const addedSubArrays: any = []
                        // keep unique values
                        columns1.forEach((subArr1: []) => {
                            const isSubArr1Unique = !columns2.some((subArr2: []) => {
                              return subArr1.toString() === subArr2.toString()
                            })
                          
                            if (isSubArr1Unique && !addedSubArrays.includes(subArr1.toString())) {
                              columns.push(subArr1)
                              addedSubArrays.push(subArr1.toString())
                            }
                          })
                          
                          columns2.forEach((subArr2: []) => {
                            const isSubArr2Unique = !columns1.some((subArr1: []) => {
                              return subArr1.toString() === subArr2.toString()
                            })
                          
                            if (isSubArr2Unique && !addedSubArrays.includes(subArr2.toString())) {
                              columns.push(subArr2)
                              addedSubArrays.push(subArr2.toString())
                            }
                          })
                          console.log(columns)
                    }

                    endFile.push(header[0]) 
                    for (let i = 0; i < columns.length; i ++) {
                        endFile.push(columns[i])
                    }
                    const newCsv: any = new Blob([Papa.unparse(endFile)], { type: "text/csv" })
    
                    // download link
                    const csvUrl = URL.createObjectURL(newCsv)
                    setDownloadURL(csvUrl)
                    setExe(false)
                }
            })
    }

    useEffect(() => {
        fileClient(fileObj1, fileObj2, selectedRadioButton)
    }, [exe])
    
    useEffect(() => {
        setDownloadURL("")
    }, [fileObj2])

    return (
        <div className="wrapper">
            <h2>Clean Repetitions</h2>
            <div className='upload-wrapper'>

                <Upload text="Upload File 1" file={(obj: any) => handleFileChange(obj, "1")} />
            
                <Execute switchAction={(bool: boolean): void => setExe(bool)} downloadURL={downloadURL} filePending={fileObj2} />

                <Upload text="Upload File 2" file={(obj: any) => handleFileChange(obj, "2")} />
                
            </div>
            <div className='upload-wrapper upload-wrapper-2'>
                <label>
                    <input type="radio" checked={selectedRadioButton === "keepDoubles"} onChange={() => setSelectedRadioButton("keepDoubles")} />
                    Keep Repeated Rows
                </label>
                <label>
                    <input type="radio" checked={selectedRadioButton === "keepSingles"} onChange={() => setSelectedRadioButton("keepSingles")} />
                    Keep Unique Rows
                </label>
            </div>
        </div>
    )
  }
  
  export default CleanReps