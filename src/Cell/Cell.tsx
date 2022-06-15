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
                                { this.props.data["num_year_kept"] > 0 && 
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
                            <LightTooltip title={"diff from avg of " + this.props.data["position"] + "'s drafted" }>
                                <Typography variant="body1" className={ this.props.data["points_from_pos_avg"] > 0 ? "points_pos" : "points_ng"}>
                                    { (this.props.data["points_from_pos_avg"] > 0 ? "+" : "") + Math.round(this.props.data["points_from_pos_avg"]).toString() } 
                                </Typography>
                            </LightTooltip>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    }
}