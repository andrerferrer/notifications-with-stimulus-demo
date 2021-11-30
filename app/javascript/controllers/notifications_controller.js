import { Controller } from "stimulus"
// Import the consumer
import consumer from "../channels/consumer";

export default class extends Controller {

  connect() {
    console.log('connected to notifications controller')
    // find the user id
    const id = this.element.dataset.userId;
    const controller = this;

    // create the subscription
    consumer.subscriptions.create(
      { channel: 'NotificationChannel', id: id },
      {
        // when you receive something
        received(data) {
          // update the DOM
          console.log(data)
        }
      }
    )
  }
}
