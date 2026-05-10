import React from "react";
 
function ToyCard({ toy, onLike, onDonate }) {
  const { id, name, image, likes } = toy;
 
  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      {/* Must match: likes.toString() + " Likes " — note the trailing space */}
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={() => onLike(id, likes)}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={() => onDonate(id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}
 
export default ToyCard;