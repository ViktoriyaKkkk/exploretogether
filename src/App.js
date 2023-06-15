import AppRouter from './components/AppRouter'
import { AppWrapper, useAppContext } from './context/AppContext'
import { useEffect } from 'react'
import { check } from './api/api.user'

function App() {
  return (
    <AppWrapper>
      <AppRouter/>
    </AppWrapper>
  );
}

export default App;
