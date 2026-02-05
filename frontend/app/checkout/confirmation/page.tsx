import { Suspense } from "react";
import ConfirmationClient from "@/app/checkout/confirmation/confirmation-client";

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="card-surface p-8">Loading confirmation...</div>}>
      <ConfirmationClient />
    </Suspense>
  );
}
