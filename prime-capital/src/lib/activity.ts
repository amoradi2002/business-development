export interface ActivityEntry {
  id: string;
  leadId: string;
  type: 'submitted' | 'called' | 'status_changed' | 'note_added' | 'document_uploaded';
  description: string;
  timestamp: string;
}

export function addActivity(leadId: string, type: ActivityEntry['type'], description: string) {
  const activities = JSON.parse(localStorage.getItem('pcg_activities') || '[]');
  activities.unshift({
    id: Date.now().toString(),
    leadId,
    type,
    description,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('pcg_activities', JSON.stringify(activities));
}

export function getActivities(leadId: string): ActivityEntry[] {
  const activities = JSON.parse(localStorage.getItem('pcg_activities') || '[]');
  return activities.filter((a: ActivityEntry) => a.leadId === leadId);
}
