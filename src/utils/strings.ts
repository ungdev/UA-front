// More info : https://stackoverflow.com/a/37511463
export const removeAccents = (string: string) => string.normalize('NFD').replace(/[\u0300-\u036F]/g, '');

export const getOrganiserShortName = (name: string) => {
  return removeAccents(name.toLowerCase().replaceAll(' ', '_'));
};
