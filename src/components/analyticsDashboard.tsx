import { BarChart, Card } from "@tremor/react";
import { analytics } from "@/utils/analytics";
import ReactCountryFlag from "react-country-flag";
import { ArrowUpRight, ArrowDownRight, ArrowRight } from "lucide-react";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  noVisitorsToday: number;
  timeseriesPageViews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  const isPositiveClassName =
    "bg-green-900/25 text-green-400 ring-green-400/25";
  const isNegativeClassName = "bg-red-900/25 text-red-400 ring-red-400/25";
  const isNeutralClassName = "bg-zinc-900/25 text-zinc-400 ring-zinc-400/25";
  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
      ${
        isPositive
          ? isPositiveClassName
          : isNeutralClassName
          ? isNeutralClassName
          : isNegativeClassName
      }
      
      `}
    >
      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : null}
      {isNegative ? <ArrowDownRight className="h-3 w-3" /> : null}
      {isNeutral ? <ArrowRight className="h-3 w-3" /> : null}
      {percentage.toFixed(0)}%
    </span>
  );
};

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  noVisitorsToday,
  timeseriesPageViews,
  topCountries,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div
        className="grid w-full mx-auto grid-cols-1 
    sm:grid-cols-2 gap-6
    "
      >
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg visitors/day{" "}
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="flex items-center gap-2.5 text-tremor-default text-dark-tremor-content">
            Visitors today
            <Badge
              percentage={
                (noVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100
              }
            />
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {noVisitorsToday}
          </p>
        </Card>
      </div>

      <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
        <h2 className="w-full text-dark-tremor-content-strong text-center sm:-left-full font-semibold text-xl">
          This week's top countries:
        </h2>
        <div className="col-span-3 flex items-center justify-between flex-wrap gap-8">
          {topCountries.map(([countryCode, number], index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-3 text-dark-tremor-content-strong"
              >
                <p className="hidden sm:block text-tremor-content">
                  {countryCode}
                </p>
                <ReactCountryFlag
                  className="text-5xl sm:text-3xl"
                  svg
                  countryCode={countryCode}
                />

                <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                  {number}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        {timeseriesPageViews ? (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={timeseriesPageViews.map((data) => {
              return {
                name: data.date,
                Visitors: data.events.reduce((acc, curr) => {
                  return acc + Object.values(curr)[0]!;
                }, 0),
              };
            })}
            categories={["Visitors"]}
            index="name"
          />
        ) : null}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
