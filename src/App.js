import React, { Component } from 'react'
import './App.css'
import { build, googleAuth, signOut, getCurrentUser } from './services/firebase'

import { MuiThemeProvider } from '@material-ui/core/styles/index'
import { AppBar, Toolbar, Typography, IconButton, Menu as MenuIcon, Button } from '@material-ui/core'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'

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

const firebase = build('teste')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: 'batata'
    }
  }

  componentDidMount () {
    firebase.sync((data) => {
      this.setState({
        data
      })
    })
  }

  async login () {
    try {
      const result = await googleAuth()
      console.log('result', result)
    } catch (error) {
      console.log('error', error)
    }
  }

  async logOut () {
    try {
      await signOut()
    } catch (error) {
      console.log('error', error)
    }
  }

  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar position='static'>
            <Toolbar>
              <IconButton className={classes.menuButton} color='contrast' onClick={this.props.toggleDrawer}><MenuIcon /></IconButton>
              <Typography className={classes.flex} type='title' color='inherit'>
                My fnk app
              </Typography>
              <div>
                <Button color onClick={() => this.login()} className={classes.button}>
                  LOGIN
                </Button>
                <Button onClick={() => this.logOut()} className={classes.button}>
                  LOG OUT
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <div className='App'>

            <p className='App-intro'>
              {
                JSON.stringify(getCurrentUser(), null, 2)
              }
            </p>
            <Button variant='contained' color='primary' onClick={() => firebase.push({ sera: 'im ' })}>PUSHHHHHH DATAAAAA</Button>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
