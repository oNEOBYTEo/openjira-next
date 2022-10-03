import { FC } from 'react';

import { Grid, Card, CardHeader, CardContent } from '@mui/material';

interface Props {
  title: string;
}

export const CardTitle: FC<Props> = ({ title }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card sx={{ height: 'calc(100vh - 100px)' }}>
        <CardHeader title={title} />

        <CardContent>
          {/* Agregar una nueva entreada */}
          {/* Listado de las entradas */}
        </CardContent>
      </Card>
    </Grid>
  );
};
