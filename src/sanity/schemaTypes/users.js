export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'lastLogin',
        title: 'Last Login',
        type: 'datetime',
      },
      {
        name: 'profileImage',
        title: 'Profile Image',
        type: 'url',
      },
    ],
  };