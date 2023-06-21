import AppRouter from './components/AppRouter'
import { AppWrapper } from './context/AppContext'

function App() {
  return (
    <AppWrapper>
      <AppRouter/>
    </AppWrapper>
  );
}

export default App;
