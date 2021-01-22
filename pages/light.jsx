import Head from 'next/head';
import { useRef } from 'react';
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Form,
} from 'react-bootstrap';
import clsx from 'clsx';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import get from 'lodash.get';
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

function Light({ machine, error }) {
  const [state, send] = useMachine(machine, {
    actions: {
      updateColor: assign((ctx, ev) => ({ color: ev.color })),
    },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  // console.log(state);

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
          <Row>
            <Col>
              <ButtonToolbar>
                <ButtonGroup className="mr-2">
                  <Button
                    variant={buttonClass(state.matches('lit'))}
                    onClick={() => {
                      send('TOGGLE');
                    }}
                  >
                    {get(state, ['meta', 'light.lit', 'label']) || 'Turn On'}
                  </Button>
                  <Button
                    variant={buttonClass(state.matches('unlit'))}
                    onClick={() => {
                      send('TOGGLE');
                    }}
                  >
                    {get(state, ['meta', 'light.unlit', 'label']) || 'Turn Off'}
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    variant={buttonClass(state.matches('broken'), true)}
                    onClick={() => {
                      send('BREAK');
                    }}
                  >
                    {get(state, ['meta', 'light.broken', 'label']) || 'Break'}
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Label>Select Color</Form.Label>
                <Form.Control
                  as="select"
                  disabled={!state.matches('lit')}
                  onChange={(ev) => {
                    send({ type: 'CHANGE_COLOR', color: ev.target.value });
                  }}
                >
                  <option value="#fff">White</option>
                  <option value="#f00">Red</option>
                  <option value="#0f0">Green</option>
                  <option value="#00f">Blue</option>
                </Form.Control>
                <div
                  style={{
                    padding: 4,
                    fontWeight: 'bold',
                    color: !state.matches('broken')
                      ? state.context.color
                      : '#000',
                    backgroundColor: '#666',
                  }}
                >
                  Current color: &nbsp;
                  {!state.matches('broken') ? state.context.color : 'N/A'}
                </div>
              </Form>
            </Col>
          </Row>
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
