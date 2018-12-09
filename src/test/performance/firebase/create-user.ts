import { FirebaseAuthDatabase } from "../../../data/firebase-auth-database";
import { performance } from 'perf_hooks'
import { AuthInfo } from "../../../core/data-sources/auth-data-source";
import { StatisticManager } from "../../statistic";


const firebaseAuth = new FirebaseAuthDatabase()
const MAX_TESTS = 40
const test = async () => {
    let requestTimeArray: number[] = []

    for(let i = 0; i<MAX_TESTS; i++){
        console.log(i)
        try {
            const t0 = performance.now()
            const auth = await firebaseAuth.signUpWithEmail(`test${i}@email.com`, '123456')
            const t1 = performance.now()
            requestTimeArray.push(t1-t0)

            await firebaseAuth.deleteUser(auth.id)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(requestTimeArray)
    
    const statistics = new StatisticManager('TESTE DE PERFORMANCE DE CREATE USER - FIREBASE', requestTimeArray)
    statistics.generateResults()
}

const main = async () => {
    Promise.resolve(test())
}

main()
