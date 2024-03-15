import { LinkAndTrack } from 'linketrackjs';
import { GetTrackResponse } from '../types/linkAndTrack.interface';

export const trackNumber = async (
  trackingNumber: string,
): Promise<GetTrackResponse> => {
  const linkAndTrack = new LinkAndTrack(
    process.env.LINKTRACK_USER,
    process.env.LINKTRACK_TOKEN,
  );

  const track = await linkAndTrack.track(trackingNumber);

  return track;
};
