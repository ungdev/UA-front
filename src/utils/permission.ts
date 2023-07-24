export const hasOrgaPermission = (permissions: Array<string>) =>
  permissions.includes('admin') || permissions.includes('anim') || permissions.includes('entry');
