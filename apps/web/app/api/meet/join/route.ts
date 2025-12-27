import { NextRequest, NextResponse } from "next/server";
import amqp from "amqplib/callback_api";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { meetTitle, meetLink, meetLanguage } = await req.json();

    if (!meetTitle || !meetLink || !meetLanguage) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const meetId = uuidv4();

    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var queue = "meetynx";
        var msg = JSON.stringify({meetId,meetTitle,meetLanguage,meetLink});

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
      });
    });

    return NextResponse.json({
      success: true,
      message: "Bot will join the meet shortly.",
    });

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
