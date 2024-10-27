import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContex'
import { TaskProvider } from './context/TasksContext'
import AccidentForm from './pages/accidents/AccidentForm'
import Accidents from './pages/accidents/Accidents'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import EmployeeForm from './pages/employees/EmployeeForm'
import Employees from './pages/employees/Employees'
import EppForm from './pages/epps/EppForm'
import Epps from './pages/epps/Epps'
import Home from './pages/home/Home'
import IncidentForm from './pages/incidents/IncidentForm'
import Incidents from './pages/incidents/Incidents'
import MeasureForm from './pages/measures/MeasureForm'
import Measures from './pages/measures/Measures'
import RiskForm from './pages/risks/RiskForm'
import Risks from './pages/risks/Risks'
import TaskForm from './pages/tasks/TaskForm'
import Tasks from './pages/tasks/Tasks'
import Example from './pages/example/Example'
import ExampleForm from './pages/example/ExampleForm'

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />
            <Routes>
              {/* rutas publicas */}
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              {/* rutas authenticadas */}
              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<Tasks />} />
                <Route path='/add-task' element={<TaskForm />} />
                <Route path='/tasks/:id' element={<TaskForm />} />
                
                <Route path='/example' element={<Example />} />
                <Route path='/add-example' element={<ExampleForm />} />
                <Route path='/example/:id' element={<ExampleForm />} />

                <Route path='/empleados' element={<Employees />} />
                <Route path='/guardar-empleado' element={<EmployeeForm />} />
                <Route path='/empleados/:id' element={<EmployeeForm />} />

                <Route path='/accidentes' element={<Accidents />} />
                <Route path='/guardar-accidente' element={<AccidentForm />} />
                <Route path='/accidentes/:id' element={<AccidentForm />} />

                <Route path='/incidentes' element={<Incidents />} />
                <Route path='/guardar-incidente' element={<IncidentForm />} />
                <Route path='/incidentes/:id' element={<IncidentForm />} />

                <Route path='/riesgos' element={<Risks />} />
                <Route path='/guardar-riesgo' element={<RiskForm />} />
                <Route path='/riesgos/:id' element={<RiskForm />} />

                <Route path='/medidas' element={<Measures />} />
                <Route path='/guardar-medida' element={<MeasureForm />} />
                <Route path='/medidas/:id' element={<MeasureForm />} />

                <Route path='/epps' element={<Epps />} />
                <Route path='/guardar-epp' element={<EppForm />} />
                <Route path='/epps/:id' element={<EppForm />} />

              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App