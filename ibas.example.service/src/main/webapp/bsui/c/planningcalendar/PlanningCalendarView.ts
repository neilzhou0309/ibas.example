/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace example {
    export namespace ui {
        export namespace c {
            /** 查看视图-例子 */
            export class PlanningCalendarView extends ibas.BOViewView implements app.IPlanningCalendarView {
                private page: sap.m.Page;
                private usersPlanningData: UsersPlanning;
                private pCalendar: sap.m.PlanningCalendar;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.usersPlanningData = this.getData();
                    this.pCalendar = new sap.m.PlanningCalendar("", {
                        viewKey: "D",
                        startDate: {
                            path: "startDate"
                        },
                        toolbarContent: [
                            new sap.m.Button("", {
                                icon: "sap-icon://add",
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    // 新建任务
                                }
                            }),
                        ],
                        views: [
                            new sap.m.PlanningCalendarView("", {
                                key: "A",
                                intervalType: sap.ui.unified.CalendarIntervalType.Hour,
                                description: "小时",
                                intervalsS: 2,
                                intervalsM: 24,
                                intervalsL: 24,
                                showSubIntervals: true
                            }),
                            new sap.m.PlanningCalendarView("", {
                                key: "D",
                                intervalType: sap.ui.unified.CalendarIntervalType.Day,
                                description: "天",
                                intervalsS: 1,
                                intervalsM: 3,
                                intervalsL: 5,
                                showSubIntervals: true
                            }),
                            new sap.m.PlanningCalendarView("", {
                                key: "W",
                                intervalType: "Week",
                                description: "星期",
                                intervalsS: 1,
                                intervalsM: 5,
                                intervalsL: 7,
                                showSubIntervals: true
                            }),
                            new sap.m.PlanningCalendarView("", {
                                key: "M",
                                intervalType: sap.ui.unified.CalendarIntervalType.Month,
                                description: "月",
                                intervalsS: 1,
                                intervalsM: 1,
                                intervalsL: 1,
                                showSubIntervals: true
                            })
                        ],
                        rowHeaderClick: function (oEvent: any): void {
                            alert("可点击切换个人任务");
                        },
                        intervalSelect: function (oEvent: any): void {
                            // 点击行可获得点击处时间，可用于新建任务
                            let data: any = oEvent.getParameters();
                        },
                        appointmentsVisualization: sap.ui.unified.CalendarAppointmentVisualization.Filled,
                        showEmptyIntervalHeaders: false,
                        showIntervalHeaders: true,
                        showWeekNumbers: true,
                        appointmentSelect: function (oEvent: any): void {
                            let appointement: any = oEvent.getParameter("appointment");
                            if (!ibas.objects.isNull(appointement)) {
                                let selectedData: Appointment = appointement.getBindingContext().getObject();
                                if (!ibas.objects.isNull(selectedData)) {
                                    that.application.viewShower.proceeding(that.application.view, ibas.emMessageType.INFORMATION, selectedData.title);
                                }
                            }
                        },
                    });
                    this.pCalendar.bindAggregation("rows", {
                        path: "users",
                        template: new sap.m.PlanningCalendarRow("", {
                            icon: "{pic}",
                            title: "{name}",
                            text: "{role}",
                            appointmentCreate: function (oEvent: any): void {
                                alert("create");
                            },
                            enableAppointmentsDragAndDrop: true,
                            enableAppointmentsResize: true,
                            enableAppointmentsCreate: true,
                            appointmentDrop: function (oEvent: any): void {
                                let oAppointment: any = oEvent.getParameter("appointment");
                                let oStartDate: Date = oEvent.getParameter("startDate");
                                let oEndDate: Date = oEvent.getParameter("endDate");
                                let oCalendarRow: any = oEvent.getParameter("calendarRow");
                                let bCopy: any = oEvent.getParameter("copy");
                                let oModel: any = this.getModel();
                                let oAppBindingContext: any = oAppointment.getBindingContext();
                                let oRowBindingContext: any = oCalendarRow.getBindingContext();
                                let handleAppointmentDropBetweenRows: Function = function (): void {
                                    let aPath: any = oAppBindingContext.getPath().split("/");
                                    let iIndex: any = aPath.pop();
                                    let sRowAppointmentsPath: any = aPath.join("/");
                                    oRowBindingContext.getObject().appointments.push(
                                        oModel.getProperty(oAppBindingContext.getPath())
                                    );
                                    oModel.getProperty(sRowAppointmentsPath).splice(iIndex, 1);
                                };
                                if (bCopy) { // "copy" appointment
                                    let oProps: any = jQuery.extend({}, oModel.getProperty(oAppointment.getBindingContext().getPath()));
                                    oProps.start = oStartDate;
                                    oProps.end = oEndDate;
                                    oRowBindingContext.getObject().appointments.push(oProps);
                                } else { // "move" appointment
                                    oModel.setProperty("start", oStartDate, oAppBindingContext);
                                    oModel.setProperty("end", oEndDate, oAppBindingContext);
                                    that.application.viewShower.proceeding(that.application.view,
                                        ibas.emMessageType.INFORMATION, ibas.strings.format("[{0}]-[{1}]",
                                            ibas.dates.toString(oStartDate, "yyyy-MM-dd HH-mm-ss"), ibas.dates.toString(oEndDate, "yyyy-MM-dd HH-mm-ss")));
                                    if (oAppointment.getParent() !== oCalendarRow) {
                                        handleAppointmentDropBetweenRows();
                                    }
                                }
                                oModel.refresh(true);
                            },
                            appointmentDragEnter: function (oEvent: any): void {
                                if (that.isAppointmentOverlap(oEvent, oEvent.getParameter("calendarRow"))) {
                                    oEvent.preventDefault();
                                }
                            },
                            appointmentResize: function (oEvent: any): void {
                                let oAppointment: any = oEvent.getParameter("appointment");
                                let oStartDate: Date = oEvent.getParameter("startDate");
                                let oEndDate: Date = oEvent.getParameter("endDate");
                                if (!that.isAppointmentOverlap(oEvent, oAppointment.getParent())) {
                                    oAppointment.setStartDate(oStartDate).setEndDate(oEndDate);
                                    that.application.viewShower.proceeding(that.application.view,
                                        ibas.emMessageType.INFORMATION, ibas.strings.format("[{0}]-[{1}]",
                                            ibas.dates.toString(oStartDate, "yyyy-MM-dd HH-mm-ss"), ibas.dates.toString(oEndDate, "yyyy-MM-dd HH-mm-ss")));
                                }
                            },
                            appointments: {
                                path: "appointments",
                                template: new sap.ui.unified.CalendarAppointment("", {
                                    startDate: "{start}",
                                    endDate: "{end}",
                                    icon: "{pic}",
                                    title: "{title}",
                                    text: "{info}",
                                    type: "{type}",
                                    tentative: "{tentative}",
                                }),
                                templateShareable: true
                            },
                            intervalHeaders: {
                                path: "headers",
                                template: new sap.ui.unified.CalendarAppointment("", {
                                    startDate: "{start}",
                                    endDate: "{end}",
                                    icon: "{pic}",
                                    title: "{title}",
                                    type: "{type}",
                                }),
                                templateShareable: true
                            },
                        })
                    });
                    this.pCalendar.setModel(new sap.ui.model.json.JSONModel(this.usersPlanningData));
                    this.pCalendar.bindObject("/");
                    return this.page = new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.pCalendar
                        ]
                    });
                }
                // 判断任务时间有无变化
                isAppointmentOverlap(oEvent: any, oCalendarRow: any): any {
                    let oAppointment: any = oEvent.getParameter("appointment");
                    let oStartDate: Date = oEvent.getParameter("startDate");
                    let oEndDate: Date = oEvent.getParameter("endDate");
                    let bAppointmentOverlapped: boolean = false;
                    bAppointmentOverlapped = oCalendarRow.getAppointments().some(function (oCurrentAppointment: any): boolean {
                        if (oCurrentAppointment === oAppointment) {
                            return false;
                        }
                        let oAppStartTime: any = oCurrentAppointment.getStartDate().getTime();
                        let oAppEndTime: any = oCurrentAppointment.getEndDate().getTime();
                        if (oAppStartTime <= oStartDate.getTime() && oStartDate.getTime() < oAppEndTime) {
                            return true;
                        }
                        if (oAppStartTime < oEndDate.getTime() && oEndDate.getTime() <= oAppEndTime) {
                            return true;
                        }
                        if (oStartDate.getTime() <= oAppStartTime && oAppStartTime < oEndDate.getTime()) {
                            return true;
                        }
                    });
                    return bAppointmentOverlapped;
                }
                // 获取绑定数据
                getData(): UsersPlanning {
                    let usersPlanning: UsersPlanning = new UsersPlanning();
                    usersPlanning.users = new ibas.ArrayList<User>();
                    usersPlanning.startDate = new Date(2020, 4, 4, 6, 0);
                    let user: User = new User();
                    user.appointments = new ibas.ArrayList<Appointment>();
                    user.headers = new ibas.ArrayList<Header>();
                    user.name = "neil";
                    user.pic = "sap-icon://customer";
                    user.role = "研发部";
                    let appointment: Appointment = new Appointment();
                    appointment.start = new Date(2020, 4, 4, 8, 0);
                    appointment.end = new Date(2020, 4, 4, 9, 30);
                    appointment.tentative = true;
                    appointment.pic = "sap-icon://sap-ui5";
                    appointment.title = "会议";
                    appointment.type = sap.ui.unified.CalendarDayType.Type01;
                    user.appointments.add(appointment);
                    appointment = new Appointment();
                    appointment.start = new Date(2020, 4, 4, 15, 0);
                    appointment.end = new Date(2020, 4, 4, 18, 30);
                    appointment.tentative = true;
                    appointment.pic = "sap-icon://sap-ui5";
                    appointment.title = "工作会议";
                    appointment.type = sap.ui.unified.CalendarDayType.Type01;
                    user.appointments.add(appointment);
                    let header: Header = new Header();
                    header.pic = "sap-icon://add";
                    header.start = new Date(2020, 4, 4, 8, 0);
                    header.end = new Date(2020, 4, 4, 12, 0);
                    header.title = "上午研发会员/产品会议";
                    header.type = sap.ui.unified.CalendarDayType.Type20;
                    user.headers.add(header);
                    usersPlanning.users.add(user);

                    user = new User();
                    user.appointments = new ibas.ArrayList<Appointment>();
                    user.headers = new ibas.ArrayList<Header>();
                    user.name = "姜东";
                    user.pic = "sap-icon://employee-approvals";
                    user.role = "产品部";
                    appointment = new Appointment();
                    appointment.start = new Date(2020, 4, 4, 11, 0);
                    appointment.end = new Date(2020, 4, 4, 14, 30);
                    appointment.tentative = true;
                    appointment.pic = "sap-icon://sap-ui5";
                    appointment.title = "产品会议";
                    appointment.type = sap.ui.unified.CalendarDayType.Type02;
                    user.appointments.add(appointment);
                    appointment = new Appointment();
                    appointment.start = new Date(2020, 4, 4, 16, 0);
                    appointment.end = new Date(2020, 4, 4, 21, 30);
                    appointment.tentative = true;
                    appointment.pic = "sap-icon://sap-ui5";
                    appointment.title = "工作会议";
                    appointment.type = sap.ui.unified.CalendarDayType.Type02;
                    user.appointments.add(appointment);
                    header = new Header();
                    header.pic = "sap-icon://add";
                    header.start = new Date(2020, 4, 4, 8, 0);
                    header.end = new Date(2020, 4, 4, 12, 0);
                    header.title = "上午产品会议";
                    header.type = sap.ui.unified.CalendarDayType.Type20;
                    user.headers.add(header);
                    usersPlanning.users.add(user);
                    return usersPlanning;
                }
            }
            export class UsersPlanning {
                startDate: Date;
                users: ibas.ArrayList<User>;
            }
            export class User {
                pic: string;
                name: string;
                role: string;
                appointments: ibas.ArrayList<Appointment>;
                headers: ibas.ArrayList<Header>;
            }
            export class Appointment {
                start: Date;
                end: Date;
                title: string;
                pic: string;
                type: sap.ui.unified.CalendarDayType;
                tentative: boolean;
            }
            export class Header {
                start: Date;
                end: Date;
                pic: string;
                title: string;
                type: sap.ui.unified.CalendarDayType;
            }
        }
    }
}
