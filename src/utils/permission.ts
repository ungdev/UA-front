export const hasOrgaPermission = (permission: string) =>
  permission === 'admin' || permission === 'anim' || permission === 'entry' || permission === 'orga';
