import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Carlitos',
    email: 'carlitosdiazplaza@gmail.com',
    phone: 4074832251,
    password: bcrypt.hashSync('carlitos', 10),
    isAdmin: true,
    ispromember: true,
    isMilitary: true,
  },
  {
    name: 'Anaid',
    email: 'anaidmdiazplaza@gmail.com',
    password: bcrypt.hashSync('anaid', 10),
    phone: 3213169898,
    ispromember: false,
    isMilitary: false,
  },
  {
    name: 'Cuchito',
    email: 'jennyann19800@gmail.com',
    password: bcrypt.hashSync('cuchito', 10),
    phone: 9412241056,
    isAdmin: true,
    ispromember: false,
    isMilitary: false,
  },

  {
    name: 'Yolymarie',
    email: 'yolymarie-diaz@hotmail.com',
    password: bcrypt.hashSync('yoly', 10),
    phone: 4075809881,
    isAdmin: true,
    ispromember: false,
    isMilitary: false,
  },

  {
    name: 'Carlitus',
    email: 'carlitusjdiaz@gmail.com',
    password: bcrypt.hashSync('carlos', 10),
    phone: "8136775454",
    isAdmin: false,
    ispromember: false,
    isMilitary: true,
  },

]

export default users