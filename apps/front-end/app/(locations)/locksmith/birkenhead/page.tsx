import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.birkenhead);

export default function BirkenheadLocksmithPage() {
  return <SuburbPage suburb={suburbs.birkenhead} />;
}
