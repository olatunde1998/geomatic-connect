import WelcomeTemplate from '@/emails';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, res: Response) {
    const { email, firstName} = await request.json()
  try {
    const { data, error } = await resend.emails.send({
      from: 'Geomatic connect <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello world',
      react: WelcomeTemplate({ firstName }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
