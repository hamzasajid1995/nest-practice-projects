import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(public messageRepository: MessagesRepository) {}

  findAll() {
    return this.messageRepository.findAll();
  }

  findOne(id: string) {
    return this.messageRepository.findOne(id);
  }

  create(content: string) {
    return this.messageRepository.create(content);
  }
}
