export async function exceptionHandlerDecorator( guestFunction, httpResponse, guestFunctionParametersArray=[] ) {
    try {
        const result = guestFunction(...guestFunctionParametersArray)
        if (typeof(result === "Promise")) return await result
        return result
    } catch (exception) {
        console.error(exception)
        httpResponse.sendStatus(500)
    }
}