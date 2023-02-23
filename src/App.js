import './App.css';
import Navbar from './components/Navbar'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div >
      <Navbar/>
        <header>
            <Main />
        </header>
    </div>
  );
}

export default App;
