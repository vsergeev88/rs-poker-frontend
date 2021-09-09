export const getCapitalLetters = (name: string, lastName: string): string => {
  if (name.length === 1) return name.toUpperCase();
  if (!lastName) {
    return `${name[0]}${name[name.length - 1]}`.toUpperCase();
  } else {
    return `${name[0]}${lastName[0]}`.toUpperCase();
  }
};
