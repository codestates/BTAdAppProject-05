interface VCoinsProps {
  count: number;
}

function VCoins({ count }: VCoinsProps) {
  return <div>{count}</div>;
}

export default VCoins;
