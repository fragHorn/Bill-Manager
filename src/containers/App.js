import {Routes, Route} from 'react-router-dom';

import styles from './App.module.css';

import Navigation from '../components/Navigation/Navigation';
import BillBox from './BillBox/BillBox';
import ColumnChart from '../components/ColumnChart/ColumnChart';

function App() {
  return (
    <div className = {styles.App}>
      <Navigation />
      {/* establishing the routes...*/}
      <Routes>
        {/* home page with all the existing bills*/}
        <Route path = '/' element = {<BillBox />} />
        <Route path = '/:id' element = {<ColumnChart />} />|
      </Routes>
    </div>
  );
}

export default App;
