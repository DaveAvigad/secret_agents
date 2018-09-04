import config from '../config/env'
const { GKEY } = config

const googleMapsClient = require('@google/maps').createClient({
    key: GKEY,
    Promise: Promise
});
/**
 * Calculates the distance between origin to multiple destinations
 * @function calculate_distance
 * @param dest<Array> Addresses or Coordinates "x, y"
 * @param origin<String> Address or Coordinate "x, y"
 * @return {Promise} list of address and distance from origin
 */
const calculate_distance = async (dest = [], origin = null) => {
    try {
        return await googleMapsClient.distanceMatrix({
                destinations: dest,
                origins: origin,
            })
            .asPromise()
    } catch (e) {
        return e
    }
}
export default { calculate_distance }
