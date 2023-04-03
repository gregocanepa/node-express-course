const Product = require('../models/product')



const getAllProductsStatic = async (req, res) => {
    const sort = req.query.sort
    const newSort = sort.replace(',', ' ')
    console.log(sort)
    const products = await Product.find({featured: true}).sort(newSort)
    res.status(200).json({data: products, numberHits: products.length})
}

const getAllProducts = async (req, res) => {
    const {name, company, featured, sort, fields, numericFilters} = req.query
    let queryObject = {}
    if (name) {queryObject.name = name}
    if (company) {queryObject.company = company}
    if (featured) {queryObject.featured = featured === true ? true : false}
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': 'lt',
            '<=': 'lte'
        }
        const regEx = /\b(>|>=|=|<=|<)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match)=>`-${operatorMap[match]}-`
        )
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-')
            if (options.includes(field)) {
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }
    let result = Product.find(queryObject)
    if (sort) {
        result = result.sort(sort)
    }
    if (fields) {
        const fieldsList = fields.replace(/,/g, ' ',)
        console.log(fieldsList)
        result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.page) || 10
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({data: products, numberHits: products.length})
}

module.exports = {getAllProductsStatic, getAllProducts}
