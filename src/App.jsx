import Congratulations from "./components/Congratulations"
import Quiz from "./components/Quiz"

function App() {
  return (
    <>
      <main
        className='background w-full min-h-screen flex flex-col items-center justify-center p-8 overflow-y-auto'
      >
        <Quiz />
      </main>
      <footer className='flex flex-col items-center justify-center text-center text-primary/50 text-xs'>
        <p>Coded by <a href="https://kylamarieangeles.vercel.app/" target="_blank" className='hover:text-primary'>Kyla Marie Angeles</a></p>
        <p>Challenge by <a href="https://www.devchallenges.io?ref=challenge" target="_blank" className='hover:text-primary'>devChallenges.io</a>.</p>
      </footer>
    </>
  )
}

export default App
