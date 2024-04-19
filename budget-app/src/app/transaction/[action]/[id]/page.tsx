import * as React from "react";
import { BottomNavigation } from "@/app/tabs/components/BottomNavigation";
import { AddTransactionTab } from "@/app/tabs/AddTransactionTab";
import { TransactionDataContainer } from "./TransactionDataContainer";

export interface PageProps {
  params: { action: string; id: string };
}

export default function TransactionSinglePage({ params }: PageProps) {
  console.log('params',params);
  return (
    <div>
      <BottomNavigation currentRouterKey={1}>
        <TransactionDataContainer action={params.action} id={params.id} />
      </BottomNavigation>
    </div>
  );
}
