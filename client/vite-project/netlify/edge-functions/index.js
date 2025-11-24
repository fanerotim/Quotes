export default async (req) => {
    console.log(req.headers.priority['user-agent']);

    const userAgent = req.headers.priority['user-agent'];
    console.log('this is the user agent in a variable', userAgent)
    new Response('Testing my first edge function')
};

export const config = {
    path: '/'
}