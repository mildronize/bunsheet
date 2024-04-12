import { env } from "@/env";
import { QueueServiceClient } from "@azure/storage-queue";

/**
 * Azure Storage Queue Client
 * Ref: https://learn.microsoft.com/en-us/azure/storage/queues/storage-quickstart-queues-nodejs?tabs=passwordless%2Croles-azure-portal%2Cenvironment-variable-windows%2Csign-in-azure-cli#add-messages-to-a-queue
 */
export class AzureStorageQueue {
  private queueClient;
  constructor(client: QueueServiceClient, queueName: string) {
    this.queueClient = client.getQueueClient(queueName);
  }

  async sendMessage(message: string) {
    /**
     * The message must be base64 encoded before sending to the queue.
     *
     * > Messages sent using the QueueClient class must be in a format
     * that can be included in an XML request with UTF-8 encoding.
     * To include markup in the message, the contents of the message
     * must either be XML-escaped or Base64-encoded.
     *
     * Ref: https://learn.microsoft.com/en-us/azure/storage/queues/storage-quickstart-queues-nodejs?tabs=passwordless%2Croles-azure-portal%2Cenvironment-variable-windows%2Csign-in-azure-cli#add-messages-to-a-queue
     */
    await this.queueClient.sendMessage(Buffer.from(message).toString("base64"));
  }
  /**
   * Receive messages Base64 from the queue
   * @returns Array of messages
   */

  async receiveMessages() {
    const response = await this.queueClient.receiveMessages();
    return response.receivedMessageItems;
  }

  /**
   * Receive messages from the queue and decode the messageText
   * @returns Array of messages with decoded messageText
   */

  async receiveDecodedMessages() {
    const messages = await this.receiveMessages();
    return messages.map((message) => {
      return {
        ...message,
        messageText: Buffer.from(message.messageText, "base64").toString(
          "utf-8"
        ),
      };
    });
  }

  /**
   * Get the queue length
   * @returns Number of messages in the queue
   */

  async length() {
    const response = await this.queueClient.getProperties();
    return response.approximateMessagesCount;
  }

  async deleteMessage(messageId: string, popReceipt: string) {
    await this.queueClient.deleteMessage(messageId, popReceipt);
  }
}

