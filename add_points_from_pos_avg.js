const fs = require('fs');
const path = require('path');

// Read the picks.json file
const picksFilePath = path.join(__dirname, 'src', 'picks.json');
const picks = JSON.parse(fs.readFileSync(picksFilePath, 'utf8'));

// Calculate average points for each position
const positionPoints = {};
const positionCounts = {};

// Group points by position
picks.forEach(pick => {
    const position = pick.position;
    const points = pick.points;
    
    if (!positionPoints[position]) {
        positionPoints[position] = 0;
        positionCounts[position] = 0;
    }
    
    positionPoints[position] += points;
    positionCounts[position]++;
});

// Calculate averages
const positionAverages = {};
Object.keys(positionPoints).forEach(position => {
    positionAverages[position] = positionPoints[position] / positionCounts[position];
});

console.log('Position averages:');
Object.keys(positionAverages).forEach(position => {
    console.log(`${position}: ${positionAverages[position].toFixed(2)}`);
});

// Add points_from_pos_avg field to each pick
const updatedPicks = picks.map(pick => {
    const position = pick.position;
    const playerPoints = pick.points;
    const positionAvg = positionAverages[position];
    const pointsFromPosAvg = playerPoints - positionAvg;
    
    return {
        ...pick,
        points_from_pos_avg: parseFloat(pointsFromPosAvg.toFixed(2))
    };
});

// Write the updated data back to the file
fs.writeFileSync(picksFilePath, JSON.stringify(updatedPicks, null, 2));

console.log(`\nUpdated ${updatedPicks.length} picks with points_from_pos_avg field`);
console.log(`File saved to: ${picksFilePath}`);

// Show some examples
console.log('\nExample results:');
const examples = updatedPicks.slice(0, 5);
examples.forEach(pick => {
    console.log(`${pick.name} (${pick.position}): ${pick.points} points, ${pick.points_from_pos_avg} from avg`);
}); 