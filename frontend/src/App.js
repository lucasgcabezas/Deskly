import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import MyDesk from './pages/MyDesk'
import Sign from './pages/Sign'
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/mydesk" component={MyDesk} />
          <Route path="/sign" component={Sign} />
          <Redirect to="/" />
        </Switch>
      <Footer />
      </BrowserRouter>
    </>
  )

}

export default App
