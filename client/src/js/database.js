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
  // Log an error message indicating that the function is not implemented yet
  // console.error('putDb not implemented');

  // Open a connection to the 'jate' database with version 1
  const jateDb = await openDB('jate', 1);

  // Start a new transaction in 'readwrite' mode on the 'jate' object store
  const tx = jateDb.transaction('jate', 'readwrite');

  // Get the 'jate' object store from the transaction
  const store = tx.objectStore('jate');

  // Add the provided content object to the 'jate' object store
  const request = store.add({ content });

  // Wait for the add operation to complete and get the result
  const result = await request;

  // Log a message indicating that the content was successfully added to the database
  console.log('content added to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Log a message indicating that data retrieval from the database is in progress
  console.log('data retrieved from database');

  // Open the 'jate' database with version 1 using the openDB function
  const jateDb = await openDB('jate', 1);

  // Initiate a read-only transaction on the 'jate' object store within the 'jate' database
  const tx = jateDb.transaction('jate', 'readonly');

  // Retrieve the 'jate' object store from the transaction
  const store = tx.objectStore('jate');

  // Create a request to retrieve all data from the 'jate' object store
  const request = store.getAll();

  // Wait for the request to complete and store the retrieved data in the result variable
  const result = await request;

  // Log the retrieved content from the database to the console
  console.log('content retrieved from database', result);

  // Return the retrieved data from the function
  return result;
};

// Call the initdb function
initdb();