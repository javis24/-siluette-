// components/ui/dialog.tsx
'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

export function Dialog({ open, onOpenChange, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
}

export function DialogContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-40" />
      <DialogPrimitive.Content className={`fixed z-50 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg ${className}`}>
        <DialogPrimitive.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <X className="w-5 h-5" />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return (
    <DialogPrimitive.Title className="text-xl font-bold text-gray-900 dark:text-white">
      {children}
    </DialogPrimitive.Title>
  );
}

