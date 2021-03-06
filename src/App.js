import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {setCurrentUser} from './redux/user/user.actions';


import Header from './components/Header/header.component';
import {Business, Entertainment, General, Health, Science, Sport, Technology} from './pages/all-pages/all-pages.component';
import SignInAndSignUpPage from './pages/signin-and-signup-page/signin-and-signup.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import './App.css';
import Hompage from './pages/homepage/homepage.component';


class App extends Component {
  // state = { 
  //     currentUser: null
  //   }

  unSubscribeFromAuth = null; //to close subcriptions when the component unmounts, because we don't want any memory leaks in our javascript application

  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
      
        userRef.onSnapshot(snapshot => 
          {setCurrentUser({ 
              id: snapshot.id,
              ...snapshot.data()
          })
        console.log(snapshot.data())}
        )
      }else{setCurrentUser(userAuth)}
    })
  }

  componentWillUnmount() { //this closes the subscription
    this.unSubscribeFromAuth()
  }

  render() { 
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={Hompage}></Route> 
          <Route exact path='/business' component={Business}></Route>
          <Route exact path='/entertainment' component={Entertainment}></Route>
          <Route exact path='/general' component={General}></Route>
          <Route exact path='/health' component={Health}></Route>
          <Route exact path='/science' component={Science}></Route>
          <Route exact path='/sport' component={Sport}></Route>
          <Route exact path='/technology' component={Technology}></Route>
          <Route exact path='/signin' component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
      );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

