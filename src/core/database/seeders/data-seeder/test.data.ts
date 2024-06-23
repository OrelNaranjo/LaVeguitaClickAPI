import { ContractType } from '../../../../shared/enumerators/contract-type.enum';

export const suppliers = [
  {
    id: 1,
    rut: '12345678-5',
    company_name: 'Test Company',
    phone: '123456789',
    email: 'test@test.com',
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
    run: '12345678-5',
    first_name: 'Nombre',
    last_name: 'Apellido',
    email: 'employee@employee.cl',
    phone: '123456789',
    birth_date: new Date('2024-05-29'),
    manager: null,
    employeeDetails: [
      {
        id: 1,
        position: 'Transportist',
        department: 'Logistic',
        salary: 300000,
        hire_date: new Date('2024-05-29'),
        contract_type: 'INDEFINITE' as ContractType,
        contract_number: 1,
        employee: {
          id: 1,
        },
        fire_date: null,
        is_deleted: false,
      },
    ],
    addresses: [
      {
        id: 2,
        street: 'Calle 10',
        zip_code: '123456',
        latitude: 0,
        longitude: 0,
        commune: {
          id: 2,
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
