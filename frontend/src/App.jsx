import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

const getCSRFToken = ()=>{
  let csrfToken

  // the browser's cookies for this page are all in one string, separated by semi-colons
  const cookies = document.cookie.split(';')
  for ( let cookie of cookies ) {
      // individual cookies have their key and value separated by an equal sign
      const crumbs = cookie.split('=')
      if ( crumbs[0].trim() === 'csrftoken') {
          csrfToken = crumbs[1]
      }
  }
  return csrfToken
}
console.log('token? ', getCSRFToken())
axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)

  const submitSignupForm = function(event){
    // this isn't actually necessary, since this isn't in a form. but if it WAS a form, we'd need to prevent default.
    event.preventDefault()
    axios.post('/signup', {email: 'jeff@amazon.com', password:'dragons'}).then((response)=>{
      console.log('response from server: ', response)
    })
  }

  const submitLoginForm = function(event){
    // this isn't actually necessary, since this isn't in a form. but if it WAS a form, we'd need to prevent default.
    event.preventDefault()
    axios.post('/login', {email: 'jeff@amazon.com', password:'dragons'}).then((response)=>{
      console.log('response from server: ', response)
      window.location.reload()
    })
  }
  
  const logOut = function(event){
    // this isn't actually necessary, since this isn't in a form. but if it WAS a form, we'd need to prevent default.
    event.preventDefault()
    axios.post('/logout').then((response)=>{
      console.log('response from server: ', response)
      whoAmI()
    })
  }

  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    // const user = response.data[0].fields
    console.log('user from whoami? ', user, response)
    setUser(user)
  }

  useEffect(()=>{
    whoAmI()
  }, [])
  
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome to our Restaurant!!</h1>
      { user && <p>Welcome, {user.email}</p>}
      <button onClick={submitSignupForm}>Sign up</button>
      <button onClick={submitLoginForm}>Log in</button>
      <button onClick={logOut}>Log out</button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
