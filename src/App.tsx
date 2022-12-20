import './App.css'
import Button from './Components/Button'

const App: React.FC = () => {

// file reader
// npm i --save n-readlines

  const nReadlines: any = require('n-readlines')
  const readFile: any = new nReadlines('./read_file.csv')

  let line
  let lineNumber = 1

  while (line = readFile.next()) {
      console.log(`Line ${lineNumber} has: ${line.toString('ascii')}`)
      lineNumber++
  }

  console.log('end of file.')
  const used: number = process.memoryUsage().heapUsed / 1024 / 1024
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`)

// node n-readlines.js
// -file reader

  return (
    <div className="App">
      <Button />
    </div>
  )
}

export default App