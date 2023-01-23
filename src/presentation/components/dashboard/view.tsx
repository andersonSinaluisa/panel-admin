import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { installations_interface } from "infrastructure/api/installation";
import { jobs_interface } from "infrastructure/api/jobs";
import { tasks_interface } from "infrastructure/api/tasks";
import { DashboardViewProps } from "presentation/container/dashboard/view-container";
import React from "react";
import Chart from "react-apexcharts";


const DashboardView = (props: DashboardViewProps) => {

    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    const [Counttask, setCountTask] = React.useState<number>(0);
    const [Countusers, setCountUsers] = React.useState<number>(0);
    const [Countjobs, setCountJobs] = React.useState<number>(0);
    const [Countinstallations, setCountInstallations] = React.useState<number>(0);

    const [task, setTask] = React.useState<tasks_interface.GetTaskResponse>({
        message: [],
        status: 0
    });


    const [jobs, setJobs] = React.useState<jobs_interface.GetJobsResponse>({
        message: [],
        status: 0
    });

    const [installations, setInstallations] = React.useState<installations_interface.GetInstallationsResponse>({
        data: [],
        ...initialMetaResponse
    });


    const [taskStats, setTaskStats] = React.useState<number[]>([]);


    React.useEffect(() => {
        setCountTask(props.GetTasks.message.length)
        setCountUsers(props.GetUsers.data.length)
        setCountJobs(props.GetJobs.message.length)
        setCountInstallations(props.GetInstallations.data.length)


        setTask(props.GetTasks)
        setJobs(props.GetJobs)
        setInstallations(props.GetInstallations)

    }, [props.GetInstallations, props.GetUsers, props.GetJobs]);

    React.useEffect(() => {

        props.GetInstallationsAsync({
            token: props.token,
        });
        props.GetJobsAsync({
            token: props.token,
        });

        props.GetInstallationsAsync({
            token: props.token,
        });
        props.GetUsersAsync({
            token: props.token,
        });

        props.GetTasksAsync({
            token: props.token,
        })
    }, []);


    const getTaskStats = () => {
        let stats = [];
        stats.push(
            getStats(task.message.length, task.message.filter(x => x.state === "cerrado").length),
        )
        stats.push(
            getStats(task.message.length, task.message.filter(x => x.state === "abierto").length),
        )


        return stats;
    }


    const getStats = (total: number, current: number) => {
        return (current * 100) / total;
    }


    const getInstallationsStats = () => {
        let stats = [];

        let data = installations.data;

        //filter by month and year
        let currentMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();

        let currentMonthData = data.filter(x => new Date(x.createdAt).getMonth() + 1 === currentMonth && new Date(x.createdAt).getFullYear() === currentYear );

        // filter by all days of the month
        let armados = [];
        let desarmadas = [];
        let autocierre = [];
        //for of all day of month
        for (let i = 1; i <= new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); i++) {
            
            currentMonthData.filter(x => new Date(x.createdAt).getDate() === i && x.state.id===1).length > 0 ? armados.push(currentMonthData.filter(x => new Date(x.createdAt).getDate() === i  && x.state.id===1).length) : armados.push(0);
            currentMonthData.filter(x => new Date(x.createdAt).getDate() === i && x.state.id===2).length > 0 ? desarmadas.push(currentMonthData.filter(x => new Date(x.createdAt).getDate() === i  && x.state.id===2).length) : desarmadas.push(0);
            currentMonthData.filter(x => new Date(x.createdAt).getDate() === i && x.state.id===6).length > 0 ? autocierre.push(currentMonthData.filter(x => new Date(x.createdAt).getDate() === i  && x.state.id===6).length) : autocierre.push(0);

        }

        
        stats.push({
            name: "Instalaciones Armadas",
            data: armados
        });

        stats.push({
            name: "Instalaciones Desarmadas",
            data: desarmadas
        });

        stats.push({
            name: "Instalaciones Autocierre",   
            data: autocierre
        });




        return stats

    }

    

    const getDaysOfMonth = () => {
        let days = [];
        for (let i = 1; i <=  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); i++) {
            days.push(i);
        }
        return days;
    }

    const optionsJobsChart: any = {
        chart: {
            height: 260,
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        legend: {
            horizontalAlign: 'right',
            offsetY: -10,
            markers: {
                radius: 50,
                height: 8,
                width: 8
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#5A8DEE', '#00CFDD','#39DA8A'],
        fill: {
            gradient: {
                shade: 'light',
                type: "vertical",
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 70, 100]
            },
        },
        xaxis: {
            categories: getDaysOfMonth()
        },
    }





    return (
        <div className="col-xl-12  col-12">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Instalaciones del mes</h4>
                            <i className="bx bx-dots-vertical-rounded font-medium-3 cursor-pointer"></i>
                        </div>
                        <div className="card-content">
                            <div className="card-body pb-1">
                                <div className="d-flex justify-content-around align-items-center flex-wrap">
                                    <div className="user-analytics">
                                        <i className="bx bxs-briefcase-alt-2 mr-25 align-middle text-primary"></i>
                                        <span className="align-middle text-primary">Armadas</span>
                                        <div className="d-flex">
                                            <div id="radial-success-chart"></div>
                                            <h3 className="mt-1 ml-50 text-primary">{getInstallationsStats()[0].data.filter(x=>x>0).length}</h3>
                                        </div>
                                    </div>
                                    <div className="sessions-analytics">
                                    <i className="bx bxs-briefcase-alt-2 mr-25 align-middle text-info"></i>
                                        <span className="align-middle text-info">Desarmadas</span>
                                        <div className="d-flex">
                                            <div id="radial-warning-chart"></div>
                                            <h3 className="mt-1 ml-50 text-info">{getInstallationsStats()[1].data.filter(x=>x>0).length}</h3>
                                        </div>
                                    </div>
                                    <div className="bounce-rate-analytics">
                                    <i className="bx bxs-briefcase-alt-2 mr-25 align-middle text-success"></i>
                                        <span className="align-middle text-success">Autocierre</span>
                                        <div className="d-flex">
                                            <div id="radial-danger-chart"></div>
                                            <h3 className="mt-1 ml-50 text-success">{getInstallationsStats()[2].data.filter(x=>x>0).length}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="analytics-bar-chart" className="col-xs-12">
                                    <Chart
                                        options={optionsJobsChart}
                                        series={getInstallationsStats()}
                                        type="bar"
                                        width="500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="col-md-6 col row">
                    <div className="col-sm-6 col-xs-12 col dashboard-users-danger">
                        <div className="card text-center">
                            <div className="card-content">
                                <div className="card-body py-1">
                                    <div className="badge-circle badge-circle-lg badge-circle-light-danger mx-auto mb-50">
                                        <i className="bx bx-user font-medium-5"></i>
                                    </div>
                                    <div className="text-muted line-ellipsis">Usuarios</div>
                                    <h3 className="mb-0">{Countusers}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6  col-xs-12 col dashboard-users-danger">
                        <div className="card text-center">
                            <div className="card-content">
                                <div className="card-body py-1">
                                    <div className="badge-circle badge-circle-lg badge-circle-light-success mx-auto mb-50">
                                        <i className="bx bx-task font-medium-5"></i>
                                    </div>
                                    <div className="text-muted line-ellipsis">Tareas</div>
                                    <h3 className="mb-0">{Counttask}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6  col-xs-12 col dashboard-users-danger">
                        <div className="card text-center">
                            <div className="card-content">
                                <div className="card-body py-1">
                                    <div className="badge-circle badge-circle-lg badge-circle-light-info mx-auto mb-50">
                                        <i className="bx bxs-briefcase-alt-2 font-medium-5"></i>
                                    </div>
                                    <div className="text-muted line-ellipsis">Trabajos</div>
                                    <h3 className="mb-0">{Countjobs}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6  col-xs-12 col dashboard-users-danger">
                        <div className="card text-center">
                            <div className="card-content">
                                <div className="card-body py-1">
                                    <div className="badge-circle badge-circle-lg badge-circle-light-danger mx-auto mb-50">
                                        <i className="bx bxs-briefcase-alt-2 font-medium-5"></i>
                                    </div>
                                    <div className="text-muted line-ellipsis">Instalaciones</div>
                                    <h3 className="mb-0">{Countinstallations}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-xl-6 col-md-6 col-12 activity-card">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Actividad</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body pt-1">

                                <div className="d-flex activity-content">
                                    <div className="avatar bg-rgba-success m-0 mr-75">
                                        <div className="avatar-content">
                                            <i className="bx bxs-briefcase-alt-2 text-success"></i>
                                        </div>
                                    </div>
                                    <div className="activity-progress flex-grow-1">
                                        <small className="text-muted d-inline-block mb-50">Instalaciones Armadas</small>
                                        <small className="float-right">{installations.data.filter(x => x.state.id === 1).length}</small>
                                        <div className="progress progress-bar-success progress-sm">
                                            <div className="progress-bar" style={{ width: getStats(installations.data.length, installations.data.filter(x => x.state.id === 1).length) + "%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex activity-content mt-2">
                                    <div className="avatar bg-rgba-warning m-0 mr-75">
                                        <div className="avatar-content">
                                            <i className="bx bx-task text-warning"></i>
                                        </div>
                                    </div>
                                    <div className="activity-progress flex-grow-1">
                                        <small className="text-muted d-inline-block mb-50">Trabajos Completados</small>
                                        <small className="float-right">{jobs.message.filter(x => x.state === 'cerrado').length}</small>
                                        <div className="progress progress-bar-warning progress-sm">
                                            <div className="progress-bar" style={{ width: getStats(jobs.message.length, jobs.message.filter(x => x.state === 'cerrado').length) + "%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex mb-75 mt-2">
                                    <div className="avatar bg-rgba-success m-0 mr-75">
                                        <div className="avatar-content">
                                            <i className="bx bx-check text-success"></i>
                                        </div>
                                    </div>
                                    <div className="activity-progress flex-grow-1">
                                        <small className="text-muted d-inline-block mb-50">Tareas Completadas</small>
                                        <small className="float-right">{task.message.filter(x => x.state === 'cerrado').length}</small>
                                        <div className="progress progress-bar-success progress-sm">
                                            <div className="progress-bar" style={{ width: getStats(task.message.length, task.message.filter(x => x.state === 'cerrado').length) + "%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-xs-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Tareas</h4>
                        </div>
                        <div className="card-body">
                            <Chart options={{
                                labels: ['Completadas', 'Pendientes'],
                                colors: ['#28C76F', '#EA5455']

                            }} series={getTaskStats()} type="donut" width="380" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardView;