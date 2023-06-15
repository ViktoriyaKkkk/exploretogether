import Layout from '../components/Layout'
import { useAppContext } from '../context/AppContext'
import Profile from '../components/Profile'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

const About = observer(() => {
	const { userStore } = useAppContext()
	console.log('user ', userStore.user)
	return (
		<Layout>
			{
				userStore.isProfile && <Profile />
			}
			<>
				<div className='absolute w-full -z-20 h-screen bg-black'>
				</div>
				<div
					className="absolute w-full -z-10 h-screen [mask-image:linear-gradient(0deg,black,transparent)] bg-repeat bg-[url('../../public/img/bggrid2.svg')] ">
				</div>
				<div className='fixed bottom-0 w-full -z-40 h-full bg-black xl:hidden'>
				</div>
				<div
					className="xl:hidden fixed w-full -z-30 h-full [mask-image:linear-gradient(0deg,transparent,black)] bg-repeat bg-[url('../../public/img/bggrid2.svg')] ">
				</div>
				<div
					className='flex pt-12 h-full flex-col items-center'>
					<section className="bg-transparent">
						<div className="py-5 px-8 mx-auto max-w-screen-xl text-center lg:pt-14 2xl:pb-28 lg:pb-16">
							<h1
								className="mb-4 text-3xl font-extrabold tracking-tight leading-none lg:text-4xl text-white">
								You could reach more further - Explore Together!</h1>
							<p className="mb-5 text-base lg:text-lg font-normal text-dark-white sm:px-12">Добро пожаловать на мой сайт для
								поиска партнеров по обучению! Независимо от того, в какой области знаний вы заинтересованы, на моём сайте вы сможете найти подходящего
								человека, с которым можно совместно изучать материалы, делиться опытом и знаниями. Я стремлюсь внести вклад в создание сообщества, где люди могут
								находить новое и обмениваться знаниями, а также вдохновлять друг друга на достижение новых высот. Я постоянно работаю над
								улучшением платформы, чтобы вы могли найти тех, кто вас дополнит и поможет реализовать ваши цели.
							</p>
							<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
								<Link to="/"
									 className="inline-flex justify-center items-center py-2 px-3 text-base font-medium text-center text-white rounded-lg
									  transition-colors duration-200 transform bg-dark-green hover:bg-light-green focus:outline-none">
									Искать партнёров
									<svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
											 xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd"
													d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
													clipRule="evenodd"></path>
									</svg>
								</Link>
							</div>
						</div>
					</section>

					<div className='grid grid-cols-1 xl:grid-cols-3 gap-5 mx-14 pb-20 xl:pb-0'>
						<div
							className="flex flex-col p-5 items-center bg-black border border-gray rounded-lg shadow md:flex-row md:max-w-xl">
							<div className="object-cover rounded-t-lg md:rounded-none md:rounded-l-lg">
								<svg width="100" height="130" xmlns="http://www.w3.org/2000/svg" clipRule="evenodd">

									<g>
										<title>background</title>
										<rect fill="none" id="canvas_background" height="132" width="102" y="-1" x="-1"/>
									</g>
									<g>
										<title>Layer 1</title>
										<g id="Слой-1">
											<path id="svg_1" strokeWidth="5.94669" strokeLinejoin="round" strokeLinecap="round" stroke="#40916a" fill="none" d="m38.169,51.297c4.05,-8.607 9.531,-16.466 14.191,-24.758c2.205,-3.924 4.158,-7.989 6.039,-12.078c0.999,-2.173 0.421,-4.997 1.811,-6.944c0.37,-0.518 0.629,1.175 0.604,1.812c-0.077,1.934 -0.675,3.814 -0.906,5.736c-0.373,3.112 -0.63,6.238 -0.906,9.36c-0.674,7.643 -1.307,15.291 -1.811,22.947c-1.079,16.398 -1.397,33.399 -0.302,49.819c0.094,1.409 0.243,2.815 0.302,4.227c0.036,0.864 0.17,8.077 -0.302,8.454c-2.283,1.826 -7.526,1.51 -10.266,1.51c-8.253,0 -16.505,0 -24.758,0c-2.919,0 -5.8376,0 -8.7563,0c-0.6039,0 -2.2386,-0.427 -1.8116,0c1.3596,1.359 3.8148,0.545 5.7367,0.604c2.1122,0.064 4.2272,0 6.3402,0c3.422,0 6.844,0 10.266,0c16.141,0 37.19,-2.83 51.027,7.548"/>
										</g>
									</g>
								</svg>
							</div>
							<div className="flex flex-col ml-5 justify-between leading-normal">
								<h5 className='mb-2 lg:text-xl text-lg font-bold tracking-tight text-white'>Создайте запрос на поиск</h5>
								<p className='mb-3 font-normal text-light-gray'>Перейдите на Главную и заполните форму,
									указав тему, раздел и уровень изучаемого, а так же другие необходимые поля.</p>
							</div>
						</div>

						<div
							className="flex flex-col p-5 items-center bg-black border border-gray rounded-lg shadow md:flex-row md:max-w-xl">
							<div className="object-cover rounded-t-lg md:rounded-none md:rounded-l-lg">
								<svg width="100" height="130" xmlns="http://www.w3.org/2000/svg" clipRule="evenodd">

									<g>
										<title>background</title>
										<rect fill="none" id="canvas_background" height="132" width="102" y="-1" x="-1"/>
									</g>
									<g>
										<title>Layer 1</title>
										<g id="Слой-1">
											<path id="svg_1" strokeWidth="5.94669" strokeLinejoin="round" strokeLinecap="round" stroke="#40916a" fill="none" d="m24.809,53.524c-4.827,-0.536 -8.786,-4.58 -12.0771,-8.152c-6.3027,-6.839 -7.2464,-14.789 -7.2464,-23.551c0,-2.539 -0.2942,-5.45 0.9058,-7.85c3.6753,-7.351 14.9677,-8.268 22.0407,-8.454c5.639,-0.148 11.953,-0.567 17.512,0.604c8.678,1.827 21.774,9.334 27.476,16.304c2.708,3.31 4.84,7.591 5.737,11.775c1.074,5.011 1.458,12.02 -0.302,16.909c-5.184,14.401 -24.972,23.444 -36.534,31.703c-5.756,4.111 -11.34,8.413 -17.21,12.379c-3.352,2.265 -6.809,4.396 -9.964,6.944c-1.9958,1.613 -3.922,3.319 -5.7364,5.133c-1.8278,1.828 -2.6614,3.533 -3.0193,6.039c-0.2264,1.584 -0.9096,4.522 0,6.038c1.3539,2.257 5.8184,2.428 7.8507,2.718c5.659,0.808 11.197,0.906 16.908,0.906c2.415,0 4.831,0 7.246,0c6.844,0 13.688,0 20.532,0c6.117,0 12.306,-0.266 18.417,0c4.293,0.186 8.362,1.509 12.682,1.509"/>
											<path id="svg_2" strokeWidth="5.94669" strokeLinejoin="round" strokeLinecap="round" stroke="#40916a" fill="none" d="m93.046,120.251c0,1.309 0,2.617 0,3.925"/>
										</g>
									</g>
								</svg>
							</div>
							<div className="flex flex-col ml-5 justify-between leading-normal">
								<h5 className='mb-2 lg:text-xl text-lg font-bold tracking-tight text-white'>Начните поиск</h5>
								<p className='mb-3 font-normal text-light-gray'>После заполнения всех необходимых
									полей нажмите на кнопку "Начать поиск" и ожидайте результатов выполнения алгоритма.</p>
							</div>
						</div>

						<div
							className="flex flex-col p-5 items-center bg-black border border-gray rounded-lg shadow md:flex-row md:max-w-xl">
							<div className="object-cover rounded-t-lg md:rounded-none md:rounded-l-lg">
								<svg width="100" height="130" xmlns="http://www.w3.org/2000/svg" clipRule="evenodd">

									<g>
										<title>background</title>
										<rect fill="none" id="canvas_background" height="132" width="102" y="-1" x="-1"/>
									</g>
									<g>
										<title>Layer 1</title>
										<g stroke="null" id="Слой-1">
											<path stroke="#40916a" id="svg_1" strokeWidth="5.94669" strokeLinejoin="round" strokeLinecap="round" fill="none" d="m29.919306,33.124429c0,-3.649324 -1.34246,-7.507668 0,-10.946905c1.096988,-2.813243 3.965132,-4.76161 6.027564,-7.084295c5.941825,-6.68865 13.028793,-7.083229 21.986749,-7.083229c10.401424,0 20.206198,1.355433 25.532582,10.624843c9.896386,17.222846 -13.572589,28.218807 -27.304912,34.453157c-1.611422,0.731571 -3.314455,1.280783 -4.964636,1.932371c-1.067626,0.42124 -2.872841,0.270873 -3.192307,1.288248c-0.246646,0.785959 1.584408,0.907532 2.482905,0.965119c1.943807,0.126905 3.737278,-1.080294 5.674038,-1.287181c5.093832,-0.544946 12.69171,-0.646257 17.375639,1.287181c13.284835,5.483584 16.878823,19.400496 15.60331,31.555666c-0.453359,4.321175 -2.87519,7.362633 -5.319337,10.946905c-9.346717,13.710025 -28.122368,20.607695 -45.391127,20.607695c-10.56468,0 -23.340954,-4.297713 -28.015488,-13.845462c-2.155453,-4.404356 -1.772682,-10.71549 -1.772682,-15.455771"/>
										</g>
									</g>
								</svg>
							</div>
							<div className="flex flex-col ml-5 justify-between leading-normal">
								<h5 className='mb-2 lg:text-xl text-lg font-bold tracking-tight text-white'>Познакомьтесь с партнёрами</h5>
								<p className='mb-3 font-normal text-light-gray'>Перейдите на страницу "Мой поиск" и найдите новый появившийся запрос на поиск.
									В пункте "Участники" вы увидите подобранных вам партнеров.</p>
							</div>
						</div>
					</div>
					</div>
			</>
		</Layout>
)
})

export default About