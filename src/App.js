import './App.css';
import Header  from './components/header/Header';
import InputField from './components/inputField/InputField';

function App() {
  return (
    <div className="App">
      <div className='toDoWraper'>
      <Header />
      <InputField></InputField>
      </div>
    </div>
  );
}

export default App;
