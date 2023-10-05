import { Permission } from '@/types';

export const hasOrgaPermission = (permissions: Permission[]) => {
  if (!permissions) return false;
  return (
    permissions.includes(Permission.admin) ||
    permissions.includes(Permission.anim) ||
    permissions.includes(Permission.entry)
  );
};
