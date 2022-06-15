import React from 'react';
import './App.css';
import Cell from "./Cell/Cell"
import Grid from '@material-ui/core/Grid';


import picksData from './picks.json';
import { Typography } from '@material-ui/core';

function App() {
  let rows: any = []
  picksData.forEach(item => {
    const roundI = item["round"] - 1
    if (rows.length <= roundI) {
      rows.push([])
    }
    rows[roundI].push(item)
  })

  // handle snake
  let shouldReverse = false;
  for (let i = 0; i < rows.length; i++) {
    if (shouldReverse) {
      rows[i] = rows[i].reverse()
    }
    shouldReverse = !shouldReverse
  }

  let rowCount = 1;
  return (
    <div className="App">
      <Grid container>
        <Grid container item xs={12} className="GridRow">
          <Grid item xs>
              <Typography variant="h5" component="h2" color="textPrimary">
                  Round
              </Typography>
          </Grid>
          {
            rows[0].map((data: any) => (
              <Grid item xs>
                  <Typography variant="h5" component="h2" color="textPrimary">
                      { data["manager_name"] }
                  </Typography>
              </Grid>
            ))
          }
        </Grid>
          {
            rows.map((row: any) => (
              <Grid container item xs={12} className="GridRow">
                <Grid item xs className="RoundContainer">
                  <Typography variant="h5" component="h2" color="textPrimary" >
                    { rowCount++ }
                  </Typography>
                </Grid>
                {
                  row.map((data: any) => (
                    <Grid item xs>
                      <Cell data={ data } />
                    </Grid>
                  ))
                }
              </Grid>
            ))
          }
      </Grid>
    </div>
  );
}

export default App;
