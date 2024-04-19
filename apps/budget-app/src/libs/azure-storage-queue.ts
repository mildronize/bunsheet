import { env } from "@/env";
import { QueueClient, QueueServiceClient } from "@azure/storage-queue";

/**
 * Azure Storage Queue Client
 * Ref: https://learn.microsoft.com/en-us/azure/storage/queues/storage-quickstart-queues-nodejs?tabs=passwordless%2Croles-azure-portal%2Cenvironment-variable-windows%2Csign-in-azure-cli#add-messages-to-a-queue
 */
export class AzureStorageQueue {
  private queueClient!: QueueClient;
  constructor(
    protected client: QueueServiceClient,
    protected queueName: string
  ) {}

  async createQueue() {
    await this.client.createQueue(this.queueName);
    this.queueClient = this.client.getQueueClient(this.queueName);
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
    await this.createQueue();
    await this.queueClient.sendMessage(Buffer.from(message).toString("base64"));
  }
  /**
   * Receive messages Base64 from the queue
   * @returns Array of messages
   */

  async receiveMessages() {
    await this.createQueue();
    const response = await this.queueClient.receiveMessages();
    return response.receivedMessageItems;
  }

  /**
   * Receive messages from the queue and decode the messageText
   * @returns Array of messages with decoded messageText
   */

  async receiveDecodedMessages() {
    await this.createQueue();
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
    await this.createQueue();
    const response = await this.queueClient.getProperties();
    return response.approximateMessagesCount;
  }

  async deleteMessage(messageId: string, popReceipt: string) {
    await this.createQueue();
    await this.queueClient.deleteMessage(messageId, popReceipt);
  }
}
