import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET — load all toys on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // POST — create a new toy (likes starts at 0)
  function handleAddToy(toyData) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...toyData, likes: 0 }),
    })
      .then((res) => res.json())
      .then((newToy) => setToys((prev) => [...prev, newToy]));
  }

  // PATCH — increment likes, preserve array order
  function handleLike(id, currentLikes) {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) =>
        setToys((prev) =>
          prev.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
        )
      );
  }

  // DELETE — donate (remove) a toy
  function handleDonate(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
      setToys((prev) => prev.filter((toy) => toy.id !== id))
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onLike={handleLike} onDonate={handleDonate} />
    </>
  );
}

export default App;