import React, { useState, useEffect } from 'react';
import { Patient, DiagnosisCategory, DIAGNOSIS_SUBCATEGORIES } from '../types/Patient';
import { Search, Filter, Calendar, User, FileText, Sparkles, X } from 'lucide-react';

interface SearchAndFilterProps {
  patients: Patient[];
  onFilteredPatientsChange: (patients: Patient[]) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ patients, onFilteredPatientsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DiagnosisCategory | ''>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleFilter = () => {
    let filtered = [...patients];

    // Name search
    if (searchTerm.trim()) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(patient => patient.diagnosisCategory === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(patient => patient.diagnosisSubcategory === selectedSubcategory);
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter(patient => new Date(patient.dateOfVisit) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(patient => new Date(patient.dateOfVisit) <= new Date(dateTo));
    }

    onFilteredPatientsChange(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setDateFrom('');
    setDateTo('');
    onFilteredPatientsChange(patients);
  };

  // Auto-filter when any field changes
  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedCategory, selectedSubcategory, dateFrom, dateTo, patients]);

  // Clear subcategory when category changes
  const handleCategoryChange = (category: DiagnosisCategory | '') => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedSubcategory || dateFrom || dateTo;

  const getFilteredCount = () => {
    let filtered = [...patients];
    if (searchTerm.trim()) filtered = filtered.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));
    if (selectedCategory) filtered = filtered.filter(patient => patient.diagnosisCategory === selectedCategory);
    if (selectedSubcategory) filtered = filtered.filter(patient => patient.diagnosisSubcategory === selectedSubcategory);
    if (dateFrom) filtered = filtered.filter(patient => new Date(patient.dateOfVisit) >= new Date(dateFrom));
    if (dateTo) filtered = filtered.filter(patient => new Date(patient.dateOfVisit) <= new Date(dateTo));
    return filtered.length;
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 overflow-hidden">
      {/* Medical Search Background */}
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
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Search & Filter Patients</h2>
              <p className="text-gray-600">Find patients using advanced medical filters and criteria</p>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-teal-50 px-4 py-2 rounded-xl border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Filters Active</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Name Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Search by Name</span>
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter patient name..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white text-gray-800 placeholder-gray-500"
              style={{ cursor: 'text' }}
            />
          </div>

          {/* Diagnosis Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Diagnosis Category</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value as DiagnosisCategory | '')}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white text-gray-800 appearance-none"
              style={{ cursor: 'pointer' }}
            >
              <option value="">All Categories</option>
              <option value="Trauma">Trauma</option>
              <option value="Plasty">Plasty</option>
              <option value="Scopy">Scopy</option>
              <option value="Spine">Spine</option>
            </select>
          </div>

          {/* Diagnosis Subcategory */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Subcategory</span>
            </label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white text-gray-800 ${
                selectedCategory 
                  ? 'cursor-pointer hover:bg-gray-50' 
                  : 'opacity-50 cursor-not-allowed bg-gray-100'
              }`}
              disabled={!selectedCategory}
            >
              <option value="">All Subcategories</option>
              {selectedCategory && DIAGNOSIS_SUBCATEGORIES[selectedCategory].map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            {!selectedCategory && (
              <p className="text-xs text-gray-500 mt-1">
                Please select a diagnosis category first
              </p>
            )}
          </div>

          {/* Date From */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>Date From</span>
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white text-gray-800"
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Date To</span>
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 bg-white text-gray-800"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                📊 {getFilteredCount()} patients found
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold flex items-center space-x-2"
                style={{ cursor: 'pointer' }}
              >
                <X className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            )}
            <button
              onClick={handleFilter}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ cursor: 'pointer' }}
            >
              <Filter className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;