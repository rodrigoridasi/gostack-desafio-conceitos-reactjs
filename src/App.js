import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const repository = {
      id: "318",
      url: "https://github.com/rodrigoridasi",
      title: "ReactJS",
      techs: ["NodeJS", "ReactJS"]
    };

    await api.post('/repositories', repository);

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    const repositoriesFiltered = repositories.filter(repository => repository.id !== id);

    setRepositories(repositoriesFiltered);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
              {repositorie.title}
          
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
              </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;