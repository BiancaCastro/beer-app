import { Suspense } from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import BeerList from "./components/List/List.tsx";
import FavouritesList from "./components/Favourites/Favourites.tsx";

function App() {
  return (
    <Suspense fallback="loading">
      <h5 style={{ textAlign: "center" }}>Beer List</h5>
      <BrowserRouter>
        <Routes>
          {" "}
          <Route path="/" element={<BeerList />} />
          <Route path="/favourites" element={<FavouritesList />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
