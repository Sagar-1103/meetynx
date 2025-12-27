import amqp from "amqplib/callback_api";
import { joinMeet } from "./utils/meet";
import { Data } from "./types/data";
import { BotManager } from "./utils/bot-manager";

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "meetynx";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue,async function (msg) {
        const message = msg?.content.toString()
        if (!message) return;
        console.log(" [x] Received %s",message);
        const data = JSON.parse(message) as Data;
        try {
            const joinedMeet = await BotManager.addBot(data);
            console.log(joinedMeet);
        } catch (error) {
            console.log(error);
        }
      }, {
        noAck: true,
      }
    );
  });
});
