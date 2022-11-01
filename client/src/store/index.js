import { combineReducers } from 'redux'
import user from './user'
import userInfo from './userInfo'
import management from './management'
import material from './material'
import managerService from './manager_service'


export default combineReducers({
  user,
  userInfo,
  management,
  material,
  managerService,
})