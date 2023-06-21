import Start from './pages/Start'
import About from './pages/About'
import Main from './components/Main'
import MySearch from './pages/MySearch'
import Age from './pages/Age'
import Duration from './pages/Duration'
import City from './pages/City'
import Format from './pages/Format'
import Periodicity from './pages/Periodicity'
import Time from './pages/Time'
import Topic from './pages/Topic'
import Section from './pages/Section'
import Level from './pages/Level'
import User from './pages/User'
import Search from './pages/Search'
import Report from './pages/Report'
import Dialogs from './pages/Dialogs'
import Questions from './pages/Questions'
import QuestionAdmin from './pages/QuestionAdmin'

export const routes = [
	{
		path: '/',
		Component: Start
	},
	{
		path: '/about',
		Component: About
	},
	{
		path: '/mysearch',
		Component: MySearch
	},
	{
		path: '/age',
		Component: Age
	},
	{
		path: '/duration',
		Component: Duration
	},
	{
		path: '/city',
		Component: City
	},
	{
		path: '/format',
		Component: Format
	},
	{
		path: '/periodicity',
		Component: Periodicity
	},
	{
		path: '/time',
		Component: Time
	},
	{
		path: '/topic',
		Component: Topic
	},
	{
		path: '/section',
		Component: Section
	},
	{
		path: '/level',
		Component: Level
	},
	{
		path: '/user',
		Component: User
	},
	{
		path: '/search',
		Component: Search
	},
	{
		path: '/report',
		Component: Report
	},
	{
		path: '/dialogs/:id',
		Component: Dialogs
	},
	{
		path: '/questions',
		Component: Questions
	},
	{
		path: '/questionadmin',
		Component: QuestionAdmin
	},
	{
		path: '/main',
		Component: Main
	}
]