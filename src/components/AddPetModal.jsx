import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../config/api';
import { toast } from 'react-toastify';

const AddPetModal = ({ isOpen, onClose, onSuccess }) => {
  const [petData, setPetData] = useState({
    petName: '',
    breed: '',
    age: '',
    picture: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      const response = await api.post('/api/Pet', 
        {
          petTypeID: '5dc05665-0f06-486e-b0dd-4631e4d7ae8b',
          petName: petData.petName,
          breed: petData.breed,
          age: parseInt(petData.age),
          picture: petData.picture,
          notes: "",
          healthDetails: ""
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.isSuccess) {
        toast.success('Thêm thú cưng thành công!');
        onSuccess();
        onClose();
        setPetData({
          petName: '',
          breed: '',
          age: '',
          picture: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra khi thêm thú cưng!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Thêm Thú Cưng Mới</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên thú cưng</label>
            <input
              type="text"
              value={petData.petName}
              onChange={(e) => setPetData({...petData, petName: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Giống</label>
            <input
              type="text"
              value={petData.breed}
              onChange={(e) => setPetData({...petData, breed: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tuổi</label>
            <input
              type="number"
              value={petData.age}
              onChange={(e) => setPetData({...petData, age: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link ảnh</label>
            <input
              type="text"
              value={petData.picture}
              onChange={(e) => setPetData({...petData, picture: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600"
          >
            Thêm thú cưng
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal; 