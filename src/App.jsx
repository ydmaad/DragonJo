import { Provider } from 'react-redux';
import Router from './routes/router';
import store from './redux/store/postStore';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
