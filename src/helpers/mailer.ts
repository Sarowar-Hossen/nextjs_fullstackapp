import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs"

export const sendEmail = async ({email,emailType,userId}:any) => {
    {
        try {
            // TODO configure mail for usage

            const hashToken = await bcrypt.hash(userId.toString(),10) 
            console.log(hashToken)

            if(emailType==="VERIFY"){
                await User.findByIdAndUpdate(userId,
                    {$set:{
                    verifyToken: hashToken,
                    verifyTokenExpiry: Date.now()+3600000
                }})
            }
            else if(emailType==="RESET"){
                await User.findByIdAndUpdate(userId,{
                    $set:{
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiry: Date.now()+3600000
                }})
            }

            const transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "d861eea9436628",
                  pass: "46328266aafa36"
                }
              });;

            const mailOptions = {
                from: "sarowar1942@gmail.com",
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="process.env.DOMAIN/verifyemail?token=${hashToken}">here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"} or copy and past the link below in your browser
                </br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
                </p>`
            }

            const mailResponse = await transport.sendMail(mailOptions)
            return mailResponse
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}