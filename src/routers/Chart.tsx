import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchChartData } from "../api";

interface ICoinId {
  coinId: string;
}

function Chart({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchChartData(coinId)
  );
  return <div>Chart</div>;
}

export default Chart;
