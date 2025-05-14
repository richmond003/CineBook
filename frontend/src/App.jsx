import {Route, Routes } from 'react-router-dom'
import Movies from './pages/movies'
import Home from './pages/home'
import TvShows from './pages/tvshows'
import NavBar from './components/navbar'
import Show from './pages/show_info'
import SignUp from './pages/signup'
import Login from './pages/login'
import ProtectedRoute from './components/protectedroute'
import MyList from './pages/mylist'


function App() {
  return (
    <>
      <div className='relative h-screen overflow-y-scroll scrollbar-hide'>
        
          {/* <div> */}
            <Routes>
              <Route path='/' element={
                <ProtectedRoute>
                  <><NavBar style={"absolute top-0 z-40 w-full"}/><Home/></>
                </ProtectedRoute>
              }/>

              <Route path='/movies' element={
                <ProtectedRoute>
                  <><NavBar/><Movies/></>
                </ProtectedRoute>
              }/>

              <Route path='/tv_shows' element={
                <ProtectedRoute>
                  <><NavBar/><TvShows/></>
                </ProtectedRoute>
              }/>

              <Route path='/info/:id' element={
                <ProtectedRoute>
                 <><Show key={window.location.pathname}/></>
                </ProtectedRoute>
              }/>
              
              <Route path='list' element={
                <ProtectedRoute>
                  <><NavBar style={"absolute top-0 z-40 w-full"}/><MyList/></>
                </ProtectedRoute>
              }/>

              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
          {/* </div> */}
      </div>
    </>
  )
}

export default App
