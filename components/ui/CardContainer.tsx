import { FC } from 'react';

import { Grid, Card, CardHeader, CardContent } from '@mui/material';
import { EntryList } from './';
import { EntryStatus } from '../../interfaces';

interface Props {
  children?: JSX.Element;
  title: string;
  status: EntryStatus;
}

export const CardContainer: FC<Props> = ({ children, title, status }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card sx={{ height: 'calc(100vh - 100px)' }}>
        <CardHeader title={title} />

        <CardContent>
          {/* Agregar una nueva entreada */}
          {/* Listado de las entradas */}
          {children}
          <EntryList status={status} />
        </CardContent>
      </Card>
    </Grid>
  );
};
