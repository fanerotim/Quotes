export default async (req) => {
    console.log(req.headers.priority);

    new Response('Testing my first edge function')
};

export const config = {
    path: '/'
}