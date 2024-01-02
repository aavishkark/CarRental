import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import AllRoutes from './Components/AllRoutes';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div className="App">
     <Navbar></Navbar>
     <AllRoutes></AllRoutes>
    </div>
  );
}

export default App;
