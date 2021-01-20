import Head from 'next/head';
import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';

export default function Home() {
  return (
    <Container className="md-container">
      <Head>
        <title>xstate-dynamic-form | Welcome</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <h1>Welcome to xstate-dynamic-form</h1>
        <Link href="/">
          <Button variant="outline-primary">Get Started</Button>
        </Link>
      </Container>

      <footer className="cntr-footer">This is a dynamic form demo</footer>
    </Container>
  );
}
