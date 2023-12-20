import listen from './stt.js';
import { think, restart } from './palmai.js';
import speak from './visualizer.js';

const EXIT_KEYWORDS = [ "stop", "exit", "bye", "quit", "that's enough", "that's all" ];

async function chat ()
{
    let user_message = await listen();
    log( "User", user_message );

    return new Promise( async ( resolve ) =>
    {
        if ( EXIT_KEYWORDS.filter( ( keyword ) => user_message.toLowerCase().includes( keyword ) ).length > 0 )
        {
            let ai_message = await think( "Give me brief summary of how well I performed in this interview?" )
            log( "AI", ai_message );
            await speak( ai_message );
            // log( "AI", "Alright then, Goodbye!" )
            // await speak( "Alright then, Goodbye!" );
            resolve();
        }
        else
        {
            let ai_message = await think( user_message );
            log( "AI", ai_message );
            await speak( ai_message );

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
    await restart();

    let ai_message = "Hello! Welcome to HashIQ.";
    log( "AI", ai_message );
    await speak( ai_message );

    // ai_message = await think("i'm ready");
    // log( "AI", ai_message );
    // await speak( ai_message );

    await chat();
}

setTimeout(main, 1000);