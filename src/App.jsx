import Congratulations from "./components/Congratulations"
import Quiz from "./components/Quiz"

function App() {
  return (
    <div
      className='background text-center h-screen flex items-center justify-center text-white text-2xl p-8'
    >
      <Congratulations 
        score={4}
        totalQuestions={10}
      />
    </div>
  )
}

export default App
