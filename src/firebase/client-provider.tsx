'use client';

import { initializeFirebase } from './index';
import { ReactNode, useEffect, useState } from 'react';

export default function FirebaseClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (!isFirebaseInitialized) {
      initializeFirebase();
      setIsFirebaseInitialized(true);
    }
  }, [isFirebaseInitialized]);

  return <>{children}</>;
}
