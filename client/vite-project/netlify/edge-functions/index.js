export default async (req, context) => {
    console.log('THOSE ARE THE HEADERS AND FIRST LOG - SERVES AS GENERAL INFORMATION.', req.headers);
    console.log('THIS IS THE REQUEST - SERVES AS GENERAL INFORMATION.', req);
    console.log('let`s check the context object: ', context)
    console.log('I am trying to log only the pathname of the requested url...', window)
    new Response('Testing my first edge function')
};

export const config = {
    path: '/*',
    // this solutions works. it detects the facebookbot, so we can redirect based on this condition
    header: {
        'user-agent': '(facebookexternalhit)'
    }
}