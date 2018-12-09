import { FirebaseAuthDatabase } from "../../../data/firebase-auth-database";
import { performance } from 'perf_hooks'


const firebaseAuth = new FirebaseAuthDatabase()

const test = async () => {
    const t0 = performance.now()

    const auth = await firebaseAuth.signUpWithEmail('test-email@gmail.com', '123456')
    
    const t1 = performance.now()
    console.log('took: ', (t1 - t0), " milliseconds")

    await firebaseAuth.deleteUser(auth.id)
}

const main = async () => {
    await test()
    Promise.resolve()
}

main()

