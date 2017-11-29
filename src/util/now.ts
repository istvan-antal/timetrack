const millisInSecond = 1000;

export const now = () => (
    Math.floor((new Date()).getTime() / millisInSecond)
);