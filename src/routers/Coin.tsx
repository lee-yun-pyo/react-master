import { useEffect, useState } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router";
import styled from "styled-components";
import { Switch, Route, Link } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchInfoData, fetchPriceData } from "../api";
import { Helmet } from "react-helmet";
import { fetchChartData } from "../api";
import { number } from "yargs";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto; /* 센터로 옴. */
  hr {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Navigator = styled.nav<{ isHeart: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
  }
  button:last-child {
    color: ${(props) => (props.isHeart ? "#E44136" : "#7F7F87")};
  }
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 0;
`;

const TitleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 35px;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const TitlePrice = styled.span`
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const PercentageView = styled.div<{ isLoss: number }>`
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
    color: ${(props) => props.theme.grayColor};
  }
  span:last-child {
    color: ${(props) =>
      props.isLoss > 0
        ? "#E44136"
        : props.isLoss == 0.0
        ? "rgba(0, 0, 0, 0.5)"
        : "#4880EE"};
  }
`;

const Rank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: skyblue;
  padding: 10px 20px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.rankColor};
  span:first-child {
    margin-bottom: 10px;
  }
  span:last-child {
    font-size: 24px;
    font-weight: bolder;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding: 15px 0;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  span {
    font-size: 20px;
    font-weight: 600;
  }
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: gray;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  a {
    font-size: 20px;
    font-weight: bold;
  }
  padding: 12px 0;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  text-transform: uppercase;
  border-bottom: ${(props) =>
    props.isActive ? `5px solid ${props.theme.accentColor}` : "none"};
`;

interface coinIdProps {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface HeartProps {
  heart: boolean;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface priceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
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

function Coin() {
  const { coinId } = useParams<coinIdProps>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const [heart, setHeart] = useState(false);
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchInfoData(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<priceData>(
    ["tickers", coinId],
    () => fetchPriceData(coinId)
  );
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchChartData(coinId)
  );
  const clickHeart = () => setHeart((prev) => !prev);
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
        <script src="https://kit.fontawesome.com/6478f529f2.js"></script>
      </Helmet>
      <Navigator isHeart={heart}>
        <button>
          <a href="/">
            <i className="fas fa-chevron-left fa-2x"></i>
          </a>
        </button>
        <button onClick={clickHeart}>
          <i className="fas fa-heart fa-2x"></i>
        </button>
      </Navigator>
      <Header>
        <TitleHeader>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
          <TitlePrice>
            ${priceData ? priceData?.quotes.USD.price.toFixed(2) : "Loading..."}
          </TitlePrice>
          <PercentageView
            isLoss={priceData ? priceData?.quotes.USD.percent_change_7d : 0}
          >
            <span>1주일 전보다</span>
            <span>
              {priceData
                ? priceData?.quotes.USD.percent_change_7d
                : "Loading..."}
              %
            </span>
          </PercentageView>
        </TitleHeader>
        <Rank>
          <span>Rank</span>
          <span>{infoData ? infoData?.rank : "???"}</span>
        </Rank>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}

      <Section>
        <span>Price Information</span>
      </Section>
      <Tabs>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </Tab>
      </Tabs>

      <Switch>
        <Route path={`/${coinId}/price`}>
          <Price />
        </Route>
        <Route path={`/${coinId}/chart`}>
          <Chart coinId={coinId} />
        </Route>
      </Switch>
      <hr />
    </Container>
  );
}

export default Coin;
