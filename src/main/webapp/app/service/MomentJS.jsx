import moment from "moment";

export class MomentJS {

    static renderTime(date) {
        const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        let datetime = moment(date)
        let hour = datetime.hour();
        if (hour == "0") {
            hour = hour + "0";
        }
        let minute = parseInt(datetime.minute());
        if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
        }
        let finalTime = datetime.date() + ' ' + months[datetime.month()] + ', ' + hour + ':' + minute;
        return finalTime;
    }
}