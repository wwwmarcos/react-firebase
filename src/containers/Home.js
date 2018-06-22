import React from 'react'
import { firebase } from '../services'
import { Button } from '@material-ui/core'

const Home = () => (
  <div className='App'>

    <p className='App-intro'>
      {
        JSON.stringify(firebase.getCurrentUser(), null, 2)
      }
    </p>
    <Button variant='contained' color='primary' onClick={() => firebase.push({ sera: 'im ' })}>PUSHHHHHH DATAAAAA</Button>
  </div>
)

export default Home
