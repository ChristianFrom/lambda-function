
const admin = require('firebase-admin');
const serviceAccount = require('serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.handler = (event, context, callback) => {

    let tabledetails = JSON.parse(JSON.stringify(event.Records[0].dynamodb));
    let timeStamp = tabledetails.NewImage.timeStamp.S

    const collection = db.collection('TemperatureTelemetry').doc(timeStamp);
     collection.set({
        'alarmAcknowledged': tabledetails.NewImage.alarmAcknowledged.BOOL,
        'alarmTriggered': tabledetails.NewImage.alarmTriggered.BOOL,
        'sensorGroup': tabledetails.NewImage.sensorGroup.S,
        'sensorLocation': tabledetails.NewImage.sensorLocation.S,
        'temperature': tabledetails.NewImage.temperature.N
    })    
}





    

  
