import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { client } from '../GraphQl/SpringClient';
import { gql } from '@apollo/client';
import AddCar from './AddCar';

export default function Employee() {
    const {id} = useParams();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [employee, setEmployee] = React.useState(null);
    const [action, setAction] = React.useState(false);
    useEffect(() => {
        // Fetch employee details using the id
        console.log(`Fetching details for employee with ID: ${id}`);
        // You can use the client to query the employee details here
        client.query({
            query: gql`
                query getEmployee($id: ID!) {
                    employeeById(id: $id) {
                        id
                        firstName
                        lastName
                        joinDate
                        cars {
                            id
                            brand
                            model
                            color
                        }
                    }
                }
            `,
            variables: { id }
        })
        .then(result => {
            console.log('Employee details:', result.data.employeeById);
            // Set the employee details in state if needed
            setEmployee(result.data.employeeById);
        }).catch(error => {
            console.error('Error fetching employee details:', error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
  return (
    <div className='container mx-auto p-4'>
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            <h2 className="text-xl font-semibold mb-4 text-center">Employee</h2>
            <div>
                <p><strong>ID:</strong> {id}</p>
                <p><strong>First Name:</strong> {employee.firstName}</p>
                <p><strong>Last Name:</strong> {employee.lastName}</p>
                <p><strong>Join Date:</strong> {employee.joinDate}</p>
            </div>
            <button className='bg-blue-500 py-2 px-3 rounded-2xl mt-2 cursor-pointer' onClick={()=>setAction(prev=>!prev)}>Add car</button>
            {action && (<AddCar id={id} src="/addcar" className='border-2'></AddCar>)}
            { employee.cars.length>0 ?
            <table className='min-w-full divide-y divide-gray-200 mt-4'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Brand</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Model</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Color</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {employee.cars.map(car => (
                    <tr key={car.id}>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 tracking-wider">{car.id}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 tracking-wider">{car.brand}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 tracking-wider">{car.model}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 tracking-wider">{car.color}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            :<p className='mt-2'>No cars available for this employee</p>}
        </div>
    </div>
  )
}
