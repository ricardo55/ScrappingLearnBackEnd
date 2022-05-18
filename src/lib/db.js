import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  profiles: '++id, fullname, pruebaExperience, pruebaEducation', // Primary key and indexed props

  // Agrege estas lineas para guardar los valores en la BD
  education: '++id, place, degree, period',// Primary key and indexed props
  experience:'++id, role,period, place,country'
});