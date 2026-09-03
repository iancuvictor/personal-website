import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import { Navbar } from './components/index.js'
import { useContext } from 'react'
import { GlobalStatesContext } from './contexts/GlobalStatesContext.js'
import { ProjectsPage, AboutPage, AdminPage } from './components/index.js'
import { AdminStateContext } from './contexts/AdminStateContext.js'
import { Toaster } from 'sonner';

function App() {
  const { darkMode } = useContext(GlobalStatesContext)
  const { admin } = useContext(AdminStateContext);

  // function AdminRoute({ children }) {
  //   const { admin } = useContext(AdminStateContext)
  //   // if(loading) return null;
  //   return admin ? children : <Navigate to="/" />
  // }

  return <BrowserRouter>
    <Toaster />
    <div className={`${darkMode ? 'bg-black' : 'bg-white'}`}>
      <Navbar />
      {/* to fix! a band at the bottom of the page with no explication */}
      <div className='relative min-h-[calc(100vh-8rem)]'>
        <Routes>
          <Route path='/' Component={ProjectsPage} />
          <Route path='/about' Component={AboutPage} />
          <Route path='/admin' Component={AdminPage} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
}

export default App;
