export default async (req) => {
    console.log(req.headers);
    console.log('and this is the complete request', req, ' and here is requested url', req.url)

    new Response('Testing my first edge function')
};

export const config = {
    path: '/*',
    // this solutions works. it detects the facebookbot, so we can redirect based on this condition
    header: {
        'user-agent': '(facebookexternalhit)'
    }
}