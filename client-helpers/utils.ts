export function toTimeString(time: number) {
    return (new Date(time)).toLocaleString();
}