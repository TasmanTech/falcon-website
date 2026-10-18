import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.newLynn);

export default function NewLynnLocksmithPage() {
  return <SuburbPage suburb={suburbs.newLynn} />;
}
