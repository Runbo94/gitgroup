import React, { Component, Fragment } from "react";
import { Line } from "recharts";
import { TimeSeries, Index } from "pondjs";
import Moment from "moment";

import { ProjectService } from "./../services/projectService";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
  BarChart
} from "react-timeseries-charts";

class StatusOverview extends Component {
  state = {
    kanbansCreatedTime: [["2017-01-24T00:00", 1]],
    overview: {}
  };

  formatTimeSeriesData = props => {
    const { kanbans } = props;
    let max = 0;
    if (kanbans && kanbans.length > 0) {
      const kanbansCreatedTime = [];
      const hashMap = new Map();
      for (const kanban of kanbans) {
        const day = Moment(kanban.created).format("YYYY-MM-DD");
        const count = hashMap.get(day) + 1 || 1;
        max = Math.max(max, count);
        hashMap.set(day, count);
      }
      for (const pair of hashMap.entries()) {
        kanbansCreatedTime.push(pair);
      }
      kanbansCreatedTime.sort(
        ([a, b], [c, d]) => Date.parse(a) - Date.parse(c)
      );
      this.setState({ kanbansCreatedTime });
      this.setState({ max });
    } else {
      const kanbansCreatedTime = [[Moment(new Date()).format("YYYY-MM-DD"), 0]];
      const max = 0;
      this.setState({ kanbansCreatedTime });
      this.setState({ max });
    }
  };

  getOverview = async props => {
    const projectService = new ProjectService();
    const overview = await projectService.getProjectOverview(props.projectId);
    this.setState({ overview });
  };

  componentDidMount = () => {
    this.formatTimeSeriesData(this.props);
    this.getOverview(this.props);
  };

  componentWillReceiveProps = nextProps => {
    this.formatTimeSeriesData(nextProps);
    this.getOverview(nextProps);
  };

  render() {
    const {
      theNumOfRepos,
      theNumOfKanbans,
      theNumOfIncludeIssues,
      theNumOfFinishedIssues
    } = this.state.overview;
    const max = this.state.max;
    const series = new TimeSeries({
      name: "kanban create time series",
      utc: false,
      columns: ["index", "precip"],
      points: this.state.kanbansCreatedTime
    });
    const style = styler([{ key: "precip", color: "#A5C8E1" }]);
    return (
      <React.Fragment>
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Repositories</p>
              <p className="title">{theNumOfRepos}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Issues</p>
              <p className="title">{theNumOfIncludeIssues}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Kanbans</p>
              <p className="title">{theNumOfKanbans}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Finished Kanbans</p>
              <p className="title">{theNumOfFinishedIssues}</p>
            </div>
          </div>
        </nav>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Analysis</h1>
              <h2 className="subtitle">Kanbans Created Time Series</h2>
              <ChartContainer
                timeRange={series.range()}
                enablePanZoom={true}
                enableDragZoom={true}
              >
                <ChartRow height="150">
                  <YAxis
                    id="kanbancreated"
                    label="number of kanbans"
                    min={0}
                    max={max}
                    format="d"
                    width="70"
                    type="linear"
                  />
                  <Charts>
                    <BarChart
                      axis="kanbancreated"
                      style={style}
                      // spacing={1}
                      columns={["precip"]}
                      series={series}
                    />
                  </Charts>
                </ChartRow>
              </ChartContainer>
            </div>
          </div>
        </section>
        <div className="columns">
          <div className="center" />
        </div>
      </React.Fragment>
    );
  }
}

export default StatusOverview;
