const Sib = require('sib-api-v3-sdk');

require('dotenv').config()

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi()

const sender = {
    email: 'nishant.sharma8507966@gmail.com'
}

const receivers = [
    {
        email: 'sumit@gmail.com'
    },
]

tranEmailApi
.sendTransacEmail({
    sender,
    to: receivers, 
    subject: "Expense track app",
    textContent: "Welcome to my expense track app"
})
 .then(console.log)
 .catch(console.log)
