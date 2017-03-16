/**
 * Created by Lukas on 16-Mar-17.
 */

function findChannelByName(client, name) {
    return client.channels.find('name', name);
}

export {
    findChannelByName
}