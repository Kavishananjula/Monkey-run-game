import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore, setLastScore } from "../../state/engine/engineSlice";
import "./Score.css";

export const Score = () => {
  const score = useSelector(state => state.engine.score);
  const count = useSelector(state => state.engine.level);
  const lastScore = useSelector(state => state.engine.lastScore);
  const play = useSelector(state => state.engine.play);
  const die = useSelector(state => state.engine.die);
  const dispatch = useDispatch();

  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    if (play && !die) {
      setTimeout(() => {
        dispatch(setScore(score + 1));
      }, 100);
    }
    if (score && !play) {
      dispatch(setLastScore(score));
    }

    // Show "Continue" button 30 seconds after Level 3
    if (count === 3 && !play && !die) {
      setTimeout(() => {
        setShowContinueButton(true); // Show button after 30 seconds
      }, 40000); // 30 seconds delay
    }
  }, [dispatch, play, score, lastScore, die, count]);

  const handlePauseClick = () => {
    dispatch(setPlay(false)); // Pause the game
  };

  const handlePlayClick = () => {
    dispatch(setPlay(true)); // Resume the game
  };

  const handleRestartClick = () => {
    // Restart the game
    window.location.reload();
  };

  const handleContinueClick = () => {
    // Redirect to the leaderboard page after Level 3
    window.location.href = "http://localhost:5173/leaderboard"; // Updated URL
  };

  return (
    <div className="score-container">
      {/* Left side: Pause, Play, Restart buttons */}
      <div className="score-left">
        <button className="pause-btn" onClick={handlePauseClick}>
          Pause
        </button>
        <button className="play-btn" onClick={handlePlayClick}>
          Play
        </button>
        <button className="restart-btn" onClick={handleRestartClick}>
          Restart
        </button>

        {/* Score and Level Display horizontally next to each other */}
        <div className="score-level">
          {play && (
            <>
              <p className="score text-white highlight">Score: {score}</p>
              <p className="level text-white highlight">Level: {count}</p>
            </>
          )}
          {!play && (
            <>
              <p className="score text-white highlight">Score: {lastScore}</p>
              <p className="level text-white highlight">Level: {count}</p>
            </>
          )}
        </div>
      </div>

      {/* Show "Continue" button after 30 seconds of Level 3 */}
      {showContinueButton && (
        <div className="continue-btn-container" style={{ textAlign: 'center', marginTop: '300px' }}>
          <button className="continue-btn" onClick={handleContinueClick}>
            You are Winner! Enter Leaderboard
          </button>
        </div>
      )}
    </div>
  );
};
