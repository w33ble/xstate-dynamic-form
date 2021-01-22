const formStates = {
  normal: {
    exit: ['notifyNextForm'],
  },
  invalid: {
    entry: ['notifyInvalid'],
  },
};

const basicDataConfig = {
  on: {
    NEXT: 'fulfillment_type',
  },
  initial: 'normal',
  states: {
    ...formStates,
  },
};

const fulfillmentTypeConfig = {
  on: {
    NEXT: { target: 'order_submitted' },
  },
  initial: 'normal',
  states: {
    ...formStates,
  },
};

const orderSubmittedConfig = {
  entry: ['orderSubmitted'],
  type: 'final',
};

const config = {
  // Machine identifier
  id: 'form',

  // Initial state
  initial: 'basic_data',

  // Local context for entire machine
  context: {
    formData: {},
    errors: [],
  },

  // State definitions
  states: {
    basic_data: { ...basicDataConfig },
    fulfillment_type: { ...fulfillmentTypeConfig },
    // fulfillment_date: {
    //   on: {
    //     NEXT: 'order_review',
    //   },
    // },
    // order_review: {
    //   on: {
    //     NEXT: 'payment_date',
    //   },
    // },
    // payment_data: {
    //   meta: {
    //     type: 'stripe',
    //   },
    // },
    order_submitted: { ...orderSubmittedConfig },
  },
};

export default function handler(req, res) {
  res.status(200).json(config);
}
