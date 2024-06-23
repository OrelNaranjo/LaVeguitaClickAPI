import * as bcrypt from 'bcrypt';

export const privileges = [
  { id: 1, name: 'create', description: 'Create privilege', roles: [] },
  { id: 2, name: 'view', description: 'View privilege', roles: [] },
  { id: 3, name: 'update', description: 'Update privilege', roles: [] },
  { id: 4, name: 'delete', description: 'Delete privilege', roles: [] },
];

export const roles = [
  { id: 1, name: 'admin', description: 'Administrador', users: [], privileges: [privileges[0], privileges[1], privileges[2], privileges[3]] },
];

export const users = [
  {
    id: 1,
    name: 'Orel',
    lastname: 'Naranjo',
    username: 'OrelDev',
    password: bcrypt.hashSync('Abcd1234!', 10),
    email: 'or.naranjo@duocuc.cl',
    account: null,
    role: roles[0],
  },
];

export const accounts = [{ id: 1, is_active: true, user: users[0] }];
