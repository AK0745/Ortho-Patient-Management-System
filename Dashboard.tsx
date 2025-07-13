import React from 'react';
import { Link } from 'react-router-dom';
import { Patient } from '../types/Patient';
import { Users, Plus, Calendar, TrendingUp, FileText, Activity, ArrowUpRight, Sparkles } from 'lucide-react';

interface DashboardProps {
  patients: Patient[];
}

const Dashboard: React.FC<DashboardProps> = ({ patients }) => {
  const totalPatients = patients.length;
  const recentPatients = patients.slice(-5).reverse();
  
  const categoryStats = {
    Trauma: patients.filter(p => p.diagnosisCategory === 'Trauma').length,
    Plasty: patients.filter(p => p.diagnosisCategory === 'Plasty').length,
    Scopy: patients.filter(p => p.diagnosisCategory === 'Scopy').length,
    Spine: patients.filter(p => p.diagnosisCategory === 'Spine').length,
  };

  const thisMonthVisits = patients.filter(p => {
    const visitDate = new Date(p.dateOfVisit);
    const now = new Date();
    return visitDate.getMonth() === now.getMonth() && visitDate.getFullYear() === now.getFullYear();
  }).length;

  const StatCard = ({ title, value, icon: Icon, color, gradient, to }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    gradient: string;
    to?: string;
  }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 ${to ? 'cursor-pointer hover:border-blue-200' : ''} group`}
    >
      {to ? (
        <Link to={to} className="block">
          <StatCardContent title={title} value={value} icon={Icon} color={color} gradient={gradient} hasLink={!!to} />
        </Link>
      ) : (
        <StatCardContent title={title} value={value} icon={Icon} color={color} gradient={gradient} hasLink={false} />
      )}
    </div>
  );

  const StatCardContent = ({ title, value, icon: Icon, color, gradient, hasLink }: {
    title: string;
    value: number;
    icon: React.ComponentType<any>;
    color: string;
    gradient: string;
    hasLink: boolean;
  }) => (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{value}</p>
          {hasLink && (
            <div className="flex items-center mt-2 text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
              <span>View details</span>
              <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative flex items-center justify-between bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
        {/* Medical Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop" 
            alt="Medical Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-teal-600/90"></div>
        
        <div>
          <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <h1 className="text-4xl font-bold">Welcome Back, Doctor</h1>
          </div>
          <p className="text-blue-100 text-xl">Here's your practice overview for today</p>
          <div className="mt-4 flex items-center space-x-4 text-blue-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">All systems operational</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          </div>
        </div>
        <div className="relative z-10">
          <Link
            to="/patients/add-patient"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Patient
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={totalPatients}
          icon={Users}
          color="bg-blue-600"
          gradient="from-blue-500 to-blue-600"
          to="/patients"
        />
        <StatCard
          title="This Month"
          value={thisMonthVisits}
          icon={Calendar}
          color="bg-emerald-600"
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Trauma Cases"
          value={categoryStats.Trauma}
          icon={Activity}
          color="bg-red-600"
          gradient="from-red-500 to-red-600"
        />
        <StatCard
          title="Active Cases"
          value={totalPatients}
          icon={TrendingUp}
          color="bg-purple-600"
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      {/* Category Breakdown */}
      <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
        {/* Medical Equipment Background */}
        <div className="absolute top-4 right-4 opacity-5">
          <img 
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
            alt="Medical Equipment" 
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
        
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Diagnosis Categories</h2>
          <div className="ml-auto text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
            {Object.values(categoryStats).reduce((a, b) => a + b, 0)} Total Cases
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(categoryStats).map(([category, count]) => (
            <Link to="/diagnosis" key={category} className="block text-center group cursor-pointer">
              <div className={`w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                category === 'Trauma' ? 'bg-gradient-to-br from-red-100 to-red-200 text-red-600 group-hover:from-red-200 group-hover:to-red-300' :
                category === 'Plasty' ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 group-hover:from-emerald-200 group-hover:to-emerald-300' :
                category === 'Scopy' ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 group-hover:from-blue-200 group-hover:to-blue-300' :
                'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 group-hover:from-purple-200 group-hover:to-purple-300'
              }`}>
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1 group-hover:text-gray-900 transition-colors">{category}</p>
              <p className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{count}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Patients */}
      <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
        {/* Subtle Medical Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 right-8">
            <Activity className="w-24 h-24 text-blue-600" />
          </div>
          <div className="absolute bottom-8 left-8">
            <Users className="w-20 h-20 text-teal-600" />
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Recent Patients</h2>
            <div className="ml-2 text-sm text-gray-500 bg-emerald-50 px-3 py-1 rounded-full">
              Last 5 visits
            </div>
          </div>
          <button
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all"
          >
            <Link to="/patients" className="flex items-center space-x-1">
              <span>View all</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </button>
        </div>
        {recentPatients.length > 0 ? (
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-teal-50 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-200 hover:shadow-md">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{patient.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {patient.diagnosisCategory} - {patient.diagnosisSubcategory}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.diagnosisCategory === 'Trauma' ? 'bg-red-100 text-red-700' :
                      patient.diagnosisCategory === 'Plasty' ? 'bg-emerald-100 text-emerald-700' :
                      patient.diagnosisCategory === 'Scopy' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {patient.diagnosisCategory}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {new Date(patient.dateOfVisit).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">{patient.age} years, {patient.sex}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No patients added yet</p>
            <p className="text-gray-500">Start by adding your first patient to see them here</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
        {/* Medical Icons Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4">
            <FileText className="w-16 h-16 text-purple-600 transform rotate-12" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Plus className="w-20 h-20 text-blue-600 transform -rotate-12" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Activity className="w-32 h-32 text-teal-600 opacity-30" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          <div className="ml-auto text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
            Most used features
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 text-left group hover:shadow-lg transform hover:scale-105"
          >
            <Link to="/patients/add-patient" className="block">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <p className="font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">Add New Patient</p>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Register a new patient record</p>
            </Link>
          </button>
          <button
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 text-left group hover:shadow-lg transform hover:scale-105"
          >
            <Link to="/patients/search" className="block">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <p className="font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">Search Patients</p>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Find patients by name or diagnosis</p>
            </Link>
          </button>
          <button
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 transition-all duration-300 text-left group hover:shadow-lg transform hover:scale-105"
          >
            <Link to="/diagnosis" className="block">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <p className="font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">View Categories</p>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Browse diagnosis categories</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;