import { Subject } from 'rxjs/Rx';
import { AeSplitButtonOption } from './ae-split-button-options';
export class AeDataTableAction {
    // Private Fields
    private _command: Subject<any>;
    private _dataTableCommand: Subject<any>;
    private _splitButtonOption: AeSplitButtonOption<any>;
    // End of Private Fields

    // Public Properties
    get command() {
        return this._command;
    }

    get dtCommand() {
        return this._dataTableCommand;
    }

    get splitButtonOption() {
        return this._splitButtonOption;
    }
    // End of Public Properties

    // Constructors
    /**
     *
     */
    constructor(actionName: string, command: Subject<any>, disabled: boolean) {
        this._command = command;
        this._dataTableCommand = new Subject();
        this._splitButtonOption = new AeSplitButtonOption(actionName, this._dataTableCommand, disabled);
    }
    // End of Constructors
}