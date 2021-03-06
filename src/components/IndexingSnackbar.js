import React from 'react';
import {
  LinearProgress,
  Snackbar,
  Box,
  Slide,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const usesStyles = makeStyles((theme) => ({
  snackbarRoot: {
    bottom: '.5rem',
    left: '.5rem',
    minWidth: '14.625rem',
    width: '12.5%',
  },
  snackbarCaption: {
    fontSize: '.66rem',
  },
}));

function IndexingSnackbar({ open, onClose, indexCount, indexingProgress }) {
  const classes = usesStyles();
  const progressValue = (indexingProgress * 100) / indexCount;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      className={classes.snackbarRoot}
      onClose={onClose}
      TransitionComponent={Slide}
    >
      <Box display="flex" flexDirection="column">
        <Alert severity="info" elevation={6} onClose={onClose} variant="filled">
          <Typography className={classes.snackbarCaption}>
            The filters might be slow at first, while the indexes are generated.
            This will only happen once. Please be patient.
          </Typography>
        </Alert>
        <LinearProgress
          color="secondary"
          style={{ height: '5px' }}
          variant="determinate"
          value={progressValue}
        />
      </Box>
    </Snackbar>
  );
}

export default IndexingSnackbar;
