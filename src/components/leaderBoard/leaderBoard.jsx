import { useNavigate } from "react-router-dom";
import cardBackgroundImage from "../../assets/img/leaderboard.png";

const Leaderboard = () => {
  const navigate = useNavigate();

  const hardcodedScores = [
    { email: "kavishananjula@gmail.com", score: 213 },
    { email: "sahan@gmail.com", score: 190 },
    { email: "dinushika@gmail.com", score: 167 },
    { email: "samidu98@gmail.com", score: 150 },
  ];

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="shadow-lg rounded-lg p-6 max-w-md w-full h-[500px]"
        style={{
          backgroundImage: `url(${cardBackgroundImage})`,
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-4 text-black">
          🏆 Leaderboard 🏆
        </h1>

        <div className="overflow-y-auto max-h-80">
          {hardcodedScores.map((user, index) => (
            <div
              key={index}
              className="flex justify-between p-3 mb-2 bg-gray-100 opacity-75 rounded-md shadow-sm"
            >
              <span className="font-semibold">{user.email}</span>
              <span className="text-blue-600">{user.score}</span>
            </div>
          ))}
        </div>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4 mx-auto block shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={goHome}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
