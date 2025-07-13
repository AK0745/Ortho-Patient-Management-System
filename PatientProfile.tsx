import React from 'react';
import { Patient } from '../types/Patient';
import { X, User, Calendar, Phone, MapPin, Briefcase, FileText, Activity, Upload, Download, Eye, Image } from 'lucide-react';

interface PatientProfileProps {
  patient: Patient;
  onClose: () => void;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient, onClose }) => {
  const InfoSection = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: any }) => (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Icon className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoItem = ({ label, value }: { label: string; value: string | undefined }) => (
    value ? (
      <div className="mb-3">
        <dt className="text-sm font-medium text-gray-600">{label}</dt>
        <dd className="text-sm text-gray-800 mt-1">{value}</dd>
      </div>
    ) : null
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Basic Information */}
          <InfoSection title="Basic Information" icon={User}>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Age" value={patient.age?.toString()} />
              <InfoItem label="Sex" value={patient.sex} />
              <InfoItem label="Contact Number" value={patient.contactNumber} />
              <InfoItem label="Occupation" value={patient.occupation} />
              <InfoItem label="Address" value={patient.address} />
              <InfoItem label="Date of Visit" value={patient.dateOfVisit ? new Date(patient.dateOfVisit).toLocaleDateString() : undefined} />
            </dl>
          </InfoSection>

          {/* Diagnosis */}
          <InfoSection title="Diagnosis" icon={FileText}>
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                patient.diagnosisCategory === 'Trauma' ? 'bg-red-100 text-red-800' :
                patient.diagnosisCategory === 'Plasty' ? 'bg-green-100 text-green-800' :
                patient.diagnosisCategory === 'Scopy' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {patient.diagnosisCategory}
              </span>
            </div>
            <dl>
              <InfoItem label="Subcategory" value={patient.diagnosisSubcategory} />
              <InfoItem label="Diagnosis Notes" value={patient.diagnosisNotes} />
            </dl>
          </InfoSection>

          {/* Medical History */}
          <InfoSection title="Medical History" icon={Activity}>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Date of Injury" value={patient.dateOfInjury ? new Date(patient.dateOfInjury).toLocaleDateString() : undefined} />
              <InfoItem label="Mechanism of Injury" value={patient.mechanismOfInjury} />
              <InfoItem label="Medical History" value={patient.medicalHistory} />
              <InfoItem label="Family History" value={patient.familyHistory} />
              <InfoItem label="History of Present Illness" value={patient.historyOfPresentIllness} />
              <InfoItem label="Past History" value={patient.pastHistory} />
            </dl>
          </InfoSection>

          {/* Investigation Reports */}
          <InfoSection title="Investigation Reports" icon={FileText}>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Blood Reports" value={patient.bloodReports} />
              <InfoItem label="X-Ray Preop" value={patient.xrayPreop} />
              <InfoItem label="CT Scan" value={patient.ctScan} />
              <InfoItem label="MRI" value={patient.mri} />
            </dl>
          </InfoSection>

          {/* Uploaded Files */}
          {patient.uploadedFiles && patient.uploadedFiles.length > 0 && (
            <InfoSection title="Medical Reports & Files" icon={Upload}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.uploadedFiles.map((file) => (
                  <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-4 h-4 text-blue-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm font-medium text-gray-800 truncate">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {file.type.startsWith('image/') && (
                          <button
                            onClick={() => window.open(file.dataUrl, '_blank')}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                            title="Preview"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = file.dataUrl;
                            link.download = file.name;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                          title="Download"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          file.category === 'xray' ? 'bg-blue-100 text-blue-800' :
                          file.category === 'prescription' ? 'bg-green-100 text-green-800' :
                          file.category === 'lab-report' ? 'bg-purple-100 text-purple-800' :
                          file.category === 'referral' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {file.category.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uploaded:</span>
                        <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfoSection>
          )}

          {/* Treatment */}
          <InfoSection title="Treatment" icon={Activity}>
            <dl>
              <InfoItem label="Current Treatment Details" value={patient.currentTreatment} />
            </dl>
          </InfoSection>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;