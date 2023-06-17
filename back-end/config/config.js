module.exports.config = {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 8081,
    NODE_ENV: process.env.NODE_ENV || "dev",
    DB_USER: process.env.DB_USER || "user",
    DB_PASSWORD: process.env.DB_PASSWORD || "user",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_DATABASE: process.env.DB_DATABASE || "testdb",
    SECRET_KEY: process.env.SECRET_KEY || "ciorbaRadauteana",
    STUDENT_ROLE: "Elev",
    TEACHER_ROLE: "Profesor",
    DEFAULT_SOURCE_CODE: "#include<iostream>\nusing namespace std;\n\nint main() {\n\tcout << \"Hello world!\";\n\treturn 0;\n}",
    HW_STATUS: {
        INACTIVE: "Inactiv",
        IN_PROGRESS: "In lucru",
        SUBMITTED: "Trimis",
        GRADED: "Corectat"
    } 
};
