import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema'
import migrations from './migrations'

import FlashcardModel from './models/FlashcardModel'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // Disable migrations for development
  // migrations,
  jsi: true, // For now, disabling JSI to rule out issues
  onSetUpError: error => {
    console.log('Database setup failed', error);
  }
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [FlashcardModel],
})

export default database;