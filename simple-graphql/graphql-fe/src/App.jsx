import { useEffect, useState } from 'react'
import './App.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

function App() {
  const [employees, setEmployees] = useState([])
  useEffect(()=>{
    const client = new ApolloClient({
      uri: 'http://localhost:8080/graphql',
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query {
            allEmployees {
              id
              firstName
              lastName
              joinDate
            }
          }
        `,
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
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{employee.id}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{employee.firstName}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{employee.lastName}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{employee.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  )
}

export default App
