import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardItem from "../reusableComponents/CardItem/CardItem";
import { BeerItem } from "../../interfaces/interfaces";
import { LinkText, ListContainer } from "../List/styled";
import { NoItemsCard } from "./styled";
const Favourites = () => {
  const [favouriteList, setFavouriteList] = useState<BeerItem[]>([]);
  const favorites = localStorage.getItem("favorites");
  const removeFavourite = (beer: BeerItem) => {
    const updatedFavouriteList = favouriteList.filter(
      (selectedBeer: BeerItem) => selectedBeer.id !== beer.id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavouriteList));
    setFavouriteList(updatedFavouriteList);
  };
  useEffect(() => {
    if (favorites) {
      const list = JSON.parse(favorites);
      setFavouriteList(list);
    }
  }, [favorites]);
  return (
    <>
      {" "}
      <div style={{ textAlign: "center" }}>My favourites beers</div>
      <div style={{ textAlign: "center" }}>
        <Link to={`/`}>
          <LinkText>Go back to the List</LinkText>
        </Link>{" "}
      </div>
      {favouriteList.length === 0 ? (
        <NoItemsCard>
          Seems like there isn't any items added as favourites
        </NoItemsCard>
      ) : (
        <>
          <ListContainer>
            {favouriteList.map((beer: BeerItem) => (
              <CardItem
                key={beer.id}
                beer={beer}
                text={"Remove from favs"}
                name={beer.name}
                image_url={beer.image_url}
                addOrRemove={removeFavourite}
              />
            ))}
          </ListContainer>
        </>
      )}
    </>
  );
};

export default Favourites;
