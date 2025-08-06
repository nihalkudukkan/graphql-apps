import React, { useState } from 'react'
import { client } from '../GraphQl/SpringClient';
import { gql } from '@apollo/client';

export default function AddCar({id}) {
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Car being submitted:', car);
        client.mutate({
            mutation: gql(`
                mutation createCar($brand: String!, $model: String!, $color: String!, $employeeId: Int!) {
                    createCar(input: {brand: $brand, model: $model, color: $color, employeeId: $employeeId}) {
                        id
                        brand
                        model
                        color
                    }
                }
            `),
            variables: {
                brand: car.brand,
                model: car.model,
                color: car.color,
                employeeId: parseInt(id) // Assuming `id` is available in the scope
            },
        })
        .then(result => {
            console.log('Car added:', result.data.createCar);
            window.location.href = `/employee/${id}`; // Redirect to the employee page after adding the car
        })
        .catch(error => {   
            console.error('Error adding car:', error);
        })
    }
return (
    <div className="container mx-auto p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand:</label>
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required
                    value={car.brand}
                    onChange={(e)=>handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model:</label>
                <input
                    type="text"
                    id="model"
                    name="model"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required
                    value={car.model}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Color:</label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required
                    value={car.color}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add Car
                </button>
            </div>
        </form>
    </div>
)
}
