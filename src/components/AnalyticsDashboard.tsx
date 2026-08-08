"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/lib/links";

type AnalyticsDashboardProps = {
  links: LinkItem[];
};

type LoadState = "loading" | "ready" | "error";

const SERIES_COLOR = "#2a78d6";
const TRACK_COLOR = "#e1e0d9";

export default function AnalyticsDashboard({ links }: AnalyticsDashboardProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [state, setState] = useState<LoadState>("loading");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/clicks")
      .then((res) => res.json())
      .then((data: Record<string, number>) => {
        if (!cancelled) {
          setCounts(data);
          setState("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const rows = [...links]
    .map((link) => ({ link, count: counts[link.id] ?? 0 }))
    .sort((a, b) => b.count - a.count);

  const total = rows.reduce((sum, row) => sum + row.count, 0);
  const maxCount = Math.max(1, ...rows.map((row) => row.count));

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="rounded-2xl border border-white/60 bg-white/40 px-5 py-4 shadow-[0_4px_20px_-6px_rgba(180,110,60,0.25)] backdrop-blur-md">
        <p className="text-xs text-[#7a6a5c]">총 클릭수</p>
        <p className="mt-1 text-3xl font-semibold text-[#3a2f28]">
          {state === "loading" ? "–" : total.toLocaleString("ko-KR")}
        </p>
      </div>

      <div className="rounded-2xl border border-white/60 bg-white/40 px-5 py-4 shadow-[0_4px_20px_-6px_rgba(180,110,60,0.25)] backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-[#3a2f28]">링크별 클릭수</h2>
          <button
            type="button"
            onClick={() => setShowTable((prev) => !prev)}
            className="rounded-full border border-[#3a2f28]/15 px-3 py-1 text-xs text-[#7a6a5c] transition-colors hover:bg-white/50"
          >
            {showTable ? "차트로 보기" : "표로 보기"}
          </button>
        </div>

        {state === "loading" && (
          <p className="py-2 text-sm text-[#7a6a5c]">불러오는 중…</p>
        )}
        {state === "error" && (
          <p className="py-2 text-sm text-[#7a6a5c]">클릭수를 불러오지 못했어요.</p>
        )}

        {state === "ready" && showTable && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-[#7a6a5c]">
                <th className="pb-2 font-normal">링크</th>
                <th className="pb-2 text-right font-normal">클릭수</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ link, count }) => (
                <tr key={link.id} className="border-t border-[#3a2f28]/10">
                  <td className="py-2 text-[#3a2f28]">{link.label}</td>
                  <td className="py-2 text-right tabular-nums text-[#3a2f28]">
                    {count.toLocaleString("ko-KR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {state === "ready" && !showTable && (
          <ul className="flex flex-col gap-3">
            {rows.map(({ link, count }) => {
              const widthPct = (count / maxCount) * 100;
              const isHovered = hoveredId === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    className="flex w-full flex-col gap-1 rounded-lg text-left outline-none"
                    onMouseEnter={() => setHoveredId(link.id)}
                    onMouseLeave={() => setHoveredId((id) => (id === link.id ? null : id))}
                    onFocus={() => setHoveredId(link.id)}
                    onBlur={() => setHoveredId((id) => (id === link.id ? null : id))}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#3a2f28]">{link.label}</span>
                      <span className="tabular-nums text-[#3a2f28]">
                        {count.toLocaleString("ko-KR")}
                        {isHovered && (
                          <span className="ml-1 text-[#7a6a5c]">회 클릭</span>
                        )}
                      </span>
                    </div>
                    <div
                      className="h-5 w-full overflow-hidden rounded-[4px]"
                      style={{ backgroundColor: TRACK_COLOR }}
                    >
                      <div
                        className="h-full rounded-r-[4px] transition-[width,filter] duration-150"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: SERIES_COLOR,
                          filter: isHovered ? "brightness(1.12)" : undefined,
                        }}
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
