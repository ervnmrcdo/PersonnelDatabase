import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  const supabaseResponse = await updateSession(request)

  const pathname = request.nextUrl.pathname

  // role-protected route mapping
  const roleMap: { path: string; role: string }[] = [
    { path: '/admin-home', role: 'admin' },
    { path: '/teaching-home', role: 'teaching' },
    { path: '/nonteaching-home', role: 'nonteaching' },
  ]

  const match = roleMap.find(r => pathname === r.path || pathname.startsWith(r.path + '/'))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(_: any) {
          return
        },
      },
    }
  )

  const { data: { user } = {} } = await supabase.auth.getUser()

  if (match) {
    // if not authenticated, redirect to login
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (!profile || profile.role !== match.role) {
      const fallback = profile?.role === 'admin' ? '/admin-home' : profile?.role === 'teaching' ? '/teaching-home' : profile?.role === 'nonteaching' ? '/nonteaching-home' : '/account'
      const url = request.nextUrl.clone()
      url.pathname = fallback
      return NextResponse.redirect(url)
    }
  }
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
