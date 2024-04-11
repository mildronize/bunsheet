import { env } from "@/env";
import { QueueServiceClient } from "@azure/storage-queue";

export class AzureStorageQueue {
  private queueClient;
  constructor(client: QueueServiceClient, queueName: string) {
    this.queueClient = client.getQueueClient(queueName);
  }

  async sendMessage(message: string) {
    await this.queueClient.sendMessage(message);
  }

  async receiveMessages() {
    const response = await this.queueClient.receiveMessages();
    return response.receivedMessageItems;
  }

  async deleteMessage(messageId: string, popReceipt: string) {
    await this.queueClient.deleteMessage(messageId, popReceipt);
  }
}

const queueServiceClient = QueueServiceClient.fromConnectionString(
  env.AZURE_STORAGE_CONNECTION_STRING
);

export const queue = new AzureStorageQueue(queueServiceClient, env.AZURE_STORAGE_QUEUE_NAME);
