"use client";

import { useEffect, useState } from "react";

export default function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    function tick() {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: timezone || "UTC",
        }).format(new Date());
        setTime(formatted);
      } catch {
        setTime("--:--:--");
      }
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return <span className="font-mono tabular-nums">{time}</span>;
}
