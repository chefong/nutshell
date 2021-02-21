import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Loading from './pages/Loading/Loading';
import Video from './pages/Video/Video';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/loading" component={Loading} />
          <Route path="/video/:videoId" component={Video} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
