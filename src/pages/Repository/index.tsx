import React from 'react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {useRouteMatch, Link} from 'react-router-dom';

import {Header, RepositoryInfo, Issues} from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const {params} = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars3.githubusercontent.com/u/60622592?v=4"
            alt="avatar"
          />

          <div>
            <strong>ForestiLeao/instabot</strong>
            <p>Descrição do repositório</p>
          </div>
        </header>

        <ul>
          <li>
            <strong>1802</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>46</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to={'batata'}>
          <div>
            <strong>adawfwafawf</strong>
            <p>fwafafwafawfw</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
