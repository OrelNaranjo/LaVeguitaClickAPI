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
    first_name: 'Orel',
    last_name: 'Naranjo',
    username: 'OrelDev',
    password: bcrypt.hashSync('Abcd1234!', 10),
    email: 'or.naranjo@duocuc.cl',
    account: null,
    role: roles[0],
  },
  {
    id: 2,
    first_name: 'Usuario',
    last_name: 'Dos',
    username: 'User2',
    password: bcrypt.hashSync('Password2!', 10),
    email: 'user2@example.com',
    account: null,
    role: roles[0],
  },
  {
    id: 3,
    first_name: 'Usuario',
    last_name: 'Tres',
    username: 'User3',
    password: bcrypt.hashSync('Password3!', 10),
    email: 'user3@example.com',
    account: null,
    role: roles[0],
  },
  {
    id: 4,
    first_name: 'Usuario',
    last_name: 'Cuatro',
    username: 'User4',
    password: bcrypt.hashSync('Password4!', 10),
    email: 'user4@example.com',
    account: null,
    role: roles[0],
  },
  {
    id: 5,
    first_name: 'Usuario',
    last_name: 'Cinco',
    username: 'User5',
    password: bcrypt.hashSync('Password5!', 10),
    email: 'user5@example.com',
    account: null,
    role: roles[0],
  },
];

export const accounts = [
  { id: 1, is_active: true, user: users[0] },
  { id: 2, is_active: true, user: users[1] },
  { id: 3, is_active: true, user: users[2] },
  { id: 4, is_active: true, user: users[3] },
  { id: 5, is_active: true, user: users[4] },
];
