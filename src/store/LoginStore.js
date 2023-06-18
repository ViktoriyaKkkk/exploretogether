import { makeAutoObservable } from 'mobx'
import io from 'socket.io-client'

export default class LoginStore {
	_isLogin = false
	_isAuth = false
	_user = {}
	_isReading = {}
	_isProfile = false
	_editProfile = false
	_city = ''
	_socket = io.connect('https://exploretogetherserver.onrender.com')
	_chat = []
	_notifications = []
	_isLoading = true
	constructor() {
		makeAutoObservable(this)
	}

	setUser(user){
		this._user = user
	}
	get user() {
		return this._user
	}

	setIsAuth(isAuth){
		this._isAuth = isAuth
	}
	get isAuth() {
		return this._isAuth
	}

	setIsLogin(isLogin){
		this._isLogin = isLogin
	}
	get isLogin() {
		return this._isLogin
	}

	get isReading() {
		return this._isReading
	}
	setIsReading(isReading){
		this._isReading = isReading
	}

	setIsProfile(isProfile){
		this._isProfile = isProfile
	}
	get isProfile() {
		return this._isProfile
	}

	setEditProfile(editProfile){
		this._editProfile = editProfile
	}
	get editProfile() {
		return this._editProfile
	}

	setCity(city){
		this._city = city
	}
	get city() {
		return this._city
	}

	get socket() {
		return this._socket
	}

	setChat(chat){
		this._chat = chat
	}
	get chat() {
		return this._chat
	}

	setNotifications(notifications){
		this._notifications = notifications
	}
	get notifications() {
		return this._notifications
	}

	setIsLoading(isLoading){
		this._isLoading = isLoading
	}
	get isLoading() {
		return this._isLoading
	}
}