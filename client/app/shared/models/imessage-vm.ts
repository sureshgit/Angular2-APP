import { MessageType } from '../../ss-elements/common/ae-message.enum';
export interface IMessageVM {
    type: MessageType
    toMessage(): string;
    getDataObject<T>(): T;
}
