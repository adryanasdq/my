// import { Provider } from 'react-redux';
import { Container } from '@mui/material';
// import { Main } from './components/main';
import { Main2 } from './components/main2';
import { Main3 } from './components/main3';

/* TODO:

- Learn Fundamental         [x]
- Custom Component          []
- Form Validation with Zod  [x]
- AI Assistant -> Cody      [x]
- Material UI               [x]
- Other hooks ?             []
- Change to Typescript      [x]
- Nextweb project           []
- Redux                     []
- ESLint                    []

*/

function App() {
  return (
    // <Provider store={store}>
    <Container sx={{ mt: 4 }}>
      {/* <Main />
      <br />
      <br />
      <br /> */}
      <Main2 />
      <br />
      <br />
      <br />
      <Main3 />
    </Container>
    // </Provider>
  );
}

export default App;
