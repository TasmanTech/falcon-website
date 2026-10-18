import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.albany);

export default function AlbanyLocksmithPage() {
  return <SuburbPage suburb={suburbs.albany} />;
}
