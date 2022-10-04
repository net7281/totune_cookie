module.exports = {fortunePick};

var MongoClient = require('mongodb').MongoClient;
const DB_URL = 'mongodb+srv://viewer:cookie22ee@fortune.uktcovq.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(DB_URL);

async function fortunePick(key) {
    try {
      const database = client.db("myFirstDatabase");
      const fortuneDatas = database.collection("fortuneList");
   
      const query = { key: 2 };
      const options = { 
        projection: { _id: 0, key: 1, content: 1 },
      };
  
      //await : promise가 이행된 후 실행
      const fortuneData = await fortuneDatas.findOne(query, options);
  
      var key =fortuneData.key;
      var content =fortuneData.content;

      return [key, content];
  
    } finally {
      await client.close();
    }
  }
