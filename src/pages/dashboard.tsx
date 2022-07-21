import { useContext, useEffect } from 'react';
import { Can } from '../components/Can';
import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  useEffect(() => {
    api.get('/me').then((response) => console.log(response));
  }, []);

  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Deslogar</button>

      <Can permissions={['metrics.list']} roles={['editor', 'administrator']}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient('/me');

  return {
    props: {},
  };
});
