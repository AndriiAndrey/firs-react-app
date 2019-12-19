import React, {Component} from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import UsersContainer from './components/Users/UsersContainer';
import Music from './components/Music/Music';
import Setings from './components/Setings/Setings';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import { compose } from 'redux';
import { withRouter, Switch, Redirect } from "react-router";
import {initializeApp} from './redux/app-reducer';
import Preloader from './Common/Preloader/Preloader';
import store from './redux/redux-store'
import {BrowserRouter, Route} from 'react-router-dom';
import { WithSuspense } from './hoc/WithSuspense';
// import DialogsConteiner from './components/Dialogs/DialogsConteiner';
// import ProfileContainer from './components/Profile/ProfileContainer';
const DialogsConteiner = React.lazy(() => import('./components/Dialogs/DialogsConteiner'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends Component {

  // catchAllUnhandledErrors = (promiseRejectionEvent) => {
  //   alert("Some error occured");//thunk nided
  //   console.error(promiseRejectionEvent);
  // }

  componentDidMount() {
    this.props.initializeApp();
  //   window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  // };
  // componentWillUnmount(){
  //   window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }


  render() {
    if (!this.props.initialized){
    return <Preloader/>}

    return (
      <div className='app-wrapper'>
          <HeaderContainer />
          <NavBar />
        <div className='app-wrapper-content'>

        <Switch>

          <Route exact path='/' render={ () => <Redirect to={"/profile"}/> }/>

          <Route path='/profile/:userId?' render={ WithSuspense(ProfileContainer) }/>

          <Route path='/dialogs' render={ WithSuspense(DialogsConteiner) } />

          <Route path='/users' render={ () => <UsersContainer />} />

          <Route path='/music' render={ () => <Music />} />

          <Route path='/setings' render={ () => <Setings />} />

          <Route path='/login' render={ () => <Login />} />

          <Route path='*' render={ () => <div>404 NOT FOUND</div>} />

        </Switch>
        </div>
      
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
connect(mapStateToProps,{initializeApp})) (App);


const MainApp = (props) =>{

  return<BrowserRouter basename={process.env.PUBLIC_URL}>
  <Provider store={store}>
      <AppContainer />
  </Provider>
</BrowserRouter>

}

export default MainApp;
