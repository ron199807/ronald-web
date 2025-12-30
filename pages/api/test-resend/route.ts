// app/api/test-resend/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    // Test the API key by making a simple request
    const data = await resend.emails.send({
      from: 'Test <onboarding@resend.dev>',
      to: process.env.EMAIL_TO || 'ronaldmweema@gmail.com',
      subject: 'Test email from Resend',
      html: '<p>If you receive this, Resend is working!</p>',
    });

    return NextResponse.json({
      success: true,
      message: 'Resend API key is valid',
      data
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      hint: 'Check if your Resend API key is valid and verified'
    }, { status: 500 });
  }
}