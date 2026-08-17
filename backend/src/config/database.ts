import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { initialSeedData } from '../seed/seedData';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

export const supabase = (SUPABASE_URL && SUPABASE_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_KEY) 
  : null;

// Local JSON file persistence store
const DB_FILE = path.join(__dirname, '../../db_store.json');

class DatabaseStore {
  private data: typeof initialSeedData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): typeof initialSeedData {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn('Could not read existing db_store.json, resetting to seed data.');
    }
    this.saveData(initialSeedData);
    return initialSeedData;
  }

  public saveData(dataToSave?: typeof initialSeedData): void {
    if (dataToSave) {
      this.data = dataToSave;
    }
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write db_store.json:', err);
    }
  }

  public getStore() {
    return this.data;
  }
}

export const db = new DatabaseStore();
