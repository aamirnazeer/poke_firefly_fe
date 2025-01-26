# README

## Overview

This project is a front end application designed to fetch and display data a list of pokemon, search for a pokemon, and set pokemons as favourites, built with React using Vite. The application features infinite scroll, managing favourites by session based identification.

The key functionalities include:

- Rendering the list of Pokemons with infinite scroll.
- Visible identifier for pokemons set as favourite.
- Ability to set or remove pokemons to favourites.
- Abilisty to view the individual Pokémon with details (abilities, types, and evolution options) in a modal.
- Search for a specific pokemon with name.
- Ability to view only the list of favourite Pokemons with infinite scroll

---

## Running the Project Locally

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v22+)
- npm or yarn

### Backend Setup

1. Clone the repository:

```bash
git  clone  https://github.com/aamirnazeer/poke_firefly_fe.git
cd  poke_firefly_fe
```

2. Install dependencies:

```bash
npm  install
or
yarn
```

3. Setup env file:

- Rename `.env.sample` to `.env`

4. Start the front end server:

```bash
npm  run  dev
or
yarn  dev
```

By default, the backend runs at `http://localhost:5173`.
