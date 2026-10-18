import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.henderson);

export default function HendersonLocksmithPage() {
  return <SuburbPage suburb={suburbs.henderson} />;
}
