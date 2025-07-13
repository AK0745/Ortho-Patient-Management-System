import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    dashboard: 'Dashboard',
    patients: 'Patients',
    'add-patient': 'Add Patient',
    search: 'Search & Filter',
    diagnosis: 'Diagnosis Categories',
    reports: 'Medical Reports',
    schedule: 'Schedule',
    upcoming: 'Upcoming Appointments',
    profile: 'Patient Profile',
    edit: 'Edit Patient',
  };

  const getBreadcrumbName = (pathname: string, index: number) => {
    // Check if it's a patient ID (numeric)
    if (/^\d+$/.test(pathname) && pathnames[index - 1] === 'patients') {
      return 'Patient Details';
    }
    
    // Check if it's a subcategory path
    if (pathnames[index - 1] === 'diagnosis' && pathnames[index - 2] === 'patients') {
      return 'Diagnosis Details';
    }
    
    return breadcrumbNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
      <Link
        to="/dashboard"
        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const breadcrumbName = getBreadcrumbName(pathname, index);

        return (
          <React.Fragment key={pathname}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-800 font-medium">{breadcrumbName}</span>
            ) : (
              <Link
                to={routeTo}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                {breadcrumbName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;