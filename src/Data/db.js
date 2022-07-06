import Dexie from 'dexie';

const db = new Dexie('myDatabase');
db.version(1).stores({
    users: '++id, name, email , password , role', 
    currentUser: '++id, name, email , password , role', 
});



export default db 
