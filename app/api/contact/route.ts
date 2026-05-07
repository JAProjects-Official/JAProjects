import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
})

const requests = new Map<string, { count: number; last: number }>()

function rateLimit(ip: string) {
  const now = Date.now()
  const windowTime = 60 * 1000
  const maxRequests = 3

  const data = requests.get(ip)

  if (!data) {
    requests.set(ip, { count: 1, last: now })
    return true
  }

  if (now - data.last > windowTime) {
    requests.set(ip, { count: 1, last: now })
    return true
  }

  if (data.count >= maxRequests) return false

  data.count += 1
  data.last = now
  requests.set(ip, data)

  return true
}

const blockedDomains = [
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "trashmail.com",
  "iapapi.com",
]

const spamWords = ["casino", "crypto", "viagra", "loan", "free money"]

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown"

    if (!rateLimit(ip)) {
      return Response.json(
        { success: false, errorCode: "RATE_LIMIT" },
        { status: 429 }
      )
    }

    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return Response.json(
        { success: false, errorCode: "MISSING_FIELDS" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, errorCode: "INVALID_EMAIL" },
        { status: 400 }
      )
    }

    const domain = email.split("@")[1]?.toLowerCase()

    if (blockedDomains.includes(domain)) {
      return Response.json(
        { success: false, errorCode: "EMAIL_BLOCKED" },
        { status: 400 }
      )
    }

    const isSpam = spamWords.some((w) =>
      message.toLowerCase().includes(w)
    )

    if (isSpam) {
      return Response.json(
        { success: false, errorCode: "SPAM_DETECTED" },
        { status: 400 }
      )
    }

    if (message.trim().length < 5) {
      return Response.json(
        { success: false, errorCode: "MESSAGE_TOO_SHORT" },
        { status: 400 }
      )
    }

    await transporter.sendMail({
      from: `"JAProjects" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de ${name}`,
      replyTo: email,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)

    return Response.json(
      { success: false, errorCode: "SERVER_ERROR" },
      { status: 500 }
    )
  }
}