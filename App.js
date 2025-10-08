import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App