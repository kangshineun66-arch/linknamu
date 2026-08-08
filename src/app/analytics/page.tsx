import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { links } from "@/lib/links";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 items-start justify-center px-6 py-20 sm:px-8">
      <main className="flex w-full max-w-md flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#3a2f28]">
            링크 클릭 통계
          </h1>
          <p className="text-sm text-[#7a6a5c]">
            어떤 링크가 가장 많이 클릭됐는지 확인해보세요
          </p>
        </div>
        <AnalyticsDashboard links={links} />
      </main>
    </div>
  );
}
