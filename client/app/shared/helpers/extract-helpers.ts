import { FiscalYear } from '../models/company.models';
import { isNullOrUndefined } from 'util';
import { AbsenceStatus, AbsenceStatusCode } from '../models/lookup.models';
import { AeSelectItem } from '../../ss-elements/common/models/ae-select-item';
import { IConHelper } from './icon-helper';
import { AeInformationBarItem } from './../../ss-elements/common/models/ae-informationbar-item';
//import { AeInformationBarItemType } from '../../ss-elements/common/ae-informationbar-itemtype.enum'
import { Response } from '@angular/http';
import { TrainingCourse } from '../../shared/models/training-course.models';
import { AtlasApiResponse } from '../../shared/models/atlas-api-response';
import * as Immutable from 'immutable';

export function extractInformationBarItems(response: Response): AeInformationBarItem[] {

    let informationBarItems: AeInformationBarItem[] = [];
    let infoItem: AeInformationBarItem;
    let body = Array.from(response.json());
    body.map((value, i) => {
        infoItem = new AeInformationBarItem(value['Code'], value['Count'], value['Name'], false, IConHelper.GetByInformationBarItemTooltip(value['Code'], value['Count']), value['IconName']);
        infoItem.Priority = <number>value['Priority'];
        informationBarItems.push(infoItem);
    });
    return informationBarItems.sort((first, second): number => {
        if (first.Priority < second.Priority) return -1;
        if (first.Priority > second.Priority) return 1; return 0;
    });
}

/* Training Course - start */
export function extractTrainingCourseList(trainingCourseResponse: AtlasApiResponse<TrainingCourse>): Array<TrainingCourse> {
    let trainingCourseList: Array<TrainingCourse> = trainingCourseResponse.Entities.map(x => {
        return x;
    });
    return trainingCourseList;
}
export function extractTrainingCourseDetails(response: Response): TrainingCourse {
    let trainingCourseDetails: TrainingCourse;
    let body = response.json();
    trainingCourseDetails = <TrainingCourse>body;
    return trainingCourseDetails;
}
/* Training Course - end */

export function extractAbsenceStatus(absenceStatus: AbsenceStatus[]): Immutable.List<AeSelectItem<string>> {
    return Immutable.List(absenceStatus.filter(keyValuePair => keyValuePair.Code !== AbsenceStatusCode.Resubmitted &&
        keyValuePair.Code !== AbsenceStatusCode.Requestforchange && keyValuePair.Code !== AbsenceStatusCode.Requestforcancellation).map((keyValuePair) => {
            let aeSelectItem = new AeSelectItem<string>(keyValuePair.Name, keyValuePair.Id);
            aeSelectItem.Childrens = null;
            if (keyValuePair.Code === AbsenceStatusCode.Requested) {
                aeSelectItem.Text = "Pending";
            }
            else
                aeSelectItem.Text = keyValuePair.Name;
            aeSelectItem.Value = keyValuePair.Id;
            return aeSelectItem;
        }));
};

export function mapToAeSelectItems(fiscalYearSource: Array<FiscalYear>): Immutable.List<AeSelectItem<string>> {
    let fiscalYears: Immutable.List<AeSelectItem<string>> = Immutable.List([]);
    if (!isNullOrUndefined(fiscalYearSource)) {
        fiscalYears = Immutable.List(fiscalYearSource).map((year) => {
            let item: AeSelectItem<string> = new AeSelectItem<string>();
            item.Text = year.DisplayName;
            item.Value = year.StartDate + 'dt' + year.EndDate;
            item.Disabled = false;
            item.Childrens = null;
            return item;
        }).toList();
    }
    return fiscalYears;
}

