import {
    Paper,
    Typography,
    Grid
    }
    from '@material-ui/core';
import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';


import "./Cell.css";

interface ICellProps {
    data: any
}

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      fontSize: 14,
    },
  }))(Tooltip);

export default class Cel extends React.Component<ICellProps> {

    private getColorStyle(pointsFromAvg: number): string {
        // Normalize the value to 0-1 range based on the observed range (-200 to +220)
        const normalized = Math.abs(pointsFromAvg) / 220;
        const intensity = Math.min(normalized, 1); // Cap at 1
        
        if (pointsFromAvg > 0) {
            // Green shades - intensity based on how positive
            if (intensity > 0.8) return '#2e7d32'; // Dark green for very positive
            if (intensity > 0.6) return '#388e3c'; // Medium dark green
            if (intensity > 0.4) return '#4caf50'; // Standard green
            if (intensity > 0.2) return '#66bb6a'; // Light green
            return '#81c784'; // Very light green for slightly positive
        } else {
            // Red shades - intensity based on how negative
            if (intensity > 0.8) return '#c62828'; // Dark red for very negative
            if (intensity > 0.6) return '#d32f2f'; // Medium dark red
            if (intensity > 0.4) return '#f44336'; // Standard red
            if (intensity > 0.2) return '#ef5350'; // Light red
            return '#e57373'; // Very light red for slightly negative
        }
    }

    public render() {

        return (
            <React.Fragment>
                <Paper className={ "cell_card" } variant="outlined" square>
                    <Grid container justifyContent="space-between" direction="column" xs={12} className="grid">

                        <Grid item container justifyContent="space-between">
                            <Grid item xs={2}>
                                <Typography variant="body1" component="h2" color="textPrimary">
                                    { this.props.data["pick"] }
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                { this.props.data["num_year_kept"] && this.props.data["num_year_kept"] > 0 && 
                                    <LightTooltip title={ "kept for " + this.props.data["num_year_kept"] + " years" } aria-label={ "kept for " + this.props.data["num_year_kept"] + " years" } placement="top">
                                        <Typography variant="body1" className="keptbox">
                                        { this.props.data["num_year_kept"] } year
                                        </Typography>           
                                    </LightTooltip>
                                    
                                }
                            </Grid>
                        </Grid> 
                        <Grid item>
                            <Typography variant="h6" component="h2" color="textPrimary">
                                { this.props.data["name"] }
                            </Typography>
                            <Typography variant="h6" component="h2" color="textSecondary">
                                { this.props.data["position"] } - { this.props.data["current_team"] }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" style={{ color: 'black', backgroundColor: 'white', padding: '2px 4px', borderRadius: '2px' }}>
                                { Math.round(this.props.data["points"]).toString() } pts
                            </Typography>
                        </Grid>
                        <Grid item>
                            { this.props.data["points_from_pos_avg"] !== undefined && 
                                <LightTooltip title={"diff from avg of " + this.props.data["position"] + "'s drafted" }>
                                    <Typography variant="body1" style={{
                                        backgroundColor: this.getColorStyle(this.props.data["points_from_pos_avg"]),
                                        color: this.props.data["points_from_pos_avg"] > 0 ? 'black' : 'white',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold'
                                    }}>
                                        { (this.props.data["points_from_pos_avg"] > 0 ? "+" : "") + Math.round(this.props.data["points_from_pos_avg"]).toString() } 
                                    </Typography>
                                </LightTooltip>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    }
}