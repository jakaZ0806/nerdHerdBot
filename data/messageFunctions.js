/**
 * Created by Lukas on 16-Mar-17.
 */
import * as channelFunctions from './channelFunctions';

function sendMessageToChannel(client, message, channelname) {
    var channel = channelFunctions.findChannelByName(client, channelname);

    client.channels.get(channel.id).sendMessage(message)
        .then(message => console.log(`Sent message to channel ${channel.name}: ${message.content}`))
        .catch(console.error);
}

export {
    sendMessageToChannel
}