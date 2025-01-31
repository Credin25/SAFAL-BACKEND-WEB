import { ToastContainer } from 'react-toastify';
import MainHome from './RoutePage/MainHome';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true; 
function App() {
  const authHeader = Cookies.get("accessToken")
  
  axios.interceptors.request.use((config) => {
    if (!authHeader) return config
    config.headers.Authorization = `Bearer ${authHeader}`
    return config
  })
  return (
    <BrowserRouter>
        <ToastContainer />
        <MainHome />
    </BrowserRouter>
  )
}

export default App
