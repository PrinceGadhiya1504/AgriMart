import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    password: "",
    role: "",
  });
const [error, setError] = useState('');
const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', form);

      if (response.status === 201) {
        const data = response.data;
        console.log(data); // Handle the response data
        // Redirect or update UI as needed
        navigate('/')
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        console.error('Error:', error);
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <div className="w-full max-w-sm p-6 space-y-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center text-gray-800">Register</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-2 py-1 mt-1 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            required
            className="w-full px-2 py-1 mt-1 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            required
            className="w-full px-2 py-1 mt-1 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-2 py-1 mt-1 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-2 py-1 mt-1 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            required
            className="w-full px-2 py-1 mt-1 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="merchant">Merchant</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-600">
        Already have an account? <Link to="/" className="text-green-600 hover:text-green-500">Login</Link>
      </p>
    </div>
  </div>
  );
};

export default Register;
