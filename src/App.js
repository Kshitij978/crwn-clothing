import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Homepage from './pages/Homepage/Homepage'
import ShopPage from './pages/Shop/Shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/Header';
import { auth, createUserProfileDocument} from './Firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     if(userAuth) {
       const userRef = await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }/*, () => {console.log(this.state);}*/);
       });
     }
        setCurrentUser(userAuth);
    });
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <Header />
       <Switch>
         <Route path='/crwn-clothing' component={Homepage}></Route>
         <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>

         <Route exact path='/signin' render={() => 
            this.props.currentUser? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )}>

          </Route>
       </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
 
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


