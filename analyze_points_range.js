const fs = require('fs');
const path = require('path');

// Read the picks.json file
const picksFilePath = path.join(__dirname, 'src', 'picks.json');
const picks = JSON.parse(fs.readFileSync(picksFilePath, 'utf8'));

// Extract all points_from_pos_avg values
const pointsFromAvg = picks.map(pick => pick.points_from_pos_avg).filter(val => val !== undefined);

// Calculate statistics
const min = Math.min(...pointsFromAvg);
const max = Math.max(...pointsFromAvg);
const avg = pointsFromAvg.reduce((sum, val) => sum + val, 0) / pointsFromAvg.length;

console.log('Points from Position Average Analysis:');
console.log(`Minimum: ${min.toFixed(2)}`);
console.log(`Maximum: ${max.toFixed(2)}`);
console.log(`Average: ${avg.toFixed(2)}`);
console.log(`Range: ${(max - min).toFixed(2)}`);

// Show some examples
console.log('\nExamples:');
const sorted = pointsFromAvg.sort((a, b) => b - a);
console.log('Top 5 positive:', sorted.slice(0, 5).map(v => v.toFixed(2)));
console.log('Bottom 5 negative:', sorted.slice(-5).map(v => v.toFixed(2))); 