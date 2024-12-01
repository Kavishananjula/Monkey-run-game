import { useEffect, useState } from "react";
import "./LoadingScreen.css";
import { setLoadingScreen } from "../../state/engine/engineSlice";
import { useDispatch } from "react-redux";

export const LoadingScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        const nextValue = prev + 1;
        if (nextValue > 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return nextValue;
      });
    }, 50); // Updates every 50ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen-container">
      {!isReady && (
        <div className="loading-box">
          <h1 className="loading-title">Loading game...</h1>
          <div className="loading-bar-container">
            <div
              className="loading-bar"
              style={{
                width: `${loadingPercent}%`,
                background: `linear-gradient(90deg, #f8c00b ${loadingPercent}%, #ffee58)`,
              }}
            ></div>
          </div>
          <div className="loading-details">
            <span className="loading-percentage">{loadingPercent}%</span>
          </div>
        </div>
      )}
      {isReady && (
        <button
          className="enter-button"
          onClick={() => dispatch(setLoadingScreen(false))}
        >
          Play game
        </button>
      )}
    </div>
  );
};
