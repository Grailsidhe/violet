import Papa from 'papaparse'
import _ from 'lodash'

const fileClient = async (
    fileObject: any,
    action: string,
    someProp: any,
    format: string // selected format for CleanFields
    ): Promise<void> => {

    // REMOVE COLUMNS
    if(action == "clean-fields") {
        
        const header: any = []
        const columns: any = []
        const file2: any = []

        const data: any = Papa.parse(fileObject, { header: true, 
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
                console.log("newCsv: ", newCsv)

                // create download link
                const csvUrl = URL.createObjectURL(newCsv)
                const downloadLink = document.createElement("a")
                downloadLink.setAttribute("href", csvUrl)
                downloadLink.setAttribute("download", "new_file.csv")
                downloadLink.innerText = "Download formatted file"
                document.body.appendChild(downloadLink)
            }
        })
    }

    // REMOVE DUPLICATES ---- !!!! remove line-by-line
    if(action == "clean-reps") {
        
        const header: any = []
        const columns1: any = []
        const columns2: any = []
        const columns: any = []
        const endFile: any = []
        
        const csv1 = Papa.parse(fileObject, { header: true,
            step: function(results: any, parser) {
                console.log("Row data:", results.data)
                console.log("Row errors:", results.errors)

                const header1: string[] = Object.keys(results.data)
                header.push(header1)
                const values: object = Object.values(results.data)
                columns1.push(values)
            }
        })

        const csv2 = Papa.parse(fileObject, { header: true,
            step: function(results: any, parser) {
                console.log("Row data:", results.data)
                console.log("Row errors:", results.errors)

                const values: object = Object.values(results.data)
                columns2.push(values)

                if (someProp == "keepDoubles") {
                    // keep double values
                    columns1.forEach((subArr1: []) => {
                        columns2.forEach((subArr2: []) => {
                            if (subArr1.toString() === subArr2.toString()) {
                                columns.push(subArr1)
                            }
                        })
                    })
                }
                else {
                    // keep unique values
                    columns1.forEach((subArr1: []) => {
                        columns2.forEach((subArr2: []) => {
                            if (subArr1.toString() != subArr2.toString()) {
                                columns.push(subArr1)
                            }
                        })
                    })
                }
            },
            complete: function(results, file) {
                console.log("Parsing complete:", results, file)
                endFile.push(header.flat()) 
                for (let i = 0; i < columns.length; i ++) {
                    endFile.push(columns[i])
                }
                const newCsv: any = new Blob([Papa.unparse(endFile)], { type: "text/csv" })
                console.log("newCsv: ", newCsv)

                // create download link
                const csvUrl = URL.createObjectURL(newCsv)
                const downloadLink = document.createElement("a")
                downloadLink.setAttribute("href", csvUrl)
                downloadLink.setAttribute("download", "new_file.csv")
                downloadLink.innerText = "Download formatted file"
                document.body.appendChild(downloadLink)
            }
        })
    }

    else {
        console.log("void")
    }
}

export default fileClient

// Download TO DO TREE