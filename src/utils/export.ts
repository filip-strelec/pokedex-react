import { capitalize } from './pokemon';
import type { Pokemon } from '../types';

export function exportToCSV(pokemonList: Pokemon[]): void {
  const headers = [
    'ID', 'Name', 'Types', 'HP', 'Attack', 'Defense',
    'Sp. Atk', 'Sp. Def', 'Speed', 'Total', 'Abilities',
  ];

  const rows = pokemonList.map((p) => [
    p.id,
    capitalize(p.name),
    p.types.join(', '),
    p.stats.hp,
    p.stats.attack,
    p.stats.defense,
    p.stats['special-attack'],
    p.stats['special-defense'],
    p.stats.speed,
    p.totalStats,
    p.abilities.join(', '),
  ]);

  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  downloadFile(csv, 'pokemon-data.csv', 'text/csv');
}

export function exportToJSON(pokemonList: Pokemon[]): void {
  const data = pokemonList.map((p) => ({
    id: p.id,
    name: capitalize(p.name),
    types: p.types,
    stats: p.stats,
    totalStats: p.totalStats,
    abilities: p.abilities,
  }));

  const json = JSON.stringify(data, null, 2);
  downloadFile(json, 'pokemon-data.json', 'application/json');
}

function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

