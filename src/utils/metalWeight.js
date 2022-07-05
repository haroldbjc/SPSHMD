export const metalWeight = [
  'No metal detected',
  '100% Hg',
  '75% Pb + 25% Hg',
  '50% Pb + 50% Hg',
  '25% Pb + 75% Hg',
  '100% Pb',
];

export const MetalWeight = (metal) => {
  const metalInArray = metalWeight.indexOf(metal);
  if (metalInArray === 0) {
    return 0;
  }
  return 1;
};
