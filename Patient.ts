export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  occupation: string;
  address: string;
  contactNumber: string;
  dateOfVisit: string;
  medicalHistory: string;
  familyHistory: string;
  currentTreatment: string;
  
  // Additional medical fields from the notes
  dateOfInjury?: string;
  mechanismOfInjury?: string;
  historyOfPresentIllness?: string;
  pastHistory?: string;
  bloodReports?: string;
  xrayPreop?: string;
  ctScan?: string;
  mri?: string;
  
  // Diagnosis
  diagnosisCategory: DiagnosisCategory;
  diagnosisSubcategory: string;
  diagnosisNotes?: string;
  
  // File uploads
  uploadedFiles?: UploadedFile[];
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  dataUrl: string;
  category: 'xray' | 'prescription' | 'lab-report' | 'referral' | 'other';
}

export type DiagnosisCategory = 'Trauma' | 'Plasty' | 'Scopy' | 'Spine';

export interface DiagnosisCategories {
  [key: string]: string[];
}

export const DIAGNOSIS_SUBCATEGORIES: DiagnosisCategories = {
  Trauma: [
    'Cervical', 'Chunk', 'Scapula', 'Proximal Humerus', 'Shaft Humerus', 'Distal Humerus',
    'Capitellum', 'Trochlea', 'Radial head', 'Olecranon', 'Monteggia', 'Terrible Triad',
    'Coronoid', 'Shaft Radius', 'Shaft Ulna', 'DRUJ', 'Galeazzi', 'DER', 'Scaphoid',
    'Metacarpals', 'Phalangeal', 'Pelvic', 'Acetabulum', 'Head of femur', 'NOT', 'IT',
    'Subtrochanteric', 'SOF', 'Distal femur', 'Segmental femur', 'Hoffa', 'Tibial spine',
    'Prox tibia', 'SOT', 'Distal tibia', 'MM', 'Bimalleolar', 'Trimelleolar', 'Calcaneum',
    'Talus', 'Lisfranc', 'Metatarsals'
  ],
  Plasty: [
    'Hip', 'Knee', 'Shoulder', 'Radial head', 'Elbow', 'UKR'
  ],
  Scopy: [
    'Knee', 'Ankle', 'Hip', 'Shoulder'
  ],
  Spine: [
    'Cervical', 'Dorsal', 'Lumbar', 'Sacrum', 'Others', 'Dorsal spine', 'Lumbar spine'
  ]
};