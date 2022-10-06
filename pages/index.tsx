import type { NextPage } from 'next';

import { Grid } from '@mui/material';

import { Layout } from '../components/layouts';
import { CardContainer, NewEntry } from '../components/ui/';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <CardContainer title="Pendientes" status="pending">
          <NewEntry />
        </CardContainer>
        <CardContainer title="En Progreso" status="in-progress" />
        <CardContainer title="Completadas" status="finished" />
      </Grid>
    </Layout>
  );
};

export default HomePage;
