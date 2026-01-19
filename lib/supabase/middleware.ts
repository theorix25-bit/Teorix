import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../../lib/utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip middleware check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.

  await supabase.auth.refreshSession();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const path = request.nextUrl.pathname;
  const publicRoutes = [
    "/",
    "/aviso-legal",
    "/politicas-de-cookies",
    "/privacidad",
    "/devoluciones",
    "/pagos",
    "/login",
    "/auth",
    "/success",
    "/blog",
    "/api",
    "/sitemap.xml",
    "/sitemap-0.xml",
    "/robots.txt",
  ];
  const adminRoutes = ["/admin"];

  // const isPublic = publicRoutes.some((r) => path.startsWith(r));
  const isPublic = publicRoutes.some((r) =>
    r === "/" ? path === "/" : path.startsWith(r)
  );
  const idAdminRoute = adminRoutes.some((r) => path.startsWith(r));

  const role = data?.claims.app_metadata?.role;

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (idAdminRoute && role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
export const config = {
  matcher: ["/admin/:path*", "/formulas/:path*"],
};
