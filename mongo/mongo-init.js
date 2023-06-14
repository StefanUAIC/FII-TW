db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || "testdb")

db.createUser( {
    user: process.env.MONGO_INITDB_USERNAME || "user",
    pwd: process.env.MONGO_INITDB_PASSWORD || "user",
    roles: [{role: "dbOwner", db: "testdb"}]
})

