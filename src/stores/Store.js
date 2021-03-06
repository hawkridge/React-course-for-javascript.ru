import { EventEmitter } from 'events'
import AppDispatcher from '../Dispatcher'
import Model from './Model'
const STORE_CHANGE_EVENT = 'STORE_CHANGE_EVENT'

class Store extends EventEmitter {
    constructor(stores, initalState) {
        super()
        this.stores = stores
        this.__incrementalID = 999
        this.items = []
        if (initalState) initalState.forEach(this.add.bind(this))
    }

    getIncrementalId() {
        return this.__incrementalID++
    }

    addListener(callback) {
        this.on(STORE_CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(STORE_CHANGE_EVENT, callback)
    }

    emitChange() {
        this.emit(STORE_CHANGE_EVENT)
    }

    getAll() {
        return this.items.slice()
    }

    getById(id) {
        return this.items.filter((item) => item.id == id)[0]
    }

    delete(id) {
        this.items = this.items.filter((item) => item.id != id)
    }

    add(item) {
        const old = this.getById(item.id) || {}
        const el = new Model({...old, ...item}, this)
        this.delete(item.id)
        this.items.push(el)
        return el
    }
}

export default Store