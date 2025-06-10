// useWebContainer.ts
import { useEffect, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

let webContainerInstance: WebContainer | null = null;

export function useWebContainer() {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);

  useEffect(() => {
    const boot = async () => {
      if (!webContainerInstance) {
        console.log("Creating web container 1 from useWebContaier");
        
        webContainerInstance = await WebContainer.boot();
      }
      setWebContainer(webContainerInstance);
    };
    boot();
  }, []);

  return webContainer;
}
