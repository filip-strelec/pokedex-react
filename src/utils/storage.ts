import type { BackupData } from '../types';

const FAVORITES_KEY = 'pokemon_favorites';
const TEAM_KEY = 'pokemon_team';

export function getFavorites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]') || [];
  } catch {
    return [];
  }
}

export function saveFavorites(ids: number[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function getTeam(): number[] {
  try {
    return JSON.parse(localStorage.getItem(TEAM_KEY) || '[]') || [];
  } catch {
    return [];
  }
}

export function saveTeam(ids: number[]): void {
  localStorage.setItem(TEAM_KEY, JSON.stringify(ids));
}

export function exportBackup(favorites: number[], team: number[]): void {
  const backup: BackupData = {
    favorites,
    team,
    exportedAt: new Date().toISOString(),
    version: 1,
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pokemon-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseBackup(jsonString: string): { favorites: number[]; team: number[] } | null {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') throw new Error('Invalid backup format');
    const favorites = Array.isArray(data.favorites) ? data.favorites.filter(Number.isInteger) : [];
    const team = Array.isArray(data.team) ? data.team.filter(Number.isInteger).slice(0, 6) : [];
    return { favorites, team };
  } catch {
    return null;
  }
}

