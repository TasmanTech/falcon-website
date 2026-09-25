import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Log In",
  robots: { index: false, follow: false },
};

/**
 * Admin login page. Signed-in admins are redirected to `/admin` by the proxy.
 *
 * @returns {JSX.Element} The login screen.
 */
export default function AdminLoginPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="bg-brand-dark px-4 pt-14 pb-24 text-center">
        <Image
          src="/falcon_access_logo.webp"
          alt="Falcon Access"
          width={64}
          height={64}
          className="mx-auto rounded-2xl bg-white p-1.5"
          priority
        />
        <h1 className="mt-4 font-montserrat text-2xl font-bold text-white">Falcon Access Admin</h1>
        <p className="mt-1 text-sm text-white/70">Log in to create and send invoices.</p>
      </div>
      <div className="-mt-14 px-4 pb-10">
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 animate-card-ready animate-play">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
