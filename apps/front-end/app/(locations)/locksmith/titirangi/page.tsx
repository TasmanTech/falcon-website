import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.titirangi);

export default function TitirangiLocksmithPage() {
  return <SuburbPage suburb={suburbs.titirangi} />;
}
