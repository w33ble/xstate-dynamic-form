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
import { useMachine } from '@xstate/react/lib/fsm';
import useFetch from '../lib/useFetch';

function useAsyncMachine(url) {
  const machineRef = useRef(null);
  const { data, error } = useFetch(url);

  if (data) machineRef.current = createMachine(data);

  return {
    loading: !machineRef.current && !error,
    machine: machineRef.current,
    config: data,
    error,
  };
}

function buttonClass(bool, danger = false) {
  if (danger) return clsx({ danger: bool, 'outline-danger': !bool });
  return clsx({ primary: bool, 'outline-primary': !bool });
}

function Light({ machine, config, error }) {
  const [state, send] = useMachine(machine, {
    actions: {
      updateColor: () => {
        console.log('updateColor action');
      },
    },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(state, config);

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
              <h1 className="text-center">Control the light</h1>
            </Col>
          </Row>
          <ButtonToolbar>
            <ButtonGroup className="mr-2">
              <Button
                variant={buttonClass(state.matches('lit'))}
                onClick={() => {
                  send('TURN_ON');
                }}
              >
                Turn On
              </Button>
              <Button
                variant={buttonClass(state.matches('unlit'))}
                onClick={() => {
                  send('TURN_OFF');
                }}
              >
                Turn Off
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                variant={buttonClass(state.matches('broken'), true)}
                onClick={() => {
                  send('BREAK');
                }}
              >
                {state.matches('broken') ? 'Broken :(' : 'Break'}
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Container>
      </Container>
    </>
  );
}

export default function LightWrapper() {
  const { machine, loading, config, error } = useAsyncMachine(
    '/api/machines/light'
  );

  if (loading) return null;

  return <Light machine={machine} error={error} config={config} />;
}
