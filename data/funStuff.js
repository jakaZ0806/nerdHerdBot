/**
 * Created by Lukas on 16-Mar-17.
 */

const request = require('request');

function translateToPhteven(text) {

    return new Promise(resolve => {
        var test = request.post(
            'http://api.phteven.io/translate/',
            {form:{text: text}},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    resolve(body);
                }
            }

        );

    })
}

export {translateToPhteven};