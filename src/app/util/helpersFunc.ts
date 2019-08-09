import axios from "axios";
import jwt_decode from "jwt-decode";

// Generate the years since 1900
export const generateYears = (startYear: number) => {
    let years = [];
    const currentYear = new Date().getFullYear();
    startYear = startYear || 1900;

    while (startYear <= currentYear - 14) {
        let year = { key: startYear++, value: startYear };
        years.push(year);
    }

    return years.reverse();
};

// Months Array
export const months = [
    { key: "01", value: "January" },
    { key: "02", value: "February" },
    { key: "03", value: "March" },
    { key: "04", value: "April" },
    { key: "05", value: "May" },
    { key: "06", value: "June" },
    { key: "07", value: "July" },
    { key: "08", value: "August" },
    { key: "09", value: "September" },
    { key: "10", value: "October" },
    { key: "11", value: "November" },
    { key: "12", value: "December" }
];

// const isLeap = new Date(year, 1, 29).getMonth() == 1;

// Generate the Days of the month
const generateDays = (limit = 31) => {
    let days = [];
    const singleDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (var i = 1; i <= limit; i++) {
        if (singleDigits.includes(i)) {
            let day = { key: `0${i}`, value: i };
            days.push(day);
        } else {
            let day = { key: i, value: i };
            days.push(day);
        }
    }

    return days;
};

// Get the days based on the month
export const getDays = (month: string) => {
    const monthsWith31 = ["01", "03", "05", "07", "08", "10", "12"];

    if (monthsWith31.includes(month)) {
        return generateDays(31);
    } else if (month === "02") {
        return generateDays(28);
    } else {
        return generateDays(30);
    }
};

// Get JWT from Local Storage
export const getJWT = () => {
    return localStorage.getItem("eyadatak-jwt");
};

//Set Locale to Local Storage
export const setLocale = (locale: string) => {
    return localStorage.setItem("eyadatak-locale", locale);
};

// Get Locale from Local Storage
export const getLocale = (): string => {
    return <string>localStorage.getItem("eyadatak-locale");
};

//Set the Authorization Header in the default header
export const setAuthorizationHeader = (token: string) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

//Check the expiration date of the token
export const isTokenExpired = (token: string) => {
    if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
            return true;
        } else {
            return false;
        }
    }
};

export const adjustDateTimeZone = serverDate => {
    // Adjusted it (- 2) as the timezone on server is Africa/Cairo
    const offset = -new Date().getTimezoneOffset() / 60 - 2;
    const d = new Date(serverDate);
    d.setTime(d.getTime() + offset * 60 * 60 * 1000);
    const dateString =
        d.getFullYear().toString() +
        "-" +
        ((d.getMonth() + 1).toString().length === 2
            ? (d.getMonth() + 1).toString()
            : "0" + (d.getMonth() + 1).toString()) +
        "-" +
        (d.getDate().toString().length === 2
            ? d.getDate().toString()
            : "0" + d.getDate().toString()) +
        " " +
        (d.getHours().toString().length === 2
            ? d.getHours().toString()
            : "0" + d.getHours().toString()) +
        ":" +
        (parseInt(d.getMinutes().toString()).toString().length === 2
            ? parseInt(d.getMinutes().toString()).toString()
            : "0" + parseInt(d.getMinutes().toString()).toString()) +
        ":" +
        (parseInt(d.getSeconds().toString()).toString().length === 2
            ? parseInt(d.getSeconds().toString()).toString()
            : "0" + parseInt(d.getSeconds().toString()).toString());

    return dateString;
};

export const adjustDateZone = serverDate => {
    // Adjusted it (- 2) as the timezone on server is Africa/Cairo
    const offset = -new Date().getTimezoneOffset() / 60 - 2;
    const d = new Date(serverDate);
    d.setTime(d.getTime() + offset * 60 * 60 * 1000);
    const dateString =
        (d.getDate().toString().length === 2
            ? d.getDate().toString()
            : "0" + d.getDate().toString()) +
        "/" +
        ((d.getMonth() + 1).toString().length === 2
            ? (d.getMonth() + 1).toString()
            : "0" + (d.getMonth() + 1).toString()) +
        "/" +
        d.getFullYear().toString();

    return dateString;
};
