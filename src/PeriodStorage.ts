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
    // tslint:disable-next-line:no-any
    fetchPeriods(onPeriod: (activity: Activity, startTime: number, elapsedTime: number) => any, onDone: () => any) {
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
            onPeriod(activity, +fields[3], +fields[4]);
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