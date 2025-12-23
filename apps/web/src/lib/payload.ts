
import { getPayload } from 'payload';
import config from '../../payload.config';

/**
 * Provides a shared instance of the Payload local API.
 * In production, this ensures the connection to the DB is reused.
 */
export const getPayloadClient = async () => {
  return await getPayload({
    config,
  });
};
