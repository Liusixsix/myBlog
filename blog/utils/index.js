import moment from "moment";
export function momentFormat(time) {
    if (!time) return "";
    return moment(time).format("YYYY-MM-DD");
}