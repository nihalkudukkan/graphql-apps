import { useEffect, useState } from 'react'
import './App.css'
import { gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { client } from './GraphQl/SpringClient';

function App() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([])
  useEffect(()=>{

    client
      .query({
        query: gql(`
          query {
            allEmployees {
              id
              firstName
              lastName
              joinDate
            }
          }
        `),
      })
      .then((result) => setEmployees(result.data.allEmployees))
      .catch((error) => console.error(error));
  },[])
  return (
    <>
      <div className='container mx-auto p-4'>
        <h2 className="text-xl font-semibold mb-4 text-center">Employees</h2>
        <Link to={"/addemployee"} className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-4 transition-colors duration-200 inline-block'>
          Add employee
        </Link>
        <div className='h-[40vh] overflow-y-auto'>
        <table className="min-w-full divide-y divide-gray-200 relative">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            </tr>
          </thead>
        
        {employees.map((employee) => (
            <tbody key={employee.id} className="bg-white divide-y divide-gray-200 cursor-pointer hover:bg-amber-50" onClick={() => navigate(`/employee/${employee.id}`)}>
              <tr >
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 tracking-wider">{employee.id}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 tracking-wider">{employee.firstName}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 tracking-wider">{employee.lastName}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 tracking-wider">{employee.joinDate}</td>
              </tr>
            </tbody>
        ))}
        </table>
        </div>
      </div>
    </>
  )
}

export default App
