export default async (req) => {
    console.log(req.headers.host);
    new Response('Testing my first edge function')
};

export const config = {
    path: '/'
}