import { makeAutoObservable } from 'mobx'

export default class AdminStore {
	_isModal = true
	_isEditing = ''
	_isDeleting = ''
	_isCreating=false
	constructor() {
		makeAutoObservable(this)
	}

	setIsModal(isModal){
		this._isModal = isModal
	}

	get isModal() {
		return this._isModal
	}

	setIsEditing(isEditing){
		this._isEditing = isEditing
	}

	get isEditing() {
		return this._isEditing
	}

	setIsDeleting(isDeleting){
		this._isDeleting = isDeleting
	}

	get isDeleting() {
		return this._isDeleting
	}

	setIsCreating(isCreating){
		this._isCreating = isCreating
	}

	get isCreating() {
		return this._isCreating
	}
}