import './styles/Layouts.scss';
import './styles/App.scss';
import Orb from './components/Orb/Orb';
import { useMemo, useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income';
import Expenses from './components/Expenses/Expenses';
 

function App() {
  const [active, setActive] = useState<number>(1);
  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }
  const orbMemo = useMemo(() => {
    return <Orb />
  },[])
  
  return (
    <div className="App">
      {orbMemo}
      <div className="main-layout">
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </div>
    </div>
  );
}

export default App;
