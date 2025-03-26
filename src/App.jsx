import Header from './Components/Header';
import { AppRouter } from './Router/AppRouter';
function App() {

  return (
    <>
      <div className='font-jost'>
        <div className='mb-25'>

        <Header className=""/>
        </div>
        <AppRouter/>
      </div>
    </>
  )
}

export default App
