export const hasOrgaPermission = (permissions: string[]) =>
  permissions.includes('admin') || permissions.includes('anim') || permissions.includes('entry');
