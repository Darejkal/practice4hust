import * as React from 'react';
import HomeView from './view/HomeView';
import './App.css';
interface AppProps {}

const App: React.FC<AppProps> = props => {
  return <HomeView/>;
};

export default App;
