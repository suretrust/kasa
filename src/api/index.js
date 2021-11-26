import Kisi from 'kisi-client'
import { PAGINATION_LIMIT } from '../constants/paginationLimit'

const kisiClient = new Kisi()

const kisiAuthenticate = (callback = null) => {
  const email = process.env.REACT_APP_EMAIL
  const password = process.env.REACT_APP_PASSWORD

  return kisiClient
    .signIn(email, password)
    .then(response => {
      if (!callback) return response

      return callback()
    })
    .catch(({ message }) => ({ error: message }))
}

const addGroupDoor = async (groupId, lockId) => {
  const payload = {
    group_lock: {
      group_id: groupId,
      lock_id: lockId
    }
  }

  return await kisiAuthenticate(() =>
    kisiClient.post('group_locks', { ...payload })
  )
}

const getGroups = async (offset = 0) => {
  const payload = {
    limit: PAGINATION_LIMIT,
    offset: offset
  }

  return await kisiAuthenticate(() => kisiClient.get('groups', { ...payload }))
}

const getGroupDetails = async pathname => {
  return await kisiAuthenticate(() => kisiClient.get(pathname))
}

const getGroupDoors = async (groupId, offset) => {
  const payload = {
    limit: PAGINATION_LIMIT,
    group_id: groupId
  }
  if (offset) payload.offset = offset
  return await kisiAuthenticate(() =>
    kisiClient.get('group_locks', { ...payload })
  )
}

const deleteGroupDoor = async lockObjectId => {
  return await kisiAuthenticate(() =>
    kisiClient.delete(`group_locks/${lockObjectId}`)
  )
}

const getPlaceDoors = async placeId => {
  return await kisiAuthenticate(() =>
    kisiClient.get(`locks`, { place_id: placeId })
  )
}

const API = {
  addGroupDoor,
  deleteGroupDoor,
  getGroups,
  getGroupDetails,
  getGroupDoors,
  getPlaceDoors
}

export default API
