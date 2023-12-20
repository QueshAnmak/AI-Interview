// web speech api speech recognition
// Check if the browser supports speech recognition
export default async function listen ()
{
  if ( 'webkitSpeechRecognition' in window )
  {
    // Create a new instance of the SpeechRecognition object
    const recognition = new webkitSpeechRecognition();

    // Set the recognition language to the user's language
    recognition.lang = window.navigator.language;

    console.log( 'listening...' );
    console.log( "" );
    // console.log( 'Speech recognition started.' );
    // Start speech recognition
    recognition.start();

    // Handle the result event

    return new Promise( resolve =>
      recognition.onresult = ( event ) =>
      {
        // Stop the recognition
        {
          recognition.stop();
          // console.log( 'Speech recognition stopped.' );

          // Get the recognized speech as text
          const speech = event.results[ 0 ][ 0 ].transcript;
          resolve( speech );
        };
      }
    );

    // Handle the error event
    recognition.onerror = ( event ) =>
    {
      // Display the error message
      console.error( event.error );
    };
  } else
  {
    console.error( 'Speech recognition is not supported in this browser.' );
  }
}