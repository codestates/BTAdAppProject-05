interface VCoinProps {
  amount: number;
}

function VCoin({ amount = 10 }: VCoinProps) {
  return <div>{amount}</div>;
}

export default VCoin;
