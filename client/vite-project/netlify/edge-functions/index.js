export default async () => {
    console.log('I, the edge fn, was invoked!')
    new Response('Testing my first edge function')
};

export const config = {
    path: '/'
}