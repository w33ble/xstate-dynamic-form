const config = {
  // Machine identifier
  id: 'light',

  // Initial state
  initial: 'lit',

  // Local context for entire machine
  context: {
    color: '#fff',
  },

  // State definitions
  states: {
    lit: {
      on: {
        CHANGE_COLOR: {
          actions: ['updateColor'],
        },
        TURN_OFF: 'unlit',
        BREAK: 'broken',
      },
    },
    unlit: {
      on: {
        TURN_ON: 'lit',
        BREAK: 'broken',
      },
    },
    broken: {
      type: 'final',
    },
  },
};

export default function handler(req, res) {
  res.status(200).json(config);
}
