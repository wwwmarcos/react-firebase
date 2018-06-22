import React, { Component } from 'react'
import './App.css'

import { firebase } from './services'
import { MuiThemeProvider } from '@material-ui/core/styles/index'
import { AppBar, Toolbar, Typography, IconButton, Menu as MenuIcon, Button } from '@material-ui/core'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'

import { PrivateRoute } from './components'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import themeConfig from './constants/theme.config'

const theme = createMuiTheme(themeConfig)

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

const firebaseData = firebase.build('teste')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: 'batata'
    }
  }

  componentDidMount () {
    firebaseData.sync((data) => {
      this.setState({
        data
      })
    })
  }

  async login () {
    try {
      const result = await firebase.googleAuth()
      console.log('result', result)
    } catch (error) {
      console.log('error', error)
    }
  }

  async logOut () {
    try {
      await firebase.signOut()
    } catch (error) {
      console.log('error', error)
    }
  }

  render () {
    const { classes } = this.props
    return (
      <Router>

        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <AppBar position='static'>
              <Toolbar>
                <IconButton className={classes.menuButton} color='contrast' onClick={this.props.toggleDrawer}><MenuIcon /></IconButton>
                <Typography className={classes.flex} type='title' color='inherit'>
                My fnk app
                </Typography>
                <div>
                  <Button onClick={() => this.logOut()} className={classes.button}>
                    SAIR
                  </Button>
                </div>
              </Toolbar>
            </AppBar>

            <Route path='/login' component={() => JSON.stringify(firebase.isAuthenticated(), null, 2)} />
            <PrivateRoute path='/' component={() => 'home'} />

          </React.Fragment>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default withStyles(styles)(App)
