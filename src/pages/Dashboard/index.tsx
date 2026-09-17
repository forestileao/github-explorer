import React, {useState, useEffect, useRef, FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {FiChevronRight} from 'react-icons/fi';
import toast, {Toaster} from 'react-hot-toast';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import {Title, Form, Repositories} from './styles';

interface Repository {
  full_name: string;
  description: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    } else {
      return [];
    }
  });

  const emptyToastFired = useRef(false);

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  useEffect(() => {
    if (repositories.length === 0) {
      if (!emptyToastFired.current) {
        emptyToastFired.current = true;
        toast('Nenhum repositório adicionado ainda.', {icon: 'ℹ️'});
      }
    } else {
      emptyToastFired.current = false;
    }
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      toast.error('Digite o autor/nome do repositório.');
      return;
    }
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      toast.success('Repositório adicionado!');
    } catch (err) {
      toast.error('Erro na busca por esse repositório.');
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(repo => (
          <Link to={`/repositories/${repo.full_name}`} key={repo.full_name}>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
