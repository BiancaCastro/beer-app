import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//@ts-ignore next-line
import { getBeerList } from "../../services/index.ts";
import CardItem from "../reusableComponents/CardItem/CardItem";
import { BeerItem } from "../../interfaces/interfaces";
import {  ListContainer, LinkText } from "./styled";
const BeerList = () => {
  const [beerList, setBeerList] = useState<BeerItem[]>([]);
  const [loading, setIsloading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteList, setFavoriteList] = useState(() => {
    const list = localStorage.getItem("favorites");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  });
  const getList = async () => {
    try {
      const response = await getBeerList().then((res) => res.json());
      setBeerList(response);
    } catch (error) {
      setError("Something has happening, let us check again");
    } finally {
      setIsloading(false);
    }
  };

  const addToFavorite = (beer: BeerItem) => {
    const newFavorites = [...new Set([...favoriteList, beer])];
    setFavoriteList(newFavorites);
  };
  const removeFromFavorite = (beer: BeerItem) => {
    const newFavorites = favoriteList.filter((x:BeerItem) => x.id !== beer.id);
    setFavoriteList(newFavorites);
  };
  const checkIfBeerIsFavorite = (beer: BeerItem) => {
    return favoriteList.some((x:BeerItem) => x.id === beer.id);
  };

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
  }, [favoriteList]);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {" "}
        <Link to={`/favourites`}>
          <LinkText>Go to My Favourite List</LinkText>
        </Link>
      </div>
      {loading || error ? (
        <div>Loading</div>
      ) : (
        <ListContainer>
          {" "}
          {beerList.map((beer: BeerItem) => (
            <CardItem
              key={beer.id}
              beer={beer}
              favorite={checkIfBeerIsFavorite(beer)}
              text={
                checkIfBeerIsFavorite(beer) ? "Remove from favs" : "Add to favs"
              }
              addOrRemove={
                checkIfBeerIsFavorite(beer) ? removeFromFavorite : addToFavorite
              }
              image_url={beer.image_url}
              name={beer.name}
              attenuation={beer.attenuation_level}
              description={beer.description}
            />
          ))}
        </ListContainer>
      )}
      {error && (
        <span style={{ display: "block", marginTop: "20px" }}>{error}</span>
      )}
    </>
  );
};

export default BeerList;
