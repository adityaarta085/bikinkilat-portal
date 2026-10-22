import { NextResponse } from 'next/server';
import { RELEASES } from '@/lib/changelog';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  let results = RELEASES;

  if (category && category !== 'Semua') {
    results = results.filter(
      (r) =>
        r.categories.includes(category) ||
        r.impactedServices.some((s) => s.name.toLowerCase().includes(category.toLowerCase()))
    );
  }

  if (limit && !isNaN(limit)) {
    results = results.slice(0, limit);
  }

  return NextResponse.json({
    status: 'success',
    totalReleases: RELEASES.length,
    returnedReleases: results.length,
    latestVersion: RELEASES[0]?.version || 'v2.4.0',
    data: results,
  });
}
