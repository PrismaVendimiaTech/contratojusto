import { NextResponse } from 'next/server';
import { getRuntimeMode } from '@/lib/runtime-config';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    mode: getRuntimeMode(),
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  });
}
