import logo from './logo.svg';
import './App.css';
import calendar from './calendar.png';
import Header  from './components/header/Header';
import InputField from './components/inputField/InputField';
import Cards from './components/cards/Cards';

function App() {
  return (
    <div className="App">
      <div className='toDoWraper'>
      <Header />
      <InputField />
      <Cards />
      </div>
    </div>
  );
}

export default App;
