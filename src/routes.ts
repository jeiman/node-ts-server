import * as Util from 'util'
import * as UUID from 'uuid'
import * as Database from './lib/Database'

export function ping (req, res) {
  console.log('we are pinging...')
  return res.status(200).json('PONG')
}

export async function testUUID (req, res) {
  const fetchUsers = Util.promisify(Database.getAllCandidates)
  const transactionId = UUID.v4()

  return fetchUsers
}