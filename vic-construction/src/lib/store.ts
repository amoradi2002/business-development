// In-memory lead store with file persistence for daily reports
import fs from 'fs';

const STORE_PATH = '/tmp/vic-leads.json';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  city: string;
  zip: string;
  description: string;
  timeline: string;
  submittedAt: string;
}

function readStore(): Lead[] {
  try {
    if (!fs.existsSync(STORE_PATH)) return [];
    const data = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeStore(leads: Lead[]) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(leads, null, 2));
  } catch (e) {
    console.error('Failed to write lead store:', e);
  }
}

export function addLead(lead: Omit<Lead, 'id' | 'submittedAt'>): Lead {
  const leads = readStore();
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
    submittedAt: new Date().toISOString(),
  };
  leads.push(newLead);
  writeStore(leads);
  return newLead;
}

export function getLeadsToday(): Lead[] {
  const leads = readStore();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  return leads.filter((l) => new Date(l.submittedAt) >= todayStart);
}

export function getLeadsThisWeek(): Lead[] {
  const leads = readStore();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  return leads.filter((l) => new Date(l.submittedAt) >= weekStart);
}

export function getAllLeads(): Lead[] {
  return readStore();
}
