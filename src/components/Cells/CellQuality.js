import React from 'react';
import { Box, Link } from '@material-ui/core';
import { darken } from 'polished';

import NaLabel from './NaLabel';
import { cellStyles } from './cellStyles';

function CellQuality({ value, colorScale, onClick, selected }) {
  if (!value) return <NaLabel />;

  const classes = cellStyles();
  const backgroundColor = colorScale[value - 1] || '#fff';
  const borderColor = darken(0.33, backgroundColor);
  const border = `2px solid ${borderColor}`;

  const handleClick = () => {
    onClick(value);
  };

  const BoxWrapper = ({ onClick, children }) =>
    onClick ? (
      <Link href="#" onClick={handleClick}>
        {children}
      </Link>
    ) : (
      children
    );

  return (
    <BoxWrapper onClick={onClick}>
      <Box
        className={classes.qualityContainer}
        style={{ backgroundColor, border }}
      >
        {value}
      </Box>
    </BoxWrapper>
  );
}

export default CellQuality;
