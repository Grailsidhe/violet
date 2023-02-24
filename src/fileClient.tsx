import Papa from 'papaparse'
import _ from 'lodash'

const fileClient = async (
    fileObject: any,
    action: string,
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
        // Parse the two CSV files

       // const csv1 = Papa.parse(fs.readFileSync(fileObject, 'utf8')).data
       // const csv2 = Papa.parse(fs.readFileSync(fileObject, 'utf8')).data

       const csv1 = Papa.parse(fileObject, { header: true }).data
       const csv2 = Papa.parse(fileObject, { header: true }).data // TO DO specify it as file 2

        // Merge the two arrays
        const merged = [...csv1, ...csv2]

        // Group the merged array by ID
        const grouped = _.groupBy(merged, 'id')

        // Define a custom merge function for duplicate rows
        const mergeFunction = (rows: any) => {
            // Here you can define how to merge the fields of the duplicate rows
            // ie: concatenate the values of a 'notes' field
            const notes = rows.map((row: any) => row.notes).join(', ')
            
            // Return a new object with the merged values
            return {
                    id: rows[0].id,
                    name: rows[0].name,
                    notes: notes
                }
        }

        // Merge the duplicate rows in each group
        const mergedRows = _.map(grouped, (rows: any, id: any) => {
            if (rows.length === 1) {
                // If there's only one row in the group, return it as is
                return rows[0]
            } else {
                // If there are multiple rows, merge them using the custom function
                return mergeFunction(rows)
            }
        })

        // Convert the merged rows back to CSV format
        const csvData = Papa.unparse(mergedRows)

        // Write the merged CSV data to a new file
        // TO DO >>>> fs.writeFileSync('merged_file.csv', csvData, 'utf8')
    }

    else {
        console.log("void")
    }
}

export default fileClient

// Download TO DO TREE