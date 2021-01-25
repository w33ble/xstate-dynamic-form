import Head from 'next/head';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { assign } from 'xstate';
import { useMachine } from '@xstate/react';
import get from 'lodash.get';
import useAsyncMachine from '../lib/useAsyncMachine';

function MultiForm({ machine, error }) {
  const [state, send] = useMachine(machine, {
    actions: {
      notifyNextForm: assign((ctx, ev) => ({
        formData: { ...ctx.formData, ...ev.formData },
      })),
      notifyInvalid: (...args) => {
        console.log({ args });
        alert('INVALID');
      },
    },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleBasicForm = (ev) => {
    ev.preventDefault();

    const payload = Array.from(
      ev.target.querySelectorAll('input,select')
    ).reduce((acc, el) => {
      acc[el.name] = el.value;
      return acc;
    }, {});

    console.log(payload);
    send('NEXT', { formData: payload });
  };

  console.log(
    JSON.stringify({ context: state.context, meta: state.meta }, null, 2)
  );

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
            <Col>
              <Form onSubmit={handleBasicForm}>
                {state.matches('basic_data') && (
                  <>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        {get(
                          state,
                          ['meta', 'form.basic_data', 'email'],
                          'Email address'
                        )}
                      </Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Group>
                  </>
                )}
                {state.matches('fulfillment_type') && (
                  <>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        {get(
                          state,
                          ['meta', 'form.basic_data', 'fulfillment_type'],
                          'Fulfillment Type'
                        )}
                      </Form.Label>
                      <Form.Control as="select" name="fulfillment_type">
                        <option value="delivery">Delivery</option>
                        <option value="pickup">Self Pick-Up</option>
                      </Form.Control>
                    </Form.Group>
                  </>
                )}
                {state.matches('order_submitted') && (
                  <>
                    <pre>{JSON.stringify(state.context, null, 2)}</pre>
                  </>
                )}
                {state.nextEvents.includes('PREV') && (
                  <Button variant="link" disabled>
                    Back
                  </Button>
                )}
                {!state.done && (
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                )}
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
    '/api/machines/form'
  );

  if (loading) return null;

  return <MultiForm machine={machine} error={error} config={config} />;
}
