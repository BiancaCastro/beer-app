import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//@ts-ignore next-line
import { getBeerList } from "../../services/index.ts";
import { BeerItem } from "../interfaces/interfaces";
import { Card, ListContainer, Image, Button, LinkText } from "./styled";
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

  const addToFavorite = (beer:BeerItem) => {
    const newFavorites = [...new Set([...favoriteList, beer])];
    setFavoriteList(newFavorites);
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
          {beerList.map((beer, index) => (
            <Card key={beer.id}>
              {" "}
              <Button
                disabled={favoriteList.some(
                  (favoriteBeer) => favoriteBeer.id === beer.id
                )}
                onClick={() => addToFavorite(beer)}
              >
                <span>Add to favs</span>
              </Button>
              <Image src={beer.image_url}></Image> <span>{beer.name}</span>
              <span>Attenuation level: {beer.attenuation_level}</span>
              <p>{beer.description}</p>
            </Card>
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
