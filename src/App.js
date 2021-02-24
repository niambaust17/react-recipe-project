import React, { useEffect, useState } from 'react';
import './App.css';

function App()
{
  const [meal, setMeal] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() =>
  {
    getMeal();
  }, [query])

  function getMeal()
  {
    fetch(`https://api.edamam.com/search?q=${ query }&app_id=66b575bd&app_key=75201f50e8d17ac9bb39e496bdd45c22`)
      .then(res => res.json())
      .then(data => setMeal(data.hits))
  }


  function updateSearch(event)
  {
    setSearch(event.target.value);
  }


  function getSearch(event)
  {
    event.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className="App">
      <header>
        <h1 className="text-center">Recipe Finder</h1>
        <div className="input-group p-5">
          <input className="form-control" type="text" name="" placeholder="Enter recipe name" value={search} onChange={updateSearch} />
          <button className="btn btn-outline-success" onClick={getSearch}>Search</button>
        </div>
      </header>
      <div className="container overflow-hidden">
        <div className="row gy-5">
          {
            meal.map(umeal => <ShowMeal key={umeal.recipe.label} title={umeal.recipe.label} calories={umeal.recipe.calories} image={umeal.recipe.image}></ShowMeal>)
          }
        </div>
      </div>
    </div>
  );
}


function ShowMeal(props)
{
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="bg-light text-center recipe">
        <img src={props.image} alt="" />
        <h5>{props.title}</h5>
        <p>{props.calories.toFixed(2)} cal</p>
      </div>
    </div>
  );
}
export default App;
