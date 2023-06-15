import { createContext, useContext } from 'react'
import LoginStore from '../store/LoginStore'
import AdminStore from '../store/AdminStore'

const AppContext = createContext()
export const AppWrapper = ({children}) => {
	return (
<AppContext.Provider value={{
	userStore: new LoginStore(),
	AdminInstance: new AdminStore()
}}>
	{children}
</AppContext.Provider>
	)
}

export const useAppContext = () => {
	return useContext(AppContext)
}

