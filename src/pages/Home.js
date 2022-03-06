import React from "react";
import MovieList from "../components/MovieList";
import GenresMenu from "../components/GenresMenu";

function Home() {
  return (
    <main>
      <section>
        <div>
          <h2>The Movie DB</h2>
        </div>
        <div>
          <GenresMenu />
          <MovieList />
        </div>
      </section>
    </main>
  );
}

export default Home;
