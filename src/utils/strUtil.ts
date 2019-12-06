export class StrUtil {

    static genRandomStr(title: string) {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : `${now.getMonth() + 1}`;
        const day = now.getDate() < 10 ? `0${now.getDate()}` : `${now.getDate()}`;
        const hour = now.getHours() < 10 ? `0${now.getHours()}` : `${now.getHours()}`;
        const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
        const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : `${now.getSeconds()}`;
        const msec = now.getMilliseconds() < 10 ? `00${now.getMilliseconds()}` : now.getMilliseconds() < 100 ? `0${now.getMilliseconds()}` : `${now.getMilliseconds()}`;
        const randomNum = (Math.round(Math.random() * 899 + 1000)).toString();
        const t = `${title}${year}${month}${day}${hour}${minutes}${seconds}${msec}${randomNum}`;
        return t;
    }


}   