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
                private userPage: sap.m.Page;
                private usersPlanningData: UsersPlanning;
                private pCalendar: sap.m.PlanningCalendar;
                private spCalendar: sap.m.SinglePlanningCalendar;
                private mainContainer: sap.m.NavContainer;
                private sideContent: sap.ui.layout.DynamicSideContent;
                private userSideContent: sap.ui.layout.DynamicSideContent;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    // 加载[月]显示试图,sap默认不加载
                    jQuery.sap.require("sap.m.SinglePlanningCalendarMonthView");
                    this.mainContainer = new sap.m.NavContainer("");
                    this.usersPlanningData = this.getData();
                    this.pCalendar = new sap.m.PlanningCalendar("", {
                        viewKey: "D",
                        startDate: {
                            path: "startDate"
                        },
                        toolbarContent: [
                            new sap.m.ToggleButton("", {
                                icon: "sap-icon://legend",
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.sideContent.setShowSideContent(!that.sideContent.getShowSideContent(), false);
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
                            let userData: User = oEvent.getParameters().row.getBindingContext().getObject();
                            that.showUserAppointment(userData);
                        },
                        intervalSelect: function (oEvent: sap.ui.base.Event): void {
                            // 点击行可获得点击处时间，可用于新建任务
                            let parameters: any = oEvent.getParameters();
                            if (ibas.objects.isNull(parameters) || ibas.objects.isNull(parameters.row)) {
                                return;
                            }
                            let createAppointment: Appointment = new Appointment();
                            createAppointment.start = parameters.startDate;
                            createAppointment.end = parameters.endDate;
                            let userData: User = parameters.row.getBindingContext().getObject();
                            that.showAppointmentDialog(userData, createAppointment, true);
                        },
                        appointmentsVisualization: sap.ui.unified.CalendarAppointmentVisualization.Filled,
                        showEmptyIntervalHeaders: false,
                        showIntervalHeaders: false,
                        showWeekNumbers: true,
                        appointmentSelect: function (oEvent: any): void {
                            let appointement: any = oEvent.getParameter("appointment");
                            if (!ibas.objects.isNull(appointement)) {
                                let selectedData: Appointment = appointement.getBindingContext().getObject();
                                if (!ibas.objects.isNull(selectedData)) {
                                    that.application.viewShower.proceeding(that.application.view, ibas.emMessageType.INFORMATION, selectedData.title);
                                    let userData: User = appointement.oParent.getBindingContext().getObject();
                                    that.showAppointmentDialog(userData, selectedData, false);
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
                            appointmentCreate: function (oEvent: any): void {
                                let oStartDate: any = oEvent.getParameter("startDate");
                                let oEndDate: any = oEvent.getParameter("endDate");
                                let sAppointmentTitle: string = "New Appointment";
                                let oPlanningCalendarRow: any = oEvent.getParameter("calendarRow");
                                let oModel: any = this.getModel();
                                let sPath: any = oPlanningCalendarRow.getBindingContext().getPath();
                                let oNewAppointment: Appointment = new Appointment();
                                oNewAppointment.start = oStartDate;
                                oNewAppointment.end = oEndDate;
                                oNewAppointment.title = sAppointmentTitle;
                                oModel.getProperty(sPath).appointments.pushoNewAppointment(oNewAppointment);
                                oModel.refresh(true);
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
                    // this.pCalendar.setModel(new sap.ui.model.json.JSONModel(this.usersPlanningData));
                    // this.pCalendar.bindObject("/");
                    this.sideContent = new sap.ui.layout.DynamicSideContent("", {
                        sideContentVisibility: "AlwaysShow",
                        showSideContent: false,
                        containerQuery: true,
                        mainContent: [
                            this.pCalendar,
                        ],
                        sideContent: [
                            new sap.m.PlanningCalendarLegend("", {
                                itemsHeader: "日历类型",
                                appointmentItemsHeader: "任务类型",
                                items: {
                                    path: "legendItems",
                                    template: new sap.ui.unified.CalendarLegendItem("", {
                                        text: "{text}",
                                        type: "{type}",
                                        tooltip: "{text}",
                                        color: "{color}"
                                    })
                                },
                                appointmentItems: {
                                    path: "legendAppointmentItems",
                                    template: new sap.ui.unified.CalendarLegendItem("", {
                                        text: "{text}",
                                        type: "{type}",
                                        tooltip: "{text}",
                                    })
                                }
                            })
                        ]
                    });
                    this.sideContent.setModel(new sap.ui.model.json.JSONModel(this.usersPlanningData));
                    this.sideContent.bindObject("/");
                    this.sideContent.addStyleClass("sapUiDSCExplored sapUiContentPadding");
                    this.mainContainer.addPage(this.page = new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.sideContent
                        ]
                    }));
                    this.loadUserAppointmentPage();
                    return this.mainContainer;
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
                // 加载用户个人任务
                loadUserAppointmentPage(): void {
                    let that: this = this;
                    this.spCalendar = new sap.m.SinglePlanningCalendar("", {
                        title: "{name}的工作",
                        stickyMode: sap.m.PlanningCalendarStickyMode.All,
                        views: [
                            new sap.m.SinglePlanningCalendarWeekView("", {
                                key: "WeekView",
                                title: "周"
                            }),
                            new sap.m.SinglePlanningCalendarWorkWeekView("", {
                                key: "WorkWeekView",
                                title: "工作日"
                            }),
                            new sap.m.SinglePlanningCalendarDayView("", {
                                key: "DayView",
                                title: "天"
                            }),
                            new sap.m.SinglePlanningCalendarMonthView("", {
                                key: "MonthView",
                                title: "月"
                            })
                        ],
                        selectedView: new sap.m.SinglePlanningCalendarMonthView("", {
                            key: "MonthView",
                            title: "月"
                        }),
                        startDate: new Date(),
                        actions: [
                            new sap.m.ToggleButton("", {
                                icon: "sap-icon://legend",
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.userSideContent.setShowSideContent(!that.userSideContent.getShowSideContent(), false);
                                }
                            }),
                        ],
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
                        enableAppointmentsDragAndDrop: true,
                        enableAppointmentsResize: true,
                        enableAppointmentsCreate: true,
                        appointmentDrop: function (oEvent: any): void {
                            let oAppointment: any = oEvent.getParameter("appointment");
                            let oStartDate: Date = oEvent.getParameter("startDate");
                            let oEndDate: Date = oEvent.getParameter("endDate");
                            let bCopy: any = oEvent.getParameter("copy");
                            let oModel: any = this.getModel();
                            let oAppBindingContext: any = oAppointment.getBindingContext();
                            if (bCopy) { // "copy" appointment
                                let oNewAppointment: Appointment = {
                                    title: oAppointment.getTitle(),
                                    pic: oAppointment.getIcon(),
                                    info: oAppointment.getText(),
                                    type: oAppointment.getType(),
                                    start: oStartDate,
                                    end: oEndDate,
                                    tentative: true,
                                };
                                oModel.getData().appointments.push(oNewAppointment);
                                oModel.updateBindings();
                            } else { // "move" appointment
                                oModel.setProperty("start", oStartDate, oAppBindingContext);
                                oModel.setProperty("end", oEndDate, oAppBindingContext);
                                that.application.viewShower.proceeding(that.application.view,
                                    ibas.emMessageType.INFORMATION, ibas.strings.format("[{0}]-[{1}]",
                                        ibas.dates.toString(oStartDate, "yyyy-MM-dd HH-mm-ss"), ibas.dates.toString(oEndDate, "yyyy-MM-dd HH-mm-ss")));
                            }
                            oModel.refresh(true);
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
                        appointmentCreate: function (oEvent: any): void {
                            let oStartDate: any = oEvent.getParameter("startDate");
                            let oEndDate: any = oEvent.getParameter("endDate");
                            let sAppointmentTitle: string = "New Appointment";
                            let oModel: any = this.getModel();
                            let oNewAppointment: Appointment = new Appointment();
                            oNewAppointment.start = oStartDate;
                            oNewAppointment.end = oEndDate;
                            oNewAppointment.title = sAppointmentTitle;
                            oModel.getData().appointments.push(oNewAppointment);
                            oModel.updateBindings();

                        },
                        appointmentSelect: function (oEvent: any): void {
                            let appointement: any = oEvent.getParameter("appointment");
                            if (!ibas.objects.isNull(appointement)) {
                                let selectedData: Appointment = appointement.getBindingContext().getObject();
                                if (!ibas.objects.isNull(selectedData)) {
                                    that.application.viewShower.proceeding(that.application.view, ibas.emMessageType.INFORMATION, selectedData.title);
                                    let userData: User = appointement.oParent.getBindingContext().getObject();
                                    that.showAppointmentDialog(userData, selectedData, false);
                                }
                            }
                        },
                        cellPress: function (oEvent: any): void {
                            let parameters: any = oEvent.getParameters();
                            if (ibas.objects.isNull(parameters)) {
                                return;
                            }
                            let createAppointment: Appointment = new Appointment();
                            createAppointment.start = parameters.startDate;
                            createAppointment.end = parameters.endDate;
                            let userData: User = this.getModel().getData();
                            that.showAppointmentDialog(userData, createAppointment, true);
                        }
                    });
                    this.spCalendar.addStyleClass("sapUiSmallMarginTop");
                    this.userSideContent = new sap.ui.layout.DynamicSideContent("", {
                        sideContentVisibility: "AlwaysShow",
                        showSideContent: false,
                        containerQuery: true,
                        mainContent: [
                            this.spCalendar,
                        ],
                        sideContent: [
                            new sap.m.PlanningCalendarLegend("", {
                                itemsHeader: "日历类型",
                                appointmentItemsHeader: "任务类型",
                                items: {
                                    path: "legendItems",
                                    template: new sap.ui.unified.CalendarLegendItem("", {
                                        text: "{text}",
                                        type: "{type}",
                                        tooltip: "{text}",
                                        color: "{color}"
                                    })
                                },
                                appointmentItems: {
                                    path: "legendAppointmentItems",
                                    template: new sap.ui.unified.CalendarLegendItem("", {
                                        text: "{text}",
                                        type: "{type}",
                                        tooltip: "{text}",
                                    })
                                }
                            })
                        ]
                    });
                    this.mainContainer.addPage(this.userPage = new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.userSideContent
                        ],
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    iconFirst: false,
                                    text: "返回",
                                    press: function (oevent: any): void {
                                        that.mainContainer.backToPage(that.page.getId());
                                    }
                                })
                            ]
                        }),
                    }));
                }
                // 新建/编辑任务
                showAppointmentDialog(userData: User, createAppointment: Appointment, isCreate: boolean): void {
                    let that: this = this;
                    if (ibas.objects.isNull(createAppointment)) {
                        createAppointment = new Appointment();
                    }
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        contentWidth: "40%",
                        contentHeight: "40%",
                        title: ibas.strings.isEmpty(userData.name) ? "编辑" : ibas.strings.format("为[{0}]新建任务", userData.name),
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        showHeader: true,
                        content: [
                            new sap.ui.layout.form.SimpleForm("", {
                                editable: true,
                                content: [
                                    new sap.m.Label("", { text: "标题" }),
                                    new sap.m.Input("", {
                                    }).bindProperty("value", {
                                        path: "title",
                                    }),
                                    new sap.m.Label("", { text: "说明" }),
                                    new sap.m.Input("", {
                                    }).bindProperty("value", {
                                        path: "info",
                                    }),
                                    new sap.m.Label("", { text: "开始时间" }),
                                    new sap.m.DateTimePicker("", {
                                        displayFormat: "short"
                                    }).bindProperty("dateValue", {
                                        path: "start",
                                    }),
                                    new sap.m.Label("", { text: "结束时间" }),
                                    new sap.m.DateTimePicker("", {
                                        displayFormat: "short"
                                    }).bindProperty("dateValue", {
                                        path: "end",
                                    }),
                                ]
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: "删除",
                                type: sap.m.ButtonType.Transparent,
                                visible: isCreate ? false : true,
                                press: function (): void {
                                    userData.appointments.remove(createAppointment);
                                    that.pCalendar.getModel().refresh(false);
                                    that.spCalendar.getModel().refresh(false);
                                    dialog.close();
                                }
                            }),
                            new sap.m.Button("", {
                                text: "保存",
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    if (isCreate) {
                                        userData.appointments.add(createAppointment);
                                    }
                                    that.pCalendar.getModel().refresh(false);
                                    that.spCalendar.getModel().refresh(false);
                                    dialog.close();
                                }
                            }),
                            new sap.m.Button("", {
                                text: "退出",
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ]
                    });
                    dialog.setModel(new sap.ui.model.json.JSONModel(createAppointment));
                    dialog.bindObject("/");
                    dialog.open();
                }
                showUserAppointment(userData: User): void {
                    this.userSideContent.setModel(new sap.ui.model.json.JSONModel(userData));
                    this.userSideContent.bindObject("/");
                    this.mainContainer.to(this.userPage.getId());
                }
                // 获取绑定数据
                getData(): UsersPlanning {
                    let usersPlanning: UsersPlanning = new UsersPlanning();
                    usersPlanning.users = new ibas.ArrayList<User>();
                    usersPlanning.startDate = new Date(2020, 3, 5, 6, 0);
                    usersPlanning.title = "开发部人员工作安排";
                    let user: User = new User();
                    user.appointments = new ibas.ArrayList<Appointment>();
                    user.headers = new ibas.ArrayList<Header>();
                    user.name = "neil";
                    user.pic = "sap-icon://customer";
                    user.role = "研发部";
                    user.legendAppointmentItems = new ibas.ArrayList<LegendAppointment>();
                    user.legendAppointmentItems.add({
                        text: "会议",
                        type: sap.ui.unified.CalendarDayType.Type02,
                    });
                    user.legendAppointmentItems.add({
                        text: "研发",
                        type: sap.ui.unified.CalendarDayType.Type20,
                    });
                    let appointment: Appointment = new Appointment();
                    appointment.start = new Date(2020, 3, 5, 8, 0);
                    appointment.end = new Date(2020, 3, 5, 9, 30);
                    appointment.tentative = true;
                    appointment.pic = "sap-icon://sap-ui5";
                    appointment.title = "会议";
                    appointment.type = sap.ui.unified.CalendarDayType.Type01;
                    user.appointments.add(appointment);
                    appointment = new Appointment();
                    appointment.start = new Date(2020, 3, 5, 15, 0);
                    appointment.end = new Date(2020, 3, 5, 18, 30);
                    appointment.tentative = true;
                    appointment.pic = "sap-icon://sap-ui5";
                    appointment.title = "工作会议";
                    appointment.info = "工作描述";
                    appointment.type = sap.ui.unified.CalendarDayType.Type01;
                    user.appointments.add(appointment);
                    let header: Header = new Header();
                    header.pic = "sap-icon://add";
                    header.start = new Date(2020, 3, 5, 8, 0);
                    header.end = new Date(2020, 3, 5, 12, 0);
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
                    user.legendAppointmentItems = new ibas.ArrayList<LegendAppointment>();
                    user.legendAppointmentItems.add({
                        text: "会议",
                        type: sap.ui.unified.CalendarDayType.Type02,
                    });
                    user.legendAppointmentItems.add({
                        text: "售前",
                        type: sap.ui.unified.CalendarDayType.Type20,
                    });
                    appointment = new Appointment();
                    appointment.start = new Date(2020, 3, 5, 11, 0);
                    appointment.end = new Date(2020, 3, 5, 14, 30);
                    appointment.tentative = true;
                    appointment.pic = "sap-icon://sap-ui5";
                    appointment.title = "产品会议";
                    appointment.type = sap.ui.unified.CalendarDayType.Type02;
                    user.appointments.add(appointment);
                    appointment = new Appointment();
                    appointment.start = new Date(2020, 3, 5, 16, 0);
                    appointment.end = new Date(2020, 3, 5, 21, 30);
                    appointment.tentative = true;
                    appointment.pic = "sap-icon://sap-ui5";
                    appointment.title = "工作会议";
                    appointment.type = sap.ui.unified.CalendarDayType.Type02;
                    user.appointments.add(appointment);
                    header = new Header();
                    header.pic = "sap-icon://add";
                    header.start = new Date(2020, 3, 5, 8, 0);
                    header.end = new Date(2020, 3, 5, 12, 0);
                    header.title = "上午产品会议";
                    header.type = sap.ui.unified.CalendarDayType.Type20;
                    user.headers.add(header);
                    usersPlanning.users.add(user);

                    usersPlanning.legendItems = new ibas.ArrayList<Legend>();
                    usersPlanning.legendItems.add({
                        text: "团队建设",
                        type: sap.ui.unified.CalendarDayType.Type01,
                        color: "red"
                    });
                    usersPlanning.legendItems.add({
                        text: "公共假期",
                        type: sap.ui.unified.CalendarDayType.Type02,
                        color: "green"
                    });
                    usersPlanning.legendAppointmentItems = new ibas.ArrayList<LegendAppointment>();
                    usersPlanning.legendAppointmentItems.add({
                        text: "会议",
                        type: sap.ui.unified.CalendarDayType.Type02,
                    });
                    usersPlanning.legendAppointmentItems.add({
                        text: "售前",
                        type: sap.ui.unified.CalendarDayType.Type20,
                    });
                    return usersPlanning;
                }
            }
            export class UsersPlanning {
                title: string;
                startDate: Date;
                users: ibas.ArrayList<User>;
                legendItems: ibas.ArrayList<Legend>;
                legendAppointmentItems: ibas.ArrayList<LegendAppointment>;
            }
            export class Legend {
                text: string;
                type: sap.ui.unified.CalendarDayType;
                color: string;
            }
            export class LegendAppointment {
                text: string;
                type: sap.ui.unified.CalendarDayType;
            }
            export class User {
                pic: string;
                name: string;
                role: string;
                appointments: ibas.ArrayList<Appointment>;
                headers: ibas.ArrayList<Header>;
                legendItems: ibas.ArrayList<Legend>;
                legendAppointmentItems: ibas.ArrayList<LegendAppointment>;
            }
            export class Appointment {
                start: Date;
                end: Date;
                title: string;
                info: string;
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