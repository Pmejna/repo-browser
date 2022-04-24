import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'


dayjs.extend(customParseFormat);
export const formatDate = (date: string) => {
    return dayjs(`${date}`).format('DD-MM-YYYY');
}