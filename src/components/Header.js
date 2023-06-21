import { useAppContext } from '../context/AppContext'
import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { IconContext } from 'react-icons'
import { clsx } from 'clsx'
import { useSearch } from '../utils/useSearch'
import { useMemo, useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'


const Header = observer(() => {

	const { userStore } = useAppContext()
	const location = useLocation()

	const [searches] = useSearch()
	if (!searches.response) {
		searches.reverse()
	}
	const chats = useMemo(() => {
		if (Object.keys(userStore._user).length !== 0) {
			return searches?.filter(search => {
				let res = false
				search.owner === userStore._user.id ? res = true : search.participants.forEach((item) => {
					if (item === userStore._user.id) {
						res = true
					}
				})
				return res
			})
		}
	}, [searches, userStore])

	const id = useMemo(() => {
		if (typeof chats !== 'undefined' && chats.length !== 0 && Object.keys(userStore._user).length !== 0) {
			return chats[0]._id
		}
	}, [chats, userStore])

	const [menu, setMenu] = useState(false)

	return (<header>
			<nav
				className='fixed z-10 top-0 scrollbar max-h-14 w-full sm:px-4 lg:px-6 pt-1 pb-1.5 sm:opacity-90 bg-black flex flex-wrap justify-between items-center w-screen'>
				<button className='sm:hidden order-1 text-white p-2 ml-4' onClick={() => setMenu(!menu)}><IconContext.Provider
					value={{ size: '2em' }}>
					{
						menu ? <HiX /> : <HiMenu />
					}

				</IconContext.Provider></button>
				<Link to='/' className='sm:flex hidden font-bold'>
					<svg width='35' height='35' xmlns='http://www.w3.org/2000/svg'>
						<g>
							<title>background</title>
							<rect x='-1' y='-1' width='37' height='37' id='canvas_background' fill='none' />
							<g id='canvasGrid' display='none'>
								<rect id='svg_1' width='100%' height='100%' x='0' y='0' strokeWidth='0' fill='url(#gridpattern)' />
							</g>
						</g>

						<g>
							<title>Layer 1</title>
							<g stroke='null' id='svg_8'>
								<g stroke='null' id='svg_5'
									 transform='matrix(0.10722499090069627,0,0,0.10841878701443147,-79.57733733744611,-47.30615232197317) '>
									<path stroke='null' id='svg_6'
												d='m1053.101555,689.974558l-53.462,-53.462a28.306,28.306 0 0 0 -38.278,-1.617l-17.409,-17.408a107.7,107.7 0 1 0 -17.134,17.132l17.408,17.409a28.3,28.3 0 0 0 1.618,38.276l53.463,53.461a28.319,28.319 0 0 0 40.046,0l13.747,-13.747a28.314,28.314 0 0 0 0,-40.044l0.001,0zm-252.422,-80.573a83.479,83.479 0 1 1 59.026,24.448a82.932,82.932 0 0 1 -59.026,-24.448zm235.29,103.485l-13.747,13.745a4.088,4.088 0 0 1 -5.78,0l-53.465,-53.462a4.085,4.085 0 0 1 0,-5.777l13.748,-13.749a4.091,4.091 0 0 1 5.78,0l53.463,53.462a4.087,4.087 0 0 1 0,5.778l0.001,0.003z'
												fill='#40936b' />
								</g>
							</g>
							<g stroke='null' id='svg_11'>
								<path stroke='null'
											d='m20.541593,12.461958a7.906194,7.864881 0 1 1 -7.906196,-7.864879a7.906194,7.864881 0 0 1 7.906196,7.864879zm-4.114379,2.345458a0.47635,0.47386 0 0 0 -0.035951,-0.1659a0.583202,0.580157 0 0 0 -0.139808,-0.195704l-0.383477,-0.382463l-0.110846,-0.108283l-0.002,-0.001986l-2.458638,-2.447779l-0.002995,-0.004967l-0.284613,-0.283126l-0.799905,0.795728a1.170401,1.164283 0 0 1 -0.547254,0.323854a1.096502,1.090772 0 0 1 -1.007623,-0.242395l-0.009985,-0.009935l-0.016977,-0.0149l-0.174763,-0.173848a1.108484,1.102693 0 0 1 -0.332543,-0.636779a1.146432,1.140443 0 0 1 0.041942,-0.51161a1.224328,1.21793 0 0 1 0.260644,-0.449026l0.007988,-0.009932l0.012983,-0.012916l0.592191,-0.589097l-1.28125,-1.29939l-2.447655,2.473608l0.620152,0.582143l0.612164,0.607972a1.530908,1.522909 0 0 0 -0.031957,0.456971a2.067176,2.056373 0 0 0 0.108852,0.509624a2.568491,2.555067 0 0 0 0.266635,0.543398a3.258548,3.24152 0 0 0 0.452384,0.552339l3.470255,3.452124a0.456375,0.45399 0 0 0 0.16178,0.107288a0.434406,0.432137 0 0 0 0.163777,0.024837a0.290604,0.289085 0 0 0 0.186745,-0.087421l0.170766,-0.168881a0.337538,0.335775 0 0 0 0.076895,-0.149014a0.354516,0.352664 0 0 0 -0.001997,-0.162919a0.41643,0.414254 0 0 0 -0.123832,-0.19471l-0.419426,-0.421208a0.128824,0.12815 0 0 1 -0.002995,-0.186764l0.083884,-0.067552a0.087881,0.087421 0 0 1 0.122833,0l0.639126,0.623866q0.31457,0.312925 0.558237,0.098348l0.169768,-0.169875a0.407444,0.405314 0 0 0 0.065909,-0.087419a0.247661,0.246368 0 0 0 0.02996,-0.123185a0.367499,0.365577 0 0 0 -0.042941,-0.158946a0.742985,0.739103 0 0 0 -0.1468,-0.189742l-0.617156,-0.601018a0.136812,0.136098 0 0 1 -0.000998,-0.191729l0.061915,-0.062584a0.12483,0.124177 0 0 1 0.181752,0.002978l0.669086,0.678505c0.022968,0.023842 0.053924,0.053644 0.093872,0.089408a0.409441,0.4073 0 0 0 0.13182,0.082454a0.307578,0.305974 0 0 0 0.157783,0.018875a0.316567,0.314914 0 0 0 0.172763,-0.101329l0.215706,-0.214579a0.407444,0.405314 0 0 0 0.065909,-0.087419a0.246662,0.245373 0 0 0 0.02996,-0.123185a0.372491,0.370545 0 0 0 -0.040944,-0.155965a0.575214,0.572208 0 0 0 -0.126827,-0.170867l-0.645117,-0.627841a0.170766,0.169875 0 0 1 0.000998,-0.2414l0.023967,-0.026821a0.13981,0.139079 0 0 1 0.203722,0.005959l0.542259,0.550355c0.01498,0.0149 0.039945,0.039737 0.077893,0.073511a0.524283,0.521545 0 0 0 0.132818,0.087421a0.346528,0.344716 0 0 0 0.166772,0.030796a0.292601,0.291071 0 0 0 0.183749,-0.098348l0.170766,-0.169875a0.345529,0.343721 0 0 0 0.047936,-0.069538a0.247661,0.246368 0 0 0 0.028959,-0.123185l0.000998,0.000995zm1.469992,-3.992541l-2.436669,-2.423936l-0.903766,0.899041a6.477148,6.443301 0 0 0 -0.958689,-0.126163a3.223595,3.206748 0 0 0 -0.543257,0.014902a2.025231,2.01465 0 0 0 -0.512301,0.126163a1.252288,1.245745 0 0 0 -0.432409,0.280145l-1.172398,1.167264l-0.001997,0.001986a0.542259,0.539425 0 0 0 -0.11684,0.197691l-0.000998,0.004967a0.469358,0.466906 0 0 0 -0.015979,0.208617a0.442396,0.440083 0 0 0 0.137811,0.246365l0.169768,0.168881a0.419428,0.417235 0 0 0 0.184748,0.096362l0.003997,0.000995a0.414433,0.412268 0 0 0 0.197728,-0.004967a0.500317,0.497702 0 0 0 0.227688,-0.144047l1.042576,-1.037125a0.344528,0.342729 0 0 1 0.486335,0l2.987916,2.977269l0.039945,0.039737l0.079893,-0.11921a2.51756,2.504404 0 0 0 0.260644,-0.530485a2.057188,2.046438 0 0 0 0.106852,-0.50267a1.69768,1.688809 0 0 0 0,-0.252327a0.340534,0.338756 0 0 1 0.019973,-0.144047l1.14943,-1.145408zm-3.107752,4.833965l0.003994,-0.002978a0.374488,0.372531 0 0 1 -0.034953,0.021853a0.442396,0.440083 0 0 1 0.030959,-0.019867l0,0.000992z'
											id='svg_12' fill='#6fcf97' />
							</g>
						</g>
					</svg>

					<span className='whitespace-nowrap text-white lg:inline hidden'>ExploreTogether</span>
				</Link>

				{
					userStore._user.role !== '641e18b855a5d5389d78aba8' &&
					<div
						className={clsx('order-3 sm:order-2 h-screen text-3xl sm:text-base sm:h-fit w-full bg-black sm:bg-transparent ' +
							'sm:justify-between w-full flex sm:w-auto', !menu && 'hidden sm:flex')} id='mobile-menu-2'>
						<ul
							className='flex flex-col my-auto pb-14 sm:pb-0 sm:mt-0 space-y-14 sm:space-y-0 w-fit sm:mt-4 mx-auto font-medium sm:flex-row lg:space-x-3 lg:mt-0'>

							<Link to={userStore.isConnected === true ? `/main` : '/'}
										className={clsx('pr-4 pl-3 text-white place-self-center',
											(location.pathname === '/' || location.pathname === '/main') && 'drop-shadow-[0_6px_3px_rgba(111,207,151,0.8)] pb-0.5 block border-b-2 border-b-dark-green')}
										aria-current='page'>Главная</Link>

							<Link to='/about/'
										className={clsx('pr-4 pl-3 text-white place-self-center',
											location.pathname === '/about/' && 'drop-shadow-[0_6px_3px_rgba(111,207,151,0.8)] pb-0.5 block border-b-2 ' +
											'border-b-dark-green')}>О нас</Link>
							{
								userStore._isAuth === true &&
								<>
									<Link to='/mysearch/'
												className={clsx('pr-4 pl-3 text-white place-self-center',
													location.pathname === '/mysearch/' && 'drop-shadow-[0_6px_3px_rgba(111,207,151,0.8)] pb-0.5 block ' +
													'border-b-2 border-b-dark-green')}>Мой поиск</Link>
									<Link to={`/dialogs/${id}`}
												className={clsx('pr-4 pl-3 text-white relative place-self-center',
													location.pathname.split('/')[1] === 'dialogs' && 'drop-shadow-[0_6px_3px_rgba(111,207,151,0.8)] pb-0.5 block ' +
													'border-b-2 border-b-dark-green')}>Диалоги
										{
											userStore.notifications.length !== 0 && location.pathname.split('/')[1] !== 'dialogs' &&
											<span className='absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 ml-2 text-xs font-semibold text-black bg-light-green
									rounded-full'>{userStore.notifications.length}</span>
										}

									</Link>
								</>
							}
							<Link to='/questions/'
										className={clsx('pr-4 pl-3 text-white place-self-center',
											location.pathname === '/questions/' && 'drop-shadow-[0_6px_3px_rgba(111,207,151,0.8)] pb-0.5 block ' +
											'border-b-2 border-b-dark-green')}>Вопросы</Link>


						</ul>
					</div>
				}

				<div className='flex order-2 sm:order-3'>
					{userStore._isAuth ?
						<Link to='/' onClick={() => {
							userStore.setIsAuth(false)
							userStore.setIsConnected(false)
							userStore.setUser({})
							localStorage.clear('token')
							localStorage.clear('city')
						}}
									className='text-gray-800 dark:text-white
							 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-1.5
							 mr-2 hover:bg-gray hover:bg-opacity-20 focus:outline-none'>
							Выйти</Link>
						:
						<Link to='/' onClick={() => userStore.setIsLogin(!userStore._isLogin)}
									className='text-gray-800 dark:text-white hover:bg-gray-50 hover:bg-gray hover:bg-opacity-20 font-medium rounded-lg px-4
									lg:px-5 py-2 lg:py-2.5
							 mr-2 focus:outline-none'>
							{
								userStore._isLogin ? 'Регистрация' : 'Войти'
							}
						</Link>
					}
					{userStore._isAuth && userStore._user.role === '641e18b855a5d5389d78aba7' &&
						<IconContext.Provider value={{ size: '1.8em' }}>
							<button className='px-2.5 py-1.5 text-white sm:mr-0 mr-4' onClick={() => {
								userStore.setIsProfile(true)
							}}><CgProfile />
							</button>
						</IconContext.Provider>}

				</div>

			</nav>
		</header>
	)
})

export default Header