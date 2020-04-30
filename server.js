const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const knex = require( 'knex' );

const app = express();
app.use( express.static( 'public') );
const dabatase = knex({
    client : 'pg',
    connection : 'postgresql://alfredosalazar@localhost/sports'
});

const jsonParser = bodyParser.json();

app.post( '/api/createSport', jsonParser, ( req, res ) => {
    const {id, name, num_players} = req.body;
    
    const newSport = {id, name, num_players};

    dabatase
        .insert( newSport )
        .into( 'sport' )
        .returning( '*' )
        .then( result => {
            return res.status( 201 ).json( result );
        })
        .catch( err => {
            return res.status( 500 ).end();
        });
});

app.listen( 8080, () => {
    console.log( 'App running in port 8080');
})
