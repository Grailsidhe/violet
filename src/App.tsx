import './App.css'
import CleanFields from './Components/CleanFields'
import CleanReps from './Components/CleanReps'

const App: React.FC = () => {

  return (
    <div className="App">
      <CleanReps />
      <CleanFields />
    </div>
  )
}

export default App