const context = "only respond with one liners";
const examples = [];

// let messages = [
//     "please respond with one liners",
//     "Sure, I will respond with one liners.",
//     "Can you interview me on react.js?",
//     "Sure, first question, what is useState?",
//     "useState is a react hook",
//     "Correct, next question, what is useEffect?",
//     "useEffect is a react hook",
// ];

let messages = [
    "respond with a maximum of 10 words ONLY",
    "Sure, I will respond with a MAXIMUM of 10 words.",
    "Can you interview me on react.js?",
    // "Sure, first question, what is useState?",
    // "useState is a react hook",
    // "Correct, next question, what is useEffect?",
    // "useEffect is a react hook",
];



export async function think ( user_message=null )
{
    console.log( "thinking..." );
    console.log( "" );

    
    let response = await fetch( "http://127.0.0.1:5000/think", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            // "context": context,
            // "examples": examples,
            // "messages": messages
            "user_message": user_message
        } )
    } );
    
    // if ( user_message !== null )
    // {
    //     messages.push( user_message );
    // }
    // update message withr response
    // messages = await response.json();
    // return messages[ messages.length - 1 ];
    let resp = await response.json();
    return resp["ai_message"];
}

export async function restart ()
{
    console.log( "restarting..." );
    console.log( "" );
    let response = await fetch( "http://127.0.0.1:5000/restart", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    } );
    
    let resp = await response.json();
    console.log( resp[ "status" ] );
    console.log( "" );
}

// think( "howdy neighbour!" ).then( console.log );
