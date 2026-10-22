import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.pokeno);

export default function PokenoLocksmithPage() {
  return <SuburbPage suburb={suburbs.pokeno} />;
}
