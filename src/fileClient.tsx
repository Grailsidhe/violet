import LineByLineReader from 'line-by-line'

export async function fileClient(
    filePath: string,
    action: string
): Promise<void> {

    const lr = new LineByLineReader('big_file.txt')

    lr.on('error', function (err: string) {
        // 'err' contains error object
    })

    lr.on('line', function (line: any) {
        // pause emitting of lines...
        lr.pause()

        // ...do your asynchronous line processing..
        setTimeout(function () {
            // *** add processing code
            console.log(line)
            // ...and continue emitting lines.
            lr.resume()
        }, 100)
    })

    lr.on('end', function () {
        // All lines are read, file is closed now.
    })

}


//takes string file name, and executes (passes through a function to comb via conditions)
//find way to split big string to usable structure (array?)