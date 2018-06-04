import { MessageType } from '../../ss-elements/common/ae-message.enum';
import { BaseMessageVM } from './base-message-vm';
import { MessageStatus, MessageEvent } from '../../ss-elements/common/models/message-event.enum';

export class SnackbarMessageVM extends BaseMessageVM {
    public code: string;
    
    constructor(message: string, messageType: MessageType, event: MessageEvent, status: MessageStatus, code: string) {
        super(message, messageType, event, status);
        this.code = code;
    }

    public toMessage(): string {
        return `${this.message}  ${MessageEvent[this.event]}  ${MessageStatus[this.status]}`;
    }
}
