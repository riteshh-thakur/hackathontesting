import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom';
import Home from './screens/Home.jsx'
import Appointments from './screens/Appointments.jsx'
import Schedule from './screens/Schedule.jsx'
import Patients from './screens/Patient.jsx'
import Profile from './screens/Profile.jsx'
import Messagebox from './screens/Messagebox.jsx'
import Logout from './screens/Logout.jsx'
 import Message from './screens/Message.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
         {
          path: "/appointments",
          element: <Appointments />,
      }
      ,  { path: "/schedule",
      element: <Schedule />,
         },{
          path: "/patients",
          element: <Patients />,
         }  ,{path: "/profile",
         element: <Profile />,
        },{ path: "/messagebox",
        element: <Messagebox />,},
        {
          path:"/message",
          element:<Message/>
        },
        {path: "/logout",
        element: <Logout />,}
    ],
},
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}/> 
  </StrictMode>,
)

