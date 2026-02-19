/**
 * Fetch all Pokémon base stats and calculate min/max ranges
 * Run with: node scripts/fetchStatRanges.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE = 'https://pokeapi.co/api/v2';
const TOTAL_POKEMON = 1025;
const BATCH_SIZE = 50;
const DELAY_MS = 100;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchPokemon(id) {
  const response = await fetch(`${API_BASE}/pokemon/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch Pokémon ${id}`);
  return response.json();
}

async function fetchAllStats() {
  console.log(`Fetching stats for ${TOTAL_POKEMON} Pokémon...`);
  
  const statRanges = {
    hp: { min: Infinity, max: -Infinity },
    attack: { min: Infinity, max: -Infinity },
    defense: { min: Infinity, max: -Infinity },
    'special-attack': { min: Infinity, max: -Infinity },
    'special-defense': { min: Infinity, max: -Infinity },
    speed: { min: Infinity, max: -Infinity },
  };

  const allStats = [];

  for (let i = 1; i <= TOTAL_POKEMON; i++) {
    try {
      const pokemon = await fetchPokemon(i);
      const stats = {};
      
      pokemon.stats.forEach(s => {
        const statName = s.stat.name;
        const value = s.base_stat;
        stats[statName] = value;
        
        if (statRanges[statName]) {
          statRanges[statName].min = Math.min(statRanges[statName].min, value);
          statRanges[statName].max = Math.max(statRanges[statName].max, value);
        }
      });

      allStats.push({
        id: pokemon.id,
        name: pokemon.name,
        stats,
      });

      if (i % 50 === 0) {
        console.log(`Progress: ${i}/${TOTAL_POKEMON} (${Math.round(i/TOTAL_POKEMON*100)}%)`);
      }

      // Rate limiting
      if (i % BATCH_SIZE === 0) {
        await sleep(DELAY_MS);
      }
    } catch (error) {
      console.error(`Error fetching Pokémon ${i}:`, error.message);
    }
  }

  console.log('\n=== Stat Ranges ===');
  Object.entries(statRanges).forEach(([stat, range]) => {
    console.log(`${stat.padEnd(20)}: ${range.min} - ${range.max}`);
  });

  // Find Pokémon with max stats
  console.log('\n=== Pokémon with Max Stats ===');
  Object.entries(statRanges).forEach(([stat, range]) => {
    const maxPokemon = allStats.filter(p => p.stats[stat] === range.max);
    console.log(`${stat} (${range.max}): ${maxPokemon.map(p => `${p.name} (#${p.id})`).join(', ')}`);
  });

  // Save to JSON
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'statRanges.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(statRanges, null, 2));
  console.log(`\n✅ Stat ranges saved to: ${outputPath}`);

  return statRanges;
}

// Run the script
fetchAllStats().catch(console.error);

