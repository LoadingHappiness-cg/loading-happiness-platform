import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export const GET = async () => {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({ slug: 'auth-settings', depth: 0 });
  const entra = settings?.entra;

  return NextResponse.json({
    enabled: Boolean(entra?.enabled && entra?.tenantId && entra?.clientId),
  });
};
