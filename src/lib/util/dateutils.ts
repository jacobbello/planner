export const dateFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
});

export function getDayAsRange(day = new Date()) {
    const start = new Date(day);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);
    return { start, end };
}