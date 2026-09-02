import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Navbar } from './components/index.js'
import { useContext } from 'react'
import { GlobalStatesContext } from './contexts/GlobalStatesContext.js'
import { ProjectsPage, AboutPage } from './components/index.js'

function App() {
  const { darkMode } = useContext(GlobalStatesContext)

  return <BrowserRouter>
    <div className={`${darkMode ? 'bg-black' : 'bg-white'} min-h-screen`}>
      <Navbar />
      <Routes>
      <Route path='/' Component={ProjectsPage}/>
      <Route path='/about' Component={AboutPage}/>
      </Routes>
    </div>
  </BrowserRouter>
}

export default App
