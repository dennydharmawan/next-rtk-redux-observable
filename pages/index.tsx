import { Container, Typography } from '@material-ui/core';
import Layout from '../components/Layout';

export default function index() {
  return (
    <Layout>
      <Typography variant="h1" color="initial">
        <Container>Hello world</Container>
      </Typography>
    </Layout>
  );
}
