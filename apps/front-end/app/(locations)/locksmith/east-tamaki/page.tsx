import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.eastTamaki);

export default function EastTamakiLocksmithPage() {
  return <SuburbPage suburb={suburbs.eastTamaki} />;
}
