export default {
    name: 'progress',
    title: 'Pomodoro Progress',
    type: 'document',
    fields: [
      {
        name: 'user',
        title: 'User',
        type: 'reference',
        to: [{ type: 'user' }], // Link to the user schema
      },
      {
        name: 'totalPomodoros',
        title: 'Total Pomodoros',
        type: 'number',
        validation: Rule => Rule.min(0),
      },
      {
        name: 'totalTime',
        title: 'Total Time (in minutes)',
        type: 'number',
        validation: Rule => Rule.min(0),
      },
      {
        name: 'sessions',
        title: 'Pomodoro Sessions',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'duration',
                title: 'Duration (in minutes)',
                type: 'number',
                validation: Rule => Rule.min(0),
              },
              {
                name: 'completedAt',
                title: 'Completed At',
                type: 'datetime',
              },
            ],
          },
        ],
      },
    ],
  };