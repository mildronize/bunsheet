import * as React from "react";
import { BottomNavigation } from "@/app/tabs/components/BottomNavigation";
import { AddTransactionTab } from "@/app/tabs/AddTransactionTab";

export interface PageProps { 
  params: { action: string }; 
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      <BottomNavigation currentRouterKey={1} >
        <AddTransactionTab action={params.action} />
      </BottomNavigation>
    </div>
  );
}
