import { Button, Box, TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

export const NewEntry = () => {
  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      <Button startIcon={<AddIcon />} fullWidth variant="outlined">
        Agregar Tarea
      </Button>

      <TextField
        fullWidth
        sx={{ marginTop: 2, marginBottom: 1 }}
        placeholder="Nueva Entrada"
        autoFocus
        multiline
        label="Nueva Entrada"
        helperText="Ingrese un valor"
      />
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<SaveOutlinedIcon />}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};
