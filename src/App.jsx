import Header from './Components/header';
import { AppRouter } from './Router/AppRouter';
function App() {

  return (
    <>
      <div className='font-jost'>
        <Header />
        <AppRouter/>
      </div>
    </>
  )
}

export default App
