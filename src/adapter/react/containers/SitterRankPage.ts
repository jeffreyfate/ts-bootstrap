import LogLifeCycle from "react-log-lifecycle";

class SitterRankPage extends LogLifeCycle<*, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentView: "",
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { currentView } = this.state;

    return (
      <div className="SitterRankPage">
      
      </div>
    );
  }
}
