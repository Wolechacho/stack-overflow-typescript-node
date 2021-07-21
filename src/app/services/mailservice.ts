import * as nodemailer from 'nodemailer'

export class MailService{
    private _transporter : nodemailer.Transporter
    constructor(options:any){
        this._transporter = nodemailer.createTransport( 
          `smtps://<username>%40gmail.com:<password>@smtp.gmail.com` 
        ); 

        const {host,service,port,secure,requireTls,user,pass} = options;
        this._transporter = nodemailer.createTransport({
            host: host,
            service: service,
            port: port,
            secure: secure,
            requireTLS: requireTls,
            auth: {
                user: user,
                pass: pass
            }
        })

    }
    sendMail(from:string,to: string, subject: string, content: string) { 
        let options = { 
          from: from, 
          to: to, 
          subject: subject, 
          text: content 
        } 
 
        this._transporter.sendMail(  
          options, (error, info) => { 
            if (error) { 
              return console.log(`error: ${error}`); 
            } 
            console.log(`Message Sent ${info.response}`); 
          }); 
      } 
}

export default MailService;