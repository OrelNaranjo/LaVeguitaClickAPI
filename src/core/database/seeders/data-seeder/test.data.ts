import { accounts } from './account.data';
import { ContractType } from '../../../../shared/enumerators/contract-type.enum';

export const suppliers = [
  {
    id: 1,
    rut: '12345678-5',
    company_name: 'Test Company',
    phone: '123456789',
    email: 'orelnaranjo@gmail.com',
    description: 'This is a test company',
    contacts: [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        position: 'Manager',
        email: 'john.doe@test.com',
        phone: '123456789',
      },
    ],
    addresses: [
      {
        id: 1,
        street: 'Test Street',
        zip_code: '12345',
        latitude: 0,
        longitude: 0,
        commune: {
          id: 1,
        },
      },
    ],
  },
];

export const employees = [
  {
    id: 1,
    run: '15843755-4',
    phone: '992891711',
    birth_date: new Date('1984-03-21'),
    manager: null,
    account: accounts[0],
    employeeDetails: [
      {
        id: 1,
        position: 'Analista',
        department: 'Finanzas',
        salary: 1200000,
        hire_date: new Date('2019-03-01'),
        contract_type: ContractType.INDEFINITE,
        contract_number: 1,
        employee: { id: 1 },
        fire_date: null,
        is_deleted: false,
      },
    ],
    addresses: [
      {
        id: 1,
        street: 'Avenida Siempre Viva 742',
        zip_code: '7500000',
        latitude: -33.456939,
        longitude: -70.648269,
        commune: { id: 1 },
      },
    ],
  },
  {
    id: 2,
    run: '16853247-6',
    phone: '912345678',
    birth_date: new Date('1990-07-22'),
    manager: null,
    employeeDetails: [
      {
        id: 2,
        position: 'Ingeniero de Software',
        department: 'TI',
        salary: 1500000,
        hire_date: new Date('2020-05-15'),
        contract_type: ContractType.INDEFINITE,
        contract_number: 2,
        employee: { id: 2 },
        fire_date: null,
        is_deleted: false,
      },
    ],
    addresses: [
      {
        id: 2,
        street: 'Calle Falsa 123',
        zip_code: '1234567',
        latitude: -33.4378305,
        longitude: -70.6504492,
        commune: { id: 2 },
      },
    ],
  },
  {
    id: 3,
    run: '20456789-K',
    phone: '923456789',
    birth_date: new Date('1988-09-30'),
    manager: null,
    employeeDetails: [
      {
        id: 3,
        position: 'Gerente de Proyectos',
        department: 'Desarrollo',
        salary: 1800000,
        hire_date: new Date('2018-08-20'),
        contract_type: ContractType.INDEFINITE,
        contract_number: 3,
        employee: { id: 3 },
        fire_date: null,
        is_deleted: false,
      },
    ],
    addresses: [
      {
        id: 3,
        street: 'Avenida Principal 456',
        zip_code: '7654321',
        latitude: -33.401776,
        longitude: -70.572986,
        commune: { id: 3 },
      },
    ],
  },
  {
    id: 4,
    run: '21567890-5',
    phone: '934567890',
    birth_date: new Date('1992-12-10'),
    manager: null,
    employeeDetails: [
      {
        id: 4,
        position: 'Analista de Sistemas',
        department: 'TI',
        salary: 1400000,
        hire_date: new Date('2021-01-10'),
        contract_type: ContractType.INDEFINITE,
        contract_number: 4,
        employee: { id: 4 },
        fire_date: null,
        is_deleted: false,
      },
    ],
    addresses: [
      {
        id: 4,
        street: 'Calle Secundaria 789',
        zip_code: '8765432',
        latitude: -33.412345,
        longitude: -70.623456,
        commune: { id: 4 },
      },
    ],
  },
  {
    id: 5,
    run: '22678901-4',
    phone: '945678901',
    birth_date: new Date('1984-06-24'),
    manager: null,
    employeeDetails: [
      {
        id: 5,
        position: 'Director de Marketing',
        department: 'Marketing',
        salary: 2000000,
        hire_date: new Date('2017-04-15'),
        contract_type: ContractType.HONORARY,
        contract_number: 5,
        employee: { id: 5 },
        fire_date: null,
        is_deleted: false,
      },
    ],
    addresses: [
      {
        id: 5,
        street: 'Avenida Reforma 1234',
        zip_code: '9876543',
        latitude: -33.423567,
        longitude: -70.634578,
        commune: { id: 5 },
      },
    ],
  },
];

