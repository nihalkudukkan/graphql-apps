import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddEmployee from './components/AddEmployee.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/addemployee",
    element: <AddEmployee />
  }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
