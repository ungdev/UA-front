export const hasOrgaPermission = (permissions) =>
  permissions.includes('admin') || permissions.includes('anim') || permissions.includes('entry');
