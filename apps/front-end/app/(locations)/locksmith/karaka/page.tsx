import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.karaka);

export default function KarakaLocksmithPage() {
  return <SuburbPage suburb={suburbs.karaka} />;
}
