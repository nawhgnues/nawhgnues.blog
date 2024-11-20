import { useEffect } from "react";

export default function useWatchTimeout(watch: unknown, ms: number, callback: () => void) {
  useEffect(() => {
    let timeOut: NodeJS.Timeout;

    if (watch) {
      timeOut = setTimeout(callback, ms);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timeOut && clearInterval(timeOut);
    };
  }, [callback, ms, watch]);
}
