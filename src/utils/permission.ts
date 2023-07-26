import { Permission } from "@/types";

export const hasOrgaPermission = (permissions: Permission[]) =>
  (permissions.includes(Permission.admin) || permissions.includes(Permission.anim) || permissions.includes(Permission.entry));
