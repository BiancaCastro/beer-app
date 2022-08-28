import React from "react";
import { BeerItem } from "../../../interfaces/interfaces";
import { Button, Card, Image } from "./styled";

type CardDetail = {
  addOrRemove: Function;
  beer: BeerItem;
  image_url: string;
  name: string;
  text: string;
  attenuation?: string;
  description?: string;
  favorite?: any;
};

const CardItem = ({
  text,
  addOrRemove,
  image_url,
  favorite,
  name,
  attenuation,
  description,
  beer,
}: CardDetail) => {
  return (
    <Card>
      <Button favorite={favorite} onClick={() => addOrRemove(beer)}>
        <span> {text}</span>
      </Button>
      <Image src={image_url} alt={name}></Image> <span>{name}</span>
      <span>Attenuation level: {attenuation}</span>
      <p>{description}</p>
    </Card>
  );
};

export default CardItem;
