import { Suspense } from "react";
import AccountClient from "@/app/account/account-client";

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="card-surface p-8">Loading account...</div>}>
      <AccountClient />
    </Suspense>
  );
}
