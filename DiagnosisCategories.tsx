import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DIAGNOSIS_SUBCATEGORIES } from '../types/Patient';
import { FileText, Tag, Users, ChevronRight, Filter, Search } from 'lucide-react';

interface DiagnosisCategoriesProps {
  patients: any[];
}

const DiagnosisCategories: React.FC<DiagnosisCategoriesProps> = ({ patients }) => {
  const navigate = useNavigate();

  const categoryColors = {
    Trauma: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      subcategory: 'hover:bg-red-50 hover:border-red-300'
    },
    Plasty: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      button: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      subcategory: 'hover:bg-emerald-50 hover:border-emerald-300'
    },
    Scopy: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
      button: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      subcategory: 'hover:bg-blue-50 hover:border-blue-300'
    },
    Spine: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-200',
      button: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      subcategory: 'hover:bg-purple-50 hover:border-purple-300'
    },
  };

  const getPatientCount = (category: string, subcategory?: string) => {
    if (subcategory) {
      return patients.filter(p => 
        p.diagnosisCategory === category && p.diagnosisSubcategory === subcategory
      ).length;
    }
    return patients.filter(p => p.diagnosisCategory === category).length;
  };

  const handleCategoryClick = (category: string) => {
    // Show all patients in this category by using empty subcategory
    navigate(`/diagnosis/${category}`);
  };

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    navigate(`/diagnosis/${category}/${encodeURIComponent(subcategory)}`);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
        {/* Medical Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4">
            <Search className="w-24 h-24 text-blue-600 transform rotate-12" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Filter className="w-20 h-20 text-teal-600 transform -rotate-12" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FileText className="w-32 h-32 text-purple-600 opacity-30" />
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Diagnosis Categories</h2>
              <p className="text-gray-600">Click on any category or subcategory to filter patients</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-4 py-2 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">{patients.length} Total Patients</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(categoryColors).map(([category, colors]) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg transform hover:scale-105 group`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {getPatientCount(category)}
                </div>
                <div className={`text-sm font-semibold ${colors.text}`}>
                  {category}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Click to view all
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-amber-600" />
            <h4 className="font-semibold text-amber-800">Quick Filter Instructions</h4>
          </div>
          <p className="text-sm text-amber-700 mt-2">
            Click on any category above to see all patients in that diagnosis group, or click on specific subcategories below for more precise filtering.
          </p>
        </div>
      </div>

      {/* Detailed Categories with Clickable Subcategories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(DIAGNOSIS_SUBCATEGORIES).map(([category, subcategories]) => {
          const colors = categoryColors[category as keyof typeof categoryColors];
          
          return (
            <div key={category} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Category Header - Clickable */}
              <button
                onClick={() => handleCategoryClick(category)}
                className={`w-full ${colors.button} text-white p-6 transition-all duration-300 hover:shadow-lg group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{category}</h3>
                      <p className="text-white/80 text-sm">
                        {getPatientCount(category)} patients • {subcategories.length} subcategories
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">View All</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
              
              {/* Subcategories - All Clickable */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Search className="w-4 h-4 mr-2 text-gray-500" />
                    Click any subcategory to filter patients:
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                  {subcategories.map((subcategory) => {
                    const patientCount = getPatientCount(category, subcategory);
                    
                    return (
                      <button
                        key={subcategory}
                        onClick={() => handleSubcategoryClick(category, subcategory)}
                        className={`flex items-center justify-between px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-700 transition-all duration-300 ${colors.subcategory} hover:shadow-md transform hover:scale-[1.02] group`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${colors.button.split(' ')[0].replace('bg-gradient-to-r', 'bg-red-500')}`}></div>
                          <span className="font-medium group-hover:text-gray-900">{subcategory}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 text-xs text-gray-500 group-hover:text-gray-700">
                            <Users className="w-3 h-3" />
                            <span className="font-semibold">{patientCount}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {/* Category Summary */}
                <div className={`mt-4 ${colors.bg} ${colors.border} border rounded-lg p-3`}>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-semibold ${colors.text}`}>
                      Total {category} Cases:
                    </span>
                    <span className={`font-bold ${colors.text}`}>
                      {getPatientCount(category)} patients
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-bold text-blue-800 text-lg">How to Use Diagnosis Filters</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h5 className="font-semibold mb-2">Category Filtering:</h5>
            <ul className="space-y-1">
              <li>• Click on category headers (Trauma, Plasty, etc.) to see all patients in that category</li>
              <li>• Use quick stats boxes for instant category overview</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Subcategory Filtering:</h5>
            <ul className="space-y-1">
              <li>• Click on any subcategory to see patients with that specific diagnosis</li>
              <li>• Patient counts are shown for each subcategory</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisCategories;