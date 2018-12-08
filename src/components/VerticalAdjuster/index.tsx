import * as React from "react";
import classnames from "classnames";

interface Props {
  children: any;
}

interface State {
  marginTop: number;
}

export default class extends React.PureComponent<Props, State> {
  public state = {
    marginTop: 0,
  };
  public componentDidMount() {
    this.adjustVertPos();
    window.addEventListener("resize", this.adjustVertPos);
  }
  public componentWillUnmount() {
    window.removeEventListener("resize", this.adjustVertPos);
  }
  private adjustVertPos = () => {
    if (window.innerHeight > 600) {
      this.setState({ marginTop: (window.innerHeight - 600) / 2 });
    } else {
      this.setState({ marginTop: 0 });
    }
  }
  public render() {
    return (
      <div style={{ marginTop: this.state.marginTop }} {...this.props} />
    );
  }
}
