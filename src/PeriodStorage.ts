import { remote } from 'electron';
import { Activity } from './entities';
const fs = remote.require('fs');

export class PeriodStorage {
    private filePath: string;
    constructor(filePath: string) {
        this.filePath = filePath;
        fs.stat(filePath, (error) => {
            if (error && error.code === 'ENOENT') {
                fs.writeFile(filePath, "id,activityName,activityId,startTime,endTime\n", (err) => {
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
    addPeriod(activity: Activity, startTime: number, endTime: number) {
        // TODO: use a less naive id approach
        const id = Math.floor((new Date()).getTime() / 1000)
        const line = [id, activity.name, activity.id, startTime, endTime]
            .join(',') + "\n";
        // TODO: add locking/queueing
        fs.appendFile(this.filePath, line, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}