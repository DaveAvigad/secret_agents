import { check, validationResult, body } from 'express-validator/check'
import db from './services/mysql'
import maps from './services/maps'

/**
 * Server Endpoints Handlers.
 */

export default {
    /**
     * middleware
     * @param Array
     * @return {Express.next()} Validates request inputs and jump to the next middleware.
    */
    
    validators: [
        check('target-location').not().isEmpty(),
        check('target-location').isLength({ max: 100 }),
        body('target-location').not().isEmpty().trim().escape(),
    ], 
    /**
     * @function countries_by_isolation
     * @return {Express.Response} Returns the most isolated country .
     */

    countries_by_isolation: async (req, res) => {
        // countries-by-isolation
        const q = 'SELECT * from secret'
        const data = await db.query(q, { type: db.QueryTypes.SELECT })

        let agents = {}
        let countries = {}

        for (let i in data) {
            if (!agents[data[i].agent]) agents[data[i].agent] = 1
            else agents[data[i].agent]++
        }
        for (let i in data) {
            if (agents[data[i].agent] === 1) {
                if (!countries[data[i].country]) {
                    countries[data[i].country] = 1
                } else {
                    countries[data[i].country]++
                }
            }
        }

        let min = countries.length ? 0 : 1
        let max = countries.length ? 0 : 1

        let min_key = 'no country'
        let max_key = 'no country'

        for (let country in countries) {
            if (!(min < countries[country])) {
                min = countries[country]
                min_key = country
            }
            if (!(max > countries[country])) {
                max = countries[country]
                max_key = country
            }
        }
        const result = {
            min: { [min_key]: min },
            max: { [max_key]: max },
            data
        }
        res.status(200).json(result.max)
    },
    /**
     * @function find_closest
     * @return {Express.Response} Finds the closest and farthest missions from a specific address.
     */

    find_closest: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: await errors.mapped()
            })
        }
        
        const location = req.body[ 'target-location' ]        
        const q = 'SELECT * from secret'
        const data = await db.query(q, { type: db.QueryTypes.SELECT })
        const addresses = data.map(obj => obj.address)
        const distance = await maps.calculate_distance(addresses, location)

        if (distance.status !== 200 || !distance.json.rows[0]) throw new Error('input not valid!')
        
        const { elements } = distance.json.rows[ 0 ]
        for (let i in elements) {
            Object.assign(data[i], {
                distance: elements[ i ].status === 'OK'
                    ? elements[ i ].distance.value
                    : 'ZERO_RESULTS'
            })
        }

        let min = data[0]
        let max = data[0]
        let min_index = null
        let max_index = null
        
        for (const [ i ] of data.entries()) {
            if (data[i].distance !== 'ZERO_RESULTS') {
                if (!(min.distance < data[i].distance)) {
                    min = data[i]
                    min_index = i
                }
                if (!(max.distance > data[i].distance)) {
                    max = data[i]
                    max_index = i
                }
            }
        }
            
        const result = {
            min_index,
            max_index,
            data
        }

        res.status(200).send(result)
    }
}