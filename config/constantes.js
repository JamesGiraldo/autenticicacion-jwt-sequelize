const USER_TYPE = {
    ADMIN: 1,
    USER: 2,
    ESTUDENT: 3,
    TESTER: 4,
};

const APIVERSION = {
    v1: "/api/v1",
};

const HTTP_CODE = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCETABLE: 406,
    CONFLIT: 409,
    SERVER_ERROR: 500,
    SUCCESS: 200,
};

const HTTP_MESSAGE = {
    CREDENTIAL_INCORRECT: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "CREDENTIAL_INCORRECT"
    },
    INCTIVE_USER: {
        code: HTTP_CODE.FORBIDDEN,
        message: "INCTIVE_USER"
    },
    USER_NOT_FOUND: {
        code: HTTP_CODE.NOT_FOUND,
        message: "USER_NOT_FOUND"
    },
    USER_ALREADY_EXISTS: {
        code: HTTP_CODE.CONFLIT,
        message: "USER_ALREADY_EXISTS"
    },
    USER_NOT_FOUND_BY_ID: {
        code: HTTP_CODE.NOT_FOUND,
        message: "USER_NOT_FOUND_BY_ID"
    },
    EMAIL_ALREADY_EXISTS: {
        code: HTTP_CODE.CONFLIT,
        message: "EMAIL_ALREADY_EXISTS"
    },
    PASSWORD_ALREADY_EXISTS: {
        code: HTTP_CODE.CONFLIT,
        message: "PASSWORD_ALREADY_EXISTS"
    },
    INTERNAL_SERVER_ERROR: {
        code: HTTP_CODE.SERVER_ERROR,
        message: "INTERNAL_SERVER_ERROR"
    },
    SUCCESS: {
        code: HTTP_CODE.SUCCESS,
        message: "SUCCESS"
    },
    NO_RESULT: {
        code: HTTP_CODE.NOT_FOUND,
        message: "NO_RESULT"
    },
    NO_TOKEN: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "NO_TOKEN"
    },
    TOKEN_EXPIRED: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "TOKEN_EXPIRED"
    },
    TOKEN_INVALID: {
        code: HTTP_CODE.UNAUTHORIZED,
        message: "TOKEN_INVALID"
    },

};

module.exports = {
    APIVERSION,
    USER_TYPE,
    HTTP_MESSAGE,
    HTTP_CODE
};