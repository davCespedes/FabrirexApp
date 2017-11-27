import { Constants } from './../utils/Constants';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqLiteService {
    dataBaseName = Constants.dataBase.NAME;
    constructor(
        private _sqLite: SQLite
    ) { }
    createDatabase(dbName: string = this.dataBaseName, location: string = "default"): Promise<SQLiteObject> {
        return this._sqLite.create({ name: dbName, location: location });
    }
    createTable(db: SQLiteObject, entity: string): Promise<any> {
        let sql = this._getSqLiteCreateQueryByEntity(entity);
        return db.executeSql(sql, {});
    }
    save(db: SQLiteObject, item: any, entity: string): Promise<any> {
        let sqlQuery = this._getSqLiteInsertQueryByEntity(entity);
        let entities = Constants.entities;
        switch (entity) {
            case entities.USUARIOS: return db.executeSql(sqlQuery, [item.firstName, item.lastName, item.userType, item.username, item.password]);
            // case entities.EMPLEADOS: return db.executeSql(sqlQuery, [item.firstName, item.lastName, item.profileImage, item.username, item.password]);
            case entities.PRODUCTOS: return db.executeSql(sqlQuery, [item.description, item.stock, item.price]);
            case entities.SOLICITUDES: return db.executeSql(sqlQuery, [item.clientId, item.employeeId, item.destination, item.date]);
            case entities.DETALLES_SOLICITUDES: return db.executeSql(sqlQuery, [item.requestId, item.productId, item.quantity, item.total]);
        }
    }
    delete(tableName: string, _id: string) { }
    update(tableName: string, _id: string) { }
    getSessionUserData(db: SQLiteObject, user: any): Promise<SQLiteObject> {
        let sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
        return db.executeSql(sql, [user.username, user.password]);
    }
    private _getSqLiteCreateQueryByEntity(entity: string): string {
        let entities = Constants.entities;
        let startQuery = "CREATE TABLE IF NOT EXISTS " + entity;
        switch (entity) {
            case entities.USUARIOS: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(32), lastName VARCHAR(32), userType VARCHAR(32), username VARCHAR(32), password VARCHAR(32))";
            // case entities.EMPLEADOS: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(32), lastName VARCHAR(32), profileImage VARCHAR(32), username VARCHAR(32), password VARCHAR(32))";
            case entities.PRODUCTOS: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, description VARCHAR(32), stock INTEGER, price DOUBLE)";
            case entities.SOLICITUDES: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, clientId INTEGER, FOREIGN KEY(clientId) REFERENCES CLIENTES(_id), employeeId INTEGER, FOREIGN KEY(employeeId) REFERENCES EMPLEADOS(_id), destination VARCHAR(32), date VARCHAR(32))";
            case entities.DETALLES_SOLICITUDES: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, requestId INTEGER, FOREIGN KEY(requestId) REFERENCES SOLICITUDES(_id), productId INTEGER, FOREIGN KEY(productId) REFERENCES PRODUCTOS(_id), quantity INTEGER, total DOUBLE)";
        }
    }
    private _getSqLiteInsertQueryByEntity(entity: string): string {
        let entities = Constants.entities;
        let startQuery = "INSERT INTO " + entity;
        switch (entity) {
            case entities.USUARIOS: return startQuery + "(firstName, lastName, userType, username, password) VALUES (?,?,?,?,?)";
            // case entities.EMPLEADOS: return startQuery + "(firstName, lastName, profileImage, username, password) VALUES (?,?,?,?,?)";
            case entities.PRODUCTOS: return startQuery + "(description, stock, price) VALUES (?,?,?)";
            case entities.SOLICITUDES: return startQuery + "(clientId, employeeId, destination, date) VALUES (?,?,?,?)";
            case entities.DETALLES_SOLICITUDES: return startQuery + "(requestId, productId, quantity, total) VALUES (?,?,?,?)";
        }
    }

}