import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Carlitos',
    email: 'carlitosdiazplaza@gmail.com',
    phone: 123123123,
    password: bcrypt.hashSync('cjd0646536', 10),
    isAdmin: true,
    ispromember: true,
  },
  {
    name: 'Anaid',
    email: 'anaidmdiazplaza@gmail.com',
    password: bcrypt.hashSync('anaid', 10),
    phone: 3213169898,
    ispromember: false,
  },
  {
    name: 'Cuchito',
    email: 'jennyann19800@gmail.com',
    password: bcrypt.hashSync('cuchito', 10),
    phone: 9412241056,
    isAdmin: true,
    ispromember: false,
  },

  {
    name: 'Yolymarie',
    email: 'yolymarie-diaz@hotmail.com',
    password: bcrypt.hashSync('yoly', 10),
    phone: 4075809881,
    isAdmin: true,
    ispromember: false,
  },

]

export default users