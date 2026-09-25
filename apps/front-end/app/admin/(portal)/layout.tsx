import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { logoutAction } from "@/app/actions/auth";
import PortalNav from "./PortalNav";

/**
 * Layout for signed-in admin pages: a compact sticky header with the brand and a
 * sign-out button, section tabs, and a narrow, phone-friendly content column.
 *
 * @param {object} props - The layout props.
 * @param {React.ReactNode} props.children - The portal page.
 * @returns {JSX.Element} The portal shell.
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30 bg-brand-dark text-white">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/falcon_access_logo.webp"
              alt=""
              width={32}
              height={32}
              className="rounded-lg bg-white p-0.5"
            />
            <span className="font-montserrat text-base font-bold">Falcon Access</span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold">Admin</span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
            >
              <FiLogOut aria-hidden size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </header>
      <PortalNav />
      <main className="mx-auto w-full max-w-2xl px-4 pt-4">{children}</main>
    </>
  );
}
