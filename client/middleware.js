import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Public paths
  const publicPaths = ['/', '/login', '/register'];
  const isPublicPath = publicPaths.includes(pathname);
  
  const token = request.cookies.get('token')?.value;
  
  // If on public path
  if (isPublicPath) {
    // If has token and trying to access login/register, redirect to dashboard
    if (token && (pathname === '/' || pathname === '/login' || pathname === '/register')) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: { 'Cookie': `token=${token}` }
        });
        
        if (response.ok) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch (error) {
        // Handle error
        console.error("Error during token verification:", error);

      }
    }
    return NextResponse.next();
  }
  
  // Protected paths - check token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Verify token with backend
  try {
    const response = await fetch('http://localhost:5000/api/auth/verify', {
      headers: { 'Cookie': `token=${token}` }
    });
    
    if (!response.ok) {
      const loginResponse = NextResponse.redirect(new URL('/login', request.url));
      loginResponse.cookies.delete('token');
      return loginResponse;
    }
    
    return NextResponse.next();
  } catch (error) {
    const loginResponse = NextResponse.redirect(new URL('/login', request.url));
    loginResponse.cookies.delete('token');
    return loginResponse;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};