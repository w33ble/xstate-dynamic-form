import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import useAsyncMachine from '../lib/useAsyncMachine';

function MultiForm(/* { machine, error } */) {
  // const [state, send, service] = useMachine(machine, {
  //   actions: {
  //     updateColor: assign((ctx, ev) => ({ color: ev.color })),
  //   },
  // });

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  // console.log(service, state, state.meta);

  return (
    <>
      <Head>
        <title>xstate-dynamic-form | The Light</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container className="md-container">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Complete the form</h1>
            </Col>
          </Row>
          <Row>
            <Col>Coming soon!</Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default function LightWrapper() {
  const { machine, loading, config, error } = useAsyncMachine(
    '/api/machines/form'
  );

  if (loading) return null;

  return <MultiForm machine={machine} error={error} config={config} />;
}
