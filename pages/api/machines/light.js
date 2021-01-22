const config = {
  // Machine identifier
  id: 'light',

  // Initial state
  initial: 'unlit',

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
        TOGGLE: 'unlit',
        BREAK: 'broken',
      },
      meta: {
        label: 'Power On',
      },
    },
    unlit: {
      on: {
        TOGGLE: 'lit',
        BREAK: 'broken',
      },
      meta: {
        label: 'Cut Power',
      },
    },
    broken: {
      meta: {
        label: 'Broken :(',
      },
      type: 'final',
    },
  },
};

export default function handler(req, res) {
  res.status(200).json(config);
}
