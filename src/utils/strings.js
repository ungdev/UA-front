// More info : https://stackoverflow.com/a/37511463
export const removeAccents = (string) => string.normalize('NFD').replace(/[\u0300-\u036F]/g, '');

export const getOrganiserShortName = (name) => {
  return removeAccents(name.toLowerCase().replaceAll(' ', '_'));
};
