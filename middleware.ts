import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        if (pathname === "/") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ req, token }) {
                 const {pathname} = req.nextUrl;
                 if(
                    pathname.startsWith("api/auth") ||
                    pathname ==="/login" ||
                    pathname ==="/register"
                 )
                 return true;
                 if(pathname ==="/" || pathname.startsWith("/api/auth"))
                { return true;}
                 return !!token;
                
            },
        },
    }
);
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};