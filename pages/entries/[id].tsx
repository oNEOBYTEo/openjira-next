import { ChangeEvent, useMemo, useState, FC, useContext } from 'react';

import { GetServerSideProps } from 'next';

import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { EntriesContext } from '../../context/entries/EntriesContext';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts/Layout';
import { EntryStatus, Entry } from '../../interfaces/entry';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={`Entrada con ID: ${entry._id}`}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada: ${dateFunctions
                .getFormatDistanceToNow(entry.createdAt)
                .toLowerCase()}`}
              overflow="hidden"
            />

            <CardContent>
              <TextField
                autoFocus
                error={isNotValid}
                fullWidth
                helperText={isNotValid && 'Ingrese un valor'}
                label="Nueva Entrada"
                multiline
                onBlur={() => setTouched(true)}
                onChange={onInputValueChanged}
                placeholder="Nueva Entrada"
                sx={{ marginTop: 2, marginBottom: 1 }}
                value={inputValue}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                disabled={inputValue.length <= 0}
                fullWidth
                onClick={onSave}
                startIcon={<SaveAsOutlinedIcon />}
                variant="contained"
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <IconButton
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark',
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { entry },
  };
};

export default EntryPage;
