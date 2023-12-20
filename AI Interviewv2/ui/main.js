import listen from './stt.js';
import { think, restart } from './palmai.js';
import speak from './visualizer.js';

const EXIT_KEYWORDS = [ "stop", "exit", "bye", "quit", "that's enough", "that's all" ];

async function chat (user_message)
{
    
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

    if(speaker === 'AI') {
        const target = document.querySelector('.output');
        console.log(target)
        target.value = message;
    }

    console.log( `${ speaker }:` );
    console.log( "------------------------------------------" );
    console.log( message );
    console.log( "" );
}

async function main ()
{
    await restart();

    let ai_message = "Hello! Welcome to Hash I Q. Are you ready to begin?";
    log( "AI", "Hello! Welcome to HashIQ. Are you ready to begin?" );
    await speak( ai_message );

    // ai_message = await think("i'm ready");
    // log( "AI", ai_message );
    // await speak( ai_message );

    document.querySelector('.hash').addEventListener('keydown', async (e) => {
        const key = e.key

        if(key === 'Enter') {
            const text = document.querySelector('.hash').value
            document.querySelector('.hash').value = ''
            console.log(text)
            await chat(text);
        }
    })

    // await chat();
}

setTimeout(main, 1000);