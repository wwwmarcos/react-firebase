import firebaseBuilder from 'firebase'

import config from '../constants/firebase.config'

const firebase = firebaseBuilder.initializeApp(config)
const firebaseDatabase = firebaseBuilder.database()
const googleProvider = new firebaseBuilder.auth.GoogleAuthProvider()

const sync = ({ node, size }, update) => {
  const query = firebaseDatabase.ref(node)
  query.on('value', update)
}

const push = (node, data) => {
  const ref = firebaseDatabase.ref(node).push()
  const id = firebaseDatabase.ref(node).push().key
  ref.set(data)
  return id
}

const googleAuth = () => firebase.auth().signInWithRedirect(googleProvider)

const signOut = () => firebase.auth().signOut()

const build = (node) => {
  return {
    push: (data) => push(node, data),
    sync: (update) => sync(node, update)
  }
}

const getCurrentUser = () => firebase.auth().currentUser

const isLogged = () => getCurrentUser()

export {
  sync,
  push,
  build,
  googleAuth,
  signOut,
  getCurrentUser,
  isLogged
}

export default firebaseDatabase
