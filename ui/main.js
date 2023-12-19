import listen from './stt.js';
import think from './palmai.js';
import speak from './visualizer.js';

const EXIT_KEYWORDS = [ "stop", "exit", "bye", "quit", "that's enough", "that's all" ];

async function chat ()
{
    let user_message = await listen();
    log( "User", user_message );

    let ai_message = await think( user_message );
    log( "AI", ai_message );
    await speak( ai_message );


    return new Promise( ( resolve ) =>
    {
        if ( EXIT_KEYWORDS.filter( ( keyword ) => user_message.toLowerCase().includes( keyword ) || ai_message.toLowerCase().includes( keyword ) ).length > 0 )
        {
            resolve();
        }
        else
        {
            chat().then( resolve );
        }
    } );
}

function log ( speaker, message )
{
    console.log( `${ speaker }:` );
    console.log( "------------------------------------------" );
    console.log( message );
    console.log( "" );
}

async function main ()
{
    let ai_message = "Hello! Welcome to Hyperloop.";
    log( "AI", ai_message );
    await speak( ai_message );

    ai_message = await think();
    log( "AI", ai_message );
    await speak( ai_message );

    await chat();
}

setTimeout(main, 1000);