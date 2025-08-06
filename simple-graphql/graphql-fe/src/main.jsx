import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddEmployee from './components/AddEmployee.jsx';
import Employee from './components/Employee.jsx';
import AddCar from './components/AddCar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/addemployee",
    element: <AddEmployee />
  },
  {
    path: "/employee/:id",
    element: <Employee />
  },
  // {
  //   path: "/addcar",
  //   element: <AddCar />
  // }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
