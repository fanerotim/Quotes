export default async (req) => {
    console.log(req.headers.host['user-agent']);
    new Response('Testing my first edge function')
};

export const config = {
    path: '/'
}