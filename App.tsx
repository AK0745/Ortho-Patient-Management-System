import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Patient } from './types/Patient';
import { usePatients } from './hooks/usePatients';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PatientCard from './components/PatientCard';
import PatientForm from './components/PatientForm';
import PatientProfile from './components/PatientProfile';
import SearchAndFilter from './components/SearchAndFilter';
import DiagnosisCategories from './components/DiagnosisCategories';
import SubcategoryPatients from './components/SubcategoryPatients';
import Breadcrumb from './components/Breadcrumb';

function App() {
  const { patients, addPatient, updatePatient, deletePatient } = usePatients();

  // Patient Management Components
  const PatientsPage = () => {
    const handleEditPatient = (patient: Patient) => {
      // Navigate to edit page - this will be handled by routing
      window.location.href = `/patients/${patient.id}/edit`;
    };

    const handleViewPatient = (patient: Patient) => {
      // Navigate to patient profile - this will be handled by routing
      window.location.href = `/patients/${patient.id}`;
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">All Patients</h1>
          <a
            href="/patients/add-patient"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add New Patient
          </a>
        </div>
        
        {patients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={handleEditPatient}
                onView={handleViewPatient}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No patients found</p>
            <a
              href="/patients/add-patient"
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Add Your First Patient
            </a>
          </div>
        )}
      </div>
    );
  };

  const AddPatientPage = () => {
    const handleSavePatient = (patient: Patient) => {
      addPatient(patient);
      window.location.href = '/patients';
    };

    const handleCancel = () => {
      window.location.href = '/patients';
    };

    return (
      <PatientForm
        onSave={handleSavePatient}
        onCancel={handleCancel}
      />
    );
  };

  const EditPatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const patient = patients.find(p => p.id === id);

    const handleSavePatient = (updatedPatient: Patient) => {
      updatePatient(updatedPatient);
      window.location.href = `/patients/${id}`;
    };

    const handleCancel = () => {
      window.location.href = `/patients/${id}`;
    };

    if (!patient) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Patient not found</p>
          <a
            href="/patients"
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
          >
            Back to Patients
          </a>
        </div>
      );
    }

    return (
      <PatientForm
        patient={patient}
        onSave={handleSavePatient}
        onCancel={handleCancel}
      />
    );
  };

  const PatientProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const patient = patients.find(p => p.id === id);

    if (!patient) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Patient not found</p>
          <a
            href="/patients"
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
          >
            Back to Patients
          </a>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Patient Profile</h1>
          <div className="flex space-x-4">
            <a
              href={`/patients/${id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Edit Patient
            </a>
            <a
              href="/patients"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Back to Patients
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <PatientProfile
            patient={patient}
            onClose={() => window.location.href = '/patients'}
          />
        </div>
      </div>
    );
  };

  const SearchPage = () => {
    const [filteredPatients, setFilteredPatients] = React.useState<Patient[]>(patients);

    const handleFilteredPatientsChange = (filtered: Patient[]) => {
      setFilteredPatients(filtered);
    };

    const handleEditPatient = (patient: Patient) => {
      window.location.href = `/patients/${patient.id}/edit`;
    };

    const handleViewPatient = (patient: Patient) => {
      window.location.href = `/patients/${patient.id}`;
    };

    return (
      <div className="space-y-6">
        <SearchAndFilter
          patients={patients}
          onFilteredPatientsChange={handleFilteredPatientsChange}
        />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Search Results ({filteredPatients.length} patients)
          </h2>
          
          {filteredPatients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onEdit={handleEditPatient}
                  onView={handleViewPatient}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">
              No patients match your search criteria
            </p>
          )}
        </div>
      </div>
    );
  };

  const DiagnosisPage = () => {
    return <DiagnosisCategories patients={patients} />;
  };

  const SubcategoryPage = () => {
    const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
    
    const handleEditPatient = (patient: Patient) => {
      window.location.href = `/patients/${patient.id}/edit`;
    };

    const handleViewPatient = (patient: Patient) => {
      window.location.href = `/patients/${patient.id}`;
    };

    if (!category) {
      return <Navigate to="/diagnosis" replace />;
    }

    return (
      <SubcategoryPatients
        category={category}
        subcategory={subcategory ? decodeURIComponent(subcategory) : ''}
        patients={patients}
        onEditPatient={handleEditPatient}
        onViewPatient={handleViewPatient}
      />
    );
  };

  const ReportsPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Medical Reports</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Medical reports functionality coming soon...</p>
        </div>
      </div>
    );
  };

  const SchedulePage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Schedule</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Schedule functionality coming soon...</p>
        </div>
      </div>
    );
  };

  const UpcomingPage = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Upcoming appointments functionality coming soon...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Medical Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <img 
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Medical Background" 
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
        <div className="absolute top-1/3 right-20">
          <img 
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" 
            alt="Medical Equipment" 
            className="w-24 h-24 object-cover rounded-full opacity-50"
          />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <img 
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
            alt="Medical Professional" 
            className="w-20 h-20 object-cover rounded-full opacity-30"
          />
        </div>
      </div>
      
      <Sidebar />
      
      <div className="ml-80 p-8 relative z-10">
        <Breadcrumb />
        
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard patients={patients} />} />
          
          {/* Patient Management */}
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/add-patient" element={<AddPatientPage />} />
          <Route path="/patients/search" element={<SearchPage />} />
          <Route path="/patients/:id" element={<PatientProfilePage />} />
          <Route path="/patients/:id/edit" element={<EditPatientPage />} />
          
          {/* Diagnosis */}
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="/diagnosis/:category" element={<SubcategoryPage />} />
          <Route path="/diagnosis/:category/:subcategory" element={<SubcategoryPage />} />
          
          {/* Other Pages */}
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          
          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;