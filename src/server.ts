import app from './presentation/app'

app.listen(3001, () => {
    console.log('Express server listening on port ' + 3001)

    app._router.stack.map((mainStack, i) => {
        getRoutes(mainStack)
        
    })
})

function getRoutes(mainStack: any) {
    if(mainStack.route) {
        const path = mainStack.route.path
        const method = (mainStack.route.stack[0].method).toString().toUpperCase()
        console.log('\x1b[33m%s\x1b[33m%s\x1b[0m', `${method}: `, `${path}`)
    }
}