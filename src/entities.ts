export interface Activity {
    id: number;
    name: string;
    trackedTime?: number;
    periods: Array<{ startTime: number; duration: number }>;
}