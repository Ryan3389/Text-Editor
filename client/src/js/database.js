import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Item added to database')

  //create connection to db
  const textDb = await openDB('jate', 1)

  //create new transaction and specify the database and privilages
  const tx = textDb.transaction('jate', 'readwrite')

  const store = tx.objectStore('jate')

  const request = store.add({ content })

  const result = await request

  console.log('Data saved to DB', result)

  return result
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting all data from database')

  const textDb = await openDB('jate', 1)

  const tx = textDb.transaction('jate', 'readonly')

  const store = tx.objectStore('jate')

  const request = store.getAll()

  const result = await request

  console.log('result value: ', result)

  return result
}

initdb();
