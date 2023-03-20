const db = require('../db/index')

exports.createUser = async (req, res) => {
  const  { username } = req.body

  try{
    const { 
      rows: [user], 
    } = await db.query('INSERT INTO Users (username) VALUES ($1) RETURNING *', 
    [username])
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json(err.message)
    }
  };
