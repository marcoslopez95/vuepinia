import Pusher, { Channel, type Options } from 'pusher-js';

export default class usePusher {

    private pusher: Pusher;
    private channel: Channel;
    private eventHandler: (e: any) => void;

    constructor(
        private channelName: string,
        private eventName: string,
        private callback: Function
    ) {

        const options: Options = {
            cluster: 'us2',
        }

        if(localStorage.getItem('token')){
            options.authEndpoint = import.meta.env.VITE_API_URL + 'pusher/auth', // Cambia esto a tu URL de autenticación
            options.auth  = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
        }
        
        this.pusher = new Pusher('ac94401f44c9c5b17be8', options);
        this.channel = this.pusher.subscribe(this.channelName);

        this.eventHandler = (data: any) => {
            this.callback(data);
        };

        this.channel.bind(this.eventName, this.eventHandler);
        console.log(`Suscrito al canal ${this.channelName} `);
    }

    public unMounted() {
        this.channel.unbind(this.eventName, this.eventHandler);
        this.pusher.unsubscribe(this.channelName);
        console.log(`Desuscrito del canal ${this.channelName} `);
    }
}
