import React, { useEffect, useState } from 'react'
import {routes} from "../routes";
import {Routes, Route, Navigate} from "react-router-dom";
import { useAppContext } from '../context/AppContext'
import { check } from '../api/api.user'

const AppRouter = () => {

	const {userStore} = useAppContext()
	const [loading, setLoading] = useState(true)

	useEffect(()=>{

		check().then(res =>{
			if (res.response && res.response.status === 403){
				userStore.setIsAuth(false)
				userStore.setUser({})
			} else {
				userStore.setIsAuth(true)
				userStore.setUser(res)
			}
		},
			err =>{
				userStore.setIsAuth(false)
			}
			).finally(()=>setLoading(false))
	})

	if (loading){
		return <></>
	}

	return (
		<Routes>
			{
				routes.map(
					({path,Component})=> {
						return <Route key={path} path={path} element={<Component/>}></Route>
					}
				)
			}
			<Route path={"*"} element={<Navigate to={"/"}/>}/>
		</Routes>
	);
};

export default AppRouter;