import { useState } from "react";
import Country from "./components/Country";

import data from "./data/countries.json";
import "./styles.css";

function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function lessThan(a, b) {
  return a.population - b.population;
}

function alphaSort(list) {
  return list.sort(alphaCompare);
}

function ascSort(list) {
  return list.sort(lessThan);
}

function filterByContinent(list, option) {
  return list.filter(function (item) {
    return item.continent.toLowerCase() === option.toLowerCase();
  });
}

function filterByPopulation(list, option) {
  if (option === "p-all") {
    return list;
  } else if (option === "p-<100M") {
    return list.filter((country) => country.population <= 100000000);
  } else if (option === "p-100M-200M") {
    return list.filter(
      (country) =>
        country.population >= 100000000 && country.population < 200000000
    );
  } else if (option === "p-200M-500M") {
    return list.filter(
      (country) =>
        country.population >= 200000000 && country.population < 500000000
    );
  } else if (option === "p-500M-1B") {
    return list.filter(
      (country) =>
        country.population >= 500000000 && country.population >= 1000000000
    );
  } else if (option === "p-1B+") {
    return list.filter((country) => country.population >= 1000000000);
  } else {
    return list;
  }
}

export default function App() {
  const [sortOrder, setSortOrder] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  function handleSort(e) {
    setSortOrder(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sort(list) {
    if (sortOrder === "alpha") {
      return alphaSort(list);
    } else if (sortOrder === "<") {
      return ascSort(list);
    } else if (sortOrder === ">") {
      return list.slice().sort((a, b) => b.population - a.population);
    } else if (sortOrder === "shuffle") {
      return shuffle(list);
    } else {
      return list;
    }
  }

  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex, temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function filter(list) {
    if (filterOption.startsWith("p")) {
      return filterByPopulation(list, filterOption);
    } else if (filterOption === "all") {
      return list;
    } else {
      return filterByContinent(list, filterOption);
    }
  }

  const sorted = sort(data.countries);
  const filtered = filter(sorted);

  return (
    <div className="App">
      <h1>World's Largest Countries by Population </h1>
      <div className="filters">
        <label>
          Sort by:
          <select value={sortOrder} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Ascen</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>

        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup label="By Continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By Population Size">
              <option value="p-all">All</option>
              <option value="p-<100M">Less than 100M</option>
              <option value="p-100M-200M">100M or more</option>
              <option value="p-200M-500M">200M or more</option>
              <option value="p-500M-1B">500M or more</option>
              <option value="p-1B+">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filtered.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}
