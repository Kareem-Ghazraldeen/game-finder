import { useEffect, useState } from "react";
type Game = {
  id: number;
  name: string;
};
export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadGame() {
      // Bring the Data and test it
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?key=fb02c9d594f0471fa17783096a79e7be",
        );
        // After Bringing the Data convert it to JSON file
        const data = await res.json();
        // Print the Data after the conversion
        console.log(data);
        setGames(data.results);
        // catch the error and print it
      } catch (err) {
        console.log(err);
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
    loadGame(); // Execute the function
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading.....</p>
      ) : (
        games.map((game) => <h2 key={game.id}>{game.name}</h2>)
      )}
    </div>
  );
}
