import * as bcrypt from 'bcrypt';

export const privileges = [
  { id: 1, name: 'create', description: 'Create privilege' },
  { id: 2, name: 'view', description: 'View privilege' },
  { id: 3, name: 'update', description: 'Update privilege' },
  { id: 4, name: 'delete', description: 'Delete privilege' },
];

export const roles = [
  { id: 1, name: 'admin', description: 'Administrador', privileges: [privileges[0], privileges[1], privileges[2], privileges[3]] },
];

export const accounts = [
  {
    id: 1,
    first_name: 'Orel',
    last_name: 'Naranjo',
    username: 'OrelDev',
    password: bcrypt.hashSync('Abcd1234!', 10),
    email: 'or.naranjo@duocuc.cl',
    is_active: true,
    roles: [{ id: 1 }],
  },
  {
    id: 2,
    first_name: 'Usuario',
    last_name: 'Dos',
    username: 'User2',
    password: bcrypt.hashSync('Password2!', 10),
    email: 'user2@example.com',
    is_active: true,
    roles: [{ id: 1 }],
  },
  {
    id: 3,
    first_name: 'Usuario',
    last_name: 'Tres',
    username: 'User3',
    password: bcrypt.hashSync('Password3!', 10),
    email: 'user3@example.com',
    is_active: true,
    roles: [{ id: 1 }],
  },
  {
    id: 4,
    first_name: 'Usuario',
    last_name: 'Cuatro',
    username: 'User4',
    password: bcrypt.hashSync('Password4!', 10),
    email: 'user4@example.com',
    is_active: true,
    roles: [{ id: 1 }],
  },
  {
    id: 5,
    first_name: 'Usuario',
    last_name: 'Cinco',
    username: 'User5',
    password: bcrypt.hashSync('Password5!', 10),
    email: 'user5@example.com',
    is_active: true,
    roles: [{ id: 1 }],
  },
];
