export interface Activity {
    id: number;
    name: string;
    trackedTime?: number;
    periods: Array<{ id: number; startTime: number; duration: number }>;
}