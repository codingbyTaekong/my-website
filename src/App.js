import {useEffect} from 'react';
import axios from 'axios'

function App() {
  const callApi = async ()=> {
    axios.get("/api").then((res)=> console.log(res.data))
  }
  useEffect(()=> {
    callApi();
  },[])
  return (
    <div className="App">
      Hello React
    </div>
  );
}

export default App;
