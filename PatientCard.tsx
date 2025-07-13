import React from 'react';
import { Link } from 'react-router-dom';
import { Patient } from '../types/Patient';
import { Edit, Calendar, User, Phone, Briefcase, ArrowRight, FileText, Activity } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onView: (patient: Patient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit, onView }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-105 group overflow-hidden">
      {/* Medical Pattern Background */}
      <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <Activity className="w-12 h-12 text-blue-600" />
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors">{patient.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1 text-blue-500" />
              <span>{patient.age} years, {patient.sex}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1 text-emerald-500" />
              <span>{patient.contactNumber}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onEdit(patient)}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-md"
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Briefcase className="w-4 h-4 mr-2 text-purple-500" />
          <span>{patient.occupation}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-orange-500" />
          <span>Visit: {new Date(patient.dateOfVisit).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">Diagnosis</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            patient.diagnosisCategory === 'Trauma' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800' :
            patient.diagnosisCategory === 'Plasty' ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800' :
            patient.diagnosisCategory === 'Scopy' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800' :
            'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800'
          }`}>
            {patient.diagnosisCategory}
          </span>
        </div>
        <div className="relative">
          <p className="text-sm text-gray-700 font-medium bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 rounded-lg border border-gray-200">
            {patient.diagnosisSubcategory}
          </p>
          {patient.uploadedFiles && patient.uploadedFiles.length > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{patient.uploadedFiles.length}</span>
            </div>
          )}
        </div>
      </div>
      
      <button
        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Link to={`/patients/${patient.id}`} className="flex items-center justify-center space-x-2 w-full">
          <span>View Full Profile</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </button>
    </div>
  );
};

export default PatientCard;