export const customers = [
  {
    id: 1,
    rut: '12345678-5',
    first_name: 'Juan',
    last_name: 'Pérez',
    phone: '987654321',
    email: '',
    description: 'This is a test customer',
    addresses: [
      {
        id: 6,
        street: 'Test Street',
        zip_code: '12345',
        latitude: 0,
        longitude: 0,
        commune: {
          id: 1,
        },
      },
      {
        id: 7,
        street: 'Test Street 2',
        zip_code: '54321',
        latitude: 0,
        longitude: 0,
        commune: {
          id: 2,
        },
      },
    ],
  },
  {
    id: 2,
    rut: '87654321-0',
    first_name: 'María',
    last_name: 'González',
    phone: '912345678',
    email: '',
    description: 'This is a test customer 2',
    addresses: [
      {
        id: 8,
        street: 'Test Street 2',
        zip_code: '54321',
        latitude: 0,
        longitude: 0,
        commune: {
          id: 2,
        },
      },
    ],
  },
  {
    id: 3,
    rut: '13579246-3',
    first_name: 'Carlos',
    last_name: 'Sánchez',
    phone: '923456789',
    email: '',
    description: 'This is a test customer 3',
    addresses: [
      {
        id: 9,
        street: 'Test Street 3',
        zip_code: '67890',
        latitude: 0,
        longitude: 0,
        commune: {
          id: 3,
        },
      },
    ],
  },
  {
    id: 4,
    rut: '24681357-6',
    first_name: 'Elena',
    last_name: 'Rodríguez',
    phone: '934567890',
    email: '',
    description: 'This is a test customer 4',
    addresses: [
      {
        id: 10,
        street: 'Test Street 4',
        zip_code: '13579',
        latitude: 0,
        longitude: 0,
        commune: {
          id: 4,
        },
      },
    ],
  },
  {
    id: 5,
    rut: '98765432-1',
    first_name: 'Roberto',
    last_name: 'López',
    phone: '945678901',
    email: '',
    description: 'This is a test customer 5',
    addresses: [
      {
        id: 11,
        street: 'Test Street 5',
        zip_code: '24680',
        latitude: 0,
        longitude: 0,
        commune: {
          id: 5,
        },
      },
    ],
  },
];

export const categories = [
  {
    name: 'Productos',
    description: 'Categoría para productos',
    is_active: true,
    childrens: [
      {
        name: 'Frutas',
        description: 'Subcategoría para frutas frescas',
        is_active: true,
        image: {
          alt: 'Imagen de frutas',
          url: 'https://example.com/images/frutas.jpg',
        },
      },
      {
        name: 'Verduras',
        description: 'Subcategoría para verduras frescas',
        is_active: true,
        image: {
          alt: 'Imagen de verduras',
          url: 'https://example.com/images/verduras.jpg',
        },
      },
      {
        name: 'Compost',
        description: 'Subcategoría para compost y tierra para macetas',
        is_active: true,
        image: {
          alt: 'Imagen de compost',
          url: 'https://example.com/images/compost.jpg',
        },
      },
    ],
    image: {
      alt: 'Imagen de productos',
      url: 'https://example.com/images/productos.jpg',
    },
  },
];

export const warehouses = [
  {
    id: 1,
    name: 'Bodega de prueba',
    description: 'Esta es una bodega de prueba',
    phone: '123456789',
    capacity_kg: 1000000,
    address: {
      id: 3,
      street: 'Calle de la bodega',
      zip_code: '12345',
      latitude: 0,
      longitude: 0,
      commune: {
        id: 1,
      },
    },
  },
  {
    id: 2,
    name: 'Bodega de prueba 2',
    description: 'Esta es una bodega de prueba 2',
    phone: '123456789',
    capacity_kg: 2000000,
    address: {
      id: 4,
      street: 'Calle de la bodega 2',
      zip_code: '12345',
      latitude: 0,
      longitude: 0,
      commune: {
        id: 2,
      },
    },
  },
];

