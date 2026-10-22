import SuburbPage, { suburbMetadata } from '@/components/SuburbPage';
import { suburbs } from '@/lib/suburbs';

export const metadata = suburbMetadata(suburbs.blockhouseBay);

export default function BlockhouseBayLocksmithPage() {
  return <SuburbPage suburb={suburbs.blockhouseBay} />;
}
