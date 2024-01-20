export interface Attachement {
  filename: string
  content: Buffer | string
}
export interface SendEmailRequest {
  from: string
  to: string[] | undefined
  subject: string
  text?: string
  html?: string
  attachments?: Attachement[]
}

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL

const sendEmail = async (sendEmailRequest: SendEmailRequest) => {
  try {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(sendEmailRequest),
    }

    const res = await fetch(
      `${supabaseUrl}/functions/v1/resend`,
      requestOptions
    )

    return res
  } catch (error) {
    return error
  }
}

export const MailService = {
  sendEmail,
}
