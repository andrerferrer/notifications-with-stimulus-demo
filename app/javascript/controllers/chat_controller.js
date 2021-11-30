import { Controller } from "stimulus"
// Import the consumer
import consumer from "../channels/consumer";

export default class extends Controller {

  connect() {
    const messagesDiv = this.element;
    // find the chatroom id
    const id = messagesDiv.dataset.chatroomId;
    const controller = this;

    // create the subscription
    consumer.subscriptions.create(
      { channel: 'ChatroomChannel', id: id },
      {
        // when you receive something
        received(message) {
          // update the DOM
          controller._insertIntoDOM(message);
        }
      }
    )
  }

  _insertIntoDOM(message) {
    const messagesDiv = this.element;
    messagesDiv.insertAdjacentHTML('beforeend', message)
  }
}
