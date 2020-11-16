export const SuccessCol = '#329932';
export const ErrorCol = '#FF1919';
export const WarningCol = '#ff8f00';

export const RandomCol = () => {
  const randCol = Math.floor(Math.random() * 16777214) + 1;
  return `#${randCol}`;
};
