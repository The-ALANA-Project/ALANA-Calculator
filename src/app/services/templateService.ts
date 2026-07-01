import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { ContributionTemplate } from '../types/contribution';
import { contributionTemplates as staticTemplates } from '../data/templates';

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-44fc6238`;

const headers = () => ({
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json',
});

// Fetch all templates from Supabase, seeding on first call if empty.
// Falls back to static templates if the request fails.
export async function getTemplates(): Promise<ContributionTemplate[]> {
  try {
    // Ensure templates are seeded first
    await seedTemplates();
    const res = await fetch(`${BASE}/templates`, { headers: headers() });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ContributionTemplate[] = await res.json();
    const published = data.filter((t) => !t.isDraft);
    return published.length > 0 ? published : staticTemplates;
  } catch {
    return staticTemplates;
  }
}

// Seed templates into Supabase if the store is empty (idempotent).
async function seedTemplates(): Promise<void> {
  try {
    await fetch(`${BASE}/templates/seed`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(staticTemplates),
    });
  } catch {
    // Silently fail — static templates remain the fallback
  }
}

// Update a single template field set (Guardian action).
export async function updateTemplate(
  id: string,
  updates: Partial<ContributionTemplate>
): Promise<ContributionTemplate> {
  const res = await fetch(`${BASE}/templates/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`Failed to update template: HTTP ${res.status}`);
  return res.json();
}

// Create a brand-new template (Guardian action).
export async function createTemplate(
  template: ContributionTemplate
): Promise<ContributionTemplate> {
  const res = await fetch(`${BASE}/templates`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(template),
  });
  if (!res.ok) throw new Error(`Failed to create template: HTTP ${res.status}`);
  return res.json();
}

// Delete a template by id (Guardian action).
export async function deleteTemplate(id: string): Promise<void> {
  const res = await fetch(`${BASE}/templates/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error(`Failed to delete template: HTTP ${res.status}`);
}
