
import { ToastContainer } from 'react-toastify';
import MainHome from './RoutePage/MainHome';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <MainHome />
    </BrowserRouter>
  )
}

export default App
