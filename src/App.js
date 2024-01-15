import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import AllRoutes from './Components/AllRoutes';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div className="App" style={{fontFamily:"monospace"}}>
     <Navbar></Navbar>
     <AllRoutes></AllRoutes>
     <Footer/>
    </div>
  );
}

export default App;