export const products = [
  {
    name: 'Manzana Roja',
    description: 'Manzana roja fresca y crujiente, ideal para meriendas saludables.',
    sku: 'FRU123456',
    barcode: '7890123456781',
    price: 100,
    cost: 70,
    weight_kg: 0.2,
    categories: [
      {
        id: 1,
      },
    ],
    images: [
      {
        alt: 'Imagen de Manzana Roja',
        url: '/images/products/FRU123456.webp',
      },
    ],
  },
  {
    name: 'Banana',
    description: 'Bananas dulces y nutritivas, perfectas para cualquier momento del día.',
    sku: 'FRU123457',
    barcode: '7890123456782',
    price: 60,
    cost: 40,
    weight_kg: 0.15,
    categories: [
      {
        id: 1,
      },
    ],
    images: [
      {
        alt: 'Imagen de Banana',
        url: '/images/products/FRU123457.webp',
      },
    ],
  },
  {
    name: 'Tomate',
    description: 'Tomates frescos y jugosos, ideales para ensaladas y salsas.',
    sku: 'VEG123458',
    barcode: '7890123456783',
    price: 100,
    cost: 70,
    weight_kg: 0.3,
    categories: [
      {
        id: 2,
      },
    ],
    images: [
      {
        alt: 'Imagen de Tomate',
        url: '/images/products/VEG123458.webp',
      },
    ],
  },
  {
    name: 'Zanahoria',
    description: 'Zanahorias frescas y crujientes, llenas de vitaminas y sabor.',
    sku: 'VEG123459',
    barcode: '7890123456784',
    price: 60,
    cost: 30,
    weight_kg: 0.25,
    categories: [
      {
        id: 2,
      },
    ],
    images: [
      {
        alt: 'Imagen de Zanahoria',
        url: '/images/products/VEG123459.webp',
      },
    ],
  },
  {
    name: 'Espinaca',
    description: 'Hojas de espinaca frescas, perfectas para ensaladas y batidos.',
    sku: 'VEG123460',
    barcode: '7890123456785',
    price: 200,
    cost: 150,
    weight_kg: 0.2,
    categories: [
      {
        id: 2,
      },
    ],
    images: [
      {
        alt: 'Imagen de Espinaca',
        url: '/images/products/VEG123460.webp',
      },
    ],
  },
  {
    name: 'Naranja',
    description: 'Naranjas frescas y jugosas, llenas de vitamina C.',
    sku: 'FRU123461',
    barcode: '7890123456786',
    price: 150,
    cost: 110,
    weight_kg: 0.25,
    categories: [
      {
        id: 1,
      },
    ],
    images: [
      {
        alt: 'Imagen de Naranja',
        url: '/images/products/FRU123461.webp',
      },
    ],
  },
  {
    name: 'Lechuga',
    description: 'Lechuga fresca y crujiente, ideal para ensaladas.',
    sku: 'VEG123462',
    barcode: '7890123456787',
    price: 300,
    cost: 250,
    weight_kg: 0.3,
    categories: [
      {
        id: 2,
      },
    ],
    images: [
      {
        alt: 'Imagen de Lechuga',
        url: '/images/products/VEG123462.webp',
      },
    ],
  },
  {
    name: 'Pepino',
    description: 'Pepinos frescos y crujientes, perfectos para ensaladas y snacks.',
    sku: 'VEG123463',
    barcode: '7890123456788',
    price: 100,
    cost: 70,
    weight_kg: 0.35,
    categories: [
      {
        id: 2,
      },
    ],
    images: [
      {
        alt: 'Imagen de Pepino',
        url: '/images/products/VEG123463.webp',
      },
    ],
  },
  {
    name: 'Compost Orgánico',
    description: 'Compost orgánico de alta calidad para enriquecer el suelo de tu jardín.',
    sku: 'CMP123464',
    barcode: '7890123456789',
    price: 5000,
    cost: 4900,
    weight_kg: 25,
    categories: [
      {
        id: 3,
      },
    ],
    images: [],
  },
  {
    name: 'Tierra para Macetas',
    description: 'Tierra para macetas enriquecida con nutrientes esenciales.',
    sku: 'CMP123465',
    barcode: '7890123456790',
    price: 3000,
    cost: 2900,
    weight_kg: 1,
    categories: [
      {
        id: 3,
      },
    ],
    images: [],
  },
];

export const stocks = [
  {
    id: 1,
    product: {
      id: 1,
    },
    warehouse: {
      id: 1,
    },
    stock: 0,
    min_stock: 50,
    max_stock: 100,
  },
  {
    id: 2,
    product: {
      id: 2,
    },
    warehouse: {
      id: 1,
    },
    stock: 0,
    min_stock: 30,
    max_stock: 100,
  },
  {
    id: 3,
    product: {
      id: 2,
    },
    warehouse: {
      id: 2,
    },
    stock: 0,
    min_stock: 10,
    max_stock: 100,
  },
];
