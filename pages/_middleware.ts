import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const {pathname} = req.nextUrl;
    if(pathname === '/') {
        return NextResponse.redirect('/blogs');
    }
    return NextResponse.next();
}