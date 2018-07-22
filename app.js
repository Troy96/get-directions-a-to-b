const axios = require('axios');

const yargs = require('yargs');

const argv = yargs
			
			.options({
				a:{
					demand:true,
					alias:'origins',
					describe:'Starting location (A)',
					string: true
				},
				b:{
					demand:true,
					alias:'destination',
					describe:'Destination location (B)',
					string: true
				}
			})
			.help()
			.alias('help','h')
			.argv;

			var requestURL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${argv.origins}&destinations=${argv.destination}&key=AIzaSyBlvDX0T024tiUOwmROQba8JtwNoeH1F4E`;

			axios.get(requestURL)

			.then((response) => {
				if(response.data.status==='ZERO_RESULTS'){
					throw new Error('Error making request to the API');
			}
			console.log(`Origins (A): ${response.data.destination_addresses}`);
			console.log(`Destination (B): ${response.data.origin_addresses}`+'\n');
			
			var x = response.data.rows[0].elements.length;

			console.log('The following results were fetched:\n');

			for(i=0;i<x;i++){
			    console.log(`Distance: ${response.data.rows[0].elements[i].distance.text}`);
			    console.log(`Duration: ${response.data.rows[0].elements[i].duration.text}`);
			}
			
			}).catch((e) => {
				if(e.code === 'ENOTFOUND'){
					console.log('Unable to connect to the API. Check your Internet connection!');
				}
				else{
					console.log(e.message);
				}

			});
			

			

