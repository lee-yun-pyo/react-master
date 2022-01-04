import { useEffect, useState } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router";
import styled from "styled-components";
import { Switch, Route, Link } from "react-router-dom";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchInfoData, fetchPriceData } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto; /* 센터로 옴. */
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 35px;
  color: ${(props) => props.theme.accentColor};
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

function Coin() {
  const { coinId } = useParams<coinIdProps>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchInfoData(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<priceData>(
    ["tickers", coinId],
    () => fetchPriceData(coinId)
  );
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
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
    </Container>
  );
}

export default Coin;
