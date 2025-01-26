import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const authPages = ["/auth/login", "/auth/register", "/auth/forgetPassword", "/reset-password", "/verify-email"]
export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl.pathname
    // console.log(token);


    // Redirect to home page if use authenticated or trying to access auth pages
    if (token && authPages.includes(url)) {
        const redirectUrl = new URL("/", request.nextUrl.origin)
        return NextResponse.rewrite(redirectUrl)
    }

    // Redirect to login if not authenticated or trying to access protected pages
    if (!token && !authPages.includes(url)) {
        const redirectUrl = new URL("/auth/login", request.nextUrl.origin)
        return NextResponse.rewrite(redirectUrl)
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
