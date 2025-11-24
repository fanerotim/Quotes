export default async (req) => {
    console.log(req.headers);

    new Response('Testing my first edge function')
};

export const config = {
    path: '/',
    headers: {
        'user-agent': '(facebookexternalhit)'
    }
}