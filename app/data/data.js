export const CATEGORY = [
  {id: 'Sandwich', name: 'Sandwich'},
  {id: 'Pizza', name: 'Pizza'},
  {id: 'Dishes', name: 'Dishes'},
  {id: 'Salad', name: 'Salad'},
  {id: 'Dessert', name: 'Dessert'},
];

export const ADDRESSES = [
  {
    address: '84 Rue de Rivoli, 75004 Paris, France',
    zipCode: '75004',
    phone: '+33100000000',
    addressTitle: 'Home',
  },
  {
    address: '20 Rue Saint-Martin, 75004 Paris, France',
    zipCode: '75004',
    phone: '+33100000000',
    addressTitle: 'Work',
  },
];

export const ORDERS = [
  {
    id: '11111111',
    date: '2020-11-02T22:24:36.681+00:00',
    totalPrice: 6.7,
    orderStatus: {
      id: 'CLOSED',
      name: 'Closed',
    },
    orderLines: [
      {
        quantity: 1,
        total: 6,
        food: {
          id: '5f93eb229ca80b5e20109eef',
          code: 'SANDWICH_LIBANAIS',
          name: 'Sandwich Libanais',
          description:
            "Un classique de sandwiches à l'orientale dévoré par les affamés du monde entier sur un coin de trottoir ou un banc public",
          media: [],
          categories: [
            {
              id: 'SANDWICH',
              name: 'Sandwich',
            },
          ],
          foodTypesDTO: [
            {
              type: {
                id: 'STANDARD',
                name: 'Standard',
              },
              price: 6,
            },
          ],
          cuisine: {
            id: 'LIBANAISE',
          },
          supplements: [
            {
              id: 'CHEESE',
              name: 'Cheese',
              price: 2,
            },
          ],
          specifications: [],
          ingredients: [
            {
              id: 'OLIVE',
              name: 'Olive',
            },
            {
              id: 'MOZZARELLA',
              name: 'Mozzarella',
            },
          ],
        },
        foodType: {
          type: {
            id: 'STANDARD',
            name: 'Standard',
          },
          price: 6,
        },
        specifications: [],
        ingredients: [],
        supplements: [],
      },
    ],
  },
];

export const FOODS = [
  {
    id: '5f942ac69ca80b2270e74592',
    code: 'SANDWICH_LIBANAIS_2',
    name: 'Sandwich Libanais ||',
    description:
      "Un classique de sandwiches à l'orientale dévoré par les affamés du monde entier sur un coin de trottoir ou un banc public",
    media: [],
    categories: [
      {
        id: 'SANDWICH',
        name: 'Sandwich',
      },
    ],
    foodTypesDTO: [
      {
        type: {
          id: 'MAX',
          name: 'MAX',
        },
        price: 9,
      },
      {
        type: {
          id: 'STANDARD',
          name: 'Standard',
        },
        price: 6,
      },
    ],
    cuisine: {
      id: 'TUNISIENNE',
    },
    supplements: [
      {
        id: 'CHEESE',
        name: 'Cheese',
        price: 2,
      },
    ],
    specifications: [],
    ingredients: [
      {
        id: 'OLIVE',
        name: 'Olive',
      },
      {
        id: 'MOZZARELLA',
        name: 'Mozzarella',
      },
    ],
  },
  {
    id: '5f93eb229ca80b5e20109eef',
    code: 'SANDWICH_LIBANAIS',
    name: 'Sandwich Libanais',
    description:
      "Un classique de sandwiches à l'orientale dévoré par les affamés du monde entier sur un coin de trottoir ou un banc public",
    media: [],
    categories: [
      {
        id: 'SANDWICH',
        name: 'Sandwich',
      },
    ],
    foodTypesDTO: [
      {
        type: {
          id: 'STANDARD',
          name: 'Standard',
        },
        price: 6,
      },
    ],
    cuisine: {
      id: 'LIBANAISE',
    },
    supplements: [
      {
        id: 'CHEESE',
        name: 'Cheese',
        price: 2,
      },
    ],
    specifications: [],
    ingredients: [
      {
        id: 'OLIVE',
        name: 'Olive',
      },
      {
        id: 'MOZZARELLA',
        name: 'Mozzarella',
      },
    ],
  },
];
export const FAVORITES = [
  {
    id: '5f942ac69ca80b2270e74592',
    code: 'SANDWICH_LIBANAIS_2',
    name: 'Sandwich Libanais ||',
    description:
      "Un classique de sandwiches à l'orientale dévoré par les affamés du monde entier sur un coin de trottoir ou un banc public",
    media: [],
    categories: [
      {
        id: 'SANDWICH',
        name: 'Sandwich',
      },
    ],
    foodTypesDTO: [
      {
        type: {
          id: 'MAX',
          name: 'MAX',
        },
        price: 9,
      },
      {
        type: {
          id: 'STANDARD',
          name: 'Standard',
        },
        price: 6,
      },
    ],
    cuisine: {
      id: 'TUNISIENNE',
    },
    supplements: [
      {
        id: 'CHEESE',
        name: 'Cheese',
        price: 2,
      },
    ],
    specifications: [],
    ingredients: [
      {
        id: 'OLIVE',
        name: 'Olive',
      },
      {
        id: 'MOZZARELLA',
        name: 'Mozzarella',
      },
    ],
  },
  {
    id: '5f93eb229ca80b5e20109eef',
    code: 'SANDWICH_LIBANAIS',
    name: 'Sandwich Libanais',
    description:
      "Un classique de sandwiches à l'orientale dévoré par les affamés du monde entier sur un coin de trottoir ou un banc public",
    media: [],
    categories: [
      {
        id: 'SANDWICH',
        name: 'Sandwich',
      },
    ],
    foodTypesDTO: [
      {
        type: {
          id: 'STANDARD',
          name: 'Standard',
        },
        price: 6,
      },
    ],
    cuisine: {
      id: 'LIBANAISE',
    },
    supplements: [
      {
        id: 'CHEESE',
        name: 'Cheese',
        price: 2,
      },
    ],
    specifications: [],
    ingredients: [
      {
        id: 'OLIVE',
        name: 'Olive',
      },
      {
        id: 'MOZZARELLA',
        name: 'Mozzarella',
      },
    ],
  },
];

export const USER = {
  id: '11111111111111111111111',
  userDTO: {
    firstName: 'John',
    lastName: 'Helson',
    login: 'Jhon99',
    email: 'john.helson@mail.com',
  },
  addresses: ADDRESSES,
};
