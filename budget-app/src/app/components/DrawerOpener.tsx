"use client";
import { Drawer } from "vaul";
import { AddTransactionTab } from "../tabs/AddTransactionTab";
export function DrawerOpener() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <button>Add Transaction</button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[16px]">
            <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[16px]">
              <AddTransactionTab />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
