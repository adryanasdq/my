import { GridProps } from '../types/ToDos';
import { Box, IconButton, Paper, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function MyGrid({ todos, editTodos, deleteTodos }: GridProps) {
  const getBorderColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
    }
  };

  const Item = styled(Paper)<{ priority: string }>(({ theme, priority }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    borderTop: `8px solid ${getBorderColor(priority)}`,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 5, mb: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {todos.map((t) => (
            <Grid key={t.id} size={{ xs: 2, sm: 4, md: 4 }}>
              <Item priority={t.priority}>
                <Box
                  sx={{
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                >
                  {t.title}
                </Box>
                <Box sx={{ textAlign: 'justify', mb: 1 }}>{t.desc}</Box>
                <Box>
                  <i>
                    Due to:
                    {t.dueDate instanceof Date
                      ? t.dueDate.toLocaleDateString()
                      : t.dueDate}
                  </i>
                </Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
                >
                  <IconButton
                    aria-label="edit"
                    onClick={() => editTodos(t.id)}
                    color="primary"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteTodos(t.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
export { MyGrid };
