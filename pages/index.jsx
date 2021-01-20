import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Head>
        <title>xstate-dynamic-form | Welcome</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container className="md-container">
        <Container>
          <Row>
            <Col className="align-center">
              <h1>Welcome to xstate-dynamic-form</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link href="/light">
                <Button variant="outline-primary">Control the light</Button>
              </Link>
            </Col>
          </Row>
        </Container>

        <footer className="cntr-footer align-center">This is a dynamic form demo</footer>
      </Container>
    </>
  );
}
