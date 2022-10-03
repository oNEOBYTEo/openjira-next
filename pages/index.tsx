import type { NextPage } from 'next';

import { Grid } from '@mui/material';

import { Layout } from '../components/layouts';
import { CardTitle } from '../components/ui/';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <CardTitle title="Pendientes" />
        <CardTitle title="En Progreso" />
        <CardTitle title="Completadas" />
      </Grid>
    </Layout>
  );
};

export default HomePage;
