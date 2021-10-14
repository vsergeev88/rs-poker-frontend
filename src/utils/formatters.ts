export const getCapitalLetters = (name: string, lastName: string): string => {
  if (name.length === 1) return name.toUpperCase();
  if (!lastName) {
    return `${name[0]}${name[name.length - 1]}`.toUpperCase();
  } else {
    return `${name[0]}${lastName[0]}`.toUpperCase();
  }
};

export const stringToColor = function stringToColor(str: string) {
  let hash = 0;
  let color = '#';

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
};

export const truncate = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};
