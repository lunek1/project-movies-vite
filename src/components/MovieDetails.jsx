import { useState, useEffect } from "react";

export const MovieDetails = ({ movieInfo }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieInfo.id}?api_key=16acb76adef1d58ee25a3967ffcab15d&append_to_response=credits`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieInfo.id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, overview, vote_average, genres, credits, release_date } =
    movieDetails;

  return (
    <div className="movie-box">
      <div className="movie-details">
        <h2>{title}</h2>
        <p>
          <span className="bold">⭐ IMDb:</span> {vote_average.toFixed(1)}
        </p>
        <p>
          <span className="bold">Genres:</span>{" "}
          {genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <span className="bold">Director:</span>{" "}
          {credits.crew.find((member) => member.job === "Director").name}
        </p>
        <p>
          <span className="bold">Actors:</span>{" "}
          {credits.cast
            .slice(0, 3)
            .map((actor) => actor.name)
            .join(", ")}
        </p>
        <p>
          <span className="bold">Release:</span> {release_date}
        </p>
        <p>{overview}</p>
      </div>
    </div>
  );
};