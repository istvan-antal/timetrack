import { Activity } from './entities';
import { now } from './util/now';
const { remote } = require('electron');
const fs = remote.require('fs');

export class PeriodStorage {
    private filePath: string;
    constructor(filePath: string) {
        this.filePath = filePath;
        console.debug(`PeriodStorage: ${filePath}`);
        // tslint:disable-next-line:no-any
        fs.stat(filePath, (error: any) => {
            if (error && error.code === 'ENOENT') {
                // tslint:disable-next-line:no-any
                fs.writeFile(filePath, 'id,activityName,activityId,startTime,elapsedTime\n', (err: any) => {
                    if (err) {
                        throw err;
                    }
                });
                return;
            }
            if (error) {
                throw error;
            }
        });
    }
    addPeriod(activity: Activity, startTime: number, elapsedTime: number) {
        // TODO: use a less naive id approach
        const id = now();
        const line = [id, activity.name, activity.id, startTime, elapsedTime]
            .join(',') + '\n';
        // TODO: add locking/queueing
        // tslint:disable-next-line:no-any
        fs.appendFile(this.filePath, line, (err: any) => {
            if (err) {
                throw err;
            }
        });
    }
    async deletePeriod(id: number) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(this.filePath)) {
                resolve();
                return;
            }

            // TODO: use fs.read instead for better scalability
            const lines: string[] = [];
            // tslint:disable-next-line:no-any
            fs.readFile(this.filePath, (error: any, data: any) => {
                if (error) {
                    reject(error);
                }
                let position = 0;
                while (position < data.length) {
                    const lineEndPosition: number = data.indexOf('\n', position);
                    const lineString = data.slice(position, lineEndPosition).toString();
                    const fields = lineString.split(',');

                    // console.log(+fields[0], id);
                    if (position && +fields[0] === id) {
                        console.log('del', position, fields);
                        position = lineEndPosition + 1;
                        continue;
                    }

                    lines.push(lineString);
                    position = lineEndPosition + 1;
                }
                fs.writeFile(this.filePath, lines.join('\n') + '\n', (writeError: Error | undefined) => {
                    if (writeError) {
                        reject(writeError);
                    } else {
                        resolve(true);
                    }
                });
            });
        });
    }
    fetchPeriods(
        // tslint:disable-next-line:no-any
        onPeriod: (activity: Activity, startTime: number, elapsedTime: number, periodId: number) => any,
        // tslint:disable-next-line:no-any
        onDone: () => any) {
        if (!fs.existsSync(this.filePath)) {
            onDone();
            return;
        }

        const onLineRead = (line: string) => {
            // tslint:disable:no-magic-numbers
            const fields = line.split(',');
            const activity: Activity = {
                id: +fields[2],
                name: fields[1],
                periods: [],
            };
            onPeriod(activity, +fields[3], +fields[4], +fields[0]);
        };
        // TODO: use fs.read instead for better scalability
        // tslint:disable-next-line:no-any
        fs.readFile(this.filePath, (error: any, data: any) => {
            if (error) {
                throw error;
            }
            let position: number = (data.indexOf('\n') as number) + 1;
            while (position < data.length) {
                const lineEndPosition: number = data.indexOf('\n', position);
                onLineRead(data.slice(position, lineEndPosition).toString());
                position = lineEndPosition + 1;
            }
            onDone();
        });
    }
}