const tinPatterns = {
  AT: "^\\d{2}-\\d{3}/\\d{4}$",
  BE: "^\\d{11}$",
  BG: "^\\d{10}$",
  CY: "^\\d{7}[a-zA-Z]$",
  CZ: "^\\d{6}/\\d{4}$",
  DE: "^\\d{11}$",
  DK: "^\\d{6}-\\d{4}$",
  EE: "^\\d{11}$",
  EL: "^\\d{9}$",
  ES: "^\\d{8}[a-zA-Z]|[a-zA-Z]\\d{7}[a-zA-Z]|[a-zA-Z]\\d{7}[a-zA-Z]|[XYZxyz]9999999|[Mm]\\d{7}[a-zA-Z]$",
  FI: "^\\d{6}[\\+\\-A]\\d[a-zA-Z9]$",
  FR: "^\\d{2}\\s\\d{2}\\s\\d{3}\\s\\d{3}\\s\\d{3}$",
  HR: "^\\d{11}$",
  HU: "^\\d{10}$",
  IE: "^\\d{7}[a-zA-Z](?:[a-zA-Z])?$",
  IT: "^[a-zA-Z]{6}\\d{2}[a-zA-Z]{2}\\d{3}[a-zA-Z]$",
  LT: "^\\d{11}$",
  LU: "^\\d{13}$",
  LV: "^\\d{6}(?:\\d{5})?$",
  MT: "^(\\d{4})\\d[a-zA-Z]till\\d{7}[a-zA-Z]|\\d{9}$",
  NL: "^\\d{9}$",
  PL: "^\\d{10}|\\d{9}$",
  PT: "^\\d{9}$",
  RO: "^\\d{13}$",
  SE: "^\\d{6}-\\d{4}$",
  SI: "^\\d{8}$",
  SK: "^\\d{8}|\\d{6}/\\d{3}(?:\\d)?$",
};

const tin = {};
Object.keys(tinPatterns).map((key) =>
  Object.assign(tin, {
    [key.toLowerCase()]: tinPatterns[key],
  }),
);

export default tin;
