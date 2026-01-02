import { NextResponse } from 'next/server';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { getPayloadClient } from '@/lib/payload';

export const GET = async () => {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    return NextResponse.json({ enabled: false });
  }
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({ slug: 'auth-settings', depth: 0 });
  const entra = settings?.entra;

  return NextResponse.json({
    enabled: Boolean(entra?.enabled && entra?.tenantId && entra?.clientId),
  });
};
