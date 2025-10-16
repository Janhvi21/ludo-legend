import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <PaperProvider theme={MD3DarkTheme}>
          <Navigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App