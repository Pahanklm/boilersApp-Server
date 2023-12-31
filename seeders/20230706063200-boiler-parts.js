const { faker } = require('@faker-js/faker');
('use strict');

const boilerManufacturers = [
    'Ariston',
    'Chaffoteux&Maury',
    'Baxi',
    'Bongioanni',
    'Saunier Duval',
    'Buderus',
    'Strategist',
    'Henry',
    'Northwest',
];
const partsManufacturers = [
    'Azure',
    'Gloves',
    'Cambridgeshire',
    'Salmon',
    'Montana',
    'Sensor',
    'Lesly',
    'Radian',
    'Gasoline',
    'Croataia',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'BoilerParts',
            [...Array(100)].map(() => ({
                boiler_manufacturer:
                    boilerManufacturers[
                        Math.floor(Math.random() * boilerManufacturers.length)
                    ],
                parts_manufacturer:
                    partsManufacturers[
                        Math.floor(Math.random() * partsManufacturers.length)
                    ],
                price: faker.string.numeric(4),
                name: faker.lorem.sentence(2),
                description: faker.lorem.sentence(10),
                images: JSON.stringify(
                    [...Array(7)].map(
                      () =>
                        `${faker.image.technics()}?random=${faker.random.numeric(30)}`,
                    ),
                  ),            
                vendor_code: faker.internet.password(),
                in_stock: faker.string.numeric(1),
                bestseller: faker.datatype.boolean(),
                new: faker.datatype.boolean(),
                popularity: faker.number.int(3),
                compatibility: faker.lorem.sentence(7),
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('boilerParts', null, {});
    },
};
