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
            case entities.PRODUCTOS: return db.executeSql(sqlQuery, [item.description, item.stock, item.price, item.image]);
            case entities.SOLICITUDES: return db.executeSql(sqlQuery, [item.clientId, item.employeeId, item.destination, item.date]);
            case entities.DETALLES_SOLICITUDES: return db.executeSql(sqlQuery, [item.requestId, item.productId, item.quantity, item.total]);
        }
    }
    getDataByEntity(db: SQLiteObject, entity: string) {
        let sql = 'SELECT * FROM ' + entity;
        return db.executeSql(sql, []);
    }
    delete(tableName: string, _id: string) { }
    update(tableName: string, _id: string) { }
    getSessionUserData(db: SQLiteObject, user: any): Promise<SQLiteObject> {
        let sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
        return db.executeSql(sql, [user.username, user.password]);
    }
    getRequestByClientAndEmployee(db: SQLiteObject, item: any): Promise<SQLiteObject> {
        let sql = 'SELECT * FROM solicitudes WHERE clientId = ?';
        return db.executeSql(sql, [item.clientId]);
    }
    private _getSqLiteCreateQueryByEntity(entity: string): string {
        let entities = Constants.entities;
        let startQuery = "CREATE TABLE IF NOT EXISTS " + entity;
        switch (entity) {
            case entities.USUARIOS: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(32), lastName VARCHAR(32), userType VARCHAR(32), username VARCHAR(32), password VARCHAR(32))";
            case entities.PRODUCTOS: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, description VARCHAR(32), stock INTEGER, price DOUBLE, image VARCHAR(32))";
            case entities.SOLICITUDES: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, clientId INTEGER, employeeId INTEGER, destination VARCHAR(32), date VARCHAR(32), total DOUBLE,FOREIGN KEY(clientId) REFERENCES usuarios(_id), FOREIGN KEY(employeeId) REFERENCES usuarios(_id))";
            case entities.DETALLES_SOLICITUDES: return startQuery + "(_id INTEGER PRIMARY KEY AUTOINCREMENT, requestId INTEGER, FOREIGN KEY(requestId) REFERENCES solicitudes(_id), productId INTEGER, FOREIGN KEY(productId) REFERENCES productos(_id), quantity INTEGER, subTotal DOUBLE)";
        }
    }
    private _getSqLiteInsertQueryByEntity(entity: string): string {
        let entities = Constants.entities;
        let startQuery = "INSERT INTO " + entity;
        switch (entity) {
            case entities.USUARIOS: return startQuery + "(firstName, lastName, userType, username, password) VALUES (?,?,?,?,?)";
            case entities.PRODUCTOS: return startQuery + "(description, stock, price, image) VALUES (?,?,?,?)";
            case entities.SOLICITUDES: return startQuery + "(clientId, employeeId, destination, date, total) VALUES (?,?,?,?,?)";
            case entities.DETALLES_SOLICITUDES: return startQuery + "(requestId, productId, quantity, subTotal) VALUES (?,?,?,?)";
        }
    }

}