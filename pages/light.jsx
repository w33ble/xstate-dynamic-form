import Head from 'next/head';
import { useRef } from 'react';
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import clsx from 'clsx';
import { createMachine } from '@xstate/fsm';
// import { useMachine } from '@xstate/react';
import useFetch from '../lib/useFetch';

export default function Home() {
  const { data: lightConfig, error } = useFetch('/api/machines/light');
  const machineRef = useRef(null);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (lightConfig) {
    machineRef.current = createMachine(
      lightConfig
      // {
      //   actions: {
      //     submitForm(ctx, evt) {
      //       // send form data to server
      //       machineRef.current.send({ type: 'DATA_ERROR' })
      //     },
      //   },
      // }
    );
  }

  console.log('machineRef', machineRef.current);

  return (
    <>
      <Head>
        <title>xstate-dynamic-form | The Light</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      {machineRef.current && (
        <Container className="md-container">
          <Container>
            <Row>
              <Col className="align-center">
                <h1>Control the light</h1>
              </Col>
            </Row>
            <div className="configString">
              <pre>{JSON.stringify(lightConfig, null, 2)}</pre>
            </div>
            <ButtonToolbar>
              <ButtonGroup className="mr-2">
                <Button variant={clsx({ primary: 1, 'outline-primary': 0 })}>
                  Turn On
                </Button>
                <Button variant={clsx({ primary: 0, 'outline-primary': 1 })}>
                  Turn Off
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant={clsx({ danger: 0, 'outline-danger': 1 })}>
                  Break
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Container>
        </Container>
      )}
    </>
  );
}
