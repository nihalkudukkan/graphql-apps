import { gql } from '@apollo/client';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { client } from '../GraphQl/SpringClient';

const CREATE_USER = gql`
  mutation createEmployee($firstName: String!, $lastName: String!, $job: String!, $joinDate: String!) {
    createEmployee(input: {firstName: $firstName, lastName: $lastName, job: $job, joinDate: $joinDate}) {
      id
    }
  }
`;

export default function AddEmployee() {
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const [form, setForm] = React.useState({
        firstName: '',
        lastName: '',
        job: '',
        joinDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', form);

        try {
            const result = await client.mutate({
                mutation: CREATE_USER,
                variables: {firstName: form.firstName, lastName: form.lastName, job: form.job, joinDate: form.joinDate},
            });
            console.log('Employee added:', result.data.createEmployee);
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
        }
    }
return (
    <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
                First Name:
            </label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.firstName}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                Last Name:
            </label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.lastName}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="job" className="block text-gray-700 font-semibold mb-2">
                Job:
            </label>
            <input
                type="text"
                id="job"
                name="job"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.job}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="joinDate" className="block text-gray-700 font-semibold mb-2">
                Join Date:
            </label>
            <input
                type="date"
                max={today}
                id="joinDate"
                name="joinDate"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.joinDate}
                onChange={handleChange}
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
            Add Employee
        </button>
    </form>
)
}
