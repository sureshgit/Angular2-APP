import { StringHelper } from './string-helper';
import { MessageType } from '../../ss-elements/common/ae-message.enum';
import { MessageStatus, MessageEvent } from '../../ss-elements/common/models/message-event.enum';
import { SnackbarMessageVM } from '../models/snackbar-message-vm';
export class ObjectHelper {
    static merge<F, S>(first: F, second: S): F & S {
        let result = <F & S>{};
        for (let key in first) {
            (<any>result)[key] = (<any>first)[key];
        }
        for (let key in second) {
            (<any>result)[key] = (<any>second)[key];
        }
        return result
    }

    static create<T>(type: { new (): T; }): T {
        return new type();
    }

    static createUpdateErrorSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Error,
            MessageEvent.Update, MessageStatus.Failed, code);
    }

    static createUpdateCompleteSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Success,
            MessageEvent.Update, MessageStatus.Complete, code);
    }

    static createUpdateInProgressSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Info,
            MessageEvent.Update, MessageStatus.InProgress, code);
    }

    static createInsertErrorSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Error,
            MessageEvent.Create, MessageStatus.Failed, code);
    }

    static createInsertCompleteSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Success,
            MessageEvent.Create, MessageStatus.Complete, code);
    }

    static createInsertInProgressSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Info,
            MessageEvent.Create, MessageStatus.InProgress, code);
    }

    static createRemoveErrorSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Error,
            MessageEvent.Remove, MessageStatus.Failed, code);
    }

    static createRemoveCompleteSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Success,
            MessageEvent.Remove, MessageStatus.Complete, code);
    }

    static createRemoveInProgressSnackbarMessage(objectType: string, objectIdentifier: string, code: string) {
        return new SnackbarMessageVM(StringHelper.snackbarMessage(objectType, objectIdentifier), MessageType.Info,
            MessageEvent.Remove, MessageStatus.InProgress, code);
    }
}
