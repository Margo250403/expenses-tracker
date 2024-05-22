import moment from 'moment';

export const dateFormat = (date: string | Date): string => {
    return moment(date).format('DD/MM/YYYY');
};
