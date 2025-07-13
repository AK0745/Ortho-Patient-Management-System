import React from 'react';
import { Link } from 'react-router-dom';
import { Patient } from '../types/Patient';
import { ArrowLeft, User, Calendar, Phone, FileText } from 'lucide-react';
import PatientCard from './PatientCard';

interface SubcategoryPatientsProps {
  category: string;
  subcategory: string;
  patients: Patient[];
  onEditPatient: (patient: Patient) => void;
  onViewPatient: (patient: Patient) => void;
}

const SubcategoryPatients: React.FC<SubcategoryPatientsProps> = ({
  category,
  subcategory,
  patients,
  onEditPatient,
  onViewPatient,
}) => {
  // If subcategory is empty, show all patients in the category
  const filteredPatients = subcategory 
    ? patients.filter(p => p.diagnosisCategory === category && p.diagnosisSubcategory === subcategory)
    : patients.filter(p => p.diagnosisCategory === category);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Trauma': return 'bg-red-100 text-red-800';
      case 'Plasty': return 'bg-green-100 text-green-800';
      case 'Scopy': return 'bg-blue-100 text-blue-800';
      case 'Spine': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 overflow-hidden">
        {/* Medical Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-2 right-4">
            <User className="w-16 h-16 text-blue-600 transform rotate-12" />
          </div>
          <div className="absolute bottom-2 left-4">
            <FileText className="w-12 h-12 text-teal-600 transform -rotate-12" />
          </div>
        </div>
        
        <Link
          to="/diagnosis"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-all duration-300 hover:bg-blue-50 px-3 py-2 rounded-lg mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Diagnosis Categories</span>
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}>
                {category}
              </span>
              {subcategory && (
                <>
                  <span className="text-gray-400">→</span>
                  <h1 className="text-2xl font-bold text-gray-800">{subcategory}</h1>
                </>
              )}
              {!subcategory && (
                <h1 className="text-2xl font-bold text-gray-800">All {category} Cases</h1>
              )}
            </div>
            <p className="text-gray-600">
              {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
              {subcategory ? ` with ${subcategory} diagnosis` : ` in ${category} category`}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-4 py-2 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                {subcategory ? 'Filtered Results' : 'Category Overview'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600 mb-1">Total Patients</p>
                <p className="text-3xl font-bold text-blue-800">{filteredPatients.length}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-600 mb-1">This Month</p>
                <p className="text-3xl font-bold text-emerald-800">
                  {filteredPatients.filter(p => {
                    const visitDate = new Date(p.dateOfVisit);
                    const now = new Date();
                    return visitDate.getMonth() === now.getMonth() && visitDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-600 mb-1">Average Age</p>
                <p className="text-3xl font-bold text-purple-800">
                  {filteredPatients.length > 0 
                    ? Math.round(filteredPatients.reduce((sum, p) => sum + p.age, 0) / filteredPatients.length)
                    : 0
                  } <span className="text-lg">years</span>
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Results */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        {/* Patient List */}
        {filteredPatients.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Patient List</h3>
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Showing {filteredPatients.length} result{filteredPatients.length !== 1 ? 's' : ''}
              </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={onEditPatient}
                onView={onViewPatient}
              />
            ))}
          </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Patients Found</h3>
            <p className="text-gray-600">
              No patients have been diagnosed with {subcategory ? `${category} - ${subcategory}` : `${category} category`} yet.
            </p>
            <p className="text-sm text-gray-500 mt-2">Try selecting a different category or subcategory.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPatients;