import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { store } from '@/lib/store';
import { Permission, UserType } from './types';
import { hasOrgaPermission } from './utils/permission';

// middleware used for redirections
export function middleware(request: NextRequest) {
  const currentState = store.getState();

  const user = currentState.login.user;

  const isAdminPanel = request.nextUrl.pathname.startsWith('/dashboard/admin');

  const isLoginAllowed = currentState.settings.login;
  const isShopAllowed = currentState.settings.shop;
  const isLoggedIn = !!user;
  const hasTeam = !!user?.teamId;
  const isSpectator = !!user?.type && user.type === UserType.spectator;
  const isAdmin = !!user && hasOrgaPermission(user.permissions);

  //console.log(currentState.settings);

  console.log(request.nextUrl.pathname);

  console.log('middleware', {
    isAdminPanel,
    isLoginAllowed,
    isShopAllowed,
    isLoggedIn,
    hasTeam,
    isSpectator,
    isAdmin,
  })

  if (isAdminPanel && !isLoggedIn) {
    console.log("1");
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!isAdminPanel && (!isLoggedIn || !isLoginAllowed)) {
    console.log("2");
    return NextResponse.redirect(new URL('/dashboard/account', request.url));
  } else if (isLoggedIn) {
    console.log("3");
    if (hasTeam && (request.nextUrl.pathname === '/dashboard' || request.nextUrl.pathname === '/dashboard/register')) {
      return NextResponse.redirect(new URL('/dashboard/team', request.url));
    } else if (request.nextUrl.pathname === '/dashboard/shop' && !isShopAllowed) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (
      isSpectator &&
      (request.nextUrl.pathname === '/dashboard' || request.nextUrl.pathname === '/dashboard/register')
    ) {
      return NextResponse.redirect(new URL('/dashboard/spectator', request.url));
    } else if (!isSpectator && !hasTeam) {
      console.log("redirect");
      if (
        request.nextUrl.pathname === '/dashboard' ||
        (!isAdminPanel &&
          request.nextUrl.pathname !== '/dashboard/register' &&
          request.nextUrl.pathname !== '/dashboard/account')
      ) {
        return NextResponse.redirect(new URL('/dashboard/register', request.url));
      }
    }
    if (!isAdmin && isAdminPanel) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (
      request.nextUrl.pathname === '/dashboard/admin' &&
      (user.permissions.includes(Permission.admin) || user.permissions.includes(Permission.anim))
    ) {
      return NextResponse.redirect(new URL('/dashboard/admin/users', request.url));
    } else if (request.nextUrl.pathname === '/dashboard/admin' && user.permissions.includes(Permission.entry)) {
      return NextResponse.redirect(new URL('/dashboard/admin/scan', request.url));
    }
  }
  console.log("do next");
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
}
