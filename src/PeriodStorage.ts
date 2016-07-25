import { remote } from 'electron';
import { Activity } from './entities';
import { now } from './util/now';
const fs = remote.require('fs');

export class PeriodStorage {
    private filePath: string;
    constructor(filePath: string) {
        this.filePath = filePath;
        fs.stat(filePath, (error) => {
            if (error && error.code === 'ENOENT') {
                fs.writeFile(filePath, "id,activityName,activityId,startTime,elapsedTime\n", (err) => {
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
            .join(',') + "\n";
        // TODO: add locking/queueing
        fs.appendFile(this.filePath, line, (err) => {
            if (err) {
                throw err;
            }
        });
    }
    fetchPeriods(onPeriod: (activity: Activity, startTime: number, elapsedTime: number)=>any, onDone: ()=>any) {
        if (!fs.existsSync(this.filePath)) {
            onDone();
            return;
        }
        // TODO: use fs.read instead for better scalability
        fs.readFile(this.filePath, (error, data) => {
            if (error) {
                throw error;
            }
            let position = data.indexOf("\n") + 1;
            while (position < data.length) {
                const lineEndPosition = data.indexOf("\n", position);
                onLineRead(data.slice(position, lineEndPosition).toString());
                position = lineEndPosition + 1;
            }
            onDone();
        });

        function onLineRead(line: string) {
            const fields = line.split(',');
            const activity: Activity = {
                id: +fields[2],
                name: fields[1]
            };
            onPeriod(activity, +fields[3], +fields[4]);
        }
    }
}