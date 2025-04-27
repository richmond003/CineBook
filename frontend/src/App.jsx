import {Route, Routes } from 'react-router-dom'
import Movies from './pages/movies'
import Home from './pages/home'
import TvShows from './pages/tvshows'
import NavBar from './components/navbar'
import Show from './pages/show_info'


function App() {
  return (
    <>
      <div className='relative h-screen overflow-y-scroll scrollbar-hide'>
        
          {/* <div> */}
            <Routes>
              <Route path='/' element={<><NavBar style={"absolute top-0 z-40 w-full"}/><Home/></>}/>
              <Route path='/movies' element={<><NavBar/><Movies/></>}/>
              <Route path='/tv_shows' element={<><NavBar/><TvShows/></>}/>
              <Route path='/info/:id' element={<><Show/></>}/>
            </Routes>
          {/* </div> */}
      </div>
    </>
  )
}

export default App
