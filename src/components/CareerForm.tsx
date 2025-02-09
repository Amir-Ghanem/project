import React, { useState } from 'react';
import { Button } from '@mui/material';
import { careerApi } from '../lib/api/career';
import { PlusCircle } from 'lucide-react';

const CareerForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    currentPosition: '',
    resume: null as File | null,
    portfolio: null as File | null,
    additionalLinks: [] as string[],
  });

  const [newLink, setNewLink] = useState(''); // Temporary state for adding a new link
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success popup state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      const file = files[0]; // Safely access the file
      setFormData({ ...formData, [name]: file });
    }
  };

  const handleAddLink = () => {
    if (newLink.trim()) {
      setFormData({
        ...formData,
        additionalLinks: [...formData.additionalLinks, newLink.trim()], // Add the new link to the list
      });
      setNewLink(''); // Clear the input field
    }
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = formData.additionalLinks.filter((_, i) => i !== index); // Remove the link at the specified index
    setFormData({ ...formData, additionalLinks: updatedLinks });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true); // Show loading state

    const formDataToSend = new FormData();

    formDataToSend.append('Fullname', formData.fullName);
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('PhoneNumber', formData.phoneNumber);
    formDataToSend.append('Position', formData.currentPosition);

    // Handle files
    if (formData.resume) {
      formDataToSend.append('CV', formData.resume);
    }
    if (formData.portfolio) {
      formDataToSend.append('Portfolio', formData.portfolio);
    }

    // Append each link separately
    formData.additionalLinks.forEach((link, index) => {
      formDataToSend.append(`Links[${index}]`, link);
    });

    try {
      // Submit the FormData instance
      await careerApi.submitApplication(formDataToSend);

      // Show success popup
      setShowSuccessPopup(true);

      // Reset the form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        currentPosition: '',
        resume: null,
        portfolio: null,
        additionalLinks: [],
      });
      setNewLink('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-teal-600 text-center mb-6">Apply Now! And Be One Of Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-600 text-sm mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Current Position</label>
            <input
              type="text"
              name="currentPosition"
              value={formData.currentPosition}
              onChange={handleChange}
              placeholder="Your Current Position"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Resume/CV</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Portfolio</label>
          <input
            type="file"
            name="portfolio"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Additional Links</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Enter a link"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <Button
              type="button"
              onClick={handleAddLink}
              className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-semibold"
            >
              <PlusCircle className="w-8 h-8" />
            </Button>
          </div>
          <div className="mt-2">
            {formData.additionalLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mt-2">
                <span className="text-sm text-gray-700">{link}</span>
                <Button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-1/2 bg-teal-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? (
              <div className="flex items-center">
                <span className="mr-2">Submitting...</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Success!</h3>
            <p className="text-gray-600 mb-6">Your application has been submitted successfully.</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-teal-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerForm;