import GameStart from "../components/GameStart";
import LeaderBoard from "../components/leaderBoard";
function GamePage(props) {
  return (
    <div className="d-flex flex-row">
      <div className="col-9">
        <GameStart props={props} />
      </div>
      <div className="col-3">
        <LeaderBoard id={props.match.params.id} />
      </div>
    </div>
  );
}
export default GamePage;
