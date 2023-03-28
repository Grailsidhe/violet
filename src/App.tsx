import './App.css'
import ClearColumns from './Components/ClearColumns'
import ClearRows from './Components/ClearRows'

const App: React.FC = () => {

  return (
    <div className="App">
      <ClearRows />
      <ClearColumns />
    </div>
  )
}

export default App