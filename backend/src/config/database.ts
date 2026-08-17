import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { initialSeedData } from '../seed/seedData';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

export const supabase = (SUPABASE_URL && SUPABASE_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_KEY) 
  : null;

// Multi-path resolution for local and Vercel serverless environments
function resolveDbFile(): string {
  const possiblePaths = [
    path.join(__dirname, '../../db_store.json'),
    path.join(process.cwd(), 'backend/db_store.json'),
    path.join(process.cwd(), 'db_store.json')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return possiblePaths[0];
}

const DB_FILE = resolveDbFile();

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
      console.warn('[Database] Could not read existing db_store.json, falling back to seed data.');
    }
    return initialSeedData;
  }

  public saveData(dataToSave?: typeof initialSeedData): void {
    if (dataToSave) {
      this.data = dataToSave;
    }
    // Attempt file write with graceful failover for read-only Vercel serverless environments
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[Database] Read-only filesystem detected (Vercel). Persistence maintained in-memory.');
    }
  }

  public getStore() {
    return this.data;
  }
}

export const db = new DatabaseStore();
