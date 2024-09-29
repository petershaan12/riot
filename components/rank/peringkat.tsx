import Champion from "@/public/assets/rank/Champion.js";
import Jogger from "@/public/assets/rank/Jogger.js";
import Marathon from "@/public/assets/rank/Marathon.js";
import Runner from "@/public/assets/rank/Runner.js";

type RankProps = {
  rank: number;
};

const Peringkat = ({ rank }: RankProps) => {
  if (rank > 50000) {
    return <Champion />;
  } else if (rank > 25000) {
    return <Runner />;
  } else if (rank > 15000) {
    return <Marathon />;
  } else if (rank > 0) {
    return <Jogger />;
  } else {
    return null;
  }
};

export default Peringkat;
