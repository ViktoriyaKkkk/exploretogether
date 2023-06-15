import Header from './Header'

const Layout = ({children}) => {
	return (
		<div className='overflow-hidden'>
			<Header/>
			{children}
		</div>
	)
}

export default Layout