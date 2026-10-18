import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.takapuna);

export default function TakapunaLocksmithPage() {
  return <SuburbPage suburb={suburbs.takapuna} />;
}
