import cookies from 'next-cookies'
import { NextPageContext } from 'next'


export function AuthPage(ctx: NextPageContext) {
    // return ke Promise = async
    return new Promise(resolve => {
        const allCookies = cookies(ctx)
        if (allCookies.token) {
            return ctx.res?.writeHead(302, {
                Location: '/posts'
            }).end()
        }
        return resolve('unauthorized')
    })
}

export function AuthPost(ctx: NextPageContext){
    return new Promise(resolve => {
        const allCookies = cookies(ctx)
        if (!allCookies.token) {
            return ctx.res?.writeHead(302, {
                Location: '/auth/login'
            }).end()
        }
        return resolve({
            token: allCookies.token
        })
    })
}
