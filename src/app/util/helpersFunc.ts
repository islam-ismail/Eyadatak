import axios from "axios";
import jwt_decode from "jwt-decode";
import { apiAssetUrl_development, apiAssetUrl_production } from "./constants";

// Generate the years since 1900
export const generateYears = (startYear?: number) => {
    let years = [];
    const currentYear = new Date().getFullYear();
    startYear = startYear || 1900;

    while (startYear <= currentYear - 14) {
        let year = { key: ++startYear, value: startYear };
        years.push(year);
    }

    return years.reverse();
};

// Months Array
export const months: { value: string; key: string }[] = [
    { value: "01", key: "January" },
    { value: "02", key: "February" },
    { value: "03", key: "March" },
    { value: "04", key: "April" },
    { value: "05", key: "May" },
    { value: "06", key: "June" },
    { value: "07", key: "July" },
    { value: "08", key: "August" },
    { value: "09", key: "September" },
    { value: "10", key: "October" },
    { value: "11", key: "November" },
    { value: "12", key: "December" }
];

// const isLeap = new Date(year, 1, 29).getMonth() == 1;

// Generate the Days of the month
const generateDays = (limit = 31) => {
    let days = [];
    const singleDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (var i = 1; i <= limit; i++) {
        if (singleDigits.includes(i)) {
            let day = { key: `0${i}`, value: `0${i}` };
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

export const getYearFromDate = (date: string): string => {
    if (date) {
        let dateParts = date.split("-");

        if (dateParts[0]) {
            return dateParts[0];
        }
    }

    return "";
};

export const getMonthFromDate = (date: string): string => {
    if (date) {
        let dateParts = date.split("-");

        if (dateParts[1]) {
            return dateParts[1];
        }
    }

    return "";
};

export const getDayFromDate = (date: string): string => {
    if (date) {
        let dateParts = date.split("-");

        if (dateParts[2]) {
            return dateParts[2];
        }
    }

    return "";
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
    return localStorage.getItem("eyadatak-locale") as string;
};

export const setSignedInUser = (user: string) => {
    localStorage.setItem("eyadatak-signedInUser", user);
};

export const getSignedInUser = () => {
    return localStorage.getItem("eyadatak-signedInUser");
};

export const removeSignedInUser = () => {
    return localStorage.removeItem("eyadatak-signedInUser");
};

//Set the Authorization Header in the default header
export const setAuthorizationHeader = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

//Check the expiration date of the token
export const isTokenExpired = (token: string) => {
    if (token) {
        const decodedToken = jwt_decode<{ exp: number }>(token);
        if (decodedToken.exp < Date.now() / 1000) {
            return true;
        } else {
            return false;
        }
    }
};

export const adjustDateTimeZone = (serverDate: string) => {
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

export const adjustDateZone = (serverDate: string) => {
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

export const apiAssetUrl = (filename: string) => {
    let baseURL: string;
    if (process.env.NODE_ENV !== "production") {
        baseURL = apiAssetUrl_development;
    } else {
        baseURL = apiAssetUrl_production;
    }

    return baseURL + filename;
};

export const apiAssetName = (filename: string) => {
    let name = filename;

    let filenameParts = filename.split("/");

    if (filenameParts && filenameParts.length) {
        name = filenameParts.pop() as string;
    }

    return name;
};
