import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchChartData } from "../api";
import ApexChart from "react-apexcharts";

interface ICoinId {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchChartData(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              width: 500,
              height: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#2ecc71"],

                stops: [0, 100],
              },
            },
            colors: ["#3498db"],
            yaxis: {
              show: false,
              labels: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
          }}
          type="line"
        />
      )}
    </div>
  );
}

export default Chart;
