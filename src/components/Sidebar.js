import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'

const Sidebar = () => {
	const location = useLocation()

	return (
			<div className="fixed left-1 top-24 xl:top-44 w-full p-6 sm:w-40 bg-black rounded-lg">
				<nav className="space-y-5">
					<div className="space-y-2">
						<h2 className="font-semibold text-sm uppercase text-light-gray">Документы</h2>
						<div className="flex flex-col space-y-2 text-white">
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/age' && 'bg-dark-gray')} to="/age" >Age</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/city' && 'bg-dark-gray')} to="/city">City</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/duration' && 'bg-dark-gray')} to="/duration">Duration</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/format' && 'bg-dark-gray')} to="/format">Format</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/level' && 'bg-dark-gray')} to="/level">Level</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/periodicity' && 'bg-dark-gray')} to="/periodicity">Periodicity</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/search' && 'bg-dark-gray')} to="/search">Search</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/section' && 'bg-dark-gray')} to="/section">Section</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/time' && 'bg-dark-gray')} to="/time">Time</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/topic' && 'bg-dark-gray')} to="/topic">Topic</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/user' && 'bg-dark-gray')} to="/user">User</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/report' && 'bg-dark-gray')} to="/report">Reports</Link>
							<Link className={clsx('hover:bg-dark-gray', location.pathname === '/questionadmin' && 'bg-dark-gray')} to="/questionadmin">Questions</Link>
						</div>
					</div>
				</nav>
			</div>
	)
}

export default Sidebar