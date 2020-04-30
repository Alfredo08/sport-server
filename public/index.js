
function createSportFetch( name, id, numPlayers ){

    let data = {
        name : name,
        id : Number(id),
        num_players : Number(numPlayers)
    };

    let url = "http://localhost:8080/api/createSport";
    let settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
        })
        .catch( err => {
            console.log( err );
        });
}

function watchForm(){
    let sportForm = document.querySelector( '.sport-form' );

    sportForm.addEventListener( 'submit', ( event ) => {
        event.preventDefault();

        let name = event.target.sportName.value;
        let id = event.target.sportID.value;
        let numPlayers = event.target.sportPlayers.value;

        createSportFetch( name, id, numPlayers );

    });
}

watchForm();