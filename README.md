# DraftBoard

A React-based fantasy football draft board visualization tool that displays draft picks with performance analytics and visual indicators.

## Features

- **Draft Board Visualization**: Snake draft format display with manager names and round numbers
- **Player Performance Analytics**: Shows total points and performance relative to position averages
- **Dynamic Color Coding**: Points difference from position average displayed with color-coded intensity:
  - **Green shades** for positive performance (darker = better performance)
  - **Red shades** for negative performance (darker = worse performance)
- **Responsive Design**: Clean, modern UI built with Material-UI components

## Data Source

The draft data is sourced from [this Google Colab notebook](https://colab.research.google.com/drive/1N4euBlOfYbsn0O0c42ldSyv5Gq-CRlM3?authuser=1#scrollTo=zMCLCe8pwLhl) which processes Yahoo Fantasy Football league data.

## Data Format

The application expects a JSON file (`src/picks.json`) with the following structure:

```json
[
  {
    "pick": 1,
    "round": 1,
    "team_key": "league.team.id",
    "player_key": "league.player.id",
    "season": "2024",
    "league_key": "league.id",
    "manager_name": "Manager Name",
    "points": 340.4,
    "name": "Player Name",
    "position": "QB",
    "current_team": "Team",
    "points_from_pos_avg": 142.53
  }
]
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DraftBoard
```

2. Install dependencies:
```bash
npm install
```

3. Add your draft data:
   - Replace `src/picks.json` with your draft data
   - Or run the included script to add `points_from_pos_avg` field:
   ```bash
   node add_points_from_pos_avg.js
   ```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Scripts

### `add_points_from_pos_avg.js`
Calculates and adds the `points_from_pos_avg` field to your draft data by:
- Computing average points for each position
- Calculating each player's difference from their position average
- Adding the field to each player record

### `analyze_points_range.js`
Analyzes the range of points differences in your data to help understand the spread for color coding.

## How It Works

1. **Data Processing**: The app reads draft data and organizes it by rounds
2. **Snake Draft Display**: Even rounds are reversed to show proper snake draft format
3. **Performance Calculation**: Each player's performance is compared to their position's average
4. **Visual Indicators**: 
   - Total points shown in black text on white background
   - Performance difference shown with color-coded intensity
   - Keeper indicators (if `num_year_kept` field is present)

## Color Coding System

The intensity of colors corresponds to how far from average each player performed:

**Green (Positive Performance):**
- Very light green: Slightly above average
- Light green: Moderately above average  
- Standard green: Well above average
- Dark green: Significantly above average
- Very dark green: Exceptional performance

**Red (Negative Performance):**
- Very light red: Slightly below average
- Light red: Moderately below average
- Standard red: Well below average
- Dark red: Significantly below average
- Very dark red: Poor performance

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type safety and development experience
- **Material-UI**: UI component library
- **Node.js**: Scripts for data processing

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
