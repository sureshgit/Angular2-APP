import { AeInformationBarItemType } from '../../ss-elements/common/ae-informationbar-itemtype.enum'

export class IConHelper {
    static GetByInformationBarItemType(type: AeInformationBarItemType): string {
        var iconText;
        switch (type) {
            case AeInformationBarItemType.DocumentsAwaiting: {
                iconText = "icon-to-review";
                break;
            }
            case AeInformationBarItemType.HolidayCountdown: {
                iconText = "icon-palm";
                break;
            }
            case AeInformationBarItemType.HolidaysAvailable: {
                iconText = "icon-holidays-absence";
                break;
            }
            case AeInformationBarItemType.TasksToComplete: {
                iconText = "icon-checklist";
                break;
            }
            case AeInformationBarItemType.TeamHolidays: {
                iconText = "icon-people";
                break;
            }
            case AeInformationBarItemType.TrainingCourses: {
                iconText = "icon-education";
                break;
            }
        }
        return iconText;
    }

    static GetByInformationBarItemTooltip(type: AeInformationBarItemType, count: any): string {
        var tooltip;
        
        switch (type) {
            case AeInformationBarItemType.DocumentsAwaiting: {
                if (count === 0) {
                    tooltip = "INFORMATIONBAR.Up_to_date_tooltip";
                } else {
                    tooltip = "INFORMATIONBAR.Documents_awaiting_tooltip";
                }
                break;
            }
            case AeInformationBarItemType.HolidayCountdown: {
                if (count === 0) {
                    tooltip = "INFORMATIONBAR.Holiday_count_down_Uptodate_tooltip";
                } else {
                    tooltip = "INFORMATIONBAR.Holiday_count_down_tooltip";
                }
                break;
            }
            case AeInformationBarItemType.HolidaysAvailable: {
                tooltip = "INFORMATIONBAR.Holidays_available_tooltip";
                break;
            }
            case AeInformationBarItemType.TasksToComplete: {
                if (count === 0) {
                    tooltip = "INFORMATIONBAR.Up_to_date_tooltip";
                } else {
                    tooltip = "INFORMATIONBAR.Tasks_to_complete_tooltip";
                }
                break;
            }
            case AeInformationBarItemType.TeamHolidays: {
                tooltip = "INFORMATIONBAR.Team_holidays_tooltip";
                break;
            }
            case AeInformationBarItemType.TrainingCourses: {
                if (count === 0) {
                    tooltip = "INFORMATIONBAR.Up_to_date_tooltip";
                } else {
                    tooltip = "INFORMATIONBAR.Training_course_tooltip";
                }
                break;
            }
            case AeInformationBarItemType.NewTasks:
                {
                    if (count === 0) {
                        tooltip = "TASKS.No_new_tasks_tooltip";
                    } else {
                        tooltip = "INFORMATIONBAR.new_tasks_tooltip";
                    }
                    break;
                }
            case AeInformationBarItemType.OverdueTasks:
                {
                    if (count === 0) {
                        tooltip = "TASKS.No_overdue_tasks_tooltip";
                    } else {
                        tooltip = "INFORMATIONBAR.Overdue_tasks_tooltip";
                    }
                    break;
                }
            case AeInformationBarItemType.IncompleteTasks: {
                if (count === 0) {
                    tooltip = "TASKS.No_incomplete_tasks_tooltip";
                } else {
                    tooltip = "INFORMATIONBAR.Incomplete_tasks_tooltip";
                }
                break;
            }
            case AeInformationBarItemType.DueTodayTask:
                {
                    if (count === 0) {
                        tooltip = "TASKS.No_duetoday_tasks_tooltip";
                    } else {
                        tooltip = "INFORMATIONBAR.Duetoday_tasks_tooltip";
                    }
                    break;
                }
            case AeInformationBarItemType.DueThisWeekTasks: {
                if (count === 0) {
                    tooltip = "TASKS.No_duethisweek_tasks_tooltip";
                } else {
                    tooltip = "INFORMATIONBAR.Duethisweek_tasks_tooltip";
                }
                break;
            }
            case AeInformationBarItemType.DueNextWeekTasks: {
                if (count === 0) {
                    tooltip = "TASKS.No_duenextweek_tasks_tooltip";
                } else {
                    tooltip = "INFORMATIONBAR.Duenextweek_tasks_tooltip";
                }
                break;
            }
        }
        return tooltip;
    }
}