import { ContributionTemplate, Branch } from '../types/contribution';

const CUSTOM_TEMPLATES_KEY = 'alana_custom_templates';

/**
 * Get all custom templates from localStorage
 */
export function getCustomTemplates(): ContributionTemplate[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(CUSTOM_TEMPLATES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Save a new custom template
 */
export function createCustomTemplate(template: Omit<ContributionTemplate, 'id'>): ContributionTemplate {
  const newTemplate: ContributionTemplate = {
    ...template,
    id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  const customTemplates = getCustomTemplates();
  customTemplates.push(newTemplate);
  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(customTemplates));

  return newTemplate;
}

/**
 * Update an existing custom template
 */
export function updateCustomTemplate(
  templateId: string,
  updates: Partial<ContributionTemplate>
): ContributionTemplate | null {
  const customTemplates = getCustomTemplates();
  const index = customTemplates.findIndex((t) => t.id === templateId);

  if (index === -1) return null;

  customTemplates[index] = { ...customTemplates[index], ...updates };
  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(customTemplates));

  return customTemplates[index];
}

/**
 * Delete a custom template
 */
export function deleteCustomTemplate(templateId: string): boolean {
  const customTemplates = getCustomTemplates();
  const filtered = customTemplates.filter((t) => t.id !== templateId);

  if (filtered.length === customTemplates.length) return false;

  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Get a single template by ID (checks custom templates only)
 */
export function getCustomTemplateById(id: string): ContributionTemplate | null {
  return getCustomTemplates().find((t) => t.id === id) || null;
}
