import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Search, Plus, FileText, User, Activity, ChevronDown, ChevronRight, Calendar, Stethoscope, Heart, Brain } from 'lucide-react';

interface SidebarProps {
  // Remove props as we'll use router location
}

interface MenuItem {
  id: string;
  path: string;
  icon: any;
  label: string;
  color: string;
  gradient: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);
  const location = useLocation();

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const menuSections = [
    {
      id: 'main',
      title: 'Main Dashboard',
      icon: Activity,
      items: [
        { id: 'dashboard', path: '/dashboard', icon: Activity, label: 'Overview', color: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
      ]
    },
    {
      id: 'patients',
      title: 'Patient Management',
      icon: Users,
      items: [
        { id: 'patients', path: '/patients', icon: Users, label: 'All Patients', color: 'text-emerald-600', gradient: 'from-emerald-500 to-emerald-600' },
        { id: 'add-patient', path: '/patients/add-patient', icon: Plus, label: 'Add Patient', color: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
        { id: 'search', path: '/patients/search', icon: Search, label: 'Search & Filter', color: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' },
      ]
    },
    {
      id: 'medical',
      title: 'Medical Records',
      icon: FileText,
      items: [
        { id: 'diagnosis', path: '/diagnosis', icon: FileText, label: 'Diagnosis Categories', color: 'text-teal-600', gradient: 'from-teal-500 to-teal-600' },
        { id: 'reports', path: '/reports', icon: Heart, label: 'Medical Reports', color: 'text-red-600', gradient: 'from-red-500 to-red-600' },
      ]
    },
    {
      id: 'appointments',
      title: 'Appointments',
      icon: Calendar,
      items: [
        { id: 'schedule', path: '/schedule', icon: Calendar, label: 'Schedule', color: 'text-indigo-600', gradient: 'from-indigo-500 to-indigo-600' },
        { id: 'upcoming', path: '/upcoming', icon: Stethoscope, label: 'Upcoming', color: 'text-pink-600', gradient: 'from-pink-500 to-pink-600' },
      ]
    }
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-slate-50 to-white shadow-2xl h-screen fixed left-0 top-0 z-10 border-r border-slate-200 overflow-y-auto">
      {/* Header with Medical Imagery */}
      <div className="relative p-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-teal-600 overflow-hidden">
        {/* Medical Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-4">
            <Stethoscope className="w-16 h-16 text-white transform rotate-12" />
          </div>
          <div className="absolute bottom-2 left-4">
            <Heart className="w-12 h-12 text-white transform -rotate-12" />
          </div>
          <div className="absolute top-1/2 right-8">
            <Brain className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">OrthoMed Pro</h1>
              <p className="text-xs text-blue-100">Advanced Care System</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-3">
            <p className="text-sm text-white font-medium">Professional Patient Management</p>
            <p className="text-xs text-blue-100 mt-1">Streamlined orthopedic care solutions</p>
          </div>
        </div>
      </div>
      
      {/* Medical Hero Image Section */}
      <div className="relative h-32 bg-gradient-to-br from-blue-50 to-teal-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20"></div>
        <div className="relative z-10 p-4 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-2">
              <img 
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                alt="Medical Professional" 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <p className="text-sm font-semibold text-gray-700">Dr. Sushit Kumar</p>
            <p className="text-xs text-gray-500">Orthopedic Specialist</p>
          </div>
        </div>
      </div>
      
      {/* Collapsible Navigation */}
      <nav className="mt-4 px-3 pb-6">
        {menuSections.map((section) => {
          const SectionIcon = section.icon;
          const isExpanded = expandedSections.includes(section.id);
          
          return (
            <div key={section.id} className="mb-3">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-300 rounded-xl group hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-teal-100 transition-all duration-300">
                    <SectionIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    {section.title}
                  </span>
                </div>
                <div className="transition-transform duration-300">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                  )}
                </div>
              </button>
              
              {/* Section Items */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="ml-4 mt-2 space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || 
                      (item.path === '/dashboard' && location.pathname === '/');
                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        className={`w-full flex items-center px-4 py-3 text-left transition-all duration-300 rounded-xl group hover:scale-105 hover:shadow-lg ${
                          isActive
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
                        }`}
                      >
                        <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'group-hover:bg-white/10'
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            isActive 
                              ? 'text-white' 
                              : `${item.color} group-hover:text-gray-800`
                          }`} />
                        </div>
                        <span className={`font-medium transition-all duration-300 ${
                          isActive ? 'text-white' : 'group-hover:text-gray-800'
                        }`}>
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;