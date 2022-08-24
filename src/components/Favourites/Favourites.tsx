import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BeerItem } from "../interfaces/interfaces";
import { Button, Card, Image, LinkText, ListContainer } from "../List/styled";
import { NoItemsCard } from "./styled";
const Favourites = () => {
  const [favouriteList, setFavouriteList] = useState<BeerItem[]>([]);
  const favorites = localStorage.getItem("favorites");
  const removeFavourite = (id) => {
    const updatedFavouriteListe = favouriteList.filter(
      (beer: BeerItem) => beer.id !== id.id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavouriteListe));
    setFavouriteList(updatedFavouriteListe);
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
            {favouriteList.map((beer, index) => (
              <Card key={beer.id}>
                {beer.name}
                <Image src={beer.image_url}></Image>
                <Button onClick={() => removeFavourite(beer)}>
                  Remove from favs
                </Button>
              </Card>
            ))}
          </ListContainer>
        </>
      )}
    </>
  );
};

export default Favourites;
