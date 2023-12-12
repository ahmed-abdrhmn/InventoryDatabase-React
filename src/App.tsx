import './App.css'
import ListGroup from './components/ListGroup'

function App() {
  const list = ['Riyadh','Dammam','Jeddah','Jubail','Hofuf','Arar']
  return <ListGroup title='Ahmed' list={list} onClick={(item)=>console.log(item)} />
}

export default App;