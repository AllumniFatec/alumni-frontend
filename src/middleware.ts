import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthRoutes, MembersRoutes } from "@/config/routes";

const TOKEN_COOKIE = "access_token";

const PUBLIC_AUTH_PATHS = Object.values(AuthRoutes) as string[];
const PROTECTED_PATHS = Object.values(MembersRoutes) as string[];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  const isAuthPath = PUBLIC_AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  const isMembersPath = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  // Sem token tentando acessar área protegida → redireciona pro login
  if (!token && isMembersPath) {
    return NextResponse.redirect(new URL(AuthRoutes.SignIn, request.url));
  }

  // Com token tentando acessar páginas de auth → redireciona pra área de membros
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL(MembersRoutes.Members, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware em todas as rotas exceto:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon e arquivos públicos com extensão
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)",
  ],
};
