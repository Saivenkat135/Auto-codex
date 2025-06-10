import { WebContainer } from '@webcontainer/api';
import React, { useEffect, useState } from 'react';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer | null; // <- allow null here
}

export function PreviewFrame({  webContainer ,files}: PreviewFrameProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function main() {
    if (!webContainer) {
      console.warn("webContainer not ready yet.");
      return;
    }

    try {
      console.log("🔧 Starting dev server...");

      const installProcess = await webContainer.spawn('npm', ['install']);
      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log("📦 npm install:", data);
          },
        })
      );

      const exitCode = await installProcess.exit;
      if (exitCode !== 0) {
        setError("❌ npm install failed.");
        return;
      }

      const runProcess = await webContainer.spawn('npm', ['run', 'dev']);
      runProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log("▶️ npm run dev:", data);
          },
        })
      );

      webContainer.on('server-ready', (port, url) => {
        console.log("✅ Server ready at:", url);
        setUrl(url);
        setLoading(false);
      });

      
    } catch (err: any) {
      console.error("Unhandled error:", err);
      setError("❗ Something went wrong: " + err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (webContainer) {
      main();
    }
  }, [webContainer]);

  if (!webContainer) {
    return (
      <div className="text-center text-gray-500">
        🌀 Initializing WebContainer...
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {loading && !error && (
        <div className="text-center">
          <p className="mb-2 animate-pulse">⏳ Loading preview...</p>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-center">
          <p>{error}</p>
        </div>
      )}
      {url && (
        <iframe
          width="100%"
          height="100%"
          src={url}
          className="rounded border border-gray-700"
        />
      )}
    </div>
  );
}
