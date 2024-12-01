import { useEffect, useState } from 'react';
import './BananaGame.css';
import { useDispatch, useSelector } from "react-redux";
import { setScore, setReady, setPause } from '../../state/engine/engineSlice';
import toast from 'react-hot-toast';

export const BananaGame = () => {
  const score = useSelector(state => state.engine.score);
  const level = useSelector(state => state.engine.level); // Added level selector
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [answer, setAnswer] = useState(0);
  const [timer, setTimer] = useState(30);
  const [round, setRound] = useState(1); // Track current round
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showWinnerButton, setShowWinnerButton] = useState(false); // New state

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsTimeUp(true);
      toast.error('Time is up!');
    }
  }, [timer]);

  useEffect(() => {
    // Show "You Are Winner!" button after Level 3
    if (level >= 3 && round > 3) {
      setTimeout(() => setShowWinnerButton(true), 3000); // Show after 3 seconds
    }
  }, [level, round]);

  const getData = async () => {
    const result = await fetch('/uob/banana/api.php?out=json');
    const data = await result.json();
    setData(data);
    console.log(data);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setAnswer(value);
  };

  const handleCheck = () => {
    if (isTimeUp) {
      toast.error("Time is up! Cannot submit.");
      return;
    }

    if (data.solution == answer) {
      toast.success('Answer is correct!');
      setTimeout(() => {
        dispatch(setScore(score + 10));
        dispatch(setReady(true));
        dispatch(setPause(false));
        advanceRound();
      }, 2000);
    } else {
      toast.error('Answer is incorrect!');
    }
  };

  const handleTryAgain = () => {
    const newTimer = round === 1 ? 30 : round === 2 ? 20 : 10;
    setTimer(newTimer);
    setAnswer(0);
    setIsTimeUp(false);
    getData();
    toast.dismiss();
  };

  const advanceRound = () => {
    if (round < 3) {
      setRound(round + 1);
      const newTimer = round === 1 ? 20 : 10;
      setTimer(newTimer);
      setAnswer(0);
      setIsTimeUp(false);
      getData();
    } else {
      toast.success('Congratulations! You have completed all rounds!');
    }
  };

  const handleWinnerClick = () => {
    // Redirect to a leaderboard or winner's page
    window.location.href = "http://localhost:5173/leaderboard"; // Adjust URL as needed
  };

  return (
    <div className="banana-game">
      {/* Timer */}
      <div
        className={`timer-container ${timer <= 10 ? 'highlight-timer' : ''}`}
      >
        <p>{timer}s</p>
      </div>

      {/* Welcome Header */}
      <div className="welcome-header">
        <h1>Welcome to the Banana Game!</h1>
      </div>

      {/* Game Content */}
      {data && !isTimeUp && (
        <img className="banana-game-image" src={data.question} alt="Banana Game" />
      )}

      {!isTimeUp ? (
        <>
          <h2>Round {round}: Enter the number shown on the Banana</h2>
          <input
            className='banana-game-input'
            autoFocus
            type="number"
            min="0"
            max="9"
            onChange={handleInputChange}
          />
          <button onClick={handleCheck}>Check</button>
        </>
      ) : (
        <div className="time-up-container">
          <h2>Time is up!</h2>
          <button className="try-again-button" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}

      {/* Winner Button */}
      {showWinnerButton && (
        <div className="winner-button-container">
          <button className="winner-button" onClick={handleWinnerClick}>
            You Are Winner! Enter Leaderboard
          </button>
        </div>
      )}
    </div>
  );
};
