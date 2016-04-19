import { Activity, Entity } from './entities';
import { remote } from 'electron';

const app = remote.app;
const fs = remote.require('fs');

export class DataManager {
    private entitiesPath: string;
    private currentId = (new Date()).getTime();
    constructor() {
        let userDataPath = app.getPath('userData');
        this.entitiesPath = userDataPath  + '/timetrack';
        // not worth the callback hell to do async
        try {
            fs.statSync(userDataPath);
        } catch (e) {
            fs.mkdirSync(userDataPath);
        }
        try {
            fs.statSync(this.entitiesPath);
        } catch (e) {
            fs.mkdirSync(this.entitiesPath);
        }
    }
    loadEntities(name: string, entitycls): Promise<any> {
        let fileName = this.entitiesPath + '/' + name + '.json'
        return new Promise((resolve, reject) => {
            fs.stat(fileName, (err) => {
                if (err && err.code === 'ENOENT') {
                    return resolve([]);
                }

                if (err) {
                    return reject(err);
                }

                fs.readFile(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(data).map((item) => {
                            let instance = new entitycls();
                            Object.keys(item).forEach((prop) => {
                                instance[prop] = item[prop];
                            });
                            return instance;
                        }));
                    }
                });
            });
        });
    }
    persist(name: string, entitycls, entity: Entity) {
        let fileName = this.entitiesPath + '/' + name + '.json'
        entity.id = this.currentId;
        this.currentId += 1;
        return this.loadEntities(name, entitycls).then((items) => {
            items.push(entity);
            return new Promise((resolve, reject) => {
                fs.writeFile(fileName, JSON.stringify(items), function (error) {
                    console.log('Written ' + fileName);
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        });
    }
}