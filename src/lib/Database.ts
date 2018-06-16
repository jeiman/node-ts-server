import * as Mysql from 'mysql'
import * as Config from '../utils/config'

const pool : any = Mysql.createPool(Config.DBConfig)

interface Payload {
  transactionId: string
  stripeChargeId: string
  description: string
  email: string
  amount: string
  status: string
  createdDate: Date
  stripeUnixTime: string
}

export function createPaymentRecord (payload : Payload, callback : any) {
  const transactionId = payload.transactionId
  const stripeChargeId = payload.stripeChargeId
  const description = payload.description
  const email = payload.email
  const amount = payload.amount
  const status = payload.status
  const createdDate = payload.createdDate
  const stripeUnixTime = payload.stripeUnixTime

  try {
    pool.query('INSERT INTO purchases (transaction_id, stripe_charge_id, description, email, amount, status, created_date, stripe_unix_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [transactionId, stripeChargeId, description, email, amount, status, createdDate, stripeUnixTime], (error, results, field) => {
      if (error) {
        console.log('Error saving payment record', error)
        return
      }
      return callback(null, results)
    })
  } catch (err) {
    console.log('Error creating payment record', err)
  }
}

export function updateStatus (payload, callback) {
  const userId = payload.id
  const updatedDate = payload.updatedDate
  const status = payload.status
  const memberUpdated = payload.memberUpdated

  try {
    pool.query('UPDATE candidate_data SET memberUpdated = ?, active = ?, updatedDate = ? WHERE id = ? ', [memberUpdated, status, updatedDate, userId], (error, results, field) => {
      if (error) {
        console.log('err status update', error)
        return
      }
      return callback(null, results)
    })
  } catch (err) {
    console.log('Error updating status candidate', err)
    return
  }
}

export function getAllCandidates (callback : any) {
  try {
    pool.query('SELECT * FROM candidate_data', (error, results, field) => {
      if (error) {
        console.log('err retrieving all cands', error)
        return
      }
      return callback(null, results)
    })
  } catch (err) {
    console.log('Error retrieving candidates', err)
    return
  }
}

