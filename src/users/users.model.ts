import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column
    username: string;

    @Column
    password: string;

    @Column
    email: string;

    @Column(DataType.JSON)
    registrationLocation: {
        registrationCity: string;
        registrationStreet: string;
    };

    @Column(DataType.JSON)
    currentLocation: {
        currentCity: string;
        currentStreet: string;
    };
}
