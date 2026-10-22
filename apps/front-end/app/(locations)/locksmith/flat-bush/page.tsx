import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.flatBush);

export default function FlatBushLocksmithPage() {
  return <SuburbPage suburb={suburbs.flatBush} />;
}
