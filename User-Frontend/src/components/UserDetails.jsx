import React, { useState } from 'react';
import '../styles/UserDetails.css'

export default function UserDetails({ onSubmit, userDetails, setUserDetails }) {
  const [errors, setErrors] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a temporary error object
    const newErrors = {};

    if (!userDetails.name) newErrors.name = 'Name is required';
    if (!userDetails.persons) newErrors.persons = 'No. of persons is required';
    if (!userDetails.address) newErrors.address = 'Address is required';
    if (!userDetails.contact) newErrors.contact = 'Contact number is required';

    // If any errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and proceed
    setErrors({});
    onSubmit();
  };

  return (
    <div className="form formOverlay">
      <div className="inputContainer">
        <p className='formTitle'>Enter Your Details</p>

        <div className="inputFieldsContainer">
          {/* Name */}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          />
          {errors.name && <p className='errorText'>{errors.name}</p>}

          {/* Persons */}
          <label htmlFor="noOfPersons">No of Persons</label>
          <input
            type="text"
            id="noOfPersons"
            placeholder="2, 4, 6"
            value={userDetails.persons}
            onChange={(e) => setUserDetails({ ...userDetails, persons: e.target.value })}
          />
          {errors.persons && <p className='errorText'>{errors.persons}</p>}

          {/* Address */}
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={userDetails.address}
            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
          />
          {errors.address && <p className='errorText'>{errors.address}</p>}

          {/* Contact */}
          <label htmlFor="contact">Contact</label>
          <input
            type="number"
            id="contact"
            placeholder="Phone"
            value={userDetails.contact}
            onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })}
          />
          {errors.contact && <p className='errorText'>{errors.contact}</p>}

          <button
            type="button"
            onClick={handleFormSubmit}
            className='submitBtn'
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
