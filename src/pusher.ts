import Pusher, { Channel } from 'pusher-js';

export default class usePusher {

    private pusher: Pusher;
    private channel: Channel;
    private eventHandler: (e: any) => void;

    constructor(
        private channelName: string,
        private eventName: string,
        private callback: Function
    ) {
        this.pusher = new Pusher('ac94401f44c9c5b17be8', {
            cluster: 'us2',
        });
        this.channel = this.pusher.subscribe(this.channelName);

        this.eventHandler = (data: any) => {
            this.callback(data);
        };

        this.channel.bind(this.eventName, this.eventHandler);
        console.log(`Suscrito al canal ${this.channelName} `);
    }

    unMounted = () => {
        this.channel.unbind(this.eventName, this.eventHandler);
        this.pusher.unsubscribe(this.channelName);
        console.log(`Desuscrito del canal ${this.channelName} `);
    }
}
