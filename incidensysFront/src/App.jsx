import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContex'
import { TaskProvider } from './context/TasksContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import TaskFormPage from './pages/TaskFormPage'
import TasksPage from './pages/TasksPage'
import Accidents from './pages/accidents/Accidents'
import Employees from './pages/employees/Employees'
import Epps from './pages/epps/Epps'
import Incidents from './pages/incidents/Incidents'
import Measures from './pages/measures/Measures'
import Risks from './pages/risks/Risks'

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />
            <Routes>
              {/* rutas publicas */}
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              {/* rutas authenticadas */}
              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/tasks/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />

                <Route path='/empleados' element={<Employees />} />
                <Route path='/accidentes' element={<Accidents />} />
                <Route path='/incidentes' element={<Incidents />} />
                <Route path='/riesgos' element={<Risks />} />
                <Route path='/medidas' element={<Measures />} />
                <Route path='/epps' element={<Epps />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App