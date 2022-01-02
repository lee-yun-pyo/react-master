import { useParams } from "react-router";

interface coinIdProps {
    coinId: string,
}

function Coin() {
    const {coinId} = useParams<coinIdProps>();
    return <div>Coin {coinId}</div>
}

export default Coin;