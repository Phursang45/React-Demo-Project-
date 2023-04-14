import './App.css';
import View from './components/View';
import Header from './components/Header';

function App(props) {
  return (
    <>
      <Header client={props.client}/>
      <View client={props.client}/>
    </>

  );
}

export default App;
