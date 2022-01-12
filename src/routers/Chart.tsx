import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchChartData } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChart {
  coinId: string;
  during: number;
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

function Chart({ coinId, during }: IChart) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchChartData(coinId, during)
  );
  console.log(
    data
      ? ((data[data.length - 1].close - data[0].close) / data[0].close) * 100
      : "undefi"
  );
  console.log(data ? "오늘: " + data[data.length - 1].close : "undifie");
  console.log(data ? "그때: " + data[0].close : "undo");
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
              mode: isDark ? "dark" : "light",
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
