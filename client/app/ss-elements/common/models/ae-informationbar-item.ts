import { isNullOrUndefined } from 'util';
import { AeInformationBarItemType } from '../../common/ae-informationbar-itemtype.enum';
import { AeIconSize } from '../../common/ae-icon-size.enum';
import { IConHelper } from '../../../shared/helpers/icon-helper'

export class AeInformationBarItem {
  //start of Private variables
  private _type: AeInformationBarItemType;
  private _iconName: string;
  private _count: number;
  private _title: string;
  private _requireNotification: boolean;
  private _priority: number;

  private _toolTip: string;
  //end of private variables

  //start of public properties

  get Type(): AeInformationBarItemType {
    return this._type;
  }
  set Type(value: AeInformationBarItemType) {
    this._type = value;
  }

  get IconName(): string {
    return this._iconName;
  }
  set IconName(value: string) {
    this._iconName = value;
  }

  get Count(): number {
    return this._count;
  }
  set Count(value: number) {
    this._count = value;
  }

  get Title(): string {
    return this._title;
  }
  set Title(value: string) {
    this._title = value;
  }

  get RequireNotification(): boolean {
    return this._requireNotification;
  }

  set RequireNotification(value: boolean) {
    this._requireNotification = value;
  }

  get ToolTip(): string {
    return this._toolTip;
  }

  set ToolTip(value: string) {
    this._toolTip = value;
  }

  get Priority(): number {
    return this._priority;
  }

  set Priority(value: number) {
    this._priority = value;
  }


  //end of public properties

  //start of constructor
  constructor(type: AeInformationBarItemType, count: number, title: string, requireNotification: boolean, toolTip: string, iconName?: string) {

    this._type = type;
    // set the icon from default icons when no icon name specified
    if (isNullOrUndefined(iconName)) {
      this._iconName = IConHelper.GetByInformationBarItemType(type);
    }
    else {
      this._iconName = iconName;
    }
    this._count = count;
    this._title = title;
    this._requireNotification = requireNotification;
    this._toolTip = toolTip;
  }
  //end of constructor

}