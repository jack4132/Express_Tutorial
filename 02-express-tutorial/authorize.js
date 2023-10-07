/*
 * File: authorize.js
 * Project: 2-express-tutorial
 * File Created: Monday, 28th August 2023 1:33:38 pm
 * Author: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Last Modified: Monday, 28th August 2023 1:36:47 pm
 * Modified By: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Copyright 2020 - 2023 Mutual Mobile, Mutual Mobile
 */
const authorize = (req, res, next) =>
{
const { user } = req.query
if (user ==='john' ) {
req.user = { name: 'john', id: 3 }
next ()
} else {
res.status(401).send('Unauthorized')
}
}
module.exports = authorize