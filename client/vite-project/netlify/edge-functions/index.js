export default async (req) => {
    console.log('THOSE ARE THE HEADERS AND FIRST LOG - SERVES AS GENERAL INFORMATION.', req.headers);
    console.log('req.url appears to be a string, but I am checking it. And... it is a: ', typeof(req.url))
    console.log('I am trying to log only the pathname of the requested url...', window.location.pathname)
    new Response('Testing my first edge function')
};

export const config = {
    path: '/*',
    // this solutions works. it detects the facebookbot, so we can redirect based on this condition
    header: {
        'user-agent': '(facebookexternalhit)'
    }
}