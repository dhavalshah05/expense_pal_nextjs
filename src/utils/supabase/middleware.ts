import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import {homePageRoute, loginPageRoute, registerPageRoute} from "@/utils/routing/route-names";
import {CookieOptions} from "@supabase/ssr/src/types";

export async function updateSession(request: NextRequest) {
    let cookiesToSetLater: { name: string; value: string; options: CookieOptions }[] = []

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value}) => request.cookies.set(name, value))
                    cookiesToSetLater = cookiesToSet
                },
            },
        }
    )

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (
        !user &&
        !request.nextUrl.pathname.startsWith(loginPageRoute()) &&
        !request.nextUrl.pathname.startsWith(registerPageRoute())
    ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone()
        url.pathname = loginPageRoute()
        return NextResponse.redirect(url)
    }

    /**
     * If user is found, it should not open login or register page.
     */
    if (
        user &&
        (
            request.nextUrl.pathname.startsWith(loginPageRoute())
            || request.nextUrl.pathname.startsWith(registerPageRoute())
        )
    ) {
        const url = request.nextUrl.clone()
        url.pathname = homePageRoute()
        return NextResponse.redirect(url)
    }

    const requestHeaders = new Headers(request.headers)
    if (user) {
        requestHeaders.set('x-user-id', user.id)
    }

    const response = NextResponse.next({
        request: {
            // Pass the entire request but override headers
            ...request,
            headers: requestHeaders,
        },
    })

    cookiesToSetLater.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options)
    })

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return response;
}
