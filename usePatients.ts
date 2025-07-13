import { useState, useEffect } from 'react';
import { Patient } from '../types/Patient';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const savedPatients = localStorage.getItem('orthomed-patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  const savePatients = (newPatients: Patient[]) => {
    setPatients(newPatients);
    localStorage.setItem('orthomed-patients', JSON.stringify(newPatients));
  };

  const addPatient = (patient: Patient) => {
    const newPatients = [...patients, patient];
    savePatients(newPatients);
  };

  const updatePatient = (updatedPatient: Patient) => {
    const newPatients = patients.map(p => 
      p.id === updatedPatient.id ? updatedPatient : p
    );
    savePatients(newPatients);
  };

  const deletePatient = (id: string) => {
    const newPatients = patients.filter(p => p.id !== id);
    savePatients(newPatients);
  };

  return {
    patients,
    addPatient,
    updatePatient,
    deletePatient,
  };
};