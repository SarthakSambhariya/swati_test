import React from "react";
import constants from "../../services/constants";
import MagCards from "./magCards";

const Cards = ({category}) => {
  console.log(category.blogs.length);
  return (
    <>
    <p className="mt-3 fs-4">{category.name}</p>
    <div className="row mt-3">
      
      {category.blogs.map(d => (<MagCards id={d._id} category={category.pathname} title={d.title} image={constants.apiurl+d.image} description={d.description} />))}
      </div>
  </>
  );
};

export default Cards;
