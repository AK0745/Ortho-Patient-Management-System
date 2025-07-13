import React, { useState, useEffect } from 'react';
import { Patient, DiagnosisCategory, DIAGNOSIS_SUBCATEGORIES, UploadedFile } from '../types/Patient';
import { Save, X } from 'lucide-react';
import FileUpload from './FileUpload';

interface PatientFormProps {
  patient?: Patient;
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Patient>>({
    name: '',
    age: 0,
    sex: 'Male',
    occupation: '',
    address: '',
    contactNumber: '',
    dateOfVisit: new Date().toISOString().split('T')[0],
    medicalHistory: '',
    familyHistory: '',
    currentTreatment: '',
    dateOfInjury: '',
    mechanismOfInjury: '',
    historyOfPresentIllness: '',
    pastHistory: '',
    bloodReports: '',
    xrayPreop: '',
    ctScan: '',
    mri: '',
    diagnosisCategory: 'Trauma',
    diagnosisSubcategory: '',
    diagnosisNotes: '',
    uploadedFiles: [],
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactNumber || !formData.diagnosisSubcategory) {
      alert('Please fill in all required fields');
      return;
    }
    
    const patientData: Patient = {
      id: patient?.id || Date.now().toString(),
      ...formData,
    } as Patient;
    
    onSave(patientData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (category: DiagnosisCategory) => {
    setFormData(prev => ({ 
      ...prev, 
      diagnosisCategory: category,
      diagnosisSubcategory: '' 
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {patient ? 'Edit Patient' : 'Add New Patient'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sex *</label>
            <select
              value={formData.sex}
              onChange={(e) => handleChange('sex', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => handleChange('occupation', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Visit *</label>
            <input
              type="date"
              value={formData.dateOfVisit}
              onChange={(e) => handleChange('dateOfVisit', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Diagnosis Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Diagnosis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={formData.diagnosisCategory}
                onChange={(e) => handleCategoryChange(e.target.value as DiagnosisCategory)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Trauma">Trauma</option>
                <option value="Plasty">Plasty</option>
                <option value="Scopy">Scopy</option>
                <option value="Spine">Spine</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory *</label>
              <select
                value={formData.diagnosisSubcategory}
                onChange={(e) => handleChange('diagnosisSubcategory', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select subcategory</option>
                {DIAGNOSIS_SUBCATEGORIES[formData.diagnosisCategory || 'Trauma'].map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Injury</label>
              <input
                type="date"
                value={formData.dateOfInjury}
                onChange={(e) => handleChange('dateOfInjury', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mechanism of Injury</label>
              <input
                type="text"
                value={formData.mechanismOfInjury}
                onChange={(e) => handleChange('mechanismOfInjury', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
              <textarea
                value={formData.medicalHistory}
                onChange={(e) => handleChange('medicalHistory', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Family History</label>
              <textarea
                value={formData.familyHistory}
                onChange={(e) => handleChange('familyHistory', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">History of Present Illness</label>
            <textarea
              value={formData.historyOfPresentIllness}
              onChange={(e) => handleChange('historyOfPresentIllness', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Past History</label>
            <textarea
              value={formData.pastHistory}
              onChange={(e) => handleChange('pastHistory', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>

        {/* Investigation Reports */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Investigation Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Reports</label>
              <textarea
                value={formData.bloodReports}
                onChange={(e) => handleChange('bloodReports', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">X-Ray Preop</label>
              <textarea
                value={formData.xrayPreop}
                onChange={(e) => handleChange('xrayPreop', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CT Scan</label>
              <textarea
                value={formData.ctScan}
                onChange={(e) => handleChange('ctScan', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">MRI</label>
              <textarea
                value={formData.mri}
                onChange={(e) => handleChange('mri', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Treatment */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Treatment</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Treatment Details</label>
            <textarea
              value={formData.currentTreatment}
              onChange={(e) => handleChange('currentTreatment', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
          </div>
        </div>

        {/* File Upload Section */}
        <div className="border-t pt-6">
          <FileUpload
            files={formData.uploadedFiles || []}
            onFilesChange={(files: UploadedFile[]) => handleChange('uploadedFiles', files)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;