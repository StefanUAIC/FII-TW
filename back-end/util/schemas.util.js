const getNextId = async (schemaModel) => {
    const collection = schemaModel.collection;
    const result = await collection.find({}, {id: 1}).sort({id: -1}).limit(1).toArray();
    if (result.length === 0) {
        return 1;
    }

    return result[0].id + 1;
};

module.exports = {getNextId};