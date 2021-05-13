import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import MyDesk from './pages/MyDesk'
import Sign from './pages/Sign'
import Board from './components/Board'
import { connect } from 'react-redux'
import authActions from "./redux/actions/authActions"
const App = (props) => {
 console.log(props.userLogged);
  if(props.userLogged){
    // aca van links de logueados
  }
    else if(localStorage.getItem('token')){
    props.reLoad(localStorage.getItem('token'))      
    return null
    }else {
      // aca van links de deslogueados
    }

  return (
    <>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/mydesk" component={MyDesk} />
          <Route path="/board/:id" component={Board}/>
          <Route path="/sign" component={Sign} />
          <Redirect to="/" />
        </Switch>
      <Footer />
      </BrowserRouter>
    </>
  )

}


const mapStateToProps= state =>{
  return{ 
      userLogged: state.authReducer.userLogged,
    }
}
const mapDispatchToProps= {
  reLoad: authActions.signInLocalStorage
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
